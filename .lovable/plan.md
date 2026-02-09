

# AI Boost: In-App Paid AI Upgrade (Refined)

This plan implements AI Boost as a separate subscription product, with all three strategic refinements incorporated: monthly token safety caps, paid-only eligibility, and single active boost enforcement.

---

## Core Architecture

```text
                       Base Tier                AI Boost (add-on)
                    (course access)           (compute upgrade)
                   +---------------+         +------------------+
  Free             | 15 req/day    |         | Cannot purchase  |
                   | 50K tokens    |         |                  |
                   +---------------+         +------------------+
  Monthly ($30/mo) | 100 req/day   |  --->   | Plus: +100/day   |
                   | 300K tokens   |         | Pro:  +300/day   |
                   +---------------+         +------------------+
  Lifetime ($80)   | 150 req/day   |  --->   | Plus: +100/day   |
                   | 500K tokens   |         | Pro:  +300/day   |
                   +---------------+         +------------------+
```

---

## Step 1: Create Stripe Products

Two new Stripe products (monthly recurring subscriptions):

| Product | Price | What it adds |
|---|---|---|
| AI Boost Plus | $5/month | +100 requests/day, +200K tokens/day |
| AI Boost Pro | $10/month | +300 requests/day, +500K tokens/day |

Created via Stripe tools before any code changes.

---

## Step 2: Database Migration

**New table: `ai_boost_plans`**

Stores boost plan config in DB so pricing/limits can be tuned without redeploy.

| Column | Type | Description |
|---|---|---|
| id | uuid (PK) | Auto-generated |
| name | text | "AI Boost Plus" or "AI Boost Pro" |
| stripe_price_id | text | Stripe price ID |
| stripe_product_id | text | Stripe product ID |
| extra_daily_requests | integer | +100 or +300 |
| extra_daily_tokens | integer | +200,000 or +500,000 |
| monthly_token_cap | integer | 4,000,000 or 12,000,000 |
| price_display | text | "$5/mo" or "$10/mo" |
| active | boolean | Enable/disable plans |
| created_at | timestamptz | Default now() |

RLS: Public read (SELECT), no INSERT/UPDATE/DELETE from client.

**Add to `ai_usage_daily` table:**

| Column | Type | Description |
|---|---|---|
| monthly_tokens_used | integer (default 0) | Cumulative tokens this calendar month (for monthly cap enforcement) |

---

## Step 3: Backend Changes

### 3a. Update `ai-guard.ts` -- Boost Detection

After determining the user's base tier, also check Stripe for an active AI Boost subscription:

- Fetch all active subscriptions for the customer (currently only fetches 1)
- Match subscription price IDs against `ai_boost_plans` table entries
- If found: add the boost's `extra_daily_requests` and `extra_daily_tokens` to the user's daily budget
- Also check the user's `monthly_tokens_used` against the boost's `monthly_token_cap` -- if exceeded, soft-block even if daily budget remains

Key enforcement rules:
- **Paid-only eligibility**: If base tier is "free", ignore any boost subscription (should not exist, but defense-in-depth)
- **Single boost**: Only the first matching boost subscription applies (no stacking Plus + Pro)

### 3b. Update `ai-usage-status` endpoint

Return additional fields:
- `boostPlan`: name of active boost (null if none)
- `boostLimits`: extra requests/tokens from the boost
- `totalLimits`: base + boost combined
- `monthlyTokensUsed` / `monthlyTokenCap`: for transparency

### 3c. New edge function: `create-ai-boost-checkout`

- Accepts `{ boostPlan: "plus" | "pro" }`
- Authenticates user via JWT
- Checks eligibility: must have active course subscription or lifetime access (queries Stripe)
- If free user: returns 403 with message "Course access required"
- If user already has an active boost subscription: returns 409 with message "You already have an active AI Boost. Manage it from Settings."
- Otherwise: creates Stripe checkout session with the boost price ID, mode "subscription"
- Success URL: `/settings?boost=success`
- Cancel URL: `/settings?boost=cancelled`

### 3d. Update `check-subscription` response

Add `has_ai_boost: boolean` and `ai_boost_plan: string | null` to the response so the frontend subscription context knows about boost status.

---

## Step 4: Frontend Changes

### 4a. Update `useAiUsage.ts`

- Parse boost info from `ai-usage-status` response
- Expose: `boostPlan`, `totalLimit` (base + boost), `monthlyUsage`
- Remove any remaining localStorage-based limit logic

### 4b. Update `AiLimitModal.tsx` (Premium UX)

Replace current generic copy with contextual messaging:

**For free users hitting limit:**
```
Header: "You've used today's AI power"
Body: "The AI Tutor is one of your most powerful tools for mastering Polish grammar."
[Primary] Continue learning without AI
[Secondary] Upgrade plan (links to /pricing)
```

**For paid users (no boost) hitting limit:**
```
Header: "You've used today's AI power"
Body: "Want more? AI Boost gives you up to 300 additional AI explanations per day."
[Primary] Get AI Boost -- from $5/mo
[Secondary] Continue learning without AI
```

**For users already on a boost hitting limit:**
```
Header: "You've used today's AI power"
Body: "Even with AI Boost, you've hit today's ceiling. Resets in ~X hours."
[Primary] Continue learning without AI
[Secondary] Contact support for custom limits
```

Key copy change: "AI explanations" not "AI uses" -- anchors value to learning.

### 4c. Update `Pricing.tsx`

Add an "AI Add-ons" section below the main course pricing cards:
- Only visible to users with active course access
- Shows AI Boost Plus ($5/mo) and AI Boost Pro ($10/mo) as cards
- If user already has a boost: show active plan with "Manage" link to Stripe portal
- Upgrade path: Plus user sees "Upgrade to Pro" button
- Downgrade: handled via Stripe Customer Portal

### 4d. Update `useSubscription.tsx`

- Parse `has_ai_boost` and `ai_boost_plan` from `check-subscription` response
- Expose `hasAiBoost` and `aiBoostPlan` in context
- Add `startBoostCheckout(plan: 'plus' | 'pro')` method

### 4e. Update `Settings.tsx`

- Show current AI Boost status in the subscription section
- "AI Boost Plus active" badge or "No AI Boost" with upgrade CTA
- Detect `?boost=success` URL param for celebration toast

### 4f. Update `GrammarAssistant.tsx` and `GrammarDrill.tsx`

- Show usage bar: "X of Y AI explanations used today" (Y = base + boost)
- If boost active: show small "AI Boost Plus" badge in header

---

## Step 5: Safety Controls (Invisible to Users)

### Monthly token cap enforcement

In `ai-guard.ts`, after daily checks pass:
1. Query `ai_usage_daily` for the current calendar month (SUM of `total_tokens_estimate` WHERE `usage_date` >= first of month)
2. Compare against the boost plan's `monthly_token_cap`
3. If exceeded: soft-block with reason "MONTHLY_CAP"
4. UX shows same warm modal but says "monthly AI budget" instead of "daily"

### Single boost enforcement

- `create-ai-boost-checkout` checks for existing active boost subscription before creating a new one
- If found: returns 409, frontend shows "Manage your current boost in Settings"
- Upgrade Plus to Pro: user goes through Stripe Customer Portal (already implemented)

### Paid-only enforcement

- `create-ai-boost-checkout` verifies course access before creating checkout
- `ai-guard.ts` ignores boost for free-tier users (defense-in-depth)

---

## Step 6: Update Feature Copy in Pricing Page

Change the features list from:
- "AI Grammar Assistant (5 uses/day)"
- "AI Grammar Drill (5 uses/day)"

To:
- "AI Grammar Assistant (generous daily limit)"
- "AI Grammar Drill (generous daily limit)"
- "Optional: AI Boost for power users"

---

## Implementation Order

1. Create Stripe products (AI Boost Plus, AI Boost Pro)
2. DB migration: `ai_boost_plans` table + seed data
3. New edge function: `create-ai-boost-checkout`
4. Update `ai-guard.ts` with boost detection + monthly cap
5. Update `ai-usage-status` with boost info
6. Update `check-subscription` with boost fields
7. Frontend: `useSubscription` + `useAiUsage` hook updates
8. Frontend: `AiLimitModal` premium copy
9. Frontend: `Pricing.tsx` add-on section
10. Frontend: `Settings.tsx` boost status
11. Frontend: usage indicators in Grammar pages
12. Deploy all edge functions and test end-to-end

---

## What This Does NOT Change

- Base tier limits (15 / 100 / 150 requests/day) -- unchanged
- Course access pricing ($30/mo, $80 one-time) -- unchanged
- Server-side enforcement architecture -- unchanged, only extended
- Abuse guardrails (input validation, burst rate, anomaly logging) -- unchanged
- Content access model -- unchanged

## Future Expansion (Not Now)

- One-time AI credit packs (buy 50 uses for $3) -- add when demand proves it
- Per-feature boost separation -- unnecessary complexity now
- Admin usage dashboard -- separate feature
- Annual boost discount -- growth lever for later
- Bundle "first month free" promotion -- growth lever for later

