import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const comparisons = [
  { feature: 'Polish-specific curriculum', us: true, others: false },
  { feature: 'AI grammar explanations', us: true, others: false },
  { feature: 'Cases & declension drills', us: true, others: false },
  { feature: 'Sentence building exercises', us: true, others: false },
  { feature: 'Progress tracking & streaks', us: true, others: true },
  { feature: 'Affordable pricing (from $30/mo)', us: true, others: false },
];

const WhyUsSection = () => {
  return (
    <section id="why" className="py-20 md:py-28 bg-card/50">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why learners choose LearnPolski
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generic language apps treat Polish like Spanish or French. We don't. Polish has 7 cases, gendered nouns, and complex verb forms — our app is built for exactly that.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-[1fr,80px,100px] md:grid-cols-[1fr,100px,120px] gap-4 px-6 py-4 border-b border-border bg-muted/50">
              <span className="text-sm font-bold text-foreground">Feature</span>
              <span className="text-sm font-bold text-primary text-center">LearnPolski</span>
              <span className="text-sm font-bold text-muted-foreground text-center">Other Apps</span>
            </div>
            {/* Rows */}
            {comparisons.map((c, i) => (
              <div
                key={c.feature}
                className={`grid grid-cols-[1fr,80px,100px] md:grid-cols-[1fr,100px,120px] gap-4 px-6 py-3.5 items-center ${
                  i < comparisons.length - 1 ? 'border-b border-border/50' : ''
                }`}
              >
                <span className="text-sm text-foreground font-medium">{c.feature}</span>
                <div className="flex justify-center">
                  <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-success" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-destructive" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
