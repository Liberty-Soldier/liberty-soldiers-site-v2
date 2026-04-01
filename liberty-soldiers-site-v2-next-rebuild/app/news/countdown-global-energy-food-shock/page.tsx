import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.libertysoldiers.com";

const ARTICLE_SLUG = "countdown-global-energy-food-shock";
const ARTICLE_URL = `${SITE_URL}/news/${ARTICLE_SLUG}`;

const ARTICLE_TITLE =
  "They Knew the Cost: Why Escalate Toward Iran If the Fallout Was So Obvious?";

const ARTICLE_SUMMARY =
  "With a trillion-dollar military machine and vast intelligence budgets, U.S. planners could model the economic shock of Hormuz disruption. The real question is whether the fallout was understood — and accepted — before escalation.";

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

        <h1 className="text-4xl font-bold leading-tight">{ARTICLE_TITLE}</h1>

        <p className="mt-4 text-lg text-neutral-700">{ARTICLE_SUMMARY}</p>

        <div className="mt-4 text-sm text-neutral-500">
          By Liberty Soldiers · 10 min read
        </div>
      </header>

      <img
        src="/hero-energy-food-shock.jpg"
        alt="Energy disruption and food inflation risk"
        className="mb-8 w-full rounded-lg"
      />

      <div className="prose prose-neutral max-w-none">
        <p>How was this not anticipated?</p>

        <p>
          The United States maintains the most expensive military and
          intelligence apparatus in the world. The current national defense
          budget request sits at roughly a trillion dollars. The Department of
          Defense alone commands hundreds of billions more than any rival
          military establishment on earth. The intelligence community operates
          with tens of billions more across the CIA, NSA, NGA, DIA, and the
          broader national and military intelligence structure. Layer on top of
          that the combatant commands, war-gaming staffs, sanctions planners,
          energy-security analysts, agricultural risk models, and think tanks
          dedicated to second- and third-order scenario planning, and the idea
          that the downstream consequences of confrontation with Iran were
          somehow invisible becomes difficult to take seriously.
        </p>

        <p>
          That is the real question hanging over this story. Not whether the
          fallout was foreseeable. It was. The harder question is whether the
          people making these decisions are truly detached from the economic
          reality facing the populations they claim to serve — or whether they
          understood the likely outcome and simply did not care enough to stop.
        </p>

        <p>
          Because the chain reaction was never complicated.
        </p>

        <p>
          Disrupt energy flows through the Strait of Hormuz and oil prices rise.
          Raise oil prices and shipping costs climb, diesel costs rise, chemical
          input costs tighten, and fertilizer production becomes more
          expensive. Make fertilizer more expensive and farmers start making
          defensive decisions. They reduce nutrient application. They delay
          purchases. They cut acreage where margins are already thin. Months
          later, yields soften, inventories tighten, and food inflation starts
          showing up where ordinary people actually live — at the grocery store,
          in household budgets, in shrinking portions, and in the quiet
          financial pressure that never gets framed as part of the original war
          decision.
        </p>

        <p>
          This is not fringe analysis. It is textbook supply-chain
          transmission.
        </p>

        <p>
          The Strait of Hormuz is not merely an oil headline. It is one of the
          most strategically important economic chokepoints in the world.
          Roughly one-fifth of global oil consumption moves through that narrow
          corridor, and a large share of seaborne crude trade depends on it.
          But the corridor also matters for liquefied natural gas,
          petrochemicals, sulfur cargoes, and industrial feedstocks essential to
          modern agriculture and manufacturing.
        </p>

        <p>
          That is why reducing the issue to “higher gas prices” is so
          dishonest. Oil is only the first visible layer of the shock.
          The slower and more consequential layer sits further down the chain:
          fertilizers, farm inputs, planting decisions, food transport, and then
          retail food inflation.
        </p>

        <p>
          Fertilizer production is structurally tied to energy. Nitrogen
          fertilizer depends heavily on natural gas. Phosphate fertilizer
          production relies on sulfur. Diesel powers farm machinery, irrigation
          equipment, trucking, shipping, and the broader logistics web that
          moves calories from production zones to urban populations. When energy
          systems come under stress, agricultural output does not fail in one
          cinematic moment. It weakens in stages.
        </p>

        <p>
          That staged nature of the crisis is exactly what makes it politically
          convenient.
        </p>

        <p>
          Phase one is already visible in price volatility and contract stress.
          Fertilizer costs spike. Shipping insurance climbs. Freight risk is
          repriced. Import-dependent countries face procurement challenges.
          Buyers that usually lock in supply months ahead find themselves paying
          more or hesitating under uncertainty.
        </p>

        <p>
          Phase two arrives later, when farmers respond to that uncertainty.
          Some apply less fertilizer than agronomically ideal. Some shift
          acreage. Some decide it is not worth planting certain crops at all if
          input prices remain unstable. This phase does not usually produce
          instant headlines, but it matters enormously because planting choices
          made now determine harvest outcomes later.
        </p>

        <p>
          Phase three is when the public finally feels it. Lower yields,
          tighter inventories, higher transport costs, and weaker import
          capacity show up as food inflation months after the geopolitical
          trigger event. By then, the original escalation may have faded from
          headlines. The public experiences the pain after the accountability
          window has already started to close.
        </p>

        <p>
          That lag is one of the most important parts of this story. It allows
          political and military leadership to treat downstream damage as if it
          were some separate market phenomenon rather than a foreseeable
          consequence of strategic choices. The missile strike happens now. The
          household cost shows up later. The distance between those two moments
          is where responsibility gets buried.
        </p>

        <p>
          History has already shown how this works. During the 2007–2008
          commodity shock, oil prices surged while food prices followed. The
          result was not just inflation but unrest, especially in regions where
          staple affordability was already fragile. The supply shocks of the
          early 2020s repeated the lesson. Energy stress fed fertilizer stress.
          Fertilizer stress fed food inflation. Governments were then forced
          into subsidies, export controls, emergency interventions, and public
          messaging campaigns aimed at containing blowback after the fact.
        </p>

        <p>
          None of this was unknowable. Strategic planners have modeled Hormuz
          disruption scenarios for decades. Energy-security institutions,
          military analysts, intelligence desks, central banks, commodity
          traders, and multinational firms all understand that conflict near a
          chokepoint of this scale transmits through far more than crude
          markets. Even publicly available analytical tools can map the likely
          cascade. A teenager with internet access and a basic prompt to an AI
          model could sketch out the outline: oil disruption, freight pressure,
          fertilizer stress, reduced planting, food inflation.
        </p>

        <p>
          So what exactly are the public and regular families supposed to
          conclude? That the people running trillion-dollar planning systems
          somehow missed a chain reaction obvious to anyone willing to think two
          steps ahead? Or that they saw it and judged the damage acceptable
          because they would not be the ones living with it?
        </p>

        <p>
          That is where the issue moves beyond economics and into legitimacy.
          Political elites do not experience inflation the way the median
          household does. Rising grocery bills are not existential for
          people with protected salaries, institutional insulation, portfolio
          exposure to hard assets, and access to private security and private
          logistics. But for families already stretched by housing, insurance,
          debt service, and stagnant purchasing power, another food-price wave
          is not an abstract macroeconomic event. It is lived pressure.
        </p>

        <p>
          The same is true internationally. Import-dependent nations with weak
          currencies and limited fiscal capacity do not absorb fertilizer and
          food shocks the way large reserve-currency states do. In parts of
          Africa and South Asia, pre-purchasing fertilizer is often a financing
          challenge even in stable years. When markets tighten and shipping
          uncertainty rises, the damage is not evenly distributed. It lands
          first and hardest on the countries least able to hedge it.
        </p>

        <p>
          That is why the framing of this conflict matters. If it is presented
          only as a military confrontation or an oil-market event, the public
          misses the broader systemic reality. Modern conflict increasingly
          targets interconnected systems rather than territory alone. Pressure
          on energy corridors can become pressure on food systems. Pressure on
          food systems can become pressure on political stability. A state does
          not need a decisive battlefield victory to inflict serious structural
          damage if it can help trigger a slow-moving supply shock that ripples
          across entire populations.
        </p>

        <p>
          That is also why asking whether leaders are “out of touch” may be too
          charitable. Out of touch suggests misunderstanding. But the larger and
          more uncomfortable possibility is that the economic transmission was
          understood perfectly well. The costs were simply assigned to the
          public, spread across time, and treated as a manageable externality of
          escalation.
        </p>

        <p>
          If energy flows through the Gulf remain impaired for months, the
          consequences will not stop with crude. Agricultural trade patterns
          will start adjusting. Governments will talk more openly about food
          security. Fertilizer procurement will become more political. Households
          will notice staples rising again. And once the pressure becomes
          visible at the consumer level, the same establishment that failed to
          warn honestly about the risk will almost certainly pretend the outcome
          was unexpected, complex, or impossible to foresee.
        </p>

        <p>
          But this was foreseeable.
        </p>

        <p>
          Which is why the central question remains:
        </p>

        <p>
          Are the people steering this confrontation so detached from ordinary
          life that they genuinely failed to grasp the likely consequences?
        </p>

        <p>
          Or did they know exactly what the downstream cost would be and move
          forward anyway, confident that regular people — not the planners, not
          the strategists, not the command class — would be the ones left paying
          for it?
        </p>

        <p>
          Oil is the headline.
        </p>

        <p>
          Fertilizer stress is the warning.
        </p>

        <p>
          Food inflation is where the public gets the bill.
        </p>
      </div>
    </article>
  );
}
