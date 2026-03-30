// app/news/elite-dissent-kent-resignation/page.tsx

import ShareButton from "../ShareButton";

export const metadata = {
  title:
    "Elite Dissent: Why Did Joseph Kent Resign During an Active War? | Liberty Soldiers",
  description:
    "A wartime resignation from the head of the National Counterterrorism Center is not normal Washington churn. It raises serious questions about threat assessments, internal dissent, and the real logic driving the Iran war.",
  openGraph: {
    title:
      "Elite Dissent: Why Did Joseph Kent Resign During an Active War?",
    description:
      "When the head of U.S. counterterrorism resigns in the middle of a war, the signal is bigger than one man. It points to pressure, fracture, and a battle over the story behind escalation.",
    url: "https://libertysoldiers.com/news/elite-dissent-kent-resignation",
    images: [
      {
        url: "https://libertysoldiers.com/hero-intelligence-resignation.jpg",
        width: 1200,
        height: 630,
        alt: "Joseph Kent resignation analysis cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Elite Dissent: Why Did Joseph Kent Resign During an Active War?",
    description:
      "A rare wartime resignation by the head of U.S. counterterrorism raises deeper questions about intelligence, escalation, and internal fracture.",
    images: ["https://libertysoldiers.com/hero-intelligence-resignation.jpg"],
  },
};

const sources = [
  {
    title:
      "Reuters: Top US security official quits, says Iran did not pose immediate threat",
    href: "https://www.reuters.com/world/middle-east/us-national-counterterrorism-center-director-resigns-over-war-iran-2026-03-17/",
    outlet: "Reuters",
  },
  {
    title:
      "AP: FBI investigating whether departed counterterrorism official leaked classified info, AP source says",
    href: "https://apnews.com/article/fbi-counterterrorism-classified-documents-de5efb8bc0bdb59b45c247b6251ab6f6",
    outlet: "Associated Press",
  },
  {
    title:
      "Snopes: Resignation letter from U.S. counterterrorism head Joe Kent over Iran war is authentic",
    href: "https://www.snopes.com/fact-check/joe-kent-resignation-letter-iran/",
    outlet: "Snopes",
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
            title="Elite Dissent: Why Did Joseph Kent Resign During an Active War?"
            summary="When the head of U.S. counterterrorism quits in the middle of a war, the signal is bigger than one resignation."
          />
        </div>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Strategic Signal Report
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Elite Dissent: Why Did Joseph Kent Resign During an Active War?
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            Washington is full of turnover. But the director of the National
            Counterterrorism Center resigning in the middle of a war is not
            routine churn. It is a signal — and a hard one to ignore.
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
          caption="The most revealing fractures in wartime do not always appear on the battlefield. Sometimes they appear inside the institutions running the war."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6 leading-relaxed text-zinc-800">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                At a glance
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>
                  • Joe Kent, head of the National Counterterrorism Center,
                  resigned over the Iran war.
                </li>
                <li>
                  • Reuters reported he was the first senior Trump official to
                  resign over the conflict.
                </li>
                <li>
                  • Kent’s public letter said he could not support the war and
                  said Iran posed no imminent threat.
                </li>
              </ul>
            </div>

            <p className="text-lg font-semibold text-zinc-900">
              This is not a random staffing story.
            </p>

            <p>
              The man running America’s top counterterrorism center did not just
              leave quietly. He left in the middle of an active war and attached
              his name to a public moral and strategic rejection of the conflict.
            </p>

            <p>
              That matters because intelligence institutions are built to project
              discipline. Internal arguments happen behind closed doors.
              Public rupture is different. Public rupture means the disagreement
              was serious enough that staying inside the machine became harder
              than walking out of it.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Kent did not leave ambiguously
            </h2>

            <p>
              He did not issue a sterile career statement. He did not hide behind
              family reasons. He did not offer the usual Washington language
              about “next steps.”
            </p>

            <p>
              He made the break explicit.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              “I cannot in good conscience support the ongoing war in Iran.”
            </blockquote>

            <p>
              Then he attacked the core justification for the war itself.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              “Iran posed no imminent threat to our nation.”
            </blockquote>

            <p>
              That is not bureaucratic hedging. That is direct collision with the
              official rationale used to sell military action.
            </p>

            <SectionImage
              src="/policy-war-briefing.jpg"
              alt="Strategic policy briefing environment"
              caption="When a senior intelligence official publicly rejects the justification for war, the issue is no longer optics. It becomes a question of what the system really believes."
            />

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Why this hits harder than normal political drama
            </h2>

            <p>
              Washington burns through officials all the time. But the head of the
              National Counterterrorism Center is not just another cable news
              personality or disposable spokesperson. This is a post tied to
              threat analysis, coordination, intelligence flow, and the machinery
              used to define danger for the state.
            </p>

            <p>
              When a figure in that seat says the war lacked an imminent-threat
              basis, the problem is no longer public relations. The problem is
              credibility.
            </p>

            <p>
              If Kent is wrong, then the administration is dealing with a major
              internal revolt from someone who should have known better. If Kent
              is even partly right, then the public may have been asked to accept
              war on a narrative far shakier than advertised.
            </p>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-zinc-700">
                <strong>Signal to watch:</strong> when a national security state
                built on message discipline starts producing public rupture, the
                fracture is usually deeper than the official response admits.
              </p>
            </div>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              The real question is not whether he resigned
            </h2>

            <p>
              The real question is why resigning became necessary.
            </p>

            <p>
              Senior officials usually stay inside and fight for influence. That
              is how power works. You do not give up proximity to intelligence,
              access, leverage, and institutional position unless something has
              crossed a line.
            </p>

            <p>
              Kent’s letter suggests that line was not merely operational. It was
              moral, strategic, and foundational. He was not saying the war was
              being run poorly. He was saying it should not have been launched on
              the stated basis in the first place.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              This is how consensus cracks
            </h2>

            <p>
              Wars are sustained by narrative cohesion. The public is told the
              threat is urgent. Allies are told the cause is necessary. Markets
              are told the state is in control. Bureaucracies are told to fall in
              line.
            </p>

            <p>
              But cracks rarely begin at the edge. They begin inside the command
              structure — when people close enough to the intelligence picture
              stop accepting the sales pitch.
            </p>

            <p>
              That does not automatically prove the whole case for war was false.
              It does mean the claim of clean internal consensus is harder to
              maintain.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              A wartime resignation from the head of counterterrorism is not
              noise. It is what noise sounds like when the system starts arguing
              with itself in public.
            </blockquote>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              The White House response only sharpens the divide
            </h2>

            <p>
              The administration rejected Kent’s claims and insisted President
              Trump had compelling evidence that Iran posed an imminent threat.
              That is now the central split: one side says the threat justified
              immediate war; the other says the threat did not exist in the form
              presented.
            </p>

            <p>
              That is not a minor dispute over tone. That is a dispute over the
              threshold for war.
            </p>

            <p>
              And once that threshold is publicly challenged by a senior official,
              everything downstream gets harder: public trust, alliance unity,
              congressional oversight, and the administration’s ability to frame
              escalation as obvious and uncontested.
            </p>

            <SectionImage
              src="/global-control-room.jpg"
              alt="War room control screens and map displays"
              caption="Modern conflict is fought across battlefields, intelligence systems, media narratives, and public psychology. A resignation at this level cuts across all of them."
            />

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              What Liberty Soldiers is watching now
            </h2>

            <p>
              Watch for whether more insiders start speaking. Watch whether the
              administration tightens message discipline. Watch whether media
              treatment shifts from “isolated resignation” to “emerging internal
              dissent.” And watch whether the language around imminent threat
              starts getting more evasive, more repetitive, or more defensive.
            </p>

            <p>
              Because once a war has to be defended not only against the enemy
              outside but against high-level doubt inside, the story has already
              changed.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Closing
            </h2>

            <p>
              Kent’s resignation does not end the war. It does something more
              dangerous to the narrative around it.
            </p>

            <p>
              It forces a question the system does not want asked: what if the
              people closest to the intelligence picture are not united behind
              the justification that launched this conflict?
            </p>

            <p className="text-lg font-semibold text-zinc-900">
              When the head of U.S. counterterrorism resigns and says he cannot
              support the war, that is not routine turnover. That is a warning
              flare from inside the machine.
            </p>

            <hr className="my-10 border-zinc-200" />

            <section>
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Sources & reporting
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
                This report is based on Reuters and AP reporting on Kent’s
                resignation, plus Snopes’ authentication of the public letter.
                Analysis and framing are Liberty Soldiers’.
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
                  <strong>Credibility:</strong> competing claims over whether an
                  imminent threat existed
                </li>
                <li>
                  <strong>Consensus:</strong> visible fracture inside national
                  security leadership
                </li>
                <li>
                  <strong>Narrative:</strong> a war justification challenged by a
                  senior insider
                </li>
                <li>
                  <strong>Escalation:</strong> internal dissent can tighten, not
                  loosen, message discipline
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Core question
              </div>
              <p className="mt-3 text-sm text-zinc-700">
                If the public case for war was as clear as officials say, why did
                the nation’s top counterterrorism official decide he could no
                longer stay inside the system and defend it?
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
              shareUrl="https://libertysoldiers.com/news/elite-dissent-kent-resignation"
              title="Elite Dissent: Why Did Joseph Kent Resign During an Active War?"
              summary="A wartime resignation from the head of U.S. counterterrorism raises serious questions about intelligence, escalation, and the story behind the Iran war."
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
