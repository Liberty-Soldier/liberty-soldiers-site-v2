import { kv } from "@vercel/kv";

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
  hardCategory: string;
  readTime: string;
  featured: boolean;
  priority: number;
  kind: string;
  slug: string;
  status: string;
  body: string;
};

const QUEUE_KEY = "lbs:admin:queue";

export async function getQueue(): Promise<QueueItem[]> {
  const existing = await kv.get<QueueItem[]>(QUEUE_KEY);

  if (existing && Array.isArray(existing)) {
    return existing;
  }

  const starter: QueueItem[] = [];
  await kv.set(QUEUE_KEY, starter);
  return starter;
}

export async function saveQueue(queue: QueueItem[]) {
  await kv.set(QUEUE_KEY, queue);
}
