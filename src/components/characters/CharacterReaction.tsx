import { motion, AnimatePresence } from 'framer-motion';
import { CharacterMood } from './Kazik';
import { Kazik } from './Kazik';
import { Basia } from './Basia';
import { Rysiek } from './Rysiek';
import { Lila } from './Lila';

export type CharacterName = 'kazik' | 'basia' | 'rysiek' | 'lila';

interface Props {
  character: CharacterName;
  mood: CharacterMood;
  message?: string;
  size?: number;
  className?: string;
}

const characterComponents = {
  kazik: Kazik,
  basia: Basia,
  rysiek: Rysiek,
  lila: Lila,
};

export const CharacterReaction = ({ character, mood, message, size = 56, className = '' }: Props) => {
  const CharComponent = characterComponents[character];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <CharComponent mood={mood} size={size} />
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, x: -8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.25 }}
            className="bg-card border border-border rounded-xl px-3 py-2 text-xs text-foreground font-medium shadow-sm max-w-[180px]"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
