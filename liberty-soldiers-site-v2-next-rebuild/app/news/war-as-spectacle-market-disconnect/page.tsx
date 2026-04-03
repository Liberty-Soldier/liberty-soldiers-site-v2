import ShareButton from "../ShareButton";

export const metadata = {
  title:
    "War as Spectacle: While Civilians Die, the World Watches the Markets | Liberty Soldiers",
  description:
    "Missiles are striking cities and civilians are dying in real time — yet much of the global conversation revolves around oil prices, betting odds, and financial impact.",
  openGraph: {
    title:
      "War as Spectacle: While Civilians Die, the World Watches the Markets",
    description:
      "Modern war is increasingly experienced as distant spectacle rather than human tragedy.",
    url: "https://libertysoldiers.com/news/war-as-spectacle-market-disconnect",
    images: [
      {
        url: "https://libertysoldiers.com/hero-war-spectacle.jpg",
        width: 1200,
        height: 630,
        alt: "War spectacle financial markets psychology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "War as Spectacle: While Civilians Die, the World Watches the Markets",
    description:
      "Missiles hit cities. Civilians die. Markets react. A reality check on modern war psychology.",
    images: ["https://libertysoldiers.com/hero-war-spectacle.jpg"],
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center">
          <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← Back to News
          </a>

          <ShareButton
            shareUrl="https://libertysoldiers.com/news/war-as-spectacle-market-disconnect"
            title="War as Spectacle: While Civilians Die, the World Watches the Markets"
            summary="Missiles are striking cities and civilians are dying in real time — yet much of the global conversation revolves around oil prices and betting odds."
          />
        </div>

        <header className="mt-6">
          <div className="text-xs uppercase tracking-widest text-zinc-500">
            Strategic Signal Analysis
          </div>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            War as Spectacle
          </h1>

          <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
            While civilians die in real time, much of the world is watching oil charts,
            betting odds, and market reactions. Modern conflict is increasingly
            experienced as distant spectacle rather than human tragedy.
          </p>

          <div className="mt-4 text-xs text-zinc-500">
            Liberty Soldiers • Analysis • 6 min read
          </div>
        </header>

        <section className="mt-10 space-y-6 text-[17px] leading-relaxed">

          <p>
            A missile strikes an apartment building.
          </p>

          <p>
            Sirens echo through the streets.
          </p>

          <p>
            Smoke rises from shattered homes.
          </p>

          <p>
            The air fills with the acrid smell of smoke, ash, and heated rubble.
          </p>

          <p className="font-semibold text-lg">
            People are dying right now.
          </p>

          <p>
            Yet thousands of miles away, the dominant conversation is not about the dead.
            It is about markets.
          </p>

          <p>
            Oil prices.  
            Inflation expectations.  
            Defense stocks.  
            Shipping insurance.
          </p>

          <p>
            For millions watching from safe countries, war is no longer experienced
            as a human emergency.
          </p>

          <p className="font-semibold">
            It is experienced as a financial event.
          </p>

          <h2 className="pt-6 text-2xl font-bold">
            Death in Real Time — Detachment in Real Time
          </h2>

          <p>
            Previous generations felt war directly.
          </p>

          <p>
            Through blackouts.  
            Through rationing.  
            Through fear that the next attack could be their own city.
          </p>

          <p>
            Today, conflict arrives through screens.
          </p>

          <p>
            Live charts update faster than casualty numbers.
          </p>

          <p>
            Analysts debate escalation scenarios before rescue crews finish pulling
            survivors from rubble.
          </p>

          <h2 className="pt-6 text-2xl font-bold">
            Leaders Speaking to Markets
          </h2>

          <p>
            Modern geopolitical messaging increasingly appears calibrated not only
            for military signaling — but for financial stability.
          </p>

          <p>
            Statements about strikes, negotiations, or delays can move billions of
            dollars within minutes.
          </p>

          <p>
            Iranian officials have even accused U.S. leadership of exaggerating or
            timing threats to calm investors and prevent panic in energy markets.
          </p>

          <p>
            Whether propaganda or reality, the accusation reflects a deeper truth:
          </p>

          <p className="font-semibold">
            War today is fought in the psychology of markets as much as on battlefields.
          </p>

          <h2 className="pt-6 text-2xl font-bold">
            Betting on Conflict
          </h2>

          <p>
            Another disturbing shift is the rise of platforms allowing users to wager
            on geopolitical outcomes.
          </p>

          <p>
            People can place money on ceasefires, escalation timelines, or regime
            survival probabilities.
          </p>

          <p>
            Conflict becomes a probability curve.
          </p>

          <p>
            A speculative trade.
          </p>

          <p className="font-semibold">
            A distant spectacle.
          </p>

          <h2 className="pt-6 text-2xl font-bold">
            The Reality That Cannot Be Charted
          </h2>

          <p>
            No financial model captures the terror of families hiding in basements.
          </p>

          <p>
            No market index reflects hospitals overwhelmed with casualties.
          </p>

          <p>
            No trading algorithm measures the moment someone realizes their home
            is gone.
          </p>

          <p>
            These realities unfold outside economic dashboards.
          </p>

          <p className="font-semibold text-lg">
            They are immediate.  
            They are permanent.  
            And they are happening now.
          </p>

          <h2 className="pt-6 text-2xl font-bold">
            Final Signal
          </h2>

          <p>
            Modern war has not become less violent.
          </p>

          <p>
            It has become easier for distant observers to interpret through numbers
            rather than human experience.
          </p>

          <p>
            Markets will eventually stabilize.
          </p>

          <p className="font-semibold text-lg">
            The dead will not.
          </p>

        </section>

        <footer className="mt-12 border-t pt-6">
          <div className="text-sm font-semibold mb-3">Share this report</div>

          <ShareButton
            shareUrl="https://libertysoldiers.com/news/war-as-spectacle-market-disconnect"
            title="War as Spectacle: While Civilians Die, the World Watches the Markets"
            summary="Missiles hit cities. Civilians die. Markets react. A reality check on modern war psychology."
          />
        </footer>

      </article>
    </main>
  );
}
