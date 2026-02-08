import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'London, UK',
    text: 'I tried Duolingo for Polish and gave up after a week. LearnPolski actually explains WHY words change form — game changer for understanding cases.',
    rating: 5,
  },
  {
    name: 'James K.',
    location: 'Chicago, USA',
    text: 'My girlfriend is Polish and I wanted to surprise her family. After 2 months with LearnPolski I could hold a basic conversation. They were so impressed!',
    rating: 5,
  },
  {
    name: 'Anna T.',
    location: 'Berlin, Germany',
    text: 'The AI grammar assistant is like having a private tutor. I can ask "why is it kotEM not kotA" and actually get a clear answer. Love it.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card/50">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by learners worldwide
          </h2>
          <p className="text-muted-foreground text-lg">Real stories from people learning Polish with us.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed italic">"{t.text}"</p>
              <div>
                <p className="font-display font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
