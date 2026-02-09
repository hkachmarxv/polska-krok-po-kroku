import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limiter for login attempts
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5; // 5 attempts per minute per IP

interface RateBucket {
  count: number;
  resetAt: number;
}

const ipBuckets = new Map<string, RateBucket>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count++;
  return bucket.count > RATE_LIMIT_MAX;
}

// Clean stale buckets every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of ipBuckets) {
    if (now > bucket.resetAt) ipBuckets.delete(ip);
  }
}, 300_000);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (isRateLimited(clientIp)) {
      // Return the same generic error to prevent enumeration
      return new Response(
        JSON.stringify({ error: "Invalid username or password." }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
        }
      );
    }

    const { username, password } = await req.json();

    if (!username || typeof username !== "string" || username.trim().length === 0 || username.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!password || typeof password !== "string" || password.length < 6 || password.length > 200) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Look up email by username using service role (not exposed to client)
    const { data: email, error: lookupError } = await serviceClient.rpc(
      "get_email_by_username",
      { username: username.trim() }
    );

    // Always attempt sign-in with a consistent delay to prevent timing attacks
    const startTime = Date.now();

    let signInResult;
    if (!lookupError && email) {
      // Create an anon client for sign-in
      const anonClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!
      );
      signInResult = await anonClient.auth.signInWithPassword({
        email: email as string,
        password,
      });
    }

    // Enforce minimum response time (300ms) to prevent timing attacks
    const elapsed = Date.now() - startTime;
    if (elapsed < 300) {
      await new Promise((r) => setTimeout(r, 300 - elapsed));
    }

    if (!signInResult || signInResult.error) {
      // Generic error - don't reveal whether username exists
      return new Response(
        JSON.stringify({ error: "Invalid username or password." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return session data
    return new Response(
      JSON.stringify({
        session: signInResult.data.session,
        user: signInResult.data.user,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("username-login error:", error);
    return new Response(
      JSON.stringify({ error: "Invalid username or password." }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
