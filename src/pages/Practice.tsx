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
        {/* Grammar Drills Section */}
        <div className="bg-card border-2 border-primary/20 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">✏️</span>
            </div>
            <div>
              <h2 className="font-display font-bold text-foreground">Grammar Drills</h2>
              <p className="text-xs text-muted-foreground">AI-powered fill-in-the-blank exercises</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Cases', 'Verbs', 'Gender', 'Adjectives', 'Pronouns'].map(topic => (
              <button
                key={topic}
                onClick={() => navigate(`/grammar-drill?topic=${topic.toLowerCase()}`)}
                className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium hover:bg-primary/20 active:scale-[0.98] transition-all"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">Review vocabulary across all your lessons, organized by topic. Great for cross-lesson practice!</p>
        
        {getCategoryMastery(categories[0]?.id, categoryWordMap[categories[0]?.id] || []) === 0 && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-sm font-medium text-foreground">Complete lessons first to build your vocabulary</p>
              <p className="text-xs text-muted-foreground mt-0.5">As you progress through lessons, words will appear here for review.</p>
            </div>
          </div>
        )}
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
