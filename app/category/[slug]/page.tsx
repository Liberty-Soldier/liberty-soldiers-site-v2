// app/category/[slug]/page.tsx
import type { Metadata } from "next";
import HomeHeadlines from "@/app/components/Headlines";
import { fetchAllHeadlines } from "@/lib/rss";
import {
  CATEGORY_DEFS,
  getCategoryDef,
  labelFromSlug,
} from "@/lib/news/taxonomy";
import { filterCategoryHeadlines } from "@/lib/news/select";
import type { CanonicalCategorySlug } from "@/lib/news/types";

export const revalidate = 600;

type Props = {
  params: Promise<{
    slug: CanonicalCategorySlug;
  }>;
};

export async function generateStaticParams() {
  return CATEGORY_DEFS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const def = getCategoryDef(slug);

  const title = `${def?.label || labelFromSlug(slug)} | Liberty Soldiers`;
  const description =
    def?.description ||
    "Curated category coverage from Liberty Soldiers.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://libertysoldiers.com/category/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://libertysoldiers.com/category/${slug}`,
      siteName: "Liberty Soldiers",
      type: "website",
      images: [
        {
          url: def?.ogImage || "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [def?.ogImage || "/og-default.jpg"],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const def = getCategoryDef(slug);

  const all = await fetchAllHeadlines();
  const items = filterCategoryHeadlines(all, slug);

  return (
    <section className="border-t border-zinc-200 bg-zinc-50/50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center text-sm font-semibold text-zinc-700 hover:underline"
          >
            ← Back to home
          </a>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            {def?.label || labelFromSlug(slug)}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            {def?.description}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORY_DEFS.map((c) => (
            <a
              key={c.slug}
              href={`/category/${c.slug}`}
              className={[
                "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                c.slug === slug
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50",
              ].join(" ")}
            >
              {c.label}
            </a>
          ))}
        </div>

        {items.length ? (
          <HomeHeadlines variant="grid" items={items} limit={24} />
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-700">
            No recent items in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
