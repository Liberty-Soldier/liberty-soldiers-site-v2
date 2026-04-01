import ShareButton from "../ShareButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ARTICLE_URL =
  "https://libertysoldiers.com/news/information-war-intensifies";

const ARTICLE_TITLE =
  "Information War Intensifies as Conflicting Reports Shape Global Perception";

const ARTICLE_SUMMARY =
  "An investigative briefing on how conflicting reports, selective leaks, propaganda, and narrative management are shaping public perception during the current war cycle.";

export const metadata = {
  title: `${ARTICLE_TITLE} | Liberty Soldiers`,
  description: ARTICLE_SUMMARY,
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "Conflicting battlefield claims, selective leaks, and narrative warfare are shaping global perception.",
    url: ARTICLE_URL,
    images: [
      {
        url: "https://libertysoldiers.com/og-information-war.jpg",
        width: 1200,
        height: 630,
        alt: "Information War Intensifies | Liberty Soldiers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE_TITLE,
    description:
      "Conflicting reports and perception warfare are becoming part of the conflict itself.",
    images: ["https://libertysoldiers.com/og-information-war.jpg"],
  },
};

export default function InformationWarIntensifiesPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <article className="mx-auto max-w-3xl px-6 py-12 md:px-8">
        <div className="relative mb-10">
          <img
            src="/og-information-war.jpg"
            alt="Information War Intensifies"
            className="w-full rounded-lg border border-black/10"
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/70 px-4 py-2 text-sm text-white">
            Conflicting reports and perception warfare now form part of the
            battlefield.
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-3 inline-block rounded-full border border-black/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/70">
            Narrative Warfare
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {ARTICLE_TITLE}
          </h1>

          <p className="mt-4 text-sm text-black/60">
            Published by Liberty Soldiers
          </p>
        </div>

        <div className="mb-8">
          <ShareButton
            shareUrl={ARTICLE_URL}
            title={ARTICLE_TITLE}
            summary={ARTICLE_SUMMARY}
          />
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-extrabold prose-p:text-black/85 prose-strong:text-black prose-a:text-black">
          <p>
            Modern war is no longer fought only with missiles, drones, and troop
            movements. It is also fought through headlines, viral clips,
            anonymous intelligence leaks, carefully worded briefings, and
            emotionally loaded narratives pushed at machine speed across the
            internet.
          </p>

          <p>
            The battlefield now exists in two places at once: on the ground, and
            in the mind of the public.
          </p>

          <p>
            In the current war cycle, conflicting reports are not a side effect.
            They are part of the environment itself. One side claims major
            success. The other claims resilience. Casualty numbers shift.
            Strategic objectives are reworded. Damage assessments conflict.
            “Limited” actions suddenly look expansive. “Defensive” operations
            appear coordinated well in advance. Every side attempts to frame
            escalation as justified, controlled, and necessary.
          </p>

          <h2>When Facts Arrive in Fragments, Perception Becomes the Target</h2>

          <p>
            The average person does not receive war information in a complete,
            verified sequence. They receive fragments: a strike video here, an
            official denial there, a map from one outlet, a contradictory quote
            from another, a social post claiming everything is under control,
            followed by footage suggesting otherwise.
          </p>

          <p>
            This fragmentation creates confusion, and confusion creates
            dependency. When people cannot confidently interpret events for
            themselves, they become more likely to outsource judgment to the
            loudest outlet, the most polished spokesman, or the narrative that
            feels safest.
          </p>

          <p>
            That is where perception warfare becomes powerful. It does not always
            require a complete lie. It only requires selective truth, timed
            omission, emotional framing, and repetition.
          </p>

          <h2>Conflicting Reports Are Reshaping the Conflict</h2>

          <p>
            Reports surrounding the war have become increasingly unstable.
            Different outlets and officials describe the same developments in
            radically different terms. A setback becomes a tactical adjustment.
            Escalation becomes deterrence. Strategic ambiguity becomes “measured
            response.” The public is left trying to interpret a constantly moving
            target.
          </p>

          <p>
            This matters because perception influences policy tolerance. If the
            public believes a conflict is contained, it can expand with less
            resistance. If they believe victory is near, they may accept deeper
            involvement. If they believe the enemy is irrational, existential,
            and ever-present, they may tolerate surveillance, censorship,
            emergency powers, or broader military commitments that would have
            faced more scrutiny under normal conditions.
          </p>

          <h2>The Information Layer Is Now Part of the Weapon System</h2>

          <p>
            In previous eras, propaganda supported war. Today, the information
            layer is fused into war. Governments, intelligence agencies,
            military spokesmen, legacy media, independent analysts,
            bot-amplified social accounts, and algorithmic platforms all collide
            in real time.
          </p>

          <p>
            Every new report is instantly assessed not just for accuracy, but for
            utility. Does it calm markets? Does it justify retaliation? Does it
            preserve morale? Does it shape international opinion? Does it buy
            time? Does it prepare the public for the next step?
          </p>

          <p>
            In that environment, the first version of events is rarely the final
            one. What the public sees first is often what best serves immediate
            strategic need.
          </p>

          <h2>Narrative Control Is a Force Multiplier</h2>

          <p>
            Control over narrative can function like a force multiplier. A state
            that appears strong may deter retaliation even if underlying
            vulnerabilities remain. A state that successfully portrays itself as
            under existential threat may secure diplomatic cover, more aid, or
            greater public sympathy. A coalition that maintains message
            discipline can shape how global audiences interpret every development
            before the fog clears.
          </p>

          <p>
            That does not mean every contradiction is proof of conspiracy.
            Battlefield information is naturally chaotic. Early reports are often
            wrong. Communications break down. Real uncertainty exists.
          </p>

          <p>
            But in an era where messaging is tightly managed, uncertainty itself
            can be exploited. The fog of war has become a strategic asset.
          </p>

          <h2>Why This Matters Beyond the Battlefield</h2>

          <p>
            The stakes go beyond military analysis. The same information dynamics
            used during war can shape public consent far beyond the battlefield.
            A frightened population is easier to steer. A confused population is
            easier to divide. A population overwhelmed by contradiction is more
            likely to surrender critical thought and accept prepackaged
            conclusions.
          </p>

          <p>
            That is why information discipline matters. Not blind trust in one
            side. Not reflexive disbelief of everything. But disciplined
            skepticism. Watching for the gap between language and reality.
            Comparing claims against outcomes. Noticing when every side appears
            desperate to control interpretation as much as territory.
          </p>

          <h2>The Real Battle Is Also Over Meaning</h2>

          <p>
            The war is not only about what is happening. It is also about what
            people are made to believe is happening.
          </p>

          <p>
            That distinction matters. Because once perception is captured, public
            reaction can be managed. And once public reaction is managed, the
            path opens for deeper escalation, broader compliance, and policies
            that may have been rejected if events were seen clearly from the
            start.
          </p>

          <p>
            In this sense, conflicting reports are not just noise. They are part
            of the signal.
          </p>

          <p>
            The information war is intensifying, and in many ways, it is becoming
            inseparable from the conflict itself.
          </p>

          <hr />

          <p className="text-base text-black/70">
            Liberty Soldiers tracks the convergence of war, narrative control,
            crisis messaging, and public perception as part of a wider system of
            power.
          </p>
        </div>

        <div className="mt-10 border-t border-black/10 pt-6">
          <ShareButton
            shareUrl={ARTICLE_URL}
            title={ARTICLE_TITLE}
            summary={ARTICLE_SUMMARY}
          />
        </div>
      </article>
    </main>
  );
}
