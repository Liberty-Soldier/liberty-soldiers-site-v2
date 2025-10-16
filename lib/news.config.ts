// lib/news.config.ts
export const NEWS_FEEDS: string[] = [
  // Add your favorite RSS feeds here (Torah, prophecy, end-times, etc.)
  // Example:
  // 'https://www.jpost.com/rss/rss.xml',
  // 'https://allisrael.com/rss',
];

export const PINNED_LINKS: { title: string; url: string; source?: string }[] = [
  // Example pinned articles
  // { title: 'Torah Keepers Face Rising Censorship', url: 'https://example.com/article', source: 'Example Source' },
];

export const BLACKLIST: string[] = [
  // Add any site domains you want to exclude from feed results
];
