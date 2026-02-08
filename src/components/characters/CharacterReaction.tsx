import { motion, AnimatePresence } from 'framer-motion';
import { CharacterMood } from './Kazik';
import { Kazik } from './Kazik';
import { Basia } from './Basia';
import { Rysiek } from './Rysiek';
import { Lila } from './Lila';
import { useMemo } from 'react';

export type CharacterName = 'kazik' | 'basia' | 'rysiek' | 'lila';

interface Props {
  character?: CharacterName;
  mood: CharacterMood;
  message?: string;
  /** 'large' = Duolingo-style prominent display, 'inline' = small next to text */
  variant?: 'large' | 'inline';
  className?: string;
}

const characterComponents = {
  kazik: Kazik,
  basia: Basia,
  rysiek: Rysiek,
  lila: Lila,
};

const characterNames: Record<CharacterName, string> = {
  kazik: 'Kazik',
  basia: 'Basia',
  rysiek: 'Rysiek',
  lila: 'Lila',
};

const moodMessages: Record<CharacterMood, string[]> = {
  happy: ['Nice work! 🎯', 'Looking good!', 'Keep going! 💪', 'You got this!'],
  celebrating: ['Amazing! 🎉', 'Świetnie! Perfect!', 'You nailed it! ⭐', 'Brawo! Bravo! 🏆'],
  sad: ['Oops! Try again 💙', 'Almost there!', 'Don\'t give up!', 'Next time! 🤞'],
  thinking: ['Hmm, let me think...', 'Take your time...', 'What do you think? 🤔', 'Ready when you are!'],
  encouraging: ['You can do it! 🔥', 'Almost there!', 'Keep trying! 💪', 'Believe in yourself!'],
};

/** Pick a random character for the session */
const ALL_CHARACTERS: CharacterName[] = ['kazik', 'basia', 'rysiek', 'lila'];

export function getRandomCharacter(): CharacterName {
  return ALL_CHARACTERS[Math.floor(Math.random() * ALL_CHARACTERS.length)];
}

function getRandomMessage(mood: CharacterMood): string {
  const msgs = moodMessages[mood];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

export const CharacterReaction = ({
  character,
  mood,
  message,
  variant = 'inline',
  className = '',
}: Props) => {
  const charName = character || 'kazik';
  const CharComponent = characterComponents[charName];
  const displayMessage = message || getRandomMessage(mood);

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <CharComponent mood={mood} size={40} />
        <AnimatePresence mode="wait">
          {displayMessage && (
            <motion.span
              key={displayMessage}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-muted-foreground font-medium"
            >
              {displayMessage}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // === LARGE / Duolingo-style ===
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={mood}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative"
        >
          <CharComponent mood={mood} size={96} />
        </motion.div>
      </AnimatePresence>

      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayMessage}
          initial={{ opacity: 0, y: -8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="relative bg-card border border-border rounded-2xl px-4 py-2.5 shadow-md max-w-[220px] text-center"
        >
          {/* Bubble pointer */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-l border-t border-border rotate-45" />
          <p className="text-sm font-semibold text-foreground relative z-10">{displayMessage}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 relative z-10">— {characterNames[charName]}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
