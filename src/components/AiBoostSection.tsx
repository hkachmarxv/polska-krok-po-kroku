import { Zap, Check, Crown, Loader2 } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAiUsage } from '@/hooks/useAiUsage';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BoostPlanConfig {
  name: string;
  slug: string;
  extra_daily_requests: number;
  extra_daily_tokens: number;
  price_display: string;
}

export const AiBoostSection = () => {
  const { hasAiBoost, aiBoostPlan, startBoostCheckout, openCustomerPortal } = useSubscription();
  const { boostPlan } = useAiUsage();
  const [plans, setPlans] = useState<BoostPlanConfig[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from('ai_boost_plans')
      .select('name, slug, extra_daily_requests, extra_daily_tokens, price_display')
      .eq('active', true)
      .order('extra_daily_requests', { ascending: true })
      .then(({ data }) => {
        if (data) setPlans(data);
      });
  }, []);

  if (!plans.length) return null;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-display font-bold text-foreground text-lg flex items-center justify-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          AI Add-ons
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Need more AI explanations? Add a Boost to your plan.
        </p>
      </div>

      {/* Active boost banner */}
      {hasAiBoost && (
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 text-center">
          <p className="text-sm font-medium text-foreground">
            <Zap className="w-4 h-4 inline text-accent mr-1" />
            {boostPlan?.name || `AI Boost ${aiBoostPlan === 'pro' ? 'Pro' : 'Plus'}`} active
          </p>
          <button
            onClick={openCustomerPortal}
            className="mt-2 text-xs text-primary hover:underline"
          >
            Manage AI Boost →
          </button>
        </div>
      )}

      {/* Boost plan cards */}
      {!hasAiBoost && (
        <div className="grid gap-3">
          {plans.map((plan) => (
            <div
              key={plan.slug}
              className={`bg-card border-2 rounded-2xl p-5 relative overflow-hidden ${
                plan.slug === 'pro' ? 'border-accent/40' : 'border-border'
              }`}
            >
              {plan.slug === 'pro' && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                  BEST VALUE
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-display font-bold text-foreground">{plan.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    +{plan.extra_daily_requests} AI explanations/day
                  </p>
                </div>
                <span className="font-display font-bold text-foreground text-lg">{plan.price_display}</span>
              </div>
              <button
                onClick={() => {
                  setLoading(true);
                  startBoostCheckout(plan.slug as 'plus' | 'pro').finally(() => setLoading(false));
                }}
                disabled={loading}
                className={`w-full rounded-xl py-3 font-bold transition-colors text-sm ${
                  plan.slug === 'pro'
                    ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                } disabled:opacity-50`}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
