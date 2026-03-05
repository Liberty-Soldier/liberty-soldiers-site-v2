import type { TimelineEvent } from "./timeline.types";

export const IRAN_MANUAL_TIMELINE: TimelineEvent[] = [
  {
    id: "mar-01-us-strike-logistics",
    ts: Date.parse("2026-03-01T12:00:00Z"),
    title: "US strikes reported IRGC logistics node",
    summary: "Initial reported escalation step: strike on logistics/support infrastructure.",
    tags: ["Iran", "US"],
    kind: "manual",
  },
  {
    id: "mar-03-hormuz-risk",
    ts: Date.parse("2026-03-03T12:00:00Z"),
    title: "Strait of Hormuz disruption risk spikes",
    summary: "Rhetoric + deployments increase perceived risk to shipping lanes and energy flows.",
    tags: ["Hormuz", "Shipping", "Energy"],
    kind: "manual",
  },
];
