import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Check, X, Shuffle } from 'lucide-react';
import { categories, getWordsByCategory, Word } from '@/data/polishWords';
import { useProgress } from '@/hooks/useProgress';

const Flashcards = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { progress, recordCardResult, getDueCards } = useProgress();

  const category = categories.find(c => c.id === categoryId);
  const allWords = useMemo(() => getWordsByCategory(categoryId || ''), [categoryId]);
  const [reversed, setReversed] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const dueWordIds = getDueCards(allWords.map(w => w.id));
  const orderedWords = useMemo(() => {
    const dueWords = dueWordIds.map(id => allWords.find(w => w.id === id)!).filter(Boolean);
    const rest = allWords.filter(w => !dueWordIds.includes(w.id));
    return [...dueWords, ...rest];
  }, [allWords, dueWordIds]);

  const word = orderedWords[currentIndex];

  if (!category || !word) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  const frontText = reversed ? word.polish : word.english;
  const backText = reversed ? word.english : word.polish;
  const showPhonetic = !reversed; // show phonetic on back when english->polish

  const handleAnswer = (correct: boolean) => {
    setFeedback(correct ? 'correct' : 'incorrect');
    recordCardResult(word.id, correct);
    setTimeout(() => {
      setFeedback(null);
      setFlipped(false);
      setCurrentIndex(prev => (prev + 1) % orderedWords.length);
    }, 600);
  };

  const progressPct = orderedWords.length > 0
    ? Math.round(((currentIndex) / orderedWords.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="font-display text-base font-bold">{category.emoji} {category.name}</h1>
          <button
            onClick={() => setReversed(!reversed)}
            className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full font-medium hover:bg-secondary/80 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
            {reversed ? 'PL→EN' : 'EN→PL'}
          </button>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">Card {currentIndex + 1} of {orderedWords.length}</p>
          <p className="text-sm text-muted-foreground">{dueWordIds.length} due for review</p>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 mb-6">
          <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Flashcard */}
        <div
          className={`flip-card w-full aspect-[3/2] max-h-[320px] cursor-pointer mb-6 ${feedback === 'correct' ? 'correct-flash' : ''} ${feedback === 'incorrect' ? 'incorrect-shake' : ''}`}
          onClick={() => setFlipped(!flipped)}
        >
          <div className={`flip-card-inner w-full h-full relative ${flipped ? 'flipped' : ''}`}>
            {/* Front */}
            <div className="flip-card-front absolute inset-0 bg-card border-2 border-border rounded-2xl flex flex-col items-center justify-center p-6 shadow-lg">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                {reversed ? 'Polish' : 'English'}
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground text-center">{frontText}</h2>
              {reversed && <p className="text-sm text-muted-foreground mt-2">{word.phonetic}</p>}
              <p className="text-xs text-muted-foreground mt-6">Tap to reveal</p>
            </div>

            {/* Back */}
            <div className="flip-card-back absolute inset-0 bg-card border-2 border-primary/30 rounded-2xl flex flex-col items-center justify-center p-6 shadow-lg">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                {reversed ? 'English' : 'Polish'}
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground text-center">{backText}</h2>
              {showPhonetic && <p className="text-base text-muted-foreground mt-2">{word.phonetic}</p>}
              {word.gender && (
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full mt-2">
                  {word.gender}
                </span>
              )}
              {word.grammarTip && (
                <p className="text-xs text-muted-foreground mt-3 bg-muted/50 rounded-md px-3 py-1.5 max-w-xs text-center">
                  💡 {word.grammarTip}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Answer Buttons */}
        {flipped && (
          <div className="flex gap-3 animate-fade-in">
            <button
              onClick={() => handleAnswer(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-xl py-4 font-bold transition-colors"
            >
              <X className="w-5 h-5" />
              Got it wrong
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-success/10 hover:bg-success/20 text-success rounded-xl py-4 font-bold transition-colors"
            >
              <Check className="w-5 h-5" />
              Got it right
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Flashcards;
