import { useNavigate } from 'react-router-dom';
import { Flame, BookOpen, Target, TrendingUp, ArrowRight, GraduationCap, Settings, Snowflake } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { getWordOfTheDay } from '@/data/polishWords';
import { lessons } from '@/data/a1Course';
import { useProgress } from '@/hooks/useProgress';
import { StatCard } from '@/components/StatCard';
import { WordOfTheDay } from '@/components/WordOfTheDay';
import { BottomNav } from '@/components/BottomNav';
import { Progress } from '@/components/ui/progress';
import { ReviewReminders } from '@/components/ReviewReminders';
import { CharacterReaction } from '@/components/characters/CharacterReaction';
import type { CharacterMood } from '@/components/characters/Kazik';

const Dashboard = () => {
  const navigate = useNavigate();
  const { progress, getOverallAccuracy } = useProgress();
  const { signOut, user } = useAuth();

  const wordOfDay = getWordOfTheDay();
  const accuracy = getOverallAccuracy();
  const completedLessons = progress.lessonsCompleted || [];
  const currentLesson = Math.min(progress.currentLesson || 1, lessons.length);
  const currentLessonData = lessons.find(l => l.id === currentLesson);
  const coursePct = Math.round((completedLessons.length / lessons.length) * 100);
  const streakFreezes = progress.streakFreezes ?? 10;

  // Determine Kazik's mood based on streak
  const kazikMood: CharacterMood = progress.streak >= 7 ? 'celebrating' : progress.streak >= 3 ? 'happy' : progress.streak === 0 ? 'encouraging' : 'happy';
  const kazikMessage = progress.streak >= 7 ? 'Amazing streak! 🔥' : progress.streak >= 3 ? 'Keep it up!' : progress.streak === 0 ? "Let's start learning!" : 'Good going!';

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇵🇱</span>
            <h1 className="font-display text-xl font-bold text-foreground">LearnPolski</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-streak/10 text-streak-foreground px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-streak" />
              <span className="font-bold text-sm">{progress.streak}</span>
            </div>
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1.5 rounded-full" title={`${streakFreezes} streak freezes remaining`}>
              <Snowflake className="w-3.5 h-3.5" />
              <span className="font-bold text-xs">{streakFreezes}</span>
            </div>
            <ThemeToggle />
            <button
              onClick={() => navigate('/settings')}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Account settings"
              aria-label="Account settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Character Greeting */}
        <div className="flex items-center gap-3">
          <CharacterReaction character="kazik" mood={kazikMood} message={kazikMessage} variant="inline" />
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              {user?.user_metadata?.display_name ? `Hey, ${user.user_metadata.display_name} 👋` : 'Welcome back 👋'}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Keep up your Polish learning streak!</p>
          </div>
        </div>

        {/* Continue Learning CTA */}
        <button
          onClick={() => navigate(completedLessons.length === lessons.length ? '/course' : `/lesson/${currentLesson}`)}
          className="w-full bg-primary/10 border-2 border-primary/30 rounded-2xl p-5 text-left card-hover group shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-display font-bold text-foreground">
                  {completedLessons.length === lessons.length ? 'Course Complete! 🎉' : 'Continue Learning'}
                </p>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>
              {currentLessonData && completedLessons.length < lessons.length && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {currentLessonData.emoji} Lesson {currentLesson}: {currentLessonData.title}
                </p>
              )}
              <div className="mt-2">
                <Progress value={coursePct} className="h-2" />
                <p className="text-[10px] text-muted-foreground mt-1">{completedLessons.length}/{lessons.length} lessons • {coursePct}%</p>
              </div>
            </div>
          </div>
        </button>

        {/* Word of the Day */}
        <WordOfTheDay word={wordOfDay} />

        {/* Review Reminders */}
        <ReviewReminders />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<Flame className="w-5 h-5 text-streak" />} value={progress.streak} label="Day Streak" />
          <StatCard icon={<BookOpen className="w-5 h-5 text-primary" />} value={progress.totalWordsLearned} label="Learned" />
          <StatCard icon={<Target className="w-5 h-5 text-destructive" />} value={`${accuracy}%`} label="Accuracy" />
        </div>

        {/* Quiz Results */}
        {progress.quizResults.length === 0 ? (
          <button
            onClick={() => navigate(completedLessons.length > 0 ? `/lesson/${completedLessons[completedLessons.length - 1]}?step=6` : '/lesson/1')}
            className="w-full bg-card border border-dashed border-primary/30 rounded-2xl p-5 text-center card-hover"
          >
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="font-display font-bold text-sm text-foreground">No quiz scores yet</p>
            <p className="text-xs text-muted-foreground mt-1">Take your first quiz to track your progress!</p>
            <span className="inline-block mt-3 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">Start a Quiz →</span>
          </button>
        ) : (
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Scores
            </h2>
            <div className="space-y-2">
              {progress.quizResults.slice(-5).reverse().map((r, i) => {
                const pct = r.total > 0 ? Math.round((r.score / r.total) * 100) : 0;
                const color = pct >= 80 ? 'text-success' : pct >= 50 ? 'text-accent-foreground' : 'text-destructive';
                const bgColor = pct >= 80 ? 'bg-success' : pct >= 50 ? 'bg-accent' : 'bg-destructive';
                const dayLabel = (() => {
                  if (!r.date) return '';
                  const d = new Date(r.date);
                  const now = new Date();
                  const diffMs = now.getTime() - d.getTime();
                  const diffDays = Math.floor(diffMs / 86400000);
                  if (diffDays === 0) return 'Today';
                  if (diffDays === 1) return 'Yesterday';
                  return `${diffDays}d ago`;
                })();
                return (
                  <div key={i} className="bg-card rounded-xl border border-border p-3 flex items-center gap-3 shadow-sm">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${bgColor}/15`}>
                      <span className={`text-sm font-bold ${color}`}>{pct}%</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate capitalize">{r.category?.replace(/-/g, ' ') || 'Quiz'}</p>
                      <p className="text-xs text-muted-foreground">{r.score}/{r.total} correct · {r.mode === 'typing' ? 'Typing' : 'Multiple choice'}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${bgColor}`} style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">{dayLabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
