import { Lesson } from '../courseTypes';

const lesson11: Lesson = {
  id: 11,
  title: 'Kiedyś będę mówić płynnie!',
  titleEnglish: 'One Day I\'ll Be Fluent!',
  description: 'Dream big — talk about the future, set goals, and say what you\'re going to do.',
  emoji: '🚀',
  grammarTopics: ['future tense', 'będę + infinitive', 'plans and intentions'],
  grammarSummary: `## Future Tense

### Imperfective Future: będę + infinitive or past form
| Person | będę + infinitive | będę + past form |
|--------|-------------------|-----------------|
| ja | będę czytać | będę czytał/a |
| ty | będziesz czytać | będziesz czytał/a |
| on/ona | będzie czytać | będzie czytał/a |
| my | będziemy czytać | będziemy czytali/ły |
| wy | będziecie czytać | będziecie czytali/ły |
| oni/one | będą czytać | będą czytali/ły |

### Perfective Future (simple future)
Perfective verbs use present tense endings for future meaning:
- **przeczytam** — I will read (and finish)
- **napiszę** — I will write (and finish)
- **zrobię** — I will do/make (and finish)

### Useful Expressions
- **Zamierzam...** — I intend to...
- **Planuję...** — I plan to...
- **Mam nadzieję, że...** — I hope that...
- **Chciałbym/Chciałabym...** — I would like to... (m/f)`,

  culturalNote: `🇵🇱 **New Year in Poland**

Poles celebrate Sylwester (New Year's Eve) with big parties, fireworks, and champagne. It's common to make New Year's resolutions (postanowienia noworoczne). Many cities organize outdoor concerts and celebrations in main squares.`,

  dialogues: [
    {
      title: 'Discussing future plans',
      lines: [
        { speaker: 'A', polish: 'Jakie masz plany na weekend?', english: 'What are your plans for the weekend?' },
        { speaker: 'B', polish: 'W sobotę będę pracować, a w niedzielę pojadę nad morze.', english: "On Saturday I'll work, and on Sunday I'll go to the seaside." },
        { speaker: 'A', polish: 'Chciałbym też pojechać nad morze!', english: "I'd like to go to the seaside too!" },
        { speaker: 'B', polish: 'Możesz jechać ze mną!', english: 'You can go with me!' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l11_1', polish: 'Będę', english: 'I will (be)', phonetic: 'BEN-deh', category: 'greetings', lesson: 11, grammarTip: 'Future of "być". Będę + infinitive = future tense.', exampleSentence: 'Będę czytać książkę.', exampleTranslation: 'I will be reading a book.' },
    { id: 'l11_2', polish: 'Plan', english: 'Plan', phonetic: 'plahn', category: 'greetings', lesson: 11, gender: 'masculine', exampleSentence: 'Jakie masz plany?', exampleTranslation: 'What are your plans?' },
    { id: 'l11_3', polish: 'Zamierzać', english: 'To intend', phonetic: 'zah-MYEH-zhach', category: 'greetings', lesson: 11, exampleSentence: 'Zamierzam nauczyć się polskiego.', exampleTranslation: 'I intend to learn Polish.' },
    { id: 'l11_4', polish: 'Nadzieja', english: 'Hope', phonetic: 'nah-JEH-yah', category: 'greetings', lesson: 11, gender: 'feminine', exampleSentence: 'Mam nadzieję, że zdążę.', exampleTranslation: "I hope I'll make it in time." },
    { id: 'l11_5', polish: 'Chciałbym', english: 'I would like (male)', phonetic: 'h-CHAW-bim', category: 'greetings', lesson: 11, grammarTip: 'Female: chciałabym', exampleSentence: 'Chciałbym pojechać do Włoch.', exampleTranslation: "I'd like to go to Italy." },
    { id: 'l11_6', polish: 'Pojechać', english: 'To go (by vehicle, perfective)', phonetic: 'poh-YEH-hach', category: 'travel', lesson: 11, grammarTip: 'Perfective of jechać. Pojadę = I will go.', exampleSentence: 'Pojadę do Warszawy jutro.', exampleTranslation: "I'll go to Warsaw tomorrow." },
    { id: 'l11_7', polish: 'Zrobić', english: 'To do/make (perfective)', phonetic: 'ZROH-beech', category: 'greetings', lesson: 11, grammarTip: 'Perfective of robić. Zrobię = I will do.', exampleSentence: 'Zrobię zakupy po pracy.', exampleTranslation: "I'll do shopping after work." },
    { id: 'l11_8', polish: 'Napisać', english: 'To write (perfective)', phonetic: 'nah-PEE-sach', category: 'greetings', lesson: 11, grammarTip: 'Perfective of pisać. Napiszę = I will write.', exampleSentence: 'Napiszę e-mail jutro.', exampleTranslation: "I'll write an email tomorrow." },
    { id: 'l11_9', polish: 'Przeczytać', english: 'To read (perfective)', phonetic: 'psheh-CHI-tach', category: 'greetings', lesson: 11, grammarTip: 'Perfective of czytać. Przeczytam = I will read (finish).', exampleSentence: 'Przeczytam tę książkę w weekend.', exampleTranslation: "I'll read this book on the weekend." },
    { id: 'l11_10', polish: 'Jutro', english: 'Tomorrow', phonetic: 'YOO-troh', category: 'numbers', lesson: 11, exampleSentence: 'Jutro będzie piękna pogoda.', exampleTranslation: 'Tomorrow the weather will be beautiful.' },
    { id: 'l11_11', polish: 'Za tydzień', english: 'In a week', phonetic: 'zah TI-jen', category: 'numbers', lesson: 11, exampleSentence: 'Za tydzień jadę na urlop.', exampleTranslation: "In a week I'm going on vacation." },
    { id: 'l11_12', polish: 'Za miesiąc', english: 'In a month', phonetic: 'zah MYEH-shownts', category: 'numbers', lesson: 11, exampleSentence: 'Za miesiąc mam egzamin.', exampleTranslation: 'In a month I have an exam.' },
    { id: 'l11_13', polish: 'Wakacje', english: 'Vacation / Holidays', phonetic: 'vah-KAHTS-yeh', category: 'greetings', lesson: 11, grammarTip: 'Always plural', exampleSentence: 'Gdzie jedziesz na wakacje?', exampleTranslation: 'Where are you going on vacation?' },
    { id: 'l11_14', polish: 'Morze', english: 'Sea', phonetic: 'MOH-zheh', category: 'travel', lesson: 11, gender: 'neuter', exampleSentence: 'Jadę nad morze.', exampleTranslation: "I'm going to the seaside." },
    { id: 'l11_15', polish: 'Góry', english: 'Mountains', phonetic: 'GOO-ri', category: 'travel', lesson: 11, grammarTip: 'Plural of "góra". W góry = to the mountains, w górach = in the mountains.', exampleSentence: 'Jedziemy w góry.', exampleTranslation: "We're going to the mountains." },
    { id: 'l11_16', polish: 'Pogoda', english: 'Weather', phonetic: 'poh-GOH-dah', category: 'greetings', lesson: 11, gender: 'feminine', exampleSentence: 'Jaka jest pogoda?', exampleTranslation: "What's the weather like?" },
    { id: 'l11_17', polish: 'Postanowienie', english: 'Resolution / Decision', phonetic: 'poh-stah-noh-VYEH-nyeh', category: 'greetings', lesson: 11, gender: 'neuter', exampleSentence: 'Moje postanowienie to więcej ćwiczyć.', exampleTranslation: 'My resolution is to exercise more.' },
    { id: 'l11_18', polish: 'Więcej', english: 'More', phonetic: 'VYEN-tsey', category: 'greetings', lesson: 11, exampleSentence: 'Chcę więcej czasu.', exampleTranslation: 'I want more time.' },
    { id: 'l11_19', polish: 'Mniej', english: 'Less / Fewer', phonetic: 'mnyey', category: 'greetings', lesson: 11, exampleSentence: 'Chcę mniej stresu.', exampleTranslation: 'I want less stress.' },
    { id: 'l11_20', polish: 'Egzamin', english: 'Exam', phonetic: 'eg-ZAH-meen', category: 'greetings', lesson: 11, gender: 'masculine', exampleSentence: 'Mam egzamin w piątek.', exampleTranslation: 'I have an exam on Friday.' },
  ],
};

export default lesson11;
