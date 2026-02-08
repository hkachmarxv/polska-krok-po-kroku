import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, User, Mail, Pencil, Check, X, Loader2, Camera, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BottomNav } from '@/components/BottomNav';

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || '');
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Password change state
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const email = user?.email || '';

  // Load avatar URL from profile
  useEffect(() => {
    if (!user) return;
    supabase
      .from('profiles')
      .select('avatar_url')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      });
  }, [user]);

  const handleSaveName = async () => {
    const trimmed = displayName.trim();
    if (!trimmed) {
      toast({ title: 'Invalid name', description: 'Username cannot be empty.', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ display_name: trimmed })
        .eq('user_id', user!.id);
      if (profileError) throw profileError;
      await supabase.auth.updateUser({ data: { display_name: trimmed } });
      toast({ title: 'Updated', description: 'Your username has been saved.' });
      setEditingName(false);
    } catch (err: any) {
      toast({ title: 'Update failed', description: err?.message || 'Something went wrong.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please select an image file.', variant: 'destructive' });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please choose an image under 2MB.', variant: 'destructive' });
      return;
    }

    setUploadingAvatar(true);
    try {
      const ext = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Add cache-buster
      const url = `${publicUrl}?t=${Date.now()}`;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: url })
        .eq('user_id', user.id);
      if (updateError) throw updateError;

      setAvatarUrl(url);
      toast({ title: 'Photo updated', description: 'Your profile photo has been saved.' });
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err?.message || 'Something went wrong.', variant: 'destructive' });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: 'Too short', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: 'Mismatch', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }
    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: 'Password changed', description: 'Your password has been updated successfully.' });
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordSection(false);
    } catch (err: any) {
      toast({ title: 'Failed', description: err?.message || 'Could not update password.', variant: 'destructive' });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
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
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-primary">
                  {(displayName || email)?.[0]?.toUpperCase() || '?'}
                </span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {uploadingAvatar ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
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

          {/* Password */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Password</p>
                <button
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {showPasswordSection ? 'Cancel' : 'Change password'}
                </button>
              </div>
            </div>

            {showPasswordSection && (
              <div className="mt-4 space-y-3 pl-12">
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="New password (min. 6 characters)"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    minLength={6}
                    className="w-full text-sm bg-muted rounded-lg px-3 py-2.5 pr-10 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full text-sm bg-muted rounded-lg px-3 py-2.5 text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleChangePassword}
                  disabled={changingPassword || !newPassword || !confirmPassword}
                  className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {changingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
                </button>
              </div>
            )}
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
