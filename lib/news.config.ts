// lib/news.config.ts

export type FeedCategory =
  | "world"
  | "middle-east"
  | "tech"
  | "religion"
  | "prophecy"
  | "finance"
  | "crypto"
  | "health";

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
  { url: "http://feeds.bbci.co.uk/news/world/middle_east/rss.xml", category: "middle-east" },

  // --- TECH / CONTROL SYSTEMS ---
  { url: "https://reclaimthenet.org/feed/", category: "tech" },
  { url: "https://www.biometricupdate.com/feed/", category: "tech" },
  { url: "https://www.expose-news.com/feed/", category: "tech" },
  { url: "https://www.eff.org/rss/updates.xml", category: "tech" },
  { url: "https://www.schneier.com/feed/", category: "tech" },

  // --- PROPHECY / ESCHATOLOGY ---
  { url: "https://endtimeheadlines.org/feed/", category: "prophecy" },
  { url: "https://www.prophecynewswatch.com/rss.xml", category: "prophecy" },
  { url: "https://www.nowtheendbegins.com/feed/", category: "prophecy" },

  // --- FINANCE ---
  { url: "https://www.reuters.com/business/rss", category: "finance" },
  { url: "https://feeds.apnews.com/apf/business", category: "finance" },
  { url: "https://www.marketwatch.com/rss/topstories", category: "finance" },
  { url: "https://www.investing.com/rss/news_25.rss", category: "finance" },
  { url: "https://www.bis.org/rss/all.xml", category: "finance" },
  { url: "https://www.imf.org/external/rss/feeds.aspx?feed=imf_blog", category: "finance" },
  { url: "https://feeds.feedburner.com/zerohedge/feed", category: "finance" },
  { url: "https://www.federalreserve.gov/feeds/press_all.xml", category: "finance" },

  // --- HEALTH / MEDICAL / BIO ---
  { url: "https://www.who.int/rss-feeds/news-english.xml", category: "health" },
  { url: "https://www.cdc.gov/media/rss.xml", category: "health" },
  { url: "https://www.nih.gov/news-events/news-releases/rss.xml", category: "health" },
  { url: "https://www.statnews.com/feed/", category: "health" },
  { url: "https://www.medscape.com/rss/public", category: "health" },
  { url: "https://www.fiercehealthcare.com/rss/xml", category: "health" },

    // --- RELIGION / IDEOLOGY ---
  { url: "https://religionnews.com/feed/", category: "religion" },
  { url: "https://www.christianpost.com/rss", category: "religion" },
  { url: "https://www.firstthings.com/rss/web-exclusives", category: "religion" },

  // --- CRYPTO ---
  { url: "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml", category: "crypto" },
  { url: "https://cryptopotato.com/feed/", category: "crypto" },
  { url: "https://thedefiant.io/feed/", category: "crypto" },
];

export const NOISE_FEEDS: { url: string; category?: string }[] = [
  { url: "https://www.tmz.com/rss.xml" },
  { url: "https://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml" },
  { url: "https://www.hollywoodreporter.com/feed/" },
];


export const PINNED_LINKS: { title: string; url: string; source?: string }[] = [
  // Example:
  // { title: "Pinned example", url: "https://example.com/article", source: "Example" },
];

export const BLACKLIST: string[] = [
  // Add blocked domains like "example.com"
];

















