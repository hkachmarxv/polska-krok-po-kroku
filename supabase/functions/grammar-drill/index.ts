import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a Polish grammar drill generator for English speakers learning Polish.

When asked, generate a grammar drill exercise. Return ONLY valid JSON (no markdown, no code fences) with this exact structure:

{
  "sentence": "The sentence in Polish with ___ for the blank",
  "translation": "English translation with ___ for the blank",
  "options": ["form1", "form2", "form3", "form4"],
  "correctIndex": 0,
  "explanation": "2-3 sentence explanation of why this form is correct, mentioning the grammatical rule (case, gender, conjugation, etc.)",
  "rule": "Short rule name, e.g. 'Accusative case after widzieć'",
  "tip": "A memorable trick to remember this pattern"
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, difficulty, previousWords } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let userPrompt = "Generate a Polish grammar drill exercise.";
    if (topic) userPrompt += ` Focus on: ${topic}.`;
    if (difficulty) userPrompt += ` Difficulty: ${difficulty}.`;
    if (previousWords && previousWords.length > 0) {
      userPrompt += ` Avoid using these base words: ${previousWords.join(", ")}. Use a different word/verb.`;
    }

    console.log("Generating drill with prompt:", userPrompt);

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
      console.error("No content in AI response");
      return new Response(
        JSON.stringify({ error: "No response from AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON from the response, stripping any markdown fences
    let cleaned = content.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    console.log("AI response:", cleaned);

    const drill = JSON.parse(cleaned);

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
