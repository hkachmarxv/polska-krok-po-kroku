import { useState, useCallback } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CheckpointListening } from '@/components/checkpoint/CheckpointListening';
import { CheckpointReading } from '@/components/checkpoint/CheckpointReading';
import { CheckpointGrammar } from '@/components/checkpoint/CheckpointGrammar';
import { CheckpointSentences } from '@/components/checkpoint/CheckpointSentences';
import { CheckpointScenarios } from '@/components/checkpoint/CheckpointScenarios';
import { CheckpointResults } from '@/components/checkpoint/CheckpointResults';
import {
  listeningQuestions, readingQuestions, grammarQuestions,
  sentenceQuestions, scenarioQuestions,
  CHECKPOINT_PASS_THRESHOLD, CHECKPOINT_SECTION_MIN,
  TOTAL_QUESTIONS, type CheckpointScore,
} from '@/data/checkpointData';
import { useProgress } from '@/hooks/useProgress';
import { Progress } from '@/components/ui/progress';

type Stage = 'intro' | 'listening' | 'reading' | 'grammar' | 'sentences' | 'scenarios' | 'results';

const STAGES: Stage[] = ['intro', 'listening', 'reading', 'grammar', 'sentences', 'scenarios', 'results'];

const A1Checkpoint = () => {
  const navigate = useNavigate();
  const { saveCheckpointResult } = useProgress();
  const [stage, setStage] = useState<Stage>('intro');
  const [scores, setScores] = useState({
    listening: 0, reading: 0, grammar: 0, sentences: 0, scenarios: 0,
  });
  const [finalScore, setFinalScore] = useState<CheckpointScore | null>(null);

  const stageIndex = STAGES.indexOf(stage);
  const progressPct = stage === 'results' ? 100 : Math.round(((stageIndex - 1) / 5) * 100);

  const handleSectionComplete = useCallback((sectionKey: keyof typeof scores, correct: number) => {
    const updated = { ...scores, [sectionKey]: correct };
    setScores(updated);

    const sectionOrder: Stage[] = ['listening', 'reading', 'grammar', 'sentences', 'scenarios'];
    const currentIdx = sectionOrder.indexOf(sectionKey as Stage);

    if (currentIdx < sectionOrder.length - 1) {
      setStage(sectionOrder[currentIdx + 1]);
    } else {
      // Final section done — compute results
      const listening = { correct: updated.listening, total: listeningQuestions.length };
      const reading = { correct: updated.reading, total: readingQuestions.length };
      const grammar = { correct: updated.grammar, total: grammarQuestions.length };
      const sentences = { correct: updated.sentences, total: sentenceQuestions.length };
      const scenarios = { correct: updated.scenarios, total: scenarioQuestions.length };

      const totalCorrect = updated.listening + updated.reading + updated.grammar + updated.sentences + updated.scenarios;
      const percentage = Math.round((totalCorrect / TOTAL_QUESTIONS) * 100);

      const allSections = [listening, reading, grammar, sentences, scenarios];
      const allAboveMin = allSections.every(s => s.total === 0 || s.correct / s.total >= CHECKPOINT_SECTION_MIN);
      const passed = percentage >= CHECKPOINT_PASS_THRESHOLD * 100 && allAboveMin;

      const result: CheckpointScore = {
        listening, reading, grammar, sentences, scenarios,
        passed, totalCorrect, totalQuestions: TOTAL_QUESTIONS, percentage,
        date: new Date().toISOString(),
      };

      setFinalScore(result);
      saveCheckpointResult(passed, result);
      setStage('results');
    }
  }, [scores, saveCheckpointResult]);

  const handleRetry = () => {
    setStage('intro');
    setScores({ listening: 0, reading: 0, grammar: 0, sentences: 0, scenarios: 0 });
    setFinalScore(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/course')} className="p-1.5 hover:bg-muted rounded-lg">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2 flex-1">
              <Shield className="w-5 h-5 text-primary" />
              <h1 className="font-display text-lg font-bold text-foreground">A1 Final Exam</h1>
            </div>
            {stage !== 'intro' && stage !== 'results' && (
              <span className="text-xs font-medium text-muted-foreground capitalize">{stage}</span>
            )}
          </div>
          {stage !== 'intro' && stage !== 'results' && (
            <Progress value={progressPct} className="h-1.5 mt-2" />
          )}
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6">
        {stage === 'intro' && (
          <div className="space-y-6">
            <div className="text-center space-y-3 py-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground">CEFR A1 Competence Assessment</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                This assessment tests your Polish across 5 skill areas. You need 70% overall and at least 40% in each section to pass.
              </p>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Listening Comprehension', count: 5, icon: '🎧' },
                { name: 'Reading Comprehension', count: 5, icon: '📖' },
                { name: 'Vocabulary & Grammar', count: 10, icon: '✏️' },
                { name: 'Sentence Construction', count: 5, icon: '🔤' },
                { name: 'Functional Scenarios', count: 5, icon: '💬' },
              ].map(s => (
                <div key={s.name} className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-sm font-medium text-foreground flex-1">{s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.count} questions</span>
                </div>
              ))}
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 text-center">
              <p className="text-sm text-foreground font-medium">⏱ ~25 minutes • 30 questions • Unlimited retakes</p>
            </div>

            <button
              onClick={() => setStage('listening')}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg"
            >
              Begin Assessment
            </button>
          </div>
        )}

        {stage === 'listening' && (
          <CheckpointListening questions={listeningQuestions} onComplete={(c) => handleSectionComplete('listening', c)} />
        )}
        {stage === 'reading' && (
          <CheckpointReading questions={readingQuestions} onComplete={(c) => handleSectionComplete('reading', c)} />
        )}
        {stage === 'grammar' && (
          <CheckpointGrammar questions={grammarQuestions} onComplete={(c) => handleSectionComplete('grammar', c)} />
        )}
        {stage === 'sentences' && (
          <CheckpointSentences questions={sentenceQuestions} onComplete={(c) => handleSectionComplete('sentences', c)} />
        )}
        {stage === 'scenarios' && (
          <CheckpointScenarios questions={scenarioQuestions} onComplete={(c) => handleSectionComplete('scenarios', c)} />
        )}
        {stage === 'results' && finalScore && (
          <CheckpointResults score={finalScore} onRetry={handleRetry} />
        )}
      </main>
    </div>
  );
};

export default A1Checkpoint;
