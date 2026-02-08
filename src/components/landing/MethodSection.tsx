import { BookOpen, Brain, Dumbbell, Repeat, MessageSquare, Trophy, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: BookOpen,
    step: '01',
    title: 'Learn with context',
    description: 'Each lesson teaches vocabulary through real scenarios — ordering food, introducing yourself, asking for directions.',
    detail: '20 lessons covering A1-level Polish with dialogues, grammar notes, and cultural tips.',
  },
  {
    icon: Dumbbell,
    step: '02',
    title: 'Drill the grammar',
    description: 'Interactive fill-in-the-blank exercises for cases, conjugation, and sentence structure.',
    detail: 'AI-generated drills adapt to your level — easy, medium, or hard — with instant explanations.',
  },
  {
    icon: Repeat,
    step: '03',
    title: 'Practice & retain',
    description: 'Flashcards with spaced repetition, matching games, and sentence building drills.',
    detail: 'Multiple exercise types per lesson: cards, match, build, and more to keep it fresh.',
  },
  {
    icon: MessageSquare,
    step: '04',
    title: 'Ask the AI tutor',
    description: 'Confused about a grammar rule? Get a clear, instant explanation from our AI assistant.',
    detail: 'Like having a Polish teacher on call — ask "Why kota not kot?" and get a real answer.',
  },
  {
    icon: Brain,
    step: '05',
    title: 'Test yourself',
    description: 'Quizzes after every lesson measure your progress. Score 70%+ to unlock the next chapter.',
    detail: 'Multiple-choice quizzes with translation and fill-in-the-blank questions.',
  },
  {
    icon: Trophy,
    step: '06',
    title: 'Build streaks',
    description: 'Daily practice streaks and progress tracking keep you motivated and consistent.',
    detail: 'Track words learned, lessons completed, and maintain your daily streak.',
  },
];

const MethodSection = () => {
  const navigate = useNavigate();

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
              className="bg-card border border-border rounded-2xl p-6 space-y-3 card-hover shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display text-xs font-bold text-muted-foreground tracking-widest uppercase">Step {s.step}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              <p className="text-xs text-primary/80 leading-relaxed border-t border-border pt-3">{s.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Button variant="outline" size="lg" onClick={() => navigate('/auth')} className="gap-2">
            Try Lesson 1 Free <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodSection;
