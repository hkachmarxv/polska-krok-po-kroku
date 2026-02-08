import { Word } from '@/data/polishWords';
import { SpeakButton } from '@/components/SpeakButton';

interface WordOfTheDayProps {
  word: Word;
}

export const WordOfTheDay = ({ word }: WordOfTheDayProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10 rounded-2xl p-5 border border-primary/20 animate-fade-in">
      {/* Decorative circle */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/5 rounded-full" />

      <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">✨ Word of the Day</p>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-2xl font-bold text-foreground">{word.polish}</h3>
            <SpeakButton text={word.polish} size="sm" />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{word.phonetic}</p>
          <p className="text-base font-semibold text-foreground/80 mt-1.5">{word.english}</p>
          {word.grammarTip && (
            <p className="text-xs text-muted-foreground mt-3 bg-muted/50 rounded-lg px-3 py-1.5 inline-block">
              💡 {word.grammarTip}
            </p>
          )}
        </div>
        {word.gender && (
          <span className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full font-semibold">
            {word.gender === 'masculine' ? '♂ masc' : word.gender === 'feminine' ? '♀ fem' : '⚬ neut'}
          </span>
        )}
      </div>
    </div>
  );
};
