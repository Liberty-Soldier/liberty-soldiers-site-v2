// lib/news.config.ts
export const NEWS_FEEDS: string[] = [
  "https://www.jpost.com/rss/rss.xml",
  "https://endtimeheadlines.org/feed/",
  "https://www.biometricupdate.com/feed/",
  "https://expose-news.com/feed/",
  "https://www.nowtheendbegins.com/feed/",
  "https://reclaimthenet.org/feed/",
  "https://olivetreeviews.org/feed/",
  "https://www.allisrael.com/rss",
  "https://www.israeltoday.co.il/feed/",
  "https://www.prophecynewswatch.com/rss.xml",
  "https://www.theguardian.com/world/rss",
  "https://www.infowars.com/feed/",
  "https://www.israel365news.com/feed/",
  "https://www.timesofisrael.com/feed/"
];

export const PINNED_LINKS: { title: string; url: string; source?: string }[] = [
  // Example:
  // { title: "Pinned example", url: "https://example.com/article", source: "Example" },
];

export const BLACKLIST: string[] = [
  // Add blocked domains like "example.com"
];
