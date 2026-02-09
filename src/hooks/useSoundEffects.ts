import { useCallback, useRef } from 'react';

import correctSfx from '@/assets/sfx/correct.mp3';
import wrongSfx from '@/assets/sfx/wrong.mp3';
import completeSfx from '@/assets/sfx/complete.mp3';
import failSfx from '@/assets/sfx/fail.mp3';
import flipSfx from '@/assets/sfx/flip.mp3';
import matchSfx from '@/assets/sfx/match.mp3';
import streakSfx from '@/assets/sfx/streak.mp3';
import streakLostSfx from '@/assets/sfx/streak-lost.mp3';

const audioCache = new Map<string, HTMLAudioElement>();

function playSfx(src: string) {
  // Clone from cache so overlapping plays work
  let master = audioCache.get(src);
  if (!master) {
    master = new Audio(src);
    audioCache.set(src, master);
  }
  const clone = master.cloneNode() as HTMLAudioElement;
  clone.volume = 0.5;
  clone.play().catch(() => {});
}

const SFX_KEY = 'learnpolski-sfx-enabled';

export function useSoundEffects() {
  const enabledRef = useRef<boolean>(true);
  const initialized = useRef(false);

  if (!initialized.current) {
    initialized.current = true;
    try {
      const v = localStorage.getItem(SFX_KEY);
      if (v !== null) enabledRef.current = v === 'true';
    } catch {}
  }

  const isEnabled = enabledRef.current;

  const setEnabled = useCallback((val: boolean) => {
    enabledRef.current = val;
    try { localStorage.setItem(SFX_KEY, String(val)); } catch {}
  }, []);

  const play = useCallback((src: string) => {
    if (enabledRef.current) playSfx(src);
  }, []);

  return {
    enabled: isEnabled,
    setEnabled,
    playCorrect: useCallback(() => play(correctSfx), [play]),
    playWrong: useCallback(() => play(wrongSfx), [play]),
    playComplete: useCallback(() => play(completeSfx), [play]),
    playFail: useCallback(() => play(failSfx), [play]),
    playFlip: useCallback(() => play(flipSfx), [play]),
    playMatch: useCallback(() => play(matchSfx), [play]),
    playStreak: useCallback(() => play(streakSfx), [play]),
    playStreakLost: useCallback(() => play(streakLostSfx), [play]),
  };
}
