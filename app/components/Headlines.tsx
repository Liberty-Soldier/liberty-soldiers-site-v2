import { fetchAllHeadlines } from "@/lib/rss";
import ShareButton from "@/app/news/ShareButton";
import FallbackImg from "@/app/components/FallbackImg";

type Item = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
  hardCategory?: string; 
};

function pickBalanced(items: Item[], total: number) {
  const sorted = items
    .filter((h) => h.category !== "Pinned")
    .slice()
    .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));

  const MONEY = new Set(["Finance", "Crypto"]);
  const maxMoney = Math.min(3, Math.ceil(total / 3));
  const perCatMax = 2;

  const picked: Item[] = [];
  const perCat = new Map<string, number>();
  let moneyCount = 0;

  for (const h of sorted) {
    if (picked.length >= total) break;

    const cat = (h.category || "General").trim();
    const catCount = perCat.get(cat) || 0;
    if (catCount >= perCatMax) continue;

    const isMoney = MONEY.has(cat);
    if (isMoney && moneyCount >= maxMoney) continue;

    picked.push(h);
    perCat.set(cat, catCount + 1);
    if (isMoney) moneyCount += 1;
  }

  if (picked.length < total) {
    const used = new Set(picked.map((x) => x.url));
    for (const h of sorted) {
      if (picked.length >= total) break;
      if (used.has(h.url)) continue;
      picked.push(h);
    }
  }

  return picked;
}

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

function fallbackForCategory(cat?: string) {
  const c = (cat || "").toLowerCase().trim();

  if (c === "power & control") return "/og-power-control.jpg";
  if (c === "markets & finance") return "/og-markets-finance.jpg";
  if (c === "digital id / technocracy") return "/og-digital-id.jpg";
  if (c === "war & geopolitics") return "/og-war-geopolitics.jpg";
  if (c === "religion & ideology") return "/og-religion-ideology.jpg";
  if (c === "prophecy watch") return "/og-prophecy-watch.jpg";

  return "/og-default.jpg";
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

// ✅ Clean share URL builder (NO query strings; fixes Android SMS ugly text)
function buildNewsShareAbs(externalUrl: string, title?: string) {
  const base = `https://libertysoldiers.com/news/${encodeURIComponent(externalUrl)}`;
  if (!title || !title.trim()) return base;
  // ✅ Only title — keeps things short, no long ugly message text
  return `${base}?t=${encodeURIComponent(title.trim())}`;
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

  const top = variant === "grid" ? pickBalanced(items, 9) : pickBalanced(items, 20);

  if (top.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 text-zinc-700">
        No headlines yet.
      </div>
    );
  }

  // GRID
  if (variant === "grid") {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {top.map((h, idx) => {
          const shareHrefAbs = buildNewsShareAbs(h.url, h.title);
           const fallback = fallbackForCategory(h.hardCategory || h.category);
            const thumb = (h.image && h.image.trim()) ? h.image : fallback;
          const bullets = bulletsFromSummary(h.summary);

          return (
            <div
              key={`${h.url}-${idx}`}
              className="rounded-xl border border-zinc-200 bg-white p-4"
            >
              <div className="mb-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
             <FallbackImg
                src={thumb}
                alt=""
                className="h-40 sm:h-44 w-full object-cover"
                loading="lazy"
                fallback={fallback}
              />
              </div>

              <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                {h.source}
              </span>

              <a href={h.url} className="block mt-1">
                <h3 className="font-semibold leading-snug text-zinc-900 hover:underline">
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

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">
                  {humanAgo(h.publishedAt)}
                </span>
                <ShareButton shareUrl={shareHrefAbs} title={h.title} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // CAROUSEL (slides only)
  return (
    <>
      {top.map((h, idx) => {
       const shareHrefAbs = buildNewsShareAbs(h.url, h.title);
        const fallback = fallbackForCategory(h.hardCategory || h.category);
        const thumb = (h.image && h.image.trim()) ? h.image : fallback;
        const bullets = bulletsFromSummary(h.summary);
      
        return (
          <div
            key={`${h.url}-${idx}`}
            className="shrink-0 w-[88%] sm:w-[520px] lg:w-[640px]"
          >
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 h-[420px] flex flex-col">
              <div className="mb-3 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <FallbackImg
                src={thumb}
                alt=""
                className="h-32 w-full object-cover"
                loading="lazy"
                fallback={fallback}
              />

              </div>

              <span className="text-[11px] uppercase tracking-wide text-zinc-500">
                {h.source}
              </span>

              <a href={h.url} className="block mt-1">
                <h3 className="text-zinc-900 font-semibold leading-snug hover:underline line-clamp-2">
                  {h.title}
                </h3>
              </a>

              {bullets.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-zinc-600 line-clamp-3">
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

              <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">
                  {humanAgo(h.publishedAt)}
                </span>
                <ShareButton shareUrl={shareHrefAbs} title={h.title} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
