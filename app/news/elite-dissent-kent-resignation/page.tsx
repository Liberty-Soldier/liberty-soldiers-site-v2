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

        <h2>Elite Dissent: Why Did Joseph Kent Resign During an Active War?</h2>

<p className="text-lg font-semibold text-zinc-900">
Senior intelligence officials do not normally resign in the middle of a war.
</p>

<p>
Personnel turnover is common in Washington. But resignations tied directly to
active military operations are rare — and often signal deeper strategic tension
inside the national security system.
</p>

<p className="text-lg font-semibold text-zinc-900">
Joseph Kent served through years of controversial conflicts without walking away.
</p>

<p>
He remained in government roles during the wars in Iraq and Afghanistan, through
the rise of ISIS, and during major counterterrorism campaigns that reshaped U.S.
foreign policy. He did not resign then.
</p>

<p className="text-lg font-semibold text-zinc-900">
So why now — during the Iran conflict?
</p>

<h2>His own words raise the stakes</h2>

<p>
In his resignation letter, Kent wrote that he could not continue supporting the
war effort.
</p>

<blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
“I cannot in good conscience support the ongoing war in Iran.”
</blockquote>

<p>
He also challenged the core justification for the conflict, stating that Iran
did not present an immediate danger to the United States.
</p>

<blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
“Iran posed no imminent threat to our nation.”
</blockquote>

<p>
Such language from a senior counterterrorism official is not routine dissent.
It suggests internal disagreement about threat assessments, escalation risks,
and the decision-making process that led to military action.
</p>

<h2>When consensus fractures, escalation risk rises</h2>

<p>
Wars depend on institutional unity. Public messaging often projects certainty:
the threat is clear, the strategy is justified, the objectives are necessary.
</p>

<p>
But history shows that internal fractures frequently appear before conflicts
expand. Intelligence officials are trained to assess risk — not shape political
narratives. When one chooses to walk away during escalation, it raises questions
about what is happening behind closed doors.
</p>

<ul className="list-disc pl-6 space-y-2">
<li>Are threat assessments evolving?</li>
<li>Is policy being driven by momentum rather than strategy?</li>
<li>Are diplomatic off-ramps narrowing?</li>
<li>How much internal dissent remains unseen?</li>
</ul>

<p>
Kent’s resignation alone does not determine the future of the conflict. But it
does highlight a critical reality of modern warfare:
</p>

<p className="text-lg font-semibold text-zinc-900">
The most important warning signs often emerge from inside the institutions
responsible for managing escalation — not from the battlefield itself.
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
