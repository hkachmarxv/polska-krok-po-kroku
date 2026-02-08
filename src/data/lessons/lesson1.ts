import { Lesson } from '../courseTypes';

const lesson1: Lesson = {
  id: 1,
  title: 'Cześć, jestem tutaj!',
  titleEnglish: 'Breaking the Ice',
  description: 'Your first words in Polish — greetings, the alphabet, and how to say hello like a local.',
  emoji: '🤝',
  grammarTopics: ['pronunciation', 'alphabet', 'formal vs informal'],
  grammarSummary: `## Polish Pronunciation & Alphabet

### The Polish Alphabet
Polish uses the Latin alphabet with additional letters: **ą, ć, ę, ł, ń, ó, ś, ź, ż**

### Key Sounds
| Letter(s) | Sound | Example |
|-----------|-------|---------|
| **cz** | "ch" as in "church" | cześć (hello) |
| **sz** | "sh" as in "ship" | szkoła (school) |
| **ż / rz** | "zh" as in "pleasure" | żona (wife), rzeka (river) |
| **ś / si** | soft "sh" | śliczny (pretty) |
| **ć / ci** | soft "ch" | ćwiczenie (exercise) |
| **ł** | "w" as in "water" | łatwy (easy) |
| **w** | "v" as in "van" | woda (water) |
| **ą** | nasal "on" | mąż (husband) |
| **ę** | nasal "en" | ręka (hand) |
| **ń / ni** | "ny" as in "canyon" | nie (no) |
| **ó** | "oo" as in "food" | mój (my) |

### Formal vs. Informal
- **Cześć** — informal "hi/bye" (friends, family)
- **Dzień dobry** — formal "good day" (strangers, work)
- **Do widzenia** — formal "goodbye"
- Use **Pan** (Mr.) / **Pani** (Ms.) for formal address

### Stress
Polish stress almost always falls on the **second-to-last syllable**: dzi-**ękuj**-ę, prze-**prasz**-am.`,

  culturalNote: `🇵🇱 **Polish Greetings Culture**

Poles take greetings seriously. When entering a shop, doctor's office, or elevator, it's polite to say "Dzień dobry" to everyone. When leaving, say "Do widzenia." Among friends, kisses on the cheek (usually three!) are common. Handshakes are firm and expected in formal settings.`,

  dialogues: [
    {
      title: 'Meeting someone new',
      lines: [
        { speaker: 'A', polish: 'Dzień dobry! Mam na imię Anna.', english: 'Good day! My name is Anna.' },
        { speaker: 'B', polish: 'Dzień dobry! Jestem Marek. Miło mi.', english: 'Good day! I am Marek. Nice to meet you.' },
        { speaker: 'A', polish: 'Miło mi. Skąd Pan jest?', english: 'Nice to meet you. Where are you from?' },
        { speaker: 'B', polish: 'Jestem z Krakowa. A Pani?', english: "I'm from Kraków. And you?" },
        { speaker: 'A', polish: 'Jestem z Warszawy. Do widzenia!', english: "I'm from Warsaw. Goodbye!" },
        { speaker: 'B', polish: 'Do widzenia!', english: 'Goodbye!' },
      ],
    },
    {
      title: 'At a café (informal)',
      lines: [
        { speaker: 'A', polish: 'Cześć! Jak się masz?', english: 'Hi! How are you?' },
        { speaker: 'B', polish: 'Cześć! Dobrze, dziękuję. A ty?', english: "Hi! Good, thanks. And you?" },
        { speaker: 'A', polish: 'Też dobrze. Co słychać?', english: "Good too. What's up?" },
        { speaker: 'B', polish: 'Wszystko w porządku. Na razie!', english: "Everything's fine. See you!" },
      ],
    },
  ],

  vocabulary: [
    { id: 'l1_1', polish: 'Cześć', english: 'Hello / Hi / Bye', phonetic: 'cheshch', category: 'greetings', lesson: 1, grammarTip: 'Informal greeting and farewell, used with friends and family', exampleSentence: 'Cześć, jak się masz?', exampleTranslation: 'Hi, how are you?' },
    { id: 'l1_2', polish: 'Dzień dobry', english: 'Good day / Good morning', phonetic: 'jen DOH-bri', category: 'greetings', lesson: 1, grammarTip: 'Formal greeting used until evening', exampleSentence: 'Dzień dobry, Pani Anno.', exampleTranslation: 'Good day, Ms. Anna.' },
    { id: 'l1_3', polish: 'Dobry wieczór', english: 'Good evening', phonetic: 'DOH-bri VYEH-choor', category: 'greetings', lesson: 1, exampleSentence: 'Dobry wieczór, proszę wejść.', exampleTranslation: 'Good evening, please come in.' },
    { id: 'l1_4', polish: 'Do widzenia', english: 'Goodbye', phonetic: 'doh vee-DZEN-ya', category: 'greetings', lesson: 1, grammarTip: 'Formal farewell', exampleSentence: 'Do widzenia, miłego dnia!', exampleTranslation: 'Goodbye, have a nice day!' },
    { id: 'l1_5', polish: 'Dobranoc', english: 'Good night', phonetic: 'doh-BRAH-nots', category: 'greetings', lesson: 1, exampleSentence: 'Dobranoc, śpij dobrze!', exampleTranslation: 'Good night, sleep well!' },
    { id: 'l1_6', polish: 'Tak', english: 'Yes', phonetic: 'tahk', category: 'greetings', lesson: 1, exampleSentence: 'Tak, proszę.', exampleTranslation: 'Yes, please.' },
    { id: 'l1_7', polish: 'Nie', english: 'No / Not', phonetic: 'nyeh', category: 'greetings', lesson: 1, grammarTip: '"Nie" before verbs means "not": nie mówię = I don\'t speak', exampleSentence: 'Nie rozumiem.', exampleTranslation: "I don't understand." },
    { id: 'l1_8', polish: 'Dziękuję', english: 'Thank you', phonetic: 'jen-KOO-yeh', category: 'greetings', lesson: 1, exampleSentence: 'Dziękuję bardzo!', exampleTranslation: 'Thank you very much!' },
    { id: 'l1_9', polish: 'Proszę', english: 'Please / You\'re welcome / Here you go', phonetic: 'PROH-sheh', category: 'greetings', lesson: 1, grammarTip: 'Very versatile word: "please", "you\'re welcome", "here you are"', exampleSentence: 'Proszę, to dla Pani.', exampleTranslation: "Here you go, this is for you (formal, fem)." },
    { id: 'l1_10', polish: 'Przepraszam', english: 'Excuse me / I\'m sorry', phonetic: 'psheh-PRAH-shahm', category: 'greetings', lesson: 1, exampleSentence: 'Przepraszam, gdzie jest dworzec?', exampleTranslation: 'Excuse me, where is the train station?' },
    { id: 'l1_11', polish: 'Mam na imię...', english: 'My name is...', phonetic: 'mahm nah EE-myeh', category: 'greetings', lesson: 1, grammarTip: 'Literally "I have for name...". Also: Nazywam się... (more formal)', exampleSentence: 'Mam na imię Tomek.', exampleTranslation: 'My name is Tomek.' },
    { id: 'l1_12', polish: 'Jak się masz?', english: 'How are you?', phonetic: 'yahk sheh mahsh', category: 'greetings', lesson: 1, grammarTip: 'Informal. Formal: Jak się Pan/Pani ma?', exampleSentence: 'Cześć! Jak się masz?', exampleTranslation: 'Hi! How are you?' },
    { id: 'l1_13', polish: 'Dobrze', english: 'Good / Well / Fine', phonetic: 'DOH-bzheh', category: 'greetings', lesson: 1, exampleSentence: 'Dobrze, dziękuję.', exampleTranslation: 'Good, thank you.' },
    { id: 'l1_14', polish: 'Miło mi', english: 'Nice to meet you', phonetic: 'MEE-woh mee', category: 'greetings', lesson: 1, grammarTip: 'Literally "pleasant to me"', exampleSentence: 'Jestem Kasia. Miło mi!', exampleTranslation: "I'm Kasia. Nice to meet you!" },
    { id: 'l1_15', polish: 'Nie rozumiem', english: "I don't understand", phonetic: 'nyeh roh-ZOO-myem', category: 'greetings', lesson: 1, exampleSentence: 'Przepraszam, nie rozumiem.', exampleTranslation: "Sorry, I don't understand." },
    { id: 'l1_16', polish: 'Czy mówi Pan/Pani po angielsku?', english: 'Do you speak English? (formal)', phonetic: 'chi MOO-vee pahn/PAH-nee poh ahn-GYEL-skoo', category: 'greetings', lesson: 1, grammarTip: 'Pan = addressing a man, Pani = addressing a woman', exampleSentence: 'Przepraszam, czy mówi Pani po angielsku?', exampleTranslation: 'Excuse me, do you speak English?' },
    { id: 'l1_17', polish: 'Jestem', english: 'I am', phonetic: 'YES-tem', category: 'greetings', lesson: 1, grammarTip: 'From "być" (to be). Jestem z Polski = I am from Poland', exampleSentence: 'Jestem studentem.', exampleTranslation: 'I am a student.' },
    { id: 'l1_18', polish: 'Skąd?', english: 'Where from?', phonetic: 'skont', category: 'greetings', lesson: 1, exampleSentence: 'Skąd jesteś?', exampleTranslation: 'Where are you from?' },
    { id: 'l1_19', polish: 'Pan', english: 'Mr. / Sir (formal you, masc)', phonetic: 'pahn', category: 'greetings', lesson: 1, gender: 'masculine', grammarTip: 'Used as formal "you" for men. Takes 3rd person verb forms.', exampleSentence: 'Co Pan robi?', exampleTranslation: 'What do you do? (formal, to a man)' },
    { id: 'l1_20', polish: 'Pani', english: 'Ms. / Madam (formal you, fem)', phonetic: 'PAH-nee', category: 'greetings', lesson: 1, gender: 'feminine', grammarTip: 'Used as formal "you" for women. Takes 3rd person verb forms.', exampleSentence: 'Skąd Pani jest?', exampleTranslation: 'Where are you from? (formal, to a woman)' },
  ],
};

export default lesson1;
