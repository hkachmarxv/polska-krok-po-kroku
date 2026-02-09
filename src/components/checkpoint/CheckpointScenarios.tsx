import { useState } from 'react';
import { MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import type { ScenarioQuestion } from '@/data/checkpointData';

interface Props {
  questions: ScenarioQuestion[];
  onComplete: (correct: number) => void;
}

export const CheckpointScenarios = ({ questions, onComplete }: Props) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[current];

  const handleCheck = () => {
    if (selected === null) return;
    setAnswered(true);
    if (selected === q.correctIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      onComplete(score);
      return;
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold text-foreground">Section 5: Real-Life</h3>
        </div>
        <span className="text-xs text-muted-foreground">{current + 1}/{questions.length}</span>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-1">Situation:</p>
        <p className="font-display font-bold text-foreground text-sm">{q.scenario}</p>
      </div>

      <p className="text-sm font-medium text-muted-foreground">What would you say?</p>

      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.correctIndex;
          const isSelected = idx === selected;
          return (
            <button
              key={idx}
              onClick={() => !answered && setSelected(idx)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                answered
                  ? isCorrect
                    ? 'border-success bg-success/10 text-success'
                    : isSelected
                      ? 'border-destructive bg-destructive/10 text-destructive'
                      : 'border-border bg-card text-muted-foreground'
                  : isSelected
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-foreground hover:border-primary/40'
              }`}
              disabled={answered}
            >
              <div className="flex items-center gap-2">
                {answered && isCorrect && <CheckCircle className="w-4 h-4 text-success shrink-0" />}
                {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive shrink-0" />}
                {opt}
              </div>
            </button>
          );
        })}
      </div>

      {!answered ? (
        <button onClick={handleCheck} disabled={selected === null} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold disabled:opacity-40">
          Check Answer
        </button>
      ) : (
        <button onClick={handleNext} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold">
          {current + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  );
};
