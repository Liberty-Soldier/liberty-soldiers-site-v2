// app/components/HomeHeadlines.tsx
import { fetchAllHeadlines } from "@/lib/rss";
import ShareButton from "@/app/news/ShareButton";

type Item = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
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

export default async function HomeHeadlines() {
  let items: Item[] = [];

  try {
    items = await fetchAllHeadlines();
  } catch {
    items = [];
  }

  const top = items.slice(0, 6);

  if (top.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-white/10 p-6 text-white/70">
        No headlines yet.
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {top.map((h, idx) => {
        const shareHref =
          `https://libertysoldiers.com/news/share?u=${encodeURIComponent(
            h.url
          )}` +
          `&t=${encodeURIComponent(h.title)}` +
          `&s=${encodeURIComponent(h.source)}` +
          (h.publishedAt ? `&p=${encodeURIComponent(String(h.publishedAt))}` : "");

        return (
          <div
            key={`${h.url}-${idx}`}
            className="rounded-xl border border-white/10 p-4 bg-white/5 hover:border-white/30 transition"
          >
            <span className="text-[11px] uppercase tracking-wide text-white/60">
              {h.source}
            </span>

            {/* Read source (external) */}
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

            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-xs text-white/50">
                {humanAgo(h.publishedAt)}
              </span>

              {/* Real share UX (no navigation) */}
              <ShareButton url={shareHref} title={h.title} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
