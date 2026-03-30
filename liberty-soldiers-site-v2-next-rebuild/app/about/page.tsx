import type { Metadata } from "next";

const SITE_URL = "https://libertysoldiers.com";

export const metadata: Metadata = {
  title: "About | Liberty Soldiers",
  description:
    "About Liberty Soldiers — independent situational awareness, geopolitical analysis, and investigative reporting.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          About Liberty Soldiers
        </h1>
      </div>

      <div className="prose prose-zinc max-w-none">
        <p>
          Liberty Soldiers is an independent media and analysis platform focused
          on situational awareness, geopolitical developments, global power
          structures, economic trends, and emerging technological systems that
          shape the modern world.
        </p>

        <p>
          The project was created to provide structured monitoring of fast-moving
          global events and to help readers better understand the signals behind
          headlines, market shifts, conflicts, and strategic policy changes.
        </p>

        <h2>Editorial Focus</h2>

        <ul>
          <li>Geopolitics and military developments</li>
          <li>Economic and financial system trends</li>
          <li>Technology, digital identity, and control systems</li>
          <li>Media narratives and information warfare</li>
          <li>Long-term global strategic shifts</li>
        </ul>

        <h2>Independence</h2>

        <p>
          Liberty Soldiers operates as an independent publishing platform. The
          site aggregates news signals from multiple sources and also publishes
          original analysis and investigative reports.
        </p>

        <p>
          Content is intended to encourage critical thinking, situational
          awareness, and informed interpretation of complex global developments.
        </p>

        <h2>Mission</h2>

        <p>
          The mission of Liberty Soldiers is to track the convergence of power,
          perception, and emerging systems influencing societies worldwide,
          while providing readers with structured context and timely insight.
        </p>

        <h2>Contact</h2>

        <p>
          For inquiries or media communication, visit the contact page or email{" "}
          <a href="mailto:briefings@libertysoldiers.com">
            briefings@libertysoldiers.com
          </a>.
        </p>
      </div>
    </main>
  );
}
