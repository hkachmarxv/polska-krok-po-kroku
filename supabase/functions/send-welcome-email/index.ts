import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Authenticate the user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;
    const userEmail = claimsData.claims.email as string;

    // Check if welcome email was already sent
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("welcome_email_sent, display_name")
      .eq("user_id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      throw new Error("Could not fetch profile");
    }

    if (profile.welcome_email_sent) {
      console.log("Welcome email already sent for user:", userId);
      return new Response(JSON.stringify({ success: true, already_sent: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send the welcome email
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service is not configured");
    }

    const resend = new Resend(apiKey);
    const displayName = profile.display_name || "there";
    const dashboardUrl = "https://polska-krok-po-kroku.lovable.app/dashboard";

    const { error: emailError } = await resend.emails.send({
      from: "LearnPolski <noreply@learnpolski.academy>",
      to: [userEmail],
      subject: "Welcome to LearnPolski! 🇵🇱",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff;font-weight:800;font-size:24px;padding:12px 24px;border-radius:12px;letter-spacing:-0.5px;">
        Learn<span style="color:#fecaca;">Polski</span>
      </div>
    </div>

    <!-- Card -->
    <div style="background:#fff;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
      <h1 style="color:#111;font-size:22px;margin:0 0 8px;">Cześć, ${displayName}! 👋</h1>
      <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Welcome to LearnPolski — you've just taken the first step toward speaking Polish with confidence.
      </p>

      <h2 style="color:#111;font-size:16px;margin:0 0 16px;">Here's how to get started:</h2>

      <!-- Tip 1 -->
      <div style="display:flex;align-items:flex-start;margin-bottom:16px;">
        <div style="background:#fef2f2;color:#dc2626;font-weight:700;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;">1</div>
        <div style="margin-left:12px;">
          <strong style="color:#111;font-size:14px;">Start Lesson 1</strong>
          <p style="color:#666;font-size:13px;margin:2px 0 0;line-height:1.5;">Learn essential greetings and introductions — the building blocks of every conversation.</p>
        </div>
      </div>

      <!-- Tip 2 -->
      <div style="display:flex;align-items:flex-start;margin-bottom:16px;">
        <div style="background:#fef2f2;color:#dc2626;font-weight:700;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;">2</div>
        <div style="margin-left:12px;">
          <strong style="color:#111;font-size:14px;">Try the AI Grammar Assistant</strong>
          <p style="color:#666;font-size:13px;margin:2px 0 0;line-height:1.5;">Got a grammar question? Our AI tutor explains Polish grammar in plain English.</p>
        </div>
      </div>

      <!-- Tip 3 -->
      <div style="display:flex;align-items:flex-start;margin-bottom:24px;">
        <div style="background:#fef2f2;color:#dc2626;font-weight:700;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;">3</div>
        <div style="margin-left:12px;">
          <strong style="color:#111;font-size:14px;">Practice with Flashcards</strong>
          <p style="color:#666;font-size:13px;margin:2px 0 0;line-height:1.5;">Use spaced repetition to lock new words into your long-term memory.</p>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-top:8px;">
        <a href="${dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:600;font-size:15px;">
          Go to My Dashboard →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:28px;color:#999;font-size:12px;line-height:1.6;">
      <p style="margin:0;">Powodzenia! (Good luck!) 🇵🇱</p>
      <p style="margin:4px 0 0;">The LearnPolski Team</p>
      <p style="margin:8px 0 0;">Questions? <a href="mailto:support@learnpolski.academy" style="color:#999;text-decoration:underline;">support@learnpolski.academy</a></p>
      <p style="margin:8px 0 0;">
        <a href="https://polska-krok-po-kroku.lovable.app" style="color:#999;text-decoration:underline;">learnpolski.academy</a>
      </p>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      throw new Error("Failed to send welcome email");
    }

    // Mark as sent using service role to bypass RLS
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: updateError } = await adminClient
      .from("profiles")
      .update({ welcome_email_sent: true })
      .eq("user_id", userId);

    if (updateError) {
      console.error("Error updating welcome_email_sent:", updateError);
      // Email was sent, so we log but don't fail
    }

    console.log("Welcome email sent successfully to:", userEmail);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to send welcome email" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
