export type DifficultyTier = 'familiar' | 'similar' | 'unique';

export interface AlphabetEntry {
  letter: string;
  ipa: string;
  approx: string;
  tier: DifficultyTier;
  example: string;
  exampleTranslation: string;
  mnemonic: string;
  ttsText: string;
}

export interface SoundCluster {
  id: string;
  title: string;
  description: string;
  pairs: {
    label: string;
    sounds: { letter: string; ipa: string; example: string; meaning: string; ttsText: string }[];
  }[];
}

export interface DigraphEntry {
  digraph: string;
  ipa: string;
  approx: string;
  example: string;
  exampleTranslation: string;
  ttsText: string;
}

export const alphabetEntries: AlphabetEntry[] = [
  // Familiar (green) — sound essentially the same as English
  { letter: 'A a', ipa: '/a/', approx: '"a" in "father"', tier: 'familiar', example: 'tak', exampleTranslation: 'yes', mnemonic: 'Open wide, like "ah!"', ttsText: 'a. tak' },
  { letter: 'B b', ipa: '/b/', approx: '"b" in "bed"', tier: 'familiar', example: 'buty', exampleTranslation: 'shoes', mnemonic: 'Same as English b', ttsText: 'b. buty' },
  { letter: 'D d', ipa: '/d/', approx: '"d" in "dog"', tier: 'familiar', example: 'dom', exampleTranslation: 'house', mnemonic: 'Same as English d', ttsText: 'd. dom' },
  { letter: 'E e', ipa: '/ɛ/', approx: '"e" in "bed"', tier: 'familiar', example: 'ten', exampleTranslation: 'this', mnemonic: 'Short "e" like in "get"', ttsText: 'e. ten' },
  { letter: 'F f', ipa: '/f/', approx: '"f" in "fun"', tier: 'familiar', example: 'fala', exampleTranslation: 'wave', mnemonic: 'Same as English f', ttsText: 'f. fala' },
  { letter: 'G g', ipa: '/ɡ/', approx: '"g" in "go"', tier: 'familiar', example: 'gra', exampleTranslation: 'game', mnemonic: 'Always hard, like "go"', ttsText: 'g. gra' },
  { letter: 'H h', ipa: '/x/', approx: '"h" in "huge" (stronger)', tier: 'similar', example: 'herbata', exampleTranslation: 'tea', mnemonic: 'Like clearing your throat gently', ttsText: 'h. herbata' },
  { letter: 'I i', ipa: '/i/', approx: '"ee" in "see"', tier: 'familiar', example: 'igła', exampleTranslation: 'needle', mnemonic: 'Always "ee", never "eye"', ttsText: 'i. igła' },
  { letter: 'J j', ipa: '/j/', approx: '"y" in "yes"', tier: 'similar', example: 'jak', exampleTranslation: 'how', mnemonic: 'J = Y sound, never "dj"', ttsText: 'j. jak' },
  { letter: 'K k', ipa: '/k/', approx: '"k" in "kit"', tier: 'familiar', example: 'kot', exampleTranslation: 'cat', mnemonic: 'Same as English k', ttsText: 'k. kot' },
  { letter: 'L l', ipa: '/l/', approx: '"l" in "let"', tier: 'familiar', example: 'las', exampleTranslation: 'forest', mnemonic: 'Clear "l", tongue touches teeth', ttsText: 'l. las' },
  { letter: 'Ł ł', ipa: '/w/', approx: '"w" in "wow"', tier: 'unique', example: 'łódka', exampleTranslation: 'boat', mnemonic: 'Looks like an L but says "w"!', ttsText: 'ł. łódka' },
  { letter: 'M m', ipa: '/m/', approx: '"m" in "mom"', tier: 'familiar', example: 'mama', exampleTranslation: 'mom', mnemonic: 'Same as English m', ttsText: 'm. mama' },
  { letter: 'N n', ipa: '/n/', approx: '"n" in "no"', tier: 'familiar', example: 'nos', exampleTranslation: 'nose', mnemonic: 'Same as English n', ttsText: 'n. nos' },
  { letter: 'Ń ń', ipa: '/ɲ/', approx: '"ny" in "canyon"', tier: 'unique', example: 'koń', exampleTranslation: 'horse', mnemonic: 'Like Spanish ñ', ttsText: 'ń. koń' },
  { letter: 'O o', ipa: '/ɔ/', approx: '"o" in "lot"', tier: 'familiar', example: 'oko', exampleTranslation: 'eye', mnemonic: 'Open "o", like British "lot"', ttsText: 'o. oko' },
  { letter: 'Ó ó', ipa: '/u/', approx: '"oo" in "boot"', tier: 'unique', example: 'ółek', exampleTranslation: 'pencil (dim.)', mnemonic: 'Looks like O but sounds like U!', ttsText: 'ó. ółek' },
  { letter: 'P p', ipa: '/p/', approx: '"p" in "pot"', tier: 'familiar', example: 'pies', exampleTranslation: 'dog', mnemonic: 'Same as English p', ttsText: 'p. pies' },
  { letter: 'R r', ipa: '/r/', approx: 'Rolled "r"', tier: 'similar', example: 'rak', exampleTranslation: 'crab', mnemonic: 'Tongue trills — like a cat purring', ttsText: 'r. rak' },
  { letter: 'S s', ipa: '/s/', approx: '"s" in "sun"', tier: 'familiar', example: 'ser', exampleTranslation: 'cheese', mnemonic: 'Same as English s', ttsText: 's. ser' },
  { letter: 'Ś ś', ipa: '/ɕ/', approx: 'Soft "sh" (tongue near teeth)', tier: 'unique', example: 'śnieg', exampleTranslation: 'snow', mnemonic: 'A gentle, hissing "sh"', ttsText: 'ś. śnieg' },
  { letter: 'T t', ipa: '/t/', approx: '"t" in "top"', tier: 'familiar', example: 'to', exampleTranslation: 'this/it', mnemonic: 'Same as English t', ttsText: 't. to' },
  { letter: 'U u', ipa: '/u/', approx: '"oo" in "boot"', tier: 'similar', example: 'ul', exampleTranslation: 'beehive', mnemonic: 'Always "oo", never "uh"', ttsText: 'u. ul' },
  { letter: 'W w', ipa: '/v/', approx: '"v" in "very"', tier: 'unique', example: 'woda', exampleTranslation: 'water', mnemonic: 'W = V sound in Polish!', ttsText: 'w. woda' },
  { letter: 'Y y', ipa: '/ɨ/', approx: '"i" in "bit" (deeper)', tier: 'unique', example: 'syn', exampleTranslation: 'son', mnemonic: 'Like "i" said through clenched teeth', ttsText: 'y. syn' },
  { letter: 'Z z', ipa: '/z/', approx: '"z" in "zoo"', tier: 'familiar', example: 'zero', exampleTranslation: 'zero', mnemonic: 'Same as English z', ttsText: 'z. zero' },
  { letter: 'Ź ź', ipa: '/ʑ/', approx: 'Soft "zh" (tongue near teeth)', tier: 'unique', example: 'źle', exampleTranslation: 'badly', mnemonic: 'Gentle buzzing "zh"', ttsText: 'ź. źle' },
  { letter: 'Ż ż', ipa: '/ʐ/', approx: '"s" in "measure"', tier: 'unique', example: 'żaba', exampleTranslation: 'frog', mnemonic: 'Like "zh" in "vision" but harder', ttsText: 'ż. żaba' },
  { letter: 'C c', ipa: '/ts/', approx: '"ts" in "cats"', tier: 'similar', example: 'co', exampleTranslation: 'what', mnemonic: 'Never "k" — always "ts"', ttsText: 'c. co' },
  { letter: 'Ć ć', ipa: '/tɕ/', approx: 'Soft "ch" (tongue near teeth)', tier: 'unique', example: 'ćma', exampleTranslation: 'moth', mnemonic: 'A gentle, soft "ch"', ttsText: 'ć. ćma' },
  { letter: 'Ą ą', ipa: '/ɔ̃/', approx: 'Nasal "on"', tier: 'unique', example: 'są', exampleTranslation: 'they are', mnemonic: 'O through your nose — "own"', ttsText: 'ą. są' },
  { letter: 'Ę ę', ipa: '/ɛ̃/', approx: 'Nasal "en"', tier: 'unique', example: 'się', exampleTranslation: 'oneself', mnemonic: 'E through your nose — "en"', ttsText: 'ę. się' },
];

export const soundClusters: SoundCluster[] = [
  {
    id: 'nasals',
    title: 'Nasal Vowels',
    description: 'Polish has two nasal vowels — unique in Slavic languages. The sound resonates through your nose.',
    pairs: [
      {
        label: 'A vs Ą',
        sounds: [
          { letter: 'a', ipa: '/a/', example: 'tak', meaning: 'yes', ttsText: 'tak' },
          { letter: 'ą', ipa: '/ɔ̃/', example: 'są', meaning: 'they are', ttsText: 'są' },
        ],
      },
      {
        label: 'E vs Ę',
        sounds: [
          { letter: 'e', ipa: '/ɛ/', example: 'ten', meaning: 'this', ttsText: 'ten' },
          { letter: 'ę', ipa: '/ɛ̃/', example: 'się', meaning: 'oneself', ttsText: 'się' },
        ],
      },
    ],
  },
  {
    id: 'softened',
    title: 'Softened Consonants',
    description: 'Adding an accent (ś, ź, ć, ń) or pairing with "i" before a vowel softens these consonants.',
    pairs: [
      {
        label: 'S vs Ś',
        sounds: [
          { letter: 's', ipa: '/s/', example: 'ser', meaning: 'cheese', ttsText: 'ser' },
          { letter: 'ś', ipa: '/ɕ/', example: 'śnieg', meaning: 'snow', ttsText: 'śnieg' },
        ],
      },
      {
        label: 'Z vs Ź',
        sounds: [
          { letter: 'z', ipa: '/z/', example: 'zero', meaning: 'zero', ttsText: 'zero' },
          { letter: 'ź', ipa: '/ʑ/', example: 'źle', meaning: 'badly', ttsText: 'źle' },
        ],
      },
      {
        label: 'C vs Ć',
        sounds: [
          { letter: 'c', ipa: '/ts/', example: 'co', meaning: 'what', ttsText: 'co' },
          { letter: 'ć', ipa: '/tɕ/', example: 'ćma', meaning: 'moth', ttsText: 'ćma' },
        ],
      },
      {
        label: 'N vs Ń',
        sounds: [
          { letter: 'n', ipa: '/n/', example: 'nos', meaning: 'nose', ttsText: 'nos' },
          { letter: 'ń', ipa: '/ɲ/', example: 'koń', meaning: 'horse', ttsText: 'koń' },
        ],
      },
    ],
  },
  {
    id: 'sh-family',
    title: 'The "Sh" Family',
    description: 'These digraphs make Polish look intimidating, but each is just one sound. The "hard" versions (sz, ż/rz) are stronger; the "soft" versions (ś, ź) are gentler.',
    pairs: [
      {
        label: 'SZ vs Ś',
        sounds: [
          { letter: 'sz', ipa: '/ʂ/', example: 'szkoła', meaning: 'school', ttsText: 'szkoła' },
          { letter: 'ś', ipa: '/ɕ/', example: 'śnieg', meaning: 'snow', ttsText: 'śnieg' },
        ],
      },
      {
        label: 'Ż/RZ vs Ź',
        sounds: [
          { letter: 'ż / rz', ipa: '/ʐ/', example: 'żaba', meaning: 'frog', ttsText: 'żaba' },
          { letter: 'ź', ipa: '/ʑ/', example: 'źle', meaning: 'badly', ttsText: 'źle' },
        ],
      },
      {
        label: 'CZ vs Ć',
        sounds: [
          { letter: 'cz', ipa: '/tʂ/', example: 'czas', meaning: 'time', ttsText: 'czas' },
          { letter: 'ć', ipa: '/tɕ/', example: 'ćma', meaning: 'moth', ttsText: 'ćma' },
        ],
      },
    ],
  },
  {
    id: 'tricky',
    title: 'The Tricky Ones',
    description: 'These letters look familiar but don\'t sound the way English speakers expect.',
    pairs: [
      {
        label: 'Ł (w sound) vs L',
        sounds: [
          { letter: 'ł', ipa: '/w/', example: 'łódka', meaning: 'boat', ttsText: 'łódka' },
          { letter: 'l', ipa: '/l/', example: 'las', meaning: 'forest', ttsText: 'las' },
        ],
      },
      {
        label: 'W (v sound)',
        sounds: [
          { letter: 'w', ipa: '/v/', example: 'woda', meaning: 'water', ttsText: 'woda' },
        ],
      },
      {
        label: 'Ó (oo sound) vs U',
        sounds: [
          { letter: 'ó', ipa: '/u/', example: 'góra', meaning: 'mountain', ttsText: 'góra' },
          { letter: 'u', ipa: '/u/', example: 'ul', meaning: 'beehive', ttsText: 'ul' },
        ],
      },
    ],
  },
];

export const digraphs: DigraphEntry[] = [
  { digraph: 'CH', ipa: '/x/', approx: 'Like "h" in "huge" (same as H)', example: 'chleb', exampleTranslation: 'bread', ttsText: 'ch. chleb' },
  { digraph: 'CZ', ipa: '/tʂ/', approx: '"ch" in "church" (hard)', example: 'czas', exampleTranslation: 'time', ttsText: 'cz. czas' },
  { digraph: 'SZ', ipa: '/ʂ/', approx: '"sh" in "ship" (hard)', example: 'szkoła', exampleTranslation: 'school', ttsText: 'sz. szkoła' },
  { digraph: 'RZ', ipa: '/ʐ/', approx: '"s" in "measure" (same as Ż)', example: 'rzeka', exampleTranslation: 'river', ttsText: 'rz. rzeka' },
  { digraph: 'DZ', ipa: '/dz/', approx: '"ds" in "beds"', example: 'dzwon', exampleTranslation: 'bell', ttsText: 'dz. dzwon' },
  { digraph: 'DŹ', ipa: '/dʑ/', approx: 'Soft "j" (gentle)', example: 'dźwig', exampleTranslation: 'crane', ttsText: 'dź. dźwig' },
  { digraph: 'DŻ', ipa: '/dʐ/', approx: '"j" in "jeans" (hard)', example: 'dżem', exampleTranslation: 'jam', ttsText: 'dż. dżem' },
];

// Practice game data: items for the listen-and-pick game
export interface PracticeItem {
  ttsText: string;
  correctAnswer: string;
  options: string[];
}

export const practiceItems: PracticeItem[] = [
  { ttsText: 'szkoła', correctAnswer: 'sz', options: ['sz', 'ś', 's', 'ż'] },
  { ttsText: 'ćma', correctAnswer: 'ć', options: ['c', 'cz', 'ć', 'č'] },
  { ttsText: 'żaba', correctAnswer: 'ż', options: ['z', 'ź', 'ż', 'rz'] },
  { ttsText: 'śnieg', correctAnswer: 'ś', options: ['s', 'sz', 'ś', 'ź'] },
  { ttsText: 'łódka', correctAnswer: 'ł', options: ['l', 'ł', 'w', 'u'] },
  { ttsText: 'woda', correctAnswer: 'w', options: ['w', 'v', 'ł', 'f'] },
  { ttsText: 'koń', correctAnswer: 'ń', options: ['n', 'ń', 'ni', 'ny'] },
  { ttsText: 'czas', correctAnswer: 'cz', options: ['c', 'cz', 'ć', 'sz'] },
  { ttsText: 'są', correctAnswer: 'ą', options: ['a', 'ą', 'on', 'o'] },
  { ttsText: 'się', correctAnswer: 'ę', options: ['e', 'ę', 'en', 'ą'] },
  { ttsText: 'rzeka', correctAnswer: 'rz', options: ['r', 'rz', 'ż', 'ź'] },
  { ttsText: 'dżem', correctAnswer: 'dż', options: ['dz', 'dź', 'dż', 'ż'] },
];
