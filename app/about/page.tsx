export default function AboutPage() {
  return (
    <main className="min-h-[70vh] px-6 py-16 bg-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          About Liberty Soldiers
        </h1>

        <p className="mt-6 text-lg text-gray-700 max-w-3xl leading-relaxed">
          Liberty Soldiers is an independent investigative platform focused on situational awareness,
          historical context, and Scripture-first analysis. We publish original reports that examine
          modern events, belief systems, and institutional narratives — not to provoke outrage,
          but to expose how perception is shaped, reinforced, and defended.
        </p>

        <p className="mt-4 text-gray-700 max-w-3xl leading-relaxed">
          Our work operates on a simple principle: truth does not require consensus.
          Throughout history, the most widely accepted ideas were often the least examined.
          Liberty Soldiers exists to challenge inherited assumptions, question accepted frameworks,
          and encourage discernment over compliance.
        </p>

        <p className="mt-4 text-gray-700 max-w-3xl leading-relaxed">
          We prioritize documented sources, historical records, and direct engagement with Scripture.
          Tradition, institutional authority, and popular interpretation are not treated as proof.
          When claims are made, they are traced — linguistically, historically, and contextually —
          back to their origins.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            What We Publish
          </h2>
          <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
            <li>Investigative reports tied to real-world events and headlines</li>
            <li>Historical analysis of religious, political, and ideological systems</li>
            <li>Scripture-first examinations free from denominational filters</li>
            <li>Situational awareness pieces focused on long-term patterns, not daily outrage</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Publishing Standard
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Liberty Soldiers does not publish opinion pieces disguised as facts.
            Analysis is grounded in verifiable sources, historical continuity,
            and clear distinctions between evidence, interpretation, and theory.
            When uncertainty exists, it is stated — not concealed.
          </p>
        </div>

        <div className="mt-10">
          <p className="text-sm text-gray-500 max-w-3xl">
            This page will continue to expand with contact information, contributor guidelines,
            and a public archive outlining our sourcing and editorial methodology.
          </p>
        </div>
      </div>
    </main>
  );
}




