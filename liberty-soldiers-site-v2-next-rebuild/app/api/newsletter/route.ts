export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { appendFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const email = String(form.get('email') || '').trim();
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Missing email' }, { status: 400 });
    }

    const dir = '/tmp/liberty-newsletter';
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    const line = `${new Date().toISOString()},${email}\n`;
    await appendFile(`${dir}/subscribers.csv`, line, 'utf8');

    return NextResponse.redirect(new URL('/?subscribed=1', req.url));
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 });
  }
}
