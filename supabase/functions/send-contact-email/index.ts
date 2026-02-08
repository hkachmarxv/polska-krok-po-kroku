import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service is not configured");
    }

    const { name, email, message } = await req.json();

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return new Response(JSON.stringify({ error: "Invalid name" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 255) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 2000) {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(apiKey);

    const sanitizedName = name.trim().replace(/[<>"'&]/g, "");
    const sanitizedMessage = message.trim().replace(/[<>"'&]/g, (c: string) => {
      const map: Record<string, string> = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "&": "&amp;" };
      return map[c] || c;
    });

    const emailResponse = await resend.emails.send({
      from: "LearnPolski Contact <noreply@learnpolski.academy>",
      to: ["support@learnpolski.academy"],
      replyTo: email.trim(),
      subject: `Contact Form: ${sanitizedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, "<br />")}</p>
      `,
    });

    console.log("Contact email sent successfully:", emailResponse);

    // Send auto-reply confirmation to the visitor
    const autoReply = await resend.emails.send({
      from: "LearnPolski <noreply@learnpolski.academy>",
      to: [email.trim()],
      subject: "We've got your message 🇵🇱",
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; color: #333;">
          <p style="font-size: 16px; line-height: 1.6;">Hi ${sanitizedName} 👋</p>
          <p style="line-height: 1.6;">
            Thanks for reaching out to LearnPolski — we've received your message.
          </p>
          <p style="line-height: 1.6;">
            Our small team reviews every message personally, and we usually reply within 24 hours (often sooner).
          </p>
          <p style="line-height: 1.6;">
            If your question is about access, billing, or a technical issue, feel free to reply with any extra details — it helps us help you faster.
          </p>
          <p style="line-height: 1.6; margin-top: 24px;">
            Talk soon,<br/>
            <strong>The LearnPolski Team</strong><br/>
            <span style="color: #888; font-size: 14px;">AI-powered Polish language learning</span><br/>
            <a href="https://learnpolski.academy" style="color: #6366f1; font-size: 14px;">https://learnpolski.academy</a>
          </p>
        </div>
      `,
    });

    console.log("Auto-reply sent successfully:", autoReply);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to send email" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
