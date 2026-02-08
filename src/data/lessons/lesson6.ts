import { Lesson } from '../courseTypes';

const lesson6: Lesson = {
  id: 6,
  title: 'Poproszę pierogi!',
  titleEnglish: 'I\'ll Have the Pierogi!',
  description: 'Order food like a local, navigate a Polish menu, and talk about what you eat.',
  emoji: '🥟',
  grammarTopics: ['nominative plural', 'instrumental case', 'ordering food'],
  grammarSummary: `## Food, Ordering & Cases

### Nominative Plural
| Gender | Singular → Plural | Example |
|--------|-------------------|---------|
| Masc. personal | -i / -y / -owie | student → studenc**i** |
| Masc. non-personal | -y / -i | ser → ser**y** |
| Feminine | -y / -i | kawa → kaw**y** |
| Neuter | -a | piwo → piw**a** |

### Instrumental Case (with "z" = with)
Used after **z** (with) and with **być** for professions:
| Gender | Ending | Example |
|--------|--------|---------|
| Masculine | -em | z ser**em** (with cheese) |
| Feminine | -ą | z szynk**ą** (with ham) |
| Neuter | -em | z masł**em** (with butter) |

### Useful Restaurant Phrases
- **Poproszę...** — I'd like... (the polite way to order)
- **Dla mnie...** — For me...
- **Rachunek, proszę.** — The bill, please.
- **Czy mogę prosić o menu?** — May I ask for the menu?`,

  culturalNote: `🇵🇱 **Polish Food Culture**

The main meal in Poland is **obiad** (lunch), traditionally eaten around 2-3 PM. A typical obiad has three courses: soup (zupa), main course (drugie danie), and dessert (deser). Pierogi, bigos (hunter's stew), żurek (sour rye soup), and schabowy (breaded pork cutlet) are national favorites. Poles take pride in homemade food.`,

  dialogues: [
    {
      title: 'At a restaurant',
      lines: [
        { speaker: 'Kelner', polish: 'Dzień dobry. Co dla Państwa?', english: 'Good day. What can I get you?' },
        { speaker: 'A', polish: 'Poproszę zupę pomidorową i schabowego z ziemniakami.', english: "I'd like tomato soup and pork cutlet with potatoes." },
        { speaker: 'B', polish: 'Dla mnie pierogi z mięsem, proszę.', english: 'For me pierogi with meat, please.' },
        { speaker: 'Kelner', polish: 'A do picia?', english: 'And to drink?' },
        { speaker: 'A', polish: 'Dwa piwa, proszę.', english: 'Two beers, please.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l6_1', polish: 'Jeść', english: 'To eat', phonetic: 'yeshch', category: 'food', lesson: 6, grammarTip: 'Ja jem, ty jesz, on/ona je', exampleSentence: 'Co jesz na śniadanie?', exampleTranslation: 'What do you eat for breakfast?' },
    { id: 'l6_2', polish: 'Pić', english: 'To drink', phonetic: 'peech', category: 'food', lesson: 6, grammarTip: 'Ja piję, ty pijesz', exampleSentence: 'Piję kawę z mlekiem.', exampleTranslation: 'I drink coffee with milk.' },
    { id: 'l6_3', polish: 'Śniadanie', english: 'Breakfast', phonetic: 'shnya-DAH-nyeh', category: 'food', lesson: 6, gender: 'neuter', exampleSentence: 'Jem śniadanie o ósmej.', exampleTranslation: 'I eat breakfast at eight.' },
    { id: 'l6_4', polish: 'Obiad', english: 'Lunch (main meal)', phonetic: 'OH-byaht', category: 'food', lesson: 6, gender: 'masculine', grammarTip: 'The main meal of the day in Poland, eaten around 2-3 PM', exampleSentence: 'Obiad jest gotowy!', exampleTranslation: 'Lunch is ready!' },
    { id: 'l6_5', polish: 'Kolacja', english: 'Dinner / Supper', phonetic: 'koh-LAHTS-yah', category: 'food', lesson: 6, gender: 'feminine', exampleSentence: 'Kolacja jest o siódmej.', exampleTranslation: 'Dinner is at seven.' },
    { id: 'l6_6', polish: 'Zupa', english: 'Soup', phonetic: 'ZOO-pah', category: 'food', lesson: 6, gender: 'feminine', exampleSentence: 'Poproszę zupę pomidorową.', exampleTranslation: "I'd like tomato soup." },
    { id: 'l6_7', polish: 'Pierogi', english: 'Dumplings (pierogi)', phonetic: 'pyeh-ROH-gee', category: 'food', lesson: 6, grammarTip: 'Already plural. Singular: pieróg (rarely used).', exampleSentence: 'Lubię pierogi z serem.', exampleTranslation: 'I like pierogi with cheese.' },
    { id: 'l6_8', polish: 'Mięso', english: 'Meat', phonetic: 'MYEN-soh', category: 'food', lesson: 6, gender: 'neuter', exampleSentence: 'Nie jem mięsa.', exampleTranslation: "I don't eat meat." },
    { id: 'l6_9', polish: 'Ryba', english: 'Fish', phonetic: 'RI-bah', category: 'food', lesson: 6, gender: 'feminine', exampleSentence: 'Lubię rybę z frytkami.', exampleTranslation: 'I like fish with fries.' },
    { id: 'l6_10', polish: 'Woda', english: 'Water', phonetic: 'VOH-dah', category: 'food', lesson: 6, gender: 'feminine', exampleSentence: 'Poproszę wodę mineralną.', exampleTranslation: "I'd like mineral water." },
    { id: 'l6_11', polish: 'Piwo', english: 'Beer', phonetic: 'PEE-voh', category: 'food', lesson: 6, gender: 'neuter', exampleSentence: 'Dwa piwa, proszę.', exampleTranslation: 'Two beers, please.' },
    { id: 'l6_12', polish: 'Kawa', english: 'Coffee', phonetic: 'KAH-vah', category: 'food', lesson: 6, gender: 'feminine', exampleSentence: 'Kawa z mlekiem czy bez?', exampleTranslation: 'Coffee with milk or without?' },
    { id: 'l6_13', polish: 'Herbata', english: 'Tea', phonetic: 'her-BAH-tah', category: 'food', lesson: 6, gender: 'feminine', exampleSentence: 'Poproszę herbatę z cytryną.', exampleTranslation: "I'd like tea with lemon." },
    { id: 'l6_14', polish: 'Chleb', english: 'Bread', phonetic: 'hlep', category: 'food', lesson: 6, gender: 'masculine', exampleSentence: 'Chleb z masłem i serem.', exampleTranslation: 'Bread with butter and cheese.' },
    { id: 'l6_15', polish: 'Masło', english: 'Butter', phonetic: 'MAHS-woh', category: 'food', lesson: 6, gender: 'neuter', exampleSentence: 'Poproszę chleb z masłem.', exampleTranslation: "I'd like bread with butter." },
    { id: 'l6_16', polish: 'Ser', english: 'Cheese', phonetic: 'sehr', category: 'food', lesson: 6, gender: 'masculine', exampleSentence: 'Lubię ser żółty.', exampleTranslation: 'I like yellow cheese.' },
    { id: 'l6_17', polish: 'Poproszę', english: "I'd like (polite ordering)", phonetic: 'poh-PROH-sheh', category: 'food', lesson: 6, grammarTip: 'The standard polite way to order in Poland', exampleSentence: 'Poproszę rachunek.', exampleTranslation: "I'd like the bill." },
    { id: 'l6_18', polish: 'Smacznego!', english: 'Bon appétit!', phonetic: 'smahch-NEH-goh', category: 'food', lesson: 6, grammarTip: 'Genitive of "smaczny" (tasty). Said before meals.', exampleSentence: 'Obiad gotowy. Smacznego!', exampleTranslation: 'Lunch is ready. Enjoy!' },
    { id: 'l6_19', polish: 'Rachunek', english: 'Bill / Check', phonetic: 'rah-HOO-nek', category: 'food', lesson: 6, gender: 'masculine', exampleSentence: 'Rachunek, proszę.', exampleTranslation: 'The bill, please.' },
    { id: 'l6_20', polish: 'Pyszne', english: 'Delicious', phonetic: 'PISH-neh', category: 'food', lesson: 6, grammarTip: 'Neuter form. Masc: pyszny, fem: pyszna.', exampleSentence: 'Te pierogi są pyszne!', exampleTranslation: 'These pierogi are delicious!' },
  ],
};

export default lesson6;
