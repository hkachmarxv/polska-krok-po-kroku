import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">Terms of Service</h1>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-10 prose prose-sm dark:prose-invert">
        <p className="text-muted-foreground text-sm">Last updated: February 2026</p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">1. Acceptance of Terms</h2>
        <p className="text-foreground/90 leading-relaxed">
          By accessing or using LearnPolski, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">2. Account Registration</h2>
        <p className="text-foreground/90 leading-relaxed">
          You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">3. Free & Paid Plans</h2>
        <p className="text-foreground/90 leading-relaxed">
          LearnPolski offers a free tier (Lesson 1) and paid plans (Monthly subscription at $30/month or One-Time A1 Access at $80). Paid features are accessible only after successful payment through our payment processor, Stripe.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">4. Subscription & Billing</h2>
        <p className="text-foreground/90 leading-relaxed">
          Monthly subscriptions renew automatically until canceled. You can cancel anytime through the customer portal. One-time purchases grant permanent access to A1 content. Refund requests are handled on a case-by-case basis within 14 days of purchase.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">5. Acceptable Use</h2>
        <p className="text-foreground/90 leading-relaxed">
          You agree not to misuse the service, including but not limited to: sharing your account with others, attempting to reverse-engineer the platform, using automated tools to scrape content, or using the AI features for purposes unrelated to language learning.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">6. Intellectual Property</h2>
        <p className="text-foreground/90 leading-relaxed">
          All content on LearnPolski — including lessons, exercises, audio, and AI-generated explanations — is the property of LearnPolski and is protected by copyright. You may not reproduce, distribute, or create derivative works without our written permission.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">7. Limitation of Liability</h2>
        <p className="text-foreground/90 leading-relaxed">
          LearnPolski is provided "as is" without warranty of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">8. Changes to Terms</h2>
        <p className="text-foreground/90 leading-relaxed">
          We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms. We will notify users of significant changes via email.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">9. Contact</h2>
        <p className="text-foreground/90 leading-relaxed">
          For questions about these Terms, please email us at support@learnpolski.academy.
        </p>
      </main>
    </div>
  );
};

export default TermsOfService;
