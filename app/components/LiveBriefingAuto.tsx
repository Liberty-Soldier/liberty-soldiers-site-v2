import LiveBriefing from "./LiveBriefing";
import { fetchAllHeadlines } from "@/lib/rss";

export const revalidate = 300;

export default async function LiveBriefingAuto() {
  const headlines = await fetchAllHeadlines();

  const items = (headlines || [])
    .filter((h) => h.category !== "Pinned")
    .slice(0, 10)
    .map((h) => `${h.source}: ${h.title}`);

  return <LiveBriefing items={items} />;
}
