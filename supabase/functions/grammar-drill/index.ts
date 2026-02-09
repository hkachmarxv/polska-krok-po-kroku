import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, aiGuard, recordUsage, softBlockResponse } from "../_shared/ai-guard.ts";

const SYSTEM_PROMPT = `You are a Polish grammar drill generator for English speakers learning Polish.

When asked, generate a grammar drill exercise. Return ONLY valid JSON (no markdown, no code fences) with this exact structure:

{
  "sentence": "The sentence in Polish with ___ for the blank",
  "translation": "English translation with ___ for the blank",
  "translationFull": "English translation with the blank filled in (e.g. My sister is a very talented student.)",
  "options": ["form1", "form2", "form3", "form4"],
  "correctIndex": 0,
  "explanation": "2-3 sentence explanation of why this form is correct, mentioning the grammatical rule (case, gender, conjugation, etc.)",
  "rule": "Short rule name, e.g. 'Accusative case after widzieć'",
  "tip": "A memorable trick to remember this pattern",
  "vocabulary": {
    "type": "word",
    "lemma": "zdolny",
    "meaning": "talented, gifted",
    "syllables": "zdol-ny",
    "genderForms": { "m": "zdolny", "f": "zdolna", "n": "zdolne" },
    "examplePl": "Moja siostra jest bardzo zdolna.",
    "exampleEn": "My sister is very talented."
  }
}

The "vocabulary" field teaches the student what the tested word means:
- "type" must be "word" when the blank tests a real vocabulary word (noun, adjective, verb form).
- "lemma" is the dictionary/base form.
- "meaning" should be short, A1-friendly English (e.g. "talented" not "highly competent / capable").
- "syllables" is a hyphenated syllable split (e.g. "zdol-ny"), NOT IPA.
- "genderForms" is optional; include only for adjectives and nouns that change by gender.
- "examplePl" and "exampleEn" are a simple example sentence pair using the word.

When the blank tests a grammar-only concept (case endings, pronouns, particles, prepositions), use:
{
  "vocabulary": {
    "type": "grammar_only",
    "note": "The ending -a marks feminine singular in the nominative case."
  }
}

Guidelines:
- Generate exercises covering: cases (nominative, genitive, dative, accusative, instrumental, locative, vocative), verb conjugation, gender agreement, preposition usage
- The sentence should be practical and conversational
- All 4 options should be plausible forms of the same word (different cases/conjugations)
- Include phonetic hints in the explanation when helpful
- Difficulty should vary: some easy (common phrases), some harder (less obvious cases)
- The "tip" should be a simple memory aid

When given a "topic" parameter, focus exercises on that grammar area.
When given a "difficulty" parameter (easy/medium/hard), adjust complexity accordingly.

CRITICAL: Return ONLY the JSON object, no other text.`;

const MAX_OUTPUT_TOKENS = 700;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth + rate limit check
    let guard;
    try {
      guard = await aiGuard(req, "grammar_drill");
    } catch (e: any) {
      if (e.message === "UNAUTHORIZED") {
        return new Response(JSON.stringify({ error: "Please sign in to use grammar drills." }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw e;
    }

    if (!guard.allowed) {
      return softBlockResponse(guard);
    }

    const { topic, difficulty, previousWords, lessonContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let userPrompt = "Generate a Polish grammar drill exercise.";
    if (lessonContext) userPrompt += ` Context: ${lessonContext}. Use vocabulary and grammar from this lesson context.`;
    else if (topic) userPrompt += ` Focus on: ${topic}.`;
    if (difficulty) userPrompt += ` Difficulty: ${difficulty}.`;
    if (previousWords && previousWords.length > 0) {
      userPrompt += ` Avoid using these base words: ${previousWords.join(", ")}. Use a different word/verb.`;
    }

    console.log(`[grammar-drill] user=${guard.userId} tier=${guard.tier} prompt="${userPrompt.slice(0, 100)}"`);

    const inputTokensEstimate = Math.ceil(userPrompt.length / 4);

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          max_tokens: MAX_OUTPUT_TOKENS,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No response from AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record usage
    const outputTokensEstimate = Math.ceil(content.length / 4);
    recordUsage(guard.userId, "grammar_drill", inputTokensEstimate + outputTokensEstimate).catch((e) =>
      console.error("Failed to record usage:", e)
    );

    // Parse the JSON
    let cleaned = content.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    const drill = JSON.parse(cleaned);

    // Validate vocabulary field — strip if malformed rather than failing
    if (drill.vocabulary) {
      const v = drill.vocabulary;
      if (v.type === "word") {
        if (typeof v.lemma !== "string" || typeof v.meaning !== "string") {
          delete drill.vocabulary;
        }
      } else if (v.type === "grammar_only") {
        if (typeof v.note !== "string") {
          delete drill.vocabulary;
        }
      } else {
        delete drill.vocabulary;
      }
    }

    return new Response(JSON.stringify(drill), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("grammar-drill error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
