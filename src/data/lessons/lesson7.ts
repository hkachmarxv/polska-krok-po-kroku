import { Lesson } from '../courseTypes';

const lesson7: Lesson = {
  id: 7,
  title: 'Mój dzień',
  titleEnglish: 'My Day',
  description: 'Describe your daily routine, tell time, and learn days of the week.',
  emoji: '⏰',
  grammarTopics: ['telling time', 'days of the week', 'reflexive verbs', 'daily routine verbs'],
  grammarSummary: `## Daily Routine & Telling Time

### Telling Time
- **Która jest godzina?** — What time is it?
- Jest **pierwsza** (1:00), **druga** (2:00), **trzecia** (3:00)...
- Jest godzina **ósma trzydzieści** (8:30)
- **O której?** — At what time? → O **ósmej** (at 8:00)

### Days of the Week
| Polish | English |
|--------|---------|
| poniedziałek | Monday |
| wtorek | Tuesday |
| środa | Wednesday |
| czwartek | Thursday |
| piątek | Friday |
| sobota | Saturday |
| niedziela | Sunday |

Use **w** + accusative for "on [day]": w poniedziałek, we wtorek, w środę...

### Reflexive Verbs (with "się")
Many daily routine verbs are reflexive:
- **myć się** — to wash (oneself): myję się
- **ubierać się** — to get dressed: ubieram się
- **golić się** — to shave: golę się
- **kłaść się** — to go to bed: kładę się

### Common Time Expressions
- rano (in the morning), po południu (in the afternoon), wieczorem (in the evening), w nocy (at night)`,

  culturalNote: `🇵🇱 **Polish Daily Life**

Polish daily routine revolves around the main meal — obiad — which happens around 2-4 PM. Morning starts with a light śniadanie (often bread, cheese, ham). Kolacja (supper) is usually light. Most shops close by 8-9 PM, and Sundays have restricted shopping hours (since 2018, most stores are closed on Sundays).`,

  dialogues: [
    {
      title: 'Describing a typical day',
      lines: [
        { speaker: 'A', polish: 'O której wstajesz?', english: 'What time do you get up?' },
        { speaker: 'B', polish: 'Wstaję o siódmej rano.', english: 'I get up at seven in the morning.' },
        { speaker: 'A', polish: 'Co robisz potem?', english: 'What do you do then?' },
        { speaker: 'B', polish: 'Myję się, ubieram się i jem śniadanie.', english: 'I wash, get dressed, and eat breakfast.' },
        { speaker: 'A', polish: 'O której zaczynasz pracę?', english: 'What time do you start work?' },
        { speaker: 'B', polish: 'Zaczynam o dziewiątej. Kończę o piątej.', english: 'I start at nine. I finish at five.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l7_1', polish: 'Wstawać', english: 'To get up', phonetic: 'FSTAH-vach', category: 'greetings', lesson: 7, grammarTip: 'Ja wstaję, ty wstajesz', exampleSentence: 'Wstaję o szóstej rano.', exampleTranslation: 'I get up at six in the morning.' },
    { id: 'l7_2', polish: 'Myć się', english: 'To wash (oneself)', phonetic: 'mich sheh', category: 'greetings', lesson: 7, grammarTip: 'Reflexive. Ja myję się.', exampleSentence: 'Rano myję się i ubieram się.', exampleTranslation: 'In the morning I wash and get dressed.' },
    { id: 'l7_3', polish: 'Ubierać się', english: 'To get dressed', phonetic: 'oo-BYEH-rach sheh', category: 'greetings', lesson: 7, exampleSentence: 'Ubieram się szybko.', exampleTranslation: 'I get dressed quickly.' },
    { id: 'l7_4', polish: 'Zaczynać', english: 'To start / begin', phonetic: 'zah-CHI-nach', category: 'greetings', lesson: 7, exampleSentence: 'Zaczynam pracę o ósmej.', exampleTranslation: 'I start work at eight.' },
    { id: 'l7_5', polish: 'Kończyć', english: 'To finish / end', phonetic: 'KON-chich', category: 'greetings', lesson: 7, exampleSentence: 'Kończę pracę o piątej.', exampleTranslation: 'I finish work at five.' },
    { id: 'l7_6', polish: 'Iść', english: 'To go (on foot)', phonetic: 'eeshch', category: 'travel', lesson: 7, grammarTip: 'Ja idę, ty idziesz. For habitual: chodzić.', exampleSentence: 'Idę do pracy.', exampleTranslation: "I'm going to work." },
    { id: 'l7_7', polish: 'Jechać', english: 'To go (by vehicle)', phonetic: 'YEH-hach', category: 'travel', lesson: 7, grammarTip: 'Ja jadę, ty jedziesz. For habitual: jeździć.', exampleSentence: 'Jadę autobusem do pracy.', exampleTranslation: 'I go to work by bus.' },
    { id: 'l7_8', polish: 'Wracać', english: 'To return / come back', phonetic: 'VRAH-tsach', category: 'greetings', lesson: 7, exampleSentence: 'Wracam do domu o szóstej.', exampleTranslation: 'I return home at six.' },
    { id: 'l7_9', polish: 'Rano', english: 'In the morning / Morning', phonetic: 'RAH-noh', category: 'numbers', lesson: 7, exampleSentence: 'Rano piję kawę.', exampleTranslation: 'In the morning I drink coffee.' },
    { id: 'l7_10', polish: 'Wieczorem', english: 'In the evening', phonetic: 'vyeh-CHOH-rem', category: 'numbers', lesson: 7, grammarTip: 'Instrumental of "wieczór" (evening)', exampleSentence: 'Wieczorem oglądam telewizję.', exampleTranslation: 'In the evening I watch TV.' },
    { id: 'l7_11', polish: 'Poniedziałek', english: 'Monday', phonetic: 'poh-nyeh-JAH-wek', category: 'numbers', lesson: 7, gender: 'masculine', exampleSentence: 'W poniedziałek mam spotkanie.', exampleTranslation: 'On Monday I have a meeting.' },
    { id: 'l7_12', polish: 'Wtorek', english: 'Tuesday', phonetic: 'FTOH-rek', category: 'numbers', lesson: 7, gender: 'masculine', exampleSentence: 'We wtorek gram w piłkę.', exampleTranslation: 'On Tuesday I play football.' },
    { id: 'l7_13', polish: 'Środa', english: 'Wednesday', phonetic: 'SHROH-dah', category: 'numbers', lesson: 7, gender: 'feminine', exampleSentence: 'W środę idę do kina.', exampleTranslation: "On Wednesday I'm going to the cinema." },
    { id: 'l7_14', polish: 'Czwartek', english: 'Thursday', phonetic: 'CHVAR-tek', category: 'numbers', lesson: 7, gender: 'masculine', exampleSentence: 'W czwartek mam lekcję polskiego.', exampleTranslation: 'On Thursday I have a Polish lesson.' },
    { id: 'l7_15', polish: 'Piątek', english: 'Friday', phonetic: 'PYOWN-tek', category: 'numbers', lesson: 7, gender: 'masculine', exampleSentence: 'W piątek idziemy do restauracji.', exampleTranslation: "On Friday we're going to a restaurant." },
    { id: 'l7_16', polish: 'Sobota', english: 'Saturday', phonetic: 'soh-BOH-tah', category: 'numbers', lesson: 7, gender: 'feminine', exampleSentence: 'W sobotę odpoczywam.', exampleTranslation: 'On Saturday I rest.' },
    { id: 'l7_17', polish: 'Niedziela', english: 'Sunday', phonetic: 'nyeh-JEH-lah', category: 'numbers', lesson: 7, gender: 'feminine', exampleSentence: 'W niedzielę jem obiad z rodziną.', exampleTranslation: 'On Sunday I eat lunch with family.' },
    { id: 'l7_18', polish: 'Godzina', english: 'Hour / O\'clock', phonetic: 'goh-JEE-nah', category: 'numbers', lesson: 7, gender: 'feminine', exampleSentence: 'Która jest godzina?', exampleTranslation: 'What time is it?' },
    { id: 'l7_19', polish: 'Potem', english: 'Then / After that', phonetic: 'POH-tem', category: 'greetings', lesson: 7, exampleSentence: 'Jem śniadanie, potem idę do pracy.', exampleTranslation: 'I eat breakfast, then I go to work.' },
    { id: 'l7_20', polish: 'Codziennie', english: 'Every day', phonetic: 'tsoh-JEN-nyeh', category: 'greetings', lesson: 7, exampleSentence: 'Codziennie uczę się polskiego.', exampleTranslation: 'Every day I study Polish.' },
  ],
};

export default lesson7;
