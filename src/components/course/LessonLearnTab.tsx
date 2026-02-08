import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, BookCheck } from 'lucide-react';
import { Lesson, Dialogue } from '@/data/courseTypes';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SpeakButton } from '@/components/SpeakButton';
import { useVoicePreference } from '@/hooks/useVoicePreference';
import { GenderBadge } from '@/components/GenderBadge';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

interface Props {
  lesson: Lesson;
  onComplete?: () => void;
}

// Common Polish female names to detect gender from dialogue content
const FEMALE_NAMES = ['Anna', 'Ania', 'Maria', 'Marta', 'Kasia', 'Katarzyna', 'Ewa', 'Agnieszka', 'Zofia', 'Magdalena', 'Alicja', 'Joanna', 'Barbara', 'Monika', 'Natalia', 'Justyna', 'Karolina', 'Patrycja', 'Aleksandra', 'Beata', 'Dorota', 'Iwona', 'Sylwia', 'Małgorzata', 'Basia', 'Ola'];
const FEMALE_SPEAKERS = ['Pani', 'Kobieta', 'Kelnerka', 'Lekarka', 'Sprzedawczyni', 'Recepcjonistka', 'Ekspedientka', 'Nauczycielka'];
const MALE_NAMES = ['Marek', 'Jan', 'Piotr', 'Tomek', 'Tomasz', 'Adam', 'Michał', 'Paweł', 'Krzysztof', 'Jakub', 'Andrzej', 'Łukasz', 'Robert', 'Stanisław', 'Kamil', 'Grzegorz', 'Marcin', 'Wojciech', 'Rafał', 'Bartek'];

// Detect gender from a single line (speaker label + text)
const detectGenderFromLine = (speaker: string, polishText: string): 'male' | 'female' | null => {
  if (FEMALE_SPEAKERS.some(f => speaker.includes(f))) return 'female';
  if (FEMALE_NAMES.some(n => speaker.includes(n))) return 'female';
  if (MALE_NAMES.some(n => speaker.includes(n))) return 'male';
  const introPatterns = [/mam na imi[eę] (\w+)/i, /jestem (\w+)/i, /nazywam si[eę] (\w+)/i];
  for (const pattern of introPatterns) {
    const match = polishText.match(pattern);
    if (match) {
      const name = match[1];
      if (FEMALE_NAMES.some(n => n.toLowerCase() === name.toLowerCase())) return 'female';
      if (MALE_NAMES.some(n => n.toLowerCase() === name.toLowerCase())) return 'male';
      if (name.endsWith('a') && !['Kuba'].includes(name)) return 'female';
      return 'male';
    }
  }
  return null;
};

// Two-pass: scan ALL lines to build speaker→gender map, then use it
const buildSpeakerGenderMap = (dialogue: Dialogue): Record<string, 'male' | 'female'> => {
  const map: Record<string, 'male' | 'female'> = {};
  // First pass: detect from each line
  for (const line of dialogue.lines) {
    if (map[line.speaker]) continue;
    const detected = detectGenderFromLine(line.speaker, line.polish);
    if (detected) map[line.speaker] = detected;
  }
  // Fill remaining speakers with defaults (A=male, B=female, etc.)
  const speakers = [...new Set(dialogue.lines.map(l => l.speaker))];
  speakers.forEach((s, i) => {
    if (!map[s]) map[s] = i % 2 === 0 ? 'male' : 'female';
  });
  return map;
};

export const LessonLearnTab = ({ lesson, onComplete }: Props) => {
  const [expandedDialogue, setExpandedDialogue] = useState<number | null>(0);
  const { voice, setVoice } = useVoicePreference();
  const [vocabOpen, setVocabOpen] = useState(true);
  const [grammarOpen, setGrammarOpen] = useState(false);
  const [dialoguesOpen, setDialoguesOpen] = useState(false);
  const [cultureOpen, setCultureOpen] = useState(false);

  return (
    <div className="space-y-4 py-4">
      {/* Voice Preference */}
      <div className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3">
        <span className="text-sm font-medium text-foreground">🔊 Voice</span>
        <div className="flex gap-1 bg-muted rounded-lg p-0.5">
          <button
            onClick={() => setVoice('male')}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
              voice === 'male' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            👨 Male
          </button>
          <button
            onClick={() => setVoice('female')}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
              voice === 'female' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            👩 Female
          </button>
        </div>
      </div>

      {/* Vocabulary - Collapsible */}
      <Collapsible open={vocabOpen} onOpenChange={setVocabOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors">
          <h2 className="font-display text-base font-bold text-foreground">
            📚 Vocabulary ({lesson.vocabulary.length} words)
          </h2>
          {vocabOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 mt-2">
            {lesson.vocabulary.map((word) => (
              <div key={word.id} className="bg-card border border-border rounded-xl p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <SpeakButton text={word.polish} voicePreference={voice} />
                      <span className="font-display font-bold text-foreground">{word.polish}</span>
                      {word.gender && <GenderBadge gender={word.gender} />}
                    </div>
                    <p className="text-sm text-muted-foreground">{word.english}</p>
                    <p className="text-xs text-muted-foreground italic">/{word.phonetic}/</p>
                  </div>
                </div>
                {word.grammarTip && (
                  <p className="text-xs text-muted-foreground mt-2 bg-muted/50 rounded-md px-2.5 py-1.5">💡 {word.grammarTip}</p>
                )}
                {word.exampleSentence && (
                  <div className="mt-2 text-xs border-t border-border pt-2">
                    <p className="text-foreground">{word.exampleSentence}</p>
                    <p className="text-muted-foreground">{word.exampleTranslation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Grammar Summary - Collapsible */}
      <Collapsible open={grammarOpen} onOpenChange={setGrammarOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors">
          <h2 className="font-display text-base font-bold text-foreground">📐 Grammar</h2>
          {grammarOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="bg-card border border-border rounded-xl p-4 prose prose-sm max-w-none dark:prose-invert mt-2">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ children }) => (
                  <div className="overflow-x-auto -mx-2"><table className="text-xs">{children}</table></div>
                ),
                th: ({ children }) => (
                  <th className="bg-muted/50 px-2 py-1 text-left text-xs font-bold text-foreground">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="px-2 py-1 text-xs border-t border-border">{children}</td>
                ),
              }}
            >
              {lesson.grammarSummary}
            </ReactMarkdown>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Dialogues - Collapsible */}
      {lesson.dialogues.length > 0 && (
        <Collapsible open={dialoguesOpen} onOpenChange={setDialoguesOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors">
            <h2 className="font-display text-base font-bold text-foreground">💬 Dialogues</h2>
            {dialoguesOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="text-xs text-muted-foreground mt-2 mb-2">🎭 Different voices for each speaker</p>
            <div className="space-y-3">
              {lesson.dialogues.map((dialogue, i) => (
                <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedDialogue(expandedDialogue === i ? null : i)}
                    className="w-full flex items-center justify-between p-3 text-left"
                  >
                    <span className="font-display font-bold text-sm text-foreground">{dialogue.title}</span>
                    {expandedDialogue === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  {expandedDialogue === i && (
                    <div className="px-3 pb-3 space-y-2 animate-fade-in">
                      {(() => {
                        const genderMap = buildSpeakerGenderMap(dialogue);
                        return dialogue.lines.map((line, j) => {
                          const gender = genderMap[line.speaker] || 'male';
                          return (
                            <div
                              key={j}
                              className={`rounded-lg p-2.5 text-sm ${
                                gender === 'male'
                                  ? 'bg-primary/5 border-l-2 border-primary/30'
                                  : 'bg-accent/5 border-l-2 border-accent/30'
                              }`}
                            >
                              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                                {line.speaker} {gender === 'male' ? '👨' : '👩'}
                              </span>
                              <p className="font-medium text-foreground flex items-center gap-1">
                                <SpeakButton text={line.polish} size="sm" speakerGender={gender} />
                                {line.polish}
                              </p>
                              <p className="text-xs text-muted-foreground">{line.english}</p>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Cultural Note - Collapsible */}
      {lesson.culturalNote && (
        <Collapsible open={cultureOpen} onOpenChange={setCultureOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors">
            <h2 className="font-display text-base font-bold text-foreground">🌍 Cultural Note</h2>
            {cultureOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mt-2">
              <div className="prose prose-sm max-w-none dark:prose-invert text-sm">
                <ReactMarkdown>{lesson.culturalNote}</ReactMarkdown>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Mark as Studied button */}
      {onComplete && (
        <button
          onClick={onComplete}
          className="w-full flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-success-foreground rounded-xl py-4 font-bold transition-colors text-base mt-4"
        >
          <BookCheck className="w-5 h-5" />
          I've Studied This — Continue
        </button>
      )}
    </div>
  );
};
