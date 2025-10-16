import { NextRequest, NextResponse } from 'next/server';
import { appendFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const message = String(form.get('message') || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    const payload = { name, email, message, ts: new Date().toISOString() };

    // Optional: Forward to a webhook (Zapier, Make, etc.) if CONTACT_WEBHOOK_URL is set
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return NextResponse.redirect(new URL('/about#contact?sent=1', req.url));
    }

    // Fallback: save locally to CSV in /tmp
    const dir = '/tmp/liberty-contact';
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    const safe = (s: string) => `"${s.replaceAll('"', '""')}"`;
    const line = `${payload.ts},${safe(name)},${safe(email)},${safe(message)}\n`;
    await appendFile(`${dir}/contact.csv`, line, 'utf8');

    return NextResponse.redirect(new URL('/about#contact?sent=1', req.url));
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 });
  }
}
