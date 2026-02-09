import { useState, useCallback, useRef } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VOICES, type VoicePreference } from '@/hooks/useVoicePreference';
import { supabase } from '@/integrations/supabase/client';
// Client-side audio cache to avoid duplicate API calls
const audioCache = new Map<string, string>();

// Helper to get current session token
const getAuthToken = async (): Promise<string> => {
  try {
    const { data } = await supabase.auth.getSession();
    if (data?.session?.access_token) {
      return data.session.access_token;
    }
  } catch {
    // Fall back to anon key
  }
  return import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
};

interface SpeakButtonProps {
  text: string;
  size?: 'sm' | 'md';
  className?: string;
  /** Force a specific voice gender (used in dialogues) */
  speakerGender?: 'male' | 'female';
  /** User's preferred voice (from useVoicePreference). Falls back to 'male' */
  voicePreference?: VoicePreference;
}

export const SpeakButton = ({ text, size = 'sm', className, speakerGender, voicePreference = 'male' }: SpeakButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const voiceId = speakerGender ? VOICES[speakerGender] : VOICES[voicePreference];

  const speak = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlaying(false);
      return;
    }

    const cacheKey = `${text}:${voiceId}`;

    // Check cache first
    const cachedUrl = audioCache.get(cacheKey);
    if (cachedUrl) {
      const audio = new Audio(cachedUrl);
      audioRef.current = audio;
      audio.onended = () => {
        setPlaying(false);
        audioRef.current = null;
      };
      setPlaying(true);
      await audio.play();
      return;
    }

    setLoading(true);
    try {
      const authToken = await getAuthToken();
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ text, voiceId }),
        }
      );

      if (response.status === 429) {
        throw new Error('Rate limited');
      }
      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Cache the audio URL for this session
      audioCache.set(cacheKey, audioUrl);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setPlaying(false);
        audioRef.current = null;
      };

      setPlaying(true);
      await audio.play();
    } catch {
      // Fallback to Web Speech API
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pl-PL';
        utterance.rate = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const polishVoice = voices.find(v => v.lang.startsWith('pl'));
        if (polishVoice) utterance.voice = polishVoice;
        utterance.onstart = () => setPlaying(true);
        utterance.onend = () => setPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    } finally {
      setLoading(false);
    }
  }, [text, voiceId]);

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const btnSize = size === 'sm' ? 'p-1.5' : 'p-2';

  return (
    <button
      onClick={speak}
      className={cn(
        btnSize,
        'rounded-full hover:bg-primary/10 text-primary transition-colors flex-shrink-0',
        playing && 'animate-pulse bg-primary/10',
        className
      )}
      title="Listen"
      type="button"
      disabled={loading}
    >
      {loading ? (
        <Loader2 className={cn(iconSize, 'animate-spin')} />
      ) : (
        <Volume2 className={iconSize} />
      )}
    </button>
  );
};
