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
      subject: "We received your message! 🇵🇱",
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto;">
          <h2 style="color: #1a1a2e;">Thanks for reaching out, ${sanitizedName}! 👋</h2>
          <p style="color: #444; line-height: 1.6;">
            We've received your message and will get back to you within 24 hours.
          </p>
          <p style="color: #444; line-height: 1.6;">Here's a copy of what you sent:</p>
          <blockquote style="border-left: 3px solid #6366f1; padding-left: 12px; color: #555; margin: 16px 0;">
            ${sanitizedMessage.replace(/\n/g, "<br />")}
          </blockquote>
          <p style="color: #444; line-height: 1.6;">
            Dziękujemy! 🙏<br/>
            <strong>The LearnPolski Team</strong>
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
