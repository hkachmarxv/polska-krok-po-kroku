import { Lesson } from '../courseTypes';

const lesson15: Lesson = {
  id: 15,
  title: 'Wizyta u lekarza',
  titleEnglish: 'At the Doctor\'s Office',
  description: 'Describe symptoms, talk about the weather, and survive a trip to the Polish clinic.',
  emoji: '🩺',
  grammarTopics: ['impersonal constructions', 'body parts', 'boleć (to hurt)', 'weather expressions'],
  grammarSummary: `## Weather, Health & Body

### Weather Expressions (Impersonal)
Polish uses impersonal constructions for weather:
- Jest **zimno** / **ciepło** / **gorąco**. (It's cold / warm / hot.)
- **Pada** deszcz / śnieg. (It's raining / snowing.)
- **Wieje** wiatr. (The wind is blowing.)
- Jest **pochmurno** / **słonecznie**. (It's cloudy / sunny.)

### Body Parts & "Boleć" (to hurt)
"Boleć" works like "podobać się" — the body part is the subject:
- Boli **mnie** głowa. (My head hurts. — lit. "head hurts me")
- Bolą **mnie** nogi. (My legs hurt.)
- Boli **go** brzuch. (His stomach hurts.)

### Common Body Parts
głowa (head), oko/oczy (eye/eyes), ucho/uszy (ear/ears), nos (nose), usta (mouth), ząb/zęby (tooth/teeth), gardło (throat), brzuch (stomach), ręka (hand/arm), noga (leg/foot), plecy (back)

### At the Doctor
- **Co Panu/Pani dolega?** — What's troubling you? (doctor asks)
- **Boli mnie...** — ... hurts me.
- **Mam gorączkę / katar / kaszel.** — I have a fever / runny nose / cough.
- **Proszę wziąć ten lek.** — Please take this medicine.`,

  culturalNote: `🇵🇱 **Healthcare in Poland**

Poland has a public healthcare system (NFZ) and private clinics. Emergency care (SOR) is free for everyone. For minor ailments, Poles often visit the apteka (pharmacy) first — pharmacists can recommend over-the-counter medications. Home remedies are popular: hot tea with honey and lemon, rosół (chicken broth) for colds.`,

  dialogues: [
    {
      title: 'At the doctor',
      lines: [
        { speaker: 'Lekarz', polish: 'Dzień dobry. Co Panu dolega?', english: "Good day. What's troubling you?" },
        { speaker: 'Pacjent', polish: 'Boli mnie głowa i gardło. Mam też gorączkę.', english: 'My head and throat hurt. I also have a fever.' },
        { speaker: 'Lekarz', polish: 'Od kiedy?', english: 'Since when?' },
        { speaker: 'Pacjent', polish: 'Od dwóch dni.', english: 'For two days.' },
        { speaker: 'Lekarz', polish: 'Proszę wziąć ten lek trzy razy dziennie.', english: 'Please take this medicine three times a day.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l15_1', polish: 'Zimno', english: 'Cold (weather)', phonetic: 'ZHEEM-noh', category: 'greetings', lesson: 15, exampleSentence: 'Jest bardzo zimno dzisiaj.', exampleTranslation: "It's very cold today." },
    { id: 'l15_2', polish: 'Ciepło', english: 'Warm', phonetic: 'CHEP-woh', category: 'greetings', lesson: 15, exampleSentence: 'Jest ciepło i słonecznie.', exampleTranslation: "It's warm and sunny." },
    { id: 'l15_3', polish: 'Gorąco', english: 'Hot', phonetic: 'goh-ROHN-tsoh', category: 'greetings', lesson: 15, exampleSentence: 'Latem jest gorąco w Polsce.', exampleTranslation: "In summer it's hot in Poland." },
    { id: 'l15_4', polish: 'Pada deszcz', english: "It's raining", phonetic: 'PAH-dah deshch', category: 'greetings', lesson: 15, exampleSentence: 'Pada deszcz, weź parasol.', exampleTranslation: "It's raining, take an umbrella." },
    { id: 'l15_5', polish: 'Pada śnieg', english: "It's snowing", phonetic: 'PAH-dah shnyeg', category: 'greetings', lesson: 15, exampleSentence: 'Pada śnieg! Zima jest tutaj!', exampleTranslation: "It's snowing! Winter is here!" },
    { id: 'l15_6', polish: 'Głowa', english: 'Head', phonetic: 'GWOH-vah', category: 'greetings', lesson: 15, gender: 'feminine', exampleSentence: 'Boli mnie głowa.', exampleTranslation: 'My head hurts.' },
    { id: 'l15_7', polish: 'Gardło', english: 'Throat', phonetic: 'GAHR-dwoh', category: 'greetings', lesson: 15, gender: 'neuter', exampleSentence: 'Boli mnie gardło.', exampleTranslation: 'My throat hurts.' },
    { id: 'l15_8', polish: 'Brzuch', english: 'Stomach / Belly', phonetic: 'bzhookh', category: 'greetings', lesson: 15, gender: 'masculine', exampleSentence: 'Boli mnie brzuch.', exampleTranslation: 'My stomach hurts.' },
    { id: 'l15_9', polish: 'Ręka', english: 'Hand / Arm', phonetic: 'REN-kah', category: 'greetings', lesson: 15, gender: 'feminine', exampleSentence: 'Bolą mnie ręce.', exampleTranslation: 'My hands hurt.' },
    { id: 'l15_10', polish: 'Noga', english: 'Leg / Foot', phonetic: 'NOH-gah', category: 'greetings', lesson: 15, gender: 'feminine', exampleSentence: 'Bolą mnie nogi.', exampleTranslation: 'My legs hurt.' },
    { id: 'l15_11', polish: 'Boleć', english: 'To hurt / To ache', phonetic: 'BOH-lech', category: 'greetings', lesson: 15, grammarTip: 'Boli (singular), bolą (plural). + accusative pronoun (mnie, cię, go).', exampleSentence: 'Co cię boli?', exampleTranslation: 'What hurts you?' },
    { id: 'l15_12', polish: 'Gorączka', english: 'Fever', phonetic: 'goh-ROHNCH-kah', category: 'greetings', lesson: 15, gender: 'feminine', exampleSentence: 'Mam gorączkę.', exampleTranslation: 'I have a fever.' },
    { id: 'l15_13', polish: 'Katar', english: 'Runny nose / Cold', phonetic: 'KAH-tahr', category: 'greetings', lesson: 15, gender: 'masculine', exampleSentence: 'Mam katar i kaszel.', exampleTranslation: 'I have a runny nose and cough.' },
    { id: 'l15_14', polish: 'Kaszel', english: 'Cough', phonetic: 'KAH-shel', category: 'greetings', lesson: 15, gender: 'masculine', exampleSentence: 'Mam silny kaszel.', exampleTranslation: 'I have a strong cough.' },
    { id: 'l15_15', polish: 'Lek', english: 'Medicine / Drug', phonetic: 'lek', category: 'greetings', lesson: 15, gender: 'masculine', grammarTip: 'Plural: leki', exampleSentence: 'Proszę wziąć ten lek.', exampleTranslation: 'Please take this medicine.' },
    { id: 'l15_16', polish: 'Szpital', english: 'Hospital', phonetic: 'SHPEE-tahl', category: 'travel', lesson: 15, gender: 'masculine', exampleSentence: 'Muszę iść do szpitala.', exampleTranslation: 'I need to go to the hospital.' },
    { id: 'l15_17', polish: 'Chory', english: 'Sick / Ill', phonetic: 'HOH-ri', category: 'greetings', lesson: 15, gender: 'masculine', grammarTip: 'Fem: chora', exampleSentence: 'Jestem chory, nie mogę iść do pracy.', exampleTranslation: "I'm sick, I can't go to work." },
    { id: 'l15_18', polish: 'Zdrowy', english: 'Healthy', phonetic: 'ZDROH-vi', category: 'greetings', lesson: 15, gender: 'masculine', grammarTip: 'Fem: zdrowa. Zdrowia! = Bless you (after sneezing).', exampleSentence: 'Sport jest zdrowy.', exampleTranslation: 'Sport is healthy.' },
    { id: 'l15_19', polish: 'Parasol', english: 'Umbrella', phonetic: 'pah-RAH-sol', category: 'greetings', lesson: 15, gender: 'masculine', exampleSentence: 'Weź parasol, pada deszcz.', exampleTranslation: "Take an umbrella, it's raining." },
    { id: 'l15_20', polish: 'Wiosna / Lato / Jesień / Zima', english: 'Spring / Summer / Autumn / Winter', phonetic: 'VYOHS-nah / LAH-toh / YEH-shen / ZHEE-mah', category: 'greetings', lesson: 15, exampleSentence: 'Lubię wiosnę, bo jest ciepło.', exampleTranslation: "I like spring because it's warm." },
  ],
};

export default lesson15;
