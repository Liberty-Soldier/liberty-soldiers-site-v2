// app/news/pentagon-war-funding-surge/page.tsx

import ShareButton from "../ShareButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title:
    "War Funding Surge: Pentagon Seeks $200 Billion as Iran Conflict Expands | Liberty Soldiers",
  description:
    "A massive Pentagon funding request signals expectations of prolonged conflict and growing systemic costs.",
  openGraph: {
    title:
      "War Funding Surge: Pentagon Seeks $200 Billion as Iran Conflict Expands",
    description:
      "The scale of requested funding reveals assumptions about the war’s duration and intensity.",
    url: "https://libertysoldiers.com/news/pentagon-war-funding-surge",
    images: [
      {
        url: "https://libertysoldiers.com/hero-war-funding.jpg",
        width: 1200,
        height: 630,
        alt: "Pentagon war funding",
      },
    ],
  },
};

const sources = [
  {
    title:
      "AP: Pentagon seeks additional $200 billion for Iran war operations",
    href: "https://apnews.com/article/972ec1bd956a2c3633e6ab7fff389791",
    outlet: "Associated Press",
  },
];

export default function WarFundingPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-5xl px-4 py-10">
        <a href="/news">← Back to News</a>

        <h1 className="mt-6 text-5xl font-black">
          War Funding Surge: Pentagon Seeks $200 Billion as Iran Conflict Expands
        </h1>

        <figure className="my-10">
          <img src="/hero-war-funding.jpg" />
        </figure>

        <p className="text-lg font-semibold">
          Wars often reveal their true trajectory through budgets, not speeches.
        </p>

        <p>
          The Pentagon’s reported request for an additional $200 billion suggests
          expectations of sustained operations. Funding signals strategic
          assumptions: duration, escalation potential, and logistical scale.
        </p>

        <p>
          Large wartime appropriations can reshape domestic priorities, market
          sentiment, and alliance commitments. They also influence how long
          conflicts remain politically viable.
        </p>

        <p className="text-lg font-semibold">
          When funding requests expand, the war’s timeline often expands with
          them.
        </p>
      </article>
    </main>
  );
}
