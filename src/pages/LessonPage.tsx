import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Lock, Crown, Check, CircleDot } from 'lucide-react';
import { getLessonById, lessons } from '@/data/a1Course';
import { useProgress } from '@/hooks/useProgress';
import { useSubscription } from '@/hooks/useSubscription';
import { Progress } from '@/components/ui/progress';
import { LessonLearnTab } from '@/components/course/LessonLearnTab';
import { LessonFlashcards } from '@/components/course/LessonFlashcards';
import { LessonQuiz } from '@/components/course/LessonQuiz';
import { LessonGrammarDrill } from '@/components/course/LessonGrammarDrill';
import { LessonSentenceBuilder } from '@/components/course/LessonSentenceBuilder';
import { LessonMatchGame } from '@/components/course/LessonMatchGame';
import { cn } from '@/lib/utils';

const STEPS = [
  { step: 1, emoji: '📖', title: 'Learn the Words', subtitle: 'Study vocabulary & grammar', key: 'learn' },
  { step: 2, emoji: '🃏', title: 'Flashcards', subtitle: 'Practice with spaced repetition', key: 'flashcards' },
  { step: 3, emoji: '🔨', title: 'Build Sentences', subtitle: 'Arrange words in correct order', key: 'build' },
  { step: 4, emoji: '🎯', title: 'Match Game', subtitle: 'Match Polish-English pairs', key: 'match' },
  { step: 5, emoji: '📐', title: 'Grammar Drill', subtitle: 'AI-powered grammar practice', key: 'drill' },
  { step: 6, emoji: '📝', title: 'Final Quiz', subtitle: 'Score 70%+ to complete the lesson', key: 'quiz' },
] as const;

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { progress, isStepCompleted, completeStep } = useProgress();
  const { isLessonAccessible } = useSubscription();
  const id = parseInt(lessonId || '1', 10);
  const lesson = getLessonById(id);

  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState<number | null>(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const n = parseInt(stepParam, 10);
      if (n >= 1 && n <= STEPS.length) return n;
    }
    return null;
  });

  const completedLessons = progress.lessonsCompleted || [];
  const isUnlocked = id === 1 || completedLessons.includes(id - 1);
  const isCompleted = completedLessons.includes(id);

  const completedStepsCount = useMemo(() => {
    return STEPS.filter(s => isStepCompleted(id, s.step)).length;
  }, [id, isStepCompleted]);

  const getStepStatus = (stepNum: number): 'done' | 'available' => {
    return isStepCompleted(id, stepNum) ? 'done' : 'available';
  };

  const recommendedStep = STEPS.find(s => !isStepCompleted(id, s.step))?.step ?? null;

  const handleStepComplete = (stepNum: number) => {
    completeStep(id, stepNum);
    setActiveStep(null);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Lesson not found</p>
      </div>
    );
  }

  if (!isLessonAccessible(id)) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <Crown className="w-12 h-12 text-primary" />
        <h2 className="font-display text-xl font-bold text-foreground">Premium Lesson</h2>
        <p className="text-muted-foreground text-center">Upgrade to unlock Lessons 2-20 and all AI tools.</p>
        <button onClick={() => navigate('/pricing')} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium">View Plans</button>
        <button onClick={() => navigate('/course')} className="text-sm text-muted-foreground hover:underline">Back to Course</button>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <Lock className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground text-center">Complete Lesson {id - 1} first to unlock this lesson.</p>
        <button onClick={() => navigate('/course')} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium">Back to Course</button>
      </div>
    );
  }

  // Render active step full-screen
  if (activeStep !== null) {
    const stepInfo = STEPS.find(s => s.step === activeStep)!;
    return (
      <div className="min-h-screen bg-background pb-4">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => setActiveStep(null)} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-sm font-bold truncate">
                {stepInfo.emoji} Step {stepInfo.step}: {stepInfo.title}
              </h1>
              <p className="text-xs text-muted-foreground">Lesson {lesson.id} · {lesson.titleEnglish}</p>
            </div>
          </div>
        </header>
        <main className="container max-w-2xl mx-auto px-4 py-4">
          {activeStep === 1 && <LessonLearnTab lesson={lesson} onComplete={() => handleStepComplete(1)} />}
          {activeStep === 2 && <LessonFlashcards lesson={lesson} onComplete={() => handleStepComplete(2)} />}
          {activeStep === 3 && <LessonSentenceBuilder lesson={lesson} onComplete={() => handleStepComplete(3)} />}
          {activeStep === 4 && <LessonMatchGame lesson={lesson} onComplete={() => handleStepComplete(4)} />}
          {activeStep === 5 && <LessonGrammarDrill lesson={lesson} onComplete={() => handleStepComplete(5)} />}
          {activeStep === 6 && <LessonQuiz lesson={lesson} onComplete={() => handleStepComplete(6)} />}
        </main>
      </div>
    );
  }

  // Step list view
  return (
    <div className="min-h-screen bg-background pb-4">
      {isCompleted && (
        <div className="bg-success/10 border-b border-success/20 px-4 py-2 text-center">
          <p className="text-xs font-medium text-success">✅ Lesson completed — revisit any step anytime</p>
        </div>
      )}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/course')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-sm font-bold truncate">
              {lesson.emoji} Lesson {lesson.id}: {lesson.title}
            </h1>
            <p className="text-xs text-muted-foreground">{lesson.titleEnglish}</p>
          </div>
          {id < lessons.length && isCompleted && (
            <button
              onClick={() => navigate(`/lesson/${id + 1}`)}
              className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
            >
              Next <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground">Progress</p>
            <p className="text-xs font-bold text-foreground">{completedStepsCount} / {STEPS.length} steps</p>
          </div>
          <Progress value={(completedStepsCount / STEPS.length) * 100} className="h-2" />
        </div>

        {/* Step cards */}
        <div className="space-y-3">
        {STEPS.map((step) => {
            const isDone = isStepCompleted(id, step.step);
            const isRecommended = step.step === recommendedStep;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200',
                  isDone
                    ? 'bg-success/5 border-success/30 hover:border-success/50'
                    : isRecommended
                    ? 'bg-card border-primary/40 hover:border-primary shadow-sm hover:shadow-md'
                    : 'bg-card border-border hover:border-primary/30 hover:shadow-sm'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold',
                  isDone
                    ? 'bg-success text-success-foreground'
                    : isRecommended
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {isDone ? <Check className="w-5 h-5" /> :
                   isRecommended ? <CircleDot className="w-5 h-5" /> :
                   step.step}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{step.emoji}</span>
                    <h3 className="font-display font-bold text-sm text-foreground">
                      {step.title}
                    </h3>
                    {isRecommended && !isDone && (
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">Next</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.subtitle}</p>
                </div>

                <ChevronRight className={cn(
                  'w-5 h-5 flex-shrink-0',
                  isDone ? 'text-success/60' : 'text-muted-foreground/40'
                )} />
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default LessonPage;
