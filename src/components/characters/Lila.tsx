import { motion } from 'framer-motion';
import { CharacterMood } from './Kazik';

interface Props {
  mood?: CharacterMood;
  size?: number;
  className?: string;
}

const moodEmoji: Record<CharacterMood, string> = {
  happy: '😺',
  celebrating: '🎊',
  sad: '😿',
  thinking: '🐱',
  encouraging: '😸',
};

const moodAnimation: Record<CharacterMood, any> = {
  happy: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' } },
  celebrating: { rotate: [0, -8, 8, -8, 0], scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.5 } },
  sad: { y: [0, 2, 0], scale: [1, 0.96, 1], transition: { repeat: Infinity, duration: 3 } },
  thinking: { rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 2.8 } },
  encouraging: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.7 } },
};

/** Lila the Cat — Quiz companion 🐱 */
export const Lila = ({ mood = 'happy', size = 56, className = '' }: Props) => {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      animate={moodAnimation[mood]}
    >
      <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-sm">
        {/* Body */}
        <ellipse cx="32" cy="42" rx="14" ry="14" fill="hsl(30, 55%, 65%)" />
        {/* Head */}
        <circle cx="32" cy="26" r="13" fill="hsl(30, 55%, 65%)" />
        {/* Ears */}
        <polygon points="20,18 16,4 26,14" fill="hsl(30, 55%, 65%)" stroke="hsl(30, 55%, 58%)" strokeWidth="1" />
        <polygon points="44,18 48,4 38,14" fill="hsl(30, 55%, 65%)" stroke="hsl(30, 55%, 58%)" strokeWidth="1" />
        {/* Inner ears */}
        <polygon points="21,16 18,7 25,14" fill="hsl(0, 50%, 78%)" />
        <polygon points="43,16 46,7 39,14" fill="hsl(0, 50%, 78%)" />
        {/* Eyes */}
        <ellipse cx="26" cy="25" rx="3" ry="3.5" fill="hsl(120, 50%, 45%)" />
        <ellipse cx="38" cy="25" rx="3" ry="3.5" fill="hsl(120, 50%, 45%)" />
        <ellipse cx="26" cy="25" rx="1.5" ry="2.5" fill="hsl(215, 25%, 12%)" />
        <ellipse cx="38" cy="25" rx="1.5" ry="2.5" fill="hsl(215, 25%, 12%)" />
        <circle cx="27" cy="24" r="0.8" fill="white" />
        <circle cx="39" cy="24" r="0.8" fill="white" />
        {/* Nose */}
        <polygon points="32,30 30,32 34,32" fill="hsl(0, 50%, 65%)" />
        {/* Mouth */}
        <path d="M30 33 Q32 35 34 33" stroke="hsl(215, 25%, 12%)" strokeWidth="0.8" fill="none" />
        {/* Whiskers */}
        <line x1="14" y1="28" x2="24" y2="30" stroke="hsl(215, 15%, 60%)" strokeWidth="0.7" />
        <line x1="14" y1="32" x2="24" y2="31" stroke="hsl(215, 15%, 60%)" strokeWidth="0.7" />
        <line x1="50" y1="28" x2="40" y2="30" stroke="hsl(215, 15%, 60%)" strokeWidth="0.7" />
        <line x1="50" y1="32" x2="40" y2="31" stroke="hsl(215, 15%, 60%)" strokeWidth="0.7" />
        {/* Tail */}
        <path d="M46 42 Q56 30 52 22" stroke="hsl(30, 55%, 65%)" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
      <span className="absolute -top-1 -right-1 text-sm">{moodEmoji[mood]}</span>
    </motion.div>
  );
};
