import { Resend } from "resend";
import { NextResponse } from "next/server";
import { ConfirmationEmail } from "@/lib/emails/confirmation";
import { NotificationEmail } from "@/lib/emails/notification";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, lang } = body;

    // Validate
    if (
      !email ||
      typeof email !== "string" ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const safeLang: "fr" | "en" = lang === "en" ? "en" : "fr";
    const cleanEmail = email.trim().toLowerCase();

    const fromAddress = process.env.RESEND_FROM;
    const clientEmail = process.env.RESEND_CLIENT_EMAIL;

    if (!fromAddress || !clientEmail) {
      console.error("Missing env vars: RESEND_FROM or RESEND_CLIENT_EMAIL");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 },
      );
    }

    // Resend v6 uses { data, error } return pattern — no exceptions thrown
    const [confirmResult, notifyResult] = await Promise.all([
      resend.emails.send({
        from: `PAINTCAM <${fromAddress}>`,
        to: [cleanEmail],
        subject:
          safeLang === "fr"
            ? "Votre place est confirmée — PAINTCAM 20 ans"
            : "Your seat is confirmed — PAINTCAM 20th Anniversary",
        html: ConfirmationEmail({ email: cleanEmail, lang: safeLang }),
      }),
      resend.emails.send({
        from: `PAINTCAM RSVP <${fromAddress}>`,
        to: [clientEmail],
        replyTo: cleanEmail,
        subject: `Nouvelle inscription RSVP — ${cleanEmail}`,
        html: NotificationEmail({ email: cleanEmail }),
      }),
    ]);

    // Log errors without blocking
    if (confirmResult.error) {
      console.error("Confirmation email error:", confirmResult.error);
    }
    if (notifyResult.error) {
      console.error("Notification email error:", notifyResult.error);
    }

    // Both failed → return error
    if (confirmResult.error && notifyResult.error) {
      return NextResponse.json(
        { error: "Email delivery failed", details: confirmResult.error },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("RSVP route unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
