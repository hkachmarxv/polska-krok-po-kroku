

# Enhanced Grammar Drills: Teach the Word, Not Just the Form

## What Changes

After answering a drill, the student will:
1. See the English translation with the blank filled in (no more mystery meaning)
2. See a vocabulary card with the dictionary form, meaning, syllable breakdown, and a listen button
3. Handle edge cases where the tested item is a grammar-only concept (endings, pronouns)

## Files Changed (3 files)

### 1. Edge Function: `supabase/functions/grammar-drill/index.ts`

**Update the system prompt** to require two new fields in the JSON output:

- `translationFull` -- the English sentence with the blank filled in (e.g. "My sister is a very **talented** student.")
- `vocabulary` -- object with word details:

```text
"translationFull": "My sister is a very talented student.",
"vocabulary": {
  "type": "word",          // "word" or "grammar_only"
  "lemma": "zdolny",       // dictionary form
  "meaning": "talented, gifted",
  "syllables": "zdol-ny",  // syllable split (not IPA)
  "genderForms": {         // optional, only for adjectives/nouns
    "m": "zdolny",
    "f": "zdolna",
    "n": "zdolne"
  },
  "examplePl": "Moja siostra jest bardzo zdolna.",
  "exampleEn": "My sister is very talented."
}
```

For grammar-only items (endings, pronouns, particles), the AI returns:

```text
"vocabulary": {
  "type": "grammar_only",
  "note": "The ending -a marks feminine singular in the nominative case."
}
```

**Bump `MAX_OUTPUT_TOKENS`** from 512 to 700 to accommodate the larger response.

**Add server-side validation** after JSON.parse: if `vocabulary` is missing or malformed, strip it out rather than failing -- the drill still works, just without the vocab card.

### 2. Standalone Drill Page: `src/pages/GrammarDrill.tsx`

- Extend the `Drill` interface with optional `translationFull` and `vocabulary` fields
- After answering, show `translationFull` instead of `translation` (with `___`) -- this is the 80% fix
- Below the explanation/tip section, render a **vocabulary card** (only when `vocabulary.type === "word"`):
  - Dictionary form (lemma) with a `SpeakButton`
  - Meaning in English
  - Syllable breakdown
  - Gender forms row (if present)
  - Example sentence pair
- When `vocabulary.type === "grammar_only"`, show a smaller card with the grammar note instead
- If `vocabulary` is missing entirely, no card shown -- graceful degradation

### 3. Lesson Drill Component: `src/components/course/LessonGrammarDrill.tsx`

Apply the same interface and UI changes as the standalone page to keep the in-lesson drill consistent.

## What This Does NOT Change

- Drill difficulty, topic selection, scoring, or AI limit logic
- No database changes
- No new dependencies
- The `vocabulary` field is optional so any in-flight or cached responses without it degrade gracefully

