// lib/hardCategories.ts

export const HARD_CATEGORIES = [
  "Power & Control",
  "Prophecy Watch",
  "Religion & Ideology",
  "War & Geopolitics",
  "Digital ID / Technocracy",
] as const;

export type HardCategory = (typeof HARD_CATEGORIES)[number];

// Map your existing feed buckets -> your hard categories (display taxonomy)
export function toHardCategory(feedCategory?: string): HardCategory {
  switch ((feedCategory || "").toLowerCase()) {
    case "tech":
      return "Digital ID / Technocracy";

    case "prophecy":
      return "Prophecy Watch";

    case "middle-east":
    case "world":
      return "War & Geopolitics";

    case "finance":
    case "crypto":
    case "health":
      return "Power & Control";

    default:
      return "Power & Control";
  }
}
