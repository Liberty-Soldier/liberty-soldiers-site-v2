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

  const parts = clean
    .split(/(?:\.|\!|\?)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return parts.slice(0, 2).map((s) => (/[.!?]$/.test(s) ? s : s + "."));
}

function pickThumb(h: Item): string {
  if (h.image && /^https?:\/\//i.test(h.image)) return h.image;
  const fav = faviconFromUrl(h.url);
  if (/^https?:\/\//i.test(fav)) return fav;
  return "/briefing-fallback.jpg";
}

export default async function HomeHeadlines({
  variant = "grid",
}: {
  variant?: "grid" | "carousel";
}) {
  let items: Item[] = [];
  try {
    items = (await fetchAllHeadlines()) as Item[];
  } catch {
    items = [];
  }

  const top = items.slice(0, 15);

  if (top.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 text-zinc-700">
        No headlines yet.
      </div>
    );
  }

  // GRID MODE: return a normal grid wrapper
  if (variant === "grid") {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {top.map((h, idx) => (
          <HeadlineCard key={`${h.url}-${idx}`} h={h} />
        ))}
      </div>
    );
  }

  // CAROUSEL MODE: IMPORTANT — return slides as DIRECT CHILDREN (no wrapper div)
  return (
    <>
      {top.map((h, idx) => (
        <div
          key={`${h.url}-${idx}`}
          className="snap-start shrink-0 w-full"
          style={{ scrollSnapStop: "always" as any }}
        >
          <HeadlineCard h={h} />
        </div>
      ))}
    </>
  );
}

function HeadlineCard({ h }: { h: Item }) {
  const shareHrefAbs = `https://libertysoldiers.com/news/share?u=${encodeURIComponent(
    h.url
  )}`;

  const thumb = pickThumb(h);
  const bullets = bulletsFromSummary(h.summary);

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 transition">
      {/* Branded backdrop + contain: stops ugly stretching/cropping */}
      <div className="mb-3 overflow-hidden rounded-lg border border-zinc-200 bg-[url('/hero.jpg')] bg-cover bg-center">
        <div className="bg-white/70">
          <img
            src={thumb}
            alt=""
            className="h-44 w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <span className="text-[11px] uppercase tracking-wide text-zinc-500">
        {h.source}
      </span>

      <a href={h.url} className="block mt-1" target="_blank" rel="noreferrer">
        <h3 className="text-zinc-900 font-semibold leading-snug hover:underline">
          {h.title}
        </h3>
      </a>

      {bullets.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-zinc-600">
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

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-zinc-500">{humanAgo(h.publishedAt)}</span>

        <div className="flex items-center gap-3">
          <ShareButton wrapperUrl={shareHrefAbs} title={h.title} />
        </div>
      </div>
    </article>
  );
}
