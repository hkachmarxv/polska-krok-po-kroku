import { useLocation, useNavigate } from 'react-router-dom';
import { Home, GraduationCap, Dumbbell, MessageCircleQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
  { id: 'course', label: 'Course', icon: GraduationCap, path: '/course' },
  { id: 'practice', label: 'Practice', icon: Dumbbell, path: '/practice' },
  { id: 'ai-tutor', label: 'AI Tutor', icon: MessageCircleQuestion, path: '/grammar' },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = tabs.find(t => {
    if (t.path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(t.path);
  })?.id || 'home';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="container max-w-2xl mx-auto flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className={cn('w-5 h-5', isActive && 'text-primary')} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
