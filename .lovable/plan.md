

# Practice Page Expansion: Interactive Reference Cards

## Vision

Transform the Practice page from a simple drill launcher into a rich, visual learning hub. Each new section teaches a practical topic with **real sentences** (not just isolated words), audio support, and cultural context -- making the page a place learners want to browse even when they're not doing formal exercises.

## New Sections (6 total)

### 1. Colors in Context
- 10 common colors as visual swatches (colored circles/pills with Polish name, English, and gender marker)
- Each color includes a **practical sentence** showing how colors change with gender:
  - "Czerwony samochod" (red car, masculine) vs "Czerwona sukienka" (red dress, feminine)
- SpeakButton on each word and sentence
- Collapsible card, starts expanded
- Header: Palette emoji, "Colors / Kolory"
- Includes a small grammar tip: "Polish adjectives change endings based on gender!"

### 2. Days and Months
- Days of the week (poniedzialek - niedziela) in a compact grid
- Months of the year in a scrollable row
- Each with pronunciation and SpeakButton
- Practical sentences: "Spotykamy sie w piatek" (We meet on Friday), "Moje urodziny sa w maju" (My birthday is in May)
- Grammar tip: days are lowercase in Polish, months too
- Header: Calendar emoji, "Days & Months / Dni i miesiace"

### 3. Telling Time
- Visual clock-style reference showing how to say common times
- Key phrases: "Ktora jest godzina?" (What time is it?), "Jest trzecia" (It's 3 o'clock), "O wpol do piatej" (At half past four)
- 6-8 time expressions with audio
- Grammar tip: Polish uses ordinal feminine forms for hours
- Header: Clock emoji, "Telling Time / Godziny"

### 4. Numbers Quick Reference
- Numbers 1-20 in a compact grid, then 30, 40, 50... 100
- Each tappable to hear pronunciation
- Practical sentences: "Mam dwadziescia piec lat" (I'm 25 years old), "To kosztuje dziesiec zlotych" (It costs 10 zloty)
- Header: Hash emoji, "Numbers / Liczby"

### 5. Survival Phrases
- 8-10 essential phrases every beginner needs, organized by situation:
  - At a shop: "Ile to kosztuje?" (How much is this?)
  - Asking for help: "Gdzie jest...?" (Where is...?)
  - At a restaurant: "Poprosze rachunek" (The bill please)
  - Emergency: "Potrzebuję pomocy" (I need help)
- Each with phonetic guide + SpeakButton
- Header: Lifebuoy emoji, "Survival Phrases / Zwroty na przezycie"

### 6. Quick Links Row
- A horizontal row of compact cards linking to existing features:
  - Alphabet & Sounds (links to /alphabet)
  - Grammar Chat (links to /grammar)
- Gives easy access to tools that are otherwise only in the nav

## Layout Order (top to bottom)

1. Grammar Drills (existing, unchanged)
2. Quick Links Row (new)
3. Colors in Context (new, collapsible)
4. Days & Months (new, collapsible)
5. Telling Time (new, collapsible)
6. Numbers Quick Reference (new, collapsible)
7. Survival Phrases (new, collapsible)
8. Vocabulary category cards (existing)

## Technical Implementation

### New file: `src/data/practiceExtras.ts`
Static data exports for all new sections:
- `polishColors`: array of `{ polish, english, hex, gender, examplePl, exampleEn }`
- `daysOfWeek`: array of `{ polish, english, phonetic }`
- `monthsOfYear`: array of `{ polish, english, phonetic }`
- `timeExpressions`: array of `{ polish, english, phonetic }`
- `numberReference`: array of `{ number, polish, phonetic }`
- `survivalPhrases`: array of `{ polish, english, phonetic, situation }`
- Each section includes 1-2 `practicalSentences` with `{ polish, english }` for context

### New component: `src/components/practice/PracticeReferenceCard.tsx`
A reusable collapsible card component used by all sections:
- Props: `emoji`, `titlePl`, `titleEn`, `children`, `defaultOpen`
- Uses Radix Collapsible with a chevron toggle
- Consistent styling across all sections

### New components (one per section):
- `src/components/practice/ColorsReference.tsx` -- color swatches with gender-aware sentences
- `src/components/practice/DaysMonthsReference.tsx` -- grid of days + scrollable months
- `src/components/practice/TimeReference.tsx` -- time expressions list
- `src/components/practice/NumbersReference.tsx` -- compact number grid
- `src/components/practice/SurvivalPhrases.tsx` -- phrase list grouped by situation
- `src/components/practice/QuickLinksRow.tsx` -- horizontal card row

### Modified file: `src/pages/Practice.tsx`
- Import all new components
- Insert them between Grammar Drills and the vocabulary category section
- No changes to existing functionality

### Dependencies
- No new packages needed
- Uses existing: SpeakButton, Collapsible (Radix), useVoicePreference
- All data is static (no API calls, no database)

