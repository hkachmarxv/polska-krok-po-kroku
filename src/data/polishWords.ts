export interface Word {
  id: string;
  english: string;
  polish: string;
  phonetic: string;
  category: string;
  gender?: 'masculine' | 'feminine' | 'neuter';
  grammarTip?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export const categories: Category[] = [
  { id: 'greetings', name: 'Greetings & Basics', emoji: '👋', description: 'Essential everyday phrases', color: 'primary' },
  { id: 'numbers', name: 'Numbers & Time', emoji: '🕐', description: 'Counting and telling time', color: 'accent' },
  { id: 'food', name: 'Food & Dining', emoji: '🍽️', description: 'Ordering and cooking vocabulary', color: 'destructive' },
  { id: 'travel', name: 'Travel & Directions', emoji: '🗺️', description: 'Getting around in Poland', color: 'primary' },
  { id: 'family', name: 'Family & Relationships', emoji: '👨‍👩‍👧‍👦', description: 'People and relationships', color: 'accent' },
];

export const words: Word[] = [
  // Greetings & Basics
  { id: 'g1', english: 'Hello', polish: 'Cześć', phonetic: 'cheshch', category: 'greetings', grammarTip: 'Informal greeting, used with friends and family' },
  { id: 'g2', english: 'Good morning', polish: 'Dzień dobry', phonetic: 'jen DOH-bri', category: 'greetings', grammarTip: 'Formal greeting, used until afternoon' },
  { id: 'g3', english: 'Good evening', polish: 'Dobry wieczór', phonetic: 'DOH-bri VYEH-choor', category: 'greetings' },
  { id: 'g4', english: 'Goodbye', polish: 'Do widzenia', phonetic: 'doh vee-DZEN-ya', category: 'greetings', grammarTip: 'Formal farewell' },
  { id: 'g5', english: 'See you later', polish: 'Do zobaczenia', phonetic: 'doh zoh-bah-CHEN-ya', category: 'greetings' },
  { id: 'g6', english: 'Thank you', polish: 'Dziękuję', phonetic: 'jen-KOO-yeh', category: 'greetings' },
  { id: 'g7', english: 'Please / You\'re welcome', polish: 'Proszę', phonetic: 'PROH-sheh', category: 'greetings', grammarTip: 'Used for both "please" and "you\'re welcome"' },
  { id: 'g8', english: 'Yes', polish: 'Tak', phonetic: 'tahk', category: 'greetings' },
  { id: 'g9', english: 'No', polish: 'Nie', phonetic: 'nyeh', category: 'greetings', grammarTip: '"Nie" also means "not" — placed before verbs to negate' },
  { id: 'g10', english: 'Excuse me / Sorry', polish: 'Przepraszam', phonetic: 'psheh-PRAH-shahm', category: 'greetings' },
  { id: 'g11', english: 'I don\'t understand', polish: 'Nie rozumiem', phonetic: 'nyeh roh-ZOO-myem', category: 'greetings' },
  { id: 'g12', english: 'Do you speak English?', polish: 'Czy mówisz po angielsku?', phonetic: 'chi MOO-veesh poh ahn-GYEL-skoo', category: 'greetings', grammarTip: 'Informal "ty" form. Formal: "Czy mówi Pan/Pani po angielsku?"' },
  { id: 'g13', english: 'My name is...', polish: 'Mam na imię...', phonetic: 'mahm nah EE-myeh', category: 'greetings', grammarTip: 'Literally "I have for name..."' },
  { id: 'g14', english: 'How are you?', polish: 'Jak się masz?', phonetic: 'yahk sheh mahsh', category: 'greetings' },
  { id: 'g15', english: 'Fine, thank you', polish: 'Dobrze, dziękuję', phonetic: 'DOH-bzheh jen-KOO-yeh', category: 'greetings' },
  { id: 'g16', english: 'Good night', polish: 'Dobranoc', phonetic: 'doh-BRAH-nots', category: 'greetings' },
  { id: 'g17', english: 'I\'m sorry', polish: 'Przykro mi', phonetic: 'PSHIK-roh mee', category: 'greetings' },
  { id: 'g18', english: 'Help!', polish: 'Pomocy!', phonetic: 'poh-MOH-tsi', category: 'greetings' },
  { id: 'g19', english: 'I like it', polish: 'Podoba mi się', phonetic: 'poh-DOH-bah mee sheh', category: 'greetings', grammarTip: 'Reflexive verb — "się" is required' },
  { id: 'g20', english: 'What?', polish: 'Co?', phonetic: 'tsoh', category: 'greetings' },

  // Numbers & Time
  { id: 'n1', english: 'One', polish: 'Jeden', phonetic: 'YEH-den', category: 'numbers', gender: 'masculine', grammarTip: 'Changes form by gender: jeden (m), jedna (f), jedno (n)' },
  { id: 'n2', english: 'Two', polish: 'Dwa', phonetic: 'dvah', category: 'numbers', grammarTip: 'Dwa (m/n), dwie (f)' },
  { id: 'n3', english: 'Three', polish: 'Trzy', phonetic: 'tshi', category: 'numbers' },
  { id: 'n4', english: 'Four', polish: 'Cztery', phonetic: 'CHTE-ri', category: 'numbers' },
  { id: 'n5', english: 'Five', polish: 'Pięć', phonetic: 'pyench', category: 'numbers' },
  { id: 'n6', english: 'Six', polish: 'Sześć', phonetic: 'sheshch', category: 'numbers' },
  { id: 'n7', english: 'Seven', polish: 'Siedem', phonetic: 'SHEH-dem', category: 'numbers' },
  { id: 'n8', english: 'Eight', polish: 'Osiem', phonetic: 'OH-shem', category: 'numbers' },
  { id: 'n9', english: 'Nine', polish: 'Dziewięć', phonetic: 'JEH-vyench', category: 'numbers' },
  { id: 'n10', english: 'Ten', polish: 'Dziesięć', phonetic: 'JEH-shench', category: 'numbers' },
  { id: 'n11', english: 'Twenty', polish: 'Dwadzieścia', phonetic: 'dvah-JESH-cha', category: 'numbers' },
  { id: 'n12', english: 'One hundred', polish: 'Sto', phonetic: 'stoh', category: 'numbers' },
  { id: 'n13', english: 'What time is it?', polish: 'Która jest godzina?', phonetic: 'KTOO-rah yest goh-JEE-nah', category: 'numbers' },
  { id: 'n14', english: 'Today', polish: 'Dzisiaj', phonetic: 'JEE-shay', category: 'numbers' },
  { id: 'n15', english: 'Tomorrow', polish: 'Jutro', phonetic: 'YOO-troh', category: 'numbers' },
  { id: 'n16', english: 'Yesterday', polish: 'Wczoraj', phonetic: 'FCHOH-ray', category: 'numbers' },
  { id: 'n17', english: 'Monday', polish: 'Poniedziałek', phonetic: 'poh-nyeh-JAH-wek', category: 'numbers' },
  { id: 'n18', english: 'Hour', polish: 'Godzina', phonetic: 'goh-JEE-nah', category: 'numbers', gender: 'feminine' },
  { id: 'n19', english: 'Minute', polish: 'Minuta', phonetic: 'mee-NOO-tah', category: 'numbers', gender: 'feminine' },
  { id: 'n20', english: 'Week', polish: 'Tydzień', phonetic: 'TI-jen', category: 'numbers', gender: 'masculine' },

  // Food & Dining
  { id: 'f1', english: 'Water', polish: 'Woda', phonetic: 'VOH-dah', category: 'food', gender: 'feminine' },
  { id: 'f2', english: 'Beer', polish: 'Piwo', phonetic: 'PEE-voh', category: 'food', gender: 'neuter' },
  { id: 'f3', english: 'Coffee', polish: 'Kawa', phonetic: 'KAH-vah', category: 'food', gender: 'feminine' },
  { id: 'f4', english: 'Tea', polish: 'Herbata', phonetic: 'her-BAH-tah', category: 'food', gender: 'feminine' },
  { id: 'f5', english: 'Bread', polish: 'Chleb', phonetic: 'hlep', category: 'food', gender: 'masculine' },
  { id: 'f6', english: 'Meat', polish: 'Mięso', phonetic: 'MYEN-soh', category: 'food', gender: 'neuter' },
  { id: 'f7', english: 'I would like...', polish: 'Poproszę...', phonetic: 'poh-PROH-sheh', category: 'food', grammarTip: 'The polite way to order in restaurants' },
  { id: 'f8', english: 'The bill, please', polish: 'Rachunek, proszę', phonetic: 'rah-HOO-nek PROH-sheh', category: 'food' },
  { id: 'f9', english: 'Delicious', polish: 'Pyszne', phonetic: 'PISH-neh', category: 'food', grammarTip: 'Neuter form. Masc: pyszny, fem: pyszna' },
  { id: 'f10', english: 'Breakfast', polish: 'Śniadanie', phonetic: 'shnya-DAH-nyeh', category: 'food', gender: 'neuter' },
  { id: 'f11', english: 'Lunch', polish: 'Obiad', phonetic: 'OH-byaht', category: 'food', gender: 'masculine', grammarTip: 'In Poland, obiad is the main meal, usually eaten early afternoon' },
  { id: 'f12', english: 'Dinner', polish: 'Kolacja', phonetic: 'koh-LAHTS-yah', category: 'food', gender: 'feminine' },
  { id: 'f13', english: 'Milk', polish: 'Mleko', phonetic: 'MLEH-koh', category: 'food', gender: 'neuter' },
  { id: 'f14', english: 'Cheese', polish: 'Ser', phonetic: 'sehr', category: 'food', gender: 'masculine' },
  { id: 'f15', english: 'Soup', polish: 'Zupa', phonetic: 'ZOO-pah', category: 'food', gender: 'feminine' },
  { id: 'f16', english: 'I\'m hungry', polish: 'Jestem głodny', phonetic: 'YES-tem GWOD-ni', category: 'food', grammarTip: 'Masc: głodny, fem: głodna' },
  { id: 'f17', english: 'Menu', polish: 'Menu / Karta', phonetic: 'MEH-noo / KAR-tah', category: 'food' },
  { id: 'f18', english: 'Apple', polish: 'Jabłko', phonetic: 'YAHB-koh', category: 'food', gender: 'neuter' },
  { id: 'f19', english: 'Cake', polish: 'Ciasto', phonetic: 'CHAHS-toh', category: 'food', gender: 'neuter' },
  { id: 'f20', english: 'Bon appétit', polish: 'Smacznego', phonetic: 'smahch-NEH-goh', category: 'food', grammarTip: 'Genitive case of "smaczny" (tasty)' },

  // Travel & Directions
  { id: 't1', english: 'Where is...?', polish: 'Gdzie jest...?', phonetic: 'gjeh yest', category: 'travel' },
  { id: 't2', english: 'Left', polish: 'Lewo', phonetic: 'LEH-voh', category: 'travel' },
  { id: 't3', english: 'Right', polish: 'Prawo', phonetic: 'PRAH-voh', category: 'travel' },
  { id: 't4', english: 'Straight ahead', polish: 'Prosto', phonetic: 'PROHS-toh', category: 'travel' },
  { id: 't5', english: 'Train station', polish: 'Dworzec kolejowy', phonetic: 'DVOH-zhets koh-leh-YOH-vi', category: 'travel', gender: 'masculine' },
  { id: 't6', english: 'Airport', polish: 'Lotnisko', phonetic: 'lot-NEES-koh', category: 'travel', gender: 'neuter' },
  { id: 't7', english: 'Hotel', polish: 'Hotel', phonetic: 'HOH-tel', category: 'travel', gender: 'masculine' },
  { id: 't8', english: 'Bus stop', polish: 'Przystanek autobusowy', phonetic: 'pshi-STAH-nek ow-toh-boo-SOH-vi', category: 'travel' },
  { id: 't9', english: 'Ticket', polish: 'Bilet', phonetic: 'BEE-let', category: 'travel', gender: 'masculine' },
  { id: 't10', english: 'How much does it cost?', polish: 'Ile to kosztuje?', phonetic: 'EE-leh toh kosh-TOO-yeh', category: 'travel' },
  { id: 't11', english: 'Street', polish: 'Ulica', phonetic: 'oo-LEE-tsah', category: 'travel', gender: 'feminine' },
  { id: 't12', english: 'Map', polish: 'Mapa', phonetic: 'MAH-pah', category: 'travel', gender: 'feminine' },
  { id: 't13', english: 'Near', polish: 'Blisko', phonetic: 'BLEES-koh', category: 'travel' },
  { id: 't14', english: 'Far', polish: 'Daleko', phonetic: 'dah-LEH-koh', category: 'travel' },
  { id: 't15', english: 'Pharmacy', polish: 'Apteka', phonetic: 'ahp-TEH-kah', category: 'travel', gender: 'feminine' },
  { id: 't16', english: 'Hospital', polish: 'Szpital', phonetic: 'SHPEE-tahl', category: 'travel', gender: 'masculine' },
  { id: 't17', english: 'I\'m lost', polish: 'Zgubiłem się', phonetic: 'zgoo-BEE-wem sheh', category: 'travel', grammarTip: 'Masc: zgubiłem, fem: zgubiłam' },
  { id: 't18', english: 'Taxi', polish: 'Taksówka', phonetic: 'tahk-SOOV-kah', category: 'travel', gender: 'feminine' },
  { id: 't19', english: 'Police', polish: 'Policja', phonetic: 'poh-LEETS-yah', category: 'travel', gender: 'feminine' },
  { id: 't20', english: 'City center', polish: 'Centrum', phonetic: 'TSEN-troom', category: 'travel', gender: 'neuter' },

  // Family & Relationships
  { id: 'r1', english: 'Mother', polish: 'Matka / Mama', phonetic: 'MAHT-kah / MAH-mah', category: 'family', gender: 'feminine' },
  { id: 'r2', english: 'Father', polish: 'Ojciec / Tata', phonetic: 'OY-chets / TAH-tah', category: 'family', gender: 'masculine' },
  { id: 'r3', english: 'Sister', polish: 'Siostra', phonetic: 'SHOS-trah', category: 'family', gender: 'feminine' },
  { id: 'r4', english: 'Brother', polish: 'Brat', phonetic: 'braht', category: 'family', gender: 'masculine' },
  { id: 'r5', english: 'Son', polish: 'Syn', phonetic: 'sin', category: 'family', gender: 'masculine' },
  { id: 'r6', english: 'Daughter', polish: 'Córka', phonetic: 'TSOOR-kah', category: 'family', gender: 'feminine' },
  { id: 'r7', english: 'Husband', polish: 'Mąż', phonetic: 'monzh', category: 'family', gender: 'masculine' },
  { id: 'r8', english: 'Wife', polish: 'Żona', phonetic: 'ZHOH-nah', category: 'family', gender: 'feminine' },
  { id: 'r9', english: 'Friend (male)', polish: 'Przyjaciel', phonetic: 'pshi-YAH-chel', category: 'family', gender: 'masculine', grammarTip: 'Kolega = more casual friend/acquaintance' },
  { id: 'r10', english: 'Friend (female)', polish: 'Przyjaciółka', phonetic: 'pshi-yah-CHOOW-kah', category: 'family', gender: 'feminine' },
  { id: 'r11', english: 'Grandmother', polish: 'Babcia', phonetic: 'BAHB-chah', category: 'family', gender: 'feminine' },
  { id: 'r12', english: 'Grandfather', polish: 'Dziadek', phonetic: 'JAH-dek', category: 'family', gender: 'masculine' },
  { id: 'r13', english: 'Child', polish: 'Dziecko', phonetic: 'JETS-koh', category: 'family', gender: 'neuter' },
  { id: 'r14', english: 'Family', polish: 'Rodzina', phonetic: 'roh-JEE-nah', category: 'family', gender: 'feminine' },
  { id: 'r15', english: 'I love you', polish: 'Kocham cię', phonetic: 'KOH-hahm cheh', category: 'family', grammarTip: '"Cię" is the accusative form of "ty" (you)' },
  { id: 'r16', english: 'Boyfriend', polish: 'Chłopak', phonetic: 'HWOH-pahk', category: 'family', gender: 'masculine' },
  { id: 'r17', english: 'Girlfriend', polish: 'Dziewczyna', phonetic: 'jev-CHI-nah', category: 'family', gender: 'feminine' },
  { id: 'r18', english: 'Uncle', polish: 'Wujek', phonetic: 'VOO-yek', category: 'family', gender: 'masculine' },
  { id: 'r19', english: 'Aunt', polish: 'Ciocia', phonetic: 'CHO-chah', category: 'family', gender: 'feminine' },
  { id: 'r20', english: 'Cousin (male)', polish: 'Kuzyn', phonetic: 'KOO-zin', category: 'family', gender: 'masculine' },
];

export const getWordsByCategory = (categoryId: string): Word[] =>
  words.filter(w => w.category === categoryId);

export const getWordOfTheDay = (): Word => {
  const today = new Date();
  const dayIndex = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % words.length;
  return words[dayIndex];
};
