import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTestMode } from '@/hooks/useTestMode';
import { supabase } from '@/integrations/supabase/client';

export interface AiBoostStatus {
  name: string;
  slug: string;
  extraDailyRequests: number;
  extraDailyTokens: number;
  monthlyTokenCap: number;
  monthlyTokensUsed: number;
}

export interface AiUsageStatus {
  tier: 'free' | 'monthly' | 'lifetime';
  usage: { requestsUsed: number; tokensUsed: number };
  limits: { dailyRequests: number; dailyTokens: number };
  totalLimits: { dailyRequests: number; dailyTokens: number };
  remaining: { requests: number; tokens: number };
  boost: AiBoostStatus | null;
  resetsInHours: number;
}

export interface AiLimitInfo {
  reason: 'DAILY_LIMIT' | 'TOKEN_LIMIT' | 'RATE_LIMIT' | 'MONTHLY_CAP';
  tier: string;
  resetsInHours: number;
  retryAfterSeconds?: number;
  boost?: { name: string; slug: string } | null;
}

export function useAiUsage() {
  const { session } = useAuth();
  const { isTestMode } = useTestMode();
  const [status, setStatus] = useState<AiUsageStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [limitInfo, setLimitInfo] = useState<AiLimitInfo | null>(null);

  const fetchStatus = useCallback(async () => {
    if (isTestMode || !session?.access_token) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-usage-status', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!error && data) {
        setStatus(data);
      }
    } catch (e) {
      console.error('Failed to fetch AI usage status:', e);
    } finally {
      setLoading(false);
    }
  }, [session?.access_token, isTestMode]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const effectiveLimit = status?.totalLimits?.dailyRequests ?? status?.limits?.dailyRequests ?? Infinity;
  const canUse = isTestMode || (status ? status.remaining.requests > 0 && status.remaining.tokens > 0 : true);
  const remaining = isTestMode ? Infinity : (status?.remaining.requests ?? Infinity);

  /** Call this when a 429 AI_LIMIT_REACHED error is received from an edge function */
  const handleLimitError = useCallback((errorBody: any) => {
    if (errorBody?.error === 'AI_LIMIT_REACHED') {
      setLimitInfo({
        reason: errorBody.reason,
        tier: errorBody.tier,
        resetsInHours: errorBody.resetsInHours,
        retryAfterSeconds: errorBody.retryAfterSeconds,
        boost: errorBody.boost,
      });
      fetchStatus();
      return true;
    }
    return false;
  }, [fetchStatus]);

  const dismissLimit = useCallback(() => setLimitInfo(null), []);

  return {
    status,
    loading,
    canUse,
    remaining,
    effectiveLimit,
    boostPlan: status?.boost ?? null,
    limitInfo,
    handleLimitError,
    dismissLimit,
    refreshStatus: fetchStatus,
  };
}
