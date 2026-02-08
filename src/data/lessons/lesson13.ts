import { Lesson } from '../courseTypes';

const lesson13: Lesson = {
  id: 13,
  title: 'Jadę na urlop!',
  titleEnglish: "I'm going on vacation!",
  description: 'Talk about travel, vacations, booking accommodation, and prepositions of place.',
  emoji: '✈️',
  grammarTopics: ['prepositions of place', 'do/z/na/w + cases', 'booking phrases'],
  grammarSummary: `## Travel & Prepositions of Place

### Where to? (Direction — Accusative)
| Preposition | Use | Example |
|-------------|-----|---------|
| **do** + gen. | to (cities, countries, buildings) | Jadę **do** Krakowa |
| **na** + acc. | to (events, open areas, some countries) | Idę **na** koncert, jadę **na** Ukrainę |
| **w** + acc. | into | Wchodzę **w** las |
| **nad** + acc. | to (water) | Jadę **nad** morze |
| **w** + acc. (góry) | to the mountains | Jadę **w** góry |

### Where? (Location — Locative/Genitive)
| Preposition | Use | Example |
|-------------|-----|---------|
| **w** + loc. | in | Jestem **w** Krakowie |
| **na** + loc. | on/at | Jestem **na** koncercie |
| **nad** + instr. | by (water) | Jestem **nad** morzem |
| **w** + loc. (góry) | in the mountains | Jestem **w** górach |

### Booking Accommodation
- **Chciałbym zarezerwować pokój.** — I'd like to book a room.
- **Na ile nocy?** — For how many nights?
- **Czy jest wolny pokój?** — Is there a room available?
- **Ile kosztuje za noc?** — How much per night?`,

  culturalNote: `🇵🇱 **Traveling in Poland**

Poland offers incredible diversity: Baltic coast beaches, Tatra mountain trails, Mazury lake district, and historic cities. Budget travelers love Poland — it's affordable with great hostels and train connections. Flixbus and PKP Intercity connect major cities cheaply. Agritourism (agroturystyka) — staying on farms — is popular.`,

  dialogues: [
    {
      title: 'Booking a hotel',
      lines: [
        { speaker: 'A', polish: 'Dzień dobry. Chciałbym zarezerwować pokój.', english: "Good day. I'd like to book a room." },
        { speaker: 'B', polish: 'Na ile nocy?', english: 'For how many nights?' },
        { speaker: 'A', polish: 'Na trzy noce. Od piątku do poniedziałku.', english: 'For three nights. From Friday to Monday.' },
        { speaker: 'B', polish: 'Mamy wolny pokój dwuosobowy za dwieście złotych za noc.', english: 'We have a double room available for two hundred zlotys per night.' },
        { speaker: 'A', polish: 'Czy śniadanie jest wliczone?', english: 'Is breakfast included?' },
        { speaker: 'B', polish: 'Tak, śniadanie jest w cenie.', english: 'Yes, breakfast is included.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l13_1', polish: 'Urlop', english: 'Vacation / Holiday', phonetic: 'OOR-lop', category: 'travel', lesson: 13, gender: 'masculine', exampleSentence: 'Jadę na urlop do Hiszpanii.', exampleTranslation: "I'm going on vacation to Spain." },
    { id: 'l13_2', polish: 'Podróż', english: 'Journey / Trip', phonetic: 'POH-droosh', category: 'travel', lesson: 13, gender: 'feminine', exampleSentence: 'Szczęśliwej podróży!', exampleTranslation: 'Have a good trip!' },
    { id: 'l13_3', polish: 'Lotnisko', english: 'Airport', phonetic: 'lot-NEES-koh', category: 'travel', lesson: 13, gender: 'neuter', exampleSentence: 'Samolot odlatuje z lotniska o szóstej.', exampleTranslation: 'The plane departs from the airport at six.' },
    { id: 'l13_4', polish: 'Samolot', english: 'Airplane', phonetic: 'sah-MOH-lot', category: 'travel', lesson: 13, gender: 'masculine', exampleSentence: 'Lecę samolotem do Londynu.', exampleTranslation: "I'm flying to London." },
    { id: 'l13_5', polish: 'Hotel', english: 'Hotel', phonetic: 'HOH-tel', category: 'travel', lesson: 13, gender: 'masculine', exampleSentence: 'Nasz hotel jest w centrum.', exampleTranslation: 'Our hotel is in the center.' },
    { id: 'l13_6', polish: 'Pokój', english: 'Room', phonetic: 'POH-kooy', category: 'travel', lesson: 13, gender: 'masculine', exampleSentence: 'Poproszę pokój jednoosobowy.', exampleTranslation: "I'd like a single room." },
    { id: 'l13_7', polish: 'Rezerwacja', english: 'Reservation', phonetic: 'reh-zer-VAHTS-yah', category: 'travel', lesson: 13, gender: 'feminine', exampleSentence: 'Mam rezerwację na nazwisko Kowalski.', exampleTranslation: 'I have a reservation under the name Kowalski.' },
    { id: 'l13_8', polish: 'Zarezerwować', english: 'To book / reserve', phonetic: 'zah-reh-zer-VOH-vach', category: 'travel', lesson: 13, exampleSentence: 'Chcę zarezerwować stolik.', exampleTranslation: 'I want to reserve a table.' },
    { id: 'l13_9', polish: 'Plaża', english: 'Beach', phonetic: 'PLAH-zhah', category: 'travel', lesson: 13, gender: 'feminine', exampleSentence: 'Idziemy na plażę.', exampleTranslation: "We're going to the beach." },
    { id: 'l13_10', polish: 'Jezioro', english: 'Lake', phonetic: 'yeh-ZHOH-roh', category: 'travel', lesson: 13, gender: 'neuter', exampleSentence: 'Mieszkamy nad jeziorem.', exampleTranslation: 'We live by the lake.' },
    { id: 'l13_11', polish: 'Walizka', english: 'Suitcase', phonetic: 'vah-LEEZ-kah', category: 'travel', lesson: 13, gender: 'feminine', exampleSentence: 'Muszę spakować walizkę.', exampleTranslation: 'I need to pack my suitcase.' },
    { id: 'l13_12', polish: 'Paszport', english: 'Passport', phonetic: 'PAHSH-port', category: 'travel', lesson: 13, gender: 'masculine', exampleSentence: 'Nie zapomnij paszportu!', exampleTranslation: "Don't forget your passport!" },
    { id: 'l13_13', polish: 'Zwiedzać', english: 'To sightsee', phonetic: 'ZVYEH-dzach', category: 'travel', lesson: 13, exampleSentence: 'Chcę zwiedzić zamek.', exampleTranslation: 'I want to visit the castle.' },
    { id: 'l13_14', polish: 'Zamek', english: 'Castle', phonetic: 'ZAH-mek', category: 'travel', lesson: 13, gender: 'masculine', exampleSentence: 'Zamek na Wawelu jest piękny.', exampleTranslation: 'Wawel Castle is beautiful.' },
    { id: 'l13_15', polish: 'Mapa', english: 'Map', phonetic: 'MAH-pah', category: 'travel', lesson: 13, gender: 'feminine', exampleSentence: 'Czy masz mapę miasta?', exampleTranslation: 'Do you have a city map?' },
    { id: 'l13_16', polish: 'Noc', english: 'Night', phonetic: 'nohts', category: 'numbers', lesson: 13, gender: 'feminine', grammarTip: 'Genitive: nocy. Plural: noce/nocy.', exampleSentence: 'Ile kosztuje za noc?', exampleTranslation: 'How much per night?' },
    { id: 'l13_17', polish: 'Wolny', english: 'Free / Available', phonetic: 'VOHL-ni', category: 'greetings', lesson: 13, gender: 'masculine', grammarTip: 'Can mean "free" (available) or "free" (not busy)', exampleSentence: 'Czy jest wolny pokój?', exampleTranslation: 'Is there a room available?' },
    { id: 'l13_18', polish: 'Wliczony', english: 'Included', phonetic: 'vlee-CHOH-ni', category: 'greetings', lesson: 13, gender: 'masculine', exampleSentence: 'Śniadanie jest wliczone w cenę.', exampleTranslation: 'Breakfast is included in the price.' },
    { id: 'l13_19', polish: 'Cena', english: 'Price', phonetic: 'TSEH-nah', category: 'greetings', lesson: 13, gender: 'feminine', exampleSentence: 'Jaka jest cena?', exampleTranslation: 'What is the price?' },
    { id: 'l13_20', polish: 'Szczęśliwej podróży!', english: 'Have a good trip!', phonetic: 'shchen-SHLEE-vey poh-DROO-zhi', category: 'travel', lesson: 13, exampleSentence: 'Jadę do Krakowa. — Szczęśliwej podróży!', exampleTranslation: "I'm going to Kraków. — Have a good trip!" },
  ],
};

export default lesson13;
