import { motion } from 'framer-motion';
import { CharacterMood } from './Kazik';

interface Props {
  mood?: CharacterMood;
  size?: number;
  className?: string;
}

const moodEmoji: Record<CharacterMood, string> = {
  happy: '💪',
  celebrating: '🏆',
  sad: '😢',
  thinking: '🤔',
  encouraging: '🔥',
};

const moodAnimation: Record<CharacterMood, any> = {
  happy: { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' } },
  celebrating: { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.5 } },
  sad: { y: [0, 3, 0], rotate: [0, -2, 0], transition: { repeat: Infinity, duration: 3 } },
  thinking: { rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 2.5 } },
  encouraging: { scale: [1, 1.06, 1], y: [0, -3, 0], transition: { repeat: Infinity, duration: 1 } },
};

/** Rysiek the European Bison — Streak motivator 🦬 */
export const Rysiek = ({ mood = 'happy', size = 56, className = '' }: Props) => {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      animate={moodAnimation[mood]}
    >
      <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-sm">
        {/* Body */}
        <ellipse cx="32" cy="40" rx="18" ry="14" fill="hsl(25, 35%, 35%)" />
        {/* Head */}
        <circle cx="32" cy="24" r="12" fill="hsl(25, 35%, 40%)" />
        {/* Mane/fur tuft */}
        <ellipse cx="32" cy="16" rx="10" ry="6" fill="hsl(25, 40%, 30%)" />
        {/* Horns */}
        <path d="M20 18 Q16 10 18 6" stroke="hsl(40, 30%, 55%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M44 18 Q48 10 46 6" stroke="hsl(40, 30%, 55%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Eyes */}
        <circle cx="27" cy="24" r="2.5" fill="hsl(215, 25%, 12%)" />
        <circle cx="37" cy="24" r="2.5" fill="hsl(215, 25%, 12%)" />
        <circle cx="28" cy="23" r="0.8" fill="white" />
        <circle cx="38" cy="23" r="0.8" fill="white" />
        {/* Nose */}
        <ellipse cx="32" cy="30" rx="4" ry="3" fill="hsl(25, 25%, 28%)" />
        <circle cx="30" cy="30" r="1" fill="hsl(25, 20%, 22%)" />
        <circle cx="34" cy="30" r="1" fill="hsl(25, 20%, 22%)" />
        {/* Legs */}
        <rect x="22" y="50" width="4" height="10" rx="2" fill="hsl(25, 35%, 30%)" />
        <rect x="38" y="50" width="4" height="10" rx="2" fill="hsl(25, 35%, 30%)" />
      </svg>
      <span className="absolute -top-2 -right-3 text-[10px]">{moodEmoji[mood]}</span>
    </motion.div>
  );
};
