import { useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';

const ADMIN_EMAILS = ['support@learnpolski.academy'];
const STORAGE_KEY = 'learnpolski-test-mode';

function isTestModeStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function useTestMode() {
  const { user } = useAuth();
  const isAdmin = !!user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
  const [enabled, setEnabledState] = useState(() => isAdmin && isTestModeStored());

  const isTestMode = isAdmin && enabled;

  const setEnabled = useCallback((value: boolean) => {
    localStorage.setItem(STORAGE_KEY, String(value));
    setEnabledState(value);
  }, []);

  return { isAdmin, isTestMode, enabled, setEnabled };
}
