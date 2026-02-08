import { useState } from 'react';
import { motion } from 'framer-motion';
import { SpeakButton } from '@/components/SpeakButton';

const categories = [
  {
    name: 'Greetings',
    emoji: '👋',
    words: [
      { polish: 'Cześć', english: 'Hi / Hello', phonetic: 'cheshch' },
      { polish: 'Dzień dobry', english: 'Good morning', phonetic: 'jen DOH-bri' },
      { polish: 'Dobranoc', english: 'Good night', phonetic: 'doh-BRAH-nots' },
      { polish: 'Do widzenia', english: 'Goodbye', phonetic: 'doh vee-DZEH-nyah' },
      { polish: 'Jak się masz?', english: 'How are you?', phonetic: 'yahk sheh mahsh' },
    ],
  },
  {
    name: 'Essentials',
    emoji: '🗣️',
    words: [
      { polish: 'Tak', english: 'Yes', phonetic: 'tahk' },
      { polish: 'Nie', english: 'No', phonetic: 'nyeh' },
      { polish: 'Proszę', english: 'Please / Here you go', phonetic: 'PROH-sheh' },
      { polish: 'Dziękuję', english: 'Thank you', phonetic: 'jen-KOO-yeh' },
      { polish: 'Przepraszam', english: 'Excuse me / Sorry', phonetic: 'psheh-PRAH-shahm' },
    ],
  },
  {
    name: 'At a Café',
    emoji: '☕',
    words: [
      { polish: 'Kawa', english: 'Coffee', phonetic: 'KAH-vah' },
      { polish: 'Herbata', english: 'Tea', phonetic: 'hehr-BAH-tah' },
      { polish: 'Piwo', english: 'Beer', phonetic: 'PEE-voh' },
      { polish: 'Rachunek', english: 'Bill / Check', phonetic: 'rah-KHOO-nek' },
      { polish: 'Poproszę...', english: 'I\'d like...', phonetic: 'poh-PROH-sheh' },
    ],
  },
];

const VocabPreviewSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="preview" className="py-20 md:py-28 bg-card/50">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sneak peek: your first words
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start speaking Polish from day one. Here's a taste of what you'll learn.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === i
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Word cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto space-y-3"
        >
          {categories[activeTab].words.map((w) => (
            <div
              key={w.polish}
              className="bg-card border border-border rounded-xl px-5 py-4 flex items-center justify-between gap-4 card-hover"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg font-bold text-foreground">{w.polish}</span>
                  <span className="text-sm text-muted-foreground">{w.english}</span>
                </div>
                <p className="text-xs text-primary/70 font-medium mt-0.5">/{w.phonetic}/</p>
              </div>
              <SpeakButton text={w.polish} size="sm" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VocabPreviewSection;
