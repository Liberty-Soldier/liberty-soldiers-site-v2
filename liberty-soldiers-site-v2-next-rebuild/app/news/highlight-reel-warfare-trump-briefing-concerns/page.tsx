import ShareButton from "../ShareButton";

export const metadata = {
  title:
    "Highlight-Reel Warfare: Concerns Grow Over Trump’s Strike Montage Briefings | Liberty Soldiers",
  description:
    "Reports that President Trump has been shown rapid-cut video montages of recent U.S. strikes are raising questions about perception, escalation risk, and the gap between battlefield reality and victory messaging.",
  openGraph: {
    title:
      "Highlight-Reel Warfare: Concerns Grow Over Trump’s Strike Montage Briefings",
    description:
      "If war is increasingly experienced as a montage of successful explosions, what does that do to perception, escalation risk, and the public narrative?",
    url: "https://libertysoldiers.com/news/highlight-reel-warfare-trump-briefing-concerns",
    images: [
      {
        url: "https://libertysoldiers.com/hero-highlight-reel-warfare.jpg",
        width: 1200,
        height: 630,
        alt: "Highlight reel warfare analysis cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Highlight-Reel Warfare: Concerns Grow Over Trump’s Strike Montage Briefings",
    description:
      "What happens when war is experienced as explosions on a screen rather than a full-spectrum strategic reality?",
    images: ["https://libertysoldiers.com/hero-highlight-reel-warfare.jpg"],
  },
};

const sources = [
  {
    title:
      "NBC News: Trump shown daily strike montage videos as allies raise concerns",
    href: "https://www.nbcnews.com/",
    outlet: "NBC News",
  },
  {
    title:
      "Illustrative YouTube footage referenced in public discussion around strike-heavy war visuals",
    href: "https://www.youtube.com/watch?v=9axrBdB-fz0",
    outlet: "YouTube",
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

function VideoEmbed({
  title,
  embedUrl,
}: {
  title: string;
  embedUrl: string;
}) {
  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs uppercase tracking-[0.18em] text-zinc-500">
        Illustrative footage
      </div>
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
        This video is not presented as Trump’s actual briefing package. It is included
        to illustrate the kind of strike-heavy visual language fueling concern around
        reported montage-style war briefings.
      </div>
    </div>
  );
}

export default function HighlightReelWarfarePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← Back to News
          </a>

          <ShareButton
            shareUrl="https://libertysoldiers.com/news/highlight-reel-warfare-trump-briefing-concerns"
            title="Highlight-Reel Warfare: Concerns Grow Over Trump’s Strike Montage Briefings"
            summary="If war is increasingly experienced as a montage of successful explosions, what does that do to perception, escalation risk, and the public narrative?"
          />
        </div>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Strategic Signal Report
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Highlight-Reel Warfare: Concerns Grow Over Trump’s Strike Montage
            Briefings
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            If war is increasingly experienced as explosions on a screen rather than
            a full-spectrum strategic reality, the concern is obvious: perception can
            start running ahead of reality.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500">
            <span>Liberty Soldiers</span>
            <span>•</span>
            <span>Strategic Analysis</span>
            <span>•</span>
            <span>Estimated read: 7 min</span>
          </div>
        </header>

        <SectionImage
          src="/hero-highlight-reel-warfare.jpg"
          alt="War montage briefing analysis"
          caption="When war is compressed into rapid-cut visuals of targets exploding, the question is no longer only what happened — but what kind of perception that format creates."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6 leading-relaxed text-zinc-800">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                At a glance
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>
                  • Reports say Donald Trump has been shown daily rapid-cut video
                  montages of recent U.S. strikes.
                </li>
                <li>
                  • Critics worry that this kind of briefing can reinforce a visual
                  narrative of momentum and control.
                </li>
                <li>
                  • The concern is not whether the footage is real, but whether the
                  format itself can distort how the war is perceived.
                </li>
              </ul>
            </div>

            <p className="text-lg font-semibold text-zinc-900">
              This is not a small detail.
            </p>

            <p>
              It is one of the most psychologically revealing details to emerge from
              the war so far.
            </p>

            <p>
              According to reporting, President Donald Trump has been receiving
              montage-style briefings showing the previous 48 hours of U.S. strikes on
              Iranian-linked targets — rapid-cut footage of explosions, impacts, and
              visible destruction.
            </p>

            <p>
              That matters because war is never just what happens on the battlefield.
              It is also how the battlefield is translated into perception inside the
              rooms where decisions are made.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              If war starts looking like a highlight reel, the danger is not only what
              is being shown — but what may be psychologically pushed to the edges of
              the frame.
            </blockquote>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              A montage of victory is not the same thing as a full picture of war
            </h2>

            <p>
              Military briefings have to simplify chaos. No president can absorb every
              strike, every movement, every failed intercept, every unresolved threat,
              every contradictory claim, every regional signal.
            </p>

            <p>
              But the way information is simplified matters.
            </p>

            <p>
              A briefing built around impact footage and successful strikes naturally
              emphasizes one side of the story: visible destruction inflicted on the
              enemy.
            </p>

            <p>
              That can create an emotional and cognitive rhythm of success — blow after
              blow, target after target, explosion after explosion — even while the
              larger strategic reality remains contested.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Is this what highlight-reel warfare looks like?
            </h2>

            <p>
              The public video below is not presented as Trump’s actual briefing
              package.
            </p>

            <p>
              It is included for a narrower reason: to illustrate the kind of strike-
              heavy visual language now fueling concern around the reported montage
              briefings.
            </p>

            <p className="font-semibold text-zinc-900">
              If the war is being framed through footage that feels like this, is it
              any surprise people are asking whether perception is being shaped by a
              visual logic of dominance?
            </p>

            <VideoEmbed
              title="Illustrative strike-heavy war footage"
              embedUrl="https://www.youtube.com/embed/9axrBdB-fz0"
            />

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              The contradiction people are reacting to
            </h2>

            <p>
              The concern is not happening in a vacuum.
            </p>

            <p>
              It is happening against a backdrop of increasingly visible tension
              between victory messaging and continued instability.
            </p>

            <p>
              If Iran is portrayed as crushed, neutralized, or decisively broken, then
              people naturally ask why the broader region still appears unstable, why
              maritime risk still matters, why strategic chokepoints like the Strait of
              Hormuz remain central, and why new incidents and claims continue to
              surface after declarations of progress.
            </p>

            <p>
              That is the contradiction.
            </p>

            <p>
              Not necessarily that one side is lying in every detail — but that war is
              being consumed through a cleaner visual story than the real environment
              seems to justify.
            </p>

            <SectionImage
              src="/global-control-room.jpg"
              alt="War room screens and strategic monitoring"
              caption="The more war is compressed into digestible visual success, the more urgent the question becomes: what realities remain outside the montage?"
            />

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Why this worries people
            </h2>

            <p>
              Because visual narratives shape perception faster than dense briefing
              books ever could.
            </p>

            <p>
              A montage of targets exploding does not just communicate information. It
              creates feeling.
            </p>

            <p>
              Momentum. Control. Precision. Dominance.
            </p>

            <p>
              That feeling can matter politically. It can matter psychologically. And
              in wartime, it can matter strategically.
            </p>

            <p>
              If leadership begins to experience conflict primarily through curated
              moments of visible success, the risk is not simply incomplete
              information.
            </p>

            <p className="font-semibold text-zinc-900">
              The risk is overconfidence.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Trump, media anger, and the battle over the story
            </h2>

            <p>
              The reported briefings also help explain a second layer of this story:
              frustration with media coverage.
            </p>

            <p>
              If Donald Trump is being shown a steady stream of successful U.S.
              strikes, but public reporting continues to emphasize uncertainty,
              setbacks, escalation risk, and unresolved regional instability, then the
              conflict begins to exist in two different forms at once.
            </p>

            <p>
              One is the war as visually experienced inside the briefing cycle.
            </p>

            <p>
              The other is the war as messily reported in public.
            </p>

            <p>
              That gap can intensify anger at the press and deepen the drive to
              control narrative, not just operations.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              Once a war becomes a battle over perception, the footage itself becomes
              part of the battlefield.
            </blockquote>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Markets can react faster than war can end
            </h2>

            <p>
              This matters beyond politics.
            </p>

            <p>
              Markets move on narrative signals. Oil, shipping risk, equities, and
              defense names can all react within minutes to the perception that the
              war is going well, winding down, or moving under control.
            </p>

            <p>
              But wars do not end because a montage looks decisive.
            </p>

            <p>
              Chokepoints remain chokepoints. Adversaries adapt. Regional leverage can
              survive visible strikes. The operational environment can remain unstable
              long after the images suggest dominance.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Closing
            </h2>

            <p>
              The deepest concern here is not that presidents receive summaries.
              They always have.
            </p>

            <p>
              It is that in the modern information environment, summaries are becoming
              increasingly cinematic.
            </p>

            <p>
              And cinema has a way of making chaos look linear, making violence look
              controlled, and making unresolved war feel closer to victory than it may
              actually be.
            </p>

            <p className="text-lg font-semibold text-zinc-900">
              If the war is being experienced through a montage of explosions, then the
              question is no longer only what was hit. The real question is what kind
              of reality that format trains people to see.
            </p>

            <hr className="my-10 border-zinc-200" />

            <section>
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Sources & references
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {sources.map((source) => (
                  <SourceCard
                    key={source.href}
                    title={source.title}
                    href={source.href}
                    outlet={source.outlet}
                  />
                ))}
              </div>

              <p className="mt-5 text-sm text-zinc-600">
                This report is based on public reporting about Trump’s strike montage
                briefings and uses an embedded public video only as illustrative visual
                context, not as proof of the contents of any classified briefing.
              </p>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Key signals
              </div>
              <ul className="mt-3 space-y-3 text-sm text-zinc-700">
                <li>
                  <strong>Perception:</strong> briefing format can shape how conflict
                  feels, not just what is known
                </li>
                <li>
                  <strong>Narrative gap:</strong> montage-style success can coexist
                  with strategic instability
                </li>
                <li>
                  <strong>Psychology:</strong> repeated visual victory can reinforce
                  momentum and control
                </li>
                <li>
                  <strong>Risk:</strong> cinematic summaries may encourage
                  overconfidence
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Core question
              </div>
              <p className="mt-3 text-sm text-zinc-700">
                If war is increasingly framed through rapid-cut images of successful
                strikes, how much of the strategic picture is left outside the edit?
              </p>
            </div>
          </aside>
        </div>

        <footer className="mt-14 border-t border-zinc-200 pt-8">
          <div className="mt-8 border-t border-zinc-200 pt-6">
            <div className="mb-3 text-sm font-semibold text-zinc-900">
              Share this report
            </div>

            <ShareButton
              shareUrl="https://libertysoldiers.com/news/highlight-reel-warfare-trump-briefing-concerns"
              title="Highlight-Reel Warfare: Concerns Grow Over Trump’s Strike Montage Briefings"
              summary="If war is increasingly experienced as a montage of successful explosions, what does that do to perception, escalation risk, and the public narrative?"
            />
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            External source links are included for verification and situational
            awareness. They are not endorsements.
          </p>
        </footer>
      </article>
    </main>
  );
}
