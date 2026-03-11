export default function AboutPage() {
  return (
    <main className="min-h-[70vh] px-6 py-16 bg-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          About Liberty Soldiers
        </h1>

        <p className="mt-6 text-lg text-gray-700 max-w-3xl leading-relaxed">
          Liberty Soldiers is an independent investigative platform focused on situational awareness,
          historical context, and the analysis of modern power structures shaping global events.
          We publish original reports that examine headlines, narratives, and long-term trends —
          not to provoke outrage, but to understand how perception is formed, reinforced, and directed.
        </p>

        <p className="mt-4 text-gray-700 max-w-3xl leading-relaxed">
          Our work operates on a simple principle: widely accepted ideas are not always widely examined.
          Liberty Soldiers exists to question assumptions, track emerging signals, and encourage
          critical thinking in an era of rapid information flow and narrative competition.
        </p>

        <p className="mt-4 text-gray-700 max-w-3xl leading-relaxed">
          Analysis is rooted in documented sources, historical patterns, open-source intelligence,
          and cross-disciplinary research. Institutional messaging, media framing, and ideological
          positioning are evaluated alongside economic, geopolitical, and technological developments.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            What We Publish
          </h2>
          <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
            <li>Investigative reports tied to real-world events and global headlines</li>
            <li>Historical analysis of political, financial, technological, and ideological systems</li>
            <li>Situational awareness briefings focused on long-term patterns and emerging risks</li>
            <li>Signal tracking of geopolitical escalation, market shifts, and structural change</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Publishing Standard
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Liberty Soldiers distinguishes between verified information, analysis, and theory.
            Claims are examined through historical continuity, documented evidence, and
            transparent reasoning. When uncertainty exists, it is acknowledged rather than concealed.
            The objective is clarity — not conformity.
          </p>
        </div>

        <div className="mt-10">
          <p className="text-sm text-gray-500 max-w-3xl">
            This page will continue to expand with contributor guidelines, sourcing methodology,
            and contact information as the platform grows.
          </p>
        </div>
      </div>
    </main>
  );
}
