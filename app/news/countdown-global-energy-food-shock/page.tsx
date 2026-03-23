import type { Metadata } from "next";
import report from "./report";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.libertysoldiers.com";

const articleUrl = `${siteUrl}/news/${report.slug}`;
const imageUrl = report.coverImage.startsWith("http")
  ? report.coverImage
  : `${siteUrl}${report.coverImage}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: report.title,
    description: report.excerpt,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      url: articleUrl,
      siteName: "Liberty Soldiers",
      title: report.title,
      description: report.excerpt,
      publishedTime: report.dateISO,
      authors: [report.byline],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: report.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: report.title,
      description: report.excerpt,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ReportPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <div className="mb-3 text-sm uppercase tracking-wide text-neutral-500">
          {report.category} · {report.dateISO}
        </div>
        <h1 className="text-4xl font-bold leading-tight">{report.title}</h1>
        <p className="mt-4 text-lg text-neutral-700">{report.excerpt}</p>
        <div className="mt-4 text-sm text-neutral-500">
          By {report.byline} · {report.readTime} min read
        </div>
      </header>

      <div className="prose prose-neutral max-w-none">
        <p>
          The Iran war is being sold to the public as an oil story.
          That is only the first layer.
        </p>

        <p>
          The slower and more dangerous consequence is fertilizer.
          And fertilizer shocks do not stay in fertilizer markets.
          They move into planting decisions, crop yields, shipping costs,
          and then food prices.
        </p>

        <p>
          International Energy Agency chief Fatih Birol warned that energy
          flows in the Gulf may not return to full capacity for six months,
          if not longer. That matters because the Strait of Hormuz is not only
          an oil chokepoint. It is part of the artery system for sulfur,
          petrochemicals, diesel, and feedstocks that modern agriculture
          depends on.
        </p>

        <p>
          In other words, this is not just an energy disruption.
          It is a delayed agricultural disruption.
        </p>

        <p>
          Former central bank advisor Sergey Prokopenko outlined the timeline
          clearly: first comes the fertilizer price spike and contract stress;
          then reduced planting and lower yields; then import-dependent
          economies absorb the retail food-price shock months later.
        </p>

        <p>
          The question is not whether Washington has the analytical capacity to
          see these consequences. It does. U.S. agencies, defense planners,
          think tanks, commodity desks, and intelligence analysts have modeled
          Hormuz disruption scenarios for years.
        </p>

        <p>
          A child with internet access could ask AI what happens when Iran is
          attacked and Hormuz traffic is threatened. The answer would include
          oil disruption, shipping risk, fertilizer stress, diesel pass-through,
          and later food inflation.
        </p>

        <p>
          So why was this treated like a surprise?
        </p>

        <p>
          If the scenario was foreseeable, then the downstream effects were
          foreseeable too. That means the public was never just being led into
          an oil spike. It may have been led into a broader supply-chain event
          whose real impact will arrive later, after the cameras move on.
        </p>

        <p>
          Oil is the headline.
          Fertilizer is the warning.
          Food is the consequence.
        </p>
      </div>
    </article>
  );
}
