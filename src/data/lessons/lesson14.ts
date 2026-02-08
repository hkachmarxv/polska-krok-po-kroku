import { Lesson } from '../courseTypes';

const lesson14: Lesson = {
  id: 14,
  title: 'Jak w domu',
  titleEnglish: 'Make Yourself at Home',
  description: 'Describe your flat, talk about rooms and furniture, and feel at home in Polish.',
  emoji: '🛋️',
  grammarTopics: ['locative descriptions', 'rooms and furniture', 'jest/są + location'],
  grammarSummary: `## Home & Locative Descriptions

### Describing Location with "jest/są"
- W salonie **jest** duża kanapa. (In the living room there is a big couch.)
- Na stole **są** kwiaty. (On the table there are flowers.)
- Obok łóżka **jest** szafka. (Next to the bed there is a nightstand.)

### Rooms (Pokoje)
| Polish | English |
|--------|---------|
| kuchnia | kitchen |
| łazienka | bathroom |
| sypialnia | bedroom |
| salon | living room |
| przedpokój | hallway |
| balkon | balcony |
| garaż | garage |

### Useful Phrases for Apartment Hunting
- **Szukam mieszkania.** — I'm looking for an apartment.
- **Ile wynosi czynsz?** — How much is the rent?
- **Ile pokoi?** — How many rooms?
- **Na którym piętrze?** — On which floor?
- **Czy jest umeblowane?** — Is it furnished?`,

  culturalNote: `🇵🇱 **Housing in Poland**

Most Poles live in apartments (mieszkania), especially in cities. "Bloki" — communist-era apartment blocks — are still very common. Rent (czynsz) usually doesn't include utilities (media). When Poles say "3 pokoje" (3 rooms), they mean 3 rooms plus kitchen and bathroom. The ground floor is called "parter" — the first floor (pierwsze piętro) is one level up.`,

  dialogues: [
    {
      title: 'Apartment viewing',
      lines: [
        { speaker: 'A', polish: 'Ile pokoi ma to mieszkanie?', english: 'How many rooms does this apartment have?' },
        { speaker: 'B', polish: 'Trzy pokoje, kuchnia i łazienka.', english: 'Three rooms, a kitchen, and a bathroom.' },
        { speaker: 'A', polish: 'A ile wynosi czynsz?', english: 'And how much is the rent?' },
        { speaker: 'B', polish: 'Dwa tysiące złotych plus media.', english: 'Two thousand zlotys plus utilities.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l14_1', polish: 'Mieszkanie', english: 'Apartment / Flat', phonetic: 'myesh-KAH-nyeh', category: 'travel', lesson: 14, gender: 'neuter', exampleSentence: 'Szukam mieszkania w centrum.', exampleTranslation: "I'm looking for an apartment in the center." },
    { id: 'l14_2', polish: 'Dom', english: 'House / Home', phonetic: 'dohm', category: 'travel', lesson: 14, gender: 'masculine', exampleSentence: 'Mój dom jest duży.', exampleTranslation: 'My house is big.' },
    { id: 'l14_3', polish: 'Kuchnia', english: 'Kitchen', phonetic: 'KOOH-nyah', category: 'travel', lesson: 14, gender: 'feminine', exampleSentence: 'Gotuję w kuchni.', exampleTranslation: "I'm cooking in the kitchen." },
    { id: 'l14_4', polish: 'Łazienka', english: 'Bathroom', phonetic: 'wah-ZHEN-kah', category: 'travel', lesson: 14, gender: 'feminine', exampleSentence: 'Łazienka jest mała.', exampleTranslation: 'The bathroom is small.' },
    { id: 'l14_5', polish: 'Sypialnia', english: 'Bedroom', phonetic: 'si-PYAHL-nyah', category: 'travel', lesson: 14, gender: 'feminine', exampleSentence: 'W sypialni jest duże łóżko.', exampleTranslation: 'In the bedroom there is a big bed.' },
    { id: 'l14_6', polish: 'Salon', english: 'Living room', phonetic: 'SAH-lon', category: 'travel', lesson: 14, gender: 'masculine', exampleSentence: 'Oglądamy telewizję w salonie.', exampleTranslation: 'We watch TV in the living room.' },
    { id: 'l14_7', polish: 'Stół', english: 'Table', phonetic: 'stoow', category: 'travel', lesson: 14, gender: 'masculine', grammarTip: 'Locative: na stole', exampleSentence: 'Na stole są kwiaty.', exampleTranslation: 'On the table there are flowers.' },
    { id: 'l14_8', polish: 'Krzesło', english: 'Chair', phonetic: 'KSHES-woh', category: 'travel', lesson: 14, gender: 'neuter', exampleSentence: 'Proszę, niech Pan siądzie na krześle.', exampleTranslation: 'Please, have a seat.' },
    { id: 'l14_9', polish: 'Łóżko', english: 'Bed', phonetic: 'WOOSH-koh', category: 'travel', lesson: 14, gender: 'neuter', exampleSentence: 'Łóżko jest wygodne.', exampleTranslation: 'The bed is comfortable.' },
    { id: 'l14_10', polish: 'Kanapa', english: 'Couch / Sofa', phonetic: 'kah-NAH-pah', category: 'travel', lesson: 14, gender: 'feminine', exampleSentence: 'Siedzę na kanapie.', exampleTranslation: "I'm sitting on the couch." },
    { id: 'l14_11', polish: 'Okno', english: 'Window', phonetic: 'OHK-noh', category: 'travel', lesson: 14, gender: 'neuter', exampleSentence: 'Otwórz okno, proszę.', exampleTranslation: 'Open the window, please.' },
    { id: 'l14_12', polish: 'Drzwi', english: 'Door', phonetic: 'dzhvee', category: 'travel', lesson: 14, grammarTip: 'Always plural in Polish', exampleSentence: 'Zamknij drzwi.', exampleTranslation: 'Close the door.' },
    { id: 'l14_13', polish: 'Piętro', english: 'Floor / Story', phonetic: 'PYEN-troh', category: 'travel', lesson: 14, gender: 'neuter', grammarTip: 'Na którym piętrze? On which floor? Parter = ground floor.', exampleSentence: 'Mieszkam na trzecim piętrze.', exampleTranslation: 'I live on the third floor.' },
    { id: 'l14_14', polish: 'Czynsz', english: 'Rent', phonetic: 'chinsh', category: 'travel', lesson: 14, gender: 'masculine', exampleSentence: 'Czynsz wynosi dwa tysiące.', exampleTranslation: 'The rent is two thousand.' },
    { id: 'l14_15', polish: 'Winda', english: 'Elevator', phonetic: 'VEEN-dah', category: 'travel', lesson: 14, gender: 'feminine', exampleSentence: 'Czy jest winda?', exampleTranslation: 'Is there an elevator?' },
    { id: 'l14_16', polish: 'Lodówka', english: 'Refrigerator', phonetic: 'loh-DOOV-kah', category: 'travel', lesson: 14, gender: 'feminine', exampleSentence: 'Mleko jest w lodówce.', exampleTranslation: 'The milk is in the fridge.' },
    { id: 'l14_17', polish: 'Pralka', english: 'Washing machine', phonetic: 'PRAHL-kah', category: 'travel', lesson: 14, gender: 'feminine', exampleSentence: 'Czy jest pralka?', exampleTranslation: 'Is there a washing machine?' },
    { id: 'l14_18', polish: 'Wygodny', english: 'Comfortable', phonetic: 'vi-GOHD-ni', category: 'greetings', lesson: 14, gender: 'masculine', grammarTip: 'Fem: wygodna', exampleSentence: 'To mieszkanie jest wygodne.', exampleTranslation: 'This apartment is comfortable.' },
    { id: 'l14_19', polish: 'Jasny', english: 'Bright / Light', phonetic: 'YAHS-ni', category: 'greetings', lesson: 14, gender: 'masculine', exampleSentence: 'Salon jest jasny i przestronny.', exampleTranslation: 'The living room is bright and spacious.' },
    { id: 'l14_20', polish: 'Tysiąc', english: 'Thousand', phonetic: 'TI-shownts', category: 'numbers', lesson: 14, gender: 'masculine', exampleSentence: 'To kosztuje dwa tysiące złotych.', exampleTranslation: 'This costs two thousand zlotys.' },
  ],
};

export default lesson14;
