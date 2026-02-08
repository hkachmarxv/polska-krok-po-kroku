import { useState, useEffect, useCallback } from 'react';

export interface CardProgress {
  wordId: string;
  correctCount: number;
  incorrectCount: number;
  lastSeen: number;
  nextReview: number;
  ease: number; // spaced repetition ease factor
}

export interface QuizResult {
  date: string;
  category: string;
  score: number;
  total: number;
  mode: 'choice' | 'typing';
}

export interface UserProgress {
  streak: number;
  lastPracticeDate: string;
  totalWordsLearned: number;
  cards: Record<string, CardProgress>;
  quizResults: QuizResult[];
}

const STORAGE_KEY = 'polish-learner-progress';

const defaultProgress: UserProgress = {
  streak: 0,
  lastPracticeDate: '',
  totalWordsLearned: 0,
  cards: {},
  quizResults: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      if (prev.lastPracticeDate === today) return prev;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      const newStreak = prev.lastPracticeDate === yesterdayStr ? prev.streak + 1 : 1;
      return { ...prev, streak: newStreak, lastPracticeDate: today };
    });
  }, []);

  const recordCardResult = useCallback((wordId: string, correct: boolean) => {
    updateStreak();
    setProgress(prev => {
      const existing = prev.cards[wordId] || {
        wordId,
        correctCount: 0,
        incorrectCount: 0,
        lastSeen: 0,
        nextReview: 0,
        ease: 2.5,
      };

      const now = Date.now();
      let newEase = existing.ease;
      let interval: number;

      if (correct) {
        newEase = Math.min(3.0, existing.ease + 0.1);
        const reviewCount = existing.correctCount + 1;
        if (reviewCount === 1) interval = 1 * 60 * 1000;
        else if (reviewCount === 2) interval = 10 * 60 * 1000;
        else interval = (existing.nextReview - existing.lastSeen) * newEase;
      } else {
        newEase = Math.max(1.3, existing.ease - 0.2);
        interval = 30 * 1000; // show again in 30s
      }

      const updated: CardProgress = {
        wordId,
        correctCount: existing.correctCount + (correct ? 1 : 0),
        incorrectCount: existing.incorrectCount + (correct ? 0 : 1),
        lastSeen: now,
        nextReview: now + interval,
        ease: newEase,
      };

      const newCards = { ...prev.cards, [wordId]: updated };
      const learnedCount = Object.values(newCards).filter(c => c.correctCount >= 3).length;

      return {
        ...prev,
        cards: newCards,
        totalWordsLearned: learnedCount,
      };
    });
  }, [updateStreak]);

  const recordQuizResult = useCallback((result: Omit<QuizResult, 'date'>) => {
    updateStreak();
    setProgress(prev => ({
      ...prev,
      quizResults: [
        ...prev.quizResults.slice(-49),
        { ...result, date: new Date().toISOString() },
      ],
    }));
  }, [updateStreak]);

  const getCategoryMastery = useCallback((categoryId: string, wordIds: string[]) => {
    if (wordIds.length === 0) return 0;
    const mastered = wordIds.filter(id => (progress.cards[id]?.correctCount || 0) >= 3).length;
    return Math.round((mastered / wordIds.length) * 100);
  }, [progress.cards]);

  const getOverallAccuracy = useCallback(() => {
    const cards = Object.values(progress.cards);
    if (cards.length === 0) return 0;
    const totalCorrect = cards.reduce((sum, c) => sum + c.correctCount, 0);
    const totalAttempts = cards.reduce((sum, c) => sum + c.correctCount + c.incorrectCount, 0);
    return totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  }, [progress.cards]);

  const getDueCards = useCallback((wordIds: string[]) => {
    const now = Date.now();
    return wordIds
      .filter(id => {
        const card = progress.cards[id];
        return !card || card.nextReview <= now;
      })
      .sort((a, b) => {
        const ca = progress.cards[a];
        const cb = progress.cards[b];
        if (!ca) return -1;
        if (!cb) return 1;
        return ca.nextReview - cb.nextReview;
      });
  }, [progress.cards]);

  const getWeakestCategory = useCallback((categoryWordMap: Record<string, string[]>) => {
    let weakest = '';
    let lowestMastery = 101;
    for (const [catId, wordIds] of Object.entries(categoryWordMap)) {
      const mastery = getCategoryMastery(catId, wordIds);
      if (mastery < lowestMastery) {
        lowestMastery = mastery;
        weakest = catId;
      }
    }
    return weakest;
  }, [getCategoryMastery]);

  return {
    progress,
    recordCardResult,
    recordQuizResult,
    getCategoryMastery,
    getOverallAccuracy,
    getDueCards,
    getWeakestCategory,
    updateStreak,
  };
}
