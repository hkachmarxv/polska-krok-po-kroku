import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, PartyPopper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CONFETTI_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--success))',
  'hsl(var(--streak))',
  '#FFD700',
  '#FF6B6B',
  '#4ECDC4',
  '#A78BFA',
];

const ConfettiPiece = ({ index }: { index: number }) => {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const startX = Math.random() * 100;
  const delay = Math.random() * 0.8;
  const duration = 2 + Math.random() * 2;
  const size = 6 + Math.random() * 8;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      initial={{ y: -20, x: `${startX}vw`, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: '100vh',
        rotate: rotation + 720,
        opacity: [1, 1, 0.8, 0],
        scale: [1, 1.2, 0.8],
      }}
      transition={{ duration, delay, ease: 'easeIn' }}
      className="absolute top-0 pointer-events-none z-50"
      style={{
        width: size,
        height: size * (Math.random() > 0.5 ? 1 : 2.5),
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      }}
    />
  );
};

interface CheckoutCelebrationProps {
  isVisible: boolean;
  onDismiss: () => void;
  planType?: 'monthly' | 'onetime';
}

const CheckoutCelebration = ({ isVisible, onDismiss, planType }: CheckoutCelebrationProps) => {
  const navigate = useNavigate();
  const [confettiPieces] = useState(() => Array.from({ length: 60 }, (_, i) => i));

  const handleContinue = () => {
    onDismiss();
    navigate('/course');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onDismiss()}
        >
          {/* Confetti */}
          {confettiPieces.map((i) => (
            <ConfettiPiece key={i} index={i} />
          ))}

          {/* Card */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.15 }}
            className="relative bg-card border-2 border-primary/30 rounded-3xl p-8 mx-4 max-w-sm w-full shadow-2xl overflow-hidden"
          >
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-accent/5 pointer-events-none" />

            <div className="relative text-center space-y-5">
              {/* Animated icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.4 }}
                className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Crown className="w-10 h-10 text-primary" />
                </motion.div>
              </motion.div>

              {/* Sparkle accents */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute top-4 right-8"
              >
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute top-8 left-8"
              >
                <PartyPopper className="w-4 h-4 text-streak animate-pulse" />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Witamy! 🎉
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {planType === 'onetime'
                    ? "You've unlocked lifetime A1 access! All 20 lessons, AI tools, and exercises are yours forever."
                    : "Your subscription is active! All 20 A1 lessons, AI tools, and exercises are now unlocked."
                  }
                </p>
              </motion.div>

              {/* Stats teaser */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="flex justify-center gap-6 py-3"
              >
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-primary">20</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Lessons</p>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-accent">500+</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Words</p>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-success">AI</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Tools</p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  onClick={handleContinue}
                  className="w-full font-bold text-base py-6 rounded-xl"
                  size="lg"
                >
                  Start Learning <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <button
                  onClick={onDismiss}
                  className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Stay on this page
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutCelebration;
