import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithUsername: (username: string, password: string) => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const welcomeEmailSent = useRef(false);

  const recordReferral = async (userSession: Session) => {
    const code = localStorage.getItem('referral_code');
    if (!code) return;
    try {
      // Look up the referral code
      const { data: codeRow } = await supabase
        .from('referral_codes')
        .select('id')
        .ilike('code', code)
        .eq('active', true)
        .maybeSingle();
      if (!codeRow) return;
      // Insert referral row
      await supabase.from('referrals').insert({
        referral_code_id: codeRow.id,
        referred_user_id: userSession.user.id,
      });
      localStorage.removeItem('referral_code');
    } catch (e) {
      console.error('Referral recording error:', e);
    }
  };

  const sendWelcomeEmail = async (userSession: Session) => {
    if (welcomeEmailSent.current) return;
    welcomeEmailSent.current = true;
    try {
      await supabase.functions.invoke('send-welcome-email', {
        headers: { Authorization: `Bearer ${userSession.access_token}` },
      });
    } catch (e) {
      console.error('Welcome email error:', e);
      welcomeEmailSent.current = false;
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN' && currentSession) {
          const createdAt = new Date(currentSession.user.created_at).getTime();
          const now = Date.now();
          const isNewUser = now - createdAt < 120_000; // within last 2 minutes
          if (isNewUser) {
            setTimeout(() => sendWelcomeEmail(currentSession), 0);
            // Record referral if code exists in localStorage
            setTimeout(() => recordReferral(currentSession), 0);
          }
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { display_name: displayName },
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signInWithUsername = async (username: string, password: string) => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke('username-login', {
        body: { username, password },
      });

      if (fnError || !data?.session) {
        return { error: { message: data?.error || 'Invalid username or password.' } };
      }

      // Set the session from the edge function response
      const { error: setError } = await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });

      if (setError) {
        return { error: { message: setError.message } };
      }

      return { error: null };
    } catch (e: any) {
      return { error: { message: 'Invalid username or password.' } };
    }
  };

  const resetPassword = async (email: string) => {
    const redirectUrl = `${window.location.origin}/auth?mode=reset`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithUsername, resetPassword, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
