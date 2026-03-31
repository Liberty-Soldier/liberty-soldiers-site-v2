import { kv } from "@vercel/kv";

const PUBLISHED_KEY = "lbs:published:articles";

export type PublishedArticle = {
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

export async function getPublished(): Promise<PublishedArticle[]> {
  const articles = await kv.get<PublishedArticle[]>(PUBLISHED_KEY);
  return Array.isArray(articles) ? articles : [];
}

export async function savePublished(articles: PublishedArticle[]) {
  await kv.set(PUBLISHED_KEY, articles);
}

export async function getPublishedBySlug(slug: string) {
  const articles = await getPublished();
  return articles.find((article) => article.slug === slug) || null;
}