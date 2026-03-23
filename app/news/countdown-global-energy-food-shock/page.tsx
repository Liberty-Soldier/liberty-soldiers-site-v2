import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.libertysoldiers.com";

const ARTICLE_SLUG = "countdown-global-energy-food-shock";

const ARTICLE_URL = `${SITE_URL}/news/${ARTICLE_SLUG}`;

const ARTICLE_TITLE =
  "Countdown to a Global Supply Shock: Energy War Now, Food Crisis Next?";

const ARTICLE_SUMMARY =
  "Warnings from the IEA, fertilizer market stress, and chokepoint disruption in the Gulf point to a delayed food-price shock that may hit months after battlefield headlines fade.";

const OG_IMAGE = `${SITE_URL}/hero-energy-food-shock.jpg`;

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description: ARTICLE_SUMMARY,
  alternates: {
    canonical: ARTICLE_URL,
  },
  openGraph: {
    type: "article",
    url: ARTICLE_URL,
    title: ARTICLE_TITLE,
    description: ARTICLE_SUMMARY,
    siteName: "Liberty Soldiers",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: ARTICLE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE_TITLE,
    description: ARTICLE_SUMMARY,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <div className="mb-3 text-sm uppercase tracking-wide text-neutral-500">
          Markets & Finance · 2026-03-23
        </div>

        <h1 className="text-4xl font-bold leading-tight">
          {ARTICLE_TITLE}
        </h1>

        <p className="mt-4 text-lg text-neutral-700">
          {ARTICLE_SUMMARY}
        </p>

        <div className="mt-4 text-sm text-neutral-500">
          By Liberty Soldiers · 8 min read
        </div>
      </header>

      <div className="prose prose-neutral max-w-none">

        <p>
          Military escalation in the Middle East is being framed as an oil
          story. But energy officials and agricultural economists warn that the
          real economic shock may arrive later — through fertilizer markets and
          global food supply chains.
        </p>

        <p>
          International Energy Agency chief Fatih Birol has warned that Gulf
          energy flows may not return to full capacity for six months or longer.
          Nearly one-fifth of global oil consumption moves through the Strait of
          Hormuz, along with critical petrochemical and industrial inputs that
          modern agriculture depends on.
        </p>

        <p>
          Fertilizer production is heavily tied to energy markets. Natural gas
          feeds ammonia production, sulfur supports phosphate fertilizers, and
          diesel powers planting, harvesting, and transport logistics. When
          energy supply is disrupted, agricultural output risk rises.
        </p>

        <p>
          Analysts warn the timeline may follow a delayed pattern. First comes
          fertilizer price volatility and contract stress. Then farmers reduce
          planting or fertilizer use due to cost uncertainty. Months later,
          import-dependent economies begin to feel the retail food-price shock.
        </p>

        <p>
          Historical precedent suggests this risk is not theoretical. Energy
          price spikes preceded major food inflation waves in 2008 and again in
          the early 2020s, contributing to social instability in multiple
          regions.
        </p>

        <p>
          The strategic question is whether these cascading effects were truly
          unforeseen. Conflict scenarios involving Hormuz disruption have been
          modeled by defense planners and energy think tanks for decades.
        </p>

        <p>
          In a world where supply-chain modeling tools are widely accessible,
          some analysts argue that the economic chain reaction was predictable.
          If so, the long-term global supply shock may have been accepted as a
          calculated risk rather than an unexpected consequence.
        </p>

        <p>
          Modern conflict increasingly targets systems rather than territory.
          Energy chokepoints, shipping lanes, and agricultural inputs can shape
          economic stability far beyond the battlefield.
        </p>

        <p>
          Oil may be the immediate headline. Fertilizer market stress may be the
          warning signal. Food inflation could become the lasting consequence.
        </p>

      </div>
    </article>
  );
}
