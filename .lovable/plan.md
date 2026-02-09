

# Test Mode Plan

## What This Solves

Right now, to fully test the app you'd need to: pay for a subscription, complete lessons sequentially, and are limited to 5 AI uses per day. This makes it nearly impossible to verify all flows, test the premium experience, or check how checkout looks.

## How It Works

A hidden **Test Mode** toggle will be added to your Settings page, protected so only your admin email can see it. When enabled, a small indicator badge appears on screen so you always know you're in test mode.

### What Test Mode Unlocks

| Restriction | Normal | Test Mode |
|---|---|---|
| Lessons 2-20 | Locked (need payment) | All unlocked |
| Lesson sequence | Must complete previous | All accessible |
| AI Grammar tools | 5 uses/day | Unlimited |
| Checkout flow | Real Stripe payment | Stripe test mode (same flow, fake card numbers) |
| Subscription status | From Stripe API | Simulated as "subscribed" |

### For Testing Checkout Specifically

When test mode is on and you tap "Subscribe" or "Get Access", the checkout still opens Stripe -- but since your Stripe account has test mode, you can use Stripe's test card numbers (e.g., `4242 4242 4242 4242`, any future date, any CVC) to go through the full flow without real charges.

## Technical Details

### 1. Admin email constant

A single constant defines which email(s) can access test mode. Only your account email will be listed.

### 2. Settings page addition

A new card in Settings (visible only to admin emails) with a toggle switch labeled "Test Mode". The state is stored in `localStorage` under a key like `learnpolski-test-mode`.

### 3. Modify `useSubscription` hook

When test mode is active:
- `isLessonAccessible()` returns `true` for all lessons
- `subscribed` returns `true` (so upgrade banners hide and all content unlocks)

### 4. Modify `CourseOverview` lesson sequencing

When test mode is active:
- `isUnlocked()` returns `true` for all lessons (bypass sequential requirement)

### 5. Modify `useAiUsage` hook

When test mode is active:
- `canUse` always returns `true`
- `remaining` shows unlimited

### 6. Visual indicator

A small fixed-position badge (bottom-right or top-right, near the edge) showing "TEST MODE" in a bright color so you never accidentally confuse test with production behavior.

### Files to Create/Modify

- **New**: `src/hooks/useTestMode.ts` — simple hook reading localStorage + checking admin email
- **Modify**: `src/hooks/useSubscription.tsx` — override gating when test mode on
- **Modify**: `src/hooks/useAiUsage.ts` — bypass daily limit when test mode on
- **Modify**: `src/pages/CourseOverview.tsx` — bypass sequential lock when test mode on
- **Modify**: `src/pages/Settings.tsx` — add test mode toggle (admin only)
- **Modify**: `src/App.tsx` — add floating test mode indicator component

