import { kv } from "@vercel/kv";

const PUBLISHED_KEY = "lbs:published:articles";

export async function getPublished() {
  return ((await kv.get(PUBLISHED_KEY)) as any[]) || [];
}

export async function savePublished(articles: any[]) {
  await kv.set(PUBLISHED_KEY, articles);
}