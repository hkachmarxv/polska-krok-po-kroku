import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTestMode } from '@/hooks/useTestMode';

// Stripe product/price IDs
export const PLANS = {
  monthly: {
    priceId: 'price_1Syv5yGdKrTRUj6vt23aIw0j',
    productId: 'prod_TwojITdzzvRsdr',
    name: 'Monthly',
    price: '$30/mo',
    mode: 'subscription' as const,
  },
  onetime: {
    priceId: 'price_1Syv5zGdKrTRUj6v1WzKcgSt',
    productId: 'prod_Twojx9VkBAUSZ1',
    name: 'One-Time',
    price: '$80',
    mode: 'payment' as const,
  },
} as const;

interface SubscriptionState {
  subscribed: boolean;
  hasSubscription: boolean;
  lifetime: boolean;
  subscriptionEnd: string | null;
  loading: boolean;
  hasAiBoost: boolean;
  aiBoostPlan: string | null;
}

interface SubscriptionContextType extends SubscriptionState {
  checkSubscription: () => Promise<void>;
  startCheckout: (plan: 'monthly' | 'onetime') => Promise<void>;
  startBoostCheckout: (plan: 'plus' | 'pro') => Promise<void>;
  openCustomerPortal: () => Promise<void>;
  cancelSubscription: () => Promise<void>;
  isLessonAccessible: (lessonId: number) => boolean;
  showCelebration: boolean;
  checkoutPlanType: 'monthly' | 'onetime';
  dismissCelebration: () => void;
  showCancellation: boolean;
  setShowCancellation: (v: boolean) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { session, user } = useAuth();
  const [state, setState] = useState<SubscriptionState>({
    subscribed: false,
    hasSubscription: false,
    lifetime: false,
    subscriptionEnd: null,
    loading: true,
    hasAiBoost: false,
    aiBoostPlan: null,
  });

  const checkSubscription = useCallback(async () => {
    if (!session?.access_token) {
      setState(prev => ({ ...prev, subscribed: false, loading: false }));
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) {
        console.error('check-subscription error:', error);
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      setState({
        subscribed: data.subscribed ?? false,
        hasSubscription: data.has_subscription ?? false,
        lifetime: data.lifetime ?? false,
        subscriptionEnd: data.subscription_end ?? null,
        loading: false,
        hasAiBoost: data.has_ai_boost ?? false,
        aiBoostPlan: data.ai_boost_plan ?? null,
      });
    } catch (e) {
      console.error('check-subscription failed:', e);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [session?.access_token]);

  // Check on auth change
  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setState({ subscribed: false, hasSubscription: false, lifetime: false, subscriptionEnd: null, loading: false, hasAiBoost: false, aiBoostPlan: null });
    }
  }, [user, checkSubscription]);

  // Periodic refresh every 60s
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(checkSubscription, 60_000);
    return () => clearInterval(interval);
  }, [user, checkSubscription]);

  // Track checkout celebration state
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [checkoutPlanType, setCheckoutPlanType] = useState<'monthly' | 'onetime'>('monthly');
  const [pendingCheckout, setPendingCheckout] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);

  // Detect checkout=success in URL (redirected tab) or __pendingCheckoutPlan (original tab)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') {
      setPendingCheckout(true);
      // Clean URL param
      const url = new URL(window.location.href);
      url.searchParams.delete('checkout');
      window.history.replaceState({}, '', url.toString());
      // Delay slightly to let Stripe process
      setTimeout(checkSubscription, 2000);
    }
    if ((window as any).__pendingCheckoutPlan) {
      setPendingCheckout(true);
      setCheckoutPlanType((window as any).__pendingCheckoutPlan);
      delete (window as any).__pendingCheckoutPlan;
    }
  }, [checkSubscription]);

  // Show celebration when subscription becomes active after a checkout
  useEffect(() => {
    if (!celebrationShown && pendingCheckout && state.subscribed && !state.loading) {
      setShowCelebration(true);
      setCelebrationShown(true);

      // Send subscription email (fire-and-forget)
      if (session?.access_token) {
        supabase.functions.invoke('send-subscription-email', {
          headers: { Authorization: `Bearer ${session.access_token}` },
          body: { planType: checkoutPlanType },
        }).catch(e => console.error('Subscription email error:', e));
      }
    }
  }, [state.subscribed, state.loading, pendingCheckout, celebrationShown, session?.access_token, checkoutPlanType]);

  const startCheckout = async (plan: 'monthly' | 'onetime') => {
    if (!session?.access_token) return;

    const planConfig = PLANS[plan];
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { priceId: planConfig.priceId, mode: planConfig.mode, referralCode: localStorage.getItem('referral_code') || undefined },
      });

      if (error) throw error;
      if (data?.url) {
        // Track which plan was selected for celebration UI
        (window as any).__pendingCheckoutPlan = plan;
        // Open checkout in new tab and poll for subscription changes
        window.open(data.url, '_blank');
        // Poll every 5s for up to 5 minutes to detect completed checkout
        const pollInterval = setInterval(async () => {
          await checkSubscription();
        }, 5000);
        setTimeout(() => clearInterval(pollInterval), 300_000);
        // Store interval ID so we can clean up if component unmounts
        (window as any).__checkoutPoll = pollInterval;
      }
    } catch (e) {
      console.error('Checkout error:', e);
    }
  };

  const startBoostCheckout = async (plan: 'plus' | 'pro') => {
    if (!session?.access_token) return;

    try {
      const { data, error } = await supabase.functions.invoke('create-ai-boost-checkout', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { boostPlan: plan },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
        // Poll for subscription change
        const pollInterval = setInterval(async () => {
          await checkSubscription();
        }, 5000);
        setTimeout(() => clearInterval(pollInterval), 300_000);
      }
    } catch (e) {
      console.error('Boost checkout error:', e);
    }
  };

  const openCustomerPortal = async () => {
    if (!session?.access_token) return;

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (e) {
      console.error('Portal error:', e);
    }
  };

  const cancelSubscription = async () => {
    if (!session?.access_token) return;

    try {
      // Open Stripe portal for actual cancellation
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }

      // Send cancellation email (fire-and-forget)
      supabase.functions.invoke('send-cancellation-email', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { subscriptionEnd: state.subscriptionEnd },
      }).catch(e => console.error('Cancellation email error:', e));

      // Start polling for subscription change
      const pollInterval = setInterval(checkSubscription, 5000);
      setTimeout(() => clearInterval(pollInterval), 300_000);
    } catch (e) {
      console.error('Cancel error:', e);
      throw e;
    }
  };

  const { isTestMode } = useTestMode();

  const isLessonAccessible = (lessonId: number) => {
    if (isTestMode) return true;
    if (lessonId === 1) return true;
    return state.subscribed;
  };

  const effectiveSubscribed = isTestMode || state.subscribed;

  const dismissCelebration = () => setShowCelebration(false);

  return (
    <SubscriptionContext.Provider value={{
      ...state,
      subscribed: effectiveSubscribed,
      checkSubscription,
      startCheckout,
      startBoostCheckout,
      openCustomerPortal,
      cancelSubscription,
      isLessonAccessible,
      showCelebration,
      checkoutPlanType,
      dismissCelebration,
      showCancellation,
      setShowCancellation,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error('useSubscription must be used within SubscriptionProvider');
  return context;
};
