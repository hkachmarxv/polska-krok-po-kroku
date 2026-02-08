import { useState, useCallback } from 'react';

const DAILY_LIMIT = 5;

function getTodayKey(feature: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `ai-usage-${feature}-${today}`;
}

function getUsageCount(feature: string): number {
  try {
    return parseInt(localStorage.getItem(getTodayKey(feature)) || '0', 10);
  } catch {
    return 0;
  }
}

function incrementUsage(feature: string): number {
  const key = getTodayKey(feature);
  const current = getUsageCount(feature) + 1;
  localStorage.setItem(key, String(current));
  return current;
}

export function useAiUsage(feature: 'grammar-assistant' | 'grammar-drill') {
  const [usageCount, setUsageCount] = useState(() => getUsageCount(feature));

  const remaining = Math.max(0, DAILY_LIMIT - usageCount);
  const canUse = usageCount < DAILY_LIMIT;

  const recordUsage = useCallback(() => {
    const newCount = incrementUsage(feature);
    setUsageCount(newCount);
    return newCount <= DAILY_LIMIT;
  }, [feature]);

  return { usageCount, remaining, canUse, recordUsage, limit: DAILY_LIMIT };
}
