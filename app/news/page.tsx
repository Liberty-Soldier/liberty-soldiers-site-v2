export const revalidate = 600; // ISR every 10 min
import { fetchAllHeadlines } from "@/lib/rss";

function humanAgo(ms: number) {
  if (!ms) return "";
  const diff = Math.max(0, Date.now() - ms);
  const h = Math.floor(diff / 3.6e6);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default async function NewsPage() {
  const items = await fetchAllHeadlines();

  const colSize = Math.ceil(items.length / 3);
  const cols = [items.slice(0, colSize), items.slice(colSize, colSize * 2), items.slice(colSize * 2)];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">News Feed</h1>
          <p className="text-white/70 mt-1">Live headlines relevant to end times & Torah keeping.</p>
        </div>
        <a href="/" className="text-sm hover:text-white/80">← Home</a>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 p-6 text-white/70">No headlines yet. Try again shortly.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cols.map((col, i) => (
            <div key={i} className="space-y-3">
              {col.map((h, idx) => (
                <a key={idx} href={h.url} target="_blank" rel="noreferrer"
                   className="block rounded-xl border border-white/10 p-4 bg-white/5 hover:border-white/30 transition">
                  <span className="text-[11px] uppercase tracking-wide text-white/60">{h.source}</span>
                  <h3 className="mt-1 font-semibold leading-snug hover:underline">{h.title}</h3>
                  <span className="text-xs text-white/50">{humanAgo(h.publishedAt)}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
