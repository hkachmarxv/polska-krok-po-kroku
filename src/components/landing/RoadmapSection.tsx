import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Lock } from 'lucide-react';

const levels = [
  {
    level: 'A1 — Beginner',
    status: 'live' as const,
    description: '20 structured lessons aligned to CEFR A1 standards. Pass the A1 checkpoint to prove your competence.',
    lessons: '20 lessons',
    badge: 'Available Now',
  },
  {
    level: 'A2 — Elementary',
    status: 'upcoming' as const,
    description: 'Expand your skills with past tense, shopping, travel, and expressing opinions in real conversations.',
    lessons: '20 lessons',
    badge: 'Coming Soon',
  },
  {
    level: 'B1 — Intermediate',
    status: 'planned' as const,
    description: 'Master complex grammar, discuss work and hobbies, understand news, and write longer texts with confidence.',
    lessons: '20 lessons',
    badge: 'Planned',
  },
  {
    level: 'B2 — Upper Intermediate',
    status: 'planned' as const,
    description: 'Fluent conversations, advanced grammar, professional Polish, and cultural nuances for near-native communication.',
    lessons: '20 lessons',
    badge: 'Planned',
  },
];

const statusConfig = {
  live: { icon: CheckCircle2, color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/30' },
  upcoming: { icon: Clock, color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/30' },
  planned: { icon: Lock, color: 'text-muted-foreground', bgColor: 'bg-muted', borderColor: 'border-border' },
};

const RoadmapSection = () => {
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
            Your Polish learning roadmap
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start with A1 today. We're working on more levels — each will be available as a separate course when ready.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {levels.map((l, i) => {
            const config = statusConfig[l.status];
            const Icon = config.icon;
            return (
              <motion.div
                key={l.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative flex gap-4 p-6 rounded-2xl bg-card border ${config.borderColor} shadow-sm`}
              >
                <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="font-display font-bold text-foreground text-lg">{l.level}</h3>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${config.bgColor} ${config.color}`}>
                      {l.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{l.description}</p>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">{l.lessons}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
