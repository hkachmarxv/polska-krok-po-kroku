import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { signIn, signUp, signInWithUsername, resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
          navigate('/');
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
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <span className="text-4xl">🇵🇱</span>
          <h1 className="font-display text-2xl font-bold text-foreground">PolishPal</h1>
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
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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

        <p className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our terms of service.
        </p>
      </div>
    </div>
  );
};

export default Auth;
