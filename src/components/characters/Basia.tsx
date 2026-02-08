import { motion } from 'framer-motion';
import { CharacterMood } from './Kazik';

interface Props {
  mood?: CharacterMood;
  size?: number;
  className?: string;
}

const moodEmoji: Record<CharacterMood, string> = {
  happy: '😊',
  celebrating: '🎉',
  sad: '😞',
  thinking: '🧐',
  encouraging: '👏',
};

const moodAnimation: Record<CharacterMood, any> = {
  happy: { y: [0, -2, 0], transition: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } },
  celebrating: { scale: [1, 1.08, 1], rotate: [0, 3, -3, 0], transition: { repeat: Infinity, duration: 1.2 } },
  sad: { y: [0, 1, 0], scale: [1, 0.97, 1], transition: { repeat: Infinity, duration: 2.5 } },
  thinking: { rotate: [0, -5, 0, 5, 0], transition: { repeat: Infinity, duration: 3 } },
  encouraging: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 0.8 } },
};

/** Basia the Hedgehog — Grammar helper 🦔 */
export const Basia = ({ mood = 'happy', size = 56, className = '' }: Props) => {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      animate={moodAnimation[mood]}
    >
      <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-sm">
        {/* Spikes */}
        <ellipse cx="32" cy="28" rx="20" ry="16" fill="hsl(25, 40%, 45%)" />
        <circle cx="18" cy="20" r="4" fill="hsl(25, 45%, 40%)" />
        <circle cx="46" cy="20" r="4" fill="hsl(25, 45%, 40%)" />
        <circle cx="26" cy="14" r="4" fill="hsl(25, 45%, 40%)" />
        <circle cx="38" cy="14" r="4" fill="hsl(25, 45%, 40%)" />
        <circle cx="32" cy="12" r="4" fill="hsl(25, 45%, 40%)" />
        {/* Face */}
        <ellipse cx="32" cy="36" rx="15" ry="13" fill="hsl(30, 30%, 82%)" />
        {/* Nose */}
        <circle cx="32" cy="38" r="3" fill="hsl(215, 25%, 12%)" />
        <circle cx="33" cy="37" r="1" fill="white" opacity="0.6" />
        {/* Eyes */}
        <circle cx="25" cy="32" r="2.5" fill="hsl(215, 25%, 12%)" />
        <circle cx="39" cy="32" r="2.5" fill="hsl(215, 25%, 12%)" />
        <circle cx="26" cy="31" r="0.8" fill="white" />
        <circle cx="40" cy="31" r="0.8" fill="white" />
        {/* Cheeks */}
        <circle cx="21" cy="37" r="3" fill="hsl(0, 60%, 80%)" opacity="0.4" />
        <circle cx="43" cy="37" r="3" fill="hsl(0, 60%, 80%)" opacity="0.4" />
        {/* Feet */}
        <ellipse cx="24" cy="50" rx="5" ry="3" fill="hsl(30, 30%, 75%)" />
        <ellipse cx="40" cy="50" rx="5" ry="3" fill="hsl(30, 30%, 75%)" />
      </svg>
      <span className="absolute -top-1 -right-1 text-sm">{moodEmoji[mood]}</span>
    </motion.div>
  );
};
