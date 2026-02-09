

# Surface Grammar Drills Across the App

## The Problem

Grammar Drills is only accessible via a small "Grammar Drills" pill button in the top-right corner of the AI Tutor page. A user who never visits the AI Tutor tab will never discover it. Even users on the AI Tutor page may not notice the small button.

## The Solution: Surface It in 3 Key Places

### 1. Dashboard: Add a Grammar Drills Quick-Action Card

Add a dedicated card on the Dashboard (below "Continue Learning" or near the stats section) that promotes Grammar Drills as a daily practice activity.

- A card with a pencil/pen icon, title "Grammar Drills", subtitle like "Practice cases, verbs & more"
- Tapping it navigates to `/grammar-drill`
- Styled similarly to the "Continue Learning" CTA but secondary (border style, not filled)

**File:** `src/pages/Dashboard.tsx`

### 2. Practice Page: Add a Grammar Drills Section at the Top

The Practice page is all about review and reinforcement -- Grammar Drills belongs here naturally. Add a prominent card above the vocabulary categories.

- A highlighted card with title "Grammar Drills" and brief description
- Topic pills (Cases, Verbs, Gender, etc.) as quick-launch buttons that deep-link to `/grammar-drill?topic=cases` etc.
- This makes Grammar Drills feel like a first-class part of the Practice tab

**File:** `src/pages/Practice.tsx`

### 3. Keep the AI Tutor Link (but make it more visible)

The existing link in the Grammar Assistant header is fine as a cross-link, but keep it as-is since we're adding primary entry points elsewhere.

---

## Technical Details

**Files to modify:**
- `src/pages/Dashboard.tsx` -- add Grammar Drills quick-action card after the "Continue Learning" button
- `src/pages/Practice.tsx` -- add a Grammar Drills section above the vocabulary categories with topic quick-launch chips

**No new files, dependencies, or database changes needed.**

