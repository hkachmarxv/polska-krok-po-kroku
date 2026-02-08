import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, Timer, Trophy, Zap } from 'lucide-react';
import { Lesson } from '@/data/courseTypes';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

interface Props {
  lesson: Lesson;
}

interface MatchCard {
  id: string;
  text: string;
  type: 'polish' | 'english';
  wordId: string;
  matched: boolean;
}

export const LessonMatchGame = ({ lesson }: Props) => {
  const { recordCardResult } = useProgress();
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selected, setSelected] = useState<MatchCard | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [flashCorrect, setFlashCorrect] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pairCount = 6;

  const initGame = useCallback(() => {
    // Pick 6 random words from lesson vocabulary
    const shuffledVocab = [...lesson.vocabulary].sort(() => Math.random() - 0.5);
    const picked = shuffledVocab.slice(0, Math.min(pairCount, shuffledVocab.length));

    const polishCards: MatchCard[] = picked.map(w => ({
      id: `pl_${w.id}`,
      text: w.polish,
      type: 'polish',
      wordId: w.id,
      matched: false,
    }));

    const englishCards: MatchCard[] = picked.map(w => ({
      id: `en_${w.id}`,
      text: w.english,
      type: 'english',
      wordId: w.id,
      matched: false,
    }));

    // Shuffle each column independently
    const shuffleArr = <T,>(arr: T[]) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    setCards([...shuffleArr(polishCards), ...shuffleArr(englishCards)]);
    setSelected(null);
    setMatchedCount(0);
    setMistakes(0);
    setElapsed(0);
    setGameState('playing');

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setElapsed(t => t + 1), 1000);
  }, [lesson.vocabulary]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameState === 'complete' && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [gameState]);

  const handleCardTap = useCallback((card: MatchCard) => {
    if (card.matched || gameState !== 'playing') return;

    if (!selected) {
      setSelected(card);
      return;
    }

    // Can't select same type
    if (selected.type === card.type) {
      setSelected(card);
      return;
    }

    // Check match
    if (selected.wordId === card.wordId) {
      // Correct match
      setFlashCorrect(card.wordId);
      setTimeout(() => setFlashCorrect(null), 500);

      setCards(prev => prev.map(c =>
        c.wordId === card.wordId ? { ...c, matched: true } : c
      ));
      recordCardResult(card.wordId, true);

      const newCount = matchedCount + 1;
      setMatchedCount(newCount);

      if (newCount >= Math.min(pairCount, lesson.vocabulary.length)) {
        setGameState('complete');
      }

      setSelected(null);
    } else {
      // Wrong match
      setShakeId(card.id);
      setMistakes(m => m + 1);
      recordCardResult(selected.wordId, false);

      setTimeout(() => {
        setShakeId(null);
        setSelected(null);
      }, 400);
    }
  }, [selected, gameState, matchedCount, lesson.vocabulary.length, recordCardResult]);

  const polishCards = cards.filter(c => c.type === 'polish');
  const englishCards = cards.filter(c => c.type === 'english');
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (lesson.vocabulary.length < 3) {
    return (
      <div className="py-12 text-center">
        <Zap className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">Not enough vocabulary for the matching game.</p>
      </div>
    );
  }

  if (gameState === 'ready') {
    return (
      <div className="py-12 text-center space-y-5">
        <div className="text-5xl">🎯</div>
        <h3 className="font-display text-xl font-bold text-foreground">Match Game</h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Tap a Polish word, then tap its English translation. Match all {Math.min(pairCount, lesson.vocabulary.length)} pairs as fast as you can!
        </p>
        <button
          onClick={initGame}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold text-lg"
        >
          Start
        </button>
      </div>
    );
  }

  if (gameState === 'complete') {
    const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    return (
      <div className="py-8 text-center space-y-4 animate-fade-in">
        <Trophy className="w-12 h-12 text-accent mx-auto" />
        <h3 className="font-display text-xl font-bold text-foreground">All Matched!</h3>
        <div className="text-3xl">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {formatTime(elapsed)}</span>
          <span>{mistakes} mistake{mistakes !== 1 ? 's' : ''}</span>
        </div>
        <button
          onClick={initGame}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Timer className="w-4 h-4" />
          <span className="font-mono">{formatTime(elapsed)}</span>
        </div>
        <p className="text-sm font-medium text-foreground">
          {matchedCount}/{Math.min(pairCount, lesson.vocabulary.length)} matched
        </p>
        <p className="text-xs text-muted-foreground">{mistakes} miss{mistakes !== 1 ? 'es' : ''}</p>
      </div>

      {/* Game grid — two columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Polish column */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase text-center mb-1">🇵🇱 Polish</p>
          {polishCards.map(card => (
            <button
              key={card.id}
              onClick={() => handleCardTap(card)}
              disabled={card.matched}
              className={cn(
                'w-full px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 text-center',
                card.matched
                  ? 'opacity-20 scale-95 border-success/30 bg-success/5 text-success cursor-default'
                  : selected?.id === card.id
                  ? 'border-primary bg-primary/10 text-primary scale-105 shadow-md'
                  : flashCorrect === card.wordId
                  ? 'border-success bg-success/10 text-success'
                  : shakeId === card.id
                  ? 'border-destructive bg-destructive/10 text-destructive animate-[shake_0.3s_ease-in-out]'
                  : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5'
              )}
            >
              {card.text}
            </button>
          ))}
        </div>

        {/* English column */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase text-center mb-1">🇬🇧 English</p>
          {englishCards.map(card => (
            <button
              key={card.id}
              onClick={() => handleCardTap(card)}
              disabled={card.matched}
              className={cn(
                'w-full px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 text-center',
                card.matched
                  ? 'opacity-20 scale-95 border-success/30 bg-success/5 text-success cursor-default'
                  : selected?.id === card.id
                  ? 'border-primary bg-primary/10 text-primary scale-105 shadow-md'
                  : flashCorrect === card.wordId
                  ? 'border-success bg-success/10 text-success'
                  : shakeId === card.id
                  ? 'border-destructive bg-destructive/10 text-destructive animate-[shake_0.3s_ease-in-out]'
                  : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5'
              )}
            >
              {card.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
