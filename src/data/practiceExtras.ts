// Static data for Practice page reference sections

export interface PolishColor {
  polish: string;
  english: string;
  hex: string;
  gender: 'masculine' | 'feminine' | 'neuter';
  examplePl: string;
  exampleEn: string;
}

export const polishColors: PolishColor[] = [
  { polish: 'czerwony', english: 'red', hex: '#DC2626', gender: 'masculine', examplePl: 'Czerwony samochód', exampleEn: 'Red car (masc.)' },
  { polish: 'niebieski', english: 'blue', hex: '#2563EB', gender: 'masculine', examplePl: 'Niebieskie niebo', exampleEn: 'Blue sky (neut.)' },
  { polish: 'zielony', english: 'green', hex: '#16A34A', gender: 'masculine', examplePl: 'Zielona trawa', exampleEn: 'Green grass (fem.)' },
  { polish: 'żółty', english: 'yellow', hex: '#EAB308', gender: 'masculine', examplePl: 'Żółty kwiat', exampleEn: 'Yellow flower (masc.)' },
  { polish: 'biały', english: 'white', hex: '#F8FAFC', gender: 'masculine', examplePl: 'Biała koszula', exampleEn: 'White shirt (fem.)' },
  { polish: 'czarny', english: 'black', hex: '#1E293B', gender: 'masculine', examplePl: 'Czarny kot', exampleEn: 'Black cat (masc.)' },
  { polish: 'różowy', english: 'pink', hex: '#EC4899', gender: 'masculine', examplePl: 'Różowa sukienka', exampleEn: 'Pink dress (fem.)' },
  { polish: 'pomarańczowy', english: 'orange', hex: '#F97316', gender: 'masculine', examplePl: 'Pomarańczowy sok', exampleEn: 'Orange juice (masc.)' },
  { polish: 'fioletowy', english: 'purple', hex: '#9333EA', gender: 'masculine', examplePl: 'Fioletowe kwiaty', exampleEn: 'Purple flowers (pl.)' },
  { polish: 'brązowy', english: 'brown', hex: '#92400E', gender: 'masculine', examplePl: 'Brązowe buty', exampleEn: 'Brown shoes (pl.)' },
];

export const colorsGrammarTip = 'Polish adjectives change endings based on gender! -y/-i (masc.), -a (fem.), -e (neut./plural).';

export interface DayOfWeek {
  polish: string;
  english: string;
  phonetic: string;
}

export const daysOfWeek: DayOfWeek[] = [
  { polish: 'poniedziałek', english: 'Monday', phonetic: 'poh-nyeh-JAH-wek' },
  { polish: 'wtorek', english: 'Tuesday', phonetic: 'FTOH-rek' },
  { polish: 'środa', english: 'Wednesday', phonetic: 'SHROH-dah' },
  { polish: 'czwartek', english: 'Thursday', phonetic: 'CHVAR-tek' },
  { polish: 'piątek', english: 'Friday', phonetic: 'PYOHN-tek' },
  { polish: 'sobota', english: 'Saturday', phonetic: 'soh-BOH-tah' },
  { polish: 'niedziela', english: 'Sunday', phonetic: 'nyeh-JEH-lah' },
];

export interface MonthOfYear {
  polish: string;
  english: string;
  phonetic: string;
}

export const monthsOfYear: MonthOfYear[] = [
  { polish: 'styczeń', english: 'January', phonetic: 'STI-cheñ' },
  { polish: 'luty', english: 'February', phonetic: 'LOO-ti' },
  { polish: 'marzec', english: 'March', phonetic: 'MAH-zhets' },
  { polish: 'kwiecień', english: 'April', phonetic: 'KVYEH-cheñ' },
  { polish: 'maj', english: 'May', phonetic: 'mai' },
  { polish: 'czerwiec', english: 'June', phonetic: 'CHER-vyets' },
  { polish: 'lipiec', english: 'July', phonetic: 'LEE-pyets' },
  { polish: 'sierpień', english: 'August', phonetic: 'SHER-pyeñ' },
  { polish: 'wrzesień', english: 'September', phonetic: 'VZHEH-sheñ' },
  { polish: 'październik', english: 'October', phonetic: 'pahzh-DJER-neek' },
  { polish: 'listopad', english: 'November', phonetic: 'lee-STOH-pat' },
  { polish: 'grudzień', english: 'December', phonetic: 'GROO-jeñ' },
];

export const daysMonthsGrammarTip = 'In Polish, days and months are written in lowercase — just like in English, they don\'t need capital letters!';

export const daysMonthsSentences = [
  { polish: 'Spotykamy się w piątek.', english: 'We meet on Friday.' },
  { polish: 'Moje urodziny są w maju.', english: 'My birthday is in May.' },
];

export interface TimeExpression {
  polish: string;
  english: string;
  phonetic: string;
}

export const timeExpressions: TimeExpression[] = [
  { polish: 'Która jest godzina?', english: 'What time is it?', phonetic: 'KTOO-rah yest goh-JEE-nah' },
  { polish: 'Jest pierwsza.', english: 'It\'s 1 o\'clock.', phonetic: 'yest PYERV-shah' },
  { polish: 'Jest trzecia.', english: 'It\'s 3 o\'clock.', phonetic: 'yest TSHEH-chah' },
  { polish: 'Jest piąta trzydzieści.', english: 'It\'s 5:30.', phonetic: 'yest PYOHN-tah tshi-JESH-chi' },
  { polish: 'O wpół do piątej.', english: 'At half past four.', phonetic: 'oh vpoow doh PYOHN-tey' },
  { polish: 'Za kwadrans szósta.', english: 'Quarter to six.', phonetic: 'zah KVAH-drahns SHOOS-tah' },
  { polish: 'Kwadrans po drugiej.', english: 'Quarter past two.', phonetic: 'KVAH-drahns poh DROO-gyey' },
  { polish: 'W południe.', english: 'At noon.', phonetic: 'v poh-WOO-dnyeh' },
];

export const timeGrammarTip = 'Polish uses ordinal feminine forms for hours because "godzina" (hour) is feminine.';

export interface NumberEntry {
  number: number;
  polish: string;
  phonetic: string;
}

export const numberReference: NumberEntry[] = [
  { number: 1, polish: 'jeden', phonetic: 'YEH-den' },
  { number: 2, polish: 'dwa', phonetic: 'dvah' },
  { number: 3, polish: 'trzy', phonetic: 'tshi' },
  { number: 4, polish: 'cztery', phonetic: 'CHTE-ri' },
  { number: 5, polish: 'pięć', phonetic: 'pyench' },
  { number: 6, polish: 'sześć', phonetic: 'sheshch' },
  { number: 7, polish: 'siedem', phonetic: 'SHE-dem' },
  { number: 8, polish: 'osiem', phonetic: 'OH-shem' },
  { number: 9, polish: 'dziewięć', phonetic: 'JEH-vyench' },
  { number: 10, polish: 'dziesięć', phonetic: 'JEH-shench' },
  { number: 11, polish: 'jedenaście', phonetic: 'yeh-deh-NASH-cheh' },
  { number: 12, polish: 'dwanaście', phonetic: 'dvah-NASH-cheh' },
  { number: 13, polish: 'trzynaście', phonetic: 'tshi-NASH-cheh' },
  { number: 14, polish: 'czternaście', phonetic: 'chter-NASH-cheh' },
  { number: 15, polish: 'piętnaście', phonetic: 'pyent-NASH-cheh' },
  { number: 16, polish: 'szesnaście', phonetic: 'shes-NASH-cheh' },
  { number: 17, polish: 'siedemnaście', phonetic: 'she-dem-NASH-cheh' },
  { number: 18, polish: 'osiemnaście', phonetic: 'oh-shem-NASH-cheh' },
  { number: 19, polish: 'dziewiętnaście', phonetic: 'jeh-vyent-NASH-cheh' },
  { number: 20, polish: 'dwadzieścia', phonetic: 'dvah-JESH-chah' },
  { number: 30, polish: 'trzydzieści', phonetic: 'tshi-JESH-chi' },
  { number: 40, polish: 'czterdzieści', phonetic: 'chter-JESH-chi' },
  { number: 50, polish: 'pięćdziesiąt', phonetic: 'pyench-JEH-shownt' },
  { number: 60, polish: 'sześćdziesiąt', phonetic: 'sheshch-JEH-shownt' },
  { number: 70, polish: 'siedemdziesiąt', phonetic: 'she-dem-JEH-shownt' },
  { number: 80, polish: 'osiemdziesiąt', phonetic: 'oh-shem-JEH-shownt' },
  { number: 90, polish: 'dziewięćdziesiąt', phonetic: 'jeh-vyench-JEH-shownt' },
  { number: 100, polish: 'sto', phonetic: 'stoh' },
];

export const numbersSentences = [
  { polish: 'Mam dwadzieścia pięć lat.', english: 'I\'m 25 years old.' },
  { polish: 'To kosztuje dziesięć złotych.', english: 'It costs 10 złoty.' },
];

export interface SurvivalPhrase {
  polish: string;
  english: string;
  phonetic: string;
  situation: string;
}

export const survivalPhrases: SurvivalPhrase[] = [
  { polish: 'Ile to kosztuje?', english: 'How much is this?', phonetic: 'EE-leh toh kosh-TOO-yeh', situation: 'Shopping' },
  { polish: 'Poproszę rachunek.', english: 'The bill, please.', phonetic: 'poh-PRO-sheh rah-HOO-nek', situation: 'Restaurant' },
  { polish: 'Gdzie jest toaleta?', english: 'Where is the toilet?', phonetic: 'g-jeh yest toh-ah-LEH-tah', situation: 'Getting around' },
  { polish: 'Nie rozumiem.', english: 'I don\'t understand.', phonetic: 'nyeh roh-ZOO-myem', situation: 'Communication' },
  { polish: 'Czy mówi Pan/Pani po angielsku?', english: 'Do you speak English?', phonetic: 'chi MOO-vee pahn/PAH-nee poh ahn-GYEL-skoo', situation: 'Communication' },
  { polish: 'Potrzebuję pomocy.', english: 'I need help.', phonetic: 'poh-tsheh-BOO-yeh poh-MOH-tsi', situation: 'Emergency' },
  { polish: 'Przepraszam.', english: 'Excuse me / I\'m sorry.', phonetic: 'psheh-PRAH-shahm', situation: 'Politeness' },
  { polish: 'Poproszę kawę.', english: 'I\'d like a coffee, please.', phonetic: 'poh-PRO-sheh KAH-veh', situation: 'Restaurant' },
  { polish: 'Gdzie jest dworzec?', english: 'Where is the train station?', phonetic: 'g-jeh yest DVOH-zhets', situation: 'Getting around' },
  { polish: 'Chciałbym zarezerwować stolik.', english: 'I\'d like to reserve a table.', phonetic: 'hchaw-bim zah-reh-zer-VOH-vach STOH-leek', situation: 'Restaurant' },
];
