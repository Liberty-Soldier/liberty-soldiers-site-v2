// app/news/global-threat-warning-tourist-targets/page.tsx

import ShareButton from "../ShareButton";

export const metadata = {
  title:
    "Global Threat Expansion: Iranian Warning Signals Conflict May Reach Civilian Zones | Liberty Soldiers",
  description:
    "Iranian military rhetoric warning that U.S. and Israeli personnel may be unsafe even in tourist locations signals a dangerous psychological and geographic expansion of the conflict.",
  openGraph: {
    title:
      "Global Threat Expansion: Iranian Warning Signals Conflict May Reach Civilian Zones",
    description:
      "Threat language targeting resorts and civilian travel zones marks a shift from battlefield escalation to global pressure tactics.",
    url: "https://libertysoldiers.com/news/global-threat-warning-tourist-targets",
    images: [
      {
        url: "https://libertysoldiers.com/hero-global-threat-warning.jpg",
        width: 1200,
        height: 630,
        alt: "Global threat escalation cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Global Threat Expansion: Iranian Warning Signals Conflict May Reach Civilian Zones",
    description:
      "Threat rhetoric aimed at tourist centres worldwide signals a widening psychological and geographic dimension to the war.",
    images: ["https://libertysoldiers.com/hero-global-threat-warning.jpg"],
  },
};

const sources = [
  {
    title:
      "Regional media report Iranian military warning about global safety of U.S. and Israeli personnel",
    href: "#",
    outlet: "Multiple regional reports",
  },
];

export default function GlobalThreatWarningPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← Back to News
          </a>

          <ShareButton
            shareUrl="https://libertysoldiers.com/news/global-threat-warning-tourist-targets"
            title="Global Threat Expansion: Iranian Warning Signals Conflict May Reach Civilian Zones"
            summary="Threat rhetoric targeting tourist locations signals a dangerous expansion of the war’s psychological battlefield."
          />
        </div>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Escalation Signal Report
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Global Threat Expansion: Iranian Warning Signals Conflict May Reach Civilian Zones
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            When war rhetoric moves beyond military targets and into civilian travel spaces,
            the conflict has entered a new psychological and geographic phase.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500">
            <span>Liberty Soldiers</span>
            <span>•</span>
            <span>Escalation Analysis</span>
            <span>•</span>
            <span>Estimated read: 4–5 min</span>
          </div>
        </header>

        <figure className="my-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <img
            src="/hero-global-threat-warning.jpg"
            alt="Global conflict threat expansion"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
          <figcaption className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
            Threat language targeting global civilian spaces signals a shift from battlefield confrontation to psychological pressure strategies.
          </figcaption>
        </figure>

        <div className="space-y-6 leading-relaxed text-zinc-800">

          <p className="text-lg font-semibold text-zinc-900">
            The Iran conflict may be entering a new phase — one defined less by geography and more by perception.
          </p>

          <p>
            Iranian military messaging warning that American and Israeli personnel
            could face danger even in tourist destinations worldwide represents a
            significant rhetorical escalation. Such statements move the conflict’s
            narrative beyond traditional battlefields and into civilian psychological space.
          </p>

          <p>
            The warning follows recent strikes that reportedly killed senior Iranian
            intelligence and Revolutionary Guard figures. In conflicts marked by
            targeted leadership attacks, retaliatory messaging often shifts toward
            deterrence through uncertainty.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            Psychological escalation as strategic signaling
          </h2>

          <p>
            Modern conflicts increasingly include narrative warfare. Threat language
            aimed at global travel hubs and resorts does not necessarily signal
            immediate operational capability. Instead, it signals an attempt to widen
            the perceived risk environment.
          </p>

          <p>
            Tourism zones are symbolic targets. They represent normal life,
            economic confidence, and international mobility. Suggesting they are no
            longer safe introduces a new dimension of pressure on governments,
            travelers, and markets.
          </p>

          <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
            When war messaging reaches civilian leisure spaces, the objective is not only military deterrence — it is psychological disruption.
          </blockquote>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            Globalization means conflicts travel farther
          </h2>

          <p>
            In an interconnected world, the boundaries of conflict are increasingly
            blurred. Intelligence operations, proxy actors, cyber threats, and
            influence campaigns can extend pressure well beyond national borders.
          </p>

          <p>
            Even without direct attacks, warnings alone can alter travel patterns,
            insurance costs, diplomatic posture, and security protocols.
          </p>

          <p>
            Governments may now face pressure to raise threat levels, expand
            protective measures for citizens abroad, and reconsider the safety of
            international events or tourist flows.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            A signal worth monitoring
          </h2>

          <p>
            The most important development is not the statement itself, but what it
            indicates about the trajectory of escalation. If rhetoric continues to
            move toward global civilian exposure, the conflict risks transforming
            from a regional war into a broader climate of international insecurity.
          </p>

          <p className="text-lg font-semibold text-zinc-900">
            Wars expand not only through missiles and troop movements — but through
            the spread of fear, uncertainty, and perceived vulnerability.
          </p>

          <hr className="my-10 border-zinc-200" />

          <section>
            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Sources & reporting
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {sources.map((source) => (
                <a key={source.title} href={source.href}>
                  {source.title}
                </a>
              ))}
            </div>
          </section>

        </div>
      </article>
    </main>
  );
}
