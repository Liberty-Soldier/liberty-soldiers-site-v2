// lib/news.config.ts
export const NEWS_FEEDS: string[] = [
  "https://www.jpost.com/rss/rss.xml",
  "https://www.allisrael.com/rss",
  "https://www.israeltoday.co.il/feed/",
  "https://www.prophecynewswatch.com/rss.xml",
  "https://www.theguardian.com/world/rss",
  "https://www.infowars.com/feed/",
  "https://rss.infowars.com/TNT.xml",
  "https://www.israel365news.com/feed/",
  "https://www.timesofisrael.com/feed/",
];

export const PINNED_LINKS: { title: string; url: string; source?: string }[] = [
  // Example:
  // { title: "Pinned example story", url: "https://example.com/article", source: "Example" },
];

export const BLACKLIST: string[] = [
  // e.g. "example.com"
];

