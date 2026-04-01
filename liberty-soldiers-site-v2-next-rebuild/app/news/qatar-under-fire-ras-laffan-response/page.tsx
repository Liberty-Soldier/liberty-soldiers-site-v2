// app/news/qatar-under-fire-ras-laffan-response/page.tsx

import ShareButton from "../ShareButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title:
    "Qatar Under Fire: Ras Laffan, Retaliation, and Doha’s Public Break | Liberty Soldiers",
  description:
    "Qatar’s Ras Laffan energy hub has been pulled directly into the widening Iran conflict, forcing Doha into a sharper public response as energy markets absorb the shock.",
  openGraph: {
    title:
      "Qatar Under Fire: Ras Laffan, Retaliation, and Doha’s Public Break",
    description:
      "The strike on Ras Laffan changed the war’s geometry. Qatar is no longer adjacent to the crisis. It is inside it.",
    url: "https://libertysoldiers.com/news/qatar-under-fire-ras-laffan-response",
    images: [
      {
        url: "https://libertysoldiers.com/hero-qatar-ras-laffan.jpg",
        width: 1200,
        height: 630,
        alt: "Qatar Ras Laffan energy escalation cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Qatar Under Fire: Ras Laffan, Retaliation, and Doha’s Public Break",
    description:
      "The strike on Ras Laffan signals a dangerous expansion of the war into Gulf energy infrastructure and public diplomacy.",
    images: ["https://libertysoldiers.com/hero-qatar-ras-laffan.jpg"],
  },
};

const sources = [
  {
    title:
      "Reuters: Tehran warns Gulf energy sites to evacuate after Iranian gas facilities hit",
    href: "https://www.reuters.com/world/middle-east/tehran-warns-gulf-energy-installations-after-oil-industry-facilities-hit-2026-03-18/",
    outlet: "Reuters",
  },
  {
    title:
      "AP: Iran intensifies attacks on oil and gas facilities in the Gulf after Israeli strike on key gas field",
    href: "https://apnews.com/article/52e94398f2432b3aba9b02b51fbe5000",
    outlet: "Associated Press",
  },
  {
    title:
      "Reuters: Trump says Israel attacked Iran gas field without U.S. and Qatari involvement, warns against attacks on Qatar",
    href: "https://www.reuters.com/world/middle-east/trump-says-israel-attacked-iran-gas-field-without-us-qatari-involvement-warns-2026-03-19/",
    outlet: "Reuters",
  },
];

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

export default function QatarUnderFirePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← Back to News
          </a>

          <ShareButton
            shareUrl="https://libertysoldiers.com/news/qatar-under-fire-ras-laffan-response"
            title="Qatar Under Fire: Ras Laffan, Retaliation, and Doha’s Public Break"
            summary="The strike on Ras Laffan changed the war’s geometry. Qatar is no longer adjacent to the crisis. It is inside it."
          />
        </div>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Field Report
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Qatar Under Fire: Ras Laffan, Retaliation, and Doha’s Public Break
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            The strike on Qatar’s Ras Laffan complex did more than damage energy
            infrastructure. It pulled one of the world’s most important LNG
            hubs directly into the war and forced Doha into a sharper public
            posture.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500">
            <span>Liberty Soldiers</span>
            <span>•</span>
            <span>Field Report</span>
            <span>•</span>
            <span>Estimated read: 5–6 min</span>
          </div>
        </header>

        <figure className="my-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <img
            src="/hero-qatar-ras-laffan.jpg"
            alt="Qatar Ras Laffan energy escalation"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
          <figcaption className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
            Ras Laffan is not just another industrial site. It is one of the
            world’s most critical LNG nodes, which is why its targeting changes
            the stakes far beyond Qatar.
          </figcaption>
        </figure>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6 leading-relaxed text-zinc-800">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                At a glance
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>
                  • Ras Laffan was hit after the South Pars escalation widened
                  into direct attacks on Gulf energy infrastructure.
                </li>
                <li>
                  • Qatar publicly condemned the attack and moved into a more
                  visible diplomatic posture.
                </li>
                <li>
                  • The market impact is bigger than one facility: this is a
                  warning shot at global LNG stability.
                </li>
              </ul>
            </div>

            <p className="text-lg font-medium text-zinc-900">
              Qatar has spent years positioning itself as indispensable,
              connected, and difficult to isolate. That shield just got tested.
            </p>

            <p>
              The strike on Ras Laffan is not important only because of the
              damage. It matters because of what it says about the war’s new
              geography. A conflict that was already expanding now threatens one
              of the most strategically valuable energy hubs on the planet.
            </p>

            <p>
              That changes the political pressure on Doha. A state that often
              works through calibrated messaging and careful mediation is now
              dealing with something cruder: direct exposure.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Doha’s response matters
            </h2>

            <p>
              Qatar’s public response is not just diplomatic theater. It is a
              signal to markets, allies, and adversaries that Doha will not
              allow itself to be treated as collateral geography in a regional
              war.
            </p>

            <p>
              The more openly Qatar condemns attacks on shared or adjacent
              energy systems, the more it is forced to define where neutrality
              ends and strategic self-protection begins.
            </p>

            <p>
              That makes this more than an energy story. It is a positioning
              story. It is about whether Gulf states can remain formally outside
              the center of the war while their infrastructure is dragged into
              it anyway.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              When a war starts hitting the infrastructure that powers Asia and
              stabilizes Europe, it is no longer a contained regional conflict.
            </blockquote>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Ras Laffan is a systems target
            </h2>

            <p>
              Ras Laffan is not symbolically important. It is mechanically
              important. It sits inside the real-world architecture of energy
              flow, shipping schedules, contracts, and pricing assumptions.
            </p>

            <p>
              That is why this strike punches above its immediate blast radius.
              Markets do not just react to damage. They react to the collapse of
              assumptions. Once traders, insurers, and governments conclude that
              flagship Gulf energy nodes are actively targetable, the cost of
              normal rises everywhere.
            </p>

            <p>
              This is where geopolitics becomes daily life: fuel, freight,
              inflation, insurance, and emergency planning.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Why this article matters now
            </h2>

            <p>
              Qatar’s response is a window into the next phase of the war. If
              Doha hardens, other Gulf capitals will watch closely. If the
              attacks continue, every promise of “managed escalation” becomes
              harder to believe.
            </p>

            <p className="text-lg font-semibold text-zinc-900">
              The strike on Ras Laffan did not just damage a facility. It
              damaged the illusion that the Gulf’s most important energy
              platforms could stay outside the line of fire.
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
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Key signals
              </div>
              <ul className="mt-3 space-y-3 text-sm text-zinc-700">
                <li>
                  <strong>Energy:</strong> flagship LNG infrastructure is now in
                  play
                </li>
                <li>
                  <strong>Diplomacy:</strong> Doha is being forced into a more
                  visible public line
                </li>
                <li>
                  <strong>Markets:</strong> damage matters, but shattered
                  assumptions matter more
                </li>
                <li>
                  <strong>War geometry:</strong> Gulf “adjacent” states are
                  becoming direct stakeholders
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
