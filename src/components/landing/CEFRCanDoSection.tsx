import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Info } from 'lucide-react';

const canDoItems = [
  'Introduce yourself and greet others formally and informally',
  'Talk about your family and describe people',
  'Order food at a restaurant',
  'Ask for and understand directions',
  'Describe your daily routine',
  'Shop for items and discuss prices',
  'Talk about the past, present, and future',
  'Handle basic situations at a doctor or hotel',
  'Write simple messages and emails',
  'Understand Polish cultural customs',
];

const CEFRCanDoSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card/50">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Shield className="w-3.5 h-3.5" />
            Aligned to CEFR A1 standards
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What you'll be able to do
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            By the end of this course, you'll handle real everyday situations in Polish — proven by a final competence assessment.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {canDoItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-3"
            >
              <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              <span className="text-sm font-medium text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>

        {/* A1 explainer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="max-w-2xl mx-auto mt-8 bg-muted/50 border border-border rounded-xl px-5 py-4 flex items-start gap-3"
        >
          <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground">What A1 means:</span> You can handle basic everyday situations — introductions, ordering food, asking directions, simple conversations. It does not mean fluency — that comes at B2+. A1 is your foundation for real communication.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CEFRCanDoSection;
