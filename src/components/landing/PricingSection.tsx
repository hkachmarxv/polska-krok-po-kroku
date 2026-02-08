import { useNavigate } from 'react-router-dom';
import { Check, Zap, Shield, Crown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const features = [
  'All 20 structured Polish lessons',
  'Interactive flashcards & quizzes',
  'Sentence builder exercises',
  'Match game & grammar drills',
  'AI Grammar Assistant (5 uses/day)',
  'AI Grammar Drill (5 uses/day)',
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
            Lesson 1 is always free. Upgrade when you're ready to unlock everything.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl p-6 flex flex-col"
          >
            <h3 className="font-display font-bold text-foreground text-lg mb-1">Free</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-display font-bold text-foreground">$0</span>
              <span className="text-muted-foreground">/forever</span>
            </div>
            <ul className="space-y-2 mb-6 flex-1">
              <li className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-success flex-shrink-0" />
                Lesson 1 — full access
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-success flex-shrink-0" />
                Flashcards & quiz for Lesson 1
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-success flex-shrink-0" />
                Text-to-speech pronunciation
              </li>
            </ul>
            <Button variant="outline" className="w-full" onClick={() => navigate('/auth')}>
              Start Free <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>

          {/* Monthly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card border-2 border-primary/40 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg shadow-primary/5"
          >
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-foreground text-lg">Monthly</h3>
            </div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-display font-bold text-foreground">$39</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2 mb-6 flex-1">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button className="w-full font-bold" onClick={() => navigate('/auth')}>
              Subscribe Monthly
            </Button>
          </motion.div>

          {/* Lifetime */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card border-2 border-accent/30 rounded-2xl p-6 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
              BEST VALUE
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-accent" />
              <h3 className="font-display font-bold text-foreground text-lg">Lifetime</h3>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-display font-bold text-foreground">$149</span>
              <span className="text-muted-foreground">one-time</span>
            </div>
            <p className="text-xs text-success font-medium mb-4">Save $319 vs 12 months</p>
            <ul className="space-y-2 mb-6 flex-1">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  {f}
                </li>
              ))}
              <li className="flex items-center gap-2 text-sm text-foreground font-bold">
                <Crown className="w-4 h-4 text-accent flex-shrink-0" />
                Pay once, learn forever
              </li>
            </ul>
            <Button variant="outline" className="w-full font-bold border-accent text-accent hover:bg-accent/10" onClick={() => navigate('/auth')}>
              Get Lifetime Access
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
