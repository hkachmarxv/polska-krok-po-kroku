

# App Navigation & Experience Overhaul

## The Problems (from a user's perspective)

1. **Steps are locked inside lessons** -- You want to try flashcards or the match game but you can't because you haven't completed the previous step. This feels restrictive, not safe.

2. **The AI Grammar Assistant is buried** -- It's your key differentiator, but it's hidden behind a "Tools" wrench icon in the bottom nav. A new user would never know it exists.

3. **The Alphabet is also buried in Tools** -- It's the recommended foundation before Lesson 1, but it sits alongside Grammar Drills in a generic "Tools" page. That's like hiding the front door behind a closet.

4. **The "Tools" tab itself is a catch-all** -- It groups unrelated things (Alphabet, Grammar Assistant, Grammar Drills) under a vague label. Nothing about it says "this is valuable."

5. **The bottom nav doesn't guide the journey** -- Home, Course, Practice, Tools -- this doesn't tell a story. "Practice" is category-based vocab drills separate from the course, which is confusing alongside the course's own flashcards and quizzes.

---

## The Solution: Restructure Around What Users Actually Need

### 1. Remove step locking inside lessons

All 6 steps remain visible and tappable. Completed steps show a checkmark. The "recommended next" step gets a subtle highlight (primary border), but nothing is ever disabled. Users can jump to any step they want.

This respects the user's autonomy while still guiding them with visual cues.

### 2. Kill the "Tools" page -- promote its contents

The Tools page disappears entirely. Its contents get promoted:

- **Grammar Assistant** gets its own bottom nav tab (replacing Tools) with a distinctive icon and label like "AI Tutor" -- this is the differentiator, it deserves prime real estate
- **Alphabet** moves into the Course page as a prominent "Lesson 0" card at the very top (it's already partially there, but we'll make it more prominent and remove it from Tools)
- **Grammar Drills** stay accessible from within lessons (Step 5) and can also be reached from the AI Tutor tab as a secondary action

### 3. Redesign the bottom navigation

Current: `Home | Course | Practice | Tools`

New: `Home | Course | Practice | AI Tutor`

The AI Tutor tab opens the Grammar Assistant directly -- no intermediate page. This puts your best feature one tap away at all times.

### 4. Add a floating "Ask AI" shortcut

During any lesson step, add a small floating button that lets users quickly ask the AI Grammar Assistant about something they just encountered -- without leaving the lesson. This creates a "learning companion" feel.

---

## Technical Plan

### Files to Modify

**1. `src/pages/LessonPage.tsx`** -- Remove locking logic
- Change `getStepStatus` to only return `'done'` or `'current'` (never `'locked'`)
- Remove the `disabled` prop and locked styling from step buttons
- The "current" highlight goes to the first incomplete step; all others show as available
- Keep the progress bar and completion checkmarks

**2. `src/components/BottomNav.tsx`** -- Replace Tools with AI Tutor
- Change the 4th tab from `{ label: 'Tools', icon: Wrench, path: '/tools' }` to `{ label: 'AI Tutor', icon: MessageCircleQuestion, path: '/grammar' }`
- Update the active-tab detection to match `/grammar` routes

**3. `src/pages/Tools.tsx`** -- Delete this page entirely
- Remove the file
- Remove its route from `App.tsx`

**4. `src/App.tsx`** -- Remove Tools route
- Delete the `/tools` route
- The `/grammar`, `/grammar-drill`, and `/alphabet` routes already exist independently

**5. `src/pages/CourseOverview.tsx`** -- Strengthen the Alphabet card
- The Alphabet "Lesson 0" card is already here; keep it as-is (it's already prominent with a gradient border)
- Optionally add a "Start Here" badge if the user hasn't visited it yet

**6. `src/pages/GrammarAssistant.tsx`** -- Small navigation update
- Change the "Back" button to navigate to `/dashboard` instead of `navigate(-1)` since it's now a primary tab destination, not a sub-page
- Add a small link/button to "Grammar Drills" at the bottom of the empty state so users can discover drills from this tab

### Files to Delete

- `src/pages/Tools.tsx`

### No database changes needed

This is purely a frontend navigation and UX restructure.

### Implementation Order

1. Update `LessonPage.tsx` to remove step locking (keep visual guidance)
2. Update `BottomNav.tsx` to replace Tools with AI Tutor
3. Delete `Tools.tsx` and remove its route from `App.tsx`
4. Update `GrammarAssistant.tsx` navigation and add Grammar Drills link
5. Optionally enhance the Alphabet card in `CourseOverview.tsx`

