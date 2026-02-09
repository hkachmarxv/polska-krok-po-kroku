import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Heart, X, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CancellationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: () => Promise<void>;
  subscriptionEnd: string | null;
}

const CancellationDialog = ({ isOpen, onClose, onConfirmCancel, subscriptionEnd }: CancellationDialogProps) => {
  const [step, setStep] = useState<'confirm' | 'processing' | 'done'>('confirm');

  const endDate = subscriptionEnd
    ? new Date(subscriptionEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'the end of your billing period';

  const handleCancel = async () => {
    setStep('processing');
    try {
      await onConfirmCancel();
      setStep('done');
    } catch {
      setStep('confirm');
    }
  };

  const handleClose = () => {
    setStep('confirm');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && step !== 'processing' && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-card border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl"
          >
            {step !== 'processing' && (
              <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}

            {step === 'confirm' && (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">Cancel subscription?</h3>
                    <p className="text-xs text-muted-foreground">This can't be undone immediately</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                  <p className="text-sm text-foreground leading-relaxed">
                    If you cancel, you'll lose access to:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li>❌ Lessons 2–20</li>
                    <li>❌ AI Grammar Assistant & Drill</li>
                    <li>❌ Your learning streak</li>
                  </ul>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                  <p className="text-sm text-foreground">
                    <Heart className="w-4 h-4 text-primary inline mr-1.5 -mt-0.5" />
                    You'll still have access until <strong>{endDate}</strong>.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button onClick={handleClose} className="w-full font-semibold" size="lg">
                    Keep Learning <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                  <button
                    onClick={handleCancel}
                    className="w-full py-2.5 text-sm text-destructive hover:text-destructive/80 hover:bg-destructive/5 rounded-xl transition-colors font-medium"
                  >
                    Yes, cancel my subscription
                  </button>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="py-8 text-center space-y-4">
                <Loader2 className="w-8 h-8 text-muted-foreground animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">Processing cancellation…</p>
              </div>
            )}

            {step === 'done' && (
              <div className="space-y-5 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                  className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center"
                >
                  <span className="text-3xl">😢</span>
                </motion.div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-foreground">Do widzenia…</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your subscription has been cancelled. You still have access until <strong>{endDate}</strong>.
                  </p>
                </div>

                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We've sent a confirmation to your email. Your progress is saved — you can always come back and pick up where you left off. 💪
                  </p>
                </div>

                <Button onClick={handleClose} variant="outline" className="w-full" size="lg">
                  Close
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CancellationDialog;
