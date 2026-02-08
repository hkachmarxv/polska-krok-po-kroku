import { Lesson } from '../courseTypes';

const lesson4: Lesson = {
  id: 4,
  title: 'Moja rodzina',
  titleEnglish: 'My Family',
  description: 'Talk about your family, use possessive pronouns, and learn the accusative case.',
  emoji: '👨‍👩‍👧‍👦',
  grammarTopics: ['accusative case', 'possessive pronouns', 'mieć (to have)'],
  grammarSummary: `## Possessive Pronouns & Accusative Case

### Possessive Pronouns (Nominative)
| | Masculine | Feminine | Neuter |
|---|-----------|----------|--------|
| my | mój | moja | moje |
| your (informal) | twój | twoja | twoje |
| his | jego | jego | jego |
| her | jej | jej | jej |
| our | nasz | nasza | nasze |

### Accusative Case
Used for **direct objects** (the thing being acted upon):
- Mam brat**a**. (I have a brother.) — masculine animate → -a
- Mam siostr**ę**. (I have a sister.) — feminine -a → -ę
- Mam dziecko. (I have a child.) — neuter stays the same

### Accusative Endings Summary
| Gender | Nominative | Accusative |
|--------|-----------|------------|
| Masc. animate | -∅ / consonant | **-a** |
| Masc. inanimate | -∅ / consonant | same as nom. |
| Feminine | **-a** | **-ę** |
| Neuter | **-o / -e** | same as nom. |

### "Mieć" (To Have)
| Person | Form |
|--------|------|
| ja | mam |
| ty | masz |
| on/ona | ma |
| my | mamy |
| wy | macie |
| oni/one | mają |

### Numbers 20–100
dwadzieścia (20), trzydzieści (30), czterdzieści (40), pięćdziesiąt (50), sześćdziesiąt (60), siedemdziesiąt (70), osiemdziesiąt (80), dziewięćdziesiąt (90), sto (100)`,

  culturalNote: `🇵🇱 **Family in Poland**

Family is the cornerstone of Polish life. Sunday dinners (obiad niedzielny) bring extended families together. Name days (imieniny) are celebrated as much as birthdays. Grandparents often play an active role in raising grandchildren, and it's common for young adults to live with parents into their late 20s.`,

  dialogues: [
    {
      title: 'Talking about family',
      lines: [
        { speaker: 'A', polish: 'Masz rodzeństwo?', english: 'Do you have siblings?' },
        { speaker: 'B', polish: 'Tak, mam brata i siostrę.', english: 'Yes, I have a brother and a sister.' },
        { speaker: 'A', polish: 'Ile lat ma twój brat?', english: 'How old is your brother?' },
        { speaker: 'B', polish: 'Mój brat ma dwadzieścia pięć lat.', english: 'My brother is twenty-five years old.' },
      ],
    },
    {
      title: 'Showing photos',
      lines: [
        { speaker: 'A', polish: 'To jest moja rodzina.', english: 'This is my family.' },
        { speaker: 'B', polish: 'Jaka duża rodzina! Kto to jest?', english: 'What a big family! Who is this?' },
        { speaker: 'A', polish: 'To jest moja mama. Ona ma pięćdziesiąt lat.', english: 'This is my mom. She is fifty years old.' },
        { speaker: 'B', polish: 'A to jest twój tata?', english: 'And this is your dad?' },
        { speaker: 'A', polish: 'Tak. Mój tata jest lekarzem.', english: 'Yes. My dad is a doctor.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l4_1', polish: 'Rodzina', english: 'Family', phonetic: 'roh-JEE-nah', category: 'family', lesson: 4, gender: 'feminine', exampleSentence: 'Moja rodzina jest duża.', exampleTranslation: 'My family is big.' },
    { id: 'l4_2', polish: 'Mama / Matka', english: 'Mom / Mother', phonetic: 'MAH-mah / MAHT-kah', category: 'family', lesson: 4, gender: 'feminine', exampleSentence: 'Moja mama jest nauczycielką.', exampleTranslation: 'My mom is a teacher.' },
    { id: 'l4_3', polish: 'Tata / Ojciec', english: 'Dad / Father', phonetic: 'TAH-tah / OY-chets', category: 'family', lesson: 4, gender: 'masculine', exampleSentence: 'Mój tata pracuje w biurze.', exampleTranslation: 'My dad works in an office.' },
    { id: 'l4_4', polish: 'Brat', english: 'Brother', phonetic: 'braht', category: 'family', lesson: 4, gender: 'masculine', exampleSentence: 'Mam dwóch braci.', exampleTranslation: 'I have two brothers.' },
    { id: 'l4_5', polish: 'Siostra', english: 'Sister', phonetic: 'SHOS-trah', category: 'family', lesson: 4, gender: 'feminine', exampleSentence: 'Moja siostra mieszka w Londynie.', exampleTranslation: 'My sister lives in London.' },
    { id: 'l4_6', polish: 'Syn', english: 'Son', phonetic: 'sin', category: 'family', lesson: 4, gender: 'masculine', exampleSentence: 'Mój syn ma pięć lat.', exampleTranslation: 'My son is five years old.' },
    { id: 'l4_7', polish: 'Córka', english: 'Daughter', phonetic: 'TSOOR-kah', category: 'family', lesson: 4, gender: 'feminine', exampleSentence: 'Moja córka chodzi do szkoły.', exampleTranslation: 'My daughter goes to school.' },
    { id: 'l4_8', polish: 'Mąż', english: 'Husband', phonetic: 'monzh', category: 'family', lesson: 4, gender: 'masculine', exampleSentence: 'Mój mąż jest Polakiem.', exampleTranslation: 'My husband is Polish.' },
    { id: 'l4_9', polish: 'Żona', english: 'Wife', phonetic: 'ZHOH-nah', category: 'family', lesson: 4, gender: 'feminine', exampleSentence: 'Jego żona jest lekarką.', exampleTranslation: 'His wife is a doctor.' },
    { id: 'l4_10', polish: 'Dziadek', english: 'Grandfather', phonetic: 'JAH-dek', category: 'family', lesson: 4, gender: 'masculine', exampleSentence: 'Mój dziadek ma osiemdziesiąt lat.', exampleTranslation: 'My grandfather is eighty years old.' },
    { id: 'l4_11', polish: 'Babcia', english: 'Grandmother', phonetic: 'BAHB-chah', category: 'family', lesson: 4, gender: 'feminine', exampleSentence: 'Babcia robi pyszne pierogi.', exampleTranslation: 'Grandma makes delicious pierogi.' },
    { id: 'l4_12', polish: 'Dziecko', english: 'Child', phonetic: 'JETS-koh', category: 'family', lesson: 4, gender: 'neuter', grammarTip: 'Plural: dzieci (irregular)', exampleSentence: 'Mam jedno dziecko.', exampleTranslation: 'I have one child.' },
    { id: 'l4_13', polish: 'Mieć', english: 'To have', phonetic: 'myech', category: 'family', lesson: 4, grammarTip: 'Ja mam, ty masz, on/ona ma', exampleSentence: 'Mam troje dzieci.', exampleTranslation: 'I have three children.' },
    { id: 'l4_14', polish: 'Mój / Moja / Moje', english: 'My (m/f/n)', phonetic: 'mooy / MOH-yah / MOH-yeh', category: 'family', lesson: 4, grammarTip: 'Must agree with noun gender', exampleSentence: 'To jest mój dom.', exampleTranslation: 'This is my house.' },
    { id: 'l4_15', polish: 'Twój / Twoja / Twoje', english: 'Your (m/f/n, informal)', phonetic: 'tvooy / TVOH-yah / TVOH-yeh', category: 'family', lesson: 4, grammarTip: 'Informal "your". Formal: Pana/Pani.', exampleSentence: 'Gdzie jest twoja mama?', exampleTranslation: 'Where is your mom?' },
    { id: 'l4_16', polish: 'Rodzeństwo', english: 'Siblings', phonetic: 'roh-DZENs-tvoh', category: 'family', lesson: 4, gender: 'neuter', exampleSentence: 'Masz rodzeństwo?', exampleTranslation: 'Do you have siblings?' },
    { id: 'l4_17', polish: 'Ile lat?', english: 'How old? (How many years?)', phonetic: 'EE-leh laht', category: 'family', lesson: 4, grammarTip: '"Lat" is genitive plural of "rok" (year)', exampleSentence: 'Ile lat masz?', exampleTranslation: 'How old are you?' },
    { id: 'l4_18', polish: 'Trzydzieści', english: 'Thirty', phonetic: 'tshi-JESH-chee', category: 'numbers', lesson: 4, exampleSentence: 'Mam trzydzieści lat.', exampleTranslation: 'I am thirty years old.' },
    { id: 'l4_19', polish: 'Pięćdziesiąt', english: 'Fifty', phonetic: 'pyen-JEH-shownt', category: 'numbers', lesson: 4, exampleSentence: 'Moja mama ma pięćdziesiąt lat.', exampleTranslation: 'My mom is fifty years old.' },
    { id: 'l4_20', polish: 'Sto', english: 'One hundred', phonetic: 'stoh', category: 'numbers', lesson: 4, exampleSentence: 'To kosztuje sto złotych.', exampleTranslation: 'This costs one hundred zlotys.' },
  ],
};

export default lesson4;
