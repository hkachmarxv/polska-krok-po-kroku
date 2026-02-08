

# LearnPolski — Rebrand + Landing Page + Custom Domain

## What we'll do

### 1. Rename the app to "LearnPolski"
Update every place the old name "PolishPal" appears:
- `index.html` — page title and meta tags
- `src/pages/Auth.tsx` — logo/heading on the login screen
- `src/pages/Dashboard.tsx` — header branding
- Any other files referencing "PolishPal"

### 2. Create a public Landing Page
A new marketing-style homepage at `/` that visitors see **before** signing up. It will include:
- Hero section with tagline (e.g. "Learn Polish the smart way")
- Feature highlights (lessons, flashcards, grammar drills, AI assistant)
- Call-to-action buttons ("Get Started" / "Sign In")
- Clean, modern design matching the existing style

The current dashboard moves from `/` to `/dashboard`, and the `ProtectedRoute` logic stays on `/dashboard` and all app routes. The landing page is fully public.

### 3. Custom Domain setup
Once you have a domain (e.g. `learnpolski.com`), you'll connect it through:
- **Project Settings -> Domains -> Connect Domain**
- Add DNS records at your domain registrar:
  - A record for `@` pointing to `185.158.133.1`
  - A record for `www` pointing to `185.158.133.1`
  - TXT record as provided by Lovable for verification
- SSL is provisioned automatically

This does not require any code changes — it's done through the Lovable project settings UI.

---

## Technical details

**Routing changes in `App.tsx`:**
- `/` — new public `LandingPage` component (no auth required)
- `/dashboard` — existing `Dashboard` (protected)
- `/auth` — stays the same
- All other routes stay the same

**New file:**
- `src/pages/LandingPage.tsx` — hero, features grid, CTA buttons linking to `/auth`

**Files to edit for rebrand:**
- `index.html` (title, og:title, description)
- `src/pages/Auth.tsx` (heading text)
- `src/pages/Dashboard.tsx` (header text)
- `src/App.tsx` (route restructure)
- `src/components/BottomNav.tsx` (if it references the name)

**Navigation updates:**
- After login, redirect to `/dashboard` instead of `/`
- Landing page "Sign In" / "Get Started" buttons navigate to `/auth`

