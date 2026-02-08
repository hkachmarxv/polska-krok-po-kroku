

# PolishPal A1 -- Full Course Transformation Plan

## Vision

Transform PolishPal from a vocabulary practice app into a **complete, structured A1 Polish course** based on the "Hurra!!! Po Polsku 1" textbook curriculum. A person who follows this app from start to finish should be able to reach A1 proficiency.

---

## Current State (What We Keep)

Everything we built stays, but gets reorganized:

- **Flashcards** (with spaced repetition) -- moves into each lesson as a study tool
- **Vocabulary Quizzes** (multiple choice + typing) -- becomes per-lesson quizzes
- **Grammar Assistant** (AI chat) -- stays as a global tool, always accessible
- **Grammar Drills** (fill-in-the-blank) -- becomes per-lesson drills with lesson-specific topics
- **Progress tracking** (streak, accuracy, mastery) -- expands to track lesson-level progress
- **Word of the Day** -- stays on the dashboard

---

## New App Structure

### Navigation

```text
Dashboard (home)
  |
  +-- Course (20 lessons, sequential)
  |     |
  |     +-- Lesson 1: "Pierwszy kontakt"
  |     |     +-- Learn (vocabulary + grammar notes)
  |     |     +-- Flashcards
  |     |     +-- Grammar Drill
  |     |     +-- Quiz
  |     |
  |     +-- Lesson 2: "Kto to jest?"
  |     |     +-- (same structure)
  |     ... (through Lesson 20)
  |
  +-- Practice (existing features, all lessons)
  |     +-- Flashcards (by category/lesson)
  |     +-- Grammar Drills (by topic)
  |
  +-- Tools
  |     +-- Grammar Assistant (AI chat)
  |     +-- Word of the Day
  |
  +-- Progress
        +-- Overall stats
        +-- Per-lesson completion
```

### Dashboard Redesign

The dashboard becomes a **course overview**:
- Current lesson progress indicator (e.g., "Lesson 4 of 20")
- Continue button for the next incomplete lesson
- Word of the Day (kept)
- Quick stats (streak, words learned, accuracy)
- Bottom tabs or sidebar for: Course, Practice, Tools

---

## The 20 Lessons (from the textbook)

Each lesson maps to a chapter from the book, with these components:

| # | Lesson Title | Key Topics |
|---|---|---|
| 1 | Pierwszy kontakt | Pronunciation, alphabet, greetings (cześć, dzień dobry, do widzenia) |
| 2 | Kto to jest? | Describing people, adjectives, nominative case, numbers 11-23 |
| 3 | Kim Pan/Pani jest? | Nationalities, professions, conjugation -m/-sz |
| 4 | Moja rodzina | Family, possessive pronouns, accusative case, numbers 20-100 |
| 5 | Co lubisz robić? | Hobbies, frequency adverbs, -ować verbs, modal verbs |
| 6 | Mniam, mniam! | Food, ordering, prices, nominative plural, instrumental case |
| 7 | Mój dzień | Daily routine, times, days of week, verbs of motion |
| 8 | Mam wolny czas! | Free time, genitive singular, making plans, PKP |
| 9 | Na zakupach | Shopping, clothes, colors, genitive plural, dative pronouns |
| 10 | Co robiłeś wczoraj? | Past tense (imperfective), months, time expressions |
| 11 | Jakie masz plany? | Future tense, plans, wishes, New Year resolutions |
| 12 | Gdzie jesteś? | Directions, locative case, city navigation, landmarks |
| 13 | Jadę na urlop! | Travel, vacation, booking, prepositions of place |
| 14 | Szukam mieszkania | Home, furniture, rooms, locative descriptions |
| 15 | Jest zimno i wszystko mnie boli! | Weather, health, body parts, doctor visit, giving advice |
| 16 | Urodziłem się w Polsce | Biography, past tense (perfective vs imperfective aspect) |
| 17 | Sport to zdrowie? | Sports, conditional mood (chciałbym), comparisons |
| 18 | Czy lubisz uczyć się języka polskiego? | Education, opinions, learning strategies |
| 19 | Wszystkiego najlepszego! | Holidays, traditions, wishes and greetings |
| 20 | To jest moja wizytówka | Business, office, formal speech, presentations |

---

## What Each Lesson Contains

### 1. Learn Tab
- **Vocabulary list**: 15-25 key words/phrases with Polish, English, phonetic, gender, and grammar tips
- **Grammar summary**: Clear, concise explanation of the lesson's grammar point (e.g., "Accusative Case" with tables and examples)
- **Cultural note**: Brief context about Polish culture relevant to the lesson
- **Example dialogues**: 2-3 short dialogues showing vocabulary in context

### 2. Flashcards Tab
- Uses existing flashcard component, scoped to this lesson's vocabulary
- Spaced repetition still works across the whole app

### 3. Grammar Drill Tab
- Uses existing AI-powered grammar drill, but pre-configured with the lesson's grammar topic
- E.g., Lesson 4 drills focus on accusative case

### 4. Quiz Tab
- Uses existing quiz component, scoped to this lesson's words
- Must score 70%+ to "complete" the lesson

---

## Technical Implementation

### Data Layer

**New file: `src/data/a1Course.ts`**
- Contains all 20 lessons with structured data:
  - Vocabulary (extending the existing `Word` interface)
  - Grammar summaries (markdown strings)
  - Dialogues
  - Cultural notes
- The existing `polishWords.ts` categories map into lessons

**Expanded Word interface:**
```text
Word + {
  lesson: number        (1-20)
  exampleSentence?      (Polish sentence using the word)
  exampleTranslation?   (English translation of the sentence)
}
```

### New Pages

| Page | Route | Purpose |
|---|---|---|
| CourseOverview | `/course` | List of 20 lessons with progress |
| LessonPage | `/lesson/:lessonId` | Tabbed view: Learn, Flashcards, Drill, Quiz |

### Modified Pages

| Page | Change |
|---|---|
| Dashboard | Redesigned with course progress, "Continue Learning" button, bottom nav |
| Flashcards | Accept `lessonId` param in addition to `categoryId` |
| Quiz | Accept `lessonId` param in addition to `categoryId` |
| GrammarDrill | Accept optional `topic` + `lessonId` query params |

### Progress System Update

Extend `useProgress` to track:
- `lessonsCompleted: number[]` -- array of completed lesson IDs
- `currentLesson: number` -- which lesson the user is on
- Lesson completion requires: viewed vocab + 70% quiz score

### Routing Update

```text
/                        Dashboard
/course                  Course overview (20 lessons)
/lesson/:id              Lesson detail (tabs: Learn, Cards, Drill, Quiz)
/lesson/:id/flashcards   Lesson flashcards
/lesson/:id/quiz         Lesson quiz
/lesson/:id/drill        Lesson grammar drill
/grammar                 Grammar Assistant (unchanged)
/flashcards/:categoryId  Legacy category flashcards (still works)
/quiz/:categoryId        Legacy category quizzes (still works)
```

---

## Implementation Phases

### Phase 1 -- Data Foundation
- Create `src/data/a1Course.ts` with all 20 lessons
- Extract vocabulary, grammar notes, dialogues, and cultural context from the parsed PDFs
- Map existing `polishWords.ts` words into lessons where they fit
- Add ~200 new words to cover the full A1 curriculum

### Phase 2 -- Course UI
- Build `CourseOverview` page (lesson list with lock/unlock/complete states)
- Build `LessonPage` with tabs (Learn, Flashcards, Drill, Quiz)
- Build the "Learn" tab component (vocabulary table, grammar notes, dialogues)

### Phase 3 -- Dashboard Redesign
- Add course progress bar and "Continue Learning" CTA
- Add bottom navigation (Home, Course, Practice, Tools)
- Keep existing stats and Word of the Day

### Phase 4 -- Progress Integration
- Update `useProgress` hook for lesson tracking
- Add lesson completion logic (quiz score threshold)
- Add sequential unlock (lesson N+1 unlocks when N is completed)

### Phase 5 -- Polish and Refine
- Ensure all existing features (Grammar Assistant, Grammar Drills) still work
- Add lesson-specific grammar drill topics
- Test end-to-end flow from Lesson 1 through 20

---

## Content Scope

Based on the parsed textbook, the app will include approximately:
- **400+ vocabulary items** across 20 lessons
- **20 grammar topics** with clear explanations and tables
- **40+ example dialogues** for real-world context
- **20 cultural notes** about Polish life
- All with phonetic guides, gender markers, and grammar tips

This creates a self-contained A1 Polish course that someone can genuinely learn from, start to finish.

