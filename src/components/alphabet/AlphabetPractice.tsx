import { useState, useCallback, useMemo } from 'react';
import { Volume2, Loader2, CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { practiceItems, type PracticeItem } from '@/data/alphabetData';

const ROUND_COUNT = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const AlphabetPractice = () => {
  const [items, setItems] = useState<PracticeItem[]>(() => shuffle(practiceItems).slice(0, ROUND_COUNT));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsPlaying, setTtsPlaying] = useState(false);

  const current = items[currentIndex];
  const isFinished = currentIndex >= items.length;
  const isCorrect = selected === current?.correctAnswer;
  const hasAnswered = selected !== null;

  const playSound = useCallback(async () => {
    if (!current || ttsLoading) return;
    setTtsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: current.ttsText }),
        }
      );
      if (!response.ok) throw new Error('TTS failed');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => {
        setTtsPlaying(false);
        URL.revokeObjectURL(url);
      };
      setTtsPlaying(true);
      await audio.play();
    } catch {
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(current.ttsText);
        utterance.lang = 'pl-PL';
        utterance.rate = 0.85;
        utterance.onstart = () => setTtsPlaying(true);
        utterance.onend = () => setTtsPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    } finally {
      setTtsLoading(false);
    }
  }, [current, ttsLoading]);

  const handleSelect = (option: string) => {
    if (hasAnswered) return;
    setSelected(option);
    if (option === current.correctAnswer) setScore(s => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setCurrentIndex(i => i + 1);
  };

  const handleRestart = () => {
    setItems(shuffle(practiceItems).slice(0, ROUND_COUNT));
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
  };

  if (isFinished) {
    const pct = Math.round((score / items.length) * 100);
    return (
      <div className="bg-card border border-border rounded-2xl p-6 text-center space-y-4 shadow-sm">
        <Trophy className="w-12 h-12 text-accent mx-auto" />
        <div>
          <p className="font-display font-bold text-xl text-foreground">{score}/{items.length} Correct!</p>
          <p className="text-sm text-muted-foreground mt-1">
            {pct >= 80 ? 'Amazing! You\'ve got a great ear for Polish sounds! 🎉' :
             pct >= 50 ? 'Good progress! Keep practising to sharpen your ear.' :
             'Keep going — Polish sounds take time to master!'}
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground">
          Round {currentIndex + 1} / {items.length}
        </p>
        <p className="text-xs font-bold text-primary">{score} pts</p>
      </div>

      {/* Prompt */}
      <div className="text-center space-y-3">
        <p className="text-sm text-foreground font-medium">Listen and identify the key sound:</p>
        <button
          onClick={playSound}
          disabled={ttsLoading}
          className={cn(
            'mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all hover:bg-primary/20',
            ttsPlaying && 'animate-pulse bg-primary/20'
          )}
        >
          {ttsLoading ? (
            <Loader2 className="w-7 h-7 text-primary animate-spin" />
          ) : (
            <Volume2 className="w-7 h-7 text-primary" />
          )}
        </button>
        <p className="text-[10px] text-muted-foreground">Tap to listen</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2.5">
        {current.options.map((opt) => {
          const isThis = selected === opt;
          const showCorrect = hasAnswered && opt === current.correctAnswer;
          const showWrong = hasAnswered && isThis && !isCorrect;

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={hasAnswered}
              className={cn(
                'py-3 px-4 rounded-xl border-2 font-display font-bold text-lg transition-all',
                !hasAnswered && 'border-border bg-card hover:border-primary/40 hover:bg-primary/5 text-foreground',
                showCorrect && 'border-success bg-success/10 text-success',
                showWrong && 'border-destructive bg-destructive/10 text-destructive',
                hasAnswered && !showCorrect && !showWrong && 'border-border/50 bg-muted/30 text-muted-foreground'
              )}
            >
              <div className="flex items-center justify-center gap-2">
                {showCorrect && <CheckCircle2 className="w-4 h-4" />}
                {showWrong && <XCircle className="w-4 h-4" />}
                {opt}
              </div>
            </button>
          );
        })}
      </div>

      {/* Next */}
      {hasAnswered && (
        <button
          onClick={handleNext}
          className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          {currentIndex < items.length - 1 ? 'Next →' : 'See Results'}
        </button>
      )}
    </div>
  );
};
