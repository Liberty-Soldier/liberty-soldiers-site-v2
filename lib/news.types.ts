// lib/news.types.ts

export type CanonicalCategorySlug =
  | "us"
  | "global"
  | "war"
  | "finance"
  | "control";

export type Headline = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;

  // existing labels
  category?: string;
  hardCategory?: string;

  // new normalized layers
  feedCategory?: string;
  canonicalCategory?: CanonicalCategorySlug;
};
