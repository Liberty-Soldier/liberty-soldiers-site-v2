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
    slug: "us",
    label: "US",
    description:
      "Washington, Congress, federal agencies, domestic power shifts, and internal U.S. developments.",
    ogImage: "/og-power-control.jpg",
    href: "/news/us",
  },
  {
    slug: "global",
    label: "Global",
    description:
      "International developments, geopolitical shifts, diplomatic pressure, and major world events.",
    ogImage: "/og-default.jpg",
    href: "/news/global",
  },
  {
    slug: "war",
    label: "War",
    description:
      "Military escalation, strategic chokepoints, armed conflict, regional flashpoints, and geopolitical confrontation.",
    ogImage: "/og-war-geopolitics.jpg",
    href: "/news/war",
  },
  {
    slug: "finance",
    label: "Finance",
    description:
      "Markets, inflation, recession pressure, debt stress, energy shocks, and financial system instability.",
    ogImage: "/og-markets-finance.jpg",
    href: "/news/finance",
  },
  {
    slug: "control",
    label: "Control",
    description:
      "AI, surveillance, censorship, biometric systems, digital identity, and technocratic control architecture.",
    ogImage: "/og-power-control.jpg",
    href: "/news/control",
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
      return "war";

    case "markets & finance":
      return "finance";

    case "digital id / technocracy":
      return "control";

    case "power & control":
      return "control";

    case "religion & ideology":
      return "global";

    case "prophecy watch":
      return "global";

    default:
      return "global";
  }
}

export function labelFromSlug(slug: CanonicalCategorySlug): string {
  return getCategoryDef(slug)?.label || "Global";
}

export function hrefFromSlug(slug: CanonicalCategorySlug): string {
  return getCategoryDef(slug)?.href || "/news/global";
}