import { timeExpressions, timeGrammarTip } from '@/data/practiceExtras';
import { PracticeReferenceCard } from './PracticeReferenceCard';
import { SpeakButton } from '@/components/SpeakButton';

export const TimeReference = () => (
  <PracticeReferenceCard
    emoji="🕐"
    titleEn="Telling Time"
    titlePl="Godziny"
    grammarTip={timeGrammarTip}
  >
    <div className="space-y-1.5">
      {timeExpressions.map((t) => (
        <div key={t.polish} className="flex items-center gap-2 bg-muted/40 rounded-lg px-2.5 py-2">
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-foreground block">{t.polish}</span>
            <span className="text-[10px] text-muted-foreground">{t.english}</span>
          </div>
          <span className="text-[10px] text-muted-foreground/60 italic hidden sm:block flex-shrink-0">{t.phonetic}</span>
          <SpeakButton text={t.polish} size="sm" />
        </div>
      ))}
    </div>
  </PracticeReferenceCard>
);
