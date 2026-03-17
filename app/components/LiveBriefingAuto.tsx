// app/components/LiveBriefingAuto.tsx
import LiveBriefing, { LiveBriefingItem } from "./LiveBriefing";
import { fetchAllHeadlines } from "@/lib/rss";
import { pickLiveBriefingHeadlines } from "@/lib/news.select";
export const revalidate = 300;

export default async function LiveBriefingAuto() {
  const all = await fetchAllHeadlines();
  const signal = pickLiveBriefingHeadlines(all, 15);

  const items: LiveBriefingItem[] = signal.map((h) => ({
    text: h.title,
    url: h.url,
    source: h.category ? h.category : undefined,
  }));

  return <LiveBriefing items={items} intervalMs={8500} />;
}
