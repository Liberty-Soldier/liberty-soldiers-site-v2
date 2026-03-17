// lib/news.taxonomy.ts

import type { CanonicalCategorySlug } from "./news.types";

export const CATEGORY_DEFS: {
  slug: CanonicalCategorySlug;
  label: string;
  description: string;
  ogImage: string;
  href: string;
}[] = [
  {
    slug: "war-geopolitics",
    label: "War & Geopolitics",
    description:
      "Conflict escalation, state power, military posture, diplomacy, and geopolitical instability.",
    ogImage: "/og-war-geopolitics.jpg",
    href: "/news/geopolitics-war",
  },
  {
    slug: "markets-finance",
    label: "Markets & Finance",
    description:
      "Markets, central banking, monetary policy, debt, liquidity, and systemic financial pressure.",
    ogImage: "/og-markets-finance.jpg",
    href: "/news/markets-finance",
  },
  {
    slug: "digital-id-technocracy",
    label: "Digital ID / Technocracy",
    description:
      "Digital identity, surveillance infrastructure, algorithmic governance, and technocratic systems.",
    ogImage: "/og-digital-id.jpg",
    href: "/news/control-systems",
  },
  {
    slug: "power-control",
    label: "Power & Control",
    description:
      "Narrative management, censorship, biosecurity policy, institutional power, and social control mechanisms.",
    ogImage: "/og-power-control.jpg",
    href: "/news/power-control",
  },
  {
    slug: "religion-ideology",
    label: "Religion & Ideology",
    description:
      "Belief systems, institutional religion, ideological conflict, persecution, and worldview narratives.",
    ogImage: "/og-religion-ideology.jpg",
    href: "/news/religion-ideology",
  },
  {
    slug: "prophecy-watch",
    label: "Prophecy Watch",
    description:
      "Prophetic framing, eschatology, end-times discourse, and narrative intersections with current events.",
    ogImage: "/og-prophecy-watch.jpg",
    href: "/news/prophecy-watch",
  },
];

export function getCategoryDef(slug: CanonicalCategorySlug) {
  return CATEGORY_DEFS.find((x) => x.slug === slug);
}

export function slugFromHardCategory(
  hardCategory?: string
): CanonicalCategorySlug {
  const v = (hardCategory || "").toLowerCase().trim();

  switch (v) {
    case "war & geopolitics":
      return "war-geopolitics";
    case "markets & finance":
      return "markets-finance";
    case "digital id / technocracy":
      return "digital-id-technocracy";
    case "religion & ideology":
      return "religion-ideology";
    case "prophecy watch":
      return "prophecy-watch";
    case "power & control":
    default:
      return "power-control";
  }
}

export function labelFromSlug(slug: CanonicalCategorySlug): string {
  return getCategoryDef(slug)?.label || "Power & Control";
}

export function hrefFromSlug(slug: CanonicalCategorySlug): string {
  return getCategoryDef(slug)?.href || "/news/power-control";
}
