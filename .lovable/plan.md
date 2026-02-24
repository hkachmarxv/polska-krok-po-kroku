

# Referral Code — Fix for Existing Users

## The Problem

You're right — there are two issues:

1. **The `?ref=` capture only runs on the Landing page and Auth page.** If you go directly to `/pricing` (or any other page), the code is never saved. So visiting `learnpolski.academy/pricing?ref=ANDRE` does nothing.

2. **Existing users never get the referral recorded in the database** — the `recordReferral` function only fires for brand-new accounts (created within the last 2 minutes). But the **discount at checkout should still work** for existing users, because `startCheckout` reads `referral_code` from localStorage regardless. The issue is just that the code was never captured in the first place if you didn't land on `/` or `/auth`.

## The Fix

### 1. Move `?ref=` capture to a global level (App.tsx or a shared hook)
Instead of duplicating the capture logic on individual pages, run it once at the app level so it works on **every** route — landing, auth, pricing, dashboard, anywhere.

### 2. Add a "Have a referral code?" input on the Pricing page
For existing users who don't have a `?ref=` link, add a small collapsible input field on the Pricing page where they can manually type a code (e.g. `ANDRE`). When they enter it, it gets saved to localStorage and applied at checkout — same mechanism, just manual entry.

### 3. Record referrals for existing users too (optional)
Currently, only new sign-ups get a row in the `referrals` table. We could also record existing users who use a referral code at checkout time (inside the edge function), so you get full tracking regardless of account age.

## Changes Summary

| File | Change |
|------|--------|
| `src/pages/LandingPage.tsx` | Remove the `?ref=` capture code (moved to global) |
| `src/pages/Auth.tsx` | Remove the `?ref=` capture code (moved to global) |
| `src/App.tsx` | Add a global `useEffect` to capture `?ref=` from URL on any page |
| `src/pages/Pricing.tsx` | Add a small "Have a referral code?" collapsible input below the free-plan banner |
| `supabase/functions/create-checkout/index.ts` | Also insert a `referrals` row for existing users who use a code (if they don't already have one) |

## Technical Details

- The global capture hook checks `window.location.search` for `ref` param, saves to `localStorage`, and cleans the URL — runs once on app mount regardless of route.
- The Pricing page input validates the code against the `referral_codes` table before saving it, showing a green checkmark or "Invalid code" feedback.
- The edge function will upsert into `referrals` when a valid code is used at checkout, covering both new and existing users.

