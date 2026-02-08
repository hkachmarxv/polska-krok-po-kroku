import { Lesson } from '../courseTypes';

const lesson12: Lesson = {
  id: 12,
  title: 'Gdzie jesteś?',
  titleEnglish: 'Where are you?',
  description: 'Give and understand directions, learn the locative case, and navigate the city.',
  emoji: '🗺️',
  grammarTopics: ['locative case', 'directions', 'prepositions of place'],
  grammarSummary: `## Locative Case & Directions

### Locative Case
Used after prepositions: **w** (in), **na** (on/at), **o** (about), **przy** (near/by).

| Gender | Nominative → Locative | Example |
|--------|----------------------|---------|
| Masculine | → -e / -u | dom → w dom**u**, sklep → w sklep**ie** |
| Feminine | -a → -e / -i | szkoła → w szkol**e**, ulica → na ulic**y** |
| Neuter | -o → -e, -e → -u | kino → w kin**ie**, morze → na morz**u** |

### Direction Phrases
| Polish | English |
|--------|---------|
| na prawo | to the right |
| na lewo | to the left |
| prosto | straight ahead |
| za rogiem | around the corner |
| obok + gen. | next to |
| naprzeciwko + gen. | opposite / across from |
| między + instr. | between |

### Asking for Directions
- **Gdzie jest...?** — Where is...?
- **Jak dojść do...?** — How to get to...? (on foot)
- **Jak dojechać do...?** — How to get to...? (by vehicle)
- **Czy to daleko?** — Is it far?`,

  culturalNote: `🇵🇱 **Polish Cities**

Poland's major cities each have distinct character: Warsaw (Warszawa) is the business capital, Kraków is the cultural heart, Gdańsk is the Baltic coast gem, Wrocław is known for its bridges and dwarfs (krasnale), and Poznań is famous for its croissants (rogale świętomarcińskie).`,

  dialogues: [
    {
      title: 'Asking for directions',
      lines: [
        { speaker: 'A', polish: 'Przepraszam, gdzie jest dworzec?', english: 'Excuse me, where is the train station?' },
        { speaker: 'B', polish: 'Proszę iść prosto, potem na prawo.', english: 'Please go straight, then turn right.' },
        { speaker: 'A', polish: 'Czy to daleko?', english: 'Is it far?' },
        { speaker: 'B', polish: 'Nie, to pięć minut pieszo.', english: "No, it's five minutes on foot." },
      ],
    },
  ],

  vocabulary: [
    { id: 'l12_1', polish: 'Gdzie?', english: 'Where?', phonetic: 'gjeh', category: 'travel', lesson: 12, exampleSentence: 'Gdzie jest bank?', exampleTranslation: 'Where is the bank?' },
    { id: 'l12_2', polish: 'Na prawo', english: 'To the right', phonetic: 'nah PRAH-voh', category: 'travel', lesson: 12, exampleSentence: 'Proszę skręcić na prawo.', exampleTranslation: 'Please turn right.' },
    { id: 'l12_3', polish: 'Na lewo', english: 'To the left', phonetic: 'nah LEH-voh', category: 'travel', lesson: 12, exampleSentence: 'Skręć na lewo przy kościele.', exampleTranslation: 'Turn left at the church.' },
    { id: 'l12_4', polish: 'Prosto', english: 'Straight ahead', phonetic: 'PROHS-toh', category: 'travel', lesson: 12, exampleSentence: 'Idź prosto dwie ulice.', exampleTranslation: 'Go straight for two streets.' },
    { id: 'l12_5', polish: 'Blisko', english: 'Close / Near', phonetic: 'BLEES-koh', category: 'travel', lesson: 12, exampleSentence: 'Apteka jest blisko.', exampleTranslation: 'The pharmacy is close.' },
    { id: 'l12_6', polish: 'Daleko', english: 'Far', phonetic: 'dah-LEH-koh', category: 'travel', lesson: 12, exampleSentence: 'Lotnisko jest daleko.', exampleTranslation: 'The airport is far.' },
    { id: 'l12_7', polish: 'Obok', english: 'Next to / Beside', phonetic: 'OH-bohk', category: 'travel', lesson: 12, grammarTip: '+ genitive', exampleSentence: 'Bank jest obok poczty.', exampleTranslation: 'The bank is next to the post office.' },
    { id: 'l12_8', polish: 'Poczta', english: 'Post office', phonetic: 'POHCH-tah', category: 'travel', lesson: 12, gender: 'feminine', exampleSentence: 'Gdzie jest poczta?', exampleTranslation: 'Where is the post office?' },
    { id: 'l12_9', polish: 'Bank', english: 'Bank', phonetic: 'bahnk', category: 'travel', lesson: 12, gender: 'masculine', exampleSentence: 'Bank jest na tej ulicy.', exampleTranslation: 'The bank is on this street.' },
    { id: 'l12_10', polish: 'Kościół', english: 'Church', phonetic: 'KOSH-choow', category: 'travel', lesson: 12, gender: 'masculine', exampleSentence: 'Kościół jest na rynku.', exampleTranslation: 'The church is on the market square.' },
    { id: 'l12_11', polish: 'Rynek', english: 'Market square', phonetic: 'RI-nek', category: 'travel', lesson: 12, gender: 'masculine', exampleSentence: 'Spotkajmy się na rynku.', exampleTranslation: "Let's meet at the market square." },
    { id: 'l12_12', polish: 'Ulica', english: 'Street', phonetic: 'oo-LEE-tsah', category: 'travel', lesson: 12, gender: 'feminine', exampleSentence: 'Mieszkam na ulicy Długiej.', exampleTranslation: 'I live on Długa Street.' },
    { id: 'l12_13', polish: 'Przystanek', english: 'Bus/Tram stop', phonetic: 'PSHI-stah-nek', category: 'travel', lesson: 12, gender: 'masculine', exampleSentence: 'Przystanek jest za rogiem.', exampleTranslation: 'The bus stop is around the corner.' },
    { id: 'l12_14', polish: 'Dworzec', english: 'Train station', phonetic: 'DVOH-zhets', category: 'travel', lesson: 12, gender: 'masculine', exampleSentence: 'Jak dojść do dworca?', exampleTranslation: 'How to get to the train station?' },
    { id: 'l12_15', polish: 'Apteka', english: 'Pharmacy', phonetic: 'ahp-TEH-kah', category: 'travel', lesson: 12, gender: 'feminine', exampleSentence: 'Apteka jest otwarta do 22.', exampleTranslation: 'The pharmacy is open until 10 PM.' },
    { id: 'l12_16', polish: 'Skręcić', english: 'To turn', phonetic: 'SKREN-cheech', category: 'travel', lesson: 12, grammarTip: 'Perfective. Skręć na prawo = turn right (imperative).', exampleSentence: 'Proszę skręcić na lewo.', exampleTranslation: 'Please turn left.' },
    { id: 'l12_17', polish: 'Między', english: 'Between', phonetic: 'MYEN-dzi', category: 'travel', lesson: 12, grammarTip: '+ instrumental', exampleSentence: 'Sklep jest między bankiem a pocztą.', exampleTranslation: 'The store is between the bank and the post office.' },
    { id: 'l12_18', polish: 'Za rogiem', english: 'Around the corner', phonetic: 'zah ROH-gyem', category: 'travel', lesson: 12, exampleSentence: 'Kawiarnia jest za rogiem.', exampleTranslation: 'The café is around the corner.' },
    { id: 'l12_19', polish: 'Pieszo', english: 'On foot', phonetic: 'PYEH-shoh', category: 'travel', lesson: 12, exampleSentence: 'To pięć minut pieszo.', exampleTranslation: "It's five minutes on foot." },
    { id: 'l12_20', polish: 'Centrum', english: 'City center', phonetic: 'TSEN-troom', category: 'travel', lesson: 12, gender: 'neuter', exampleSentence: 'Mieszkam w centrum.', exampleTranslation: 'I live in the city center.' },
  ],
};

export default lesson12;
