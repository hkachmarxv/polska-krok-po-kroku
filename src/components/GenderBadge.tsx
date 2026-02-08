import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GenderBadgeProps {
  gender: 'masculine' | 'feminine' | 'neuter';
  className?: string;
}

const genderConfig = {
  masculine: {
    icon: '♂',
    label: 'He form',
    tooltip: 'He form (masculine)',
    bg: 'bg-primary/10',
    text: 'text-primary',
    border: 'border-primary/20',
  },
  feminine: {
    icon: '♀',
    label: 'She form',
    tooltip: 'She form (feminine)',
    bg: 'bg-pink-500/10',
    text: 'text-pink-500',
    border: 'border-pink-500/20',
  },
  neuter: {
    icon: '⚬',
    label: 'It form',
    tooltip: 'It form (neuter)',
    bg: 'bg-muted',
    text: 'text-muted-foreground',
    border: 'border-border',
  },
};

export const GenderBadge = ({ gender, className = '' }: GenderBadgeProps) => {
  const config = genderConfig[gender];

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border cursor-help ${config.bg} ${config.text} ${config.border} ${className}`}
          >
            <span className="text-xs leading-none">{config.icon}</span>
            {config.label}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {config.tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
