import { useNavigate } from 'react-router-dom';
import { Languages, MessageCircle } from 'lucide-react';

const links = [
  {
    label: 'Alphabet & Sounds',
    description: 'Polish letters & pronunciation',
    icon: Languages,
    to: '/alphabet',
    color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  },
  {
    label: 'Grammar Chat',
    description: 'Ask AI grammar questions',
    icon: MessageCircle,
    to: '/grammar',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
];

export const QuickLinksRow = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {links.map((l) => (
        <button
          key={l.to}
          onClick={() => navigate(l.to)}
          className="flex-1 min-w-[140px] bg-card border border-border rounded-xl p-3 flex items-center gap-2.5 hover:border-primary/30 active:scale-[0.98] transition-all text-left"
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${l.color}`}>
            <l.icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-foreground block truncate">{l.label}</span>
            <span className="text-[10px] text-muted-foreground block truncate">{l.description}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
