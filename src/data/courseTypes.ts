export interface CourseWord {
  id: string;
  polish: string;
  english: string;
  phonetic: string;
  gender?: 'masculine' | 'feminine' | 'neuter';
  grammarTip?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  category: string; // maps to legacy category for backward compat
  lesson: number;
}

export interface Dialogue {
  title: string;
  lines: { speaker: string; polish: string; english: string }[];
}

export interface Lesson {
  id: number;
  title: string;
  titleEnglish: string;
  description: string;
  emoji: string;
  grammarTopics: string[];
  grammarSummary: string; // markdown
  culturalNote: string;
  dialogues: Dialogue[];
  vocabulary: CourseWord[];
}
