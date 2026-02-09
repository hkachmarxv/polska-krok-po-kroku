import { motion } from 'framer-motion';
import { Shield, RotateCcw, ArrowRight, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CHECKPOINT_PASS_THRESHOLD, CHECKPOINT_SECTION_MIN, type CheckpointScore } from '@/data/checkpointData';

interface Props {
  score: CheckpointScore;
  onRetry: () => void;
}

const sectionLabels: Record<string, string> = {
  listening: 'Listening Comprehension',
  reading: 'Reading Comprehension',
  grammar: 'Vocabulary & Grammar',
  sentences: 'Sentence Construction',
  scenarios: 'Functional Scenarios',
};

const lessonRecommendations: Record<string, string> = {
  listening: 'Review dialogues in Lessons 1, 6, 7, and 12',
  reading: 'Practice reading the dialogues and cultural notes in Lessons 6, 9, 13, 20',
  grammar: 'Strengthen grammar with drills in Lessons 3, 5, 8, 10, 12',
  sentences: 'Practice sentence building in Lessons 1, 6, 7, 12',
  scenarios: 'Review real-life vocabulary in Lessons 6, 9, 13, 15',
};

export const CheckpointResults = ({ score, onRetry }: Props) => {
  const navigate = useNavigate();
  const sections = ['listening', 'reading', 'grammar', 'sentences', 'scenarios'] as const;

  const failedSections = sections.filter(s => {
    const sec = score[s];
    return sec.total > 0 && sec.correct / sec.total < CHECKPOINT_SECTION_MIN;
  });

  return (
    <div className="space-y-6 py-4">
      {/* Result header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="text-center space-y-3"
      >
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${
          score.passed ? 'bg-success/15' : 'bg-destructive/15'
        }`}>
          {score.passed ? (
            <Shield className="w-10 h-10 text-success" />
          ) : (
            <XCircle className="w-10 h-10 text-destructive" />
          )}
        </div>

        <h2 className="font-display text-2xl font-bold text-foreground">
          {score.passed ? 'Congratulations! 🎉' : 'Not quite there yet'}
        </h2>

        <p className="text-muted-foreground text-sm">
          {score.passed
            ? "You've demonstrated A1-level Polish competence!"
            : `You scored ${score.percentage}%. You need at least ${Math.round(CHECKPOINT_PASS_THRESHOLD * 100)}% to pass.`
          }
        </p>

        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${
          score.passed ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
        }`}>
          {score.totalCorrect}/{score.totalQuestions} correct — {score.percentage}%
        </div>
      </motion.div>

      {/* Section breakdown */}
      <div className="space-y-2">
        {sections.map(s => {
          const sec = score[s];
          const pct = sec.total > 0 ? Math.round((sec.correct / sec.total) * 100) : 0;
          const belowMin = sec.total > 0 && sec.correct / sec.total < CHECKPOINT_SECTION_MIN;
          return (
            <div key={s} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
              belowMin ? 'border-destructive/30 bg-destructive/5' : 'border-border bg-card'
            }`}>
              <span className="text-sm font-medium text-foreground">{sectionLabels[s]}</span>
              <span className={`text-sm font-bold ${
                belowMin ? 'text-destructive' : pct >= 80 ? 'text-success' : 'text-foreground'
              }`}>
                {sec.correct}/{sec.total} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>

      {/* Recommendations for failed sections */}
      {!score.passed && failedSections.length > 0 && (
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 space-y-2">
          <p className="text-sm font-bold text-foreground">Focus areas:</p>
          {failedSections.map(s => (
            <p key={s} className="text-xs text-muted-foreground">
              • <span className="font-medium text-foreground">{sectionLabels[s]}</span>: {lessonRecommendations[s]}
            </p>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2 pt-2">
        {score.passed ? (
          <>
            <Button onClick={() => navigate('/course')} className="w-full font-bold py-6" size="lg">
              Back to Course <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onRetry} className="w-full font-bold py-6" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" /> Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate('/course')} className="w-full">
              Review Lessons First
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
