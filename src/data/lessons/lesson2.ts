import { Lesson } from '../courseTypes';

const lesson2: Lesson = {
  id: 2,
  title: 'Opowiedz mi o sobie',
  titleEnglish: 'Tell Me About Yourself',
  description: 'Describe people around you, use adjectives, and start forming sentences.',
  emoji: '🪞',
  grammarTopics: ['nominative case', 'adjective agreement', 'to jest / to są'],
  grammarSummary: `## Nominative Case & Describing People

### "To jest..." (This is...)
Use **to jest** + nominative to identify things and people:
- To jest Marek. (This is Marek.)
- To jest studentka. (This is a female student.)
- To są studenci. (These are students.) — plural uses **to są**

### Adjective Agreement (Nominative)
Adjectives must match the gender of the noun:

| Gender | Ending | Example |
|--------|--------|---------|
| Masculine | -y / -i | dobr**y** student, wielk**i** dom |
| Feminine | -a | dobr**a** studentka, wielk**a** szkoła |
| Neuter | -e | dobr**e** dziecko, wielk**ie** miasto |

### Numbers 11–23
| Number | Polish |
|--------|--------|
| 11 | jedenaście |
| 12 | dwanaście |
| 13 | trzynaście |
| 14 | czternaście |
| 15 | piętnaście |
| 20 | dwadzieścia |
| 21 | dwadzieścia jeden |
| 23 | dwadzieścia trzy |

### Question Words
- **Kto?** — Who?
- **Co?** — What?
- **Jaki? / Jaka? / Jakie?** — What kind of? (matches gender)`,

  culturalNote: `🇵🇱 **Polish Names**

Polish names often have diminutive (affectionate) forms used among friends and family: Tomasz → Tomek, Katarzyna → Kasia, Małgorzata → Gosia. Using someone's diminutive without permission can be seen as too familiar. In formal settings, always use Pan/Pani + surname.`,

  dialogues: [
    {
      title: 'Describing a photo',
      lines: [
        { speaker: 'A', polish: 'Kto to jest?', english: 'Who is this?' },
        { speaker: 'B', polish: 'To jest mój kolega. On jest wysoki i sympatyczny.', english: 'This is my colleague. He is tall and nice.' },
        { speaker: 'A', polish: 'A to? Kto to jest?', english: 'And this? Who is this?' },
        { speaker: 'B', polish: 'To jest moja koleżanka Anna. Ona jest bardzo miła.', english: 'This is my colleague Anna. She is very nice.' },
      ],
    },
    {
      title: 'At a party',
      lines: [
        { speaker: 'A', polish: 'Czy to jest student?', english: 'Is this a student?' },
        { speaker: 'B', polish: 'Nie, to jest nauczyciel. On jest młody.', english: 'No, this is a teacher. He is young.' },
        { speaker: 'A', polish: 'A ona? Kim ona jest?', english: 'And her? Who is she?' },
        { speaker: 'B', polish: 'Ona jest lekarką. Jest bardzo inteligentna.', english: 'She is a doctor. She is very intelligent.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l2_1', polish: 'Kto?', english: 'Who?', phonetic: 'ktoh', category: 'greetings', lesson: 2, exampleSentence: 'Kto to jest?', exampleTranslation: 'Who is this?' },
    { id: 'l2_2', polish: 'Co?', english: 'What?', phonetic: 'tsoh', category: 'greetings', lesson: 2, exampleSentence: 'Co to jest?', exampleTranslation: 'What is this?' },
    { id: 'l2_3', polish: 'To jest', english: 'This is', phonetic: 'toh yest', category: 'greetings', lesson: 2, grammarTip: 'Use with nominative case. Plural: to są.', exampleSentence: 'To jest mój dom.', exampleTranslation: 'This is my house.' },
    { id: 'l2_4', polish: 'On', english: 'He', phonetic: 'ohn', category: 'greetings', lesson: 2, gender: 'masculine', exampleSentence: 'On jest studentem.', exampleTranslation: 'He is a student.' },
    { id: 'l2_5', polish: 'Ona', english: 'She', phonetic: 'OH-nah', category: 'greetings', lesson: 2, gender: 'feminine', exampleSentence: 'Ona jest miła.', exampleTranslation: 'She is nice.' },
    { id: 'l2_6', polish: 'Duży', english: 'Big / Large', phonetic: 'DOO-zhi', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Fem: duża, neuter: duże', exampleSentence: 'To jest duży dom.', exampleTranslation: 'This is a big house.' },
    { id: 'l2_7', polish: 'Mały', english: 'Small / Little', phonetic: 'MAH-wi', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Fem: mała, neuter: małe', exampleSentence: 'To jest mały kot.', exampleTranslation: 'This is a small cat.' },
    { id: 'l2_8', polish: 'Wysoki', english: 'Tall', phonetic: 'vi-SOH-kee', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Fem: wysoka, neuter: wysokie', exampleSentence: 'On jest wysoki.', exampleTranslation: 'He is tall.' },
    { id: 'l2_9', polish: 'Niski', english: 'Short (height)', phonetic: 'NEES-kee', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Fem: niska', exampleSentence: 'Ona jest niska.', exampleTranslation: 'She is short.' },
    { id: 'l2_10', polish: 'Młody', english: 'Young', phonetic: 'MWO-di', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Fem: młoda', exampleSentence: 'To jest młody chłopak.', exampleTranslation: 'This is a young boy.' },
    { id: 'l2_11', polish: 'Stary', english: 'Old', phonetic: 'STAH-ri', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Fem: stara. Can be rude when describing people; use "starszy" (older) instead.', exampleSentence: 'To jest stary dom.', exampleTranslation: 'This is an old house.' },
    { id: 'l2_12', polish: 'Ładny', english: 'Pretty / Nice-looking', phonetic: 'WAHD-ni', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Fem: ładna', exampleSentence: 'To jest ładna dziewczyna.', exampleTranslation: 'This is a pretty girl.' },
    { id: 'l2_13', polish: 'Sympatyczny', english: 'Nice / Likeable', phonetic: 'sim-pah-TICH-ni', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Fem: sympatyczna', exampleSentence: 'On jest bardzo sympatyczny.', exampleTranslation: 'He is very likeable.' },
    { id: 'l2_14', polish: 'Inteligentny', english: 'Intelligent', phonetic: 'in-teh-lee-GENT-ni', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Fem: inteligentna', exampleSentence: 'Ona jest inteligentna.', exampleTranslation: 'She is intelligent.' },
    { id: 'l2_15', polish: 'Student', english: 'Student (male)', phonetic: 'STOO-dent', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Female: studentka', exampleSentence: 'On jest studentem.', exampleTranslation: 'He is a student.' },
    { id: 'l2_16', polish: 'Nauczyciel', english: 'Teacher (male)', phonetic: 'now-CHI-chel', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Female: nauczycielka', exampleSentence: 'Pan Kowalski jest nauczycielem.', exampleTranslation: 'Mr. Kowalski is a teacher.' },
    { id: 'l2_17', polish: 'Jaki?', english: 'What kind of? (masc)', phonetic: 'YAH-kee', category: 'greetings', lesson: 2, gender: 'masculine', grammarTip: 'Fem: jaka? Neuter: jakie?', exampleSentence: 'Jaki to jest film?', exampleTranslation: 'What kind of movie is this?' },
    { id: 'l2_18', polish: 'Bardzo', english: 'Very', phonetic: 'BAR-dzoh', category: 'greetings', lesson: 2, exampleSentence: 'To jest bardzo dobre.', exampleTranslation: 'This is very good.' },
    { id: 'l2_19', polish: 'Jedenaście', english: 'Eleven', phonetic: 'yeh-deh-NAHSH-cheh', category: 'numbers', lesson: 2, exampleSentence: 'Mam jedenaście lat.', exampleTranslation: 'I am eleven years old.' },
    { id: 'l2_20', polish: 'Dwadzieścia', english: 'Twenty', phonetic: 'dvah-JESH-chah', category: 'numbers', lesson: 2, exampleSentence: 'To kosztuje dwadzieścia złotych.', exampleTranslation: 'This costs twenty zlotys.' },
  ],
};

export default lesson2;
