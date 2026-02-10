// lib/hardCategories.ts

export const HARD_CATEGORIES = [
  "Markets & Finance",
  "Power & Control",
  "Digital ID / Technocracy",
  "War & Geopolitics",
  "Religion & Ideology",
  "Prophecy Watch",
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

    case "religion":
    return "Religion & Ideology";

    case "finance":
    case "crypto":
      return "Markets & Finance";

    case "health":
      return "Power & Control";

    default:
      return "Power & Control";
  }
}
