

# LearnPolski Experience Overhaul: Characters, Sound Effects, Streak Freeze, and Polish

This is a large, multi-part feature set. Here's the breakdown organized into phases that can be implemented sequentially.

---

## Phase 1: Animal Mascot Characters

### Concept
Introduce a cast of **4 Polish animal characters** that appear throughout the app as SVG/emoji-based illustrations with expressive states:

| Character | Animal | Role | Polish Connection |
|-----------|--------|------|-------------------|
| **Kazik** | Stork (Bocian) | Main guide / cheerleader | Poland's national bird |
| **Basia** | Hedgehog (Jez) | Grammar helper | Common in Polish forests |
| **Rysiek** | European Bison (Zubr) | Streak motivator | Endangered Polish icon |
| **Lila** | Cat (Kot) | Quiz companion | Beloved in Polish culture |

### Character States (SVG components)
Each character will have **5 emotional states**, rendered as simple SVG React components:
- **Happy** — correct answer, streak maintained
- **Celebrating** — quiz passed, lesson completed
- **Sad** — wrong answer, streak lost
- **Thinking** — waiting for user input
- **Encouraging** — retry prompt, streak freeze used

### Where They Appear
- **Dashboard**: Kazik greets the user with contextual messages ("Great streak, Rysiek is proud!")
- **Flashcards**: Lila reacts to correct/incorrect flips
- **Quiz**: Basia celebrates correct answers, looks sad on wrong ones
- **Match Game**: Kazik cheers as matches are found
- **Sentence Builder**: Basia helps with grammar hints
- **Streak lost screen**: Rysiek looks sad (with freeze option)

### Technical Approach
- Create `src/components/characters/` directory with SVG-based React components
- Each character component accepts a `mood` prop: `happy | celebrating | sad | thinking | encouraging`
- Characters are small (48-64px) animated illustrations using CSS transitions and framer-motion
- Create a `CharacterReaction` wrapper component that manages mood transitions with smooth animations

---

## Phase 2: Sound Effects System

### Sound Effect Types
| Event | Sound | Description |
|-------|-------|-------------|
| Correct answer | Bright chime | Short, satisfying "ding" |
| Wrong answer | Soft buzz | Gentle "boop", not punishing |
| Quiz complete (pass) | Victory fanfare | Celebratory jingle (1-2 sec) |
| Quiz complete (fail) | Encouraging tone | Soft, motivating sound |
| Lesson complete | Achievement unlock | Triumphant sound with sparkle |
| Card flip | Soft click | Subtle paper flip sound |
| Match found | Pop/sparkle | Quick reward sound |
| Streak milestone | Level-up sound | For every 7-day milestone |
| Streak lost | Sad trombone (gentle) | Short, not annoying |

### Technical Approach
- Create an edge function `supabase/functions/elevenlabs-sfx/` using the **ElevenLabs Sound Effects API** (key already configured) to generate sounds
- Pre-generate all sounds and store as base64 in a `src/lib/sounds.ts` constants file (keeps them instant, no API calls during use)
- Create a `useSoundEffects` hook with methods like `playCorrect()`, `playWrong()`, `playComplete()`, etc.
- Add a **sound toggle** in Settings page (stored in localStorage) so users can mute SFX
- Sounds are short (0.3-2 seconds) and non-intrusive

---

## Phase 3: Streak Freeze Feature

### How It Works
- Every new user starts with **10 streak freezes**
- When a user misses a day, the system automatically uses 1 freeze to preserve their streak
- Dashboard shows remaining freezes next to the streak counter
- When freezes run out and a day is missed, streak resets to 0 (with sad Rysiek animation)
- Future monetization: users can purchase additional freezes

### Technical Changes
- Add `streak_freezes` column to `user_progress` table (default: 10)
- Update `useProgress.ts` streak logic:
  - When `lastPracticeDate` is more than 1 day ago but within 2 days, check freezes
  - If freezes > 0: decrement freeze count, keep streak, show "freeze used" notification
  - If freezes = 0: reset streak, show "streak lost" screen with sad character
- Add freeze count display on Dashboard (snowflake icon next to streak fire)
- Add a `StreakLostModal` component with Rysiek looking sad and an option to buy more freezes (future)

---

## Phase 4: Dialogue Gender Detection Fix

### The Bug
In `LessonLearnTab.tsx`, the `getSpeakerGender` function checks each dialogue line **independently** for names. So when Speaker B says "Jestem z Krakowa. A Pani?" (without repeating their name), the function defaults B to female. But B is Marek (male), who introduced himself in an earlier line.

### The Fix
- Refactor `getSpeakerGender` to do a **two-pass approach**:
  1. First pass: scan ALL lines in the dialogue to build a speaker-to-gender map (A=Anna=female, B=Marek=male)
  2. Second pass: use the map when rendering each line
- This ensures once a speaker's gender is identified from any line, it applies to all their lines in that dialogue

---

## Phase 5: Flashcard Visual Enhancement

### Changes
- Add **emoji or icon** to each flashcard based on the word's `category` field (e.g., greetings = wave emoji, food = fork/knife, etc.)
- Create a category-to-emoji mapping in a utility file
- Display the emoji prominently on the front of the flashcard
- For vocabulary with `exampleSentence`, show a subtle context line on the back

---

## Phase 6: Gender Labels UX Fix

### The Problem
Users don't know what "masc" or "fem" means. The abbreviations are confusing for non-linguists.

### The Solution
Replace text labels with intuitive icons across the entire app:

| Current | New |
|---------|-----|
| `masc` / `masculine` | Male silhouette icon with "He" tooltip |
| `fem` / `feminine` | Female silhouette icon with "She" tooltip |
| `neut` / `neuter` | Circle icon with "It" tooltip |

Specifically:
- Create a `GenderBadge` component that renders a small icon with a tooltip
- For masculine: blue-tinted male icon with tooltip "He form (masculine)"
- For feminine: pink-tinted female icon with tooltip "She form (feminine)"  
- For neuter: gray circle icon with tooltip "It form (neuter)"
- Update `WordOfTheDay`, `LessonFlashcards`, `LessonLearnTab`, and any other place gender badges appear

---

## Files to Create
- `src/components/characters/Kazik.tsx` (Stork - main guide)
- `src/components/characters/Basia.tsx` (Hedgehog - grammar)
- `src/components/characters/Rysiek.tsx` (Bison - streaks)
- `src/components/characters/Lila.tsx` (Cat - quizzes)
- `src/components/characters/CharacterReaction.tsx` (wrapper with animation)
- `src/components/GenderBadge.tsx`
- `src/components/StreakFreezeDisplay.tsx`
- `src/components/StreakLostModal.tsx`
- `src/hooks/useSoundEffects.ts`
- `src/lib/sounds.ts` (pre-generated sound data)
- `src/lib/categoryEmojis.ts` (category-to-emoji mapping)

## Files to Modify
- `src/hooks/useProgress.ts` — streak freeze logic
- `src/components/course/LessonLearnTab.tsx` — fix dialogue gender detection, add characters
- `src/components/course/LessonFlashcards.tsx` — add emojis, character reactions, sounds
- `src/components/course/LessonQuiz.tsx` — add character reactions, sounds
- `src/components/course/LessonMatchGame.tsx` — add sounds, character
- `src/components/course/LessonSentenceBuilder.tsx` — add sounds, character
- `src/components/WordOfTheDay.tsx` — replace gender text with GenderBadge
- `src/pages/Dashboard.tsx` — add character greeting, streak freeze display
- `src/pages/Settings.tsx` — add sound effects toggle
- Database migration: add `streak_freezes` column to `user_progress`

## Implementation Order
1. Gender Badge component + gender detection fix (quick wins, bug fixes)
2. Animal character SVG components (foundation for everything else)
3. Sound effects system (hook + pre-generated sounds)
4. Integrate characters + sounds into lesson components
5. Streak freeze (database + logic + UI)
6. Flashcard emoji enhancement
7. Polish and test all interactions end-to-end

