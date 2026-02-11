import { numberReference, numbersSentences } from '@/data/practiceExtras';
import { PracticeReferenceCard } from './PracticeReferenceCard';
import { SpeakButton } from '@/components/SpeakButton';

export const NumbersReference = () => (
  <PracticeReferenceCard
    emoji="#️⃣"
    titleEn="Numbers"
    titlePl="Liczby"
  >
    <div className="grid grid-cols-4 gap-1.5">
      {numberReference.map((n) => (
        <button
          key={n.number}
          className="bg-muted/40 rounded-lg px-1 py-1.5 flex flex-col items-center gap-0.5 hover:bg-muted transition-colors group"
          title={n.phonetic}
        >
          <span className="text-sm font-bold text-primary">{n.number}</span>
          <span className="text-[10px] text-foreground font-medium leading-tight text-center">{n.polish}</span>
          <SpeakButton text={n.polish} size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
    </div>

    <div className="space-y-1 mt-2">
      {numbersSentences.map((s) => (
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
