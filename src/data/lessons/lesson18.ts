import { Lesson } from '../courseTypes';

const lesson18: Lesson = {
  id: 18,
  title: 'Czy lubisz uczyć się języka polskiego?',
  titleEnglish: 'Do you like learning Polish?',
  description: 'Talk about education, express opinions, and discuss learning strategies.',
  emoji: '📚',
  grammarTopics: ['expressing opinions', 'że/żeby clauses', 'education vocabulary'],
  grammarSummary: `## Opinions & Education

### Expressing Opinions
- **Myślę, że...** — I think that...
- **Uważam, że...** — I believe/consider that...
- **Moim zdaniem...** — In my opinion...
- **Według mnie...** — According to me...
- **Zgadzam się.** — I agree.
- **Nie zgadzam się.** — I disagree.

### "Że" vs "Żeby"
- **że** — that (stating facts): Myślę, **że** polski jest trudny.
- **żeby** — in order to / that (purpose/wish): Uczę się, **żeby** mówić po polsku.

### Education Vocabulary
| Polish | English |
|--------|---------|
| szkoła podstawowa | primary school |
| liceum | high school |
| uniwersytet | university |
| lekcja | lesson |
| egzamin | exam |
| stopień / ocena | grade |
| uczeń / uczennica | pupil (m/f) |
| nauczyciel / nauczycielka | teacher (m/f) |

### Learning Polish Tips
- **Powtarzam słówka.** — I repeat vocabulary.
- **Czytam po polsku.** — I read in Polish.
- **Rozmawiam z Polakami.** — I talk with Poles.
- **Oglądam polskie filmy.** — I watch Polish films.`,

  culturalNote: `🇵🇱 **Education in Poland**

Polish education is highly valued. The system includes: szkoła podstawowa (8 years), liceum/technikum (4 years), and studia (university). Polish universities like Jagiellonian (est. 1364!) and Warsaw University are prestigious. Learning foreign languages is popular — most young Poles speak English, and many learn German, Spanish, or French.`,

  dialogues: [
    {
      title: 'Discussing language learning',
      lines: [
        { speaker: 'A', polish: 'Czy lubisz uczyć się polskiego?', english: 'Do you like learning Polish?' },
        { speaker: 'B', polish: 'Tak, ale myślę, że gramatyka jest trudna.', english: 'Yes, but I think the grammar is difficult.' },
        { speaker: 'A', polish: 'Zgadzam się! Przypadki są najtrudniejsze.', english: 'I agree! Cases are the hardest.' },
        { speaker: 'B', polish: 'Ale lubię rozmawiać po polsku. To najlepsza metoda.', english: 'But I like talking in Polish. It\'s the best method.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l18_1', polish: 'Uczyć się', english: 'To learn / study', phonetic: 'OO-chich sheh', category: 'greetings', lesson: 18, grammarTip: '+ genitive: uczę się polskiego', exampleSentence: 'Uczę się polskiego od roku.', exampleTranslation: "I've been learning Polish for a year." },
    { id: 'l18_2', polish: 'Myśleć', english: 'To think', phonetic: 'MISH-lech', category: 'greetings', lesson: 18, grammarTip: 'Ja myślę, ty myślisz.', exampleSentence: 'Myślę, że masz rację.', exampleTranslation: "I think you're right." },
    { id: 'l18_3', polish: 'Zgadzać się', english: 'To agree', phonetic: 'ZGAH-dzach sheh', category: 'greetings', lesson: 18, exampleSentence: 'Zgadzam się z tobą.', exampleTranslation: 'I agree with you.' },
    { id: 'l18_4', polish: 'Trudny', english: 'Difficult / Hard', phonetic: 'TROOD-ni', category: 'greetings', lesson: 18, gender: 'masculine', grammarTip: 'Fem: trudna. Comparative: trudniejszy.', exampleSentence: 'Polski jest trudny, ale piękny.', exampleTranslation: 'Polish is difficult but beautiful.' },
    { id: 'l18_5', polish: 'Łatwy', english: 'Easy', phonetic: 'WAHT-vi', category: 'greetings', lesson: 18, gender: 'masculine', grammarTip: 'Fem: łatwa. Comparative: łatwiejszy.', exampleSentence: 'To ćwiczenie jest łatwe.', exampleTranslation: 'This exercise is easy.' },
    { id: 'l18_6', polish: 'Ciekawy', english: 'Interesting', phonetic: 'cheh-KAH-vi', category: 'greetings', lesson: 18, gender: 'masculine', grammarTip: 'Fem: ciekawa', exampleSentence: 'To jest ciekawy artykuł.', exampleTranslation: 'This is an interesting article.' },
    { id: 'l18_7', polish: 'Nudny', english: 'Boring', phonetic: 'NOOD-ni', category: 'greetings', lesson: 18, gender: 'masculine', grammarTip: 'Fem: nudna', exampleSentence: 'Ten film jest nudny.', exampleTranslation: 'This movie is boring.' },
    { id: 'l18_8', polish: 'Lekcja', english: 'Lesson', phonetic: 'LEKTS-yah', category: 'greetings', lesson: 18, gender: 'feminine', exampleSentence: 'Mam lekcję polskiego o trzeciej.', exampleTranslation: 'I have a Polish lesson at three.' },
    { id: 'l18_9', polish: 'Słówko', english: 'Vocabulary word', phonetic: 'SWOOV-koh', category: 'greetings', lesson: 18, gender: 'neuter', grammarTip: 'Plural: słówka. Diminutive of "słowo" (word).', exampleSentence: 'Powtarzam nowe słówka.', exampleTranslation: "I'm reviewing new vocabulary." },
    { id: 'l18_10', polish: 'Gramatyka', english: 'Grammar', phonetic: 'grah-MAH-ti-kah', category: 'greetings', lesson: 18, gender: 'feminine', exampleSentence: 'Gramatyka polska jest skomplikowana.', exampleTranslation: 'Polish grammar is complicated.' },
    { id: 'l18_11', polish: 'Przypadek', english: 'Case (grammatical)', phonetic: 'PSHI-pah-dek', category: 'greetings', lesson: 18, gender: 'masculine', grammarTip: 'Plural: przypadki. Polish has 7 cases.', exampleSentence: 'W polskim jest siedem przypadków.', exampleTranslation: 'In Polish there are seven cases.' },
    { id: 'l18_12', polish: 'Wymowa', english: 'Pronunciation', phonetic: 'vi-MOH-vah', category: 'greetings', lesson: 18, gender: 'feminine', exampleSentence: 'Twoja wymowa jest bardzo dobra!', exampleTranslation: 'Your pronunciation is very good!' },
    { id: 'l18_13', polish: 'Powtarzać', english: 'To repeat / review', phonetic: 'poh-VTAH-zhach', category: 'greetings', lesson: 18, exampleSentence: 'Proszę powtórzyć.', exampleTranslation: 'Please repeat.' },
    { id: 'l18_14', polish: 'Rozmawiać', english: 'To talk / converse', phonetic: 'roz-MAH-vyach', category: 'greetings', lesson: 18, exampleSentence: 'Lubię rozmawiać po polsku.', exampleTranslation: 'I like talking in Polish.' },
    { id: 'l18_15', polish: 'Metoda', english: 'Method', phonetic: 'meh-TOH-dah', category: 'greetings', lesson: 18, gender: 'feminine', exampleSentence: 'Jaka jest najlepsza metoda nauki?', exampleTranslation: 'What is the best learning method?' },
    { id: 'l18_16', polish: 'Ćwiczenie', english: 'Exercise', phonetic: 'chvee-CHEH-nyeh', category: 'greetings', lesson: 18, gender: 'neuter', exampleSentence: 'Proszę zrobić ćwiczenie numer trzy.', exampleTranslation: 'Please do exercise number three.' },
    { id: 'l18_17', polish: 'Zdanie', english: 'Sentence', phonetic: 'ZDAH-nyeh', category: 'greetings', lesson: 18, gender: 'neuter', exampleSentence: 'Proszę przeczytać to zdanie.', exampleTranslation: 'Please read this sentence.' },
    { id: 'l18_18', polish: 'Błąd', english: 'Mistake / Error', phonetic: 'bwont', category: 'greetings', lesson: 18, gender: 'masculine', grammarTip: 'Plural: błędy', exampleSentence: 'Nie bój się robić błędów!', exampleTranslation: "Don't be afraid to make mistakes!" },
    { id: 'l18_19', polish: 'Racja', english: 'Right (being correct)', phonetic: 'RAHTS-yah', category: 'greetings', lesson: 18, gender: 'feminine', grammarTip: 'Masz rację = You are right', exampleSentence: 'Masz rację!', exampleTranslation: 'You are right!' },
    { id: 'l18_20', polish: 'Żeby', english: 'In order to / So that', phonetic: 'ZHEH-bi', category: 'greetings', lesson: 18, grammarTip: 'Conjunction introducing purpose clauses', exampleSentence: 'Uczę się, żeby mówić po polsku.', exampleTranslation: "I'm studying in order to speak Polish." },
  ],
};

export default lesson18;
