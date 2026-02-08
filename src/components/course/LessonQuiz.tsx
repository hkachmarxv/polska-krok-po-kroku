import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight } from 'lucide-react';
import { Lesson, CourseWord } from '@/data/courseTypes';
import { getAllCourseWords, lessons } from '@/data/a1Course';
import { useProgress } from '@/hooks/useProgress';
import { CharacterReaction } from '@/components/characters/CharacterReaction';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import type { CharacterMood } from '@/components/characters/Kazik';

interface Props {
  lesson: Lesson;
}

export const LessonQuiz = ({ lesson }: Props) => {
  const navigate = useNavigate();
  const { recordCardResult, recordQuizResult, completeLesson, progress } = useProgress();
  const allCourseWords = useMemo(() => getAllCourseWords(), []);
  const isAlreadyCompleted = (progress.lessonsCompleted || []).includes(lesson.id);

  const [mode, setMode] = useState<'choice' | 'typing' | null>(null);
  const [charMood, setCharMood] = useState<CharacterMood>('thinking');
  const sfx = useSoundEffects();
  const [questionIndex, setQuestionIndex] = useState(0);
  const scoreRef = useRef(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<{ word: CourseWord; given: string }[]>([]);
  const [finished, setFinished] = useState(false);

  const quizWords = useMemo(() => {
    const shuffled = [...lesson.vocabulary].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  }, [lesson.vocabulary]);

  const currentWord = quizWords[questionIndex];

  const choices = useMemo(() => {
    if (!currentWord) return [];
    const others = allCourseWords
      .filter(w => w.id !== currentWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...others, currentWord].sort(() => Math.random() - 0.5);
  }, [currentWord, questionIndex, allCourseWords]);

  const addScore = (correct: boolean) => {
    if (correct) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
  };

  const handleChoiceSelect = (polish: string) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(polish);
    const correct = polish === currentWord.polish;
    setIsCorrect(correct);
    addScore(correct);
    if (correct) { sfx.playCorrect(); setCharMood('celebrating'); }
    else { sfx.playWrong(); setCharMood('sad'); setWrongAnswers(prev => [...prev, { word: currentWord, given: polish }]); }
    recordCardResult(currentWord.id, correct);
    setTimeout(() => setCharMood('thinking'), 1200);
  };

  const handleTypingSubmit = () => {
    if (answered) return;
    setAnswered(true);
    const correct = typedAnswer.trim().toLowerCase() === currentWord.polish.toLowerCase();
    setIsCorrect(correct);
    addScore(correct);
    if (correct) { sfx.playCorrect(); setCharMood('celebrating'); }
    else { sfx.playWrong(); setCharMood('sad'); setWrongAnswers(prev => [...prev, { word: currentWord, given: typedAnswer }]); }
    recordCardResult(currentWord.id, correct);
    setTimeout(() => setCharMood('thinking'), 1200);
  };

  const nextQuestion = () => {
    if (questionIndex + 1 >= quizWords.length) {
      setFinished(true);
      const finalScore = scoreRef.current;
      recordQuizResult({ category: `lesson-${lesson.id}`, score: finalScore, total: quizWords.length, mode: mode! });
      if (finalScore / quizWords.length >= 0.7) {
        sfx.playComplete();
        setCharMood('celebrating');
        completeLesson(lesson.id);
      } else {
        sfx.playFail();
        setCharMood('encouraging');
      }
      return;
    }
    setQuestionIndex(q => q + 1);
    setAnswered(false);
    setSelectedAnswer('');
    setTypedAnswer('');
    setIsCorrect(false);
  };

  const retry = () => {
    setMode(null);
    setQuestionIndex(0);
    scoreRef.current = 0;
    setScore(0);
    setAnswered(false);
    setWrongAnswers([]);
    setFinished(false);
    setSelectedAnswer('');
    setTypedAnswer('');
  };

  const hasNextLesson = lesson.id < lessons.length;

  // Mode selection
  if (!mode) {
    return (
      <div className="py-6 space-y-4">
        <h2 className="font-display text-xl font-bold text-center text-foreground mb-4">Choose Quiz Mode</h2>
        <p className="text-xs text-center text-muted-foreground mb-4">
          {isAlreadyCompleted ? '✅ Lesson already completed — practice anytime!' : 'Score 70%+ to complete this lesson'}
        </p>
        <button
          onClick={() => setMode('choice')}
          className="w-full bg-card border-2 border-border hover:border-primary rounded-xl p-5 text-left card-hover transition-colors"
        >
          <h3 className="font-display font-bold text-foreground">Multiple Choice</h3>
          <p className="text-sm text-muted-foreground mt-1">Pick the correct Polish translation</p>
        </button>
        <button
          onClick={() => setMode('typing')}
          className="w-full bg-card border-2 border-border hover:border-accent rounded-xl p-5 text-left card-hover transition-colors"
        >
          <h3 className="font-display font-bold text-foreground">Typing Mode</h3>
          <p className="text-sm text-muted-foreground mt-1">Type the Polish translation</p>
        </button>
      </div>
    );
  }

  // Finished
  if (finished) {
    const pct = Math.round((score / quizWords.length) * 100);
    const passed = pct >= 70;
    return (
      <div className="py-6 space-y-6">
        <div className="text-center animate-bounce-in">
          <CharacterReaction character="basia" mood={charMood} size={48} className="justify-center mb-3" />
          <Trophy className={`w-14 h-14 mx-auto mb-3 ${pct >= 80 ? 'text-streak' : pct >= 50 ? 'text-accent' : 'text-destructive'}`} />
          <h2 className="font-display text-3xl font-bold text-foreground">{score}/{quizWords.length}</h2>
          <p className="text-muted-foreground">{pct}% correct</p>
          {passed ? (
            <p className="text-sm text-success font-medium mt-2">✅ Lesson completed!</p>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">Need 70% to complete. Try again!</p>
          )}
        </div>

        {wrongAnswers.length > 0 && (
          <div>
            <h3 className="font-display font-bold text-foreground mb-2">Review Mistakes</h3>
            <div className="space-y-2">
              {wrongAnswers.map((wa, i) => (
                <div key={i} className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{wa.word.english}</p>
                    <p className="text-xs text-muted-foreground">Your answer: {wa.given || '(empty)'}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">{wa.word.polish}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {passed && hasNextLesson && (
            <button
              onClick={() => navigate(`/lesson/${lesson.id + 1}`)}
              className="w-full bg-success text-success-foreground rounded-xl py-3 font-bold hover:bg-success/90 transition-colors flex items-center justify-center gap-2"
            >
              Next Lesson <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <button onClick={retry} className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // Quiz question
  return (
    <div className="py-4 space-y-4">
      <div className="w-full bg-muted rounded-full h-1.5">
        <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${(questionIndex / quizWords.length) * 100}%` }} />
      </div>

      <div className="text-center" key={questionIndex}>
        <p className="text-xs text-muted-foreground mb-1">{questionIndex + 1} / {quizWords.length}</p>
        <CharacterReaction character="basia" mood={charMood} size={40} className="justify-center mb-2" />
        <p className="text-sm text-muted-foreground mb-2">Translate to Polish:</p>
        <h2 className="font-display text-2xl font-bold text-foreground">{currentWord.english}</h2>
      </div>

      {mode === 'choice' ? (
        <div className="space-y-2" key={`c-${questionIndex}`}>
          {choices.map((choice) => {
            let cls = 'border-border hover:border-primary/50';
            if (answered) {
              if (choice.polish === currentWord.polish) cls = 'border-success bg-success/10';
              else if (choice.polish === selectedAnswer) cls = 'border-destructive bg-destructive/10';
              else cls = 'border-border opacity-50';
            }
            return (
              <button
                key={choice.id}
                onClick={() => handleChoiceSelect(choice.polish)}
                disabled={answered}
                className={`w-full bg-card border-2 ${cls} rounded-xl p-3 text-left transition-all flex items-center justify-between`}
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
        <div className="space-y-3" key={`t-${questionIndex}`}>
          <input
            type="text"
            value={typedAnswer}
            onChange={(e) => setTypedAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !answered && handleTypingSubmit()}
            disabled={answered}
            placeholder="Type the Polish translation..."
            className="w-full bg-card border-2 border-border rounded-xl p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            autoFocus
          />
          {!answered && (
            <button onClick={handleTypingSubmit} className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold hover:bg-primary/90 transition-colors">
              Check Answer
            </button>
          )}
          {answered && (
            <div className={`rounded-xl p-3 ${isCorrect ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'} animate-fade-in`}>
              <div className="flex items-center gap-2 mb-1">
                {isCorrect ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />}
                <p className="font-bold text-foreground">{isCorrect ? 'Correct!' : 'Not quite...'}</p>
              </div>
              {!isCorrect && (
                <p className="text-sm text-foreground">Answer: <span className="font-bold">{currentWord.polish}</span></p>
              )}
            </div>
          )}
        </div>
      )}

      {answered && (
        <button onClick={nextQuestion} className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold hover:bg-primary/90 transition-colors animate-fade-in">
          {questionIndex + 1 >= quizWords.length ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  );
};
