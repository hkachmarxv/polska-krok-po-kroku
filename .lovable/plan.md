

# Polish Alphabet & Pronunciation Guide

## Vision

The alphabet is the absolute foundation of learning Polish. Before a learner can meaningfully engage with vocabulary, dialogues, or grammar, they need to **hear, see, and feel** how Polish sounds work. This isn't just a reference table -- it's the learner's first "aha moment" where Polish stops looking like a wall of consonants and starts making sense.

The goal: a learner finishes this section and thinks, *"Okay, I can actually read Polish words now."*

---

## What makes this different from a boring alphabet chart

Most apps dump a static table and move on. We'll build something that's **interactive, audio-first, and structured in layers** so learners build confidence progressively:

1. **Listen before you read** -- every letter and combination has a tap-to-hear button (using our existing ElevenLabs TTS)
2. **Group by difficulty, not alphabetical order** -- start with familiar sounds (a, b, d, e...), then introduce uniquely Polish ones (sz, cz, rz, nasal vowels)
3. **Minimal pairs** -- show how similar sounds differ (sz vs. s, z vs. rz) so learners train their ear
4. **Interactive practice** -- a simple "hear and pick" mini-game to test recognition
5. **Always accessible** -- this isn't a one-time page; it's a reference tool learners can revisit anytime

---

## Page Structure

The page will be a new route `/alphabet` accessible from the Course Overview page (as a prominent card above Lesson 1) and from the Tools page.

### Section 1: Overview & Stress Rules
- Brief intro: "Polish uses the Latin alphabet + 9 extra letters"
- The stress rule (second-to-last syllable) with audio examples
- Encouragement: "Most Polish letters sound exactly like you'd expect"

### Section 2: The Full Alphabet (Interactive Grid)
- All 32 letters in a clean grid layout
- Each letter card shows: **letter, phonetic approximation, example word, English meaning**
- Tap any card to hear the letter pronounced, then the example word
- Color-coded: green = "same as English", amber = "slightly different", red = "uniquely Polish"
- Expandable detail for each letter with mouth position tips

### Section 3: Special Characters Deep Dive
Grouped into logical clusters with audio for each:

- **Nasal vowels**: a vs. a with ogonek (a/a nasal), e vs. e with ogonek
- **Softened consonants**: c/ci, s/si, z/zi, n/ni (and their diacritical equivalents)
- **The "sh" family**: sz, cz, rz/z with dot, dz, dzi, dzs
- **The tricky ones**: l with stroke (w sound), w (v sound), o with accent (oo sound)

Each cluster has:
- Side-by-side audio comparison
- A memorable mnemonic or English word analogy
- An example Polish word with translation

### Section 4: Digraphs & Trigraphs
- ch, cz, sz, rz, dz, dzi, dzs -- explained as single sounds, not two letters
- Audio examples with common words

### Section 5: Mini Practice Game
- "Listen & Pick": hear a sound, tap the correct letter/digraph from 4 options
- "Read Aloud Challenge": see a word, tap to hear it, then try saying it yourself
- Tracks a simple score to give a sense of completion
- ~10 rounds, randomized from the alphabet data

### Section 6: Quick Reference Card
- A compact, printable-style summary card at the bottom
- Collapsible -- always there for quick lookups during lessons

---

## How it fits into the app

```text
Course Overview Page
+------------------------------------------+
|  [NEW] Polish Alphabet & Sounds          |
|  "Master the building blocks first"      |
|  [Start] or [Review]                     |
+------------------------------------------+
|  Lesson 1: Czesc, jestem tutaj!          |
|  Lesson 2: ...                           |
+------------------------------------------+
```

- Appears as a **"Lesson 0"** style card at the top of the Course Overview, visually distinct (gradient border, alphabet icon)
- Also linked from the **Tools** page as a reference
- Not gated by subscription -- free for all users (it's foundational and builds trust)
- Does NOT block Lesson 1 progression (optional but encouraged)

---

## Technical Approach

### New files to create:
- `src/pages/Alphabet.tsx` -- main page with all sections
- `src/data/alphabetData.ts` -- structured data for all letters, digraphs, examples, difficulty levels, and mnemonics
- `src/components/alphabet/AlphabetGrid.tsx` -- interactive letter grid with audio
- `src/components/alphabet/SoundCluster.tsx` -- grouped sound comparisons
- `src/components/alphabet/AlphabetPractice.tsx` -- the mini listen-and-pick game
- `src/components/alphabet/QuickReference.tsx` -- collapsible reference card

### Files to modify:
- `src/App.tsx` -- add `/alphabet` route (protected but free)
- `src/pages/CourseOverview.tsx` -- add the "Lesson 0" alphabet card at the top
- `src/pages/Tools.tsx` -- add alphabet reference link

### Reuses existing infrastructure:
- `SpeakButton` / TTS edge function for all audio
- Same card/tab UI patterns from lesson pages
- Progress tracking via `useProgress` (optional: track alphabet completion)
- Theme support (dark/light) via existing Tailwind setup

### Data structure (alphabetData.ts):
Each entry will contain: letter(s), IPA phonetic, English approximation, difficulty tier, example word, example translation, mnemonic hint, and audio text for TTS.

---

## Why this matters

Polish pronunciation is the #1 barrier that makes learners quit early. By giving them a dedicated, audio-rich, interactive space to build phonetic confidence *before* diving into vocabulary, we:

- Reduce anxiety ("I can't even read these words")
- Build a foundation that makes every future lesson easier
- Show that Polish is actually quite phonetically consistent (once you know the rules, you can read ANY word)
- Differentiate from competitors who treat pronunciation as an afterthought

