import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { lovable } from '@/integrations/lovable/index';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { user, loading: authLoading, signIn, signUp, signInWithUsername, resetPassword } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();


  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/dashboard`,
      });
      if (error) {
        toast({ title: 'Google sign-in failed', description: error.message, variant: 'destructive' });
      }
    } catch (err: any) {
      toast({ title: 'Google sign-in failed', description: err?.message || 'Something went wrong.', variant: 'destructive' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const isEmail = (value: string) => value.includes('@');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      if (!identifier) {
        toast({ title: 'Missing email', description: 'Please enter your email address.', variant: 'destructive' });
        return;
      }
      if (!isEmail(identifier)) {
        toast({ title: 'Invalid email', description: 'Please enter a valid email address for password reset.', variant: 'destructive' });
        return;
      }
      setLoading(true);
      try {
        const { error } = await resetPassword(identifier);
        if (error) {
          toast({ title: 'Reset failed', description: error.message, variant: 'destructive' });
        } else {
          setResetSent(true);
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!identifier || !password) {
      toast({ title: 'Missing fields', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }

    if (password.length < 6) {
      toast({ title: 'Weak password', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        // Try email or username login
        const { error } = isEmail(identifier)
          ? await signIn(identifier, password)
          : await signInWithUsername(identifier, password);

        if (error) {
          if (error.message?.includes('Email not confirmed')) {
            toast({ title: 'Email not verified', description: 'Please check your inbox and verify your email first.', variant: 'destructive' });
          } else if (error.message?.includes('Invalid login credentials')) {
            toast({ title: 'Invalid credentials', description: 'Wrong email/username or password. Please try again.', variant: 'destructive' });
          } else {
            toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
          }
        } else {
          navigate('/dashboard');
        }
      } else {
        if (!isEmail(identifier)) {
          toast({ title: 'Invalid email', description: 'Please enter a valid email address to sign up.', variant: 'destructive' });
          return;
        }
        const { error } = await signUp(identifier, password, displayName || undefined);
        if (error) {
          if (error.message?.includes('already registered')) {
            toast({ title: 'Already registered', description: 'This email is already in use. Try logging in instead.', variant: 'destructive' });
          } else {
            toast({ title: 'Signup failed', description: error.message, variant: 'destructive' });
          }
        } else {
          setConfirmationSent(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (resetSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="text-5xl">🔑</div>
          <h2 className="font-display text-xl font-bold text-foreground">Check your email</h2>
          <p className="text-sm text-muted-foreground">
            We've sent a password reset link to <span className="font-medium text-foreground">{identifier}</span>.
          </p>
          <button
            onClick={() => { setResetSent(false); setMode('login'); }}
            className="text-sm text-primary font-medium hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  if (confirmationSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="text-5xl">📧</div>
          <h2 className="font-display text-xl font-bold text-foreground">Check your email</h2>
          <p className="text-sm text-muted-foreground">
            We've sent a verification link to <span className="font-medium text-foreground">{identifier}</span>. 
            Click the link to activate your account.
          </p>
          <button
            onClick={() => { setConfirmationSent(false); setMode('login'); }}
            className="text-sm text-primary font-medium hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-accent/8 blur-3xl" />
      </div>
      <div className="w-full max-w-sm space-y-6 relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
        {/* Back to Home */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
        </div>

        {/* Logo */}
        <div className="text-center space-y-2">
          <span className="text-4xl">🇵🇱</span>
          <h1 className="font-display text-2xl font-bold text-foreground">LearnPolski</h1>
          <p className="text-sm text-muted-foreground">
            {mode === 'login' && 'Welcome back! Sign in to continue.'}
            {mode === 'signup' && 'Create your account to start learning.'}
            {mode === 'forgot' && 'Enter your email to reset your password.'}
          </p>
        </div>

        {/* Toggle (login/signup only) */}
        {mode !== 'forgot' && (
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 text-sm py-2 rounded-md font-medium transition-colors ${
                mode === 'login' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 text-sm py-2 rounded-md font-medium transition-colors ${
                mode === 'signup' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {mode === 'forgot' && (
          <button
            onClick={() => setMode('login')}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to login
          </button>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Username (optional)"
                aria-label="Username"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          )}

          <div className="relative">
            {mode === 'signup' || mode === 'forgot' ? (
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            ) : (
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            )}
            <input
              type={mode === 'signup' || mode === 'forgot' ? 'email' : 'text'}
              placeholder={mode === 'login' ? 'Email or username' : 'Email address'}
              aria-label={mode === 'login' ? 'Email or username' : 'Email address'}
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {mode !== 'forgot' && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (min. 6 characters)"
                aria-label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          )}

          {mode === 'login' && (
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="text-xs text-primary hover:underline"
            >
              Forgot your password?
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {mode === 'login' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {mode !== 'forgot' && (
          <>
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Continue with Google
            </button>
          </>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Lesson 1 is completely free — no credit card needed.
        </p>

        <p className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Auth;
