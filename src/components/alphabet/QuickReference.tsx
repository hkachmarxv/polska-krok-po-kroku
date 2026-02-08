import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { alphabetEntries, digraphs } from '@/data/alphabetData';

export const QuickReference = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="font-display font-bold text-sm text-foreground">Quick Reference Card</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4">
          {/* Special letters */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Polish-Specific Letters
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {alphabetEntries
                .filter(e => e.tier === 'unique')
                .map(e => (
                  <div key={e.letter} className="bg-muted/40 rounded-lg px-2 py-1.5 text-center">
                    <p className="font-display font-bold text-sm text-foreground">{e.letter.split(' ')[0]}</p>
                    <p className="text-[9px] text-muted-foreground">{e.approx}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Digraphs */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Digraphs (Two Letters, One Sound)
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {digraphs.map(d => (
                <div key={d.digraph} className="bg-muted/40 rounded-lg px-2 py-1.5 text-center">
                  <p className="font-display font-bold text-sm text-foreground">{d.digraph}</p>
                  <p className="text-[9px] text-muted-foreground">{d.approx}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stress rule */}
          <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
            <p className="text-xs font-semibold text-foreground">📌 Stress Rule</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Polish stress almost always falls on the <strong>second-to-last syllable</strong>.
              So "herbata" → her-<strong>BA</strong>-ta, "dziękuję" → dzię-<strong>KU</strong>-ję.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
