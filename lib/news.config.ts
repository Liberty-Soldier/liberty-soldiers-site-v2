// lib/news.config.ts

export const NEWS_FEEDS: string[] = [
  // --- Global / Wire ---
  "https://feeds.reuters.com/Reuters/worldNews",
  "https://www.reuters.com/business/rss",
  "https://feeds.apnews.com/apf/world-news",
  "https://rss.dw.com/rdf/rss-en-all",

  // --- Middle East / Israel ---
  "https://www.jpost.com/rss/rss.xml",
  "https://www.allisrael.com/rss",
  "https://www.israeltoday.co.il/feed/",
  "https://www.israel365news.com/feed/",
  "https://olivetreeviews.org/feed/",

  // --- Alternative / Tech / Control Systems ---
  "https://reclaimthenet.org/feed/",
  "https://www.biometricupdate.com/feed/",
  "https://www.expose-news.com/feed/",
  "https://www.zerohedge.com/fullrss2.xml",

  // --- Prophecy / Eschatology ---
  "https://endtimeheadlines.org/feed/",
  "https://www.prophecynewswatch.com/rss.xml",
  "https://www.nowtheendbegins.com/feed/",

  // --- Crypto / Finance ---
  "https://cryptopotato.com/feed/",
  "https://thedefiant.io/feed/",
  "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml",

  // --- Other World Coverage ---
  "https://www.aljazeera.com/xml/rss/all.xml",
  "https://feeds.foxnews.com/foxnews/world"
];

export const PINNED_LINKS: { title: string; url: string; source?: string }[] = [
  // Example:
  // { title: "Pinned example", url: "https://example.com/article", source: "Example" },
];

export const BLACKLIST: string[] = [
  // Add blocked domains like "example.com"
];







