import ShareButton from "../ShareButton";

export const metadata = {
  title:
    "Lockdown 2.0: Energy Crisis Policy Signals a Return to Behavior Control Governance | Liberty Soldiers",
  description:
    "What is being pitched as temporary energy efficiency increasingly resembles a broader control model: managed movement, rationed consumption, and crisis-era governance logic repackaged for a new emergency.",
  openGraph: {
    title:
      "Lockdown 2.0: Energy Crisis Policy Signals a Return to Behavior Control Governance",
    description:
      "From work-from-home mandates to mobility limits and rationed consumption, energy crisis policy is reviving a familiar governance architecture.",
    url: "https://libertysoldiers.com/news/lockdown-2-0-energy-rationing",
    images: [
      {
        url: "https://libertysoldiers.com/hero-lockdown-2-0.jpg",
        width: 1200,
        height: 630,
        alt: "Lockdown 2.0 energy crisis analysis cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Lockdown 2.0: Energy Crisis Policy Signals a Return to Behavior Control Governance",
    description:
      "Energy crisis policy is reviving a familiar governance architecture: managed movement, rationed consumption, and behavioral control.",
    images: ["https://libertysoldiers.com/hero-lockdown-2-0.jpg"],
  },
};

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

export default function LockdownTwoPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← Back to News
          </a>

          <ShareButton
            shareUrl="https://libertysoldiers.com/news/lockdown-2-0-energy-rationing"
            title="Lockdown 2.0: Energy Crisis Policy Signals a Return to Behavior Control Governance"
            summary="What is being pitched as temporary energy efficiency increasingly resembles a broader control model: managed movement, rationed consumption, and crisis-era governance logic repackaged for a new emergency."
          />
        </div>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Policy Signal Analysis
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Lockdown 2.0: Energy Crisis Policy Signals a Return to Behavior
            Control Governance
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            The next phase of crisis management may not arrive through public
            health. It may arrive through fuel shortages, managed mobility, and
            consumption controls framed as technical necessity.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500">
            <span>Liberty Soldiers</span>
            <span>•</span>
            <span>Power &amp; Control</span>
            <span>•</span>
            <span>Estimated read: 7 min</span>
          </div>
        </header>

        <SectionImage
          src="/hero-lockdown-2-0.jpg"
          alt="Energy crisis lockdown style governance concept"
          caption="When crisis management shifts from market response to population management, the signal is no longer just scarcity. It is control."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6 leading-relaxed text-zinc-800">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                At a glance
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>
                  • Energy policy proposals increasingly focus on changing
                  population behavior, not just balancing supply.
                </li>
                <li>
                  • The methods being discussed echo COVID-era lockdown logic:
                  reduced mobility, remote work, rationing, and essential-use
                  definitions.
                </li>
                <li>
                  • The deeper issue is not one proposal in isolation. It is the
                  governing model they form when combined.
                </li>
              </ul>
            </div>

            <p className="text-lg font-semibold text-zinc-900">
              The language of lockdown is returning. Only the justification is
              changing.
            </p>

            <p>
              What is now being pitched as temporary energy efficiency has a
              familiar shape. Work from home where possible. Drive less. Fly
              less. Share vehicles. Accept rationing. Accept inconvenience.
              Accept the idea that ordinary life must be redesigned by experts
              during emergency conditions.
            </p>

            <p>
              On paper, each proposal sounds practical. In sequence, they form a
              recognizable pattern: crisis governance shifting away from market
              response and toward population management.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              The pandemic was not only a health event. It was a governing
              prototype.
            </h2>

            <p>
              COVID proved that governments could pause sectors of economic
              life, redefine which activities were essential, restrict movement,
              narrow public space, and coordinate compliance messaging at a
              national and even global scale.
            </p>

            <p>
              More important than any single policy was the threshold it broke.
              Populations that had never lived under direct movement control
              were introduced to a new political reality: daily life could be
              suspended and reorganized quickly under emergency logic.
            </p>

            <p>
              Once that threshold is crossed, the next crisis no longer needs to
              invent the machinery. It inherits it.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              Lockdown systems are rarely dismantled. They are repurposed.
            </blockquote>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Energy scarcity is becoming the new rationale for behavior control
            </h2>

            <p>
              Modern economies depend on uninterrupted energy flow. When that
              flow is threatened by war, chokepoint disruption, sanctions,
              infrastructure targeting, or industrial transition, governments
              face immediate pressure to stabilize systems fast.
            </p>

            <p>
              That is where rationing enters. But rationing in the modern era is
              not only about preserving supply. It becomes a way of ranking
              human activity. Some uses are treated as essential. Others are
              downgraded as wasteful, indulgent, or socially irresponsible.
            </p>

            <p>
              Fuel allocation becomes behavior allocation. Mobility becomes
              conditional. Consumption becomes moralized.
            </p>

            <SectionImage
              src="/hero-lockdown-2-0.jpg"
              alt="Governance through energy scarcity"
              caption="Scarcity gives governments leverage. But the real power comes when scarcity is translated into behavioral rules."
            />

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              The soft-power mechanism is already familiar
            </h2>

            <p>
              International policy bodies often lack direct enforcement power.
              That does not make them irrelevant. They publish frameworks.
              National governments adopt the language. Media outlets normalize
              the urgency. Platforms repeat expert framing. Domestic
              restrictions then emerge under the cover of technical necessity.
            </p>

            <p>
              This was one of the defining patterns of the pandemic era. It is
              why new energy-control proposals immediately trigger comparison to
              lockdown logic. Governments do not need formal world government to
              synchronize policy direction. They need shared justification and a
              population already conditioned to accept it.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              War is the hidden accelerant behind all of this
            </h2>

            <p>
              The timing is not random. Energy control discussions are
              intensifying as geopolitical escalation threatens the systems that
              power the world: the Strait of Hormuz, shipping lanes, refining
              capacity, fuel distribution, electricity generation, and the
              infrastructure that keeps cities running.
            </p>

            <p>
              Modern war does not stay on the battlefield. It pushes pressure
              into supply chains, logistics, grids, ports, and households. Once
              civilian systems become vulnerable, governments start looking for
              ways to manage not only resources, but people.
            </p>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-zinc-700">
                <strong>Signal to watch:</strong> when officials stop talking
                primarily about production and supply, and start talking more
                about how citizens must live, the crisis is moving from the
                market into the control layer.
              </p>
            </div>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Crisis windows expand consent
            </h2>

            <p>
              Fear compresses public resistance. Urgency narrows debate.
              Complex system failures invite simplified commands: stay home,
              travel less, consume less, trust the plan.
            </p>

            <p>
              During COVID, that logic was tied to infection control. In an
              energy emergency, the same structure can be attached to fuel,
              transport, power use, and carbon-linked behavior targets.
            </p>

            <p>
              Different crisis. Same governing architecture.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Lockdown 2.0 is not about identical conditions. It is about
              identical methods.
            </h2>

            <p>
              The phrase is spreading because people recognize the pattern.
              Managed movement. Managed consumption. Managed inconvenience.
              Emergency authority framed as civic responsibility.
            </p>

            <p>
              Digital systems now make enforcement easier than before. Data
              infrastructure makes monitoring more precise. Social pressure makes
              resistance costlier. What once looked like an extraordinary
              emergency response can evolve into a durable operating model.
            </p>

            <p>
              If energy scarcity deepens, the real question is not whether
              governments can attempt this. They already proved they can. The
              real question is how openly they will say it.
            </p>

            <p className="text-lg font-semibold text-zinc-900">
              The public was told lockdown governance was exceptional. The next
              crisis may reveal it was foundational.
            </p>

            <hr className="my-10 border-zinc-200" />

            <section>
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Liberty Soldiers assessment
              </div>

              <p className="mt-4 text-sm leading-7 text-zinc-700">
                The danger is not one emergency recommendation by itself. The
                danger is a cumulative political architecture in which every new
                crisis becomes an excuse to shrink autonomy, normalize
                inconvenience, and condition populations for a future of managed
                movement and controlled consumption.
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
                  <strong>Mobility:</strong> remote work, travel friction, and
                  transportation limits
                </li>
                <li>
                  <strong>Governance:</strong> emergency behavior rules replacing
                  normal market adjustment
                </li>
                <li>
                  <strong>Psychology:</strong> sacrifice and compliance framed as
                  moral duty
                </li>
                <li>
                  <strong>Systems:</strong> war pressure on energy networks
                  creates cover for deeper control
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Core question
              </div>
              <p className="mt-3 text-sm text-zinc-700">
                When a crisis shifts from how governments secure supply to how
                they govern citizens, is the real emergency scarcity — or
                control?
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
              shareUrl="https://libertysoldiers.com/news/lockdown-2-0-energy-rationing"
              title="Lockdown 2.0: Energy Crisis Policy Signals a Return to Behavior Control Governance"
              summary="Energy crisis policy is reviving a familiar governance architecture: managed movement, rationed consumption, and behavioral control."
            />
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            Liberty Soldiers monitors systemic risk, narrative manipulation, and
            the expansion of crisis-era governance into daily life.
          </p>
        </footer>
      </article>
    </main>
  );
}
