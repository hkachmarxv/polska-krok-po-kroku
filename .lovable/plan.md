
# Update Pricing: $20/mo + $80 One-Time for A1

## What's Changing

The current pricing ($39/mo and $149 lifetime with "all future levels included") will be replaced with a simpler, per-level pricing model:

- **Monthly**: $20/month -- full A1 access, cancel anytime
- **One-Time**: $80 -- permanent A1 access, pay once
- No more "future levels included" promise
- Same features for both plans (only difference is payment structure)

## Stripe Changes

Create two new Stripe products/prices to replace the current ones:
- **Product**: "LearnPolski A1 Monthly" at $20/month (subscription)
- **Product**: "LearnPolski A1 One-Time" at $80 one-time (payment)

Update the price IDs in `src/hooks/useSubscription.tsx` (the `PLANS` constant).

## Files to Modify

### 1. `src/hooks/useSubscription.tsx`
- Update `PLANS` with new price IDs, names, and display prices
- Rename "Lifetime" to "One-Time" throughout

### 2. `src/pages/Pricing.tsx` (in-app pricing page)
- Update prices: $20/mo and $80 one-time
- Change "Lifetime Access" to "A1 Complete" or "One-Time Access"
- Remove "Lifetime access -- pay once, learn forever" line
- Update savings math: "Save $160 vs 12 months"
- Update feature copy to say "All 20 A1 lessons" (no mention of future levels)

### 3. `src/components/landing/PricingSection.tsx` (landing page)
- Update Monthly price from $39 to $20
- Update One-Time price from $149 to $80
- Remove "All future levels included" from the feature list
- Change "Lifetime" branding to "One-Time" or "A1 Complete"
- Update savings calculation
- Update subtitle text (remove "including all future levels as they launch")

### 4. `src/components/landing/RoadmapSection.tsx`
- Remove or soften the implication that future levels are included with current purchase
- Keep the roadmap as aspirational ("more levels coming") but don't tie it to pricing

### 5. `supabase/functions/check-subscription/index.ts`
- Update the hardcoded `lifetimePriceId` to the new one-time price ID

## Technical Details

- New Stripe products/prices will be created via the Stripe tool
- The `create-checkout` edge function already supports both `subscription` and `payment` modes, so no changes needed there
- The `check-subscription` function logic stays the same (checks active subs + one-time checkout sessions), just needs the new price ID
