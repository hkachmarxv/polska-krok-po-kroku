

# Fix: Emoji Overlapping Character Mascots

## Problem
The mood emoji badge on all four mascot characters (Kazik, Basia, Rysiek, Lila) is positioned with `absolute -top-1 -right-1`, which causes it to stack directly on top of the character's head/body -- especially noticeable at the small 40px size used on the dashboard.

## Solution
Move the emoji from overlapping the top-right corner to sitting **outside** the character container, offset further so it doesn't cover any part of the SVG.

## Changes (4 files)

All four character components get the same one-line CSS change on the emoji `<span>`:

**Before:** `className="absolute -top-1 -right-1 text-sm"`
**After:** `className="absolute -top-2 -right-3 text-[10px]"`

This pushes the emoji further out and makes it slightly smaller so it acts as a subtle badge rather than covering the character art.

### Files
1. `src/components/characters/Kazik.tsx` -- line with the mood emoji span
2. `src/components/characters/Basia.tsx` -- same change
3. `src/components/characters/Rysiek.tsx` -- same change
4. `src/components/characters/Lila.tsx` -- same change

No other files are affected. The `CharacterReaction` wrapper and all consumers remain unchanged.
