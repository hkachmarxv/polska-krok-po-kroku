import { useState } from 'react';
import { Volume2, CheckCircle, XCircle } from 'lucide-react';
import { SpeakButton } from '@/components/SpeakButton';
import { useVoicePreference } from '@/hooks/useVoicePreference';
import type { ListeningQuestion } from '@/data/checkpointData';

interface Props {
  questions: ListeningQuestion[];
  onComplete: (correct: number) => void;
}

export const CheckpointListening = ({ questions, onComplete }: Props) => {
  const { voice } = useVoicePreference();
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
    const newScore = selected === q.correctIndex ? score : score; // score already incremented in handleCheck
    if (current + 1 >= questions.length) {
      onComplete(newScore);
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
          <Volume2 className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold text-foreground">Section 1: Listening</h3>
        </div>
        <span className="text-xs text-muted-foreground">{current + 1}/{questions.length}</span>
      </div>

      <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
        <p className="text-xs text-muted-foreground font-medium mb-2">Listen to the dialogue:</p>
        {q.dialogueLines.map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary w-14 shrink-0">{line.speaker}:</span>
            <span className="text-sm text-foreground flex-1">{line.polish}</span>
            <SpeakButton
              text={line.polish}
              voicePreference={voice}
              speakerGender={line.speaker === 'A' || line.speaker === 'Kelner' ? 'male' : 'female'}
              size="sm"
            />
          </div>
        ))}
      </div>

      <p className="font-display font-bold text-foreground text-sm">{q.question}</p>

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
          {current + 1 >= questions.length ? 'Next Section →' : 'Next Question →'}
        </button>
      )}
    </div>
  );
};
