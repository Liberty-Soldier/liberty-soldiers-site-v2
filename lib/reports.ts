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
  slug: "crisis-window",
  title: "The Crisis Window: How Fear Accelerates Change and Expands Public Consent",
  excerpt:
    "Periods of instability often accelerate systemic change. This report examines crisis psychology, rapid policy shifts, and how fear can expand what populations are willing to accept.",
  dateISO: "2026-03-11",
  byline: "Black Signal",
  coverImage: "/crisis-window.jpg",
},
  {
  slug: "signal-vs-noise",
  title: "Signal vs Noise: How Modern Narratives Shape Public Perception",
  excerpt:
    "Narrative cycles, desensitization, and the hidden why behind modern information overload.",
  dateISO: "2026-02-13",
  byline: "Black Signal",
  coverImage: "/signal-vs-noise.jpg",
},

{
  slug: "doomsday-clock",
  title: "The Doomsday Clock Isn’t a Prediction — It’s a Psychological Instrument",
  excerpt:
    "The Doomsday Clock isn’t measuring time. It’s a psychological device used to manufacture urgency, suppress scrutiny, and condition populations to accept control as protection.",
  dateISO: "2026-01-30",
  byline: "D.U.M.B.",
  coverImage: "doomsday-clock.png",
},
  
  {
  slug: "us-iran-abrahamic-endtimes",
  title: "U.S.–Iran Escalation and the Abrahamic End-Time Lens",
  excerpt:
    "After prior U.S. strikes and amid renewed escalation signals, competing end-time frameworks across Judaism, Christianity, and Islam shape public perception.",
  dateISO: "2026-01-29",
  byline: "Dead Reckoning",
  coverImage: "/IRAN.jpg",
},
  
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
