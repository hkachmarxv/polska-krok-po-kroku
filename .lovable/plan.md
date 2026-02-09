

# Full App Review: Issues Found and Improvements

## Critical Bug: Step Progress Not Syncing to Cloud

The `syncToCloud` function in `useProgress.ts` (line 352-369) does NOT include `lessonStepsCompleted` in the update payload. This means step completion data is only stored in localStorage and will be lost if a user switches devices or clears their browser. This needs to be fixed immediately by adding `lesson_steps_completed: progress.lessonStepsCompleted` to the sync payload.

Additionally, the `user_progress` table may not have a `lesson_steps_completed` column yet -- we need to verify and add a migration if missing.

---

## UX Issues Found

### 1. Practice page feels disconnected from the Course

The Practice tab shows category-based vocabulary (Food, Numbers, etc.) which overlaps with lesson content but uses a completely separate organization. A new user completing Lesson 1 sees "Practice" in the nav and gets confused -- "Didn't I just practice inside the lesson?"

**Fix:** Add a subtitle or context banner on the Practice page explaining it pulls vocabulary from ALL lessons for cross-cutting review. Something like: "Review vocabulary across all your completed lessons, organized by topic."

### 2. Review Reminders link is broken

`ReviewReminders.tsx` line 39 navigates to `/lesson/${lesson.id}?tab=flashcards` -- but the lesson page no longer uses tab-based navigation. It uses `activeStep` state. The `?tab=flashcards` query param is ignored, so users land on the step list instead of going directly into flashcards.

**Fix:** Update the link to navigate to `/lesson/${lesson.id}` and auto-open step 2 (Flashcards) via a query param like `?step=2`, then read that param in `LessonPage.tsx` to set `activeStep` on mount.

### 3. Flashcards "Back" button goes to root

In `Flashcards.tsx` (line 64), the standalone flashcards page navigates to `/` (landing page) instead of back to Practice. It should use `navigate(-1)` or navigate to `/practice`.

### 4. WhyUs comparison table is misleading

The comparison table says "Gamification & badges" has a red X for LearnPolski and green check for others. This frames your app negatively. Since you do have streaks, progress bars, and step completion -- that IS gamification. Either flip it to a check, or reword the row to something like "Gimmicky gamification" to make the comparison honest.

### 5. No empty state for Recent Scores on Dashboard

When a user first signs up, the Dashboard shows streak, words learned, and accuracy -- all at 0. But the "Recent Scores" section just doesn't appear at all. There's no nudge to take a quiz. Adding a small motivational card here would help conversion.

### 6. The `getStepStatus` function has dead logic

In `LessonPage.tsx` line 43-49, the function always returns `'current'` for non-completed steps. The `recommendedStep` variable already handles highlighting. The function's distinction is meaningless -- it could be simplified to just check `isDone`.

---

## Technical Improvements

### Files to Modify

**1. `src/hooks/useProgress.ts`** -- Fix cloud sync
- Add `lesson_steps_completed: progress.lessonStepsCompleted` to the `syncToCloud` function's update payload (line 356-366)
- Verify/add the column via a database migration

**2. `src/pages/LessonPage.tsx`** -- Fix review deep-linking + simplify logic
- Read `?step=N` query param on mount to auto-open a specific step (for Review Reminders)
- Simplify `getStepStatus` to just return `'done'` or `'available'`

**3. `src/components/ReviewReminders.tsx`** -- Fix navigation
- Change navigation from `/lesson/${lesson.id}?tab=flashcards` to `/lesson/${lesson.id}?step=2`

**4. `src/pages/Flashcards.tsx`** -- Fix back navigation
- Change `navigate('/')` to `navigate('/practice')` on the back button

**5. `src/pages/Practice.tsx`** -- Add context banner
- Add a brief explanation line: "Review vocabulary across all your lessons, organized by topic"

**6. `src/components/landing/WhyUsSection.tsx`** -- Fix comparison honesty
- Change "Gamification & badges" row: flip `us: true` since LearnPolski does have streaks, progress tracking, and step completion rewards

**7. `src/pages/Dashboard.tsx`** -- Add empty quiz state
- When `quizResults.length === 0`, show a small card encouraging the user to start Lesson 1's quiz

### Database Migration

Add `lesson_steps_completed` column to `user_progress` table if it doesn't already exist:
```sql
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS lesson_steps_completed jsonb DEFAULT '{}';
```

### Implementation Order

1. Database migration for `lesson_steps_completed` column
2. Fix `syncToCloud` in `useProgress.ts`
3. Fix Review Reminders deep-linking + LessonPage query param reading
4. Fix Flashcards back button
5. Update Practice page banner
6. Fix WhyUs comparison
7. Add Dashboard empty quiz state

