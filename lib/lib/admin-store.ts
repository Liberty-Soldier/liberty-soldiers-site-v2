import { kv } from "@vercel/kv";

export type ReportKind = "report" | "analysis" | "brief" | "news";
export type QueueStatus = "draft" | "review" | "approved" | "rejected";

export type HardCategory =
  | "Power & Control"
  | "Markets & Finance"
  | "Digital ID / Technocracy"
  | "War & Geopolitics"
  | "Religion & Ideology"
  | "Prophecy Watch";

export type QueueItem = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  sourceUrl?: string;
  dateISO: string;
  byline: string;
  coverImage: string;
  category: string;
  hardCategory: HardCategory;
  readTime: string;
  featured: boolean;
  priority: number;
  kind: ReportKind;
  slug: string;
  status: QueueStatus;
  body: string;
};

const QUEUE_KEY = "lbs:admin:queue";

const DEFAULT_QUEUE: QueueItem[] = [
  {
    id: "q1",
    title: "Shipping Insurance Surges as Red Sea Risk Expands",
    excerpt:
      "Insurers, shipping routes, and military posture are all moving at once — a signal that market calm may be masking deeper supply stress.",
    source: "Manual intake",
    sourceUrl: "https://example.com/source-1",
    dateISO: "2026-03-27",
    byline: "Liberty Soldiers",
    coverImage: "/og-war-geopolitics.jpg",
    category: "War Risk",
    hardCategory: "War & Geopolitics",
    readTime: "6 min",
    featured: true,
    priority: 1,
    kind: "analysis",
    slug: "shipping-insurance-surges-red-sea-risk-expands",
    status: "review",
    body:
      "The surface narrative still treats instability like a temporary inconvenience. But shipping premiums, route changes, and force posture shifts suggest a deeper structural signal.\n\nWhen freight risk, insurance pricing, and military signaling all move together, the market is no longer reacting to headlines alone. It is reacting to the probability of sustained disruption.\n\nThat is where Liberty Soldiers should focus: not on noise, but on what is changing materially beneath the headline cycle.",
  },
];

export async function getQueue(): Promise<QueueItem[]> {
  const existing = await kv.get<QueueItem[]>(QUEUE_KEY);

  if (existing && Array.isArray(existing) && existing.length > 0) {
    return existing;
  }

  await kv.set(QUEUE_KEY, DEFAULT_QUEUE);
  return DEFAULT_QUEUE;
}

export async function saveQueue(queue: QueueItem[]): Promise<void> {
  await kv.set(QUEUE_KEY, queue);
}
