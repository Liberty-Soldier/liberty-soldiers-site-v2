// app/news/elite-dissent-kent-resignation/page.tsx

import ShareButton from "../ShareButton";

export const metadata = {
  title:
    "Elite Dissent: What Joseph Kent’s Wartime Resignation Signals | Liberty Soldiers",
  description:
    "A rare wartime resignation from a senior counterterrorism intelligence official raises deeper strategic questions about internal fractures, escalation risk, and consensus inside the national security apparatus.",
  openGraph: {
    title:
      "Elite Dissent: What Joseph Kent’s Wartime Resignation Signals",
    description:
      "When senior intelligence officials resign during active conflict, it can signal deeper disagreements over threat assessments, escalation, and war strategy.",
    url: "https://libertysoldiers.com/news/elite-dissent-kent-resignation",
    images: [
      {
        url: "https://libertysoldiers.com/hero-intelligence-resignation.jpg",
        width: 1200,
        height: 630,
        alt: "Intelligence resignation signal cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Elite Dissent: What Joseph Kent’s Wartime Resignation Signals",
    description:
      "Rare wartime intelligence resignations can indicate deeper fractures inside strategic decision-making during conflict.",
    images: [
      "https://libertysoldiers.com/hero-intelligence-resignation.jpg",
    ],
  },
};

const sources = [
  {
    title:
      "Reports: Senior counterterrorism official resigns citing concerns over Iran war",
    href: "#",
    outlet: "Multiple reports",
  },
];

function SectionImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <img
        src={src}
        alt={alt}
        className="h-auto w-full object-cover"
        loading="lazy"
      />
      <figcaption className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
        {caption}
      </figcaption>
    </figure>
  );
}

function SourceCard({
  title,
  href,
  outlet,
}: {
  title: string;
  href: string;
  outlet: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 hover:shadow-sm"
    >
      <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        {outlet}
      </div>
      <div className="mt-2 text-sm font-semibold leading-snug text-zinc-900 group-hover:text-black">
        {title}
      </div>
      <div className="mt-3 text-xs text-zinc-500">Open source ↗</div>
    </a>
  );
}

export default function KentResignationPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← Back to News
          </a>

          <ShareButton
            shareUrl="https://libertysoldiers.com/news/elite-dissent-kent-resignation"
            title="Elite Dissent: What Joseph Kent’s Wartime Resignation Signals"
            summary="Rare wartime intelligence resignations can indicate deeper fractures inside national security decision-making."
          />
        </div>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Strategic Signal Report
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Elite Dissent: What Joseph Kent’s Wartime Resignation Signals
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            Wars are often portrayed as unified national efforts. But history
            shows that the first signs of strategic tension frequently emerge
            inside the intelligence institutions responsible for assessing
            threats and shaping policy options.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500">
            <span>Liberty Soldiers</span>
            <span>•</span>
            <span>Strategic Analysis</span>
            <span>•</span>
            <span>Estimated read: 6–8 min</span>
          </div>
        </header>

        <SectionImage
          src="/hero-intelligence-resignation.jpg"
          alt="Intelligence leadership resignation signal"
          caption="Personnel decisions inside the national security structure can signal deeper strategic disagreements."
        />

        <div className="space-y-6 leading-relaxed text-zinc-800">

          <p className="text-lg font-medium text-zinc-900">
            The wartime resignation of senior counterterrorism official Joseph
            Kent may appear at first glance to be just another Washington
            personnel shift. But departures tied directly to disagreement over
            active conflict are far less routine — and often carry strategic
            meaning beyond the headline.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            Why wartime intelligence resignations matter
          </h2>

          <p>
            Intelligence agencies operate within a culture that strongly
            discourages public dissent. Once national policy is set, senior
            officials are generally expected to maintain institutional unity.
            Resigning during an active conflict can mean forfeiting influence
            over strategy at the very moment decisions are most critical.
          </p>

          <p>
            For this reason, such resignations are relatively rare. When they do
            occur, they can signal internal disagreements over threat
            assessments, escalation risks, alliance pressures, or the long-term
            trajectory of the war itself.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            Career context increases the significance
          </h2>

          <p>
            Kent served through multiple major security crises without stepping
            down. His career spanned the global counterterrorism campaigns that
            followed the September 11 attacks, the wars in Iraq and Afghanistan,
            and the multinational effort to dismantle the territorial control of
            ISIS.
          </p>

          <p>
            Remaining in position during these controversial conflicts suggests
            his resignation now is less about routine political change and more
            about a perceived shift in strategic conditions or threat
            interpretation.
          </p>

          <SectionImage
            src="/policy-war-briefing.jpg"
            alt="Strategic policy briefing environment"
            caption="Internal threat assessments and escalation debates often shape the direction of conflicts long before public narratives adjust."
          />

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            Signals of consensus strain
          </h2>

          <p>
            Wars require elite consensus to sustain long-term operations.
            Fractures inside intelligence leadership can indicate disagreement
            about objectives, risk tolerance, or whether diplomatic off-ramps
            remain viable.
          </p>

          <p>
            Such moments historically appear early in conflicts that later
            expand. They do not necessarily predict outcomes, but they do suggest
            that the strategic picture is more contested than public messaging
            alone may reveal.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            Information war and perception management
          </h2>

          <p>
            In modern conflict, narrative control operates alongside military
            operations. High-profile resignations can influence public debate,
            alliance confidence, and investor perception. They can also trigger
            stronger messaging campaigns aimed at reinforcing unity and
            legitimacy.
          </p>

          <p>
            The result is often a widening gap between official certainty and
            internal caution — a dynamic that has shaped many past conflicts.
          </p>

          <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
            When intelligence leaders walk away during wartime, the signal is
            rarely about one individual. It is about the stability of the
            consensus guiding the conflict.
          </blockquote>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            What to watch next
          </h2>

          <p>
            Key indicators include whether additional officials express concern,
            whether strategic objectives shift, and whether diplomatic pressure
            intensifies. Personnel changes alone do not determine war outcomes —
            but they can reveal underlying tensions shaping future decisions.
          </p>

          <p className="text-lg font-semibold text-zinc-900">
            In complex conflicts, the most important warnings often come not from
            the front lines, but from inside the institutions responsible for
            managing them.
          </p>

          <hr className="my-10 border-zinc-200" />

          <section>
            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Sources & reporting
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {sources.map((source) => (
                <SourceCard
                  key={source.title}
                  title={source.title}
                  href={source.href}
                  outlet={source.outlet}
                />
              ))}
            </div>
          </section>

        </div>
      </article>
    </main>
  );
}
