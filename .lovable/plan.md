

# Bug Fix: Stop Calling send-welcome-email on Every Login

## Problem

The `useAuth.tsx` hook currently triggers the `send-welcome-email` Edge Function on **every** `SIGNED_IN` event -- including regular logins and session restores on page refresh. While the server-side function correctly checks the `welcome_email_sent` flag (so no duplicate emails are sent), this still creates unnecessary network requests on every login.

## Fix

A single change in `src/hooks/useAuth.tsx`: add a time-based check so `sendWelcomeEmail` is only called when the user account was created within the last 2 minutes (i.e., a genuinely new sign-up).

## Technical Details

**File: `src/hooks/useAuth.tsx`**

Replace the current `SIGNED_IN` handler:

```typescript
if (event === 'SIGNED_IN' && currentSession) {
  setTimeout(() => sendWelcomeEmail(currentSession), 0);
}
```

With:

```typescript
if (event === 'SIGNED_IN' && currentSession) {
  const createdAt = new Date(currentSession.user.created_at).getTime();
  const now = Date.now();
  const isNewUser = now - createdAt < 120_000; // within last 2 minutes
  if (isNewUser) {
    setTimeout(() => sendWelcomeEmail(currentSession), 0);
  }
}
```

**What stays the same:**
- The `welcomeEmailSent` ref remains as an additional client-side dedup layer
- The Edge Function's server-side `welcome_email_sent` database check remains as the ultimate safety net
- No other files are modified

