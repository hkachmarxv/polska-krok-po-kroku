import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const LandingNav = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="text-2xl">🇵🇱</span>
          <span className="font-display text-xl font-bold text-foreground tracking-tight">LearnPolski</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <button onClick={() => scrollTo('why')} className="hover:text-foreground transition-colors">Why Us</button>
          <button onClick={() => scrollTo('method')} className="hover:text-foreground transition-colors">Method</button>
          <button onClick={() => scrollTo('preview')} className="hover:text-foreground transition-colors">Preview</button>
          <button onClick={() => scrollTo('pricing')} className="hover:text-foreground transition-colors">Pricing</button>
          <button onClick={() => scrollTo('poland')} className="hover:text-foreground transition-colors">Why Polish</button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>Sign In</Button>
          <Button size="sm" onClick={() => navigate('/auth')} className="font-bold">Start Free</Button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3 animate-fade-in">
          <button onClick={() => scrollTo('why')} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground">Why Us</button>
          <button onClick={() => scrollTo('method')} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground">Method</button>
          <button onClick={() => scrollTo('preview')} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground">Preview</button>
          <button onClick={() => scrollTo('pricing')} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</button>
          <button onClick={() => scrollTo('poland')} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground">Why Polish</button>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate('/auth')}>Sign In</Button>
            <Button size="sm" className="flex-1 font-bold" onClick={() => navigate('/auth')}>Start Free</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNav;
