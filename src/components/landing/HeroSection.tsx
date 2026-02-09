import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const stats = [
  { icon: Users, value: '500+', label: 'Active Learners' },
  { icon: Star, value: '4.9', label: 'Avg. Rating' },
  { icon: BookOpen, value: '20', label: 'A1 Lessons' },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 relative">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            CEFR A1 aligned • Lesson 1 free — no credit card needed
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-foreground leading-[1.05] tracking-tight"
          >
            The fastest path to{' '}
            <span className="relative">
              <span className="text-primary">speaking Polish</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Forget boring textbooks. LearnPolski combines structured lessons, AI-powered grammar coaching, and interactive drills to get you conversational — fast. Start with A1, and grow with us as new levels launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Button size="lg" onClick={() => navigate('/auth')} className="gap-2 text-base px-12 py-7 font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200">
              Start Learning Free <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-xs text-muted-foreground/70">Lesson 1 is free — no credit card needed</p>
          </motion.div>

          {/* Social proof stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-8 md:gap-12 pt-8"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                  <s.icon className="w-4 h-4 text-primary" />
                  <span className="font-display text-2xl font-bold text-foreground">{s.value}</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
