import { Lesson } from '../courseTypes';

const lesson8: Lesson = {
  id: 8,
  title: 'Mam wolny czas!',
  titleEnglish: 'I Have Free Time!',
  description: 'Talk about free time activities, learn genitive singular, and make plans.',
  emoji: '🎉',
  grammarTopics: ['genitive singular', 'nie ma + genitive', 'making plans'],
  grammarSummary: `## Genitive Case & Free Time

### Genitive Singular
Used for: negation, possession, "nie ma" (there is no), after certain prepositions (do, z, od, bez, dla).

| Gender | Nominative → Genitive | Example |
|--------|----------------------|---------|
| Masculine | → -a / -u | dom → dom**u**, kot → kot**a** |
| Feminine | -a → -y / -i | kawa → kaw**y**, lekcja → lekcj**i** |
| Neuter | -o → -a, -e → -a | piwo → piw**a**, morze → morz**a** |

### "Nie ma" (There is no...)
- Nie ma kawy. (There is no coffee.)
- Nie ma autobusu. (There is no bus.)
- Nie ma problemu! (No problem!)

### Making Plans
- **Idziemy do...** — Let's go to... (+ genitive)
- **Co robimy w weekend?** — What are we doing this weekend?
- **Mam ochotę na...** — I feel like... (+ accusative)`,

  culturalNote: `🇵🇱 **Free Time in Poland**

Poles enjoy spending weekends at their działka (allotment garden) — small plots outside the city with a tiny house, garden, and grill. Going to the mountains (especially the Tatras) for hiking is a national obsession. PKP (Polish State Railways) connects most cities affordably.`,

  dialogues: [
    {
      title: 'Planning a weekend',
      lines: [
        { speaker: 'A', polish: 'Co robimy w sobotę?', english: 'What are we doing on Saturday?' },
        { speaker: 'B', polish: 'Mam ochotę na kino. Jest nowy film.', english: 'I feel like going to the cinema. There is a new movie.' },
        { speaker: 'A', polish: 'Dobry pomysł! O której?', english: 'Good idea! At what time?' },
        { speaker: 'B', polish: 'O siódmej wieczorem. Potem idziemy do restauracji.', english: 'At seven in the evening. Then we go to a restaurant.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l8_1', polish: 'Wolny czas', english: 'Free time', phonetic: 'VOHL-ni chahs', category: 'greetings', lesson: 8, exampleSentence: 'Co robisz w wolnym czasie?', exampleTranslation: 'What do you do in your free time?' },
    { id: 'l8_2', polish: 'Pomysł', english: 'Idea', phonetic: 'POH-misw', category: 'greetings', lesson: 8, gender: 'masculine', exampleSentence: 'Dobry pomysł!', exampleTranslation: 'Good idea!' },
    { id: 'l8_3', polish: 'Teatr', english: 'Theatre', phonetic: 'TEH-ahtr', category: 'greetings', lesson: 8, gender: 'masculine', exampleSentence: 'Idziemy do teatru.', exampleTranslation: "We're going to the theatre." },
    { id: 'l8_4', polish: 'Koncert', english: 'Concert', phonetic: 'KON-tsert', category: 'greetings', lesson: 8, gender: 'masculine', exampleSentence: 'W sobotę jest koncert.', exampleTranslation: "There's a concert on Saturday." },
    { id: 'l8_5', polish: 'Muzeum', english: 'Museum', phonetic: 'moo-ZEH-oom', category: 'greetings', lesson: 8, gender: 'neuter', exampleSentence: 'Chcę iść do muzeum.', exampleTranslation: 'I want to go to the museum.' },
    { id: 'l8_6', polish: 'Park', english: 'Park', phonetic: 'pahrk', category: 'greetings', lesson: 8, gender: 'masculine', exampleSentence: 'Idziemy do parku na spacer.', exampleTranslation: "We're going to the park for a walk." },
    { id: 'l8_7', polish: 'Basen', english: 'Swimming pool', phonetic: 'BAH-sen', category: 'greetings', lesson: 8, gender: 'masculine', exampleSentence: 'Idę na basen.', exampleTranslation: "I'm going to the pool." },
    { id: 'l8_8', polish: 'Spotkanie', english: 'Meeting / Date', phonetic: 'spot-KAH-nyeh', category: 'greetings', lesson: 8, gender: 'neuter', exampleSentence: 'Mam spotkanie o trzeciej.', exampleTranslation: 'I have a meeting at three.' },
    { id: 'l8_9', polish: 'Odpoczywać', english: 'To rest / relax', phonetic: 'oht-poh-CHI-vach', category: 'greetings', lesson: 8, exampleSentence: 'W niedzielę odpoczywam.', exampleTranslation: 'On Sunday I rest.' },
    { id: 'l8_10', polish: 'Zwiedzać', english: 'To sightsee / visit', phonetic: 'ZVYEH-dzach', category: 'travel', lesson: 8, exampleSentence: 'Zwiedzamy Kraków.', exampleTranslation: "We're sightseeing in Kraków." },
    { id: 'l8_11', polish: 'Pociąg', english: 'Train', phonetic: 'POH-chownk', category: 'travel', lesson: 8, gender: 'masculine', exampleSentence: 'Pociąg odjeżdża o dziesiątej.', exampleTranslation: 'The train departs at ten.' },
    { id: 'l8_12', polish: 'Bilet', english: 'Ticket', phonetic: 'BEE-let', category: 'travel', lesson: 8, gender: 'masculine', exampleSentence: 'Poproszę bilet do Krakowa.', exampleTranslation: "I'd like a ticket to Kraków." },
    { id: 'l8_13', polish: 'Mam ochotę na', english: 'I feel like (having)', phonetic: 'mahm oh-HOH-teh nah', category: 'greetings', lesson: 8, grammarTip: '+ accusative', exampleSentence: 'Mam ochotę na lody.', exampleTranslation: 'I feel like having ice cream.' },
    { id: 'l8_14', polish: 'Razem', english: 'Together', phonetic: 'RAH-zem', category: 'greetings', lesson: 8, exampleSentence: 'Idziemy razem.', exampleTranslation: "We're going together." },
    { id: 'l8_15', polish: 'Zapraszać', english: 'To invite', phonetic: 'zah-PRAH-shach', category: 'greetings', lesson: 8, exampleSentence: 'Zapraszam cię na kawę.', exampleTranslation: "I'm inviting you for coffee." },
    { id: 'l8_16', polish: 'Problem', english: 'Problem', phonetic: 'PROH-blem', category: 'greetings', lesson: 8, gender: 'masculine', grammarTip: 'Nie ma problemu! (No problem! — genitive)', exampleSentence: 'Nie ma problemu!', exampleTranslation: 'No problem!' },
    { id: 'l8_17', polish: 'Nie ma', english: 'There is no / not available', phonetic: 'nyeh mah', category: 'greetings', lesson: 8, grammarTip: '+ genitive case', exampleSentence: 'Nie ma mleka.', exampleTranslation: 'There is no milk.' },
    { id: 'l8_18', polish: 'Dla', english: 'For', phonetic: 'dlah', category: 'greetings', lesson: 8, grammarTip: '+ genitive: dla mnie (for me), dla ciebie (for you)', exampleSentence: 'To jest dla ciebie.', exampleTranslation: 'This is for you.' },
    { id: 'l8_19', polish: 'Bez', english: 'Without', phonetic: 'behs', category: 'greetings', lesson: 8, grammarTip: '+ genitive: bez cukru (without sugar)', exampleSentence: 'Kawa bez cukru, proszę.', exampleTranslation: 'Coffee without sugar, please.' },
    { id: 'l8_20', polish: 'Oczywiście', english: 'Of course', phonetic: 'oh-chi-VEESH-cheh', category: 'greetings', lesson: 8, exampleSentence: 'Oczywiście, że tak!', exampleTranslation: 'Of course, yes!' },
  ],
};

export default lesson8;
