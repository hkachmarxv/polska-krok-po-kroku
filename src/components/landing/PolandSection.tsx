import { motion } from 'framer-motion';
import { MapPin, Heart, Utensils, Music, GraduationCap, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: TrendingUp,
    title: '38 million speakers',
    description: 'Poland is one of Europe\'s fastest-growing economies. Speaking Polish opens career and business opportunities.',
  },
  {
    icon: MapPin,
    title: 'Travel with confidence',
    description: 'From Kraków\'s medieval charm to Warsaw\'s modern skyline — navigate Poland like a local, not a tourist.',
  },
  {
    icon: Utensils,
    title: 'Incredible food culture',
    description: 'Pierogi, żurek, bigos, pączki — order like a local and discover dishes you\'d never find on English menus.',
  },
  {
    icon: Heart,
    title: 'Connect with loved ones',
    description: 'Whether your partner, family, or friends are Polish — speaking their language deepens every relationship.',
  },
  {
    icon: Music,
    title: 'Rich history & culture',
    description: 'From Chopin to The Witcher, Poland\'s contributions span music, literature, film, and gaming.',
  },
  {
    icon: GraduationCap,
    title: 'Stand out professionally',
    description: 'Polish is one of the rarest languages in global business — knowing it gives you an unmatched edge.',
  },
];

const PolandSection = () => {
  return (
    <section id="poland" className="py-20 md:py-28">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-5xl mb-4 block">🇵🇱</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Discover Poland & why Polish is worth it
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're moving, visiting, building a career, or connecting with loved ones — here's why learning Polish will change your life.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm card-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <r.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolandSection;
