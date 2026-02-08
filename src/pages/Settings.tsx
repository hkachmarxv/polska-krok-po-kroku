import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, User, Mail, Pencil, Check, X, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BottomNav } from '@/components/BottomNav';

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || '');
  const [saving, setSaving] = useState(false);

  const email = user?.email || '';

  const handleSaveName = async () => {
    const trimmed = displayName.trim();
    if (!trimmed) {
      toast({ title: 'Invalid name', description: 'Username cannot be empty.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      // Update profile table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ display_name: trimmed })
        .eq('user_id', user!.id);

      if (profileError) throw profileError;

      // Update user metadata
      await supabase.auth.updateUser({ data: { display_name: trimmed } });

      toast({ title: 'Updated', description: 'Your username has been saved.' });
      setEditingName(false);
    } catch (err: any) {
      toast({ title: 'Update failed', description: err?.message || 'Something went wrong.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-xl font-bold text-foreground">Account</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Avatar / initials */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">
              {(displayName || email)?.[0]?.toUpperCase() || '?'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Manage your account</p>
        </div>

        {/* Info cards */}
        <div className="space-y-3">
          {/* Email */}
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground truncate">{email}</p>
            </div>
          </div>

          {/* Username */}
          <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Username</p>
              {editingName ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    autoFocus
                    maxLength={30}
                    className="flex-1 text-sm bg-muted rounded-lg px-3 py-1.5 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button onClick={handleSaveName} disabled={saving} className="p-1.5 rounded-full text-primary hover:bg-primary/10 transition-colors disabled:opacity-50">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  </button>
                  <button onClick={() => { setEditingName(false); setDisplayName(user?.user_metadata?.display_name || ''); }} className="p-1.5 rounded-full text-muted-foreground hover:bg-muted transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{displayName || 'Not set'}</p>
                  <button onClick={() => setEditingName(true)} className="p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
