import { Link } from 'react-router-dom';

const LandingFooter = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border py-10">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🇵🇱</span>
              <span className="font-display font-bold text-foreground">LearnPolski</span>
            </div>
            <p className="text-sm text-muted-foreground">The fastest path to speaking Polish. Built for English speakers tackling Polish grammar.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-bold text-foreground text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => scrollTo('method')} className="hover:text-foreground transition-colors">Method</button></li>
              <li><button onClick={() => scrollTo('pricing')} className="hover:text-foreground transition-colors">Pricing</button></li>
              <li><button onClick={() => scrollTo('preview')} className="hover:text-foreground transition-colors">Preview</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-foreground text-sm mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => scrollTo('contact')} className="hover:text-foreground transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-bold text-foreground text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} LearnPolski. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made with ❤️ for Polish learners</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
