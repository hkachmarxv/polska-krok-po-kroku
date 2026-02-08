import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface CardProgress {
  wordId: string;
  correctCount: number;
  incorrectCount: number;
  lastSeen: number;
  nextReview: number;
  ease: number;
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
  lessonsCompleted: number[];
  currentLesson: number;
}

const STORAGE_KEY = 'polish-learner-progress';

const defaultProgress: UserProgress = {
  streak: 0,
  lastPracticeDate: '',
  totalWordsLearned: 0,
  cards: {},
  quizResults: [],
  lessonsCompleted: [],
  currentLesson: 1,
};

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });
  const [cloudLoaded, setCloudLoaded] = useState(false);
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from cloud on login
  useEffect(() => {
    if (!user) {
      setCloudLoaded(false);
      return;
    }

    const loadFromCloud = async () => {
      try {
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error || !data) {
          // No cloud data yet — upload localStorage data
          await syncToCloud(progress, user.id);
          setCloudLoaded(true);
          return;
        }

        const cloudProgress: UserProgress = {
          streak: data.streak,
          lastPracticeDate: data.last_practice_date || '',
          totalWordsLearned: data.total_words_learned,
          cards: (data.cards as unknown as Record<string, CardProgress>) || {},
          quizResults: (data.quiz_results as unknown as QuizResult[]) || [],
          lessonsCompleted: data.lessons_completed || [],
          currentLesson: data.current_lesson,
        };

        // Merge: take whichever has more progress
        const local = progress;
        const merged = mergeProgress(local, cloudProgress);

        setProgress(merged);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        setCloudLoaded(true);
      } catch {
        setCloudLoaded(true);
      }
    };

    loadFromCloud();
  }, [user?.id]);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Debounced sync to cloud
  useEffect(() => {
    if (!user || !cloudLoaded) return;

    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => {
      syncToCloud(progress, user.id);
    }, 2000);

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [progress, user?.id, cloudLoaded]);

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
        interval = 30 * 1000;
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

  const completeLesson = useCallback((lessonId: number) => {
    setProgress(prev => {
      if (prev.lessonsCompleted?.includes(lessonId)) return prev;
      const newCompleted = [...(prev.lessonsCompleted || []), lessonId];
      return {
        ...prev,
        lessonsCompleted: newCompleted,
        currentLesson: Math.max(prev.currentLesson || 1, lessonId + 1),
      };
    });
  }, []);

  return {
    progress,
    recordCardResult,
    recordQuizResult,
    getCategoryMastery,
    getOverallAccuracy,
    getDueCards,
    getWeakestCategory,
    updateStreak,
    completeLesson,
  };
}

// Merge local + cloud progress, keeping the best of each
function mergeProgress(local: UserProgress, cloud: UserProgress): UserProgress {
  // Merge cards: keep the one with more correct answers for each word
  const mergedCards: Record<string, CardProgress> = { ...cloud.cards };
  for (const [id, localCard] of Object.entries(local.cards)) {
    const cloudCard = mergedCards[id];
    if (!cloudCard || localCard.correctCount + localCard.incorrectCount > cloudCard.correctCount + cloudCard.incorrectCount) {
      mergedCards[id] = localCard;
    }
  }

  // Merge quiz results: combine and deduplicate by date
  const allQuizzes = [...cloud.quizResults, ...local.quizResults];
  const seen = new Set<string>();
  const mergedQuizzes = allQuizzes.filter(q => {
    if (seen.has(q.date)) return false;
    seen.add(q.date);
    return true;
  }).slice(-50);

  // Merge completed lessons
  const mergedLessons = [...new Set([...(cloud.lessonsCompleted || []), ...(local.lessonsCompleted || [])])].sort((a, b) => a - b);

  const learnedCount = Object.values(mergedCards).filter(c => c.correctCount >= 3).length;

  return {
    streak: Math.max(local.streak, cloud.streak),
    lastPracticeDate: local.lastPracticeDate > cloud.lastPracticeDate ? local.lastPracticeDate : cloud.lastPracticeDate,
    totalWordsLearned: learnedCount,
    cards: mergedCards,
    quizResults: mergedQuizzes,
    lessonsCompleted: mergedLessons,
    currentLesson: Math.max(local.currentLesson || 1, cloud.currentLesson || 1),
  };
}

async function syncToCloud(progress: UserProgress, userId: string) {
  try {
    await supabase
      .from('user_progress')
      .update({
        streak: progress.streak,
        last_practice_date: progress.lastPracticeDate || null,
        total_words_learned: progress.totalWordsLearned,
        cards: progress.cards as any,
        quiz_results: progress.quizResults as any,
        lessons_completed: progress.lessonsCompleted,
        current_lesson: progress.currentLesson,
      })
      .eq('user_id', userId);
  } catch {
    // Silent fail — localStorage is the fallback
  }
}
