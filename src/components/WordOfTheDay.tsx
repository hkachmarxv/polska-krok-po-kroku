import { Word } from '@/data/polishWords';
import { Volume2 } from 'lucide-react';

interface WordOfTheDayProps {
  word: Word;
}

export const WordOfTheDay = ({ word }: WordOfTheDayProps) => {
  return (
    <div className="bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10 rounded-xl p-5 border border-primary/20 animate-fade-in">
      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">✨ Word of the Day</p>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground">{word.polish}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{word.phonetic}</p>
          <p className="text-base font-medium text-foreground/80 mt-1">{word.english}</p>
          {word.grammarTip && (
            <p className="text-xs text-muted-foreground mt-2 bg-muted/50 rounded-md px-2 py-1 inline-block">
              💡 {word.grammarTip}
            </p>
          )}
        </div>
        {word.gender && (
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full font-medium">
            {word.gender === 'masculine' ? '♂ masc' : word.gender === 'feminine' ? '♀ fem' : '⚬ neut'}
          </span>
        )}
      </div>
    </div>
  );
};
