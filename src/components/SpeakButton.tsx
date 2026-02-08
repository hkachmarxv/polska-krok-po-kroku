import { useState, useCallback } from 'react';
import { Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpeakButtonProps {
  text: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const SpeakButton = ({ text, size = 'sm', className }: SpeakButtonProps) => {
  const [playing, setPlaying] = useState(false);

  const speak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    utterance.rate = 0.85;

    const voices = window.speechSynthesis.getVoices();
    const polishVoice = voices.find(v => v.lang.startsWith('pl'));
    if (polishVoice) utterance.voice = polishVoice;

    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);

    window.speechSynthesis.speak(utterance);
  }, [text]);

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
    >
      <Volume2 className={iconSize} />
    </button>
  );
};
