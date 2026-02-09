import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, authenticateUser, getUserTier, getTierLimits, getTodayUsage, getUserBoost, getMonthlyTokenUsage } from "../_shared/ai-guard.ts";

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

    // Detect boost (only for paid tiers)
    let boost = null;
    let monthlyTokensUsed = 0;
    if (tier !== "free") {
      boost = await getUserBoost(userId);
      if (boost) {
        monthlyTokensUsed = await getMonthlyTokenUsage(userId);
      }
    }

    const effectiveDailyRequests = limits.daily_request_limit + (boost?.extraDailyRequests || 0);
    const effectiveDailyTokens = limits.daily_token_limit + (boost?.extraDailyTokens || 0);

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
      totalLimits: {
        dailyRequests: effectiveDailyRequests,
        dailyTokens: effectiveDailyTokens,
      },
      remaining: {
        requests: Math.max(0, effectiveDailyRequests - totalRequests),
        tokens: Math.max(0, effectiveDailyTokens - usage.total_tokens_estimate),
      },
      boost: boost ? {
        name: boost.name,
        slug: boost.slug,
        extraDailyRequests: boost.extraDailyRequests,
        extraDailyTokens: boost.extraDailyTokens,
        monthlyTokenCap: boost.monthlyTokenCap,
        monthlyTokensUsed,
      } : null,
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
