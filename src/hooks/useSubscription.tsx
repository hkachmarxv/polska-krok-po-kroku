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
}

interface SubscriptionContextType extends SubscriptionState {
  checkSubscription: () => Promise<void>;
  startCheckout: (plan: 'monthly' | 'onetime') => Promise<void>;
  openCustomerPortal: () => Promise<void>;
  isLessonAccessible: (lessonId: number) => boolean;
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
      setState({ subscribed: false, hasSubscription: false, lifetime: false, subscriptionEnd: null, loading: false });
    }
  }, [user, checkSubscription]);

  // Periodic refresh every 60s
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(checkSubscription, 60_000);
    return () => clearInterval(interval);
  }, [user, checkSubscription]);

  // Check on URL param (after checkout redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') {
      // Delay slightly to let Stripe process
      setTimeout(checkSubscription, 2000);
    }
  }, [checkSubscription]);

  const startCheckout = async (plan: 'monthly' | 'onetime') => {
    if (!session?.access_token) return;

    const planConfig = PLANS[plan];
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { priceId: planConfig.priceId, mode: planConfig.mode },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (e) {
      console.error('Checkout error:', e);
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

  const { isTestMode } = useTestMode();

  const isLessonAccessible = (lessonId: number) => {
    if (isTestMode) return true;
    if (lessonId === 1) return true;
    return state.subscribed;
  };

  const effectiveSubscribed = isTestMode || state.subscribed;

  return (
    <SubscriptionContext.Provider value={{
      ...state,
      subscribed: effectiveSubscribed,
      checkSubscription,
      startCheckout,
      openCustomerPortal,
      isLessonAccessible,
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
