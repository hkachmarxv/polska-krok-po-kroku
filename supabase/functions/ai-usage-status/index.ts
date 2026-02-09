import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, authenticateUser, getUserTier, getTierLimits, getTodayUsage } from "../_shared/ai-guard.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let userId: string;
    try {
      userId = await authenticateUser(req);
    } catch {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tier = await getUserTier(userId);
    const limits = await getTierLimits(tier);
    const usage = await getTodayUsage(userId);
    const totalRequests = usage.grammar_assistant_count + usage.grammar_drill_count;

    const resetHour = 24 - new Date().getUTCHours();

    return new Response(JSON.stringify({
      tier,
      usage: {
        requestsUsed: totalRequests,
        tokensUsed: usage.total_tokens_estimate,
        grammarAssistant: usage.grammar_assistant_count,
        grammarDrill: usage.grammar_drill_count,
      },
      limits: {
        dailyRequests: limits.daily_request_limit,
        dailyTokens: limits.daily_token_limit,
      },
      remaining: {
        requests: Math.max(0, limits.daily_request_limit - totalRequests),
        tokens: Math.max(0, limits.daily_token_limit - usage.total_tokens_estimate),
      },
      resetsInHours: resetHour,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-usage-status error:", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
