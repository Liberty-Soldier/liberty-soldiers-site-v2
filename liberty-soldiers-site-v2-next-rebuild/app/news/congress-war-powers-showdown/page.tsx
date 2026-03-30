// app/news/congress-war-powers-showdown/page.tsx

import ShareButton from "../ShareButton";

export const metadata = {
  title:
    "Congress War Powers Showdown: Senate Backs Continued Iran Operations | Liberty Soldiers",
  description:
    "The Senate vote to block limits on presidential war authority signals a defining institutional moment in the expanding Iran conflict.",
  openGraph: {
    title:
      "Congress War Powers Showdown: Senate Backs Continued Iran Operations",
    description:
      "A 53-47 Senate vote reveals deep divisions over war authority, escalation risks, and constitutional oversight.",
    url: "https://libertysoldiers.com/news/congress-war-powers-showdown",
    images: [
      {
        url: "https://libertysoldiers.com/hero-senate-war-powers.jpg",
        width: 1200,
        height: 630,
        alt: "Senate war powers vote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Congress War Powers Showdown: Senate Backs Continued Iran Operations",
    description:
      "The vote signals institutional backing for escalation as Congress struggles to reassert war authority.",
    images: ["https://libertysoldiers.com/hero-senate-war-powers.jpg"],
  },
};

const sources = [
  {
    title:
      "Guardian: Senate votes down measure limiting war powers in Iran conflict",
    href: "https://www.theguardian.com/us-news/2026/mar/18/senate-trump-war-powers-vote",
    outlet: "The Guardian",
  },
  {
    title:
      "Reuters: Senate rejects second war-powers resolution over Iran war",
    href: "https://www.reuters.com/world/us/",
    outlet: "Reuters",
  },
];

export default function WarPowersShowdownPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-5xl px-4 py-10">
        <a href="/news">← Back to News</a>

        <h1 className="mt-6 text-5xl font-black">
          Congress War Powers Showdown: Senate Backs Continued Iran Operations
        </h1>

        <figure className="my-10">
          <img src="/hero-senate-war-powers.jpg" />
        </figure>

        <p className="text-lg font-semibold">
          The Iran war is no longer just a battlefield story. It is now a
          constitutional power struggle.
        </p>

        <p>
          In a closely watched vote, the U.S. Senate rejected an effort to limit
          presidential authority over military operations against Iran. The
          resolution would have forced the administration to seek explicit
          congressional approval to continue hostilities.
        </p>

        <p>
          Supporters argued the vote was about restoring constitutional balance.
          Opponents framed it as a dangerous constraint during active conflict.
        </p>

        <h2>Institutional backing for escalation</h2>

        <p>
          The rejection effectively signals continued political tolerance for
          military expansion. Once Congress declines to assert oversight, the
          strategic threshold for prolonged operations becomes easier to cross.
        </p>

        <p>
          War authority debates rarely move markets in real time. But they shape
          expectations. Investors, allies, and adversaries all watch whether
          political systems are unified behind escalation.
        </p>

        <p className="text-lg font-semibold">
          The key signal is not just the vote itself — it is the message that
          escalation still has institutional runway.
        </p>
      </article>
    </main>
  );
}
