import { Category } from '@/data/polishWords';
import { BookOpen, Brain, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CategoryCardProps {
  category: Category;
  mastery: number;
  wordCount: number;
  onFlashcards: () => void;
  onQuiz: () => void;
  delay?: number;
}

export const CategoryCard = ({ category, mastery, wordCount, onFlashcards, onQuiz, delay = 0 }: CategoryCardProps) => {
  return (
    <div
      className="bg-card rounded-xl border border-border p-4 card-hover animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.emoji}</span>
          <div>
            <h3 className="font-display font-bold text-foreground text-sm">{category.name}</h3>
            <p className="text-xs text-muted-foreground">{wordCount} words · {mastery}% mastered</p>
          </div>
        </div>
      </div>

      <Progress value={mastery} className="h-2 mb-3" />

      <div className="flex gap-2">
        <button
          onClick={onFlashcards}
          className="flex-1 flex items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg py-2 text-sm font-semibold transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Flashcards
        </button>
        <button
          onClick={onQuiz}
          className="flex-1 flex items-center justify-center gap-1.5 bg-accent/10 hover:bg-accent/20 text-accent-foreground rounded-lg py-2 text-sm font-semibold transition-colors"
        >
          <Brain className="w-3.5 h-3.5" />
          Quiz
        </button>
      </div>
    </div>
  );
};
