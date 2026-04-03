export const metadata = {
  title:
    "Oil Shock and the Jones Act: Crisis Policy Moves Amid the Iran Conflict | Liberty Soldiers",
  description:
    "As oil surges during the Iran conflict, U.S. officials are weighing emergency policy tools — including bypassing a century-old shipping law to stabilize fuel markets.",
  openGraph: {
    title:
      "Oil Shock and the Jones Act: Crisis Policy Moves Amid the Iran Conflict",
    description:
      "A Liberty Soldiers field report on rising oil prices, emergency shipping policy options, and the widening economic impact of the Iran conflict.",
    url: "https://libertysoldiers.com/news/jones-act-oil-surge",
    images: ["https://libertysoldiers.com/hero-war-energy-shipping-2.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Oil Shock and the Jones Act: Crisis Policy Moves Amid the Iran Conflict",
    description:
      "Oil volatility, shipping constraints, and crisis-driven policy responses are emerging as key signals beyond the battlefield.",
    images: ["https://libertysoldiers.com/hero-war-energy-shipping-2.jpg"],
  },
};

export default function JonesActOilReportPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
          ← Back to News
        </a>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-widest text-zinc-500">
            Field Report
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Oil Shock and the Jones Act: Crisis Policy Moves Amid the Iran Conflict
          </h1>

          <p className="mt-4 text-zinc-600 italic">
            War signals are now moving through energy markets and domestic policy.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500">
            <span>Liberty Soldiers</span>
            <span>•</span>
            <span>Situational Awareness</span>
            <span>•</span>
            <span>Estimated read: 3–4 min</span>
          </div>
        </header>

        <hr className="my-10 border-zinc-200" />

        <div className="space-y-6 text-zinc-800 leading-relaxed">

          <p className="text-zinc-900">
            The battlefield is not the only place where escalation is unfolding.
          </p>

          <div className="my-10">
            <img
              src="/hero-war-energy-shipping-2.jpg"
              alt="Energy markets and shipping routes under pressure"
              className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm"
              loading="lazy"
            />
          </div>

          <p>
            As tensions tied to the Iran conflict intensify, oil prices have surged sharply —
            triggering growing concern inside Washington about inflation risks, supply
            disruptions, and broader economic fallout. Energy volatility is increasingly
            becoming one of the most immediate global consequences of geopolitical escalation.
          </p>

          <p>
            In response, policymakers are now considering a range of emergency tools to
            stabilize fuel markets. Among the most notable options is a potential waiver of
            the <strong>Jones Act</strong>, a U.S. shipping law that has shaped domestic
            maritime policy for more than a century.
          </p>

          <h2 className="pt-4 text-xl sm:text-2xl font-bold text-zinc-900">
            A crisis test for a 1920 law
          </h2>

          <p>
            Enacted in 1920, the Jones Act requires that goods transported between U.S.
            ports be carried on ships that are built, owned, and operated by Americans.
            The law was originally designed to protect domestic shipbuilding and ensure
            maritime readiness during wartime.
          </p>

          <p>
            Waiving the law, even temporarily, would allow foreign vessels to transport
            fuel from Gulf Coast production hubs to East Coast refineries — a move that
            could increase supply flexibility and potentially ease price pressure.
          </p>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-700">
              <strong>Key signal:</strong> Geopolitical conflict is now influencing
              domestic economic policy decisions once considered politically sensitive.
            </p>
          </div>

          <h2 className="pt-4 text-xl sm:text-2xl font-bold text-zinc-900">
            Beyond oil: systemic ripple effects
          </h2>

          <p>
            Rising energy prices can transmit quickly through the global system — impacting
            shipping costs, food prices, industrial output, and central bank policy paths.
            Markets are highly sensitive to supply risk signals, particularly when conflict
            threatens key transit routes or major producing regions.
          </p>

          <p>
            The discussion around Jones Act flexibility illustrates how crises often push
            governments toward rapid policy adjustments. Measures that once seemed unlikely
            can move into serious consideration when economic stability becomes a priority.
          </p>

          <h2 className="pt-4 text-xl sm:text-2xl font-bold text-zinc-900">
            Situational awareness
          </h2>

          <p>
            While battlefield developments dominate headlines, energy market stress,
            logistical bottlenecks, and regulatory responses are equally important signals.
            These secondary effects frequently shape the long-term trajectory of conflicts
            and their economic consequences.
          </p>

          <p>
            Observers tracking escalation patterns should watch not only military moves,
            but also policy shifts, market volatility, and supply chain adjustments —
            all indicators of how deeply a crisis is beginning to penetrate daily life.
          </p>

          <hr className="my-10 border-zinc-200" />

          <p className="text-zinc-600 text-sm">
            <strong>Liberty Soldiers note:</strong> Major conflicts rarely remain
            confined to the battlefield. Energy markets, trade flows, and emergency
            policy tools often become early indicators of broader systemic change.
          </p>

        </div>

        <footer className="mt-12 border-t border-zinc-200 pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
              ← Back to News Feed
            </a>

            <a href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
              Home
            </a>
          </div>
        </footer>
      </article>
    </main>
  );
}
