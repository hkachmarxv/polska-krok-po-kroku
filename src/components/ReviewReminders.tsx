import { useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { lessons } from '@/data/a1Course';
import { useProgress } from '@/hooks/useProgress';

export const ReviewReminders = () => {
  const navigate = useNavigate();
  const { progress, getDueCards } = useProgress();
  const completedLessons = progress.lessonsCompleted || [];

  // Find lessons with due cards
  const lessonsWithDueCards = completedLessons
    .map(lessonId => {
      const lesson = lessons.find(l => l.id === lessonId);
      if (!lesson) return null;
      const wordIds = lesson.vocabulary.map(v => v.id);
      const dueIds = getDueCards(wordIds);
      return dueIds.length > 0 ? { lesson, dueCount: dueIds.length } : null;
    })
    .filter(Boolean) as { lesson: (typeof lessons)[0]; dueCount: number }[];

  if (lessonsWithDueCards.length === 0) return null;

  const totalDue = lessonsWithDueCards.reduce((sum, l) => sum + l.dueCount, 0);

  return (
    <section>
      <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
        <RotateCcw className="w-5 h-5 text-accent" />
        Review Due
        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">
          {totalDue} words
        </span>
      </h2>
      <div className="space-y-2">
        {lessonsWithDueCards.slice(0, 4).map(({ lesson, dueCount }) => (
          <button
            key={lesson.id}
            onClick={() => navigate(`/lesson/${lesson.id}?step=2`)}
            className="w-full bg-card border border-border rounded-xl p-3 text-left card-hover flex items-center gap-3"
          >
            <span className="text-xl">{lesson.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-display font-bold text-foreground truncate">
                L{lesson.id}: {lesson.titleEnglish}
              </p>
              <p className="text-xs text-muted-foreground">
                {dueCount} word{dueCount !== 1 ? 's' : ''} to review
              </p>
            </div>
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-bold flex-shrink-0">
              Review
            </span>
          </button>
        ))}
        {lessonsWithDueCards.length > 4 && (
          <p className="text-xs text-muted-foreground text-center">
            +{lessonsWithDueCards.length - 4} more lessons need review
          </p>
        )}
      </div>
    </section>
  );
};
