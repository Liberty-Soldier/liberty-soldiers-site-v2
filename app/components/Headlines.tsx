// app/components/HomeHeadlines.tsx
import { fetchAllHeadlines } from "@/lib/rss";
import ShareButton from "@/app/news/ShareButton";

type Item = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
};

function humanAgo(input?: number | string | Date): string {
  if (!input) return "Just now";
  const ts = typeof input === "number" ? input : new Date(input).getTime();
  if (!Number.isFinite(ts)) return "Just now";
  const diff = Date.now() - ts;
  const sec = Math.max(1, Math.floor(diff / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

function faviconFromUrl(articleUrl: string): string {
  try {
    const u = new URL(articleUrl);
    // Free favicon service (fast, consistent fallback)
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
      u.hostname
    )}&sz=128`;
  } catch {
    return "/briefing-fallback.jpg";
  }
}

function bulletsFromSummary(summary?: string): string[] {
  if (!summary) return [];
  const clean = summary.replace(/\s+/g, " ").trim();
  if (!clean) return [];

  // Safer sentence split (no lookbehind)
  const parts = clean
    .split(/(?:\.|\!|\?)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Ensure each bullet ends with punctuation for readability
  return parts.slice(0, 2).map((s) => (/[.!?]$/.test(s) ? s : s + "."));
}

export default async function HomeHeadlines() {
  let items: Item[] = [];

  try {
    items = (await fetchAllHeadlines()) as Item[];
  } catch {
    items = [];
  }

  const top = items.slice(0, 15);

  if (top.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-zinc-400 p-6 text-zinc/700">
        No headlines yet.
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {top.map((h, idx) => {
        const shareHrefAbs =
          `https://libertysoldiers.com/news/share?u=${encodeURIComponent(h.url)}` +
          `&t=${encodeURIComponent(h.title)}` +
          `&s=${encodeURIComponent(h.source)}` +
          (h.publishedAt ? `&p=${encodeURIComponent(String(h.publishedAt))}` : "") +
          (h.image ? `&i=${encodeURIComponent(h.image)}` : "") +
          (h.summary ? `&x=${encodeURIComponent(h.summary)}` : "");

        const thumb = h.image || faviconFromUrl(h.url);
        const bullets = bulletsFromSummary(h.summary);

        return (
          <div
            key={`${h.url}-${idx}`}
            className="rounded-xl border border-zinc-400 p-4 bg-white/10 hover:border-zinc-400 transition"
          >
            {/* Thumbnail */}
            <div className="mb-3 overflow-hidden rounded-lg border border-zinc-400 bg-black/20">
              <img
                src={thumb}
                alt=""
                className="h-32 w-full object-cover"
                loading="lazy"
              />
            </div>

            <span className="text-[11px] uppercase tracking-wide text-zinc-700">
              {h.source}
            </span>

            {/* Headline click goes to original source */}
            <a
              href={h.url}
              target="_blank"
              rel="noreferrer"
              className="block mt-1"
            >
              <h3 className="font-semibold leading-snug hover:underline">
                {h.title}
              </h3>
            </a>

            {/* 2 bullets from RSS summary/description (free) */}
            {bullets.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-zinc-400">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-zinc-400">•</span>
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {h.category && (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
                  {h.category}
                </span>
              </div>
              )}

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-700">
                {humanAgo(h.publishedAt)}
              </span>

              <div className="flex items-center gap-3">
                {/* Share uses Liberty Soldiers wrapper for X-friendly previews */}
                <ShareButton url={shareHrefAbs} title={h.title} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
