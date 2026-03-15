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
  // =========================================================
  // WORLD / GLOBAL HARD NEWS
  // =========================================================
  { url: "https://rss.dw.com/rdf/rss-en-all", category: "world" },
  { url: "https://feeds.bbci.co.uk/news/world/rss.xml", category: "world" },
  { url: "https://feeds.bbci.co.uk/news/rss.xml", category: "world" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", category: "world" },
  { url: "https://feeds.skynews.com/feeds/rss/world.xml", category: "world" },
  { url: "https://feeds.skynews.com/feeds/rss/home.xml", category: "world" },
  { url: "https://feeds.foxnews.com/foxnews/world", category: "world" },
  { url: "http://rss.cnn.com/rss/edition_world.rss", category: "world" },
  { url: "https://www.theguardian.com/world/rss", category: "world" },
  { url: "https://www.france24.com/en/live-news/rss", category: "world" },
  { url: "https://news.google.com/rss/search?q=when:24h+site:reuters.com+world&hl=en-US&gl=US&ceid=US:en", category: "world" },
{ url: "https://news.google.com/rss/search?q=when:24h+site:apnews.com+world&hl=en-US&gl=US&ceid=US:en", category: "world" },
{ url: "https://news.google.com/rss/search?q=when:24h+site:bbc.com+world&hl=en-US&gl=US&ceid=US:en", category: "world" },
{ url: "https://news.google.com/rss/search?q=when:24h+site:nbcnews.com+world&hl=en-US&gl=US&ceid=US:en", category: "world" },
{ url: "https://news.google.com/rss/search?q=when:24h+site:cbsnews.com+world&hl=en-US&gl=US&ceid=US:en", category: "world" },
{ url: "https://news.google.com/rss/search?q=when:24h+site:abcnews.go.com+world&hl=en-US&gl=US&ceid=US:en", category: "world" },
{ url: "https://news.google.com/rss/search?q=when:24h+site:theguardian.com+world&hl=en-US&gl=US&ceid=US:en", category: "world" },

  // AP hard-news working RSS-style endpoints
  { url: "https://apnews.com/hub/apf-topnews?output=rss", category: "world" },

  // Google News RSS boosters for mainstream / wire pickup
  { url: "https://news.google.com/rss/search?q=when:24h+Reuters+world&hl=en-US&gl=US&ceid=US:en", category: "world" },
  { url: "https://news.google.com/rss/search?q=when:24h+AP+world&hl=en-US&gl=US&ceid=US:en", category: "world" },
  { url: "https://news.google.com/rss/search?q=when:24h+NBC+News+world&hl=en-US&gl=US&ceid=US:en", category: "world" },
  { url: "https://news.google.com/rss/search?q=when:24h+CBS+News+world&hl=en-US&gl=US&ceid=US:en", category: "world" },
  { url: "https://news.google.com/rss/search?q=when:24h+ABC+News+world&hl=en-US&gl=US&ceid=US:en", category: "world" },

  // =========================================================
  // MIDDLE EAST
  // =========================================================
  { url: "https://www.france24.com/en/middle-east/rss", category: "middle-east" },
  { url: "https://feeds.bbci.co.uk/news/world/middle_east/rss.xml", category: "middle-east" },
  { url: "https://www.jpost.com/rss/rss.xml", category: "middle-east" },
  { url: "https://www.timesofisrael.com/feed/", category: "middle-east" },
  { url: "https://www.allisrael.com/rss", category: "middle-east" },
  { url: "https://english.alarabiya.net/tools/mrss", category: "middle-east" },
  { url: "https://www.middleeasteye.net/rss", category: "middle-east" },
  { url: "https://www.trtworld.com/rss", category: "middle-east" },
  { url: "https://www.merip.org/feed", category: "middle-east" },

  // AP / Google News Middle East boosters
  { url: "https://news.google.com/rss/search?q=when:24h+Middle+East+Reuters&hl=en-US&gl=US&ceid=US:en", category: "middle-east" },
  { url: "https://news.google.com/rss/search?q=when:24h+Middle+East+AP&hl=en-US&gl=US&ceid=US:en", category: "middle-east" },
  { url: "https://news.google.com/rss/search?q=when:24h+Middle+East+BBC&hl=en-US&gl=US&ceid=US:en", category: "middle-east" },
  { url: "https://news.google.com/rss/search?q=when:24h+Middle+East+site:reuters.com&hl=en-US&gl=US&ceid=US:en", category: "middle-east" },
{ url: "https://news.google.com/rss/search?q=when:24h+Middle+East+site:apnews.com&hl=en-US&gl=US&ceid=US:en", category: "middle-east" },
{ url: "https://news.google.com/rss/search?q=when:24h+Middle+East+site:bbc.com&hl=en-US&gl=US&ceid=US:en", category: "middle-east" },
{ url: "https://news.google.com/rss/search?q=when:24h+Middle+East+site:aljazeera.com&hl=en-US&gl=US&ceid=US:en", category: "middle-east" },
{ url: "https://news.google.com/rss/search?q=when:24h+Middle+East+site:france24.com&hl=en-US&gl=US&ceid=US:en", category: "middle-east" },
{ url: "https://news.google.com/rss/search?q=when:24h+Middle+East+site:timesofisrael.com&hl=en-US&gl=US&ceid=US:en", category: "middle-east" },

  // =========================================================
  // IRAN / WAR ESCALATION
  // =========================================================

  // Analysis / restraint / non-mainstream strategic framing
  { url: "https://responsiblestatecraft.org/feed/", category: "iran-war" },
  { url: "http://original.antiwar.com/feed/", category: "iran-war" },
  { url: "https://warontherocks.com/feed/", category: "iran-war" },

  // Regional / Iran-side / adversarial narratives
  { url: "https://www.tehrantimes.com/rss", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+site:presstv.ir&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Iran+site:presstv.ir&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://tass.com/rss/v2.xml", category: "iran-war" },
  { url: "https://www.xinhuanet.com/english/rss/worldrss.xml", category: "iran-war" },
  { url: "https://api.globaltimes.cn/rss/outbound/home.xml", category: "iran-war" },

  // Defense / military framing
  { url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/global/?outputType=xml", category: "iran-war" },
  { url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/air/?outputType=xml", category: "iran-war" },

  // Major network direct feeds
  { url: "https://feeds.nbcnews.com/nbcnews/public/world", category: "iran-war" },
  { url: "https://www.cbsnews.com/latest/rss/world", category: "iran-war" },
  { url: "https://abcnews.go.com/abcnews/internationalheadlines", category: "iran-war" },

  // Search-targeted Iran war boosters
  { url: "https://news.google.com/rss/search?q=when:24h+Iran+Reuters&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Iran+AP&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Iran+BBC&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Iran+NBC+News&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Iran+CBS+News&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Iran+ABC+News&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Israel+Iran+Reuters&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Israel+Iran+AP&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Strait+of+Hormuz+Reuters&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Strait+of+Hormuz+AP&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Hezbollah+Iran&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Houthis+Iran&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
  { url: "https://news.google.com/rss/search?q=when:24h+Iran+site:reuters.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Iran+site:apnews.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Iran+site:bbc.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Iran+site:nbcnews.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Iran+site:cbsnews.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Iran+site:abcnews.go.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Israel+Iran+site:reuters.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Israel+Iran+site:apnews.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Strait+of+Hormuz+site:reuters.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Strait+of+Hormuz+site:apnews.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Houthis+Iran+site:reuters.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },
{ url: "https://news.google.com/rss/search?q=when:24h+Hezbollah+Iran+site:reuters.com&hl=en-US&gl=US&ceid=US:en", category: "iran-war" },

  // =========================================================
  // TECH / CONTROL SYSTEMS
  // =========================================================
  { url: "https://reclaimthenet.org/feed/", category: "tech" },
  { url: "https://www.biometricupdate.com/feed/", category: "tech" },
  { url: "https://www.eff.org/rss/updates.xml", category: "tech" },
  { url: "https://www.schneier.com/feed/", category: "tech" },
  { url: "https://news.google.com/rss/search?q=when:7d+CBDC+OR+%22digital+ID%22+OR+biometrics&hl=en-US&gl=US&ceid=US:en", category: "tech" },

  // =========================================================
  // PROPHECY / ESCHATOLOGY
  // Keep this lean so it does not flood the main site.
  // =========================================================
  { url: "https://endtimeheadlines.org/feed/", category: "prophecy" },
  { url: "https://www.prophecynewswatch.com/rss.xml", category: "prophecy" },
  { url: "https://www1.cbn.com/rss-cbn-news-jerusalemdateline.xml", category: "prophecy" },

  // =========================================================
  // FINANCE
  // =========================================================
  { url: "https://www.marketwatch.com/rss/topstories", category: "finance" },
  { url: "https://www.bis.org/rss/all.xml", category: "finance" },
  { url: "https://www.imf.org/external/rss/feeds.aspx?feed=imf_blog", category: "finance" },
  { url: "https://feeds.feedburner.com/zerohedge/feed", category: "finance" },
  { url: "https://www.federalreserve.gov/feeds/press_all.xml", category: "finance" },
  { url: "https://news.google.com/rss/search?q=when:24h+oil+price+OR+Hormuz+markets&hl=en-US&gl=US&ceid=US:en", category: "finance" },
  { url: "https://news.google.com/rss/search?q=when:24h+oil+price+Hormuz&hl=en-US&gl=US&ceid=US:en", category: "finance" },
{ url: "https://news.google.com/rss/search?q=when:24h+shipping+rates+Middle+East&hl=en-US&gl=US&ceid=US:en", category: "finance" },
{ url: "https://news.google.com/rss/search?q=when:24h+sanctions+Iran+markets&hl=en-US&gl=US&ceid=US:en", category: "finance" },

  // =========================================================
  // HEALTH / MEDICAL / BIO
  // =========================================================
  { url: "https://www.who.int/rss-feeds/news-english.xml", category: "health" },
  { url: "https://www.cdc.gov/media/rss.xml", category: "health" },
  { url: "https://www.nih.gov/news-events/news-releases/rss.xml", category: "health" },
  { url: "https://www.statnews.com/feed/", category: "health" },
  { url: "https://www.fiercehealthcare.com/rss/xml", category: "health" },
  { url: "https://news.google.com/rss/search?q=when:7d+CBDC&hl=en-US&gl=US&ceid=US:en", category: "tech" },
{ url: "https://news.google.com/rss/search?q=when:7d+%22digital+ID%22&hl=en-US&gl=US&ceid=US:en", category: "tech" },
{ url: "https://news.google.com/rss/search?q=when:7d+biometrics+surveillance&hl=en-US&gl=US&ceid=US:en", category: "tech" },

  // =========================================================
  // RELIGION / IDEOLOGY
  // =========================================================
  { url: "https://religionnews.com/feed/", category: "religion" },
  { url: "https://www.christianpost.com/rss", category: "religion" },
  { url: "https://www.firstthings.com/rss/web-exclusives", category: "religion" },
  { url: "https://www.realclearreligion.org/index.xml", category: "religion" },
  { url: "https://www.mnnonline.org/rss/pubNewsTease.rdf", category: "religion" },
  { url: "https://feeds.christianitytoday.com/christianitytoday/ctmag", category: "religion" },
  { url: "https://www.christiancentury.org/taxonomy/term/44163/feed", category: "religion" },

  // =========================================================
  // CRYPTO
  // =========================================================
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
  // { title: "Pinned example", url: "https://example.com/article", source: "Example" },
];

export const BLACKLIST: string[] = [
  // "example.com"
];


