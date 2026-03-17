// lib/news.types.ts

export type CanonicalCategorySlug =
  | "war-geopolitics"
  | "markets-finance"
  | "digital-id-technocracy"
  | "power-control"
  | "religion-ideology"
  | "prophecy-watch";

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
