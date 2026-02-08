import { useState, useMemo, useCallback } from 'react';
import { CheckCircle, XCircle, RotateCcw, ArrowRight, Shuffle } from 'lucide-react';
import { Lesson } from '@/data/courseTypes';
import { useProgress } from '@/hooks/useProgress';
import { SpeakButton } from '@/components/SpeakButton';
import { useVoicePreference } from '@/hooks/useVoicePreference';
import { CharacterReaction, getRandomCharacter } from '@/components/characters/CharacterReaction';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import type { CharacterMood } from '@/components/characters/Kazik';

interface Props {
  lesson: Lesson;
}

interface Sentence {
  polish: string;
  english: string;
  wordId: string;
}

export const LessonSentenceBuilder = ({ lesson }: Props) => {
  const { voice } = useVoicePreference();
  const { recordCardResult } = useProgress();
  const sfx = useSoundEffects();
  const [companion] = useState(() => getRandomCharacter());
  const [charMood, setCharMood] = useState<CharacterMood>('thinking');

  const sentences = useMemo(() => {
    const result: Sentence[] = [];
    lesson.vocabulary.forEach(word => {
      if (word.exampleSentence && word.exampleTranslation) {
        const words = word.exampleSentence.split(/\s+/);
        if (words.length >= 3 && words.length <= 10) {
          result.push({ polish: word.exampleSentence, english: word.exampleTranslation, wordId: word.id });
        }
      }
    });
    lesson.dialogues.forEach(d => {
      d.lines.forEach(line => {
        const words = line.polish.split(/\s+/);
        if (words.length >= 3 && words.length <= 10) {
          result.push({ polish: line.polish, english: line.english, wordId: `dialogue_${line.polish.slice(0, 10)}` });
        }
      });
    });
    const seen = new Set<string>();
    return result.filter(s => { if (seen.has(s.polish)) return false; seen.add(s.polish); return true; });
  }, [lesson]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const currentSentence = sentences[currentIndex];

  const initializeSentence = useCallback((index: number) => {
    if (index >= sentences.length) { setIsComplete(true); return; }
    const words = sentences[index].polish.replace(/[.!?,;:]/g, '').split(/\s+/);
    const shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    if (shuffled.join(' ') === words.join(' ') && words.length > 2) {
      [shuffled[0], shuffled[shuffled.length - 1]] = [shuffled[shuffled.length - 1], shuffled[0]];
    }
    setAvailableWords(shuffled);
    setSelectedWords([]);
    setResult(null);
    setCharMood('thinking');
  }, [sentences]);

  useMemo(() => { if (sentences.length > 0) initializeSentence(0); }, [sentences.length]);

  const handleWordTap = (word: string, index: number) => {
    if (result) return;
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);
    setSelectedWords([...selectedWords, word]);
  };

  const handleSelectedTap = (word: string, index: number) => {
    if (result) return;
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setAvailableWords([...availableWords, word]);
  };

  const checkAnswer = () => {
    if (!currentSentence) return;
    const correctWords = currentSentence.polish.replace(/[.!?,;:]/g, '').split(/\s+/);
    const isCorrect = selectedWords.join(' ').toLowerCase() === correctWords.join(' ').toLowerCase();
    setResult(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) { sfx.playCorrect(); setCharMood('celebrating'); }
    else { sfx.playWrong(); setCharMood('sad'); }
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
    if (currentSentence.wordId && !currentSentence.wordId.startsWith('dialogue_')) {
      recordCardResult(currentSentence.wordId, isCorrect);
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    initializeSentence(nextIndex);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setIsComplete(false);
    initializeSentence(0);
  };

  if (sentences.length === 0) {
    return (
      <div className="py-12 text-center">
        <Shuffle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No sentences available for this lesson yet.</p>
      </div>
    );
  }

  if (isComplete) {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="py-8 text-center space-y-4">
        <CharacterReaction
          character={companion}
          mood={pct >= 80 ? 'celebrating' : 'encouraging'}
          variant="large"
          message={pct >= 80 ? 'Excellent work!' : 'Keep practicing!'}
        />
        <p className="text-muted-foreground">
          {score.correct} / {score.total} correct ({pct}%)
        </p>
        <button onClick={handleRestart} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 mx-auto">
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
      </div>
    );
  }

  if (!currentSentence) return null;

  return (
    <div className="py-4 space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-medium">{currentIndex + 1} / {Math.min(sentences.length, 10)}</p>
        <p className="text-xs text-muted-foreground">✅ {score.correct} correct</p>
      </div>

      {/* Prompt with character */}
      <div className="bg-card border border-border rounded-xl p-4 text-center">
        <CharacterReaction character={companion} mood={charMood} variant={result ? 'large' : 'inline'} className="justify-center mb-2" />
        <p className="text-xs text-muted-foreground mb-1">Translate this sentence:</p>
        <p className="font-display font-bold text-foreground">{currentSentence.english}</p>
      </div>

      <div className="min-h-[60px] bg-muted/30 border-2 border-dashed border-border rounded-xl p-3 flex flex-wrap gap-2">
        {selectedWords.length === 0 && (
          <p className="text-xs text-muted-foreground m-auto">Tap words below to build the sentence</p>
        )}
        {selectedWords.map((word, i) => (
          <button
            key={`selected-${i}`}
            onClick={() => handleSelectedTap(word, i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              result === 'correct' ? 'bg-success/20 text-success border border-success/30'
                : result === 'incorrect' ? 'bg-destructive/20 text-destructive border border-destructive/30'
                : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20'
            }`}
            disabled={result !== null}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {availableWords.map((word, i) => (
          <button
            key={`available-${i}`}
            onClick={() => handleWordTap(word, i)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-card border border-border text-foreground hover:bg-muted transition-colors"
            disabled={result !== null}
          >
            {word}
          </button>
        ))}
      </div>

      {result && (
        <div className={`rounded-xl p-4 flex items-start gap-3 animate-fade-in ${
          result === 'correct' ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'
        }`}>
          {result === 'correct' ? <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />}
          <div className="flex-1">
            <p className={`text-sm font-bold ${result === 'correct' ? 'text-success' : 'text-destructive'}`}>
              {result === 'correct' ? 'Correct!' : 'Not quite right'}
            </p>
            {result === 'incorrect' && (
              <p className="text-xs text-muted-foreground mt-1">
                Correct answer: <span className="font-medium text-foreground">{currentSentence.polish}</span>
              </p>
            )}
            <div className="mt-1">
              <SpeakButton text={currentSentence.polish} voicePreference={voice} size="sm" />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {!result ? (
          <button onClick={checkAnswer} disabled={selectedWords.length === 0} className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold disabled:opacity-40 transition-opacity">
            Check
          </button>
        ) : (
          <button
            onClick={currentIndex + 1 >= Math.min(sentences.length, 10) ? () => setIsComplete(true) : handleNext}
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            {currentIndex + 1 >= Math.min(sentences.length, 10) ? 'See Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
