import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { categories, getWordsByCategory, Word, words as allWordsData } from '@/data/polishWords';
import { useProgress } from '@/hooks/useProgress';

type QuizMode = 'choice' | 'typing';

const Quiz = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { recordCardResult, recordQuizResult } = useProgress();

  const category = categories.find(c => c.id === categoryId);
  const categoryWords = useMemo(() => getWordsByCategory(categoryId || ''), [categoryId]);

  const [mode, setMode] = useState<QuizMode | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<{ word: Word; given: string }[]>([]);
  const [finished, setFinished] = useState(false);

  const quizWords = useMemo(() => {
    const shuffled = [...categoryWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [categoryWords]);

  const currentWord = quizWords[questionIndex];

  const choices = useMemo(() => {
    if (!currentWord) return [];
    const others = allWordsData
      .filter(w => w.id !== currentWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const all = [...others, currentWord].sort(() => Math.random() - 0.5);
    return all;
  }, [currentWord, questionIndex]);

  const handleChoiceSelect = (polish: string) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(polish);
    const correct = polish === currentWord.polish;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    else setWrongAnswers(prev => [...prev, { word: currentWord, given: polish }]);
    recordCardResult(currentWord.id, correct);
  };

  const handleTypingSubmit = () => {
    if (answered) return;
    setAnswered(true);
    const normalizedTyped = typedAnswer.trim().toLowerCase();
    const normalizedCorrect = currentWord.polish.toLowerCase();
    const correct = normalizedTyped === normalizedCorrect;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    else setWrongAnswers(prev => [...prev, { word: currentWord, given: typedAnswer }]);
    recordCardResult(currentWord.id, correct);
  };

  const nextQuestion = () => {
    if (questionIndex + 1 >= quizWords.length) {
      setFinished(true);
      recordQuizResult({ category: categoryId!, score: score, total: quizWords.length, mode: mode! });
      return;
    }
    setQuestionIndex(q => q + 1);
    setAnswered(false);
    setSelectedAnswer('');
    setTypedAnswer('');
    setIsCorrect(false);
  };

  if (!category) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><p>Category not found</p></div>;
  }

  // Mode Selection
  if (!mode) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-base font-bold">{category.emoji} {category.name} Quiz</h1>
          </div>
        </header>
        <main className="container max-w-2xl mx-auto px-4 py-12 space-y-4">
          <h2 className="font-display text-2xl font-bold text-center text-foreground mb-8">Choose Quiz Mode</h2>
          <button
            onClick={() => setMode('choice')}
            className="w-full bg-card border-2 border-border hover:border-primary rounded-xl p-6 text-left card-hover transition-colors"
          >
            <h3 className="font-display font-bold text-lg text-foreground">Multiple Choice</h3>
            <p className="text-sm text-muted-foreground mt-1">Pick the correct Polish translation from 4 options</p>
          </button>
          <button
            onClick={() => setMode('typing')}
            className="w-full bg-card border-2 border-border hover:border-accent rounded-xl p-6 text-left card-hover transition-colors"
          >
            <h3 className="font-display font-bold text-lg text-foreground">Typing Mode</h3>
            <p className="text-sm text-muted-foreground mt-1">Type the Polish translation yourself — harder but more effective!</p>
          </button>
        </main>
      </div>
    );
  }

  // Finished
  if (finished) {
    const pct = Math.round((score / quizWords.length) * 100);
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></button>
            <h1 className="font-display text-base font-bold">Quiz Complete!</h1>
          </div>
        </header>
        <main className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
          <div className="text-center animate-bounce-in">
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${pct >= 80 ? 'text-streak' : pct >= 50 ? 'text-accent' : 'text-destructive'}`} />
            <h2 className="font-display text-4xl font-bold text-foreground">{score}/{quizWords.length}</h2>
            <p className="text-lg text-muted-foreground mt-1">{pct}% correct</p>
            <p className="text-sm text-muted-foreground mt-2">
              {pct >= 80 ? 'Świetnie! (Great!)' : pct >= 50 ? 'Dobrze! Keep practicing!' : 'Don\'t worry, practice makes perfect!'}
            </p>
          </div>

          {wrongAnswers.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-foreground mb-3">Review Mistakes</h3>
              <div className="space-y-2">
                {wrongAnswers.map((wa, i) => (
                  <div key={i} className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{wa.word.english}</p>
                      <p className="text-xs text-muted-foreground">Your answer: {wa.given || '(empty)'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{wa.word.polish}</p>
                      <p className="text-xs text-muted-foreground">{wa.word.phonetic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => navigate('/')} className="flex-1 bg-secondary text-secondary-foreground rounded-xl py-3 font-bold hover:bg-secondary/80 transition-colors">
              Dashboard
            </button>
            <button onClick={() => { setMode(null); setQuestionIndex(0); setScore(0); setAnswered(false); setWrongAnswers([]); setFinished(false); }} className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Quiz Question
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="font-display text-sm font-bold">{questionIndex + 1} / {quizWords.length}</h1>
          <span className="text-sm font-bold text-primary">{score} pts</span>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6">
        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-1.5 mb-8">
          <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${((questionIndex) / quizWords.length) * 100}%` }} />
        </div>

        <div className="text-center mb-8 animate-fade-in" key={questionIndex}>
          <p className="text-sm text-muted-foreground mb-2">Translate to Polish:</p>
          <h2 className="font-display text-3xl font-bold text-foreground">{currentWord.english}</h2>
        </div>

        {mode === 'choice' ? (
          <div className="space-y-3 animate-slide-up" key={`choices-${questionIndex}`}>
            {choices.map((choice) => {
              let borderClass = 'border-border hover:border-primary/50';
              if (answered) {
                if (choice.polish === currentWord.polish) borderClass = 'border-success bg-success/10';
                else if (choice.polish === selectedAnswer) borderClass = 'border-destructive bg-destructive/10';
                else borderClass = 'border-border opacity-50';
              }
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice.polish)}
                  disabled={answered}
                  className={`w-full bg-card border-2 ${borderClass} rounded-xl p-4 text-left transition-all flex items-center justify-between`}
                >
                  <div>
                    <p className="font-semibold text-foreground">{choice.polish}</p>
                    <p className="text-xs text-muted-foreground">{choice.phonetic}</p>
                  </div>
                  {answered && choice.polish === currentWord.polish && <CheckCircle2 className="w-5 h-5 text-success" />}
                  {answered && choice.polish === selectedAnswer && choice.polish !== currentWord.polish && <XCircle className="w-5 h-5 text-destructive" />}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 animate-slide-up" key={`typing-${questionIndex}`}>
            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !answered && handleTypingSubmit()}
              disabled={answered}
              placeholder="Type the Polish translation..."
              className="w-full bg-card border-2 border-border rounded-xl p-4 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
            {!answered && (
              <button
                onClick={handleTypingSubmit}
                className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold hover:bg-primary/90 transition-colors"
              >
                Check Answer
              </button>
            )}
            {answered && (
              <div className={`rounded-xl p-4 ${isCorrect ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'} animate-fade-in`}>
                <div className="flex items-center gap-2 mb-1">
                  {isCorrect ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />}
                  <p className="font-bold text-foreground">{isCorrect ? 'Correct!' : 'Not quite...'}</p>
                </div>
                {!isCorrect && (
                  <p className="text-sm text-foreground">The answer is: <span className="font-bold">{currentWord.polish}</span> ({currentWord.phonetic})</p>
                )}
              </div>
            )}
          </div>
        )}

        {answered && (
          <button
            onClick={nextQuestion}
            className="w-full mt-4 bg-primary text-primary-foreground rounded-xl py-3 font-bold hover:bg-primary/90 transition-colors animate-fade-in"
          >
            {questionIndex + 1 >= quizWords.length ? 'See Results' : 'Next Question'}
          </button>
        )}
      </main>
    </div>
  );
};

export default Quiz;
