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

// Maps BOTH feed buckets and final display labels -> hard categories
export function toHardCategory(input?: string): HardCategory {
  const v = (input || "").toLowerCase().trim();

  switch (v) {
    // -------------------------
    // MARKETS / FINANCE
    // -------------------------
    case "finance":
    case "crypto":
    case "markets":
    case "markets & finance":
    case "finance & markets":
      return "Markets & Finance";

    // -------------------------
    // DIGITAL / TECH / ID
    // -------------------------
    case "tech":
    case "control":
    case "control systems":
    case "digital id":
    case "digital id / technocracy":
    case "technocracy":
      return "Digital ID / Technocracy";

    // -------------------------
    // WAR / GEO
    // -------------------------
    case "world":
    case "world briefing":
    case "middle-east":
    case "middle east":
    case "iran-war":
    case "iran war":
    case "geopolitics":
    case "geopolitics & war":
    case "war & geopolitics":
      return "War & Geopolitics";

    // -------------------------
    // RELIGION / IDEOLOGY
    // -------------------------
    case "religion":
    case "religion & ideology":
    case "persecution watch":
      return "Religion & Ideology";

    // -------------------------
    // PROPHECY
    // -------------------------
    case "prophecy":
    case "prophecy watch":
      return "Prophecy Watch";

    // -------------------------
    // POWER / CONTROL
    // -------------------------
    case "health":
    case "biosecurity":
    case "censorship":
    case "censorship & speech":
    case "power & control":
    case "general":
    case "pinned":
      return "Power & Control";

    default:
      return "Power & Control";
  }
}
