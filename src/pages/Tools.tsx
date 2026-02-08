import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircleQuestion, PenLine, Layers } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';

const Tools = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center gap-2">
          <span className="text-2xl">🇵🇱</span>
          <h1 className="font-display text-xl font-bold text-foreground">Tools</h1>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-3">
        <button
          onClick={() => navigate('/grammar')}
          className="w-full bg-card border border-border rounded-2xl p-4 flex items-center justify-between card-hover group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <MessageCircleQuestion className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Grammar Assistant</p>
              <p className="text-xs text-muted-foreground">Ask why a word takes a specific form</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/grammar-drill')}
          className="w-full bg-card border border-border rounded-2xl p-4 flex items-center justify-between card-hover group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <PenLine className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Grammar Drills</p>
              <p className="text-xs text-muted-foreground">Choose the correct word form in sentences</p>
            </div>
          </div>
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Tools;
