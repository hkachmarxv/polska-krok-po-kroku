import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// --- In-memory IP rate limiter ---
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_ANON = 10; // max requests per window for anonymous
const RATE_LIMIT_MAX_AUTH = 30; // max requests per window for authenticated

interface RateBucket {
  count: number;
  resetAt: number;
}

const ipBuckets = new Map<string, RateBucket>();

function isRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now();
  const bucket = ipBuckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    ipBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count++;
  return bucket.count > maxRequests;
}

// Clean stale buckets every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of ipBuckets) {
    if (now > bucket.resetAt) ipBuckets.delete(ip);
  }
}, 300_000);

const MAX_TEXT_LENGTH = 200;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("cf-connecting-ip")
      || "unknown";

    const { text, voiceId } = await req.json();

    // Optional authentication - authenticated users get higher limits
    const authHeader = req.headers.get("authorization");
    let userId: string | null = null;
    if (authHeader?.startsWith("Bearer ")) {
      try {
        const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
        const client = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_ANON_KEY")!,
          { global: { headers: { Authorization: authHeader } } }
        );
        const token = authHeader.replace("Bearer ", "");
        const { data } = await client.auth.getClaims(token);
        if (data?.claims?.sub) {
          userId = data.claims.sub as string;
        }
      } catch {
        // Continue as anonymous
      }
    }

    // Tiered rate limiting: use userId if authenticated, otherwise IP
    const rateLimitKey = userId ? `user:${userId}` : `ip:${clientIp}`;
    const rateLimitMax = userId ? RATE_LIMIT_MAX_AUTH : RATE_LIMIT_MAX_ANON;

    if (isRateLimited(rateLimitKey, rateLimitMax)) {
      console.warn(`Rate limited: ${rateLimitKey}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
        }
      );
    }

    // Input validation
    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'text' parameter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const trimmedText = text.trim();
    if (trimmedText.length === 0 || trimmedText.length > MAX_TEXT_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Text must be between 1 and ${MAX_TEXT_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY is not configured");
    }

    console.log(`TTS request: "${trimmedText}" voice=${voiceId || "default"} user=${userId || "anon"} ip=${clientIp}`);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || "JWUOwsYG4XgR9Od3eeon"}/stream?output_format=mp3_22050_32`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: trimmedText,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            speed: 1.0,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs error [${response.status}]:`, errorText);
      throw new Error(`ElevenLabs API error [${response.status}]: ${errorText}`);
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("TTS Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
