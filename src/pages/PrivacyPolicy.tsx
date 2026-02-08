import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">Privacy Policy</h1>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-10 prose prose-sm dark:prose-invert">
        <p className="text-muted-foreground text-sm">Last updated: February 2026</p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">1. Information We Collect</h2>
        <p className="text-foreground/90 leading-relaxed">
          When you create an account, we collect your email address, display name, and any profile information you choose to provide. We also collect usage data such as lesson progress, quiz results, and feature interactions to improve your learning experience.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">2. How We Use Your Information</h2>
        <p className="text-foreground/90 leading-relaxed">
          We use your information to provide and improve the LearnPolski service, track your learning progress, process payments, send important service updates, and respond to support requests. We do not sell your personal data to third parties.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">3. Data Storage & Security</h2>
        <p className="text-foreground/90 leading-relaxed">
          Your data is stored securely using industry-standard encryption. We use trusted third-party services for authentication, database hosting, and payment processing (Stripe). All data transfers are encrypted via HTTPS/TLS.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">4. Cookies & Analytics</h2>
        <p className="text-foreground/90 leading-relaxed">
          We use essential cookies to maintain your login session. We may use analytics tools to understand how users interact with our app, helping us improve the learning experience. No advertising trackers are used.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">5. Third-Party Services</h2>
        <p className="text-foreground/90 leading-relaxed">
          We integrate with the following third-party services: Stripe for payment processing, Google for OAuth authentication, and AI services for grammar assistance features. Each service has its own privacy policy governing their use of data.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">6. Your Rights</h2>
        <p className="text-foreground/90 leading-relaxed">
          You have the right to access, update, or delete your personal data at any time through your account settings. You can also request a copy of your data or ask us to delete your account entirely by contacting us at the email below.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">7. Contact Us</h2>
        <p className="text-foreground/90 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us through the contact form on our website or email us at privacy@learnpolski.com.
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
