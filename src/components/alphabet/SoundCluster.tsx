import { SpeakButton } from '@/components/SpeakButton';
import type { SoundCluster as SoundClusterType } from '@/data/alphabetData';

interface SoundClusterProps {
  cluster: SoundClusterType;
}

export const SoundClusterCard = ({ cluster }: SoundClusterProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
      <div>
        <h3 className="font-display font-bold text-foreground text-base">{cluster.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{cluster.description}</p>
      </div>

      <div className="space-y-3">
        {cluster.pairs.map((pair) => (
          <div key={pair.label} className="space-y-1.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
              {pair.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {pair.sounds.map((sound) => (
                <div
                  key={sound.letter}
                  className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2 flex-1 min-w-[120px]"
                >
                  <SpeakButton text={sound.ttsText} size="sm" />
                  <div className="min-w-0">
                    <p className="font-display font-bold text-foreground text-sm">{sound.letter}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{sound.ipa}</p>
                    <p className="text-[10px] text-primary font-medium truncate">
                      {sound.example} <span className="text-muted-foreground">— {sound.meaning}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
