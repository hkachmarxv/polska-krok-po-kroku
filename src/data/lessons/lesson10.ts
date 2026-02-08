import { Lesson } from '../courseTypes';

const lesson10: Lesson = {
  id: 10,
  title: 'Opowiem Ci historię',
  titleEnglish: 'Let Me Tell You a Story',
  description: 'Talk about what happened yesterday, last week, or years ago — your first past tense.',
  emoji: '📖',
  grammarTopics: ['past tense (imperfective)', 'months', 'time expressions'],
  grammarSummary: `## Past Tense (Imperfective)

### How to Form the Past Tense
Take the infinitive stem + past tense endings based on gender:

| Person | Masculine | Feminine |
|--------|-----------|----------|
| ja | robił**em** | robił**am** |
| ty | robił**eś** | robił**aś** |
| on/ona | robił / robiła | robiła |
| my | robili**śmy** | robiły**śmy** |
| wy | robili**ście** | robiły**ście** |
| oni/one | robili | robiły |

### Examples
- Wczoraj **czytałem** książkę. (Yesterday I read a book. — male speaker)
- Wczoraj **czytałam** książkę. (Yesterday I read a book. — female speaker)
- Co **robiłeś** w weekend? (What did you do on the weekend? — to a male)

### Months (Miesiące)
| Polish | English |
|--------|---------|
| styczeń | January |
| luty | February |
| marzec | March |
| kwiecień | April |
| maj | May |
| czerwiec | June |
| lipiec | July |
| sierpień | August |
| wrzesień | September |
| październik | October |
| listopad | November |
| grudzień | December |

Use **w** + locative for "in [month]": w styczn**iu**, w lut**ym**, w marc**u**...`,

  culturalNote: `🇵🇱 **Polish Calendar & Holidays**

Poland has many public holidays: New Year (1 Jan), Easter, May Day (1 May), Constitution Day (3 May), Corpus Christi, All Saints' Day (1 Nov, very important — families visit cemeteries with candles), Independence Day (11 Nov), and Christmas (24-26 Dec). Christmas Eve (Wigilia) is the most important family gathering.`,

  dialogues: [
    {
      title: 'Talking about yesterday',
      lines: [
        { speaker: 'A', polish: 'Co robiłeś wczoraj?', english: 'What did you do yesterday?' },
        { speaker: 'B', polish: 'Rano pracowałem. Po południu grałem w piłkę.', english: 'In the morning I worked. In the afternoon I played football.' },
        { speaker: 'A', polish: 'A wieczorem?', english: 'And in the evening?' },
        { speaker: 'B', polish: 'Wieczorem oglądałem film i czytałem książkę.', english: 'In the evening I watched a movie and read a book.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l10_1', polish: 'Wczoraj', english: 'Yesterday', phonetic: 'FCHOH-ray', category: 'numbers', lesson: 10, exampleSentence: 'Wczoraj byłem w kinie.', exampleTranslation: 'Yesterday I was at the cinema.' },
    { id: 'l10_2', polish: 'Robiłem / Robiłam', english: 'I was doing / I did', phonetic: 'roh-BEE-wem / roh-BEE-wahm', category: 'greetings', lesson: 10, grammarTip: '-łem (male speaker), -łam (female speaker)', exampleSentence: 'Co robiłeś wczoraj?', exampleTranslation: 'What did you do yesterday?' },
    { id: 'l10_3', polish: 'Byłem / Byłam', english: 'I was', phonetic: 'BI-wem / BI-wahm', category: 'greetings', lesson: 10, grammarTip: 'Past tense of "być". Masc: byłem, fem: byłam.', exampleSentence: 'Byłem w Krakowie.', exampleTranslation: 'I was in Kraków.' },
    { id: 'l10_4', polish: 'Jadłem / Jadłam', english: 'I ate / I was eating', phonetic: 'YAHD-wem / YAHD-wahm', category: 'food', lesson: 10, grammarTip: 'Past of "jeść". Irregular stem.', exampleSentence: 'Jadłem pierogi na obiad.', exampleTranslation: 'I ate pierogi for lunch.' },
    { id: 'l10_5', polish: 'Styczeń', english: 'January', phonetic: 'STI-chen', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'W styczniu jest zimno.', exampleTranslation: "In January it's cold." },
    { id: 'l10_6', polish: 'Luty', english: 'February', phonetic: 'LOO-ti', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'W lutym są walentynki.', exampleTranslation: "In February there's Valentine's Day." },
    { id: 'l10_7', polish: 'Marzec', english: 'March', phonetic: 'MAH-zhets', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'W marcu zaczyna się wiosna.', exampleTranslation: 'In March, spring begins.' },
    { id: 'l10_8', polish: 'Kwiecień', english: 'April', phonetic: 'KVYEH-chen', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'W kwietniu pada deszcz.', exampleTranslation: 'In April it rains.' },
    { id: 'l10_9', polish: 'Maj', english: 'May', phonetic: 'may', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'W maju jest Dzień Matki.', exampleTranslation: "In May is Mother's Day." },
    { id: 'l10_10', polish: 'Czerwiec', english: 'June', phonetic: 'CHER-vyets', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'W czerwcu kończę szkołę.', exampleTranslation: 'In June I finish school.' },
    { id: 'l10_11', polish: 'Lipiec', english: 'July', phonetic: 'LEE-pyets', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'W lipcu jadę na urlop.', exampleTranslation: "In July I'm going on vacation." },
    { id: 'l10_12', polish: 'Sierpień', english: 'August', phonetic: 'SHER-pyen', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'Sierpień jest gorący.', exampleTranslation: 'August is hot.' },
    { id: 'l10_13', polish: 'Wrzesień', english: 'September', phonetic: 'VZHEH-shen', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'We wrześniu zaczyna się szkoła.', exampleTranslation: 'In September school starts.' },
    { id: 'l10_14', polish: 'Październik', english: 'October', phonetic: 'pahzh-DJER-neek', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'Październik jest piękny.', exampleTranslation: 'October is beautiful.' },
    { id: 'l10_15', polish: 'Listopad', english: 'November', phonetic: 'lees-TOH-paht', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'W listopadzie jest Wszystkich Świętych.', exampleTranslation: "In November is All Saints' Day." },
    { id: 'l10_16', polish: 'Grudzień', english: 'December', phonetic: 'GROO-jen', category: 'numbers', lesson: 10, gender: 'masculine', exampleSentence: 'W grudniu są święta.', exampleTranslation: 'In December there are holidays.' },
    { id: 'l10_17', polish: 'W zeszłym roku', english: 'Last year', phonetic: 'v ZESH-wim ROH-koo', category: 'numbers', lesson: 10, exampleSentence: 'W zeszłym roku byłem w Polsce.', exampleTranslation: 'Last year I was in Poland.' },
    { id: 'l10_18', polish: 'W zeszłym tygodniu', english: 'Last week', phonetic: 'v ZESH-wim ti-GOHD-nyoo', category: 'numbers', lesson: 10, exampleSentence: 'W zeszłym tygodniu chodziłem do kina.', exampleTranslation: 'Last week I went to the cinema.' },
    { id: 'l10_19', polish: 'Rok', english: 'Year', phonetic: 'rohk', category: 'numbers', lesson: 10, gender: 'masculine', grammarTip: 'Genitive: roku. Plural: lata (2-4), lat (5+).', exampleSentence: 'Mam trzydzieści lat.', exampleTranslation: "I'm thirty years old." },
    { id: 'l10_20', polish: 'Miesiąc', english: 'Month', phonetic: 'MYEH-shownts', category: 'numbers', lesson: 10, gender: 'masculine', grammarTip: 'Genitive: miesiąca. Plural: miesiące/miesięcy.', exampleSentence: 'Uczę się polskiego od trzech miesięcy.', exampleTranslation: "I've been learning Polish for three months." },
  ],
};

export default lesson10;
