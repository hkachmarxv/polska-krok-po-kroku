import { Lesson } from '../courseTypes';

const lesson9: Lesson = {
  id: 9,
  title: 'Na zakupach',
  titleEnglish: 'Shopping',
  description: 'Go shopping, learn colors and clothes, genitive plural, and dative pronouns.',
  emoji: '🛍️',
  grammarTopics: ['genitive plural', 'dative pronouns', 'colors', 'clothing'],
  grammarSummary: `## Shopping, Colors & Genitive Plural

### Genitive Plural
Used for quantities (5+), "ile?" (how many?), and "nie ma" with plurals:
| Gender | Ending | Example |
|--------|--------|---------|
| Masculine | -ów / -y / -i | studentów, kolegów |
| Feminine | -∅ / -y / -i | kobiet, dziewczyn |
| Neuter | -∅ | okien, mieszkań |

### Colors (Adjectives — must agree with gender!)
| Color | Masc. | Fem. | Neuter |
|-------|-------|------|--------|
| white | biały | biała | białe |
| black | czarny | czarna | czarne |
| red | czerwony | czerwona | czerwone |
| blue | niebieski | niebieska | niebieskie |
| green | zielony | zielona | zielone |
| yellow | żółty | żółta | żółte |

### Dative Pronouns
| Nominative | Dative | Example |
|-----------|--------|---------|
| ja | mi (mnie) | Podoba **mi** się. |
| ty | ci (tobie) | Dam **ci** to. |
| on | mu (jemu) | Daj **mu** książkę. |
| ona | jej | Kup **jej** kwiaty. |

### Shopping Phrases
- **Ile to kosztuje?** — How much does this cost?
- **Czy mogę przymierzyć?** — Can I try it on?
- **Za duże / Za małe** — Too big / Too small`,

  culturalNote: `🇵🇱 **Shopping in Poland**

Poland has both large shopping malls (galerie handlowe) and traditional markets (targowiska). Bargaining is acceptable at markets but not in stores. Polish currency is the złoty (PLN). Most places accept card payments, but small markets may be cash-only. Sunday trading restrictions mean most stores are closed on Sundays.`,

  dialogues: [
    {
      title: 'At a clothing store',
      lines: [
        { speaker: 'Klient', polish: 'Dzień dobry. Szukam koszuli.', english: "Good day. I'm looking for a shirt." },
        { speaker: 'Sprzedawca', polish: 'Jaki kolor? Mamy białe, niebieskie i czarne.', english: 'What color? We have white, blue, and black.' },
        { speaker: 'Klient', polish: 'Poproszę niebieską w rozmiarze M.', english: "I'd like a blue one in size M." },
        { speaker: 'Sprzedawca', polish: 'Proszę. Przymierzalnia jest tam.', english: 'Here you go. The fitting room is there.' },
        { speaker: 'Klient', polish: 'Ile to kosztuje?', english: 'How much does it cost?' },
        { speaker: 'Sprzedawca', polish: 'Sto dwadzieścia złotych.', english: 'One hundred twenty zlotys.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l9_1', polish: 'Sklep', english: 'Shop / Store', phonetic: 'sklep', category: 'travel', lesson: 9, gender: 'masculine', exampleSentence: 'Idę do sklepu.', exampleTranslation: "I'm going to the store." },
    { id: 'l9_2', polish: 'Kupować', english: 'To buy', phonetic: 'koo-POH-vach', category: 'greetings', lesson: 9, grammarTip: 'Ja kupuję, ty kupujesz', exampleSentence: 'Kupuję nowe buty.', exampleTranslation: "I'm buying new shoes." },
    { id: 'l9_3', polish: 'Szukać', english: 'To look for / search', phonetic: 'SHOO-kahch', category: 'greetings', lesson: 9, grammarTip: '+ genitive: szukam koszuli', exampleSentence: 'Szukam prezentu.', exampleTranslation: "I'm looking for a gift." },
    { id: 'l9_4', polish: 'Koszula', english: 'Shirt', phonetic: 'koh-SHOO-lah', category: 'greetings', lesson: 9, gender: 'feminine', exampleSentence: 'Ta koszula jest ładna.', exampleTranslation: 'This shirt is pretty.' },
    { id: 'l9_5', polish: 'Spodnie', english: 'Trousers / Pants', phonetic: 'SPOHD-nyeh', category: 'greetings', lesson: 9, grammarTip: 'Always plural in Polish', exampleSentence: 'Poproszę te spodnie.', exampleTranslation: "I'd like those trousers." },
    { id: 'l9_6', polish: 'Buty', english: 'Shoes', phonetic: 'BOO-ti', category: 'greetings', lesson: 9, grammarTip: 'Plural. Singular: but (rarely used alone)', exampleSentence: 'Te buty są za małe.', exampleTranslation: 'These shoes are too small.' },
    { id: 'l9_7', polish: 'Sukienka', english: 'Dress', phonetic: 'soo-KYEN-kah', category: 'greetings', lesson: 9, gender: 'feminine', exampleSentence: 'Chcę kupić czerwoną sukienkę.', exampleTranslation: 'I want to buy a red dress.' },
    { id: 'l9_8', polish: 'Kurtka', english: 'Jacket', phonetic: 'KOORT-kah', category: 'greetings', lesson: 9, gender: 'feminine', exampleSentence: 'Potrzebuję ciepłej kurtki.', exampleTranslation: 'I need a warm jacket.' },
    { id: 'l9_9', polish: 'Biały', english: 'White', phonetic: 'BYAH-wi', category: 'greetings', lesson: 9, gender: 'masculine', grammarTip: 'Fem: biała, neuter: białe', exampleSentence: 'Mam białą koszulę.', exampleTranslation: 'I have a white shirt.' },
    { id: 'l9_10', polish: 'Czarny', english: 'Black', phonetic: 'CHAHR-ni', category: 'greetings', lesson: 9, gender: 'masculine', grammarTip: 'Fem: czarna, neuter: czarne', exampleSentence: 'Lubię czarne buty.', exampleTranslation: 'I like black shoes.' },
    { id: 'l9_11', polish: 'Czerwony', english: 'Red', phonetic: 'cher-VOH-ni', category: 'greetings', lesson: 9, gender: 'masculine', grammarTip: 'Fem: czerwona', exampleSentence: 'Ta czerwona sukienka jest piękna.', exampleTranslation: 'That red dress is beautiful.' },
    { id: 'l9_12', polish: 'Niebieski', english: 'Blue', phonetic: 'nyeh-BYES-kee', category: 'greetings', lesson: 9, gender: 'masculine', grammarTip: 'Fem: niebieska', exampleSentence: 'Niebo jest niebieskie.', exampleTranslation: 'The sky is blue.' },
    { id: 'l9_13', polish: 'Zielony', english: 'Green', phonetic: 'zheh-LOH-ni', category: 'greetings', lesson: 9, gender: 'masculine', grammarTip: 'Fem: zielona', exampleSentence: 'Lubię zieloną herbatę.', exampleTranslation: 'I like green tea.' },
    { id: 'l9_14', polish: 'Złoty', english: 'Zloty (Polish currency) / Golden', phonetic: 'ZWOH-ti', category: 'greetings', lesson: 9, gender: 'masculine', grammarTip: 'Currency: 1 złoty, 2-4 złote, 5+ złotych', exampleSentence: 'To kosztuje pięć złotych.', exampleTranslation: 'This costs five zlotys.' },
    { id: 'l9_15', polish: 'Drogi', english: 'Expensive / Dear', phonetic: 'DROH-gee', category: 'greetings', lesson: 9, gender: 'masculine', grammarTip: 'Fem: droga. Also means "dear" (dear friend).', exampleSentence: 'To jest za drogie.', exampleTranslation: 'This is too expensive.' },
    { id: 'l9_16', polish: 'Tani', english: 'Cheap / Inexpensive', phonetic: 'TAH-nee', category: 'greetings', lesson: 9, gender: 'masculine', grammarTip: 'Fem: tania', exampleSentence: 'Ten sklep jest tani.', exampleTranslation: 'This store is cheap.' },
    { id: 'l9_17', polish: 'Rozmiar', english: 'Size', phonetic: 'ROHZ-myahr', category: 'greetings', lesson: 9, gender: 'masculine', exampleSentence: 'Jaki rozmiar?', exampleTranslation: 'What size?' },
    { id: 'l9_18', polish: 'Za duży', english: 'Too big', phonetic: 'zah DOO-zhi', category: 'greetings', lesson: 9, grammarTip: '"Za" + adjective = too...', exampleSentence: 'Ta kurtka jest za duża.', exampleTranslation: 'This jacket is too big.' },
    { id: 'l9_19', polish: 'Prezent', english: 'Gift / Present', phonetic: 'PREH-zent', category: 'greetings', lesson: 9, gender: 'masculine', exampleSentence: 'To jest prezent dla ciebie.', exampleTranslation: 'This is a gift for you.' },
    { id: 'l9_20', polish: 'Podobać się', english: 'To be liked / to appeal to', phonetic: 'poh-DOH-bach sheh', category: 'greetings', lesson: 9, grammarTip: 'Subject is the thing liked. Podoba mi się = I like it (it appeals to me).', exampleSentence: 'Podoba mi się ta sukienka.', exampleTranslation: 'I like this dress.' },
  ],
};

export default lesson9;
