import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { lessons } from '@/data/a1Course';
import { useProgress } from '@/hooks/useProgress';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/BottomNav';

const CourseOverview = () => {
  const navigate = useNavigate();
  const { progress, getCategoryMastery } = useProgress();

  const completedLessons = progress.lessonsCompleted || [];
  const totalCompleted = completedLessons.length;
  const overallPct = Math.round((totalCompleted / lessons.length) * 100);

  const isUnlocked = (lessonId: number) => {
    if (lessonId === 1) return true;
    return completedLessons.includes(lessonId - 1);
  };

  const isCompleted = (lessonId: number) => completedLessons.includes(lessonId);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center gap-2">
          <span className="text-2xl">🇵🇱</span>
          <h1 className="font-display text-xl font-bold text-foreground">A1 Course</h1>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Progress Summary */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-foreground">Course Progress</span>
            </div>
            <span className="text-sm font-bold text-primary">{totalCompleted}/{lessons.length}</span>
          </div>
          <Progress value={overallPct} className="h-2.5" />
          <p className="text-xs text-muted-foreground mt-2">
            {totalCompleted === 0
              ? 'Start your Polish journey!'
              : totalCompleted === lessons.length
                ? 'Congratulations! Course complete! 🎉'
                : `${overallPct}% complete — keep going!`}
          </p>
        </div>

        {/* Lesson List */}
        <div className="space-y-3">
          {lessons.map((lesson) => {
            const unlocked = isUnlocked(lesson.id);
            const completed = isCompleted(lesson.id);

            return (
              <button
                key={lesson.id}
                onClick={() => unlocked && navigate(`/lesson/${lesson.id}`)}
                disabled={!unlocked}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all shadow-sm ${
                  completed
                    ? 'bg-success/5 border-success/30 hover:border-success/50'
                    : unlocked
                      ? 'bg-card border-border hover:border-primary/40 card-hover'
                      : 'bg-muted/50 border-border/50 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Lesson Number / Status Icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                  completed
                    ? 'bg-success/15'
                    : unlocked
                      ? 'bg-primary/10'
                      : 'bg-muted'
                }`}>
                  {completed ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : unlocked ? (
                    <span className="font-display font-bold text-primary text-sm">{lesson.id}</span>
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{lesson.emoji}</span>
                    <h3 className="font-display font-bold text-foreground text-sm truncate">{lesson.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{lesson.titleEnglish}</p>
                  {unlocked && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-muted rounded-full h-1">
                        <div
                          className="bg-primary/60 h-1 rounded-full transition-all"
                          style={{ width: `${getCategoryMastery(`lesson-${lesson.id}`, lesson.vocabulary.map(v => v.id))}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {getCategoryMastery(`lesson-${lesson.id}`, lesson.vocabulary.map(v => v.id))}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                {unlocked && (
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 ${completed ? 'text-success' : 'text-muted-foreground'}`} />
                )}
              </button>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CourseOverview;
