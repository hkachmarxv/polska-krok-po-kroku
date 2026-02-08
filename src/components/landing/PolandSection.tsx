import { motion } from 'framer-motion';
import { MapPin, Heart, Utensils, Music } from 'lucide-react';

const facts = [
  {
    icon: MapPin,
    title: 'Historic cities',
    description: 'From Kraków\'s medieval charm to Warsaw\'s modern skyline — Poland has Europe\'s best-kept secrets.',
  },
  {
    icon: Utensils,
    title: 'Incredible food',
    description: 'Pierogi, żurek, bigos, pączki — Polish cuisine is hearty, diverse, and absolutely delicious.',
  },
  {
    icon: Heart,
    title: 'Warm people',
    description: 'Poles are known for their hospitality. Speaking even a little Polish opens doors and hearts.',
  },
  {
    icon: Music,
    title: 'Rich culture',
    description: 'From Chopin to Witcher, Poland\'s cultural contributions span music, literature, film, and gaming.',
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
            Why learn Polish?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Poland is one of Europe's fastest-growing countries with 38 million native speakers. Whether you're moving, visiting, or falling in love — Polish is worth it.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {facts.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolandSection;
