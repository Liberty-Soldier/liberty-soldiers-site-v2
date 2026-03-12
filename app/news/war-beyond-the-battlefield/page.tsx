// app/news/war-beyond-the-battlefield/page.tsx

export const metadata = {
  title:
    "War Beyond the Battlefield: Oil Shock, Shipping Risk, and the Expanding Iran Crisis | Liberty Soldiers",
  description:
    "An investigative briefing on how the expanding Iran war is now hitting oil, shipping, inflation expectations, and global policy pressure far beyond the battlefield.",
  openGraph: {
    title:
      "War Beyond the Battlefield: Oil Shock, Shipping Risk, and the Expanding Iran Crisis",
    description:
      "A Liberty Soldiers field report on oil shocks, shipping attacks, geopolitical pressure, and the widening systemic effects of the Iran war.",
    url: "https://libertysoldiers.com/news/war-beyond-the-battlefield",
    images: [
      {
        url: "https://libertysoldiers.com/hero-war-energy-shipping.jpg",
        width: 1200,
        height: 630,
        alt: "War Beyond the Battlefield cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "War Beyond the Battlefield: Oil Shock, Shipping Risk, and the Expanding Iran Crisis",
    description:
      "A Liberty Soldiers field report on oil shocks, shipping attacks, geopolitical pressure, and the widening systemic effects of the Iran war.",
    images: ["https://libertysoldiers.com/hero-war-energy-shipping.jpg"],
  },
};

const sources = [
  {
    title: "AP: Key oil price spikes over $100 as Iranian attacks hit shipping",
    href: "https://apnews.com/article/99a2316e9089b2ffa9eadd104e787591",
    outlet: "Associated Press",
  },
  {
    title: "Reuters: Oil jumps as Iran escalates attacks on Gulf shipping",
    href: "https://www.reuters.com/business/energy/oil-climbs-tankers-are-attacked-iraqi-waters-amid-middle-east-war-2026-03-12/",
    outlet: "Reuters",
  },
  {
    title: "Reuters: Russia calls on Israel and US to end the Iran war",
    href: "https://www.reuters.com/world/middle-east/russia-calls-israel-us-end-iran-war-2026-03-12/",
    outlet: "Reuters",
  },
  {
    title: "Reuters: ASEAN ministers to hold meetings to address Middle East crisis",
    href: "https://www.reuters.com/world/asia-pacific/asean-ministers-hold-meetings-address-middle-east-crisis-2026-03-12/",
    outlet: "Reuters",
  },
  {
    title: "AP: Iran’s attacks on shipping send oil prices up again",
    href: "https://apnews.com/article/iran-israel-us-march-12-2026-oil-prices-90e17dbf7354d1e9428994ab2a036506",
    outlet: "Associated Press",
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

export default function WarBeyondBattlefieldPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
          ← Back to News
        </a>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Field Report
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            War Beyond the Battlefield: Oil Shock, Shipping Risk, and the
            Expanding Iran Crisis
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            What begins as a regional war rarely stays confined to missiles and
            military targets. Once shipping lanes, energy flows, and inflation
            expectations are hit, the battlefield expands into everyday life.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500">
            <span>Liberty Soldiers</span>
            <span>•</span>
            <span>Field Report</span>
            <span>•</span>
            <span>Estimated read: 7–9 min</span>
          </div>
        </header>

        <SectionImage
          src="/hero-war-energy-shipping.jpg"
          alt="Oil tanker and conflict-driven shipping tension"
          caption="Oil, shipping, and geopolitical stress are no longer separate stories. They are converging in real time."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6 leading-relaxed text-zinc-800">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                At a glance
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>
                  • Oil briefly pushed above <strong>$100 a barrel</strong> as
                  attacks on shipping and energy infrastructure intensified.
                </li>
                <li>
                  • The Strait of Hormuz and surrounding Gulf routes are again at
                  the center of global risk.
                </li>
                <li>
                  • Russia is publicly calling for de-escalation while Asian
                  officials weigh inflation, logistics, and trade fallout.
                </li>
              </ul>
            </div>

            <p className="text-lg font-medium text-zinc-900">
              This is no longer just a war story. It is now an energy story, a
              shipping story, an inflation story, and a systems story.
            </p>

            <p>
              The newest phase of the Iran conflict is exposing a reality that
              modern economies try to ignore until they are forced to confront
              it: when a major energy corridor is threatened, the consequences do
              not stay local. They move through tankers, insurance, freight,
              fuel, policy, and public psychology with remarkable speed.
            </p>

            <p>
              In the latest escalation, oil prices briefly moved back above the
              triple-digit threshold as attacks on commercial shipping and Gulf
              energy infrastructure drove fears of wider disruption. That matters
              not because markets panic for a day, but because energy shocks
              spread pressure into almost every other system built on transport,
              cost stability, and confidence.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              The war has expanded into the arteries of commerce
            </h2>

            <p>
              Wars are often described through front lines, airstrikes, and
              casualty counts. But the more decisive signal can be found in the
              arteries that keep modern life moving: sea lanes, ports, tanker
              routes, refinery output, and the pricing of risk. When these start
              taking damage, the meaning of escalation changes.
            </p>

            <p>
              The current pressure around Gulf shipping is precisely why this
              moment deserves closer attention. A conflict does not need to shut
              down every route completely to destabilize expectations. It only
              needs to make key routes feel unsafe enough that markets, insurers,
              carriers, and governments begin recalculating the cost of normal.
            </p>

            <SectionImage
              src="/global-trade-port.jpg"
              alt="Container ship and port under trade stress"
              caption="Trade routes do not need to fully collapse to create disruption. Rising insecurity alone can reset costs, timing, and expectations."
            />

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-zinc-700">
                <strong>Signal to watch:</strong> the battlefield is widening
                when the cost of moving energy becomes as important as the
                fighting itself.
              </p>
            </div>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Why $100 oil matters psychologically as much as economically
            </h2>

            <p>
              Round numbers in markets are never just numbers. They become
              headlines, shorthand, and emotional anchors. Oil pushing back above
              $100 instantly signals disorder to investors, businesses, and the
              public. It recalls earlier periods of inflation pain, transport
              squeeze, and consumer anxiety.
            </p>

            <p>
              Even if prices retreat after the spike, the signal has already been
              sent: this conflict can touch fuel, freight, food, and finance.
              That changes how institutions talk, how policymakers justify
              intervention, and how populations interpret what comes next.
            </p>

            <p>
              In practical terms, higher energy costs do not stay isolated to the
              pump. They leak into airline costs, freight pricing, goods
              movement, industrial margins, and inflation expectations. Once that
              begins, central banks, trade ministries, and political leaders all
              start moving inside a narrower window.
            </p>

            <SectionImage
              src="/oil-price-shock.jpg"
              alt="Oil market price shock graphic"
              caption="Oil crossing psychologically important levels changes more than markets. It changes expectations, messaging, and policy urgency."
            />

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              This is where regional war becomes global policy pressure
            </h2>

            <p>
              Once oil and shipping are under stress, the conversation changes.
              Leaders stop speaking only in military terms. They begin speaking
              in terms of supply security, emergency reserves, inflation
              management, logistics resilience, and diplomatic containment. That
              shift is already visible.
            </p>

            <p>
              Russia has publicly urged the United States and Israel to halt
              military action and move toward negotiations. At the same time,
              officials in Asia are discussing the crisis through the lens of
              price pressure, export exposure, logistics disruption, and jobs.
              Those are signs of a conflict moving beyond war rooms into economic
              management.
            </p>

            <p>
              This is what systemic escalation looks like. The conflict may still
              be geographically concentrated, but the consequences are now being
              priced, debated, and managed across regions that depend on stable
              shipping and energy flows to keep their own economies functioning.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              The moment a war starts forcing non-belligerent states to manage
              fuel, freight, and inflation risk, it has already outgrown the
              battlefield.
            </blockquote>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              The deeper issue is not one day of panic — it is normalization of
              instability
            </h2>

            <p>
              One spike can be dismissed. A pattern cannot. Repeated attacks on
              tankers, repeated warnings about chokepoints, repeated reserve
              releases, repeated emergency messaging — over time, these stop
              feeling exceptional and start becoming the new atmosphere in which
              policy gets made.
            </p>

            <p>
              That matters because societies under rolling stress become easier
              to steer. Emergency logistics measures feel more reasonable.
              Strategic coordination becomes more centralized. Domestic pain gets
              reframed as the price of security. And every new disruption lowers
              resistance to the next “necessary” response.
            </p>

            <SectionImage
              src="/policy-briefing-emergency.jpg"
              alt="Government briefing and policy response atmosphere"
              caption="As economic and energy stress rise, military language often gives way to stabilization language, emergency planning, and coordinated response."
            />

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-700">
                <strong>Recurring pattern:</strong> disruption raises fear, fear
                raises urgency, and urgency lowers resistance to faster
                intervention.
              </p>
            </div>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              What Liberty Soldiers is watching now
            </h2>

            <p>
              The immediate question is not just whether fighting intensifies. It
              is whether shipping insecurity, energy volatility, and diplomatic
              pressure keep converging at the same time. If they do, this story
              stops being a temporary war update and becomes an open-ended
              systems event.
            </p>

            <p>
              Watch the oil price, yes. But also watch tanker security, insurance
              costs, reserve releases, freight stress, official language around
              stabilization, and the speed at which governments begin framing
              extraordinary measures as unavoidable.
            </p>

            <p>
              Because when wars start rewriting the terms of transport, trade,
              and public expectation, they are no longer operating at the edge of
              the system. They are operating inside it.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Closing
            </h2>

            <p>
              The most important development today is not simply that bombs are
              falling or that threats are escalating. It is that the conflict is
              now visibly transmitting through the channels that shape everyday
              life far from the strike zone.
            </p>

            <p>
              Oil above $100 is not just a market headline. Shipping risk is not
              just a maritime concern. These are indicators that the war is
              broadening into a larger contest over energy flow, economic
              resilience, and public tolerance for instability.
            </p>

            <p className="text-lg font-semibold text-zinc-900">
              Once the arteries of commerce become part of the conflict, the war
              has already moved beyond the battlefield.
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
                This report is based on same-day situational reporting from AP
                and Reuters and is presented as analysis of developing events,
                not as a claim of final or complete information.
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
                  <strong>Energy:</strong> crude volatility, reserve releases,
                  refinery or terminal damage
                </li>
                <li>
                  <strong>Shipping:</strong> tanker attacks, route diversions,
                  insurance costs, escort discussions
                </li>
                <li>
                  <strong>Policy:</strong> emergency language, stabilization
                  tools, diplomatic pressure
                </li>
                <li>
                  <strong>Economy:</strong> freight costs, inflation warnings,
                  market stress, supply chain ripple effects
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <footer className="mt-14 border-t border-zinc-200 pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
              ← Back to News Feed
            </a>

            <a href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
              Home
            </a>
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            External headlines and source links are included for verification and
            situational awareness. They are not endorsements.
          </p>
        </footer>
      </article>
    </main>
  );
}
