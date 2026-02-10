

# Redesign: Pricing Section — Conversion-Optimized Layout

## Problems
1. **Badge inconsistency** — "MOST POPULAR" is centered top, two lines with emoji; "BEST VALUE" is top-right corner, single line. They look mismatched.
2. **Vertical misalignment** — Monthly card has `mt-6` on the heading to clear the centered badge, pushing the plan name and price lower than the Free and One-Time cards. All three prices ($0, $30, $80) should sit at the same visual level.
3. **Scale transform** — Monthly card uses `scale-[1.02]` which subtly throws off the grid alignment and can cause sub-pixel rendering issues.

## Design Principles (CRM/Conversion Best Practice)
- **Visual hierarchy**: The recommended plan (Monthly) should stand out via border/shadow/gradient — NOT by being misaligned.
- **Scanability**: Plan name → price → features → CTA must start at the same vertical position across all cards so users can compare instantly.
- **Badge consistency**: All badges use the same position (top-right corner), same size, same single-line format. Differentiated only by color.
- **Clean card tops**: No content pushed down by badges — badges overlay the top-right corner without affecting the card's internal flow.

## Changes (1 file)

**File:** `src/components/landing/PricingSection.tsx`

### 1. Monthly card badge (lines 79-81)
Move from centered to top-right corner, matching One-Time badge style:

**Before:**
```tsx
<div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-b-lg z-10">
  ⭐ MOST POPULAR
</div>
```

**After:**
```tsx
<div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
  MOST POPULAR
</div>
```

### 2. Monthly card heading (line 82)
Remove `mt-6` so the plan name aligns with Free and One-Time:

**Before:** `className="flex items-center gap-2 mb-1 mt-6"`
**After:** `className="flex items-center gap-2 mb-1"`

### 3. Monthly card container (line 77)
Remove `scale-[1.02]` — the border + shadow + gradient already differentiate it. Scale breaks vertical alignment:

**Before:** `className="... scale-[1.02] z-10"`
**After:** `className="... z-10"` (remove `scale-[1.02]`)

### 4. One-Time card badge (line 111)
Already correct position — just ensure padding matches Monthly badge (`px-3 py-1`). ✅ No change needed.

### 5. One-Time price spacing (line 118)
Change `mb-1` to `mb-4` on the price div (same as Free and Monthly), then remove the separate "Save $280" line's `mb-4` → `mb-3` to keep total spacing tight but aligned:

Actually, the savings line adds an extra row only on the One-Time card. To keep prices aligned:
- Keep price div with `mb-1` (as-is)
- Keep savings line with `mb-4` (as-is) — the total visual spacing from price to feature list is comparable

No change needed here — the savings text naturally fills the gap.

## Summary of net changes
| Location | Change |
|----------|--------|
| Monthly badge | Centered → top-right corner, remove emoji |
| Monthly heading | Remove `mt-6` |
| Monthly container | Remove `scale-[1.02]` |

3 small edits, all in PricingSection.tsx. Result: all three cards have names, prices, and features at the same vertical level, with matching corner badges.
