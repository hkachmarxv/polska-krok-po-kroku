import { useNavigate } from 'react-router-dom';
import { categories, getWordsByCategory } from '@/data/polishWords';
import { useProgress } from '@/hooks/useProgress';
import { CategoryCard } from '@/components/CategoryCard';
import { BottomNav } from '@/components/BottomNav';

const Practice = () => {
  const navigate = useNavigate();
  const { getCategoryMastery } = useProgress();

  const categoryWordMap: Record<string, string[]> = {};
  categories.forEach(cat => {
    categoryWordMap[cat.id] = getWordsByCategory(cat.id).map(w => w.id);
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center gap-2">
          <span className="text-2xl">🇵🇱</span>
          <h1 className="font-display text-xl font-bold text-foreground">Practice</h1>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        <p className="text-sm text-muted-foreground">Practice vocabulary by category from all lessons.</p>
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
      </main>

      <BottomNav />
    </div>
  );
};

export default Practice;
