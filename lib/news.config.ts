// lib/news.config.ts

export type FeedCategory =
  | "world"
  | "middle-east"
  | "iran-war"
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

// =========================================================
// CORE FEEDS
// Safer / faster / more stable feeds for primary site use
// =========================================================
export const CORE_NEWS_FEEDS: NewsFeed[] = [
  // =========================================================
  // WORLD / GLOBAL HARD NEWS
  // =========================================================
  { url: "https://www.aljazeera.com/xml/rss/all.xml", category: "world" },
  { url: "https://feeds.skynews.com/feeds/rss/world.xml", category: "world" },
  { url: "https://feeds.foxnews.com/foxnews/world", category: "world" },
  { url: "https://www.theguardian.com/world/rss", category: "world" },
  { url: "https://www.france24.com/en/live-news/rss", category: "world" },
  { url: "https://www.rt.com/rss/news/", category: "world" },
  { url: "https://apnews.com/hub/apf-topnews?output=rss", category: "world" },

  // =========================================================
  // MIDDLE EAST
  // =========================================================
  { url: "https://www.france24.com/en/middle-east/rss", category: "middle-east" },
  { url: "https://www.jpost.com/rss/rss.xml", category: "middle-east" },
  { url: "https://www.timesofisrael.com/feed/", category: "middle-east" },
  { url: "https://www.allisrael.com/rss", category: "middle-east" },
  { url: "https://english.alarabiya.net/tools/mrss", category: "middle-east" },

  // keep requested
  { url: "https://www.middleeasteye.net/rss", category: "middle-east" },

  // =========================================================
  // IRAN / WAR ESCALATION
  // =========================================================
  { url: "https://responsiblestatecraft.org/feed/", category: "iran-war" },

  // keep requested
  { url: "http://original.antiwar.com/feed/", category: "iran-war" },
  { url: "https://warontherocks.com/feed/", category: "iran-war" },

  { url: "https://www.rt.com/rss/op-ed/", category: "iran-war" },
  { url: "https://www.rt.com/rss/news/line/", category: "iran-war" },

  // keep requested
  { url: "https://tass.com/rss/v2.xml", category: "iran-war" },

  { url: "https://www.xinhuanet.com/english/rss/worldrss.xml", category: "iran-war" },
  {
    url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/global/?outputType=xml",
    category: "iran-war",
  },
  { url: "https://feeds.nbcnews.com/nbcnews/public/world", category: "iran-war" },
  { url: "https://www.cbsnews.com/latest/rss/world", category: "iran-war" },
  { url: "https://abcnews.go.com/abcnews/internationalheadlines", category: "iran-war" },
  { url: "https://www.tehrantimes.com/rss", category: "iran-war" },
  { url: "https://en.mehrnews.com/rss", category: "iran-war" },
  { url: "https://english.khamenei.ir/rss", category: "iran-war" },

  // =========================================================
  // TECH / CONTROL SYSTEMS
  // =========================================================
  { url: "https://www.biometricupdate.com/feed/", category: "tech" },
  { url: "https://www.eff.org/rss/updates.xml", category: "tech" },
  { url: "https://reclaimthenet.org/feed/", category: "tech" },
  { url: "https://www.rt.com/rss/news/tech/", category: "tech" },

  // keep requested
  { url: "https://raweggnationalist.substack.com/feed", category: "tech" },

  // =========================================================
  // PROPHECY / ESCHATOLOGY
  // =========================================================
  { url: "https://www.prophecynewswatch.com/rss.xml", category: "prophecy" },
  { url: "https://www1.cbn.com/rss-cbn-news-jerusalemdateline.xml", category: "prophecy" },

  // =========================================================
  // FINANCE
  // =========================================================
  { url: "https://www.bis.org/rss/all.xml", category: "finance" },
  { url: "https://www.imf.org/external/rss/feeds.aspx?feed=imf_blog", category: "finance" },
  { url: "https://feeds.feedburner.com/zerohedge/feed", category: "finance" },
  { url: "https://www.federalreserve.gov/feeds/press_all.xml", category: "finance" },
  { url: "https://www.rt.com/rss/business/", category: "finance" },

  // =========================================================
  // HEALTH / MEDICAL / BIO
  // =========================================================
  { url: "https://www.who.int/rss-feeds/news-english.xml", category: "health" },
  { url: "https://www.cdc.gov/media/rss.xml", category: "health" },
  { url: "https://www.nih.gov/news-events/news-releases/rss.xml", category: "health" },
  { url: "https://www.statnews.com/feed/", category: "health" },
  { url: "https://www.fiercehealthcare.com/rss/xml", category: "health" },

  // =========================================================
  // RELIGION / IDEOLOGY
  // =========================================================
  { url: "https://feeds.christianitytoday.com/christianitytoday/ctmag", category: "religion" },
  { url: "https://www.firstthings.com/rss/web-exclusives", category: "religion" },

  // =========================================================
  // CRYPTO
  // =========================================================
  { url: "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml", category: "crypto" },
  { url: "https://cryptopotato.com/feed/", category: "crypto" },
  { url: "https://thedefiant.io/feed/", category: "crypto" },
];

// =========================================================
// EXTENDED FEEDS
// Keep these sources, but better for enrichment/background jobs
// =========================================================
export const EXTENDED_NEWS_FEEDS: NewsFeed[] = [
  // WORLD / ANALYSIS / ALT
  { url: "https://kenyatimes.co.ke/feed/", category: "world" },

  // keep requested
  { url: "https://europeanconservative.com/feed/", category: "world" },

  // TECH / ANALYSIS / BLOG
  { url: "https://www.schneier.com/feed/", category: "tech" },

  // PROPHECY / HEAVIER / MORE VARIABLE
  { url: "https://endtimeheadlines.org/feed/", category: "prophecy" },

  // RELIGION / VARIABLE FORMATTING
  { url: "https://religionnews.com/feed/", category: "religion" },
  { url: "https://www.christianpost.com/rss", category: "religion" },
  { url: "https://www.realclearreligion.org/index.xml", category: "religion" },

  // HEALTH / DUPLICATE ALT SOURCE
  { url: "https://raweggnationalist.substack.com/feed", category: "health" },
];

// =========================================================
// BACKWARD-COMPAT EXPORT
// Your current code can keep using NEWS_FEEDS for now.
// Later, main pages should switch to CORE_NEWS_FEEDS only.
// =========================================================
export const NEWS_FEEDS: NewsFeed[] = [
  ...CORE_NEWS_FEEDS,
  ...EXTENDED_NEWS_FEEDS,
];

export const NOISE_FEEDS: { url: string; category?: string }[] = [
  { url: "https://www.tmz.com/rss.xml" },
  { url: "https://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml" },
  { url: "https://www.hollywoodreporter.com/feed/" },
];

export const PINNED_LINKS: { title: string; url: string; source?: string }[] = [
  // { title: "Pinned example", url: "https://example.com/article", source: "Example" },
];

export const BLACKLIST: string[] = [
  // "example.com"
];
