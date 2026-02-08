import { Lesson } from '../courseTypes';

const lesson5: Lesson = {
  id: 5,
  title: 'Wolny weekend',
  titleEnglish: 'A Free Weekend',
  description: 'Share what you love doing in your spare time — hobbies, passions, and interests.',
  emoji: '🎸',
  grammarTopics: ['-ować verbs', 'lubić + infinitive', 'modal verbs', 'frequency adverbs'],
  grammarSummary: `## Hobbies, Likes & Modal Verbs

### "Lubić" (To Like) + Infinitive
| Person | Form |
|--------|------|
| ja | lubię |
| ty | lubisz |
| on/ona | lubi |
| my | lubimy |
| wy | lubicie |
| oni/one | lubią |

**Pattern:** lubię + infinitive
- Lubię **czytać** książki. (I like reading books.)
- Lubię **grać** w piłkę. (I like playing football.)

### Modal Verbs
| Verb | Meaning | Ja | Ty | On/Ona |
|------|---------|----|----|--------|
| musieć | must | muszę | musisz | musi |
| móc | can | mogę | możesz | może |
| chcieć | want | chcę | chcesz | chce |
| umieć | know how | umiem | umiesz | umie |

### Frequency Adverbs
| Polish | English |
|--------|---------|
| zawsze | always |
| często | often |
| czasami / czasem | sometimes |
| rzadko | rarely |
| nigdy | never |

**Word order:** Adverb usually comes before the verb:
- **Często** czytam książki. (I often read books.)
- **Nigdy** nie oglądam telewizji. (I never watch TV.)
  - Note: nigdy requires **nie** before the verb (double negative is correct in Polish!)`,

  culturalNote: `🇵🇱 **Polish Hobbies**

Poles love spending time outdoors — hiking in the Tatras, cycling, and mushroom picking (grzybobranie) in autumn are national pastimes. Football is the most popular sport. Board games and card games are a big part of family gatherings. Many Poles are avid readers and book lovers.`,

  dialogues: [
    {
      title: 'Talking about hobbies',
      lines: [
        { speaker: 'A', polish: 'Co lubisz robić w wolnym czasie?', english: 'What do you like to do in your free time?' },
        { speaker: 'B', polish: 'Lubię czytać książki i grać w piłkę nożną.', english: 'I like reading books and playing football.' },
        { speaker: 'A', polish: 'Ja też lubię sport. Często biegam.', english: 'I also like sports. I often run.' },
        { speaker: 'B', polish: 'A czy umiesz pływać?', english: 'And can you swim?' },
        { speaker: 'A', polish: 'Tak, ale rzadko pływam.', english: 'Yes, but I rarely swim.' },
      ],
    },
    {
      title: 'Weekend plans',
      lines: [
        { speaker: 'A', polish: 'Co chcesz robić w weekend?', english: 'What do you want to do on the weekend?' },
        { speaker: 'B', polish: 'Chcę iść do kina. Lubię oglądać filmy.', english: 'I want to go to the cinema. I like watching movies.' },
        { speaker: 'A', polish: 'Mogę iść z tobą?', english: 'Can I go with you?' },
        { speaker: 'B', polish: 'Oczywiście! Muszę tylko sprawdzić godzinę.', english: 'Of course! I just need to check the time.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l5_1', polish: 'Lubić', english: 'To like', phonetic: 'LOO-beech', category: 'greetings', lesson: 5, grammarTip: 'Ja lubię, ty lubisz. + infinitive or noun in accusative.', exampleSentence: 'Lubię kawę.', exampleTranslation: 'I like coffee.' },
    { id: 'l5_2', polish: 'Czytać', english: 'To read', phonetic: 'CHI-tach', category: 'greetings', lesson: 5, exampleSentence: 'Lubię czytać książki.', exampleTranslation: 'I like reading books.' },
    { id: 'l5_3', polish: 'Książka', english: 'Book', phonetic: 'KSHOWNZH-kah', category: 'greetings', lesson: 5, gender: 'feminine', exampleSentence: 'To jest interesująca książka.', exampleTranslation: 'This is an interesting book.' },
    { id: 'l5_4', polish: 'Oglądać', english: 'To watch', phonetic: 'oh-GLOWN-dach', category: 'greetings', lesson: 5, exampleSentence: 'Oglądam telewizję wieczorem.', exampleTranslation: 'I watch TV in the evening.' },
    { id: 'l5_5', polish: 'Grać', english: 'To play (games/music)', phonetic: 'grahch', category: 'greetings', lesson: 5, grammarTip: 'Grać w + accusative (games). Grać na + locative (instruments).', exampleSentence: 'Gram w piłkę nożną.', exampleTranslation: 'I play football.' },
    { id: 'l5_6', polish: 'Biegać', english: 'To run (regularly)', phonetic: 'BYEH-gach', category: 'greetings', lesson: 5, exampleSentence: 'Biegam codziennie rano.', exampleTranslation: 'I run every morning.' },
    { id: 'l5_7', polish: 'Pływać', english: 'To swim', phonetic: 'PWI-vach', category: 'greetings', lesson: 5, exampleSentence: 'Umiem pływać.', exampleTranslation: 'I can swim.' },
    { id: 'l5_8', polish: 'Gotować', english: 'To cook', phonetic: 'goh-TOH-vach', category: 'food', lesson: 5, exampleSentence: 'Lubię gotować obiad.', exampleTranslation: 'I like cooking lunch.' },
    { id: 'l5_9', polish: 'Słuchać', english: 'To listen', phonetic: 'SWOO-hach', category: 'greetings', lesson: 5, grammarTip: 'Słuchać + genitive (słuchać muzyki)', exampleSentence: 'Słucham muzyki.', exampleTranslation: 'I listen to music.' },
    { id: 'l5_10', polish: 'Muzyka', english: 'Music', phonetic: 'MOO-zi-kah', category: 'greetings', lesson: 5, gender: 'feminine', exampleSentence: 'Lubię polską muzykę.', exampleTranslation: 'I like Polish music.' },
    { id: 'l5_11', polish: 'Kino', english: 'Cinema', phonetic: 'KEE-noh', category: 'greetings', lesson: 5, gender: 'neuter', exampleSentence: 'Idziemy do kina.', exampleTranslation: "We're going to the cinema." },
    { id: 'l5_12', polish: 'Film', english: 'Movie / Film', phonetic: 'feelm', category: 'greetings', lesson: 5, gender: 'masculine', exampleSentence: 'To jest dobry film.', exampleTranslation: 'This is a good movie.' },
    { id: 'l5_13', polish: 'Często', english: 'Often', phonetic: 'CHEN-stoh', category: 'greetings', lesson: 5, exampleSentence: 'Często chodzę na spacer.', exampleTranslation: 'I often go for a walk.' },
    { id: 'l5_14', polish: 'Czasami', english: 'Sometimes', phonetic: 'chah-SAH-mee', category: 'greetings', lesson: 5, exampleSentence: 'Czasami gram w tenisa.', exampleTranslation: 'Sometimes I play tennis.' },
    { id: 'l5_15', polish: 'Zawsze', english: 'Always', phonetic: 'ZAHV-sheh', category: 'greetings', lesson: 5, exampleSentence: 'Zawsze piję kawę rano.', exampleTranslation: 'I always drink coffee in the morning.' },
    { id: 'l5_16', polish: 'Nigdy', english: 'Never', phonetic: 'NEEG-di', category: 'greetings', lesson: 5, grammarTip: 'Requires "nie" before the verb: Nigdy nie palę.', exampleSentence: 'Nigdy nie jem mięsa.', exampleTranslation: 'I never eat meat.' },
    { id: 'l5_17', polish: 'Musieć', english: 'Must / To have to', phonetic: 'MOO-shech', category: 'greetings', lesson: 5, grammarTip: 'Ja muszę, ty musisz.', exampleSentence: 'Muszę iść do pracy.', exampleTranslation: 'I must go to work.' },
    { id: 'l5_18', polish: 'Móc', english: 'Can / To be able to', phonetic: 'moots', category: 'greetings', lesson: 5, grammarTip: 'Ja mogę, ty możesz.', exampleSentence: 'Czy mogę tu siąść?', exampleTranslation: 'Can I sit here?' },
    { id: 'l5_19', polish: 'Chcieć', english: 'To want', phonetic: 'h-chech', category: 'greetings', lesson: 5, grammarTip: 'Ja chcę, ty chcesz.', exampleSentence: 'Chcę pojechać do Polski.', exampleTranslation: 'I want to go to Poland.' },
    { id: 'l5_20', polish: 'Spacer', english: 'Walk / Stroll', phonetic: 'SPAH-tser', category: 'greetings', lesson: 5, gender: 'masculine', exampleSentence: 'Idziemy na spacer.', exampleTranslation: "Let's go for a walk." },
  ],
};

export default lesson5;
