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
          className="w-full bg-primary/10 border-2 border-primary/30 rounded-2xl p-5 text-left card-hover group shadow-sm"
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

        {/* Quiz Results Chart */}
        {progress.quizResults.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Scores
            </h2>
            <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
              <div className="flex items-end gap-1 h-24">
                {progress.quizResults.slice(-15).map((r, i) => {
                  const pct = r.total > 0 ? (r.score / r.total) * 100 : 0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t transition-all"
                        style={{
                          height: `${pct}%`,
                          backgroundColor: pct >= 80 ? 'hsl(var(--success))' : pct >= 50 ? 'hsl(var(--accent))' : 'hsl(var(--destructive))',
                          minHeight: '4px',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">Last {Math.min(15, progress.quizResults.length)} quizzes</p>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
