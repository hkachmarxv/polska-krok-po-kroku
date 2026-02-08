import { Lesson } from '../courseTypes';

const lesson19: Lesson = {
  id: 19,
  title: 'Wszystkiego najlepszego!',
  titleEnglish: 'All the best!',
  description: 'Learn about Polish holidays, traditions, and how to express wishes and greetings.',
  emoji: '🎄',
  grammarTopics: ['wishes and greetings', 'genitive in wishes', 'holiday vocabulary'],
  grammarSummary: `## Wishes & Celebrations

### Polish Wishes (Use Genitive!)
Most Polish wishes use the genitive case:
- **Wszystkiego najlepszego!** — All the best! (birthday/general)
- **Wesołych Świąt!** — Merry Christmas! (genitive plural)
- **Szczęśliwego Nowego Roku!** — Happy New Year!
- **Smacznego!** — Bon appétit!
- **Powodzenia!** — Good luck!
- **Zdrowia!** — (To your) Health! / Bless you!

### Birthday
- **Sto lat!** — A hundred years! (the Polish "Happy Birthday" song)
- **Ile masz lat?** — How old are you?
- **Mam ... lat.** — I am ... years old.

### Key Holiday Vocabulary
| Polish | English |
|--------|---------|
| Boże Narodzenie | Christmas |
| Wielkanoc | Easter |
| Wigilia | Christmas Eve |
| Sylwester | New Year's Eve |
| urodziny | birthday |
| imieniny | name day |
| rocznica | anniversary |

### Gift-Giving Phrases
- **To jest dla ciebie.** — This is for you.
- **Dziękuję za prezent!** — Thanks for the gift!
- **Nie trzeba było!** — You didn't have to! (polite response)`,

  culturalNote: `🇵🇱 **Polish Celebrations**

Wigilia (Christmas Eve) is the most important Polish celebration — families share opłatek (a thin wafer), eat 12 meatless dishes, and leave an extra place setting for an unexpected guest. Imieniny (name days) are celebrated as much as birthdays — every day in the Polish calendar is assigned names. On November 1st (Wszystkich Świętych), cemeteries glow with millions of candles.`,

  dialogues: [
    {
      title: 'Birthday wishes',
      lines: [
        { speaker: 'A', polish: 'Wszystkiego najlepszego z okazji urodzin!', english: 'All the best on your birthday!' },
        { speaker: 'B', polish: 'Dziękuję bardzo!', english: 'Thank you very much!' },
        { speaker: 'A', polish: 'To jest prezent dla ciebie.', english: 'This is a gift for you.' },
        { speaker: 'B', polish: 'Nie trzeba było! Ale dziękuję, jest piękny!', english: "You didn't have to! But thank you, it's beautiful!" },
      ],
    },
    {
      title: 'Christmas Eve',
      lines: [
        { speaker: 'A', polish: 'Wesołych Świąt!', english: 'Merry Christmas!' },
        { speaker: 'B', polish: 'Wesołych Świąt! Podzielmy się opłatkiem.', english: "Merry Christmas! Let's share the wafer." },
        { speaker: 'A', polish: 'Życzę ci zdrowia i szczęścia.', english: 'I wish you health and happiness.' },
        { speaker: 'B', polish: 'Dziękuję, nawzajem!', english: 'Thank you, likewise!' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l19_1', polish: 'Wszystkiego najlepszego!', english: 'All the best! (Happy birthday)', phonetic: 'fshist-KYEH-goh nay-LEP-sheh-goh', category: 'greetings', lesson: 19, grammarTip: 'Genitive. Literally "of everything, of the best"', exampleSentence: 'Wszystkiego najlepszego z okazji urodzin!', exampleTranslation: 'All the best on your birthday!' },
    { id: 'l19_2', polish: 'Wesołych Świąt!', english: 'Merry Christmas!', phonetic: 'veh-SOH-wih shvyownt', category: 'greetings', lesson: 19, grammarTip: 'Genitive plural. Literally "of merry holidays"', exampleSentence: 'Wesołych Świąt i Szczęśliwego Nowego Roku!', exampleTranslation: 'Merry Christmas and Happy New Year!' },
    { id: 'l19_3', polish: 'Urodziny', english: 'Birthday', phonetic: 'oo-roh-JEE-ni', category: 'greetings', lesson: 19, grammarTip: 'Always plural', exampleSentence: 'Kiedy masz urodziny?', exampleTranslation: 'When is your birthday?' },
    { id: 'l19_4', polish: 'Imieniny', english: 'Name day', phonetic: 'ee-myeh-NEE-ni', category: 'greetings', lesson: 19, grammarTip: 'Always plural. Each name has its day in the calendar.', exampleSentence: 'Dzisiaj są moje imieniny.', exampleTranslation: 'Today is my name day.' },
    { id: 'l19_5', polish: 'Święto', english: 'Holiday / Festival', phonetic: 'SHVYEN-toh', category: 'greetings', lesson: 19, gender: 'neuter', grammarTip: 'Plural: święta', exampleSentence: 'Jakie jest twoje ulubione święto?', exampleTranslation: 'What is your favorite holiday?' },
    { id: 'l19_6', polish: 'Boże Narodzenie', english: 'Christmas', phonetic: 'BOH-zheh nah-roh-DZEH-nyeh', category: 'greetings', lesson: 19, gender: 'neuter', exampleSentence: 'Na Boże Narodzenie jedziemy do rodziny.', exampleTranslation: "For Christmas we're going to family." },
    { id: 'l19_7', polish: 'Wielkanoc', english: 'Easter', phonetic: 'vyel-KAH-nots', category: 'greetings', lesson: 19, gender: 'feminine', exampleSentence: 'Na Wielkanoc jemy jajka.', exampleTranslation: 'For Easter we eat eggs.' },
    { id: 'l19_8', polish: 'Wigilia', english: 'Christmas Eve', phonetic: 'vee-GEEL-yah', category: 'greetings', lesson: 19, gender: 'feminine', exampleSentence: 'Na Wigilię jemy dwanaście potraw.', exampleTranslation: 'On Christmas Eve we eat twelve dishes.' },
    { id: 'l19_9', polish: 'Sto lat!', english: 'A hundred years! (birthday song)', phonetic: 'stoh laht', category: 'greetings', lesson: 19, grammarTip: 'The Polish equivalent of "Happy Birthday to you"', exampleSentence: 'Śpiewamy "Sto lat!"', exampleTranslation: 'We sing "Sto lat!"' },
    { id: 'l19_10', polish: 'Życzyć', english: 'To wish', phonetic: 'ZHI-chich', category: 'greetings', lesson: 19, grammarTip: 'Życzę ci + genitive', exampleSentence: 'Życzę ci wszystkiego najlepszego!', exampleTranslation: 'I wish you all the best!' },
    { id: 'l19_11', polish: 'Powodzenia!', english: 'Good luck!', phonetic: 'poh-voh-DZEH-nyah', category: 'greetings', lesson: 19, grammarTip: 'Genitive of "powodzenie"', exampleSentence: 'Masz egzamin? Powodzenia!', exampleTranslation: 'You have an exam? Good luck!' },
    { id: 'l19_12', polish: 'Zdrowia!', english: 'Health! / Bless you!', phonetic: 'ZDROH-vyah', category: 'greetings', lesson: 19, grammarTip: 'Said after sneezing or as a toast', exampleSentence: 'Na zdrowie!', exampleTranslation: 'Cheers! / Bless you!' },
    { id: 'l19_13', polish: 'Szczęście', english: 'Happiness / Luck', phonetic: 'SHCHEN-shcheh', category: 'greetings', lesson: 19, gender: 'neuter', exampleSentence: 'Życzę ci dużo szczęścia!', exampleTranslation: 'I wish you a lot of happiness!' },
    { id: 'l19_14', polish: 'Kwiaty', english: 'Flowers', phonetic: 'KVYAH-ti', category: 'greetings', lesson: 19, grammarTip: 'Plural of "kwiat"', exampleSentence: 'Kupiłem kwiaty dla mamy.', exampleTranslation: 'I bought flowers for mom.' },
    { id: 'l19_15', polish: 'Tort', english: 'Cake (celebration cake)', phonetic: 'tohrt', category: 'food', lesson: 19, gender: 'masculine', exampleSentence: 'Na urodziny jest tort czekoladowy.', exampleTranslation: "For the birthday there's a chocolate cake." },
    { id: 'l19_16', polish: 'Świeczka', english: 'Candle', phonetic: 'SHVYECH-kah', category: 'greetings', lesson: 19, gender: 'feminine', exampleSentence: 'Zdmuchnij świeczki na torcie!', exampleTranslation: 'Blow out the candles on the cake!' },
    { id: 'l19_17', polish: 'Nawzajem', english: 'Likewise / Same to you', phonetic: 'nahv-ZAH-yem', category: 'greetings', lesson: 19, exampleSentence: 'Wesołych Świąt! — Nawzajem!', exampleTranslation: 'Merry Christmas! — Same to you!' },
    { id: 'l19_18', polish: 'Okazja', english: 'Occasion / Opportunity', phonetic: 'oh-KAH-zyah', category: 'greetings', lesson: 19, gender: 'feminine', exampleSentence: 'Z okazji urodzin...', exampleTranslation: 'On the occasion of your birthday...' },
    { id: 'l19_19', polish: 'Śpiewać', english: 'To sing', phonetic: 'SHPYEH-vach', category: 'greetings', lesson: 19, exampleSentence: 'Śpiewamy "Sto lat" na urodzinach.', exampleTranslation: 'We sing "Sto lat" at birthdays.' },
    { id: 'l19_20', polish: 'Tradycja', english: 'Tradition', phonetic: 'trah-DI-tsyah', category: 'greetings', lesson: 19, gender: 'feminine', exampleSentence: 'To jest polska tradycja.', exampleTranslation: 'This is a Polish tradition.' },
  ],
};

export default lesson19;
