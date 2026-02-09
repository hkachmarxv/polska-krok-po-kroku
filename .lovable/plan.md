

## Plan: Settings Cancellation + Bug Fixes + Final Polish

### 1. Add Cancel Subscription to Settings Page
Add a "Subscription" card to the Settings page (between Help & Support and Test Mode) that shows:
- Current plan status (active monthly / lifetime / free)
- Renewal date if monthly
- "Manage Billing" link to Stripe portal
- "Cancel subscription" trigger that opens the same `CancellationDialog`

This requires importing `useSubscription` and `CancellationDialog` into Settings.

### 2. Fix Privacy Policy Email (Bug)
Line 53 currently says `privacy@learnpolski.com` -- change to `support@learnpolski.academy`.
Also update the surrounding text to remove the "contact form" reference and point solely to the support email.

### 3. Fix Terms of Service Email (Bug)
Line 63 currently says `legal@learnpolski.com` -- change to `support@learnpolski.academy`.
Same cleanup: single point of contact.

### 4. Add Support Email to Welcome Email Footer
The welcome email (send-welcome-email) has no support contact in its footer. Add a line: "Questions? Contact support@learnpolski.academy" to match the subscription and cancellation emails.

### 5. Summary of All Changes

| File | Change |
|------|--------|
| `src/pages/Settings.tsx` | Add subscription management card with cancel option + import useSubscription and CancellationDialog |
| `src/pages/PrivacyPolicy.tsx` | Fix contact email to support@learnpolski.academy |
| `src/pages/TermsOfService.tsx` | Fix contact email to support@learnpolski.academy |
| `supabase/functions/send-welcome-email/index.ts` | Add support email to footer |

### Technical Details

**Settings.tsx changes:**
- Import `useSubscription` and `CancellationDialog`
- Add a subscription card after Help & Support showing: Crown icon, plan name, renewal date, Manage Billing button, Cancel link
- Only show cancel for non-lifetime active subscribers
- Include the `CancellationDialog` component in the render

**Privacy Policy fix:**
- Section 7 text changes from "contact form on our website or email us at privacy@learnpolski.com" to "email us at support@learnpolski.academy"

**Terms of Service fix:**
- Section 9 text changes from "contact us through our website or email legal@learnpolski.com" to "email us at support@learnpolski.academy"

**Welcome email fix:**
- Add a support email line to the footer section matching the pattern used in subscription and cancellation emails
