import { useCallback, useRef } from 'react';

// Web Audio API synth-based sound effects — no external files needed
const AudioCtx = typeof window !== 'undefined' ? (window.AudioContext || (window as any).webkitAudioContext) : null;

function getCtx(): AudioContext | null {
  if (!AudioCtx) return null;
  if (!(window as any).__sfxCtx) {
    (window as any).__sfxCtx = new AudioCtx();
  }
  return (window as any).__sfxCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', gain = 0.15) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playCorrectSound() {
  playTone(523.25, 0.12, 'sine', 0.13); // C5
  setTimeout(() => playTone(659.25, 0.12, 'sine', 0.13), 80); // E5
  setTimeout(() => playTone(783.99, 0.2, 'sine', 0.13), 160); // G5
}

function playWrongSound() {
  playTone(220, 0.15, 'square', 0.08);
  setTimeout(() => playTone(196, 0.2, 'square', 0.08), 120);
}

function playCompleteSound() {
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
  notes.forEach((f, i) => setTimeout(() => playTone(f, 0.25, 'sine', 0.12), i * 120));
}

function playFailSound() {
  playTone(392, 0.2, 'triangle', 0.1);
  setTimeout(() => playTone(349.23, 0.25, 'triangle', 0.1), 180);
  setTimeout(() => playTone(329.63, 0.35, 'triangle', 0.1), 360);
}

function playFlipSound() {
  playTone(800, 0.06, 'sine', 0.06);
}

function playMatchSound() {
  playTone(587.33, 0.1, 'sine', 0.1);
  setTimeout(() => playTone(880, 0.15, 'sine', 0.1), 80);
}

function playStreakSound() {
  const notes = [440, 554.37, 659.25, 880, 1108.73]; // A4 C#5 E5 A5 C#6
  notes.forEach((f, i) => setTimeout(() => playTone(f, 0.2, 'sine', 0.1), i * 100));
}

function playStreakLostSound() {
  playTone(293.66, 0.3, 'triangle', 0.1);
  setTimeout(() => playTone(261.63, 0.3, 'triangle', 0.1), 250);
  setTimeout(() => playTone(220, 0.5, 'triangle', 0.1), 500);
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

  const play = useCallback((fn: () => void) => {
    if (enabledRef.current) fn();
  }, []);

  return {
    enabled: isEnabled,
    setEnabled,
    playCorrect: useCallback(() => play(playCorrectSound), [play]),
    playWrong: useCallback(() => play(playWrongSound), [play]),
    playComplete: useCallback(() => play(playCompleteSound), [play]),
    playFail: useCallback(() => play(playFailSound), [play]),
    playFlip: useCallback(() => play(playFlipSound), [play]),
    playMatch: useCallback(() => play(playMatchSound), [play]),
    playStreak: useCallback(() => play(playStreakSound), [play]),
    playStreakLost: useCallback(() => play(playStreakLostSound), [play]),
  };
}
