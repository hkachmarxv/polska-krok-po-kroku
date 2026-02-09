import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

export interface AiGuardResult {
  userId: string;
  tier: "free" | "monthly" | "lifetime";
  limits: { daily_request_limit: number; daily_token_limit: number; min_interval_seconds: number };
  usage: { request_count: number; token_count: number; last_used_at: string | null };
  allowed: boolean;
  reason?: string;
}

function getServiceClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

function getAnonClient(authHeader: string) {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );
}

/** Authenticate user from Authorization header, returns userId or throws */
export async function authenticateUser(req: Request): Promise<string> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("UNAUTHORIZED");
  }

  const client = getAnonClient(authHeader);
  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await client.auth.getClaims(token);
  if (error || !data?.claims?.sub) {
    throw new Error("UNAUTHORIZED");
  }
  return data.claims.sub as string;
}

/** Determine user tier based on subscription status */
export async function getUserTier(userId: string): Promise<"free" | "monthly" | "lifetime"> {
  // Check subscription via Stripe (reuse check-subscription logic)
  const serviceClient = getServiceClient();
  const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
  if (!STRIPE_SECRET_KEY) return "free";

  try {
    // Get user email
    const { data: userData } = await serviceClient.auth.admin.getUserById(userId);
    if (!userData?.user?.email) return "free";

    // Check Stripe customers
    const customerRes = await fetch(
      `https://api.stripe.com/v1/customers?email=${encodeURIComponent(userData.user.email)}&limit=1`,
      { headers: { Authorization: `Basic ${btoa(STRIPE_SECRET_KEY + ":")}` } }
    );
    const customers = await customerRes.json();
    if (!customers.data?.length) return "free";

    const customerId = customers.data[0].id;

    // Check active subscriptions
    const subRes = await fetch(
      `https://api.stripe.com/v1/subscriptions?customer=${customerId}&status=active&limit=1`,
      { headers: { Authorization: `Basic ${btoa(STRIPE_SECRET_KEY + ":")}` } }
    );
    const subs = await subRes.json();
    if (subs.data?.length > 0) return "monthly";

    // Check for lifetime (successful one-time payment)
    const piRes = await fetch(
      `https://api.stripe.com/v1/payment_intents?customer=${customerId}&limit=10`,
      { headers: { Authorization: `Basic ${btoa(STRIPE_SECRET_KEY + ":")}` } }
    );
    const pis = await piRes.json();
    const hasLifetime = pis.data?.some((pi: any) => pi.status === "succeeded" && !pi.invoice);
    if (hasLifetime) return "lifetime";

    return "free";
  } catch (e) {
    console.error("getUserTier error:", e);
    return "free";
  }
}

/** Get limits for a tier from DB */
export async function getTierLimits(tier: string) {
  const serviceClient = getServiceClient();
  const { data } = await serviceClient
    .from("ai_limits")
    .select("daily_request_limit, daily_token_limit, min_interval_seconds")
    .eq("tier", tier)
    .maybeSingle();

  return data || { daily_request_limit: 15, daily_token_limit: 50000, min_interval_seconds: 3 };
}

/** Get today's usage for a user */
export async function getTodayUsage(userId: string) {
  const serviceClient = getServiceClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data } = await serviceClient
    .from("ai_usage_daily")
    .select("grammar_assistant_count, grammar_drill_count, total_tokens_estimate, last_used_at")
    .eq("user_id", userId)
    .eq("usage_date", today)
    .maybeSingle();

  return data || { grammar_assistant_count: 0, grammar_drill_count: 0, total_tokens_estimate: 0, last_used_at: null };
}

/** Full guard check: auth + limits + burst rate */
export async function aiGuard(req: Request, feature: "grammar_assistant" | "grammar_drill"): Promise<AiGuardResult> {
  const userId = await authenticateUser(req);
  const tier = await getUserTier(userId);
  const limits = await getTierLimits(tier);
  const usage = await getTodayUsage(userId);

  const totalRequests = usage.grammar_assistant_count + usage.grammar_drill_count;

  // Burst rate check
  if (usage.last_used_at) {
    const elapsed = (Date.now() - new Date(usage.last_used_at).getTime()) / 1000;
    if (elapsed < limits.min_interval_seconds) {
      return { userId, tier, limits, usage: { request_count: totalRequests, token_count: usage.total_tokens_estimate, last_used_at: usage.last_used_at }, allowed: false, reason: "RATE_LIMIT" };
    }
  }

  // Request count check
  if (totalRequests >= limits.daily_request_limit) {
    return { userId, tier, limits, usage: { request_count: totalRequests, token_count: usage.total_tokens_estimate, last_used_at: usage.last_used_at }, allowed: false, reason: "DAILY_LIMIT" };
  }

  // Token budget check
  if (usage.total_tokens_estimate >= limits.daily_token_limit) {
    return { userId, tier, limits, usage: { request_count: totalRequests, token_count: usage.total_tokens_estimate, last_used_at: usage.last_used_at }, allowed: false, reason: "TOKEN_LIMIT" };
  }

  return { userId, tier, limits, usage: { request_count: totalRequests, token_count: usage.total_tokens_estimate, last_used_at: usage.last_used_at }, allowed: true };
}

/** Record usage after a successful AI call */
export async function recordUsage(userId: string, feature: "grammar_assistant" | "grammar_drill", estimatedTokens: number) {
  const serviceClient = getServiceClient();
  const today = new Date().toISOString().slice(0, 10);
  const countCol = feature === "grammar_assistant" ? "grammar_assistant_count" : "grammar_drill_count";

  // Upsert: increment the count and tokens
  const { data: existing } = await serviceClient
    .from("ai_usage_daily")
    .select("id, grammar_assistant_count, grammar_drill_count, total_tokens_estimate")
    .eq("user_id", userId)
    .eq("usage_date", today)
    .maybeSingle();

  if (existing) {
    const updateData: Record<string, any> = {
      total_tokens_estimate: existing.total_tokens_estimate + estimatedTokens,
      last_used_at: new Date().toISOString(),
    };
    updateData[countCol] = (existing as any)[countCol] + 1;

    await serviceClient.from("ai_usage_daily").update(updateData).eq("id", existing.id);
  } else {
    const insertData: Record<string, any> = {
      user_id: userId,
      usage_date: today,
      grammar_assistant_count: 0,
      grammar_drill_count: 0,
      total_tokens_estimate: estimatedTokens,
      last_used_at: new Date().toISOString(),
    };
    insertData[countCol] = 1;

    await serviceClient.from("ai_usage_daily").insert(insertData);
  }

  // Log for anomaly detection
  const totalRequests = (existing?.grammar_assistant_count || 0) + (existing?.grammar_drill_count || 0) + 1;
  if (totalRequests > 50) {
    console.warn(`[ANOMALY] High usage: user=${userId} requests=${totalRequests} tokens=${(existing?.total_tokens_estimate || 0) + estimatedTokens}`);
  }
}

/** Basic input validation for Polish-learning content */
export function validatePolishInput(text: string): { valid: boolean; reason?: string } {
  if (!text || typeof text !== "string") return { valid: false, reason: "Empty input" };

  const trimmed = text.trim();
  if (trimmed.length === 0) return { valid: false, reason: "Empty input" };
  if (trimmed.length > 1500) return { valid: false, reason: "Input too long (max 1,500 characters)" };

  // Basic abuse detection: reject obvious non-Polish-learning prompts
  const abusePatterns = [
    /write\s+(me\s+)?(a\s+)?(code|script|program|essay|story|article)/i,
    /generate\s+(a\s+)?(code|script|program|essay|story|article)/i,
    /ignore\s+(previous|all|above)\s+(instructions|prompts)/i,
    /you\s+are\s+now/i,
    /pretend\s+(to\s+be|you\s+are)/i,
    /act\s+as\s+(a|an)\s+(?!polish|language|grammar|tutor)/i,
    /jailbreak/i,
    /DAN\s+mode/i,
  ];

  for (const pattern of abusePatterns) {
    if (pattern.test(trimmed)) {
      return { valid: false, reason: "I can only help with Polish language learning! Try asking about grammar, vocabulary, or translations. 🇵🇱" };
    }
  }

  return { valid: true };
}

/** Build a soft-block JSON response */
export function softBlockResponse(guard: AiGuardResult) {
  const resetHour = 24 - new Date().getUTCHours();
  const body: Record<string, any> = {
    error: "AI_LIMIT_REACHED",
    tier: guard.tier,
    reason: guard.reason,
    resetsInHours: resetHour,
    usage: guard.usage,
    limits: {
      dailyRequests: guard.limits.daily_request_limit,
      dailyTokens: guard.limits.daily_token_limit,
    },
  };

  if (guard.reason === "RATE_LIMIT") {
    body.retryAfterSeconds = guard.limits.min_interval_seconds;
  }

  return new Response(JSON.stringify(body), {
    status: 429,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
