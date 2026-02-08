import { useState, useMemo } from 'react';
import { RotateCcw, Check, X, ChevronRight } from 'lucide-react';
import { Lesson } from '@/data/courseTypes';
import { useProgress } from '@/hooks/useProgress';
import { SpeakButton } from '@/components/SpeakButton';
import { useVoicePreference } from '@/hooks/useVoicePreference';
import { GenderBadge } from '@/components/GenderBadge';
import { getCategoryEmoji } from '@/lib/categoryEmojis';
import { CharacterReaction, getRandomCharacter } from '@/components/characters/CharacterReaction';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import type { CharacterMood } from '@/components/characters/Kazik';

interface Props {
  lesson: Lesson;
  onComplete?: () => void;
}

export const LessonFlashcards = ({ lesson, onComplete }: Props) => {
  const { progress, recordCardResult, getDueCards } = useProgress();
  const { voice } = useVoicePreference();
  const allWords = lesson.vocabulary;

  const [reversed, setReversed] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [answered, setAnswered] = useState(false);
  const [companion] = useState(() => getRandomCharacter());
  const [charMood, setCharMood] = useState<CharacterMood>('thinking');
  const sfx = useSoundEffects();

  const dueWordIds = getDueCards(allWords.map(w => w.id));
  const orderedWords = useMemo(() => {
    const dueWords = dueWordIds.map(id => allWords.find(w => w.id === id)!).filter(Boolean);
    const rest = allWords.filter(w => !dueWordIds.includes(w.id));
    return [...dueWords, ...rest];
  }, [allWords, dueWordIds]);

  const word = orderedWords[currentIndex];

  if (!word) {
    return <p className="text-center text-muted-foreground py-8">No vocabulary for this lesson.</p>;
  }

  const frontText = reversed ? word.polish : word.english;
  const backText = reversed ? word.english : word.polish;

  const handleAnswer = (correct: boolean) => {
    setFeedback(correct ? 'correct' : 'incorrect');
    setCharMood(correct ? 'celebrating' : 'sad');
    if (correct) sfx.playCorrect(); else sfx.playWrong();
    recordCardResult(word.id, correct);
    setAnswered(true);
  };

  const handleNext = () => {
    setFlipped(false);
    setAnswered(false);
    setCharMood('thinking');
    setFeedback(null);
    setCurrentIndex(prev => (prev + 1) % orderedWords.length);
  };

  const handleFlip = () => {
    if (!flipped) sfx.playFlip();
    setFlipped(!flipped);
  };

  const progressPct = orderedWords.length > 0 ? Math.round((currentIndex / orderedWords.length) * 100) : 0;

  return (
    <div className="py-4 space-y-4">
      {/* Character + progress row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Card {currentIndex + 1} of {orderedWords.length}</p>
        <button
          onClick={() => setReversed(!reversed)}
          className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full font-medium hover:bg-secondary/80 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
          {reversed ? 'PL→EN' : 'EN→PL'}
        </button>
      </div>

      <div className="w-full bg-muted rounded-full h-1.5">
        <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
      </div>

      {/* Large character reaction — shows when answered */}
      {answered && (
        <CharacterReaction character={companion} mood={charMood} variant="large" className="animate-fade-in" />
      )}

      {/* Card */}
      <div
        className={`flip-card w-full aspect-[3/2] max-h-[280px] cursor-pointer ${feedback === 'correct' ? 'correct-flash' : ''} ${feedback === 'incorrect' ? 'incorrect-shake' : ''}`}
        onClick={handleFlip}
      >
        <div className={`flip-card-inner w-full h-full relative ${flipped ? 'flipped' : ''}`}>
          <div className="flip-card-front absolute inset-0 bg-card border-2 border-border rounded-2xl flex flex-col items-center justify-center p-6 shadow-lg">
            <span className="text-3xl mb-2">{getCategoryEmoji(word.category)}</span>
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
              {reversed ? 'Polish' : 'English'}
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground text-center">{frontText}</h2>
            {reversed && <p className="text-sm text-muted-foreground mt-2">{word.phonetic}</p>}
            <p className="text-xs text-muted-foreground mt-4">Tap to reveal</p>
          </div>
          <div className="flip-card-back absolute inset-0 bg-card border-2 border-primary/30 rounded-2xl flex flex-col items-center justify-center p-6 shadow-lg">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
              {reversed ? 'English' : 'Polish'}
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground text-center">{backText}</h2>
            <SpeakButton text={word.polish} size="md" className="mt-2" voicePreference={voice} />
            {word.gender && (
              <GenderBadge gender={word.gender} className="mt-2" />
            )}
            {word.grammarTip && (
              <p className="text-xs text-muted-foreground mt-2 bg-muted/50 rounded-md px-3 py-1.5 max-w-xs text-center">
                💡 {word.grammarTip}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Answer Buttons */}
      {flipped && !answered && (
        <div className="flex gap-3 animate-fade-in">
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 flex items-center justify-center gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-xl py-3 font-bold transition-colors"
          >
            <X className="w-5 h-5" /> Got it wrong
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-success/10 hover:bg-success/20 text-success rounded-xl py-3 font-bold transition-colors"
          >
            <Check className="w-5 h-5" /> Got it right
          </button>
        </div>
      )}

      {answered && (
        <div className="space-y-2 animate-fade-in">
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 font-bold transition-colors"
          >
            Next Card <ChevronRight className="w-5 h-5" />
          </button>
          {onComplete && currentIndex >= Math.min(orderedWords.length - 1, 4) && (
            <button
              onClick={onComplete}
              className="w-full flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-success-foreground rounded-xl py-3 font-bold transition-colors"
            >
              <Check className="w-5 h-5" /> Complete Step
            </button>
          )}
        </div>
      )}
    </div>
  );
};
