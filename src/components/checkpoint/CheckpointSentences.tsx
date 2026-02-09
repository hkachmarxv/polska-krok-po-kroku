import { useState, useMemo, useCallback } from 'react';
import { Shuffle, CheckCircle, XCircle } from 'lucide-react';
import { SpeakButton } from '@/components/SpeakButton';
import { useVoicePreference } from '@/hooks/useVoicePreference';
import type { SentenceQuestion } from '@/data/checkpointData';

interface Props {
  questions: SentenceQuestion[];
  onComplete: (correct: number) => void;
}

export const CheckpointSentences = ({ questions, onComplete }: Props) => {
  const { voice } = useVoicePreference();
  const [current, setCurrent] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);

  const q = questions[current];

  // Shuffle words for current sentence
  useMemo(() => {
    const words = q.correctPolish.replace(/[.!?,;:]/g, '').split(/\s+/);
    const shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    if (shuffled.join(' ') === words.join(' ') && words.length > 2) {
      [shuffled[0], shuffled[shuffled.length - 1]] = [shuffled[shuffled.length - 1], shuffled[0]];
    }
    setAvailableWords(shuffled);
    setSelectedWords([]);
    setResult(null);
  }, [current, q.correctPolish]);

  const handleWordTap = (word: string, index: number) => {
    if (result) return;
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);
    setSelectedWords(prev => [...prev, word]);
  };

  const handleSelectedTap = (word: string, index: number) => {
    if (result) return;
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setAvailableWords(prev => [...prev, word]);
  };

  const checkAnswer = () => {
    const correctWords = q.correctPolish.replace(/[.!?,;:]/g, '').split(/\s+/);
    const isCorrect = selectedWords.join(' ').toLowerCase() === correctWords.join(' ').toLowerCase();
    setResult(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      onComplete(score);
      return;
    }
    setCurrent(c => c + 1);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shuffle className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold text-foreground">Section 4: Sentences</h3>
        </div>
        <span className="text-xs text-muted-foreground">{current + 1}/{questions.length}</span>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 text-center">
        <p className="text-xs text-muted-foreground mb-1">Build this sentence in Polish:</p>
        <p className="font-display font-bold text-foreground">{q.english}</p>
      </div>

      {/* Selected words area */}
      <div className="min-h-[56px] bg-muted/30 border-2 border-dashed border-border rounded-xl p-3 flex flex-wrap gap-2">
        {selectedWords.length === 0 && (
          <p className="text-xs text-muted-foreground m-auto">Tap words below to build the sentence</p>
        )}
        {selectedWords.map((word, i) => (
          <button
            key={`s-${i}`}
            onClick={() => handleSelectedTap(word, i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              result === 'correct' ? 'bg-success/20 text-success border border-success/30'
                : result === 'incorrect' ? 'bg-destructive/20 text-destructive border border-destructive/30'
                : 'bg-primary/10 text-primary border border-primary/30'
            }`}
            disabled={result !== null}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2 justify-center">
        {availableWords.map((word, i) => (
          <button
            key={`a-${i}`}
            onClick={() => handleWordTap(word, i)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-card border border-border text-foreground hover:bg-muted transition-colors"
            disabled={result !== null}
          >
            {word}
          </button>
        ))}
      </div>

      {result && (
        <div className={`rounded-xl p-4 flex items-start gap-3 ${
          result === 'correct' ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'
        }`}>
          {result === 'correct' ? <CheckCircle className="w-5 h-5 text-success shrink-0" /> : <XCircle className="w-5 h-5 text-destructive shrink-0" />}
          <div className="flex-1">
            <p className={`text-sm font-bold ${result === 'correct' ? 'text-success' : 'text-destructive'}`}>
              {result === 'correct' ? 'Correct!' : 'Not quite right'}
            </p>
            {result === 'incorrect' && (
              <p className="text-xs text-muted-foreground mt-1">
                Correct: <span className="font-medium text-foreground">{q.correctPolish}</span>
              </p>
            )}
            <div className="mt-1">
              <SpeakButton text={q.correctPolish} voicePreference={voice} size="sm" />
            </div>
          </div>
        </div>
      )}

      {!result ? (
        <button onClick={checkAnswer} disabled={selectedWords.length === 0} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold disabled:opacity-40">
          Check
        </button>
      ) : (
        <button onClick={handleNext} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold">
          {current + 1 >= questions.length ? 'Next Section →' : 'Next Question →'}
        </button>
      )}
    </div>
  );
};
