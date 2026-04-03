import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedBySlug } from "@/lib/published-store";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getPublishedBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found | Liberty Soldiers",
    };
  }

  return {
    title: `${article.title} | Liberty Soldiers`,
    description: article.excerpt,
    alternates: {
      canonical: `https://libertysoldiers.com/published/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://libertysoldiers.com/published/${article.slug}`,
      siteName: "Liberty Soldiers",
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export default async function PublishedArticlePage({ params }: Props) {
  const article = await getPublishedBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
          <div className="mb-3 inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
            {article.hardCategory}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight">{article.title}</h1>

          <p className="mt-4 text-lg leading-7 text-zinc-600">{article.excerpt}</p>

          <div className="mt-4 text-sm text-zinc-500">
            By {article.byline} • {article.dateISO} • {article.readTime}
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="prose prose-zinc max-w-none whitespace-pre-line">
          {article.body}
        </div>
      </article>
    </main>
  );
}