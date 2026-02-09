import { BookOpen, GraduationCap } from 'lucide-react';
import { SpeakButton } from '@/components/SpeakButton';

interface VocabWord {
  type: 'word';
  lemma: string;
  meaning: string;
  syllables?: string;
  genderForms?: { m?: string; f?: string; n?: string };
  examplePl?: string;
  exampleEn?: string;
}

interface VocabGrammar {
  type: 'grammar_only';
  note: string;
}

export type DrillVocabulary = VocabWord | VocabGrammar;

interface Props {
  vocabulary: DrillVocabulary;
}

export const DrillVocabCard = ({ vocabulary }: Props) => {
  if (vocabulary.type === 'grammar_only') {
    return (
      <div className="bg-muted/50 border border-border rounded-xl p-4 animate-fade-in">
        <div className="flex items-center gap-2 mb-1.5">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Grammar note</p>
        </div>
        <p className="text-sm text-foreground">{vocabulary.note}</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 animate-fade-in space-y-3">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        <p className="text-xs font-bold text-primary uppercase tracking-wider">Word meaning</p>
      </div>

      {/* Lemma + speak + meaning */}
      <div className="flex items-center gap-2">
        <span className="font-display text-lg font-bold text-foreground">{vocabulary.lemma}</span>
        <SpeakButton text={vocabulary.lemma} size="sm" />
        <span className="text-sm text-muted-foreground">— {vocabulary.meaning}</span>
      </div>

      {/* Syllables */}
      {vocabulary.syllables && (
        <p className="text-xs text-muted-foreground">
          Syllables: <span className="font-mono text-foreground">{vocabulary.syllables}</span>
        </p>
      )}

      {/* Gender forms */}
      {vocabulary.genderForms && (
        <div className="flex flex-wrap gap-1.5">
          {vocabulary.genderForms.m && (
            <span className="text-[11px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">♂ {vocabulary.genderForms.m}</span>
          )}
          {vocabulary.genderForms.f && (
            <span className="text-[11px] font-medium bg-pink-500/10 text-pink-500 px-2 py-0.5 rounded-full">♀ {vocabulary.genderForms.f}</span>
          )}
          {vocabulary.genderForms.n && (
            <span className="text-[11px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">⚬ {vocabulary.genderForms.n}</span>
          )}
        </div>
      )}

      {/* Example */}
      {vocabulary.examplePl && vocabulary.exampleEn && (
        <div className="bg-muted/50 rounded-lg px-3 py-2 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-medium text-foreground">{vocabulary.examplePl}</p>
            <SpeakButton text={vocabulary.examplePl} size="sm" />
          </div>
          <p className="text-xs text-muted-foreground italic">{vocabulary.exampleEn}</p>
        </div>
      )}
    </div>
  );
};
