import { useNavigate } from 'react-router-dom';
import { Clock, Sparkles, BookOpen, ArrowRight, Zap } from 'lucide-react';
import type { AiLimitInfo } from '@/hooks/useAiUsage';
import { useSubscription } from '@/hooks/useSubscription';

interface AiLimitModalProps {
  limitInfo: AiLimitInfo;
  onDismiss: () => void;
}

export const AiLimitModal = ({ limitInfo, onDismiss }: AiLimitModalProps) => {
  const navigate = useNavigate();
  const { subscribed, startBoostCheckout } = useSubscription();
  const isFree = limitInfo.tier === 'free';
  const isRateLimit = limitInfo.reason === 'RATE_LIMIT';
  const isMonthly = limitInfo.reason === 'MONTHLY_CAP';
  const hasBoost = !!limitInfo.boost;
  const isPaidNoBoost = !isFree && !hasBoost;

  if (isRateLimit) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-4 max-w-sm w-full pointer-events-auto animate-fade-in">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Slow down a bit!</p>
              <p className="text-xs text-muted-foreground">
                Wait {limitInfo.retryAfterSeconds || 3} seconds between AI requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-7 h-7 text-accent" />
          </div>
          <h2 className="font-display text-lg font-bold text-foreground">
            You've used today's AI power
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isMonthly
              ? 'Your monthly AI budget has been reached'
              : `Resets in ~${limitInfo.resetsInHours} ${limitInfo.resetsInHours === 1 ? 'hour' : 'hours'}`
            }
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-muted/30 rounded-xl p-4 mb-5">
          <p className="text-sm text-foreground">
            {isFree
              ? 'The AI Tutor is one of your most powerful tools for mastering Polish grammar. Upgrade your plan to unlock more AI explanations.'
              : isPaidNoBoost
                ? 'Want more? AI Boost gives you up to 300 additional AI explanations per day.'
                : 'Even with AI Boost, you\'ve hit today\'s ceiling. Your AI power resets soon.'
            }
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onDismiss}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3.5 font-bold transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Continue learning without AI
          </button>

          {isFree && (
            <button
              onClick={() => { onDismiss(); navigate('/pricing'); }}
              className="w-full flex items-center justify-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-xl py-3.5 font-medium transition-colors"
            >
              Upgrade for more AI access
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {isPaidNoBoost && subscribed && (
            <button
              onClick={() => { onDismiss(); startBoostCheckout('plus'); }}
              className="w-full flex items-center justify-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-xl py-3.5 font-medium transition-colors"
            >
              <Zap className="w-4 h-4" />
              Get AI Boost — from $5/mo
            </button>
          )}

          {hasBoost && (
            <a
              href="mailto:support@learnpolski.academy?subject=Request custom AI limits"
              className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-sm py-2 transition-colors"
              onClick={onDismiss}
            >
              Contact support for custom limits →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
