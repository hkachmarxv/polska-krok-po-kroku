import { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { SpeakButton } from '@/components/SpeakButton';
import { cn } from '@/lib/utils';
import type { AlphabetEntry, DifficultyTier } from '@/data/alphabetData';

const tierColors: Record<DifficultyTier, { bg: string; border: string; badge: string; label: string }> = {
  familiar: {
    bg: 'bg-success/5',
    border: 'border-success/20 hover:border-success/40',
    badge: 'bg-success/15 text-success',
    label: 'Same as English',
  },
  similar: {
    bg: 'bg-accent/5',
    border: 'border-accent/20 hover:border-accent/40',
    badge: 'bg-accent/15 text-accent',
    label: 'Slightly different',
  },
  unique: {
    bg: 'bg-destructive/5',
    border: 'border-destructive/20 hover:border-destructive/40',
    badge: 'bg-destructive/15 text-destructive',
    label: 'Uniquely Polish',
  },
};

interface AlphabetGridProps {
  entries: AlphabetEntry[];
}

export const AlphabetGrid = ({ entries }: AlphabetGridProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<DifficultyTier | 'all'>('all');

  const filtered = filter === 'all' ? entries : entries.filter(e => e.tier === filter);

  return (
    <div className="space-y-4">
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'familiar', 'similar', 'unique'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border',
              filter === f
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary/40'
            )}
          >
            {f === 'all' ? 'All Letters' : tierColors[f].label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {filtered.map((entry, i) => {
          const colors = tierColors[entry.tier];
          const isExpanded = expandedIndex === i;

          return (
            <button
              key={entry.letter}
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
              className={cn(
                'rounded-2xl border-2 p-3 text-left transition-all',
                colors.bg,
                colors.border,
                isExpanded && 'col-span-2 sm:col-span-3'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="font-display text-xl font-bold text-foreground leading-tight">
                    {entry.letter}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">{entry.ipa}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <SpeakButton text={entry.ttsText} size="sm" />
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
              </div>

              <p className="text-xs text-foreground/80 mt-1.5">{entry.approx}</p>

              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-xs font-semibold text-primary">{entry.example}</span>
                <span className="text-[10px] text-muted-foreground">— {entry.exampleTranslation}</span>
              </div>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
                  <p className="text-xs text-foreground/70">
                    💡 <span className="font-medium">{entry.mnemonic}</span>
                  </p>
                  <span className={cn('inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold', colors.badge)}>
                    {colors.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
