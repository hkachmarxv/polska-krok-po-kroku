
# Redesign: Pricing Section -- Push One-Time as the Hero

## Strategy

The goal is to psychologically steer visitors toward the $80 one-time plan. Right now all three cards look roughly equal, with Monthly actually getting the most visual weight. The redesign flips that by making the One-Time card the undeniable hero of the section.

## Key Design Decisions

### 1. Two-column layout instead of three equal columns
- **Left column (smaller, ~40% width):** Stack the Free tier and Monthly tier vertically as compact, understated options.
- **Right column (larger, ~60% width):** A single large, visually dominant One-Time card that towers over the left column.

This immediately draws the eye to the One-Time card because it's physically bigger and takes up more space.

### 2. One-Time card gets the "hero" treatment
- Larger card with more padding and a subtle gradient background (primary color tint)
- A bold "RECOMMENDED" or "BEST VALUE" ribbon/badge
- Prominent price display with a crossed-out comparison price ("~~$360~~ $80 -- Save 78%")
- A filled, high-contrast CTA button (primary color, large size)
- Add a "one-time payment, no recurring charges" trust line with a shield icon
- The "Pay once -- keep forever" line gets elevated to a highlighted callout box inside the card

### 3. Monthly and Free become secondary
- Monthly: simple bordered card, outline CTA button, no badge
- Free: even more minimal -- almost a text block with a subtle "Start Free" link
- Both use muted styling so they don't compete with the One-Time card

### 4. Social proof anchor
- Below the cards, add a short line: "Trusted by 500+ Polish learners" or similar (even a placeholder count) to reinforce the decision

### 5. Price anchoring
- Show the monthly cost annualized: "$30/mo = $360/year" next to the One-Time $80 to make the savings visceral
- Add a small "That's less than 3 months of Monthly" tagline under the One-Time price

## Technical Changes

### File: `src/components/landing/PricingSection.tsx`

**Layout restructure:**
- Change from `grid md:grid-cols-3` to a two-column layout: `grid md:grid-cols-5 gap-6`
- Left column (`md:col-span-2`): Free card and Monthly card stacked vertically with `space-y-4`
- Right column (`md:col-span-3`): One-Time card spanning full height with `h-full`

**One-Time card upgrades:**
- Larger padding (`p-8`), stronger border (`border-2 border-primary`), gradient background
- Add crossed-out annual price: `<span className="line-through text-muted-foreground text-lg">$360</span>` next to the $80
- Change savings text from "Save $280 vs 12 months" to "Save 78% vs Monthly" -- percentages feel bigger
- Add a highlighted trust callout: a small rounded box with shield icon saying "One payment. No subscriptions. Yours forever."
- CTA becomes a large filled primary button: "Get Lifetime Access -- $80"
- Add subtle animation: the card enters with a slight scale-up (`scale: [0.95, 1]`)

**Monthly card simplification:**
- Remove the gradient background and shadow -- plain `bg-card border border-border`
- Remove "MOST POPULAR" badge entirely (we don't want to push this)
- Keep outline CTA button

**Free card:**
- Stays minimal, no changes needed

**Social proof line:**
- Add a centered text below the grid: "Join hundreds of learners mastering Polish" with a subtle icon

## Visual Hierarchy (top to bottom priority)

```text
+---------------------------+--------------------------------------+
|  Free          Monthly    |                                      |
|  $0/forever    $30/mo     |   BEST VALUE                         |
|                           |                                      |
|  - Lesson 1    - All 20   |   One-Time Access                    |
|  - Flashcards  - AI tools |   ~~$360~~  $80  (Save 78%)          |
|  - TTS         - Streaks  |                                      |
|                           |   [all features listed]              |
|  [Start Free]  [Subscribe |                                      |
|                 Monthly]  |   [Shield] One payment. Yours forever|
|                           |                                      |
|                           |   [ Get Lifetime Access -- $80 ]     |
+---------------------------+--------------------------------------+
         Join hundreds of learners mastering Polish
```

This layout uses size, color, and positioning to make the One-Time card the obvious choice while keeping the other options accessible for those who prefer them.
