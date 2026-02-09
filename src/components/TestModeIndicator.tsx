import { useTestMode } from '@/hooks/useTestMode';

export const TestModeIndicator = () => {
  const { isTestMode } = useTestMode();

  if (!isTestMode) return null;

  return (
    <div className="fixed bottom-20 right-3 z-50 bg-destructive text-destructive-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse select-none pointer-events-none">
      TEST MODE
    </div>
  );
};
