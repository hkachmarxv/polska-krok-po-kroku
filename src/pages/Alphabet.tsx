import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Languages } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { AlphabetGrid } from '@/components/alphabet/AlphabetGrid';
import { SoundClusterCard } from '@/components/alphabet/SoundCluster';
import { AlphabetPractice } from '@/components/alphabet/AlphabetPractice';
import { QuickReference } from '@/components/alphabet/QuickReference';
import { SpeakButton } from '@/components/SpeakButton';
import { alphabetEntries, soundClusters, digraphs } from '@/data/alphabetData';

const Alphabet = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <Languages className="w-5 h-5 text-primary" />
          <h1 className="font-display text-lg font-bold text-foreground">Polish Alphabet & Sounds</h1>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Section 1: Intro */}
        <section className="space-y-3">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/15 rounded-2xl p-5">
            <h2 className="font-display font-bold text-foreground text-lg">
              🇵🇱 The Polish Alphabet
            </h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Polish uses the Latin alphabet plus <strong>9 extra letters</strong> (ą, ć, ę, ł, ń, ó, ś, ź, ż).
              The great news? Polish is <strong>phonetically consistent</strong> — once you know how each letter sounds,
              you can read <em>any</em> Polish word. No silent letters, no surprises!
            </p>
            <div className="mt-3 bg-card/60 rounded-xl p-3 border border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">📌 Stress Rule:</span>
                <span className="text-xs text-muted-foreground">Almost always on the second-to-last syllable.</span>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-primary font-medium">herbata</span>
                <span className="text-[10px] text-muted-foreground">→ her-<strong>BA</strong>-ta</span>
                <SpeakButton text="herbata" size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Full Alphabet Grid */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-foreground text-base flex items-center gap-2">
            🔤 The Full Alphabet
          </h2>
          <p className="text-xs text-muted-foreground">
            Tap any letter to hear it and see details. Color-coded by difficulty.
          </p>
          <AlphabetGrid entries={alphabetEntries} />
        </section>

        {/* Section 3: Sound Clusters */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-foreground text-base flex items-center gap-2">
            🎧 Special Sounds Deep Dive
          </h2>
          <p className="text-xs text-muted-foreground">
            Listen to similar sounds side-by-side to train your ear.
          </p>
          <div className="space-y-3">
            {soundClusters.map(cluster => (
              <SoundClusterCard key={cluster.id} cluster={cluster} />
            ))}
          </div>
        </section>

        {/* Section 4: Digraphs */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-foreground text-base flex items-center gap-2">
            🔗 Digraphs & Trigraphs
          </h2>
          <p className="text-xs text-muted-foreground">
            Two or three letters, but just <strong>one sound</strong>. Don't read them as separate letters!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {digraphs.map(d => (
              <div
                key={d.digraph}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 shadow-sm"
              >
                <SpeakButton text={d.ttsText} size="md" />
                <div className="min-w-0">
                  <p className="font-display font-bold text-foreground text-lg">{d.digraph}</p>
                  <p className="text-xs text-muted-foreground">{d.approx}</p>
                  <p className="text-xs mt-0.5">
                    <span className="text-primary font-medium">{d.example}</span>
                    <span className="text-muted-foreground"> — {d.exampleTranslation}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Practice Game */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-foreground text-base flex items-center gap-2">
            🎮 Listen & Pick
          </h2>
          <p className="text-xs text-muted-foreground">
            Hear a Polish word, then pick the key sound you heard. 10 rounds!
          </p>
          <AlphabetPractice />
        </section>

        {/* Section 6: Quick Reference */}
        <section>
          <QuickReference />
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Alphabet;
