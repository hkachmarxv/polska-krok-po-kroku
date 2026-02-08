import { motion } from 'framer-motion';

export type CharacterMood = 'happy' | 'celebrating' | 'sad' | 'thinking' | 'encouraging';

interface Props {
  mood?: CharacterMood;
  size?: number;
  className?: string;
}

const moodEmoji: Record<CharacterMood, string> = {
  happy: '😊',
  celebrating: '🥳',
  sad: '😢',
  thinking: '🤔',
  encouraging: '💪',
};

const moodAnimation: Record<CharacterMood, any> = {
  happy: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' } },
  celebrating: { rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.5 } },
  sad: { y: [0, 2, 0], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } },
  thinking: { rotate: [0, 3, -3, 0], transition: { repeat: Infinity, duration: 2.5 } },
  encouraging: { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.2 } },
};

/** Kazik the Stork — Main guide & cheerleader 🇵🇱 */
export const Kazik = ({ mood = 'happy', size = 56, className = '' }: Props) => {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      animate={moodAnimation[mood]}
    >
      {/* Stork body */}
      <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-sm">
        {/* Body */}
        <ellipse cx="32" cy="36" rx="14" ry="16" fill="white" stroke="hsl(215, 15%, 89%)" strokeWidth="1.5" />
        {/* Wing */}
        <ellipse cx="22" cy="34" rx="8" ry="12" fill="hsl(215, 15%, 92%)" />
        {/* Head */}
        <circle cx="38" cy="18" r="8" fill="white" stroke="hsl(215, 15%, 89%)" strokeWidth="1.5" />
        {/* Beak */}
        <polygon points="46,17 56,19 46,21" fill="hsl(0, 72%, 55%)" />
        {/* Eye */}
        <circle cx="40" cy="16" r="2" fill="hsl(215, 25%, 12%)" />
        {/* Eye shine */}
        <circle cx="41" cy="15" r="0.7" fill="white" />
        {/* Legs */}
        <line x1="28" y1="52" x2="26" y2="62" stroke="hsl(0, 72%, 55%)" strokeWidth="2" strokeLinecap="round" />
        <line x1="36" y1="52" x2="38" y2="62" stroke="hsl(0, 72%, 55%)" strokeWidth="2" strokeLinecap="round" />
        {/* Mood indicator */}
        {mood === 'celebrating' && (
          <>
            <text x="8" y="12" fontSize="8">✨</text>
            <text x="50" y="8" fontSize="8">⭐</text>
          </>
        )}
      </svg>
      {/* Mood bubble */}
      <span className="absolute -top-1 -right-1 text-sm">{moodEmoji[mood]}</span>
    </motion.div>
  );
};
