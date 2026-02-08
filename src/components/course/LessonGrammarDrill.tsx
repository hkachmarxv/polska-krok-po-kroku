import { useState } from 'react';
import { Loader2, ChevronRight, Lightbulb, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Lesson } from '@/data/courseTypes';

interface Drill {
  sentence: string;
  translation: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rule: string;
  tip: string;
}

interface Props {
  lesson: Lesson;
  onComplete?: () => void;
}

export const LessonGrammarDrill = ({ lesson, onComplete }: Props) => {
  const [drill, setDrill] = useState<Drill | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [previousWords, setPreviousWords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const topicString = lesson.grammarTopics.join(', ');

  const fetchDrill = async () => {
    setLoading(true);
    setSelectedIndex(null);
    setError(null);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/grammar-drill`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            topic: topicString,
            difficulty: 'medium',
            previousWords: previousWords.slice(-10),
            lessonContext: `Lesson ${lesson.id}: ${lesson.title} (${lesson.titleEnglish}). Grammar topics: ${topicString}. Use vocabulary from: ${lesson.vocabulary.slice(0, 10).map(v => `${v.polish} (${v.english})`).join(', ')}`,
          }),
        }
      );

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(err.error || `Error ${resp.status}`);
      }

      const data = await resp.json();
      setDrill(data);

      if (data.options?.[data.correctIndex]) {
        setPreviousWords(prev => [...prev, data.options[data.correctIndex]]);
      }
    } catch (e: any) {
      setError(e.message || 'Failed to load drill');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    setScore(prev => ({
      correct: prev.correct + (index === drill!.correctIndex ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const isCorrect = selectedIndex !== null && selectedIndex === drill?.correctIndex;
  const isAnswered = selectedIndex !== null;

  return (
    <div className="py-4 space-y-5">
      {/* Info */}
      {!drill && !loading && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-sm text-foreground font-medium mb-1">Grammar Topics for this Lesson</p>
            <div className="flex flex-wrap gap-1.5 justify-center mt-2">
              {lesson.grammarTopics.map((t, i) => (
                <span key={i} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={fetchDrill}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-4 font-bold transition-colors text-lg"
          >
            Start Grammar Drill
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Generating exercise...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <button onClick={fetchDrill} className="mt-2 text-sm font-medium text-primary hover:underline">
            Try again
          </button>
        </div>
      )}

      {/* Drill Card */}
      {drill && !loading && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Fill in the blank</p>
            <p className="font-display text-lg font-bold text-foreground leading-relaxed">
              {drill.sentence.split('___').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className={`inline-block min-w-[70px] border-b-2 mx-1 ${
                      isAnswered
                        ? isCorrect ? 'border-success text-success' : 'border-destructive text-destructive'
                        : 'border-primary/40'
                    }`}>
                      {isAnswered ? drill.options[drill.correctIndex] : '\u00A0\u00A0\u00A0\u00A0'}
                    </span>
                  )}
                </span>
              ))}
            </p>
            <p className="text-sm text-muted-foreground mt-2 italic">{drill.translation}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {drill.options.map((opt, i) => {
              let optClass = 'bg-card border-border hover:border-primary/40';
              if (isAnswered) {
                if (i === drill.correctIndex) optClass = 'bg-success/10 border-success text-success';
                else if (i === selectedIndex) optClass = 'bg-destructive/10 border-destructive text-destructive';
                else optClass = 'bg-card border-border opacity-50';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className={`border-2 rounded-xl py-3 px-3 font-bold transition-all ${optClass} ${!isAnswered ? 'active:scale-95' : ''}`}
                >
                  <span className="flex items-center justify-center gap-1.5 text-sm">
                    {isAnswered && i === drill.correctIndex && <CheckCircle2 className="w-4 h-4" />}
                    {isAnswered && i === selectedIndex && i !== drill.correctIndex && <XCircle className="w-4 h-4" />}
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className={`rounded-xl p-4 animate-fade-in ${isCorrect ? 'bg-success/5 border border-success/20' : 'bg-destructive/5 border border-destructive/20'}`}>
              <div className="flex items-center gap-2 mb-1.5">
                {isCorrect ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />}
                <p className="font-display font-bold text-foreground text-sm">
                  {isCorrect ? 'Correct! 🎉' : 'Not quite — here\'s why:'}
                </p>
              </div>
              <p className="text-sm text-foreground mb-2">{drill.explanation}</p>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">📐 {drill.rule}</span>
              {drill.tip && (
                <div className="mt-2 flex items-start gap-2 bg-accent/10 rounded-lg px-3 py-2">
                  <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-foreground">{drill.tip}</p>
                </div>
              )}
            </div>
          )}

          {isAnswered && (
            <button
              onClick={fetchDrill}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 font-bold transition-colors animate-fade-in"
            >
              Next Exercise <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Score */}
      {score.total >= 3 && !loading && (
        <div className="bg-card border border-border rounded-lg p-3 text-center space-y-2">
          <p className="text-xs text-muted-foreground">Session: {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)</p>
          {onComplete && (
            <button
              onClick={onComplete}
              className="w-full bg-success text-success-foreground px-6 py-3 rounded-xl font-bold"
            >
              ✅ Complete Step
            </button>
          )}
          <button
            onClick={() => { setScore({ correct: 0, total: 0 }); setDrill(null); setPreviousWords([]); }}
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1 mx-auto"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      )}
    </div>
  );
};
