const LandingFooter = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇵🇱</span>
            <span className="font-display font-bold text-foreground">LearnPolski</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="mailto:hello@learnpolski.academy" className="hover:text-foreground transition-colors">Contact</a>
            <span>·</span>
            <span>Made with ❤️ for Polish learners</span>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} LearnPolski. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
