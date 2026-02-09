import { useNavigate } from 'react-router-dom';
import { Clock, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import type { AiLimitInfo } from '@/hooks/useAiUsage';

interface AiLimitModalProps {
  limitInfo: AiLimitInfo;
  onDismiss: () => void;
}

export const AiLimitModal = ({ limitInfo, onDismiss }: AiLimitModalProps) => {
  const navigate = useNavigate();
  const isFree = limitInfo.tier === 'free';
  const isRateLimit = limitInfo.reason === 'RATE_LIMIT';

  if (isRateLimit) {
    // Brief toast-style for burst rate limits — auto-dismiss
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
            You've reached today's AI limit
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Resets in ~{limitInfo.resetsInHours} {limitInfo.resetsInHours === 1 ? 'hour' : 'hours'}
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-muted/30 rounded-xl p-4 mb-5">
          <p className="text-sm text-foreground">
            {limitInfo.reason === 'TOKEN_LIMIT'
              ? "You've used your daily AI token budget. This helps us keep AI features available for everyone."
              : "You've used all your AI requests for today. This helps us keep AI features available for everyone."}
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

          {!isFree && (
            <a
              href="mailto:support@learnpolski.academy?subject=Request extra AI access"
              className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-sm py-2 transition-colors"
              onClick={onDismiss}
            >
              Request extra AI access →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
