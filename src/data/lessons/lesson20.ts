import { Lesson } from '../courseTypes';

const lesson20: Lesson = {
  id: 20,
  title: 'To jest moja wizytówka',
  titleEnglish: 'This is my business card',
  description: 'Learn business Polish, formal speech, office vocabulary, and self-presentation.',
  emoji: '💼',
  grammarTopics: ['formal register', 'business vocabulary', 'self-presentation'],
  grammarSummary: `## Business Polish & Formal Speech

### Formal Address
In business settings, always use **Pan/Pani** + 3rd person verb:
- **Czy Pan rozumie?** — Do you understand? (to a man)
- **Czy Pani może...?** — Can you...? (to a woman)
- **Proszę Pana/Pani** — Excuse me, Sir/Madam

### Formal vs Informal
| Informal | Formal |
|----------|--------|
| Cześć! | Dzień dobry! |
| Jak się masz? | Jak się Pan/Pani ma? |
| Możesz...? | Czy Pan/Pani może...? |
| Daj mi... | Proszę mi dać... |
| Twój | Pana / Pani |

### Self-Presentation
- **Nazywam się...** — My name is... (formal)
- **Jestem [profession] w firmie [name].** — I am a [profession] at [company].
- **Zajmuję się [instrumental].** — I deal with / I'm in charge of...
- **Oto moja wizytówka.** — Here is my business card.

### Office Vocabulary
| Polish | English |
|--------|---------|
| spotkanie | meeting |
| prezentacja | presentation |
| e-mail / wiadomość | email / message |
| umowa | contract |
| termin | deadline |
| pensja / wynagrodzenie | salary |
| szef / szefowa | boss (m/f) |
| klient / klientka | client (m/f) |`,

  culturalNote: `🇵🇱 **Business Etiquette in Poland**

Polish business culture is relatively formal. Use Pan/Pani until invited to use first names ("mówmy sobie po imieniu"). Punctuality is expected. Business cards are exchanged at the beginning of meetings. Dress code tends to be conservative. Building personal relationships is important before doing business — expect small talk before getting down to business.`,

  dialogues: [
    {
      title: 'Business meeting introduction',
      lines: [
        { speaker: 'A', polish: 'Dzień dobry. Nazywam się Anna Kowalska. Jestem dyrektorką marketingu.', english: 'Good day. My name is Anna Kowalska. I am the marketing director.' },
        { speaker: 'B', polish: 'Miło mi. Marek Nowak, dyrektor sprzedaży. Oto moja wizytówka.', english: 'Nice to meet you. Marek Nowak, sales director. Here is my business card.' },
        { speaker: 'A', polish: 'Dziękuję. Czy możemy zacząć spotkanie?', english: 'Thank you. Can we start the meeting?' },
        { speaker: 'B', polish: 'Oczywiście. Proszę usiąść.', english: 'Of course. Please have a seat.' },
      ],
    },
    {
      title: 'Phone call',
      lines: [
        { speaker: 'A', polish: 'Dzień dobry. Czy mogę rozmawiać z Panem Nowakiem?', english: 'Good day. May I speak with Mr. Nowak?' },
        { speaker: 'B', polish: 'Niestety Pan Nowak jest na spotkaniu. Czy mogę przekazać wiadomość?', english: 'Unfortunately Mr. Nowak is in a meeting. Can I take a message?' },
        { speaker: 'A', polish: 'Proszę powiedzieć, że dzwoniła Anna Kowalska z firmy ABC.', english: 'Please tell him Anna Kowalska from company ABC called.' },
        { speaker: 'B', polish: 'Oczywiście. Do widzenia.', english: 'Of course. Goodbye.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'l20_1', polish: 'Wizytówka', english: 'Business card', phonetic: 'vee-zi-TOOV-kah', category: 'greetings', lesson: 20, gender: 'feminine', exampleSentence: 'Oto moja wizytówka.', exampleTranslation: 'Here is my business card.' },
    { id: 'l20_2', polish: 'Nazywać się', english: 'To be called / named (formal)', phonetic: 'nah-ZI-vach sheh', category: 'greetings', lesson: 20, grammarTip: 'More formal than "mam na imię"', exampleSentence: 'Nazywam się Jan Kowalski.', exampleTranslation: 'My name is Jan Kowalski.' },
    { id: 'l20_3', polish: 'Dyrektor', english: 'Director / Manager', phonetic: 'di-REK-tohr', category: 'greetings', lesson: 20, gender: 'masculine', grammarTip: 'Female: dyrektorka', exampleSentence: 'Jest dyrektorem firmy.', exampleTranslation: 'He is a company director.' },
    { id: 'l20_4', polish: 'Spotkanie', english: 'Meeting', phonetic: 'spot-KAH-nyeh', category: 'greetings', lesson: 20, gender: 'neuter', exampleSentence: 'Mam spotkanie o drugiej.', exampleTranslation: 'I have a meeting at two.' },
    { id: 'l20_5', polish: 'Prezentacja', english: 'Presentation', phonetic: 'preh-zen-TAHTS-yah', category: 'greetings', lesson: 20, gender: 'feminine', exampleSentence: 'Muszę przygotować prezentację.', exampleTranslation: 'I need to prepare a presentation.' },
    { id: 'l20_6', polish: 'Umowa', english: 'Contract / Agreement', phonetic: 'oo-MOH-vah', category: 'greetings', lesson: 20, gender: 'feminine', exampleSentence: 'Proszę podpisać umowę.', exampleTranslation: 'Please sign the contract.' },
    { id: 'l20_7', polish: 'Termin', english: 'Deadline / Date', phonetic: 'TER-meen', category: 'greetings', lesson: 20, gender: 'masculine', exampleSentence: 'Jaki jest termin?', exampleTranslation: 'What is the deadline?' },
    { id: 'l20_8', polish: 'Szef', english: 'Boss (male)', phonetic: 'shef', category: 'greetings', lesson: 20, gender: 'masculine', grammarTip: 'Female: szefowa', exampleSentence: 'Mój szef jest wymagający.', exampleTranslation: 'My boss is demanding.' },
    { id: 'l20_9', polish: 'Klient', english: 'Client / Customer', phonetic: 'KLEE-ent', category: 'greetings', lesson: 20, gender: 'masculine', grammarTip: 'Female: klientka', exampleSentence: 'Mam spotkanie z klientem.', exampleTranslation: 'I have a meeting with a client.' },
    { id: 'l20_10', polish: 'Wiadomość', english: 'Message', phonetic: 'vyah-DOH-moshch', category: 'greetings', lesson: 20, gender: 'feminine', exampleSentence: 'Czy mogę zostawić wiadomość?', exampleTranslation: 'Can I leave a message?' },
    { id: 'l20_11', polish: 'Dzwonić', english: 'To call (phone)', phonetic: 'DZVOH-neech', category: 'greetings', lesson: 20, grammarTip: 'Dzwonię do + genitive', exampleSentence: 'Dzwonię do Pana w sprawie spotkania.', exampleTranslation: "I'm calling you regarding the meeting." },
    { id: 'l20_12', polish: 'Podpisać', english: 'To sign', phonetic: 'pot-PEE-sach', category: 'greetings', lesson: 20, grammarTip: 'Perfective. Imperfective: podpisywać.', exampleSentence: 'Proszę podpisać tutaj.', exampleTranslation: 'Please sign here.' },
    { id: 'l20_13', polish: 'Wysłać', english: 'To send', phonetic: 'VIS-wahch', category: 'greetings', lesson: 20, grammarTip: 'Perfective. Imperfective: wysyłać.', exampleSentence: 'Wyślę e-mail jutro.', exampleTranslation: "I'll send an email tomorrow." },
    { id: 'l20_14', polish: 'Projekt', english: 'Project', phonetic: 'PROH-yekt', category: 'greetings', lesson: 20, gender: 'masculine', exampleSentence: 'Pracuję nad nowym projektem.', exampleTranslation: "I'm working on a new project." },
    { id: 'l20_15', polish: 'Zajmować się', english: 'To deal with / be in charge of', phonetic: 'zay-MOH-vach sheh', category: 'greetings', lesson: 20, grammarTip: '+ instrumental', exampleSentence: 'Zajmuję się marketingiem.', exampleTranslation: 'I deal with marketing.' },
    { id: 'l20_16', polish: 'Pensja', english: 'Salary', phonetic: 'PEN-syah', category: 'greetings', lesson: 20, gender: 'feminine', exampleSentence: 'Pensja jest wypłacana co miesiąc.', exampleTranslation: 'The salary is paid every month.' },
    { id: 'l20_17', polish: 'Doświadczenie', english: 'Experience', phonetic: 'doh-shvyaht-CHEH-nyeh', category: 'greetings', lesson: 20, gender: 'neuter', exampleSentence: 'Mam pięć lat doświadczenia.', exampleTranslation: 'I have five years of experience.' },
    { id: 'l20_18', polish: 'Odpowiedź', english: 'Answer / Reply', phonetic: 'oht-POH-vyedj', category: 'greetings', lesson: 20, gender: 'feminine', exampleSentence: 'Czekam na odpowiedź.', exampleTranslation: "I'm waiting for a reply." },
    { id: 'l20_19', polish: 'W sprawie', english: 'Regarding / About', phonetic: 'f SPRAH-vyeh', category: 'greetings', lesson: 20, grammarTip: '+ genitive', exampleSentence: 'Dzwonię w sprawie ogłoszenia.', exampleTranslation: "I'm calling regarding the advertisement." },
    { id: 'l20_20', polish: 'Uprzejmie', english: 'Kindly / Politely', phonetic: 'oo-PSHEY-myeh', category: 'greetings', lesson: 20, exampleSentence: 'Uprzejmie proszę o odpowiedź.', exampleTranslation: 'I kindly ask for a reply.' },
  ],
};

export default lesson20;
