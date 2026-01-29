// lib/reports.ts

export type Report = {
  slug: string; // folder name under /news/{slug}/page.tsx
  title: string;
  excerpt: string;
  dateISO: string; // "YYYY-MM-DD"
  byline: string;  // pseudonym, e.g. "Black Signal"
  coverImage?: string; // optional: "/images/reports/xyz.jpg"
};

export const REPORTS: Report[] = [
  {
    slug: "dispensationalism-middle-east",
    title: "How Dispensationalism Scripts the Middle East",
    excerpt:
      "From Sunday sermons to congressional votes, a theology that reshapes foreign policy.",
    dateISO: "2026-01-20",
    byline: "The Ledger",
    coverImage: "/briefing-fallback.jpg",
  },
  {
    slug: "first-report",
    title: "The Mechanism of Alignment",
    excerpt:
      "How truth is neutralized through agreement, conformity, and manufactured consensus.",
    dateISO: "2026-01-18",
    byline: "Grey Index",
    coverImage: "/briefing-fallback.jpg",
  },
];

export function getAllReports(): Report[] {
  // Newest first
  return [...REPORTS].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
}

export function getLatestReports(limit = 10): Report[] {
  return getAllReports().slice(0, limit);
}

export function getLatestReport(): Report | undefined {
  return getAllReports()[0];
}
