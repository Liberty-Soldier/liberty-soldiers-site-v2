export type TimelineEvent = {
  id: string;               // unique id
  ts: number;               // timestamp (ms)

  title: string;            // short event title

  summary?: string;         // optional summary
  source?: string;          // outlet name
  url?: string;             // source link

  tags?: string[];          // e.g. ["Iran", "Hormuz", "US"]

  kind?: "manual" | "auto"; // manual pinned vs auto feed-derived
};
