// app/news/war-leaves-the-battlefield-global-threat/page.tsx

import ShareButton from "../ShareButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title:
    "Iran’s Global Threat: When War Leaves the Battlefield | Liberty Soldiers",
  description:
    "Iranian officials have warned that enemy personnel may not be safe anywhere in the world, including resorts, tourist centers, and recreational areas — signaling a potential shift toward global asymmetric retaliation.",
  openGraph: {
    title:
      "Iran’s Global Threat: When War Leaves the Battlefield",
    description:
      "A chilling warning from Iranian officials suggests the conflict may no longer be confined to missiles, airstrikes, and naval choke points.",
    url: "https://libertysoldiers.com/news/war-leaves-the-battlefield-global-threat",
    images: [
      {
        url: "https://libertysoldiers.com/hero-global-threat-warning.jpg",
        width: 1200,
        height: 630,
        alt: "Iran global threat escalation cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Iran’s Global Threat: When War Leaves the Battlefield",
    description:
      "A chilling warning from Iranian officials suggests the conflict may no longer be confined to traditional battlefields.",
    images: ["https://libertysoldiers.com/hero-global-threat-warning.jpg"],
  },
};

const sources = [
  {
    title:
      "AP: Iran’s military warns parks, recreational areas and tourist destinations worldwide won’t be safe for enemies",
    href: "https://apnews.com/live/iran-war-israel-trump-03-20-2026",
    outlet: "Associated Press",
  },
  {
    title:
      "AP: Iran threatens world tourism sites and says it is still building missiles nearly 3 weeks into war",
    href: "https://apnews.com/article/28202423a66327455e898deab2fde88c",
    outlet: "Associated Press",
  },
  {
    title:
      "WSJ: Iran vows to hit enemy officials and soldiers, even in amusement parks",
    href: "https://www.wsj.com/livecoverage/iran-us-israel-war-updates-2026/card/iran-vows-to-hit-enemy-officials-and-soldiers-even-in-amusement-parks-hhRwRqpiScZxbeGtWfgF",
    outlet: "The Wall Street Journal",
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

export default function WarLeavesBattlefieldPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href="/news" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← Back to News
          </a>

          <ShareButton
            shareUrl="https://libertysoldiers.com/news/war-leaves-the-battlefield-global-threat"
            title="Iran’s Global Threat: When War Leaves the Battlefield"
            summary="Iranian officials have warned that enemy personnel may not be safe anywhere in the world, including resorts and tourist centers."
          />
        </div>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Escalation Analysis
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Iran’s Global Threat: When War Leaves the Battlefield
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            The war between Iran, Israel, and the United States may no longer be
            confined to missiles, airstrikes, and naval choke points.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500">
            <span>Liberty Soldiers</span>
            <span>•</span>
            <span>Analysis</span>
            <span>•</span>
            <span>Estimated read: 5–6 min</span>
          </div>
        </header>

        <figure className="my-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <img
            src="/hero-global-threat-warning.jpg"
            alt="Global threat escalation scene"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
          <figcaption className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
            Threat language aimed at resorts, tourist centers, and recreational
            areas suggests a dangerous widening of the conflict’s psychological
            and geographic scope.
          </figcaption>
        </figure>

        <div className="space-y-6 leading-relaxed text-zinc-800">
          <p>
            In a chilling escalation, Iranian military officials have publicly
            warned that enemy personnel will not be safe anywhere in the world —
            including resorts, tourist centers, and recreational areas.
          </p>

          <p className="text-lg font-semibold text-zinc-900">
            This statement marks a potential turning point.
          </p>

          <p className="text-lg font-semibold text-zinc-900">
            Not just in the war itself — but in how modern wars are fought.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            A Threat Beyond Front Lines
          </h2>

          <p>
            According to reporting from multiple international outlets, Iran’s
            armed forces declared that “no place in the world will be safe” for
            officials, pilots, or soldiers associated with its adversaries.
          </p>

          <p>
            Separate coverage noted warnings that parks, amusement venues, and
            tourist destinations globally could become targets as retaliation
            for the killing of senior Iranian leaders.
          </p>

          <p>
            These statements suggest something far more significant than
            battlefield escalation.
          </p>

          <p className="text-lg font-semibold text-zinc-900">
            They suggest a shift toward global asymmetric retaliation.
          </p>

          <p>That means:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Targets outside war zones</li>
            <li>Targets outside military bases</li>
            <li>Targets embedded within civilian life</li>
          </ul>

          <p>
            This is not unprecedented in modern conflict — but it is rare to
            hear such warnings stated so openly.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            What This Signals Strategically
          </h2>

          <p>Wars traditionally have geographic boundaries.</p>

          <p>
            This rhetoric suggests those boundaries are dissolving.
          </p>

          <p>
            Analysts have long warned that when a state loses senior leadership
            in targeted strikes, it may seek retaliation through unconventional
            means.
          </p>

          <p>That can include:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Proxy attacks</li>
            <li>Intelligence-driven targeted operations</li>
            <li>Infrastructure sabotage</li>
            <li>Economic disruption</li>
            <li>Psychological warfare</li>
          </ul>

          <p>Recent developments already point in that direction.</p>

          <p>
            Iran has launched strikes on energy infrastructure and regional
            targets while continuing missile production despite sustained air
            campaigns.
          </p>

          <p>
            Meanwhile, attacks linked to the conflict have already caused
            civilian damage in areas far from traditional front lines —
            including explosions and debris impacts in major urban zones.
          </p>

          <p className="text-lg font-semibold text-zinc-900">
            The war is no longer just about territory.
          </p>

          <p className="text-lg font-semibold text-zinc-900">
            It is about reach.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            Soft Targets: The New Strategic Theater
          </h2>

          <p>
            Threatening resorts and tourist centers is not random rhetoric.
          </p>

          <p>These locations represent:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>International visibility</li>
            <li>Civilian vulnerability</li>
            <li>Economic pressure points</li>
            <li>Media amplification</li>
          </ul>

          <p>
            A single high-profile incident in a major global tourism hub could:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Trigger panic in travel markets</li>
            <li>Disrupt financial flows</li>
            <li>Force emergency security measures</li>
            <li>Expand the psychological footprint of the war</li>
          </ul>

          <p>
            In modern conflict, perception can be as powerful as military
            victory.
          </p>

          <p className="text-lg font-semibold text-zinc-900">
            The battlefield is now global awareness.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            Why This Matters Now
          </h2>

          <p>
            This escalation follows coordinated strikes that reportedly killed
            senior Iranian intelligence and military officials — events Tehran
            has framed as justification for retaliation.
          </p>

          <p>
            History shows that leadership decapitation strategies often create
            short-term disruption but long-term unpredictability.
          </p>

          <p>
            When command structures fracture, retaliation strategies can become:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Less centralized</li>
            <li>More aggressive</li>
            <li>More symbolic</li>
            <li>More difficult to predict</li>
          </ul>

          <p className="text-lg font-semibold text-zinc-900">
            That uncertainty is itself a weapon.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
            A War That Travels
          </h2>

          <p>
            The most important takeaway is not whether such threats will be
            carried out.
          </p>

          <p>It is that they have been declared.</p>

          <p>
            Once a conflict begins framing civilian global spaces as potential
            targets, the psychological geography of war changes.
          </p>

          <p className="text-lg font-medium text-zinc-900">
            Airports.
            <br />
            Hotels.
            <br />
            Public events.
            <br />
            Tourist hubs.
          </p>

          <p>These become part of the strategic conversation.</p>

          <p>
            Whether through actual attacks or fear alone, the war begins to
            travel.
          </p>

          <p className="text-lg font-semibold text-zinc-900">
            And when wars travel —
            <br />
            they stop being regional crises.
          </p>

          <p className="text-lg font-semibold text-zinc-900">
            They become global risk environments.
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
              This report is based on AP and Wall Street Journal reporting on
              Iran’s threat language. Analysis and framing are Liberty
              Soldiers’.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
