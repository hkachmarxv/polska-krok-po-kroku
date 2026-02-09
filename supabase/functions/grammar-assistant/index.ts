import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, aiGuard, recordUsage, validatePolishInput, softBlockResponse } from "../_shared/ai-guard.ts";

const SYSTEM_PROMPT = `You are a Polish grammar assistant helping an English speaker learn Polish. You specialize in explaining:

- **Polish grammatical cases** (Nominative, Genitive, Dative, Accusative, Instrumental, Locative, Vocative) — when and why each is used
- **Verb conjugation** — present, past, future, and imperative forms
- **Gender agreement** — masculine, feminine, neuter and how they affect adjectives, verbs, and pronouns
- **Word forms** — why a specific form of a word is used in a given sentence context

When a user asks "Why is it X and not Y?", explain:
1. Which grammatical rule applies (e.g. which case, why that case)
2. The pattern/rule in simple terms
3. Give 2-3 more examples of the same pattern
4. A simple memory trick if possible

Keep explanations concise and practical. Use phonetic guides (e.g. "kota" → "KOH-tah") when introducing new Polish words. Format responses with markdown for readability.

Always be encouraging — Polish grammar is hard and the learner is doing great by asking questions!

IMPORTANT: You ONLY help with Polish language learning. If asked about anything unrelated to Polish grammar, vocabulary, pronunciation, or translation, politely redirect the user back to Polish learning.`;

const MAX_OUTPUT_TOKENS = 1024;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth + rate limit check
    let guard;
    try {
      guard = await aiGuard(req, "grammar_assistant");
    } catch (e: any) {
      if (e.message === "UNAUTHORIZED") {
        return new Response(JSON.stringify({ error: "Please sign in to use the AI tutor." }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw e;
    }

    if (!guard.allowed) {
      return softBlockResponse(guard);
    }

    const { messages } = await req.json();

    // Validate last user message
    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
    if (lastUserMsg) {
      const validation = validatePolishInput(lastUserMsg.content);
      if (!validation.valid) {
        return new Response(JSON.stringify({ error: validation.reason }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Estimate input tokens (rough: 1 token ≈ 4 chars)
    const inputTokensEstimate = Math.ceil(
      messages.reduce((sum: number, m: any) => sum + (m.content?.length || 0), 0) / 4
    );

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
            ...messages,
          ],
          max_tokens: MAX_OUTPUT_TOKENS,
          stream: true,
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

    // Record usage (estimate output tokens as MAX_OUTPUT_TOKENS worst case)
    const estimatedTokens = inputTokensEstimate + MAX_OUTPUT_TOKENS;
    recordUsage(guard.userId, "grammar_assistant", estimatedTokens).catch((e) =>
      console.error("Failed to record usage:", e)
    );

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("grammar-assistant error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
