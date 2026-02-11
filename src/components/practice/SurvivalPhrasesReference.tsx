import { survivalPhrases } from '@/data/practiceExtras';
import { PracticeReferenceCard } from './PracticeReferenceCard';
import { SpeakButton } from '@/components/SpeakButton';

// Group phrases by situation
const grouped = survivalPhrases.reduce<Record<string, typeof survivalPhrases>>((acc, p) => {
  (acc[p.situation] ??= []).push(p);
  return acc;
}, {});

const situationEmojis: Record<string, string> = {
  Shopping: '🛍️',
  Restaurant: '🍴',
  'Getting around': '🧭',
  Communication: '💬',
  Emergency: '🚨',
  Politeness: '🤝',
};

export const SurvivalPhrasesReference = () => (
  <PracticeReferenceCard
    emoji="🛟"
    titleEn="Survival Phrases"
    titlePl="Zwroty na przeżycie"
  >
    <div className="space-y-3">
      {Object.entries(grouped).map(([situation, phrases]) => (
        <div key={situation}>
          <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
            <span>{situationEmojis[situation] || '📌'}</span>
            {situation}
          </p>
          <div className="space-y-1">
            {phrases.map((p) => (
              <div key={p.polish} className="flex items-center gap-2 bg-muted/40 rounded-lg px-2.5 py-2">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-foreground block">{p.polish}</span>
                  <span className="text-[10px] text-muted-foreground">{p.english}</span>
                </div>
                <span className="text-[10px] text-muted-foreground/60 italic hidden sm:block flex-shrink-0">{p.phonetic}</span>
                <SpeakButton text={p.polish} size="sm" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </PracticeReferenceCard>
);
