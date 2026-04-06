import { fetchAllHeadlines } from "@/lib/rss";
import { pickLiveBriefingHeadlines } from "@/lib/news.select";

export const revalidate = 300;

type LiveItem = {
  text: string;
  url: string;
  source?: string;
};

export default async function LiveBriefingAuto() {
  const all = await fetchAllHeadlines();
  const signal = pickLiveBriefingHeadlines(all, 15);

  const items: LiveItem[] = signal.map((h) => ({
    text: h.title,
    url: h.url,
    source: h.category || "Signal",
  }));

  if (!items.length) return null;

  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-b border-white/10 bg-black text-white">
      <div className="flex items-center">
        <div className="shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-400">
          LIVE
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max gap-8 px-4 py-3 animate-[marquee_22s_linear_infinite] hover:[animation-play-state:paused]">
            {row.map((item, i) => (
              <a
                key={`${item.url}-${i}`}
                href={item.url}
                className="whitespace-nowrap text-sm text-white/80 transition hover:text-white"
              >
                <span className="mr-2 text-red-500">●</span>
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
