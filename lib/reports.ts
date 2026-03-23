// lib/reports.ts

export type Report = {
  slug: string;
  title: string;
  excerpt: string;
  dateISO: string;
  byline: string;
  coverImage: string;
  category?: string;
  hardCategory?: string;
  readTime?: string;
  featured?: boolean;
  priority?: number;
  kind: "report" | "analysis" | "brief" | "news";
};

export const reports: Report[] = [
{
  slug: "countdown-global-energy-food-shock",
  title:
    "They Knew the Cost: Why Escalate Toward Iran If the Fallout Was So Obvious?",
  excerpt:
    "With a trillion-dollar defense machine and vast intelligence modeling capabilities, the economic shock from Hormuz disruption was foreseeable. The deeper question is whether planners understood the delayed food-inflation consequences — and moved forward anyway.",
  dateISO: "2026-03-23",
  byline: "Liberty Soldiers",
  coverImage: "/hero-energy-food-shock.jpg",   // ✅ FIXED PATH
  category: "Markets & Finance",
  hardCategory: "Power & Control",
  readTime: "10 min",
  featured: true,
  priority: 1,
  kind: "analysis",
},
  {
    slug: "power-as-a-weapon-grid-war-homeland-risk",
    title: "Power as a Weapon: When War Talk Turns the Grid Into a Target",
    excerpt:
      "As Washington and Tehran openly threaten energy infrastructure, the battlefield is no longer confined overseas. History shows power grids are vulnerable — and modern society is built on uninterrupted electricity.",
    dateISO: "2026-03-22",
    byline: "Liberty Soldiers",
    coverImage: "/hero-power-grid-target.jpg",
    category: "Escalation Signals",
    hardCategory: "War & Geopolitics",
    readTime: "8 min",
    featured: true,
    priority: 0.98,
    kind: "analysis",
  },
  {
  slug: "war-leaves-the-battlefield-global-threat",
  title:
    "Iran’s Global Threat: When War Leaves the Battlefield",
  excerpt:
    "Iranian officials have warned that enemy personnel may not be safe anywhere in the world, including resorts, tourist centers, and recreational areas — signaling a potential shift toward global asymmetric retaliation.",
  dateISO: "2026-03-20",
  byline: "Liberty Soldiers",
  coverImage: "/hero-global-threat-warning.jpg",
  category: "Escalation Signals",
  hardCategory: "War & Geopolitics",
  readTime: "5 min",
  featured: true,
  priority: 0.97,
  kind: "analysis",
},
  {
  slug: "pentagon-war-funding-surge",
  title:
    "War Funding Surge: Pentagon Seeks $200 Billion as Iran Conflict Expands",
  excerpt:
    "A massive Pentagon funding request signals expectations of prolonged conflict and growing economic pressure.",
  dateISO: "2026-03-19",
  byline: "Liberty Soldiers",
  coverImage: "/hero-war-funding.jpg",
  category: "War Economics",
  hardCategory: "War & Geopolitics",
  readTime: "4 min",
  featured: true,
  priority: 0.94,
  kind: "analysis",
},
  {
  slug: "congress-war-powers-showdown",
  title:
    "Congress War Powers Showdown: Senate Backs Continued Iran Operations",
  excerpt:
    "The Senate’s rejection of a war-powers resolution highlights institutional backing for continued escalation and raises new questions about constitutional oversight.",
  dateISO: "2026-03-19",
  byline: "Liberty Soldiers",
  coverImage: "/hero-senate-war-powers.jpg",
  category: "Power & Escalation",
  hardCategory: "War & Geopolitics",
  readTime: "5 min",
  featured: true,
  priority: 0.97,
  kind: "analysis",
},
  {
  slug: "qatar-under-fire-ras-laffan-response",
  title:
    "Qatar Under Fire: Ras Laffan, Retaliation, and Doha’s Public Break",
  excerpt:
    "The strike on Ras Laffan pulled Qatar directly into the expanding conflict, forcing Doha into a sharper public posture as the war presses deeper into Gulf energy infrastructure.",
  dateISO: "2026-03-19",
  byline: "Liberty Soldiers",
  coverImage: "/hero-qatar-ras-laffan.jpg",
  category: "Energy & Escalation",
  hardCategory: "War & Geopolitics",
  readTime: "5 min",
  featured: true,
  priority: 0.95,
  kind: "analysis",
},
  
{
  slug: "stranded-in-the-gulf-safe-corridor-seafarers",
  title:
    "Stranded in the Gulf: 20,000 Seafarers, a Safe Corridor Push, and the New Hormuz Risk",
  excerpt:
    "A proposed safe corridor for stranded crews shows how badly Gulf shipping has deteriorated as Hormuz disruption evolves from market risk into a managed emergency.",
  dateISO: "2026-03-19",
  byline: "Liberty Soldiers",
  coverImage: "/hero-gulf-safe-corridor.jpg",
  category: "Shipping & Escalation",
  hardCategory: "War & Geopolitics",
  readTime: "5 min",
  featured: true,
  priority: 0.93,
  kind: "analysis",
},
  {
  slug: "elite-dissent-kent-resignation",
  title:
    "Elite Dissent: What Joseph Kent’s Wartime Resignation Signals",
  excerpt:
    "A rare wartime resignation by a senior U.S. counterterrorism intelligence official is raising strategic questions about internal consensus, escalation risks, and the trajectory of the Iran conflict.",
  dateISO: "2026-03-19",
  byline: "Liberty Soldiers Analysis Desk",
  coverImage: "/hero-intelligence-resignation.jpg",
  category: "Strategic Signals",
  hardCategory: "War & Geopolitics",
  readTime: "6 min",
  featured: true,
  priority: 0.96,
  kind: "analysis",
},
  {
    slug: "information-war-intensifies",
    title:
      "Information War Intensifies as Conflicting Reports Shape Global Perception",
    excerpt:
      "Conflicting battlefield claims, intelligence leaks, media framing, and narrative control are becoming part of the conflict itself in the modern information war environment.",
    dateISO: "2026-03-16",
    byline: "Liberty Soldiers",
    coverImage: "/og-information-war.jpg",
    category: "Narrative Warfare",
    hardCategory: "War & Geopolitics",
    readTime: "4 min",
    featured: true,
    priority: 0.92,
    kind: "analysis",
  },
  {
  slug: "hormuz-flashpoint",
  title:
    "Hormuz Flashpoint: Oil, Shipping, and War Pressure Rise as Coalition Support Falters",
  excerpt:
    "A Liberty Soldiers update on the Strait of Hormuz crisis, shipping disruption, Fujairah attacks, oil volatility, and the widening pressure now moving from battlefield escalation into global energy and market risk.",
  dateISO: "2026-03-16",
  byline: "Liberty Soldiers",
  coverImage: "/og-hormuz-flashpoint.jpg",
  category: "Systemic Risk",
  hardCategory: "Energy",
  readTime: "3 min",
  featured: true,
  priority: 0.96,
  kind: "news",
},
  {
    slug: "jones-act-oil-surge",
    title:
      "Oil Shock and the Jones Act: Crisis Policy Moves Amid the Iran Conflict",
    excerpt:
      "As oil prices surge during escalating tensions tied to the Iran conflict, U.S. officials are weighing emergency policy options — including temporarily bypassing the century-old Jones Act to ease fuel supply constraints and stabilize markets.",
    dateISO: "2026-03-12",
    byline: "Black Signal",
    coverImage: "/hero-war-energy-shipping-2.jpg",
    category: "Systemic Risk",
    hardCategory: "Energy",
    readTime: "3 min",
    featured: false,
    priority: 0.85,
    kind: "analysis",
  },
  {
    slug: "war-beyond-the-battlefield",
    title:
      "War Beyond the Battlefield: Oil Shock, Shipping Risk, and the Expanding Iran Crisis",
    excerpt:
      "Oil volatility, tanker security risks, and rising policy pressure signal a widening conflict beyond traditional front lines. This field report examines how energy shocks, global trade stress, and geopolitical escalation are reshaping economic expectations and public stability.",
    dateISO: "2026-03-12",
    byline: "Black Signal",
    coverImage: "/hero-war-energy-shipping.jpg",
    category: "Systemic Risk",
    hardCategory: "Energy",
    readTime: "4 min",
    featured: true,
    priority: 0.95,
    kind: "report",
  },
  {
    slug: "crisis-window",
    title:
      "The Crisis Window: How Fear Accelerates Change and Expands Public Consent",
    excerpt:
      "Periods of instability often accelerate systemic change. This report examines crisis psychology, rapid policy shifts, and how fear can expand what populations are willing to accept.",
    dateISO: "2026-03-11",
    byline: "Black Signal",
    coverImage: "/crisis-window.jpg",
    category: "Systemic Risk",
    hardCategory: "Policy",
    readTime: "4 min",
    featured: false,
    priority: 0.9,
    kind: "report",
  },
  {
    slug: "signal-vs-noise",
    title: "Signal vs Noise: How Modern Narratives Shape Public Perception",
    excerpt:
      "Narrative cycles, desensitization, and the hidden why behind modern information overload.",
    dateISO: "2026-02-13",
    byline: "Black Signal",
    coverImage: "/signal-vs-noise.jpg",
    category: "Narrative Control",
    hardCategory: "Media",
    readTime: "3 min",
    featured: false,
    priority: 0.8,
    kind: "analysis",
  },
  {
    slug: "doomsday-clock",
    title:
      "The Doomsday Clock Isn’t a Prediction — It’s a Psychological Instrument",
    excerpt:
      "The Doomsday Clock isn’t measuring time. It’s a psychological device used to manufacture urgency, suppress scrutiny, and condition populations to accept control as protection.",
    dateISO: "2026-01-30",
    byline: "D.U.M.B.",
    coverImage: "/doomsday-clock.png",
    category: "Narrative Control",
    hardCategory: "Psychology",
    readTime: "4 min",
    featured: false,
    priority: 0.75,
    kind: "analysis",
  },
  {
    slug: "us-iran-abrahamic-endtimes",
    title: "U.S.–Iran Escalation and the Abrahamic End-Time Lens",
    excerpt:
      "After prior U.S. strikes and amid renewed escalation signals, competing end-time frameworks across Judaism, Christianity, and Islam shape public perception.",
    dateISO: "2026-01-29",
    byline: "Dead Reckoning",
    coverImage: "/IRAN.jpg",
    category: "Religion & Ideology",
    hardCategory: "Geopolitics",
    readTime: "5 min",
    featured: false,
    priority: 0.7,
    kind: "report",
  },
  {
    slug: "dispensationalism-middle-east",
    title: "How Dispensationalism Scripts the Middle East",
    excerpt:
      "From Sunday sermons to congressional votes, a theology that reshapes foreign policy.",
    dateISO: "2026-01-20",
    byline: "The Ledger",
    coverImage: "/briefing-fallback.jpg",
    category: "Religion & Ideology",
    hardCategory: "Geopolitics",
    readTime: "5 min",
    featured: false,
    priority: 0.7,
    kind: "report",
  },
  {
    slug: "first-report",
    title: "The Mechanism of Alignment",
    excerpt:
      "How truth is neutralized through agreement, conformity, and manufactured consensus.",
    dateISO: "2026-01-18",
    byline: "Grey Index",
    coverImage: "/briefing-fallback.jpg",
    category: "Narrative Control",
    hardCategory: "Systems",
    readTime: "4 min",
    featured: false,
    priority: 0.65,
    kind: "analysis",
  },
];

export const REPORTS = reports;

export function getAllReports(): Report[] {
  return [...reports].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
}

export function getLatestReports(limit = 10): Report[] {
  return getAllReports().slice(0, limit);
}

export function getLatestReport(): Report | undefined {
  return getAllReports()[0];
}
