

# Referral System — Implementation Plan

## Overview

Build a referral tracking system with unique codes for you and Andre. Referred users get **10% off** any purchase automatically via Stripe, and you can track signups + conversions per referrer.

## User Flow

```text
1. Andre shares: learnpolski.academy/?ref=ANDRE
2. Visitor lands → code saved in browser storage
3. Visitor signs up (normal flow, no friction)
4. Visitor goes to buy Monthly or Lifetime
5. Checkout automatically applies 10% discount
6. Database records: "this user was referred by ANDRE"
7. You ask me anytime to check Andre's stats
```

## What Gets Built

### Database (2 new tables)

**`referral_codes`** — stores each referrer's code
- `code` (e.g. "POLSKI", "ANDRE") — unique, uppercase
- `referrer_name` — display name
- `stripe_coupon_id` — links to the Stripe 10% coupon
- `active` — can disable codes later
- Public read access so the app can validate codes; no client-side writes

**`referrals`** — tracks each referred user
- Links a user to the code they used
- `converted` flag set to true when they purchase
- Unique constraint on user ID (can't be referred twice)

**Seed data:** Two codes inserted automatically — `POLSKI` (yours) and `ANDRE`

### Stripe

Create a single reusable **10% off coupon** ("REFERRAL10", applies once per customer). Its ID gets stored in both referral code rows.

### Code Changes (5 files)

| File | What Changes |
|------|-------------|
| `src/pages/LandingPage.tsx` | On mount, capture `?ref=` from URL into localStorage |
| `src/pages/Auth.tsx` | Same capture (in case Andre shares a direct `/auth?ref=ANDRE` link) |
| `src/hooks/useAuth.tsx` | On new sign-up, look up the stored code and record a referral row |
| `src/hooks/useSubscription.tsx` | Pass stored referral code to the checkout function |
| `supabase/functions/create-checkout/index.ts` | Validate code, apply Stripe coupon, mark conversion on success |

### What Stays The Same
- No changes to the sign-up form (no "enter code" field — it's all URL-based)
- No changes to pricing display (discount shows in Stripe checkout)
- No changes to existing subscription logic
- No admin UI needed yet — I can query stats for you anytime

### Edge Cases Handled
- User visits with `?ref=ANDRE`, doesn't sign up for days → code persists in localStorage
- Invalid or deactivated code → ignored silently, no discount
- Existing user visits with `?ref=` → referral only recorded for new accounts
- Same user can't be referred twice (database constraint)

### Tracking (No UI Needed)
You can ask me anytime to run a query showing each code's signups and conversions. When volume grows, we can add a simple admin dashboard.

