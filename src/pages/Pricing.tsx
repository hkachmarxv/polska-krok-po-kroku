import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Crown, Zap, Shield, Loader2 } from 'lucide-react';
import { useSubscription, PLANS } from '@/hooks/useSubscription';
import { useTestMode } from '@/hooks/useTestMode';
import { BottomNav } from '@/components/BottomNav';

const Pricing = () => {
  const navigate = useNavigate();
  const { subscribed, lifetime, hasSubscription, subscriptionEnd, loading, startCheckout, openCustomerPortal } = useSubscription();
  const { isTestMode } = useTestMode();
  // Use real subscription state (not test-mode-overridden) for displaying pricing UI
  const reallySubscribed = isTestMode ? (hasSubscription || lifetime) : subscribed;

  const features = [
    'All 20 structured A1 lessons',
    'Interactive flashcards & quizzes',
    'Sentence builder exercises',
    'Match game & grammar drills',
    'AI Grammar Assistant (5 uses/day)',
    'AI Grammar Drill (5 uses/day)',
    'Progress tracking & streaks',
    'Text-to-speech pronunciation',
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">Upgrade Your Polish</h1>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Active subscription banner */}
        {reallySubscribed && (
          <div className="bg-success/10 border border-success/30 rounded-2xl p-5 text-center">
            <Crown className="w-8 h-8 text-success mx-auto mb-2" />
            <h2 className="font-display font-bold text-foreground text-lg">
              {lifetime ? 'A1 One-Time Access Active 🎉' : 'Monthly Subscription Active'}
            </h2>
            {subscriptionEnd && !lifetime && (
              <p className="text-sm text-muted-foreground mt-1">
                Renews: {new Date(subscriptionEnd).toLocaleDateString()}
              </p>
            )}
            <button
              onClick={openCustomerPortal}
              className="mt-3 text-sm font-medium text-primary hover:underline"
            >
              Manage Subscription →
            </button>
          </div>
        )}

        {/* Free tier info */}
        {!reallySubscribed && (
          <div className="bg-card border border-border rounded-2xl p-5 text-center">
            <p className="text-sm text-muted-foreground">
              You're on the <span className="font-bold text-foreground">Free Plan</span> — Lesson 1 is free forever.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Upgrade to unlock all 20 A1 lessons and AI tools!
            </p>
          </div>
        )}

        {/* Pricing Cards */}
        {!reallySubscribed && (
          <div className="space-y-4">
            {/* Monthly */}
            <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-foreground text-lg">Monthly</h3>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-display font-bold text-foreground">$30</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => startCheckout('monthly')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3.5 font-bold transition-colors"
              >
                Subscribe Monthly
              </button>
            </div>

            {/* One-Time */}
            <div className="bg-card border-2 border-accent/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                BEST VALUE
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-accent" />
                <h3 className="font-display font-bold text-foreground text-lg">One-Time Access</h3>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-display font-bold text-foreground">$80</span>
                <span className="text-muted-foreground">one-time</span>
              </div>
              <p className="text-xs text-success font-medium mb-4">Save $280 vs 12 months of Monthly</p>
              <ul className="space-y-2 mb-6">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    {f}
                  </li>
                ))}
                <li className="flex items-center gap-2 text-sm text-foreground font-bold">
                  <Crown className="w-4 h-4 text-accent flex-shrink-0" />
                  Pay once — keep A1 access forever
                </li>
              </ul>
              <button
                onClick={() => startCheckout('onetime')}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl py-3.5 font-bold transition-colors"
              >
                Get A1 Access — $80
              </button>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Pricing;
