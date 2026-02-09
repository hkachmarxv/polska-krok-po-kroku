import { useCallback, useSyncExternalStore } from 'react';
import { useAuth } from '@/hooks/useAuth';

const ADMIN_EMAILS = ['support@learnpolski.academy'];
const STORAGE_KEY = 'learnpolski-test-mode';

// Shared subscribers for cross-component sync
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function getSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}
function notify() {
  listeners.forEach((cb) => cb());
}

export function useTestMode() {
  const { user } = useAuth();
  const isAdmin = !!user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
  const enabled = useSyncExternalStore(subscribe, getSnapshot);

  const isTestMode = isAdmin && enabled;

  const setEnabled = useCallback((value: boolean) => {
    localStorage.setItem(STORAGE_KEY, String(value));
    notify();
  }, []);

  return { isAdmin, isTestMode, enabled, setEnabled };
}
