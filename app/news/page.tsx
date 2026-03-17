// app/news/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import Carousel from "../components/Carousel";
import HomeHeadlines from "../components/Headlines";

import { fetchAllHeadlines } from "../../lib/rss";
import {
  pickHomepageCarouselHeadlines,
  pickHomepageHeadlines,
} from "../../lib/news.select";
import { CATEGORY_DEFS } from "../../lib/news.taxonomy";

export const revalidate = 300;

const OG_IMAGE = "/og-default.jpg";

export const metadata: Metadata = {
  title: "News Feed | Liberty Soldiers",
  description:
    "Live news feed tracking geopolitics, conflict, finance, control systems, religion, and emerging global developments.",
  alternates: {
    canonical: "https://libertysoldiers.com/news",
  },
  openGraph: {
    title: "News Feed | Liberty Soldiers",
    description:
      "Live news feed tracking geopolitics, conflict, finance, control systems, religion, and emerging global developments.",
    url: "https://libertysoldiers.com/news",
    siteName: "Liberty Soldiers",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Liberty Soldiers News Feed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News Feed | Liberty Soldiers",
    description:
      "Live news feed tracking geopolitics, conflict, finance, control systems, religion, and emerging global developments.",
    images: [OG_IMAGE],
  },
};

function HeadlinesFallback() {
  return (
    <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 text-zinc-600">
      Loading headlines…
    </div>
  );
}

export default async function NewsPage() {
  const all = await fetchAllHeadlines();

  const gridItems = all.filter((h) => h.category !== "Pinned");
  const mobileItems = pickHomepageCarouselHeadlines(gridItems, 24);
  const featuredItems = pickHomepageHeadlines(gridItems, 9);

  return (
    <section className="border-t border-zinc-200 bg-zinc-50/50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-zinc-700 hover:underline"
          >
            ← Back to home
          </Link>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            News Feed
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            Live external signals across war, geopolitics, finance, digital
            control systems, religion, ideology, and broader structural change.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORY_DEFS.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <div className="mb-10 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
              Featured Signals
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              A balanced selection of high-priority developments.
            </p>
          </div>

          <Suspense fallback={<HeadlinesFallback />}>
            <HomeHeadlines variant="grid" items={featuredItems} limit={9} />
          </Suspense>
        </div>

        <div className="sm:hidden">
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
            <Carousel title="Latest Headlines">
              <Suspense fallback={<HeadlinesFallback />}>
                <HomeHeadlines
                  variant="carousel"
                  items={mobileItems}
                  limit={24}
                />
              </Suspense>
            </Carousel>
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
              All Headlines
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Full monitored feed, sorted and normalized.
            </p>
          </div>

          <Suspense fallback={<HeadlinesFallback />}>
            <HomeHeadlines variant="grid" items={gridItems} limit={24} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
