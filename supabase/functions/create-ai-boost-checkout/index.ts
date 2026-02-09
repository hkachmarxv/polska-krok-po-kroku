import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[AI-BOOST-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const { boostPlan } = await req.json();
    if (!boostPlan || !["plus", "pro"].includes(boostPlan)) {
      return new Response(JSON.stringify({ error: "Invalid boost plan. Use 'plus' or 'pro'." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Find Stripe customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customers.data.length === 0) {
      return new Response(JSON.stringify({ error: "Course access required. Please subscribe to a plan first." }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const customerId = customers.data[0].id;
    logStep("Found customer", { customerId });

    // Check course access (active subscription OR lifetime purchase)
    const subs = await stripe.subscriptions.list({ customer: customerId, status: "active", limit: 10 });
    
    // Get boost plan config from DB
    const { data: boostConfig } = await supabaseClient
      .from("ai_boost_plans")
      .select("stripe_price_id, stripe_product_id")
      .eq("slug", boostPlan)
      .eq("active", true)
      .maybeSingle();
    
    if (!boostConfig) {
      return new Response(JSON.stringify({ error: "Boost plan not found or inactive." }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get all boost plan product IDs to filter them out
    const { data: allBoostPlans } = await supabaseClient
      .from("ai_boost_plans")
      .select("stripe_product_id, stripe_price_id");
    const boostProductIds = new Set((allBoostPlans || []).map(p => p.stripe_product_id));
    const boostPriceIds = new Set((allBoostPlans || []).map(p => p.stripe_price_id));

    // Check if user has course access (any active sub that is NOT a boost)
    const hasCourseSubscription = subs.data.some(s =>
      s.items.data.some(item => !boostProductIds.has(item.price.product as string))
    );

    // Check lifetime access via checkout sessions
    let hasLifetimeAccess = false;
    if (!hasCourseSubscription) {
      const sessions = await stripe.checkout.sessions.list({ customer: customerId, limit: 100 });
      const lifetimePriceId = "price_1Syv5zGdKrTRUj6v1WzKcgSt";
      for (const session of sessions.data) {
        if (session.payment_status === "paid" && session.mode === "payment") {
          try {
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            if (lineItems.data.some(item => item.price?.id === lifetimePriceId)) {
              hasLifetimeAccess = true;
              break;
            }
          } catch { /* skip */ }
        }
      }
    }

    if (!hasCourseSubscription && !hasLifetimeAccess) {
      return new Response(JSON.stringify({ error: "Course access required. Please subscribe to a plan first." }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    logStep("Course access verified");

    // Check for existing active boost subscription
    const hasExistingBoost = subs.data.some(s =>
      s.items.data.some(item => boostPriceIds.has(item.price.id))
    );

    if (hasExistingBoost) {
      return new Response(JSON.stringify({
        error: "You already have an active AI Boost. Manage it from Settings.",
        code: "EXISTING_BOOST",
      }), {
        status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    logStep("No existing boost, proceeding to checkout");

    const origin = req.headers.get("origin") || "https://polska-krok-po-kroku.lovable.app";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: boostConfig.stripe_price_id, quantity: 1 }],
      mode: "subscription",
      success_url: `${origin}/settings?boost=success`,
      cancel_url: `${origin}/pricing?boost=cancelled`,
    });

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
