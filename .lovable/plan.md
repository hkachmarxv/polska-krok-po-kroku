

# PolishPal Improvement Plan

Here are 7 high-impact improvements to make the app significantly better, organized by priority.

---

## 1. Listening Practice -- Audio Pronunciation

**Problem**: Learning Polish without hearing the words is like learning music without sound. Polish pronunciation (sz, cz, rz, nasal vowels) is notoriously tricky and can't be learned from phonetic text alone.

**Solution**: Add a speaker button next to every Polish word that uses the browser's built-in Web Speech API (free, no API key needed) to pronounce words aloud. Works in flashcards, vocabulary lists, quizzes, and dialogues.

**Technical approach**:
- Create a reusable `SpeakButton` component using `window.speechSynthesis` with Polish (`pl-PL`) voice
- Add it to `LessonLearnTab` (vocabulary list + dialogues), `LessonFlashcards` (card back), `LessonQuiz` (after answering), and the legacy `Flashcards` page
- Fallback message if Polish voice is unavailable on the device

---

## 2. Sentence Building Exercises

**Problem**: The current exercises test recognition (pick the right answer) but not production (construct something yourself). Sentence building is a critical step between passive recognition and active speaking.

**Solution**: Add a "Build" exercise type where users arrange scrambled Polish words into the correct sentence order. This teaches word order, case endings, and sentence structure.

**Technical approach**:
- New `LessonSentenceBuilder` component using drag-and-drop or tap-to-order
- Pull example sentences from lesson vocabulary (`exampleSentence` field)
- Split sentences into words, shuffle them, and let users tap words in order
- Add as a 5th tab in `LessonPage`

---

## 3. Dark Mode Toggle

**Problem**: The app already has full dark mode CSS variables defined but no way for users to switch to it. Many learners study in the evening.

**Solution**: Add a theme toggle button in the app header that switches between light and dark mode, persisted in localStorage.

**Technical approach**:
- The `next-themes` package is already installed -- just wire it up
- Add `ThemeProvider` in `App.tsx`
- Add a sun/moon toggle button to the Dashboard header and other page headers
- The dark theme CSS is already complete in `index.css`

---

## 4. Lesson Review / Spaced Repetition Reminders

**Problem**: Users complete a lesson and never revisit it. Without review, retention drops sharply after 24 hours (the forgetting curve).

**Solution**: Add a "Review" section on the Dashboard that highlights lessons with vocabulary due for review based on the existing spaced repetition data.

**Technical approach**:
- Use the existing `getDueCards` function to find words needing review across all completed lessons
- Group due words by lesson and show a "Review Lesson X" card on the Dashboard
- Tapping it opens that lesson's flashcards, pre-filtered to due cards only
- Add a "due for review" badge count on the Course tab in the bottom nav

---

## 5. Matching Game Exercise

**Problem**: Multiple choice and typing can feel repetitive after 20 lessons. Variety keeps learners engaged.

**Solution**: Add a timed matching game where users connect Polish words to their English translations by tapping pairs. Fast, fun, and tests recall without the pressure of typing.

**Technical approach**:
- New `LessonMatchGame` component
- Display 6 Polish words and 6 English translations in a grid
- Users tap one from each column to match them
- Correct matches fade out with a success animation
- Track time and show a score at the end
- Could be added to Practice page or as an optional exercise in lessons

---

## 6. Progress Persistence to Cloud

**Problem**: All progress is stored in localStorage, meaning it's lost if users clear their browser data, switch devices, or use incognito mode.

**Solution**: Save progress to the database so it persists across devices and sessions. This requires authentication so each user's progress is tied to their account.

**Technical approach**:
- Create a `user_progress` table with RLS policies
- Add simple email/password authentication (login/signup pages)
- Sync the existing `useProgress` hook to read/write from the database
- Keep localStorage as a fallback cache for offline use
- Auto-sync on app load and after each progress update

---

## 7. Lesson Notes / Personal Vocabulary

**Problem**: Learners often want to jot down personal notes, mnemonics, or mark certain words as "tricky." There's no way to do this currently.

**Solution**: Let users add personal notes to any lesson and star/flag individual vocabulary words for extra review.

**Technical approach**:
- Add a "Notes" section at the bottom of the Learn tab with a textarea (saved to localStorage or database)
- Add a star/bookmark icon on each vocabulary card
- Create a "Starred Words" section on the Practice page that aggregates all starred words into a custom flashcard deck

---

## Recommended Implementation Order

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| 1 | Dark Mode Toggle | Small | High (already 90% done) |
| 2 | Audio Pronunciation | Small | Very High |
| 3 | Review Reminders on Dashboard | Medium | High |
| 4 | Sentence Building Exercises | Medium | High |
| 5 | Matching Game | Medium | Medium |
| 6 | Progress Persistence (Cloud) | Large | Very High |
| 7 | Personal Notes / Starred Words | Medium | Medium |

I'd suggest starting with **Dark Mode** (quick win) and **Audio Pronunciation** (biggest learning impact), then moving to the review system and new exercise types.

