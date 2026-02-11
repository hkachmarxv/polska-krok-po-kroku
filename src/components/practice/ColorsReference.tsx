import { polishColors, colorsGrammarTip } from '@/data/practiceExtras';
import { PracticeReferenceCard } from './PracticeReferenceCard';
import { SpeakButton } from '@/components/SpeakButton';

export const ColorsReference = () => (
  <PracticeReferenceCard
    emoji="🎨"
    titleEn="Colors"
    titlePl="Kolory"
    grammarTip={colorsGrammarTip}
    defaultOpen
  >
    <div className="grid grid-cols-2 gap-2">
      {polishColors.map((c) => (
        <div
          key={c.polish}
          className="flex items-start gap-2 bg-muted/40 rounded-xl p-2.5"
        >
          <span
            className="w-6 h-6 rounded-full flex-shrink-0 border border-border mt-0.5"
            style={{ backgroundColor: c.hex }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-foreground truncate">{c.polish}</span>
              <SpeakButton text={c.polish} size="sm" />
            </div>
            <p className="text-[10px] text-muted-foreground">{c.english}</p>
            <p className="text-[10px] text-primary/80 italic mt-0.5 truncate">{c.examplePl}</p>
            <p className="text-[10px] text-muted-foreground truncate">{c.exampleEn}</p>
          </div>
        </div>
      ))}
    </div>
  </PracticeReferenceCard>
);
