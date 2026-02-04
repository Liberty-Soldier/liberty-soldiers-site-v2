// lib/news.config.ts

export type FeedCategory =
  | "world"
  | "middle-east"
  | "tech"
  | "prophecy"
  | "finance"
  | "crypto";

export type NewsFeed = {
  url: string;
  category: FeedCategory;
};

export const NEWS_FEEDS: NewsFeed[] = [

  // --- GLOBAL / WIRE ---
  { url: "https://feeds.reuters.com/Reuters/worldNews", category: "world" },
  { url: "https://feeds.apnews.com/apf/world-news", category: "world" },
  { url: "https://rss.dw.com/rdf/rss-en-all", category: "world" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", category: "world" },
  { url: "https://feeds.foxnews.com/foxnews/world", category: "world" },

  // --- MIDDLE EAST / ISRAEL ---
  { url: "https://www.jpost.com/rss/rss.xml", category: "middle-east" },
  { url: "https://www.allisrael.com/rss", category: "middle-east" },
  { url: "https://www.israeltoday.co.il/feed/", category: "middle-east" },
  { url: "https://www.israel365news.com/feed/", category: "middle-east" },
  { url: "https://olivetreeviews.org/feed/", category: "middle-east" },

  // --- TECH / CONTROL SYSTEMS ---
  { url: "https://reclaimthenet.org/feed/", category: "tech" },
  { url: "https://www.biometricupdate.com/feed/", category: "tech" },
  { url: "https://www.expose-news.com/feed/", category: "tech" },
  { url: "https://www.zerohedge.com/fullrss2.xml", category: "tech" },

  // --- PROPHECY / ESCHATOLOGY ---
  { url: "https://endtimeheadlines.org/feed/", category: "prophecy" },
  { url: "https://www.prophecynewswatch.com/rss.xml", category: "prophecy" },
  { url: "https://www.nowtheendbegins.com/feed/", category: "prophecy" },

  // --- FINANCE ---
  { url: "https://www.reuters.com/business/rss", category: "finance" },

  // --- CRYPTO ---
  { url: "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml", category: "crypto" },
  { url: "https://cryptopotato.com/feed/", category: "crypto" },
  { url: "https://thedefiant.io/feed/", category: "crypto" },
];


export const PINNED_LINKS: { title: string; url: string; source?: string }[] = [
  // Example:
  // { title: "Pinned example", url: "https://example.com/article", source: "Example" },
];

export const BLACKLIST: string[] = [
  // Add blocked domains like "example.com"
];








