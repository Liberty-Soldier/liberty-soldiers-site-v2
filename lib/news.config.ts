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

export const NEWS_FEEDS: NewsFeed[] = [

  // --- GLOBAL / WIRE ---
  { url: "https://feeds.reuters.com/Reuters/worldNews", category: "world" },
  { url: "https://feeds.apnews.com/apf/world-news", category: "world" },
  { url: "https://rss.dw.com/rdf/rss-en-all", category: "world" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", category: "world" },
  { url: "https://feeds.foxnews.com/foxnews/world", category: "world" },

    // --- IRAN / REGIONAL / ANTI-WAR BALANCERS (ADD THESE) ---
  // Foreign policy restraint / anti-intervention analysis
  { url: "https://responsiblestatecraft.org/feeds/analysis.rss", category: "iran-war" }, // Quincy/RS analysis feed :contentReference[oaicite:0]{index=0}
  { url: "http://original.antiwar.com/feed/", category: "iran-war" }, // Antiwar original content feed :contentReference[oaicite:1]{index=1}

  // Iranian / region-adjacent English outlets (shows “their side” narrative)
  { url: "https://www.tehrantimes.com/rss", category: "iran-war" }, // Tehran Times RSS :contentReference[oaicite:3]{index=3}
  { url: "https://www.presstv.ir/rss.xml", category: "iran-war" }, // PressTV RSS xml :contentReference[oaicite:4]{index=4}

  // Deeper Middle East context (less “war drum” tone)
  { url: "https://www.merip.org/feed", category: "middle-east" }, // MERIP (analysis) :contentReference[oaicite:5]{index=5}
 
  // --- MIDDLE EAST / ISRAEL ---
  { url: "https://www.jpost.com/rss/rss.xml", category: "middle-east" },
  { url: "https://www.allisrael.com/rss", category: "middle-east" },
  { url: "https://www.israeltoday.co.il/feed/", category: "middle-east" },
  { url: "https://www.israel365news.com/feed/", category: "middle-east" },
  { url: "https://olivetreeviews.org/feed/", category: "middle-east" },
  
    // --- IRAN WAR (FOCUSED) ---
  { url: "https://feeds.reuters.com/reuters/worldNews", category: "iran-war" }, // placeholder if you don't have a better Reuters-Iran RSS
  { url: "https://feeds.apnews.com/apf/world-news", category: "iran-war" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", category: "iran-war" },
  { url: "https://abcnews.go.com/abcnews/internationalheadlines", category: "iran-war" },
  { url: "https://abcnews.go.com/abcnews/topstories", category: "iran-war" },
  { url: "https://moxie.foxnews.com/google-publisher/world.xml", category: "iran-war" },
  { url: "https://moxie.foxnews.com/google-publisher/politics.xml", category: "iran-war" },
  { url: "https://www.cbsnews.com/latest/rss/world", category: "iran-war" },
  { url: "https://feeds.nbcnews.com/nbcnews/public/world", category: "iran-war" },
  { url: "https://www.theguardian.com/world/rss", category: "iran-war" },
  { url: "https://www.jpost.com/Rss/RssFeedsHeadlines.aspx", category: "iran-war" },
  { url: "https://www.timesofisrael.com/feed/", category: "iran-war" },
  { url: "https://thehill.com/rss/syndicator/19110", category: "iran-war" },
  { url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/air/?outputType=xml", category: "iran-war" },
  { url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/global/?outputType=xml", category: "iran-war" },
  { url: "https://foreignpolicy.com/feed/", category: "iran-war" },
  { url: "https://warontherocks.com/feed/", category: "iran-war" },
  { url: "http://rss.cnn.com/rss/edition_world.rss", category: "iran-war" },
  { url: "https://rss.dw.com/rdf/rss-en-world", category: "iran-war" },
  { url: "https://feeds.skynews.com/feeds/rss/world.xml", category: "world" }, // Sky has an official RSS index page
  { url: "https://www.france24.com/en/middle-east/rss", category: "middle-east" },
   
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
  { url: "https://www.raptureready.com/feed", category: "prophecy" },
  { url: "https://www.worthynews.com/feed", category: "prophecy" },
  { url: "https://www1.cbn.com/rss-cbn-news-insideisrael.xml", category: "prophecy" },
  { url: "https://www1.cbn.com/rss-cbn-news-jerusalemdateline.xml", category: "prophecy" },
  { url: "https://www1.cbn.com/rss-cbn-news-christianworldnews.xml", category: "prophecy" },

  // --- FINANCE ---
  { url: "https://www.reuters.com/business/rss", category: "finance" },
  { url: "https://www.marketwatch.com/rss/topstories", category: "finance" },
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
  { url: "https://www.realclearreligion.org/index.xml", category: "religion" },
  { url: "https://www.realclearreligion.org/articles/index.xml", category: "religion" },
  { url: "https://www.mnnonline.org/rss/pubNewsTease.rdf", category: "religion" },
  { url: "https://feeds.christianitytoday.com/christianitytoday/ctmag", category: "religion" },
  { url: "https://www.christiancentury.org/taxonomy/term/44163/feed", category: "religion" },

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
























