import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Dumbbell, MessageSquare, ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: GraduationCap,
    title: '20 Structured Lessons',
    description: 'A1 level course from greetings to everyday conversations, built step by step.',
  },
  {
    icon: BookOpen,
    title: 'Smart Flashcards',
    description: 'Spaced repetition system that adapts to your pace and helps you retain vocabulary.',
  },
  {
    icon: Dumbbell,
    title: 'Grammar Drills',
    description: 'Interactive exercises covering cases, conjugation, and sentence building.',
  },
  {
    icon: MessageSquare,
    title: 'AI Grammar Assistant',
    description: 'Ask any Polish grammar question and get clear, instant explanations.',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇵🇱</span>
            <span className="font-display text-xl font-bold text-foreground">LearnPolski</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container max-w-5xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Free to start — no credit card needed
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
          Learn Polish the <span className="text-primary">smart way</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Structured lessons, interactive exercises, and an AI-powered grammar assistant — everything you need to go from zero to conversational Polish.
        </p>
        <div className="flex items-center justify-center gap-3 pt-4">
          <Button size="lg" onClick={() => navigate('/auth')} className="gap-2 text-base px-8">
            Start Learning <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/auth')} className="text-base px-8">
            Sign In
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Everything you need to master Polish
          </h2>
          <p className="text-muted-foreground mt-2">Built by Polish language enthusiasts, for learners at every level.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card border border-border rounded-2xl p-6 space-y-3 card-hover shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container max-w-5xl mx-auto px-4 py-16">
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center space-y-4">
          <Brain className="w-10 h-10 text-primary mx-auto" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Ready to start your Polish journey?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Join learners already using LearnPolski to build real Polish language skills.
          </p>
          <Button size="lg" onClick={() => navigate('/auth')} className="gap-2 text-base px-8 mt-2">
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container max-w-5xl mx-auto px-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>🇵🇱</span>
            <span className="font-display font-bold">LearnPolski</span>
          </div>
          <p>© {new Date().getFullYear()} LearnPolski. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
