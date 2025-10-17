export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { NEWS_FEEDS, PINNED_LINKS, BLACKLIST } from '../../../lib/news.config';
function domainFromUrl(url: string) {
  try { return new URL(url).hostname.replace('www.', ''); } catch { return ''; }
}

function parseItems(xml: string) {
  const items: any[] = [];
  const rssItems = xml.split(/<item[>\s]/i).slice(1);
  if (rssItems.length) {
    rssItems.forEach(raw => {
      const title = (raw.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i)?.[1]
        || raw.match(/<title>(.*?)<\/title>/i)?.[1] || '').trim();
      const link = (raw.match(/<link>(.*?)<\/link>/i)?.[1] || '').trim();
      const pubDate = (raw.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1] || '').trim();
      if (title && link) items.push({ title, link, pubDate });
    });
    return items;
  }
  const entries = xml.split(/<entry[>\s]/i).slice(1);
  entries.forEach(raw => {
    const title = (raw.match(/<title.*?>(.*?)<\/title>/i)?.[1] || '').trim();
    const link = (raw.match(/<link[^>]*href="(.*?)"/i)?.[1] || '').trim();
    const updated = (raw.match(/<updated>(.*?)<\/updated>/i)?.[1] || '').trim();
    if (title && link) items.push({ title, link, pubDate: updated });
  });
  return items;
}

export async function GET() {
  try {
    const fetched = await Promise.allSettled(
      NEWS_FEEDS.map(async (url) => {
        const res = await fetch(url, { cache: 'no-store' });
        const xml = await res.text();
        return parseItems(xml).map((it) => ({
          title: it.title,
          url: it.link,
          source: domainFromUrl(it.link),
          date: it.pubDate ? new Date(it.pubDate).toISOString() : null,
        }));
      })
    );

    let items = fetched.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
    items = items.filter((i) => i.url && !BLACKLIST.some((b) => i.source?.includes(b)));
    items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    const pinned = PINNED_LINKS.map((p) => ({ ...p, date: null }));
    return NextResponse.json({ pinned, items });
  } catch (e: any) {
    return NextResponse.json({ pinned: PINNED_LINKS, items: [], error: e?.message || 'Parse error' }, { status: 200 });
  }
}
