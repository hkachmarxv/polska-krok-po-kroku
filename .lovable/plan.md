
# Contact / Support System for LearnPolski

Congrats on setting up the official email! Here's the plan to add contact capabilities in two places: the public landing page and inside the app.

---

## 1. Landing Page — Contact Section

Add a new **"Get in Touch"** section on the landing page (above the footer) with a simple contact form:
- **Fields**: Name, Email, Message
- **Validation**: Using zod (already installed) for proper input validation
- **Submission**: Sends the message via a backend function that forwards it to `support@learnpolski.academy` using Resend
- **UX**: Success toast confirmation after sending

The footer's existing "Contact" mailto link will also be updated to scroll to this section instead.

## 2. In-App — Help & Support

Add a **"Help & Support"** card to the **Settings page** (since that's where logged-in users manage their account):
- A card with a mail icon, showing `support@learnpolski.academy`
- Tapping it opens the device's email client (mailto link) pre-filled with the user's email as the sender
- Simple and effective — no extra page needed

## 3. Backend — Contact Form Edge Function

Create a new edge function `send-contact-email` that:
- Receives name, email, and message from the contact form
- Validates inputs server-side
- Sends the email to `support@learnpolski.academy` using Resend
- Returns success/error response

**Requirement**: You'll need to provide a **Resend API key** and verify your domain (`learnpolski.academy`) on [resend.com](https://resend.com) so emails are sent from your domain (e.g., `noreply@learnpolski.academy`).

---

## Technical Details

### New files:
- `src/components/landing/ContactSection.tsx` — Contact form component with name/email/message fields, zod validation, and submission logic
- `supabase/functions/send-contact-email/index.ts` — Edge function using Resend to forward contact form submissions

### Modified files:
- `src/pages/LandingPage.tsx` — Add `<ContactSection />` before the footer
- `src/components/landing/LandingFooter.tsx` — Change "Contact" link to scroll to `#contact` section
- `src/components/landing/LandingNav.tsx` — Add "Contact" nav link pointing to `#contact`
- `src/pages/Settings.tsx` — Add a "Help & Support" card with mailto link to `support@learnpolski.academy`

### Secret required:
- `RESEND_API_KEY` — You'll need to sign up at [resend.com](https://resend.com), verify your domain, and create an API key
