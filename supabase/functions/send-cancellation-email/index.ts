import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Auth error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("No user email");

    const { subscriptionEnd } = await req.json();
    const displayName = user.user_metadata?.display_name || user.user_metadata?.full_name || "Learner";
    const firstName = displayName.split(" ")[0];

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const endDateFormatted = subscriptionEnd
      ? new Date(subscriptionEnd).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : "the end of your billing period";

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6b7280 0%,#4b5563 100%);padding:40px 32px;text-align:center;">
              <div style="font-size:40px;margin-bottom:12px;">🇵🇱 😢</div>
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                We're sorry to see you go, ${firstName}
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">
                Your cancellation has been confirmed
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
                Your A1 subscription has been cancelled. You'll still have <strong>full access until ${endDateFormatted}</strong> — so there's still time to keep learning!
              </p>

              <!-- What you'll lose -->
              <div style="background-color:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;border-left:3px solid #9ca3af;">
                <p style="margin:0 0 12px;font-weight:700;color:#1f2937;font-size:14px;">After your access expires:</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr><td style="padding:4px 0;color:#6b7280;font-size:14px;">❌ Lessons 2–20 will be locked</td></tr>
                  <tr><td style="padding:4px 0;color:#6b7280;font-size:14px;">❌ AI Grammar tools unavailable</td></tr>
                  <tr><td style="padding:4px 0;color:#6b7280;font-size:14px;">❌ Your streak progress will pause</td></tr>
                </table>
              </div>

              <!-- Re-subscribe CTA -->
              <div style="background-color:#fef2f2;border-radius:12px;padding:20px;margin-bottom:24px;">
                <p style="margin:0 0 8px;color:#374151;font-size:14px;line-height:1.5;">
                  <strong>💡 Changed your mind?</strong> You can resubscribe anytime and pick up right where you left off — your progress is always saved.
                </p>
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://polska-krok-po-kroku.lovable.app/pricing" 
                       style="display:inline-block;background-color:#dc2626;color:#ffffff;font-weight:700;font-size:15px;padding:14px 36px;border-radius:12px;text-decoration:none;">
                      Resubscribe →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid #f3f4f6;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">
                You won't be charged again. Your access continues until ${endDateFormatted}.
              </p>
              <p style="margin:8px 0 0;color:#9ca3af;font-size:11px;">
                Questions? Contact 
                <a href="mailto:support@learnpolski.academy" style="color:#dc2626;text-decoration:none;">support@learnpolski.academy</a>
              </p>
              <p style="margin:12px 0 0;color:#d1d5db;font-size:11px;">
                LearnPolski • Polska Krok po Kroku
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const { error: emailError } = await resend.emails.send({
      from: "LearnPolski <noreply@learnpolski.academy>",
      to: [user.email],
      subject: "Your A1 subscription has been cancelled 😔",
      html: emailHtml,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      throw new Error(`Email send failed: ${JSON.stringify(emailError)}`);
    }

    console.log(`Cancellation email sent to ${user.email}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-cancellation-email error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
