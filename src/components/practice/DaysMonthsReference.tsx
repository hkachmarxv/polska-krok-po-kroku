import { daysOfWeek, monthsOfYear, daysMonthsGrammarTip, daysMonthsSentences } from '@/data/practiceExtras';
import { PracticeReferenceCard } from './PracticeReferenceCard';
import { SpeakButton } from '@/components/SpeakButton';

export const DaysMonthsReference = () => (
  <PracticeReferenceCard
    emoji="📅"
    titleEn="Days & Months"
    titlePl="Dni i miesiące"
    grammarTip={daysMonthsGrammarTip}
  >
    {/* Days */}
    <div>
      <p className="text-xs font-semibold text-foreground mb-1.5">Days of the week</p>
      <div className="grid grid-cols-2 gap-1.5">
        {daysOfWeek.map((d) => (
          <div key={d.polish} className="flex items-center gap-1 bg-muted/40 rounded-lg px-2 py-1.5">
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-foreground block truncate">{d.polish}</span>
              <span className="text-[10px] text-muted-foreground">{d.english}</span>
            </div>
            <SpeakButton text={d.polish} size="sm" />
          </div>
        ))}
      </div>
    </div>

    {/* Months */}
    <div>
      <p className="text-xs font-semibold text-foreground mb-1.5">Months</p>
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {monthsOfYear.map((m) => (
          <div key={m.polish} className="flex-shrink-0 bg-muted/40 rounded-lg px-2.5 py-1.5 flex items-center gap-1">
            <div>
              <span className="text-xs font-medium text-foreground block whitespace-nowrap">{m.polish}</span>
              <span className="text-[10px] text-muted-foreground">{m.english}</span>
            </div>
            <SpeakButton text={m.polish} size="sm" />
          </div>
        ))}
      </div>
    </div>

    {/* Sentences */}
    <div className="space-y-1">
      {daysMonthsSentences.map((s) => (
        <div key={s.polish} className="flex items-center gap-1 bg-primary/5 rounded-lg px-2.5 py-1.5">
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-foreground block">{s.polish}</span>
            <span className="text-[10px] text-muted-foreground">{s.english}</span>
          </div>
          <SpeakButton text={s.polish} size="sm" />
        </div>
      ))}
    </div>
  </PracticeReferenceCard>
);
