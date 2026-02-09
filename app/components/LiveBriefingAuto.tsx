import LiveBriefing, { LiveBriefingItem } from "./LiveBriefing";
import { fetchAllHeadlines } from "@/lib/rss";

export const revalidate = 300;

// Toggle this to control “major sources only”
const MAJOR_ONLY = true;

// You can edit this list anytime
const MAJOR_HOST_MATCH = [
  "reuters",
  "apnews",
  "aljazeera",
  "dw",
  "foxnews",
];

function isMajor(url: string, source?: string) {
  const s = (source || "").toLowerCase();
  let host = "";
  try {
    host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    host = "";
  }

  return MAJOR_HOST_MATCH.some((k) => host.includes(k) || s.includes(k));
}

export default async function LiveBriefingAuto() {
  const all = await fetchAllHeadlines();

  const signal = (all || [])
    .filter((h) => h.category !== "Pinned")
    .filter((h) => (MAJOR_ONLY ? isMajor(h.url, h.source) : true))
    .slice(0, 15); // newest 15

 const items: LiveBriefingItem[] = signal.map((h) => ({
  text: h.title,
  url: h.url,
  source: h.category ? h.category : undefined,
}));

  // If MAJOR_ONLY ends up too strict (empty), fall back to normal newest 15
  if (!items.length) {
    const fallback = (all || [])
      .filter((h) => h.category !== "Pinned")
      .slice(0, 15);

    return (
      <LiveBriefing
        items={fallback.map((h) => ({
          text: `${h.source}: ${h.title}`,
          url: h.url,
          source: h.category ? h.category : undefined,
        }))}
        intervalMs={8500}
      />
    );
  }

  return <LiveBriefing items={items} intervalMs={8500} />;
}
