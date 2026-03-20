// app/news/war-leaves-the-battlefield-global-threat/page.tsx

import ShareButton from "../ShareButton";

export const metadata = {
  title:
    "When War Leaves the Battlefield: Iran’s Global Threat Changes the Rules | Liberty Soldiers",
  description:
    "Iran’s warning that enemy personnel may not be safe even in resorts and tourist centers signals a dangerous shift from regional warfare to global fear, soft-target pressure, and psychological escalation.",
  openGraph: {
    title:
      "When War Leaves the Battlefield: Iran’s Global Threat Changes the Rules",
    description:
      "A threat aimed at resorts, tourist centers, and leisure spaces signals that this war is no longer being framed as a battlefield-only conflict.",
    url: "https://libertysoldiers.com/news/war-leaves-the-battlefield-global-threat",
    images: [
      {
        url: "https://libertysoldiers.com/hero-global-threat-warning.jpg",
        width: 1200,
        height: 630,
        alt: "Global threat escalation cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "When War Leaves the Battlefield: Iran’s Global Threat Changes the Rules",
    description:
      "Iran’s warning about resorts and tourist centers signals a chilling shift toward global fear and soft-target pressure.",
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
            title="When War Leaves the Battlefield: Iran’s Global Threat Changes the Rules"
            summary="A threat aimed at resorts and tourist centers signals a chilling expansion from regional war to global fear and soft-target pressure."
          />
        </div>

        <header className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Escalation Signal Report
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            When War Leaves the Battlefield: Iran’s Global Threat Changes the Rules
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            A war that threatens resorts, tourist centers, and leisure spaces is
            no longer trying to stay inside normal military boundaries. It is
            trying to spread fear, widen pressure, and make distance feel like
            an illusion.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500">
            <span>Liberty Soldiers</span>
            <span>•</span>
            <span>Escalation Analysis</span>
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
            Once a war is framed around resorts, tourist centers, and public
            leisure spaces, the objective is no longer just retaliation. It is
            psychological reach.
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
                  • Iran’s military publicly warned that enemy personnel may not
                  be safe even in parks, resorts, and tourist destinations.
                </li>
                <li>
                  • The warning came after senior Iranian officials were killed
                  in U.S. and Israeli strikes.
                </li>
                <li>
                  • This rhetoric points toward a war of soft-target pressure,
                  deterrence through fear, and global psychological reach.
                </li>
              </ul>
            </div>

            <p className="text-lg font-semibold text-zinc-900">
              This is not normal war rhetoric.
            </p>

            <p>
              Threatening military bases is one thing. Threatening the safety of
              officials and personnel in resorts, tourist centers, amusement
              areas, and leisure zones is something else entirely.
            </p>

            <p>
              It signals a shift away from the language of conventional military
              retaliation and toward the language of vulnerability. The point is
              not just to promise pain. The point is to erase the idea that
              there is any clean separation between the battlefield and normal
              life.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Why this statement matters
            </h2>

            <p>
              States make threats all the time. Most fade into the churn of war.
              This one stands out because of the type of locations invoked.
            </p>

            <p>
              Resorts. Tourist centers. Recreation spaces. These are not random
              examples. They are soft, public, internationally legible places.
              They are where people go to feel far away from conflict. Mentioning
              them is a message that distance may no longer protect anyone tied
              to this war.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              This is what escalation looks like when a war stops talking only to
              soldiers and starts talking to civilians, travelers, investors,
              event planners, and security services.
            </blockquote>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              What an attack could look like
            </h2>

            <p>
              It does not have to look like a missile strike on a beach resort.
              In fact, the most realistic danger is that it would not.
            </p>

            <p>
              A modern soft-target attack could mean a targeted hit on an
              official traveling quietly. It could mean a proxy operation in a
              transit corridor. It could mean surveillance, intimidation, a
              vehicle bomb near a leisure venue, or a symbolic strike timed to
              cause maximum global attention with minimal resources.
            </p>

            <p>
              It could also mean something even more effective than a successful
              attack: a credible attempt, a thwarted plot, or an intelligence
              warning serious enough to trigger lockdowns, cancellations, travel
              advisories, and rolling fear.
            </p>

            <p className="text-lg font-semibold text-zinc-900">
              In this kind of escalation, panic can be operationally useful even
              when the physical damage is limited.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              The real target is the idea of safe space
            </h2>

            <p>
              The strategic value of the statement is obvious. If you cannot
              defeat your enemies symmetrically everywhere, you can still try to
              make them feel exposed everywhere.
            </p>

            <p>
              That changes the cost structure of the conflict. Security expands.
              Travel becomes more complex. Diplomatic visits become more
              difficult. Private protection rises. International events carry
              more risk. The psychological footprint of the war expands far
              beyond the actual strike map.
            </p>

            <p>
              And that is the point. Once a conflict can inject fear into
              airports, hotels, resorts, waterfront districts, convention
              centers, and tourist zones, it starts taxing normal life itself.
            </p>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-zinc-700">
                <strong>Signal to watch:</strong> the war is widening when
                governments start hardening civilian travel spaces, leisure
                venues, and international event zones as if they are extensions
                of the battlefield.
              </p>
            </div>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Why this follows the killings of senior Iranian officials
            </h2>

            <p>
              Leadership decapitation rarely ends a conflict on its own. More
              often, it changes the mode of retaliation. Kill enough senior
              figures and the surviving structure may decide that symmetrical
              answers are too predictable, too slow, or too vulnerable.
            </p>

            <p>
              That is when wars mutate. They stop looking for clean battlefield
              trades and start searching for symbolic leverage. They start
              looking for places where fear will travel farther than the blast.
            </p>

            <p>
              Iran’s warning should be read through that lens. It is not just an
              angry statement. It is a declaration that the conflict may now be
              framed as globally portable.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-zinc-900 bg-zinc-50 px-5 py-4 text-lg font-semibold leading-relaxed text-zinc-900">
              The most dangerous thing about this threat is not that it mentions
              tourist centers. It is that it tells the world the war no longer
              intends to respect the old map.
            </blockquote>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              What Liberty Soldiers is watching now
            </h2>

            <p>
              Watch for travel advisories. Watch for quiet changes in security
              posture around embassies, resorts, conferences, and public events.
              Watch for proxy chatter, suspicious disruptions, or intelligence
              leaks that suddenly push “vacation destinations” into national
              security language.
            </p>

            <p>
              Also watch whether officials try to downplay the statement as mere
              rhetoric. Sometimes rhetoric is only rhetoric. Sometimes rhetoric
              is the opening move that acclimates the public to a new category of
              risk before the first major incident arrives.
            </p>

            <h2 className="pt-4 text-2xl font-bold tracking-tight text-zinc-900">
              Closing
            </h2>

            <p>
              This warning matters because it drags war into places people still
              imagine as outside of war.
            </p>

            <p>
              It is one thing to tell the world that missiles may fly over oil
              infrastructure or naval choke points. It is another to say that
              resorts, tourist centers, and leisure spaces are part of the same
              threat environment.
            </p>

            <p className="text-lg font-semibold text-zinc-900">
              Once that line is crossed, the battlefield is no longer just a
              place. It becomes a condition.
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
                Iran’s public threat language. Analysis and framing are Liberty
                Soldiers’.
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
                  <strong>Target shift:</strong> rhetoric has moved from bases
                  and infrastructure toward soft public spaces
                </li>
                <li>
                  <strong>Psychology:</strong> fear, exposure, and uncertainty
                  are now part of the escalation toolkit
                </li>
                <li>
                  <strong>Security:</strong> travel hubs and leisure venues may
                  see a harder protection posture
                </li>
                <li>
                  <strong>War geometry:</strong> the conflict is being framed as
                  globally portable
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Core question
              </div>
              <p className="mt-3 text-sm text-zinc-700">
                If war rhetoric now openly includes resorts and tourist centers,
                how long before civilian normalcy itself becomes part of the
                strategic target set?
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
              shareUrl="https://libertysoldiers.com/news/war-leaves-the-battlefield-global-threat"
              title="When War Leaves the Battlefield: Iran’s Global Threat Changes the Rules"
              summary="A threat aimed at resorts and tourist centers signals a chilling expansion from regional war to global fear and soft-target pressure."
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
