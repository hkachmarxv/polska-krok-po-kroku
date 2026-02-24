import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Crown, Zap, Shield, Loader2, Tag, CheckCircle2, XCircle } from 'lucide-react';
import { useSubscription, PLANS } from '@/hooks/useSubscription';
import { useTestMode } from '@/hooks/useTestMode';
import { BottomNav } from '@/components/BottomNav';
import CancellationDialog from '@/components/CancellationDialog';
import { AiBoostSection } from '@/components/AiBoostSection';
import { supabase } from '@/integrations/supabase/client';

const Pricing = () => {
  const navigate = useNavigate();
  const { subscribed, lifetime, hasSubscription, subscriptionEnd, loading, startCheckout, openCustomerPortal, cancelSubscription, showCancellation, setShowCancellation } = useSubscription();
  const { isTestMode } = useTestMode();
  const reallySubscribed = isTestMode ? (hasSubscription || lifetime) : subscribed;

  const [refInput, setRefInput] = useState('');
  const [refStatus, setRefStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [showRefInput, setShowRefInput] = useState(false);
  const existingCode = typeof window !== 'undefined' ? localStorage.getItem('referral_code') : null;

  const validateCode = async (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setRefStatus('checking');
    const { data } = await supabase
      .from('referral_codes')
      .select('id')
      .ilike('code', trimmed)
      .eq('active', true)
      .maybeSingle();
    if (data) {
      localStorage.setItem('referral_code', trimmed);
      setRefStatus('valid');
    } else {
      setRefStatus('invalid');
    }
  };

  const features = [
    'All 20 structured A1 lessons',
    'Interactive flashcards & quizzes',
    'Sentence builder exercises',
    'Match game & grammar drills',
    'AI Grammar Assistant (generous daily limit)',
    'AI Grammar Drill (generous daily limit)',
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
              Manage Billing →
            </button>
            {!lifetime && (
              <button
                onClick={() => setShowCancellation(true)}
                className="mt-1 block mx-auto text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Cancel subscription
              </button>
            )}
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

        {/* Referral code input for existing users */}
        {!reallySubscribed && !existingCode && (
          <div className="bg-card border border-border rounded-2xl p-4">
            {!showRefInput ? (
              <button
                onClick={() => setShowRefInput(true)}
                className="flex items-center gap-2 text-sm text-primary font-medium hover:underline mx-auto"
              >
                <Tag className="w-4 h-4" />
                Have a referral code?
              </button>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Enter referral code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={refInput}
                    onChange={e => { setRefInput(e.target.value.toUpperCase()); setRefStatus('idle'); }}
                    placeholder="e.g. ANDRE"
                    className="flex-1 h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    onClick={() => validateCode(refInput)}
                    disabled={!refInput.trim() || refStatus === 'checking'}
                    className="bg-primary text-primary-foreground px-4 rounded-xl text-sm font-bold disabled:opacity-50"
                  >
                    {refStatus === 'checking' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                  </button>
                </div>
                {refStatus === 'valid' && (
                  <p className="flex items-center gap-1 text-sm text-success">
                    <CheckCircle2 className="w-4 h-4" /> Code applied — 10% off at checkout!
                  </p>
                )}
                {refStatus === 'invalid' && (
                  <p className="flex items-center gap-1 text-sm text-destructive">
                    <XCircle className="w-4 h-4" /> Invalid or expired code
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {!reallySubscribed && existingCode && (
          <div className="bg-success/10 border border-success/30 rounded-2xl p-3 text-center">
            <p className="flex items-center justify-center gap-2 text-sm text-success font-medium">
              <Tag className="w-4 h-4" /> Referral code <span className="font-bold">{existingCode}</span> applied — 10% off!
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

        {/* AI Boost Add-ons — only for users with course access */}
        {reallySubscribed && <AiBoostSection />}

        <CancellationDialog
          isOpen={showCancellation}
          onClose={() => setShowCancellation(false)}
          onConfirmCancel={cancelSubscription}
          subscriptionEnd={subscriptionEnd}
        />
      </main>

      <BottomNav />
    </div>
  );
};

export default Pricing;
