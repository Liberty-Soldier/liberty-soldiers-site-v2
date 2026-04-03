export const runtime = "nodejs";
// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.MAIL_FROM!;
const TO = process.env.MAIL_TO!;

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Send you a notification
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: "New Contact Message — Liberty Soldiers",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    // Auto-reply to the sender (optional)
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "We received your message",
      text: `Thanks ${name}, we received your message and will reply soon.\n— Liberty Soldiers`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}


