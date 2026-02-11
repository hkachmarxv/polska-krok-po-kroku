import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface PracticeReferenceCardProps {
  emoji: string;
  titlePl: string;
  titleEn: string;
  grammarTip?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const PracticeReferenceCard = ({
  emoji,
  titlePl,
  titleEn,
  grammarTip,
  defaultOpen = false,
  children,
}: PracticeReferenceCardProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors">
            <span className="text-2xl flex-shrink-0">{emoji}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-foreground text-sm">{titleEn}</h3>
              <p className="text-xs text-muted-foreground">{titlePl}</p>
            </div>
            <ChevronDown
              className={cn(
                'w-4 h-4 text-muted-foreground transition-transform flex-shrink-0',
                open && 'rotate-180'
              )}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-3">
            {grammarTip && (
              <div className="bg-primary/5 border border-primary/10 rounded-xl px-3 py-2 flex items-start gap-2">
                <span className="text-sm flex-shrink-0">💡</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{grammarTip}</p>
              </div>
            )}
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
