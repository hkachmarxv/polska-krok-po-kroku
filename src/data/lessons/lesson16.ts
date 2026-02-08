import { Lesson } from '../courseTypes';

const lesson16: Lesson = {
  id: 16,
  title: 'Urodziłem się w Polsce',
  titleEnglish: 'I was born in Poland',
  description: 'Talk about your biography, learn perfective vs imperfective past tense.',
  emoji: '📖',
  grammarTopics: ['perfective vs imperfective aspect', 'biography', 'life events'],
  grammarSummary: `## Aspect: Perfective vs Imperfective

### The Key Difference
Polish has TWO versions of most verbs:
- **Imperfective** — ongoing, repeated, or habitual actions
- **Perfective** — completed, one-time actions with a result

### Examples
| Imperfective | Perfective | Meaning |
|-------------|-----------|---------|
| pisać | **na**pisać | to write |
| czytać | **prze**czytać | to read |
| robić | **z**robić | to do/make |
| jeść | **z**jeść | to eat |
| kupować | kupić | to buy |
| mówić | powiedzieć | to say/tell |

### In Past Tense
- Wczoraj **pisałem** list cały wieczór. (I was writing a letter all evening — process)
- Wczoraj **napisałem** list. (I wrote/finished the letter — completed)

### Common Prefixes for Perfective
| Prefix | Example |
|--------|---------|
| na- | pisać → napisać |
| prze- | czytać → przeczytać |
| z-/s- | robić → zrobić |
| po- | jechać → pojechać |
| wy- | pić → wypić |

### Life Events Vocabulary
- urodził się / urodziła się — was born (m/f)
- wychował się / wychowała się — grew up
- skończył / skończyła szkołę — finished school
- ożenił się / wyszła za mąż — got married (m/f)`,

  culturalNote: `🇵🇱 **Famous Poles**

Poland has produced many world-famous figures: Nicolaus Copernicus (Mikołaj Kopernik), Marie Curie (Maria Skłodowska-Curie), Frédéric Chopin (Fryderyk Szopen), Pope John Paul II (Jan Paweł II), and Nobel laureates like Wisława Szymborska and Olga Tokarczuk. Poles are very proud of their cultural heritage.`,

  dialogues: [
    {
      title: 'Talking about your life',
      lines: [
        { speaker: 'A', polish: 'Gdzie się urodziłeś?', english: 'Where were you born?' },
        { speaker: 'B', polish: 'Urodziłem się w Poznaniu, ale wychowałem się w Warszawie.', english: 'I was born in Poznań, but I grew up in Warsaw.' },
        { speaker: 'A', polish: 'Gdzie studiowałeś?', english: 'Where did you study?' },
        { speaker: 'B', polish: 'Studiowałem na Uniwersytecie Jagiellońskim w Krakowie.', english: 'I studied at Jagiellonian University in Kraków.' },
        { speaker: 'A', polish: 'A kiedy się ożeniłeś?', english: 'And when did you get married?' },
        { speaker: 'B', polish: 'Ożeniłem się pięć lat temu.', english: 'I got married five years ago.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l16_1', polish: 'Urodzić się', english: 'To be born', phonetic: 'oo-ROH-jeech sheh', category: 'greetings', lesson: 16, grammarTip: 'Urodziłem się (m), urodziłam się (f). Perfective.', exampleSentence: 'Urodziłem się w 1990 roku.', exampleTranslation: 'I was born in 1990.' },
    { id: 'l16_2', polish: 'Wychować się', english: 'To grow up', phonetic: 'vi-HOH-vach sheh', category: 'greetings', lesson: 16, exampleSentence: 'Wychowałam się na wsi.', exampleTranslation: 'I grew up in the countryside.' },
    { id: 'l16_3', polish: 'Skończyć', english: 'To finish / graduate', phonetic: 'SKON-chich', category: 'greetings', lesson: 16, grammarTip: 'Perfective of kończyć', exampleSentence: 'Skończyłem studia w 2015.', exampleTranslation: 'I graduated in 2015.' },
    { id: 'l16_4', polish: 'Ożenić się', english: 'To get married (male)', phonetic: 'oh-ZHEH-neech sheh', category: 'family', lesson: 16, grammarTip: 'For women: wyjść za mąż', exampleSentence: 'Ożenił się z Anną.', exampleTranslation: 'He married Anna.' },
    { id: 'l16_5', polish: 'Wyjść za mąż', english: 'To get married (female)', phonetic: 'viyshch zah monzh', category: 'family', lesson: 16, exampleSentence: 'Wyszła za mąż w czerwcu.', exampleTranslation: 'She got married in June.' },
    { id: 'l16_6', polish: 'Przeprowadzić się', english: 'To move (relocate)', phonetic: 'psheh-proh-VAH-jeech sheh', category: 'greetings', lesson: 16, exampleSentence: 'Przeprowadziliśmy się do Krakowa.', exampleTranslation: 'We moved to Kraków.' },
    { id: 'l16_7', polish: 'Napisać', english: 'To write (perfective)', phonetic: 'nah-PEE-sach', category: 'greetings', lesson: 16, grammarTip: 'Imperfective: pisać', exampleSentence: 'Napisałem e-mail do szefa.', exampleTranslation: 'I wrote an email to the boss.' },
    { id: 'l16_8', polish: 'Przeczytać', english: 'To read (perfective)', phonetic: 'psheh-CHI-tach', category: 'greetings', lesson: 16, grammarTip: 'Imperfective: czytać', exampleSentence: 'Przeczytałam tę książkę.', exampleTranslation: 'I read (finished) this book.' },
    { id: 'l16_9', polish: 'Kupić', english: 'To buy (perfective)', phonetic: 'KOO-peech', category: 'greetings', lesson: 16, grammarTip: 'Imperfective: kupować', exampleSentence: 'Kupiłem nowy samochód.', exampleTranslation: 'I bought a new car.' },
    { id: 'l16_10', polish: 'Powiedzieć', english: 'To say/tell (perfective)', phonetic: 'poh-VYEH-jech', category: 'greetings', lesson: 16, grammarTip: 'Imperfective: mówić', exampleSentence: 'Powiedział mi prawdę.', exampleTranslation: 'He told me the truth.' },
    { id: 'l16_11', polish: 'Temu', english: 'Ago', phonetic: 'TEH-moo', category: 'numbers', lesson: 16, grammarTip: 'Placed after the time expression: dwa lata temu = two years ago', exampleSentence: 'Trzy lata temu byłem w Polsce.', exampleTranslation: 'Three years ago I was in Poland.' },
    { id: 'l16_12', polish: 'Dzieciństwo', english: 'Childhood', phonetic: 'jeh-CHEENS-tvoh', category: 'family', lesson: 16, gender: 'neuter', exampleSentence: 'Miałem szczęśliwe dzieciństwo.', exampleTranslation: 'I had a happy childhood.' },
    { id: 'l16_13', polish: 'Studia', english: 'University studies', phonetic: 'STOO-dyah', category: 'greetings', lesson: 16, grammarTip: 'Always plural. Na studiach = at university.', exampleSentence: 'Na studiach poznałem żonę.', exampleTranslation: 'At university I met my wife.' },
    { id: 'l16_14', polish: 'Praca', english: 'Work / Job', phonetic: 'PRAH-tsah', category: 'greetings', lesson: 16, gender: 'feminine', exampleSentence: 'Znalazłem dobrą pracę.', exampleTranslation: 'I found a good job.' },
    { id: 'l16_15', polish: 'Znajomy', english: 'Acquaintance', phonetic: 'znah-YOH-mi', category: 'family', lesson: 16, gender: 'masculine', grammarTip: 'Female: znajoma', exampleSentence: 'Mam wielu znajomych w Warszawie.', exampleTranslation: 'I have many acquaintances in Warsaw.' },
    { id: 'l16_16', polish: 'Wieś', english: 'Village / Countryside', phonetic: 'vyesh', category: 'travel', lesson: 16, gender: 'feminine', exampleSentence: 'Moi dziadkowie mieszkają na wsi.', exampleTranslation: 'My grandparents live in the countryside.' },
    { id: 'l16_17', polish: 'Miasto', english: 'City / Town', phonetic: 'MYAHS-toh', category: 'travel', lesson: 16, gender: 'neuter', exampleSentence: 'Kraków jest pięknym miastem.', exampleTranslation: 'Kraków is a beautiful city.' },
    { id: 'l16_18', polish: 'Kraj', english: 'Country', phonetic: 'kray', category: 'travel', lesson: 16, gender: 'masculine', exampleSentence: 'Polska jest moim krajem.', exampleTranslation: 'Poland is my country.' },
    { id: 'l16_19', polish: 'Życie', english: 'Life', phonetic: 'ZHI-cheh', category: 'greetings', lesson: 16, gender: 'neuter', exampleSentence: 'Życie jest piękne.', exampleTranslation: 'Life is beautiful.' },
    { id: 'l16_20', polish: 'Szczęśliwy', english: 'Happy', phonetic: 'shchen-SHLEE-vi', category: 'greetings', lesson: 16, gender: 'masculine', grammarTip: 'Fem: szczęśliwa', exampleSentence: 'Jestem bardzo szczęśliwy.', exampleTranslation: 'I am very happy.' },
  ],
};

export default lesson16;
