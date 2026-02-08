import { useNavigate } from 'react-router-dom';
import { Flame, BookOpen, Target, TrendingUp, ArrowRight, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { categories, getWordsByCategory, getWordOfTheDay } from '@/data/polishWords';
import { useProgress } from '@/hooks/useProgress';
import { CategoryCard } from '@/components/CategoryCard';
import { StatCard } from '@/components/StatCard';
import { WordOfTheDay } from '@/components/WordOfTheDay';

const Dashboard = () => {
  const navigate = useNavigate();
  const { progress, getCategoryMastery, getOverallAccuracy, getWeakestCategory } = useProgress();

  const categoryWordMap: Record<string, string[]> = {};
  categories.forEach(cat => {
    categoryWordMap[cat.id] = getWordsByCategory(cat.id).map(w => w.id);
  });

  const weakestCategoryId = getWeakestCategory(categoryWordMap);
  const weakestCategory = categories.find(c => c.id === weakestCategoryId);
  const wordOfDay = getWordOfTheDay();
  const accuracy = getOverallAccuracy();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇵🇱</span>
            <h1 className="font-display text-xl font-bold text-foreground">PolishPal</h1>
          </div>
          <div className="flex items-center gap-1.5 bg-streak/10 text-streak-foreground px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-streak" />
            <span className="font-bold text-sm">{progress.streak}</span>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Word of the Day */}
        <WordOfTheDay word={wordOfDay} />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<Flame className="w-5 h-5 text-streak" />} value={progress.streak} label="Day Streak" />
          <StatCard icon={<BookOpen className="w-5 h-5 text-primary" />} value={progress.totalWordsLearned} label="Learned" />
          <StatCard icon={<Target className="w-5 h-5 text-destructive" />} value={`${accuracy}%`} label="Accuracy" />
        </div>

        {/* Grammar Assistant */}
        <button
          onClick={() => navigate('/grammar')}
          className="w-full bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-center justify-between card-hover group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <MessageCircleQuestion className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Grammar Assistant</p>
              <p className="text-xs text-muted-foreground">Ask why a word takes a specific form</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Suggested Practice */}
        {weakestCategory && (
          <button
            onClick={() => navigate(`/flashcards/${weakestCategoryId}`)}
            className="w-full bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between card-hover group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Suggested Practice</p>
                <p className="text-xs text-muted-foreground">Review {weakestCategory.name}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {/* Categories */}
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Categories</h2>
          <div className="space-y-3">
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                mastery={getCategoryMastery(cat.id, categoryWordMap[cat.id])}
                wordCount={categoryWordMap[cat.id].length}
                onFlashcards={() => navigate(`/flashcards/${cat.id}`)}
                onQuiz={() => navigate(`/quiz/${cat.id}`)}
                delay={i * 80}
              />
            ))}
          </div>
        </div>

        {/* Quiz Results Chart */}
        {progress.quizResults.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Scores
            </h2>
            <div className="bg-card rounded-lg border border-border p-4">
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
    </div>
  );
};

export default Dashboard;
