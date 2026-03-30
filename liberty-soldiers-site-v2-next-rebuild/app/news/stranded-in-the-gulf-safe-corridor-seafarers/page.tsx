// app/news/stranded-in-the-gulf-safe-corridor-seafarers/page.tsx

import ShareButton from "../ShareButton";

export const metadata = {
  title:
    "Stranded in the Gulf: 20,000 Seafarers, a Safe Corridor Push, and the New Hormuz Risk | Liberty Soldiers",
  description:
    "A proposal for a safe maritime corridor underscores how badly Gulf shipping has deteriorated as thousands of seafarers remain trapped and the Strait of Hormuz becomes a zone of compounded risk.",
  openGraph: {
    title:
      "Stranded in the Gulf: 20,000 Seafarers, a Safe Corridor Push, and the New Hormuz Risk",
    description:
      "The Gulf shipping crisis is no longer abstract. It now has a trapped workforce, a humanitarian dimension, and a growing strategic price tag.",
    url: "https://libertysoldiers.com/news/stranded-in-the-gulf-safe-corridor-seafarers",
    images: [
      {
        url: "https://libertysoldiers.com/hero-gulf-safe-corridor.jpg",
        width: 1200,
        height: 630,
        alt: "Gulf seafarers safe corridor cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Stranded in the Gulf: 20,000 Seafarers, a Safe Corridor Push, and the New Hormuz Risk",
    description:
      "This is what escalation looks like when it leaves war rooms and traps real crews in commercial shipping lanes.",
    images: ["https://libertysoldiers.com/hero-gulf-safe-corridor.jpg"],
  },
};

const sources = [
  {
    title:
      "Reuters: Countries propose safe corridor to free 20,000 seafarers stranded in Gulf",
    href: "https://www.reuters.com/world/americas/countries-propose-safe-corridor-free-20000-seafarers-stranded-gulf-2026-03-18/",
    outlet: "Reuters",
  },
  {
    title:
      "Reuters: Iran considers levying transit fees on ships in Hormuz Strait, lawmaker says",
    href: "https://www.reuters.com/world/middle-east/iran-considers-levying-transit-fees-ships-hormuz-strait-lawmaker-says-2026-03-19/",
    outlet: "Reuters",
  },
  {
    title:
      "AP: The Strait of Hormuz has been disrupted before. A look at past moments that threatened oil flows",
    href: "https://apnews.com/article/2a8abe58648abd2d9c4785b4130bee0c",
    outlet: "Associated Press",
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

export default function GulfSafeCorridorPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← Back to News
          </a>

          <ShareButton
            shareUrl="https://libertysoldiers.com/news/stranded-in-the-gulf-safe-corridor-seafarers"
            title="Stranded in the Gulf: 20,000 Seafarers, a Safe Corridor Push, and the New Hormuz Risk"
            summary="This is what escalation looks like when it leaves war rooms and traps real crews in commercial shipping lanes."
          />
        </div>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Field Report
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Stranded in the Gulf: 20,000 Seafarers, a Safe Corridor Push, and
            the New Hormuz Risk
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            The Gulf shipping crisis is no longer just an energy headline. It
            now has trapped crews, stalled vessels, and a live debate over how
            commerce moves through a waterway that no longer feels commercially
            normal.
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
            src="/hero-gulf-safe-corridor.jpg"
            alt="Tankers and crews stranded in Gulf shipping crisis"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
          <figcaption className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
            The most revealing measure of a maritime crisis is not rhetoric. It
            is whether commercial crews can safely leave.
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
                  • Around 20,000 seafarers are stranded in the Gulf as vessels
                  halt movement.
                </li>
                <li>
                  • Countries have proposed a safe corridor through the IMO.
                </li>
                <li>
                  • Tehran is also floating Hormuz transit fees, adding economic
                  coercion to physical disruption.
                </li>
              </ul>
            </div>

            <p className="text-lg font-medium text-zinc-900">
              This is what maritime breakdown looks like before politicians call
              it breakdown.
            </p>

            <p>
              A shipping lane does not have to be formally closed to stop
              functioning like a normal artery of trade. It only has to become
              dangerous enough, uncertain enough, and expensive enough that
              captains stop moving, insurers stop trusting, and crews stop
              knowing if they can leave.
            </p>

            <p>
              That is the real significance of the safe corridor push. It is an
              admission that the Gulf is no longer operating inside the usual
              commercial rules.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              The human layer is now impossible to ignore
            </h2>

            <p>
              Big stories about Hormuz usually center on oil, LNG, inflation, or
              naval power. But those abstractions sit on top of a labor force
              that actually keeps the system moving.
            </p>

            <p>
              Once tens of thousands of seafarers are effectively stranded, the
              crisis stops being theoretical. It becomes measurable in fatigue,
              fear, operational paralysis, and rising pressure on governments to
              create special rules just to preserve movement.
            </p>

            <p>
              This is where wartime disruption becomes humanitarian logistics.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              If you need an international safe corridor to let commercial crews
              exit a waterway, the waterway is already broken in practice.
            </blockquote>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              The second layer of pressure: tolls, taxes, and controlled passage
            </h2>

            <p>
              Physical disruption is one side of the Hormuz problem. Regulatory
              leverage is the other. Iran’s consideration of transit fees points
              to a broader pattern: if direct closure is costly, selective
              control and punitive pricing can still reshape the corridor.
            </p>

            <p>
              That matters because markets do not only price missiles. They also
              price policy uncertainty, administrative coercion, and the risk
              that “temporary” extraordinary measures become the new normal.
            </p>

            <p>
              In that sense, the corridor debate is not just about security. It
              is about who sets the terms of movement in one of the world’s most
              strategic waterways.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Why this article matters now
            </h2>

            <p>
              The stranded seafarers story is one of the clearest signals that
              the crisis has moved beyond headline volatility into sustained
              system stress. When the workforce moving energy and goods gets
              trapped inside the disruption, the cost of escalation becomes
              harder to conceal.
            </p>

            <p className="text-lg font-semibold text-zinc-900">
              This is no longer just a shipping warning. It is a demonstration
              of how fast a strategic chokepoint can become a managed emergency.
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
                  <strong>Shipping:</strong> normal commercial movement is
                  breaking down
                </li>
                <li>
                  <strong>Human cost:</strong> trapped crews reveal the depth of
                  the disruption
                </li>
                <li>
                  <strong>Control:</strong> security risk is blending with
                  economic leverage
                </li>
                <li>
                  <strong>Escalation:</strong> emergency fixes can become
                  long-term operating conditions
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
