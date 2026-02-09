

# CEFR A1 Alignment, Proof-of-Competence Checkpoint, and Product Clarity

This is a large, strategic initiative split into three parts. The plan covers content mapping, a new capstone assessment feature, and UX/website changes to communicate CEFR credibility.

---

## PART 1: CEFR A1 Can-Do Mapping

Based on the official CEFR A1 Global Scale and the Council of Europe's self-assessment grid, here is the full audit of our 20-lesson curriculum against A1 can-do statements.

### Listening Comprehension

| CEFR A1 Can-Do Statement | Covered In | Status | Notes |
|---|---|---|---|
| Can recognise familiar words and very basic phrases concerning self, family, immediate surroundings when people speak slowly and clearly | L1 (greetings), L2 (descriptions), L4 (family) | Full | Dialogues + TTS audio cover this well |
| Can understand simple directions | L12 (directions) | Full | Dialogue + vocabulary solid |
| Can understand simple announcements (times, places) | L7 (time), L12 (places), L8 (train/ticket) | Partial | No dedicated listening-only exercise type exists. Learners only hear TTS on individual words, not full dialogues as audio |

### Reading Comprehension

| CEFR A1 Can-Do Statement | Covered In | Status | Notes |
|---|---|---|---|
| Can understand familiar names, words and very simple sentences, e.g. on notices, posters, catalogues | L1-L20 (all vocab) | Full | |
| Can understand short simple texts (postcards, simple messages, forms) | L20 (email), L13 (booking), L19 (wishes) | Partial | No dedicated reading comprehension exercises (e.g., read a short text and answer questions). Dialogues exist but are passive reading only |
| Can find specific information in simple everyday material (menus, timetables, ads) | L6 (restaurant), L7 (timetable/schedule), L9 (shopping) | Partial | Vocabulary covers it, but no exercise simulates reading a real menu/ad and extracting info |

### Spoken Interaction

| CEFR A1 Can-Do Statement | Covered In | Status | Notes |
|---|---|---|---|
| Can interact in a simple way provided the other person talks slowly and is prepared to help | All dialogues L1-L20 | Partial | Dialogues model this, but no interactive dialogue practice exists (no role-play exercises) |
| Can ask and answer simple questions about familiar topics (where you live, people you know, things you have) | L1 (intro), L3 (profession), L4 (family), L14 (home), L12 (directions) | Full | Well covered by vocab + dialogues |
| Can make simple purchases in shops, restaurants | L6 (food ordering), L9 (shopping) | Full | |

### Spoken Production

| CEFR A1 Can-Do Statement | Covered In | Status | Notes |
|---|---|---|---|
| Can use simple phrases and sentences to describe where you live and people you know | L3 (profession), L4 (family), L14 (home), L2 (descriptions) | Full | |
| Can describe daily routine | L7 (daily routine) | Full | |
| Can introduce yourself and describe what you do | L1, L3, L20 | Full | |

### Writing

| CEFR A1 Can-Do Statement | Covered In | Status | Notes |
|---|---|---|---|
| Can write a short simple postcard, fill in forms with personal details | L20 (email), L19 (wishes) | Partial | No writing exercise exists. Sentence Builder is close but is drag-and-drop, not free-form composition |
| Can write short simple notes and messages | L20 (email) | Partial | Vocabulary covered, but no actual writing task |

### Summary of Gaps

| Gap ID | Description | Severity |
|---|---|---|
| GAP-1 | No dialogue-level listening exercises (hear full conversation, answer questions) | Medium |
| GAP-2 | No reading comprehension exercises (read a text, answer questions) | Medium |
| GAP-3 | No free-form writing tasks (even short fill-in templates) | Low (acceptable for A1 app) |
| GAP-4 | No interactive role-play / dialogue simulation | Low (async app limitation) |
| GAP-5 | No final A1 competence assessment that spans all skills | High |

---

## PART 2: A1 Proof-of-Competence Checkpoint

### Design: "A1 Final Exam" (Lesson 21 / Capstone)

A new page/route `/a1-checkpoint` accessible only after completing all 20 lessons. This is NOT a quiz -- it is a structured multi-skill assessment.

### Structure (5 Sections, ~25-30 minutes total)

**Section 1: Listening Comprehension (5 questions)**
- Play a TTS-read dialogue (using existing lesson dialogues or new ones)
- Multiple-choice questions about what was said
- Tests: understanding greetings, ordering food, directions, time expressions

**Section 2: Reading Comprehension (5 questions)**
- Show a short Polish text (a restaurant menu, a hotel booking confirmation, a short message/postcard)
- Questions to extract specific information
- Tests: practical reading in real-life Polish contexts

**Section 3: Vocabulary & Grammar in Context (10 questions)**
- Fill-in-the-blank sentences requiring correct case, gender, verb form
- Pulled from across all 20 lessons
- Tests: nominative, accusative, genitive, locative, instrumental; present/past/future tense

**Section 4: Sentence Construction (5 questions)**
- Given an English prompt, build the Polish sentence from word tiles (similar to existing Sentence Builder but with cross-lesson content)
- Functional scenarios: introduce yourself, order food, ask for directions, describe your day, make a plan

**Section 5: Functional Scenarios (5 questions)**
- "What would you say if...?" multiple-choice
- Scenarios: at a restaurant, at a hotel, meeting someone, at a doctor, buying a ticket
- Tests real-world communicative competence

### Pass Criteria
- Overall: 70% (21/30 correct)
- No section below 40% (must demonstrate breadth, not just depth in one area)
- On pass: "A1 Ready" badge unlocked, celebration screen, shareable certificate-style card

### On Fail
- Show per-section scores with specific lesson recommendations
- "You need more practice in [Listening / Grammar / ...]"
- Unlimited retakes

### Technical Implementation

| Component | Description |
|---|---|
| New page: `src/pages/A1Checkpoint.tsx` | Main assessment page with section navigation |
| New component: `src/components/checkpoint/ListeningSection.tsx` | TTS-powered listening questions |
| New component: `src/components/checkpoint/ReadingSection.tsx` | Text display + comprehension questions |
| New component: `src/components/checkpoint/GrammarSection.tsx` | Fill-in-the-blank with validation |
| New component: `src/components/checkpoint/SentenceSection.tsx` | Reuse SentenceBuilder logic |
| New component: `src/components/checkpoint/ScenarioSection.tsx` | Situational multiple-choice |
| New component: `src/components/checkpoint/CheckpointResults.tsx` | Results + badge award |
| New data file: `src/data/checkpointData.ts` | All 30 assessment questions |
| Route: `/a1-checkpoint` | Added to App.tsx |
| Progress update: `useProgress.ts` | New field `a1CheckpointPassed: boolean` + `a1CheckpointScore` |
| Database migration | Add `a1_checkpoint_passed` and `a1_checkpoint_score` to `user_progress` table |

---

## PART 3: Product & UX Clarity

### In-App Changes

**1. A1 Readiness Meter on Course Overview page**
- Below the existing "Course Progress" card, add a new "A1 Readiness" card
- Shows a can-do checklist with 5 skill areas (Listening, Reading, Grammar, Vocabulary, Functional)
- Each lights up as the user completes relevant lessons
- When all 20 lessons done: "Take your A1 Final Exam" CTA appears

**2. "A1 Ready" Badge**
- Displayed on Dashboard and Course Overview after passing the checkpoint
- Visual: a shield/certificate icon with "CEFR A1 Certified"
- Stored in user progress and synced to cloud

**3. Can-Do Checklist in Course Overview**
- Collapsible section: "By completing this course, you will be able to..."
- Lists 8-10 concrete can-do statements in plain English
- Each gets a checkmark as the relevant lessons are completed

### Website / Landing Page Changes

**4. CEFR Trust Signal on Hero Section**
- Add a small badge under the headline: "Aligned to CEFR A1 standards"
- Not a certification claim -- a pedagogical alignment claim

**5. "What You'll Be Able to Do" section on Landing Page**
- New section (or update MethodSection) with a clear checklist:
  - "Introduce yourself and talk about your family"
  - "Order food at a restaurant" 
  - "Ask for and understand directions"
  - "Describe your daily routine"
  - "Shop for clothes and discuss prices"
  - "Talk about the past, present, and future"
  - "Handle a doctor's visit"
  - "Book a hotel room"
  - "Write simple messages and emails"
  - "Understand Polish cultural customs"

**6. "What A1 means (and doesn't mean)" transparency**
- Small explainer on landing page or roadmap section
- "A1 means you can handle basic everyday situations. It does not mean fluency -- that comes at B2+."

**7. Update RoadmapSection description**
- Change A1 description to: "20 structured lessons aligned to CEFR A1 standards. Pass the A1 checkpoint to prove your competence."

---

## Implementation Sequence

This is a large feature set. Recommended implementation order:

1. **Checkpoint data + assessment page** (core feature, highest value)
2. **Progress tracking updates** (database + hook changes for checkpoint)
3. **A1 Readiness meter + can-do checklist** (in-app UX)
4. **Landing page CEFR messaging** (trust-building copy)
5. **Badge system** (reward/completion)

Each step is independently deployable and valuable.

---

## What's NOT Needed (Avoiding Over-Engineering)

- No course redesign required -- the 20-lesson structure covers A1 well
- No new lesson content needed for core coverage
- GAP-1 (dialogue listening) and GAP-2 (reading comprehension) are addressed by the checkpoint itself
- GAP-3 (free-form writing) is acceptable to skip at A1 level in an app context
- GAP-4 (role-play) is a async app limitation, not a curriculum gap

