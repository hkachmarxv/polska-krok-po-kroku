

# Add Welcome Email on Signup

## What Happens Now
- User signs up → receives a generic email verification link from the auth system
- After clicking the link → they land on the dashboard
- No branded welcome, no onboarding guidance, no personal touch

## What We'll Build
A branded welcome email sent automatically when a user completes signup, using Resend (already configured with `RESEND_API_KEY`).

## Approach

### 1. Create a Welcome Email Edge Function
- New file: `supabase/functions/send-welcome-email/index.ts`
- Triggered from the client after successful signup confirmation
- Sends a branded HTML email with:
  - LearnPolski branding (Polish flag theme, red/white colors)
  - Personal greeting using their display name
  - Quick-start tips (e.g., "Start with Lesson 1", "Try the AI Grammar Assistant")
  - Direct link to the dashboard
- Uses the existing `RESEND_API_KEY` secret

### 2. Trigger the Email
- Update `src/hooks/useAuth.tsx` to detect when a user's email is first confirmed (auth state change from unverified to verified)
- Call the edge function once on first login after verification
- Use a flag in the `profiles` table (or a simple check like "is this the first session?") to avoid sending duplicates

### 3. Register the Function
- Add `send-welcome-email` to `supabase/config.toml` with `verify_jwt = false` (we'll validate the auth token in code)

## Technical Details

**Email content will include:**
- Subject: "Welcome to LearnPolski! 🇵🇱"
- Personalized greeting with display name
- 3 quick-start action items with links
- Unsubscribe note / contact info
- Consistent branding with the landing page

**Duplicate prevention:**
- Add a `welcome_email_sent` boolean column to the `profiles` table (default: false)
- Check this flag before sending; set it to true after sending
- This ensures the email is sent exactly once per user

**Important note:** The "from" address must use a verified domain in Resend. We'll need to confirm which domain you have verified there (e.g., `noreply@yourdomain.com`). If you're still using `onboarding@resend.dev` for testing, that works too but only sends to the account owner's email.

