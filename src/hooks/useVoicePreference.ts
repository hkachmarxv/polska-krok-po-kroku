import { useState, useEffect, useCallback } from 'react';

export type VoicePreference = 'male' | 'female';

const STORAGE_KEY = 'polish-voice-preference';

// ElevenLabs voice IDs
export const VOICES = {
  male: '4vbMkg7ssABMdO4dMh9i',
  female: 'H3IcxEgdFxIEJAqMc0Bc',
} as const;

export function useVoicePreference() {
  const [voice, setVoiceState] = useState<VoicePreference>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as VoicePreference) || 'male';
    } catch {
      return 'male';
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, voice);
  }, [voice]);

  const setVoice = useCallback((v: VoicePreference) => {
    setVoiceState(v);
  }, []);

  const getVoiceId = useCallback((speakerHint?: 'male' | 'female') => {
    // If a specific speaker is requested (e.g., dialogue), use that
    if (speakerHint) return VOICES[speakerHint];
    // Otherwise use user preference
    return VOICES[voice];
  }, [voice]);

  return { voice, setVoice, getVoiceId };
}
