

# Simplify the Lesson Experience: A Guided Learning Journey

## The Problem

Right now, when you enter a lesson, you see:

1. A row of **6 tiny tabs** (Learn, Cards, Build, Match, Drill, Quiz) all crammed into one line
2. The "Learn" tab immediately dumps a huge vocabulary list on you
3. There's no sense of **progression** — everything feels equally important and equally available
4. It's unclear what to do first or what order to follow

This makes the app feel overwhelming instead of guiding you step by step.

## The Solution: A Step-by-Step Lesson Flow

Replace the flat tab system with a **guided vertical journey** inside each lesson. Think of it like a path the user walks through, one step at a time — similar to how Duolingo presents a lesson as a sequence, not a buffet.

### New Lesson Page Layout

Instead of 6 equal tabs, the lesson page becomes a **scrollable list of steps** with clear numbering, icons, and status indicators:

```text
+-------------------------------------------+
|  <- Lesson 1: Cześć!                      |
|     Hello & Introductions                  |
+-------------------------------------------+
|                                            |
|  STEP 1  [completed checkmark]             |
|  +-------------------------------------+  |
|  | 📖  Learn the Words                 |  |
|  |  Study vocabulary & grammar          |  |
|  +-------------------------------------+  |
|                                            |
|  STEP 2  [completed checkmark]             |
|  +-------------------------------------+  |
|  | 🃏  Flashcards                      |  |
|  |  Practice with spaced repetition     |  |
|  +-------------------------------------+  |
|                                            |
|  STEP 3  [unlocked, current]               |
|  +-------------------------------------+  |
|  | 🔨  Build Sentences                 |  |
|  |  Arrange words in correct order      |  |
|  +-------------------------------------+  |
|                                            |
|  STEP 4  [locked]                          |
|  +-------------------------------------+  |
|  | 🎯  Match Game                      |  |
|  |  Match Polish-English pairs          |  |
|  +-------------------------------------+  |
|                                            |
|  STEP 5  [locked]                          |
|  +-------------------------------------+  |
|  | 📐  Grammar Drill                   |  |
|  |  AI-powered grammar practice         |  |
|  +-------------------------------------+  |
|                                            |
|  STEP 6  [locked]                          |
|  +-------------------------------------+  |
|  | 📝  Final Quiz                      |  |
|  |  Score 70%+ to complete the lesson   |  |
|  +-------------------------------------+  |
|                                            |
+-------------------------------------------+
```

### How It Works

- **Step 1 (Learn)** is always open. Once the user scrolls through vocabulary and dialogues, they mark it as "done" with a button at the bottom
- **Steps 2-5** unlock sequentially. Completing one step unlocks the next
- **Step 6 (Quiz)** is always the final gate — pass it (70%+) to complete the lesson
- Each step card shows: emoji, title, subtitle, and a status badge (locked / current / done)
- Tapping a step opens it full-screen (same components we already have), with a back arrow to return to the step list
- Already-completed steps can be revisited anytime (they stay green)

### Key UX Benefits

- **Clear direction**: Users always know what to do next
- **Sense of progress**: Completing a step feels rewarding (character celebration + sound)
- **No overwhelm**: Only one activity at a time, not 6 tabs competing for attention
- **Safety**: Locked steps prevent users from jumping ahead unprepared

### Learn Tab Simplification

The vocabulary list inside "Learn" (Step 1) will also be cleaned up:
- **Collapsible sections**: Vocabulary, Grammar, Dialogues, and Cultural Note each become expandable cards instead of one long scroll
- **"I've studied this" button** at the bottom to mark Step 1 as done and unlock Step 2

## Technical Plan

### Files to Modify

1. **`src/pages/LessonPage.tsx`** — Complete rewrite of the layout:
   - Remove the `Tabs` component entirely
   - Add state tracking for which step is active (`viewing` vs step list)
   - Track per-step completion in `useProgress` (new `lessonStepsCompleted` field in progress)
   - Render step list when no step is active, render the step's component when one is selected

2. **`src/hooks/useProgress.ts`** — Add step tracking:
   - New field: `lessonStepsCompleted: Record<number, number[]>` (lesson ID to array of completed step numbers)
   - New methods: `completeStep(lessonId, stepNumber)`, `isStepCompleted(lessonId, stepNumber)`
   - Steps 1-5 are individually tracked; Step 6 (Quiz) completion triggers the existing `completeLesson`

3. **`src/components/course/LessonLearnTab.tsx`** — Add collapsible sections:
   - Wrap Vocabulary, Grammar, Dialogues, and Cultural Note in collapsible cards
   - Add a prominent "Mark as Studied" button at the bottom

4. **`src/components/course/LessonFlashcards.tsx`** — Add a "Complete Step" callback:
   - After reviewing all cards, show a "Done" button that triggers step completion

5. **`src/components/course/LessonSentenceBuilder.tsx`** — Same pattern:
   - On completion screen, trigger step completion callback

6. **`src/components/course/LessonMatchGame.tsx`** — Same pattern:
   - On game complete, trigger step completion callback

7. **`src/components/course/LessonGrammarDrill.tsx`** — Same pattern

8. **`src/components/course/LessonQuiz.tsx`** — Already triggers `completeLesson`; will also trigger step completion

### No Database Changes Needed

Step completion will be stored in the same `user_progress` localStorage/cloud sync structure that already exists, just adding a new field to the JSON.

### Implementation Order

1. Update `useProgress` with step tracking logic
2. Rewrite `LessonPage.tsx` with the step-based layout
3. Add "Complete Step" buttons/callbacks to each exercise component
4. Add collapsible sections to `LessonLearnTab`
5. Test the full flow end to end

