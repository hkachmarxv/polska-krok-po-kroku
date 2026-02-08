import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-primary/5 border border-primary/20 rounded-3xl p-10 md:p-16 text-center space-y-6 overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <span className="text-5xl block mb-4">🚀</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Polish journey starts now
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
              Lesson 1 is completely free. No credit card, no commitment. Just start learning and see the difference for yourself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/auth')} className="gap-2 text-base px-10 py-6 font-bold text-lg shadow-lg shadow-primary/25">
                Create Free Account <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Join 500+ learners already on their way</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
