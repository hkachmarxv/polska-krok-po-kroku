import { BookOpen, Brain, Dumbbell, Repeat, MessageSquare, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: BookOpen,
    step: '01',
    title: 'Learn with context',
    description: 'Each lesson teaches vocabulary through real scenarios — ordering food, introducing yourself, asking for directions.',
  },
  {
    icon: Dumbbell,
    step: '02',
    title: 'Drill the grammar',
    description: 'Interactive fill-in-the-blank exercises for cases, conjugation, and sentence structure — the hardest parts of Polish, made manageable.',
  },
  {
    icon: Repeat,
    step: '03',
    title: 'Practice & retain',
    description: 'Flashcards with spaced repetition, matching games, and sentence building drills keep words in your long-term memory.',
  },
  {
    icon: MessageSquare,
    step: '04',
    title: 'Ask the AI tutor',
    description: 'Confused about a grammar rule? Ask our AI assistant and get a clear, instant explanation — like having a Polish teacher on call.',
  },
  {
    icon: Brain,
    step: '05',
    title: 'Test yourself',
    description: 'Quizzes after every lesson measure your progress. Score 70%+ to unlock the next chapter.',
  },
  {
    icon: Trophy,
    step: '06',
    title: 'Build streaks',
    description: 'Daily practice streaks and progress tracking keep you motivated and consistent.',
  },
];

const MethodSection = () => {
  return (
    <section id="method" className="py-20 md:py-28">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            A method that actually works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No gamification fluff. Every feature is designed to build real skills.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-4 card-hover shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display text-xs font-bold text-muted-foreground tracking-widest uppercase">Step {s.step}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
