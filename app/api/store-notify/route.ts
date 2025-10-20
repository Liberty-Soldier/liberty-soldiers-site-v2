// app/api/notify/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.MAIL_FROM!;
const TO = process.env.MAIL_TO!;

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const email = String(form.get("email") || "").trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
    }

    // Send you a notification / collect signup
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: "New Store Waitlist Signup",
      text: `Email: ${email}`,
    });

    // Optional confirmation to the subscriber
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "You're on the list",
      text: `Thanks! We'll email you when the Liberty Soldiers store opens.`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

