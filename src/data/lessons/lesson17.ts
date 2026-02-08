import { Lesson } from '../courseTypes';

const lesson17: Lesson = {
  id: 17,
  title: 'Na boisku i na siłowni',
  titleEnglish: 'On the Field & at the Gym',
  description: 'Talk about sports, compare things, and say what you\'d do if you could.',
  emoji: '🏋️',
  grammarTopics: ['conditional mood', 'comparisons', 'sports vocabulary'],
  grammarSummary: `## Conditional Mood & Comparisons

### Conditional Mood (chciałbym...)
Formed with past tense + **by** particle:
| Person | Masculine | Feminine |
|--------|-----------|----------|
| ja | chciał**bym** | chciała**bym** |
| ty | chciał**byś** | chciała**byś** |
| on/ona | chciał**by** | chciała**by** |
| my | chcieli**byśmy** | chciały**byśmy** |
| wy | chcieli**byście** | chciały**byście** |
| oni/one | chcieli**by** | chciały**by** |

### Comparisons
**Comparative:** adjective + **-szy / -iejszy**
- szybki → szybszy (faster)
- ładny → ładniejszy (prettier)
- drogi → droższy (more expensive)

**Superlative:** **naj-** + comparative
- najszybszy (fastest), najładniejszy (prettiest)

**Irregular:**
| Adjective | Comparative | Superlative |
|-----------|------------|-------------|
| dobry (good) | lepszy | najlepszy |
| zły (bad) | gorszy | najgorszy |
| duży (big) | większy | największy |
| mały (small) | mniejszy | najmniejszy |

### Comparing with "niż" / "od"
- Piłka nożna jest popularniejsza **niż** tenis. (Football is more popular **than** tennis.)
- On jest starszy **od** mnie. (He is older **than** me.) — od + genitive`,

  culturalNote: `🇵🇱 **Sports in Poland**

Football (piłka nożna) is king — Robert Lewandowski is a national hero. Volleyball and ski jumping are also hugely popular. Poland has produced world-class athletes in track and field, swimming, and martial arts. Weekend jogging and cycling have become trendy, especially in big cities.`,

  dialogues: [
    {
      title: 'Discussing sports',
      lines: [
        { speaker: 'A', polish: 'Jaki sport lubisz?', english: 'What sport do you like?' },
        { speaker: 'B', polish: 'Lubię piłkę nożną. A ty?', english: 'I like football. And you?' },
        { speaker: 'A', polish: 'Wolę siatkówkę. Jest ciekawsza niż piłka nożna.', english: 'I prefer volleyball. It\'s more interesting than football.' },
        { speaker: 'B', polish: 'Chciałbym spróbować. Czy grasz regularnie?', english: "I'd like to try. Do you play regularly?" },
        { speaker: 'A', polish: 'Tak, gram dwa razy w tygodniu.', english: 'Yes, I play twice a week.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l17_1', polish: 'Sport', english: 'Sport', phonetic: 'sport', category: 'greetings', lesson: 17, gender: 'masculine', exampleSentence: 'Sport jest zdrowy.', exampleTranslation: 'Sport is healthy.' },
    { id: 'l17_2', polish: 'Piłka nożna', english: 'Football / Soccer', phonetic: 'PEEW-kah NOZH-nah', category: 'greetings', lesson: 17, exampleSentence: 'Gram w piłkę nożną.', exampleTranslation: 'I play football.' },
    { id: 'l17_3', polish: 'Siatkówka', english: 'Volleyball', phonetic: 'shaht-KOOV-kah', category: 'greetings', lesson: 17, gender: 'feminine', exampleSentence: 'Polska jest dobra w siatkówce.', exampleTranslation: 'Poland is good at volleyball.' },
    { id: 'l17_4', polish: 'Pływanie', english: 'Swimming', phonetic: 'pwi-VAH-nyeh', category: 'greetings', lesson: 17, gender: 'neuter', exampleSentence: 'Pływanie jest zdrowe.', exampleTranslation: 'Swimming is healthy.' },
    { id: 'l17_5', polish: 'Bieganie', english: 'Running', phonetic: 'byeh-GAH-nyeh', category: 'greetings', lesson: 17, gender: 'neuter', exampleSentence: 'Lubię bieganie w parku.', exampleTranslation: 'I like running in the park.' },
    { id: 'l17_6', polish: 'Jazda na rowerze', english: 'Cycling', phonetic: 'YAHZ-dah nah roh-VEH-zheh', category: 'greetings', lesson: 17, exampleSentence: 'Jazda na rowerze jest moim hobby.', exampleTranslation: 'Cycling is my hobby.' },
    { id: 'l17_7', polish: 'Ćwiczyć', english: 'To exercise', phonetic: 'CHVEE-chich', category: 'greetings', lesson: 17, exampleSentence: 'Ćwiczę trzy razy w tygodniu.', exampleTranslation: 'I exercise three times a week.' },
    { id: 'l17_8', polish: 'Wygrać', english: 'To win', phonetic: 'VI-grach', category: 'greetings', lesson: 17, grammarTip: 'Perfective. Imperfective: wygrywać.', exampleSentence: 'Polska wygrała mecz!', exampleTranslation: 'Poland won the match!' },
    { id: 'l17_9', polish: 'Przegrać', english: 'To lose (a game)', phonetic: 'PSHEH-grach', category: 'greetings', lesson: 17, grammarTip: 'Perfective. Imperfective: przegrywać.', exampleSentence: 'Niestety przegraliśmy.', exampleTranslation: 'Unfortunately we lost.' },
    { id: 'l17_10', polish: 'Mecz', english: 'Match / Game', phonetic: 'mech', category: 'greetings', lesson: 17, gender: 'masculine', exampleSentence: 'Dzisiaj jest ważny mecz.', exampleTranslation: "Today there's an important match." },
    { id: 'l17_11', polish: 'Lepszy', english: 'Better', phonetic: 'LEP-shi', category: 'greetings', lesson: 17, gender: 'masculine', grammarTip: 'Comparative of dobry. Fem: lepsza.', exampleSentence: 'Ten hotel jest lepszy.', exampleTranslation: 'This hotel is better.' },
    { id: 'l17_12', polish: 'Gorszy', english: 'Worse', phonetic: 'GOHR-shi', category: 'greetings', lesson: 17, gender: 'masculine', grammarTip: 'Comparative of zły. Fem: gorsza.', exampleSentence: 'Pogoda jest gorsza niż wczoraj.', exampleTranslation: 'The weather is worse than yesterday.' },
    { id: 'l17_13', polish: 'Większy', english: 'Bigger / Larger', phonetic: 'VYENK-shi', category: 'greetings', lesson: 17, gender: 'masculine', grammarTip: 'Comparative of duży', exampleSentence: 'Warszawa jest większa od Krakowa.', exampleTranslation: 'Warsaw is bigger than Kraków.' },
    { id: 'l17_14', polish: 'Mniejszy', english: 'Smaller', phonetic: 'MNYEY-shi', category: 'greetings', lesson: 17, gender: 'masculine', grammarTip: 'Comparative of mały', exampleSentence: 'Chcę mniejszy rozmiar.', exampleTranslation: 'I want a smaller size.' },
    { id: 'l17_15', polish: 'Najlepszy', english: 'Best', phonetic: 'nay-LEP-shi', category: 'greetings', lesson: 17, gender: 'masculine', exampleSentence: 'To jest najlepszy film roku.', exampleTranslation: 'This is the best movie of the year.' },
    { id: 'l17_16', polish: 'Wolę', english: 'I prefer', phonetic: 'VOH-leh', category: 'greetings', lesson: 17, grammarTip: 'From "woleć". Wolę herbatę niż kawę.', exampleSentence: 'Wolę sport niż telewizję.', exampleTranslation: 'I prefer sport to TV.' },
    { id: 'l17_17', polish: 'Niż', english: 'Than (comparison)', phonetic: 'neezh', category: 'greetings', lesson: 17, grammarTip: 'Used with comparatives: lepszy niż = better than', exampleSentence: 'Piłka nożna jest popularna niż tenis.', exampleTranslation: 'Football is more popular than tennis.' },
    { id: 'l17_18', polish: 'Silny', english: 'Strong', phonetic: 'SHEEL-ni', category: 'greetings', lesson: 17, gender: 'masculine', grammarTip: 'Fem: silna. Comparative: silniejszy.', exampleSentence: 'On jest bardzo silny.', exampleTranslation: 'He is very strong.' },
    { id: 'l17_19', polish: 'Szybki', english: 'Fast / Quick', phonetic: 'SHIB-kee', category: 'greetings', lesson: 17, gender: 'masculine', grammarTip: 'Fem: szybka. Comparative: szybszy.', exampleSentence: 'Ten samochód jest szybki.', exampleTranslation: 'This car is fast.' },
    { id: 'l17_20', polish: 'Regularnie', english: 'Regularly', phonetic: 'reh-goo-LAHR-nyeh', category: 'greetings', lesson: 17, exampleSentence: 'Ćwiczę regularnie.', exampleTranslation: 'I exercise regularly.' },
  ],
};

export default lesson17;
