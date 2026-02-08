import { useState, useCallback, useRef } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VOICES, type VoicePreference } from '@/hooks/useVoicePreference';

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

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text, voiceId }),
        }
      );

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setPlaying(false);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);
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
