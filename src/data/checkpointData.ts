// A1 Final Checkpoint — 30 questions across 5 sections
// Aligned to CEFR A1 can-do statements

export interface ListeningQuestion {
  id: string;
  dialogueLines: { speaker: string; polish: string }[];
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ReadingQuestion {
  id: string;
  title: string;
  text: string; // Polish text to read
  question: string;
  options: string[];
  correctIndex: number;
}

export interface GrammarQuestion {
  id: string;
  sentence: string; // with ___ for blank
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SentenceQuestion {
  id: string;
  english: string;
  correctPolish: string;
}

export interface ScenarioQuestion {
  id: string;
  scenario: string;
  options: string[];
  correctIndex: number;
}

export const listeningQuestions: ListeningQuestion[] = [
  {
    id: 'l1',
    dialogueLines: [
      { speaker: 'A', polish: 'Dzień dobry! Mam na imię Anna.' },
      { speaker: 'B', polish: 'Dzień dobry! Jestem Marek. Miło mi.' },
      { speaker: 'A', polish: 'Skąd pan jest?' },
      { speaker: 'B', polish: 'Jestem z Krakowa.' },
    ],
    question: 'Where is Marek from?',
    options: ['Warsaw', 'Kraków', 'Gdańsk', 'Poznań'],
    correctIndex: 1,
  },
  {
    id: 'l2',
    dialogueLines: [
      { speaker: 'Kelner', polish: 'Dzień dobry. Co dla Państwa?' },
      { speaker: 'A', polish: 'Poproszę zupę pomidorową i schabowego z ziemniakami.' },
      { speaker: 'Kelner', polish: 'A do picia?' },
      { speaker: 'A', polish: 'Wodę mineralną, proszę.' },
    ],
    question: 'What did the customer order to drink?',
    options: ['Beer', 'Coffee', 'Mineral water', 'Tea'],
    correctIndex: 2,
  },
  {
    id: 'l3',
    dialogueLines: [
      { speaker: 'A', polish: 'Przepraszam, gdzie jest dworzec?' },
      { speaker: 'B', polish: 'Proszę iść prosto, potem na prawo.' },
      { speaker: 'A', polish: 'Czy to daleko?' },
      { speaker: 'B', polish: 'Nie, to pięć minut pieszo.' },
    ],
    question: 'How far is the train station?',
    options: ['10 minutes by bus', '5 minutes on foot', '15 minutes by tram', '2 minutes by car'],
    correctIndex: 1,
  },
  {
    id: 'l4',
    dialogueLines: [
      { speaker: 'A', polish: 'Która jest godzina?' },
      { speaker: 'B', polish: 'Jest trzecia trzydzieści.' },
      { speaker: 'A', polish: 'Dziękuję! Muszę iść na spotkanie o czwartej.' },
    ],
    question: 'What time is the meeting?',
    options: ['3:00', '3:30', '4:00', '4:30'],
    correctIndex: 2,
  },
  {
    id: 'l5',
    dialogueLines: [
      { speaker: 'A', polish: 'Co robisz w weekend?' },
      { speaker: 'B', polish: 'W sobotę idę do kina, a w niedzielę gotuję obiad dla rodziny.' },
    ],
    question: 'What is B doing on Sunday?',
    options: ['Going to the cinema', 'Cooking dinner for family', 'Going shopping', 'Visiting friends'],
    correctIndex: 1,
  },
];

export const readingQuestions: ReadingQuestion[] = [
  {
    id: 'r1',
    title: 'Restaurant Menu',
    text: `MENU — Restauracja "Pod Aniołami"

Zupy:
• Żurek — 18 zł
• Zupa pomidorowa — 15 zł

Dania główne:
• Schabowy z ziemniakami — 35 zł
• Pierogi z mięsem (10 szt.) — 28 zł
• Placek po zbójnicku — 32 zł

Napoje:
• Kawa — 12 zł
• Herbata — 10 zł
• Piwo 0,5l — 14 zł`,
    question: 'How much do pierogi with meat cost?',
    options: ['18 zł', '28 zł', '32 zł', '35 zł'],
    correctIndex: 1,
  },
  {
    id: 'r2',
    title: 'Hotel Booking Confirmation',
    text: `Potwierdzenie rezerwacji
Hotel "Krakowski"
Gość: Jan Kowalski
Pokój: dwuosobowy
Data przyjazdu: 15 marca 2025
Data wyjazdu: 18 marca 2025
Cena: 350 zł / noc
Śniadanie: wliczone`,
    question: 'How many nights is the booking for?',
    options: ['1 night', '2 nights', '3 nights', '4 nights'],
    correctIndex: 2,
  },
  {
    id: 'r3',
    title: 'Postcard',
    text: `Cześć Mamo!
Jestem w Gdańsku. Pogoda jest piękna — jest ciepło i słonecznie.
Wczoraj byłam na plaży, a dzisiaj zwiedzam Stare Miasto.
Jutro jadę do Sopotu. Tęsknię za Tobą!
Buziaki, Kasia`,
    question: 'Where is Kasia going tomorrow?',
    options: ['To the beach', 'To the Old Town', 'To Sopot', 'Back home'],
    correctIndex: 2,
  },
  {
    id: 'r4',
    title: 'Train Schedule',
    text: `Rozkład jazdy — Kraków Główny → Warszawa Centralna
Pociąg IC 5100: odjazd 8:15 — przyjazd 10:45 — cena: 89 zł
Pociąg IC 5200: odjazd 12:30 — przyjazd 15:00 — cena: 79 zł
Pociąg EIP 3500: odjazd 16:00 — przyjazd 18:20 — cena: 129 zł`,
    question: 'Which train is the cheapest?',
    options: ['IC 5100', 'IC 5200', 'EIP 3500', 'All the same price'],
    correctIndex: 1,
  },
  {
    id: 'r5',
    title: 'Short Message',
    text: `Cześć Tomek! Nie mogę dzisiaj przyjść na kawę. Jestem chory — mam gorączkę i kaszle. Może w piątek? Przepraszam! Paweł`,
    question: 'Why can\'t Paweł come for coffee?',
    options: ['He is busy at work', 'He is sick', 'He is traveling', 'He forgot'],
    correctIndex: 1,
  },
];

export const grammarQuestions: GrammarQuestion[] = [
  {
    id: 'g1',
    sentence: 'Mam ___ (a cat).',
    options: ['kot', 'kota', 'kotem', 'kocie'],
    correctIndex: 1,
    explanation: 'Accusative case for masculine animate nouns: kot → kota.',
  },
  {
    id: 'g2',
    sentence: 'Mieszkam w ___ (Warsaw).',
    options: ['Warszawa', 'Warszawy', 'Warszawie', 'Warszawą'],
    correctIndex: 2,
    explanation: 'Locative case after "w": Warszawa → Warszawie.',
  },
  {
    id: 'g3',
    sentence: 'Jestem ___ (teacher, female).',
    options: ['nauczyciel', 'nauczycielka', 'nauczycielką', 'nauczycielki'],
    correctIndex: 2,
    explanation: 'Instrumental case with "być": nauczycielka → nauczycielką.',
  },
  {
    id: 'g4',
    sentence: 'Wczoraj ___ (I went, male) do kina.',
    options: ['idę', 'poszedłem', 'pójdę', 'chodzę'],
    correctIndex: 1,
    explanation: 'Past tense masculine: poszedłem (I went).',
  },
  {
    id: 'g5',
    sentence: 'Nie mam ___ (milk).',
    options: ['mleko', 'mleka', 'mlekiem', 'mleku'],
    correctIndex: 1,
    explanation: 'Genitive case after negation: mleko → mleka.',
  },
  {
    id: 'g6',
    sentence: '___ (I like) polską kuchnię.',
    options: ['Lubisz', 'Lubię', 'Lubi', 'Lubimy'],
    correctIndex: 1,
    explanation: 'First person singular of "lubić": lubię.',
  },
  {
    id: 'g7',
    sentence: 'Pierogi z ___ (cheese).',
    options: ['ser', 'sera', 'serem', 'serze'],
    correctIndex: 2,
    explanation: 'Instrumental case after "z": ser → serem.',
  },
  {
    id: 'g8',
    sentence: 'To jest ___ (my, feminine) siostra.',
    options: ['mój', 'moja', 'moje', 'moim'],
    correctIndex: 1,
    explanation: 'Possessive pronoun feminine nominative: moja.',
  },
  {
    id: 'g9',
    sentence: 'Jutro ___ (I will go) na zakupy.',
    options: ['idę', 'szedłem', 'pójdę', 'chodzę'],
    correctIndex: 2,
    explanation: 'Future perfective: pójdę (I will go).',
  },
  {
    id: 'g10',
    sentence: 'Autobus jedzie ___ (to the station).',
    options: ['na dworzec', 'na dworcu', 'z dworca', 'przy dworcu'],
    correctIndex: 0,
    explanation: 'Accusative of direction with "na": na dworzec.',
  },
];

export const sentenceQuestions: SentenceQuestion[] = [
  {
    id: 's1',
    english: 'My name is Anna and I am from Poland.',
    correctPolish: 'Mam na imię Anna i jestem z Polski.',
  },
  {
    id: 's2',
    english: "I'd like tomato soup, please.",
    correctPolish: 'Poproszę zupę pomidorową.',
  },
  {
    id: 's3',
    english: 'Where is the train station?',
    correctPolish: 'Gdzie jest dworzec?',
  },
  {
    id: 's4',
    english: 'I get up at seven and go to work.',
    correctPolish: 'Wstaję o siódmej i idę do pracy.',
  },
  {
    id: 's5',
    english: 'Tomorrow I will visit my family.',
    correctPolish: 'Jutro odwiedzę moją rodzinę.',
  },
];

export const scenarioQuestions: ScenarioQuestion[] = [
  {
    id: 'sc1',
    scenario: 'You walk into a restaurant and want to order pierogi. What do you say?',
    options: [
      'Poproszę pierogi.',
      'Mam pierogi.',
      'Pierogi jest dobry.',
      'Chcesz pierogi?',
    ],
    correctIndex: 0,
  },
  {
    id: 'sc2',
    scenario: 'You meet someone for the first time at a formal event. How do you greet them?',
    options: [
      'Cześć! Co tam?',
      'Hej, jak leci?',
      'Dzień dobry, miło mi.',
      'No siema!',
    ],
    correctIndex: 2,
  },
  {
    id: 'sc3',
    scenario: 'You need to buy a train ticket to Kraków. What do you say at the ticket counter?',
    options: [
      'Poproszę bilet do Krakowa.',
      'Jadę Kraków.',
      'Kraków jest piękny.',
      'Mam bilet z Krakowa.',
    ],
    correctIndex: 0,
  },
  {
    id: 'sc4',
    scenario: 'You feel sick and need to tell the doctor what hurts. You have a headache.',
    options: [
      'Jestem zmęczony.',
      'Boli mnie głowa.',
      'Mam dużo pracy.',
      'Nie lubię lekarza.',
    ],
    correctIndex: 1,
  },
  {
    id: 'sc5',
    scenario: 'You want to book a double room at a hotel for two nights. What do you say?',
    options: [
      'Poproszę pokój dwuosobowy na dwie noce.',
      'Mam pokój w hotelu.',
      'Hotel jest drogi.',
      'Chcę jechać do hotelu.',
    ],
    correctIndex: 0,
  },
];

// CEFR A1 Can-Do Checklist for UX
export interface CanDoStatement {
  id: string;
  statement: string;
  lessonsRequired: number[]; // lesson IDs that cover this
}

export const cefrCanDoStatements: CanDoStatement[] = [
  { id: 'cd1', statement: 'Introduce yourself and greet others', lessonsRequired: [1, 2] },
  { id: 'cd2', statement: 'Talk about your family and describe people', lessonsRequired: [4, 2] },
  { id: 'cd3', statement: 'Order food at a restaurant', lessonsRequired: [5, 6] },
  { id: 'cd4', statement: 'Ask for and understand directions', lessonsRequired: [12] },
  { id: 'cd5', statement: 'Describe your daily routine', lessonsRequired: [7] },
  { id: 'cd6', statement: 'Shop for items and discuss prices', lessonsRequired: [9] },
  { id: 'cd7', statement: 'Talk about the past, present, and future', lessonsRequired: [10, 11, 16] },
  { id: 'cd8', statement: 'Handle basic situations at a doctor or hotel', lessonsRequired: [13, 15] },
  { id: 'cd9', statement: 'Write simple messages and emails', lessonsRequired: [19, 20] },
  { id: 'cd10', statement: 'Understand Polish cultural customs', lessonsRequired: [17, 18] },
];

export const CHECKPOINT_PASS_THRESHOLD = 0.7; // 70% overall
export const CHECKPOINT_SECTION_MIN = 0.4; // 40% per section
export const TOTAL_QUESTIONS = 30;

export interface CheckpointScore {
  listening: { correct: number; total: number };
  reading: { correct: number; total: number };
  grammar: { correct: number; total: number };
  sentences: { correct: number; total: number };
  scenarios: { correct: number; total: number };
  passed: boolean;
  totalCorrect: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}
