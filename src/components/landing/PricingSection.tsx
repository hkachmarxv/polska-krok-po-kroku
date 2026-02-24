import { useNavigate } from 'react-router-dom';
import { Check, Zap, Shield, Crown, ArrowRight, Users, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const features = [
  'All 20 A1 Polish lessons',
  'Interactive flashcards & quizzes',
  'Sentence builder exercises',
  'Match game & grammar drills',
  'AI Grammar Assistant (15 uses/day)',
  'AI Grammar Drill (15 uses/day)',
  'Progress tracking & streaks',
  'Text-to-speech pronunciation',
];

const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Lesson 1 is always free. Upgrade when you're ready to unlock all 20 A1 lessons and AI tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6 max-w-4xl mx-auto items-stretch">
          {/* Left column: Free + Monthly stacked */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-2xl p-5 flex flex-col"
            >
              <h3 className="font-display font-bold text-foreground text-base mb-1">Free</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-display font-bold text-foreground">$0</span>
                <span className="text-muted-foreground text-sm">/forever</span>
              </div>
              <ul className="space-y-1.5 mb-4 flex-1">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                  Lesson 1 — full access
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                  Flashcards & quiz
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                  Text-to-speech
                </li>
              </ul>
              <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => navigate('/auth?plan=free')}>
                Start Free <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>

            {/* Monthly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-b from-primary/[0.04] to-card border border-primary/20 rounded-2xl p-5 flex flex-col flex-1"
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-primary" />
                <h3 className="font-display font-bold text-foreground text-base">Monthly</h3>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-display font-bold text-foreground">$30</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">$360/year if you stay subscribed</p>
              <ul className="space-y-1.5 mb-4 flex-1">
                {features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                    {f}
                  </li>
                ))}
                <li className="flex items-center gap-2 text-xs text-primary pl-5">
                  <Sparkles className="w-3 h-3 flex-shrink-0" />
                  + AI tools, streaks & more
                </li>
              </ul>
              <Button variant="outline" className="w-full border-primary/30 text-foreground hover:bg-primary/5" onClick={() => navigate('/auth?plan=monthly')}>
                Subscribe Monthly
              </Button>
            </motion.div>
          </div>

          {/* Right column: One-Time hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-3 bg-gradient-to-b from-primary/[0.08] via-primary/[0.03] to-card border-2 border-primary rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-xl shadow-primary/10"
          >
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              BEST VALUE
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-primary" />
              <h3 className="font-display font-bold text-foreground text-xl">One-Time Access</h3>
            </div>

            {/* Price anchoring */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="line-through text-muted-foreground text-lg">$360</span>
              <span className="text-4xl font-display font-bold text-foreground">$80</span>
              <span className="text-muted-foreground">one-time</span>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <span className="bg-success/15 text-success text-xs font-bold px-2 py-0.5 rounded-full">Save 78%</span>
              <span className="text-xs text-muted-foreground">That's less than 3 months of Monthly</span>
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  {f}
                </li>
              ))}
              <li className="flex items-center gap-2 text-sm text-foreground font-bold">
                <Crown className="w-4 h-4 text-primary flex-shrink-0" />
                Pay once — keep A1 access forever
              </li>
            </ul>

            {/* Trust callout */}
            <div className="bg-primary/[0.08] border border-primary/20 rounded-xl px-4 py-3 flex items-center gap-3 mb-5">
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground font-medium">One payment. No subscriptions. Yours forever.</span>
            </div>

            <Button size="lg" className="w-full font-bold text-base" onClick={() => navigate('/auth?plan=lifetime')}>
              Get Lifetime Access — $80
            </Button>
          </motion.div>
        </div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Users className="w-4 h-4" />
            Join hundreds of learners mastering Polish
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
