import { Lesson } from '../courseTypes';

const lesson3: Lesson = {
  id: 3,
  title: 'Kim Pan/Pani jest?',
  titleEnglish: 'What do you do?',
  description: 'Talk about nationalities, professions, and learn basic verb conjugation.',
  emoji: '💼',
  grammarTopics: ['verb conjugation -m/-sz', 'nationalities', 'instrumental case with "być"'],
  grammarSummary: `## Verb Conjugation & Professions

### Present Tense Conjugation (-m / -sz pattern)
Most Polish verbs follow this pattern:

| Person | Ending | Example: pracować (to work) |
|--------|--------|---------------------------|
| ja | -m | pracuj**ę** |
| ty | -sz | pracuj**esz** |
| on/ona | - | pracuj**e** |
| my | -my | pracuj**emy** |
| wy | -cie | pracuj**ecie** |
| oni/one | -ją | pracuj**ą** |

### "Być" (To Be) — Instrumental Case
When saying your profession, use **być** + instrumental case:
- Jestem lekarz**em**. (I am a doctor, masc.)
- Jestem lekark**ą**. (I am a doctor, fem.)
- On jest nauczyciel**em**. (He is a teacher.)

### Nationalities
| Male | Female | Country |
|------|--------|---------|
| Polak | Polka | Polska |
| Anglik | Angielka | Anglia |
| Niemiec | Niemka | Niemcy |
| Francuz | Francuzka | Francja |
| Amerykanin | Amerykanka | Ameryka |

### Key Pattern
Nationalities use **nominative** (To jest Polak), but with "być" use **instrumental** (Jestem Polak**iem**).`,

  culturalNote: `🇵🇱 **Work Culture in Poland**

Poles value education highly. University degrees (magister, inżynier) are often used as titles. It's common to hear "Panie magistrze" or "Panie doktorze" in professional settings. Work-life balance is important, and Poles enjoy long lunch breaks.`,

  dialogues: [
    {
      title: 'Job interview small talk',
      lines: [
        { speaker: 'A', polish: 'Kim Pan jest z zawodu?', english: 'What is your profession?' },
        { speaker: 'B', polish: 'Jestem inżynierem. Pracuję w firmie IT.', english: 'I am an engineer. I work at an IT company.' },
        { speaker: 'A', polish: 'A skąd Pan jest?', english: 'And where are you from?' },
        { speaker: 'B', polish: 'Jestem Polakiem, z Gdańska.', english: "I'm Polish, from Gdańsk." },
      ],
    },
    {
      title: 'Meeting classmates',
      lines: [
        { speaker: 'A', polish: 'Cześć! Skąd jesteś?', english: 'Hi! Where are you from?' },
        { speaker: 'B', polish: 'Jestem z Anglii. Jestem Anglikiem.', english: "I'm from England. I'm English." },
        { speaker: 'A', polish: 'Co robisz?', english: 'What do you do?' },
        { speaker: 'B', polish: 'Jestem studentem. Studiuję język polski.', english: "I'm a student. I study Polish." },
      ],
    },
  ],

  vocabulary: [
    { id: 'l3_1', polish: 'Pracować', english: 'To work', phonetic: 'prah-TSOH-vach', category: 'greetings', lesson: 3, grammarTip: '-ować verb. Ja pracuję, ty pracujesz.', exampleSentence: 'Pracuję w biurze.', exampleTranslation: 'I work in an office.' },
    { id: 'l3_2', polish: 'Mieszkać', english: 'To live (reside)', phonetic: 'MYESH-kahch', category: 'greetings', lesson: 3, grammarTip: 'Ja mieszkam, ty mieszkasz.', exampleSentence: 'Mieszkam w Krakowie.', exampleTranslation: 'I live in Kraków.' },
    { id: 'l3_3', polish: 'Mówić', english: 'To speak', phonetic: 'MOO-veech', category: 'greetings', lesson: 3, grammarTip: 'Ja mówię, ty mówisz.', exampleSentence: 'Mówię po polsku.', exampleTranslation: 'I speak Polish.' },
    { id: 'l3_4', polish: 'Lekarz', english: 'Doctor (male)', phonetic: 'LEH-kahsh', category: 'greetings', lesson: 3, gender: 'masculine', grammarTip: 'Female: lekarka. Instrumental: lekarzem.', exampleSentence: 'On jest lekarzem.', exampleTranslation: 'He is a doctor.' },
    { id: 'l3_5', polish: 'Inżynier', english: 'Engineer', phonetic: 'in-zhi-NYER', category: 'greetings', lesson: 3, gender: 'masculine', exampleSentence: 'Jestem inżynierem.', exampleTranslation: 'I am an engineer.' },
    { id: 'l3_6', polish: 'Prawnik', english: 'Lawyer', phonetic: 'PRAHV-neek', category: 'greetings', lesson: 3, gender: 'masculine', grammarTip: 'Female: prawniczka', exampleSentence: 'Moja mama jest prawniczką.', exampleTranslation: 'My mom is a lawyer.' },
    { id: 'l3_7', polish: 'Kelner', english: 'Waiter', phonetic: 'KEL-nehr', category: 'greetings', lesson: 3, gender: 'masculine', grammarTip: 'Female: kelnerka', exampleSentence: 'Kelner! Poproszę rachunek.', exampleTranslation: 'Waiter! The bill, please.' },
    { id: 'l3_8', polish: 'Polak', english: 'Pole (male)', phonetic: 'POH-lahk', category: 'greetings', lesson: 3, gender: 'masculine', grammarTip: 'Female: Polka', exampleSentence: 'Jestem Polakiem.', exampleTranslation: 'I am a Pole.' },
    { id: 'l3_9', polish: 'Anglik', english: 'Englishman', phonetic: 'AHN-gleek', category: 'greetings', lesson: 3, gender: 'masculine', grammarTip: 'Female: Angielka', exampleSentence: 'On jest Anglikiem.', exampleTranslation: 'He is English.' },
    { id: 'l3_10', polish: 'Niemiec', english: 'German (male)', phonetic: 'NYEH-myets', category: 'greetings', lesson: 3, gender: 'masculine', grammarTip: 'Female: Niemka', exampleSentence: 'Mój kolega jest Niemcem.', exampleTranslation: 'My colleague is German.' },
    { id: 'l3_11', polish: 'Studiować', english: 'To study (at university)', phonetic: 'stoo-DYOH-vach', category: 'greetings', lesson: 3, grammarTip: 'Ja studiuję, ty studiujesz. Different from "uczyć się" (to learn).', exampleSentence: 'Studiuję medycynę.', exampleTranslation: 'I study medicine.' },
    { id: 'l3_12', polish: 'Język', english: 'Language', phonetic: 'YEN-zik', category: 'greetings', lesson: 3, gender: 'masculine', exampleSentence: 'Uczę się języka polskiego.', exampleTranslation: "I'm learning the Polish language." },
    { id: 'l3_13', polish: 'Firma', english: 'Company', phonetic: 'FEER-mah', category: 'greetings', lesson: 3, gender: 'feminine', exampleSentence: 'Pracuję w dużej firmie.', exampleTranslation: 'I work in a big company.' },
    { id: 'l3_14', polish: 'Biuro', english: 'Office', phonetic: 'BYOO-roh', category: 'greetings', lesson: 3, gender: 'neuter', exampleSentence: 'Moje biuro jest duże.', exampleTranslation: 'My office is big.' },
    { id: 'l3_15', polish: 'Szkoła', english: 'School', phonetic: 'SHKOH-wah', category: 'greetings', lesson: 3, gender: 'feminine', exampleSentence: 'Moja córka chodzi do szkoły.', exampleTranslation: 'My daughter goes to school.' },
    { id: 'l3_16', polish: 'Uniwersytet', english: 'University', phonetic: 'oo-nee-VER-si-tet', category: 'greetings', lesson: 3, gender: 'masculine', exampleSentence: 'Studiuję na uniwersytecie.', exampleTranslation: 'I study at a university.' },
    { id: 'l3_17', polish: 'Zawód', english: 'Profession', phonetic: 'ZAH-voot', category: 'greetings', lesson: 3, gender: 'masculine', exampleSentence: 'Jaki jest twój zawód?', exampleTranslation: 'What is your profession?' },
    { id: 'l3_18', polish: 'Robić', english: 'To do / To make', phonetic: 'ROH-beech', category: 'greetings', lesson: 3, grammarTip: 'Ja robię, ty robisz.', exampleSentence: 'Co robisz?', exampleTranslation: 'What are you doing?' },
    { id: 'l3_19', polish: 'Uczyć się', english: 'To learn / To study', phonetic: 'OO-chich sheh', category: 'greetings', lesson: 3, grammarTip: 'Reflexive verb with "się". Uczę się polskiego.', exampleSentence: 'Uczę się polskiego.', exampleTranslation: "I'm learning Polish." },
    { id: 'l3_20', polish: 'Rozumieć', english: 'To understand', phonetic: 'roh-ZOO-myech', category: 'greetings', lesson: 3, grammarTip: 'Ja rozumiem, ty rozumiesz.', exampleSentence: 'Czy rozumiesz po polsku?', exampleTranslation: 'Do you understand Polish?' },
  ],
};

export default lesson3;
