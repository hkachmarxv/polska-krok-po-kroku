import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Loader2, ChevronRight, Lightbulb, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { AiLimitModal } from '@/components/AiLimitModal';
import { useAiUsage } from '@/hooks/useAiUsage';
import { useAuth } from '@/hooks/useAuth';

interface Drill {
  sentence: string;
  translation: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rule: string;
  tip: string;
}

const TOPICS = [
  { id: 'cases', label: 'Cases', emoji: '📐' },
  { id: 'verbs', label: 'Verb conjugation', emoji: '🔄' },
  { id: 'gender', label: 'Gender agreement', emoji: '⚤' },
  { id: 'prepositions', label: 'Prepositions', emoji: '📍' },
  { id: 'past-tense', label: 'Past tense', emoji: '⏪' },
  { id: 'future-tense', label: 'Future tense', emoji: '⏩' },
  { id: 'mixed', label: 'Mixed', emoji: '🎲' },
];

const DIFFICULTIES = [
  { id: 'easy', label: 'Easy', color: 'bg-success/10 text-success border-success/20' },
  { id: 'medium', label: 'Medium', color: 'bg-accent/10 text-accent border-accent/20' },
  { id: 'hard', label: 'Hard', color: 'bg-destructive/10 text-destructive border-destructive/20' },
];

const GrammarDrill = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonTopic = searchParams.get('topic');
  const lessonId = searchParams.get('lesson');
  const { session } = useAuth();
  const { canUse, remaining, limitInfo, handleLimitError, dismissLimit, status, refreshStatus } = useAiUsage();

  const [topic, setTopic] = useState(lessonTopic || 'mixed');
  const [difficulty, setDifficulty] = useState('medium');
  const [drill, setDrill] = useState<Drill | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [previousWords, setPreviousWords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDrill = async () => {
    if (!canUse) {
      refreshStatus();
      return;
    }

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
            Authorization: `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            topic: topic === 'mixed' ? undefined : topic,
            difficulty,
            previousWords: previousWords.slice(-10),
          }),
        }
      );

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: 'Request failed' }));
        if (handleLimitError(err)) return;
        throw new Error(err.error || `Error ${resp.status}`);
      }

      const data = await resp.json();
      setDrill(data);

      // Track used words to avoid repeats
      if (data.options?.[data.correctIndex]) {
        setPreviousWords(prev => [...prev, data.options[data.correctIndex]]);
      }
      refreshStatus();
    } catch (e: any) {
      setError(e.message || 'Failed to load drill');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return; // already answered
    setSelectedIndex(index);
    setScore(prev => ({
      correct: prev.correct + (index === drill!.correctIndex ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const isCorrect = selectedIndex !== null && selectedIndex === drill?.correctIndex;
  const isAnswered = selectedIndex !== null;

  return (
    <div className="min-h-screen bg-background">
      {limitInfo && <AiLimitModal limitInfo={limitInfo} onDismiss={dismissLimit} />}

      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="font-display text-base font-bold">
            📝 {lessonId ? `Lesson ${lessonId} Drill` : 'Grammar Drills'}
          </h1>
          <div className="flex items-center gap-2">
            {status && remaining !== Infinity && (
              <span className="text-xs text-muted-foreground">{remaining} left</span>
            )}
            {score.total > 0 && (
              <span className="text-sm font-bold text-primary">
                {score.correct}/{score.total}
              </span>
            )}
            {score.total === 0 && !status && <div />}
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Topic & Difficulty Selectors */}
        {!drill && !loading && (
          <>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Grammar Topic</p>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTopic(t.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      topic === t.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card border-border text-muted-foreground hover:border-primary/30'
                    }`}
                  >
                    {t.emoji} {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-2">Difficulty</p>
              <div className="flex gap-2">
                {DIFFICULTIES.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d.id)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      difficulty === d.id ? d.color + ' border-current' : 'bg-card border-border text-muted-foreground'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={fetchDrill}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-4 font-bold transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Drill
            </button>
          </>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
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
          <div className="space-y-5">
            {/* Sentence */}
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Fill in the blank</p>
              <p className="font-display text-xl font-bold text-foreground leading-relaxed">
                {drill.sentence.split('___').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className={`inline-block min-w-[80px] border-b-2 mx-1 ${
                        isAnswered
                          ? isCorrect
                            ? 'border-success text-success'
                            : 'border-destructive text-destructive'
                          : 'border-primary/40'
                      }`}>
                        {isAnswered ? drill.options[drill.correctIndex] : '\u00A0\u00A0\u00A0\u00A0\u00A0'}
                      </span>
                    )}
                  </span>
                ))}
              </p>
              <p className="text-sm text-muted-foreground mt-3 italic">{drill.translation}</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {drill.options.map((opt, i) => {
                let optClass = 'bg-card border-border hover:border-primary/40 hover:bg-primary/5';
                if (isAnswered) {
                  if (i === drill.correctIndex) {
                    optClass = 'bg-success/10 border-success text-success';
                  } else if (i === selectedIndex) {
                    optClass = 'bg-destructive/10 border-destructive text-destructive';
                  } else {
                    optClass = 'bg-card border-border opacity-50';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={isAnswered}
                    className={`border-2 rounded-xl py-4 px-3 font-bold text-lg transition-all ${optClass} ${
                      !isAnswered ? 'active:scale-95' : ''
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isAnswered && i === drill.correctIndex && <CheckCircle2 className="w-5 h-5" />}
                      {isAnswered && i === selectedIndex && i !== drill.correctIndex && <XCircle className="w-5 h-5" />}
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {isAnswered && (
              <div className={`rounded-2xl p-5 animate-fade-in ${isCorrect ? 'bg-success/5 border border-success/20' : 'bg-destructive/5 border border-destructive/20'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                  <p className="font-display font-bold text-foreground">
                    {isCorrect ? 'Correct! 🎉' : 'Not quite — here\'s why:'}
                  </p>
                </div>
                <p className="text-sm text-foreground mb-3">{drill.explanation}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                    📐 {drill.rule}
                  </span>
                </div>
                {drill.tip && (
                  <div className="mt-3 flex items-start gap-2 bg-accent/10 rounded-lg px-3 py-2">
                    <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-foreground">{drill.tip}</p>
                  </div>
                )}
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={fetchDrill}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-4 font-bold transition-colors animate-fade-in"
              >
                Next Exercise
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Score Summary */}
        {score.total >= 5 && !loading && (
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Session score</p>
            <p className="font-display text-2xl font-bold text-foreground">
              {Math.round((score.correct / score.total) * 100)}%
            </p>
            <p className="text-xs text-muted-foreground">{score.correct} correct out of {score.total}</p>
            <button
              onClick={() => { setScore({ correct: 0, total: 0 }); setDrill(null); setPreviousWords([]); }}
              className="mt-2 text-sm text-primary font-medium hover:underline flex items-center gap-1 mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset session
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default GrammarDrill;
