// app/page.tsx
import type { Metadata } from "next";
import Carousel from "./components/Carousel";
import { Suspense } from "react";
import HomeHeadlines from "./components/Headlines";
import { getLatestReport } from "../lib/reports";
import LiveBriefingAuto from "./components/LiveBriefingAuto";
import LiveSignalDesk from "./components/LiveSignalDesk";
import SignalVsNoiseAuto from "./components/SignalVsNoiseAuto";
import EmailBand from "./components/EmailBand";
import LatestReportBand from "./components/LatestReportBand";
import IranWarCarousel from "./components/IranWarCarousel";
import {
  pickHomepageHeadlines,
  pickHomepageCarouselHeadlines,
  pickIranRadarHeadlines,
} from "../lib/news/select";

export const dynamic = "force-dynamic";
export const revalidate = 600;

const OG_IMAGE = "/og-default.jpg";

export const metadata: Metadata = {
  title: "Liberty Soldiers | Independent Geopolitical & Investigative Analysis",
  description:
    "Independent investigative analysis of geopolitics, global power structures, media narratives, digital control systems, and emerging technologies shaping world events.",

  alternates: {
    canonical: "https://libertysoldiers.com/",
  },

  openGraph: {
    title: "Liberty Soldiers | Independent Geopolitical & Investigative Analysis",
    description:
      "Independent investigative analysis of geopolitics, global power structures, media narratives, digital control systems, and emerging technologies shaping world events.",
    url: "https://libertysoldiers.com/",
    siteName: "Liberty Soldiers",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Liberty Soldiers - Independent Geopolitical Analysis",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Liberty Soldiers | Independent Geopolitical & Investigative Analysis",
    description:
      "Independent investigative analysis of geopolitics, global power structures, media narratives, digital control systems, and emerging technologies shaping world events.",
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

export default async function Home() {
  const latestReport = (await getLatestReport()) ?? null;
  const all = await fetchAllHeadlines(); // still needed for some panels

const headlines = pickHomepageHeadlines(all);
const carouselHeadlines = pickHomepageCarouselHeadlines(all);
const iranItems = pickIranRadarHeadlines(all);

  const nowIso = new Date().toISOString();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Liberty Soldiers",
      url: "https://libertysoldiers.com/",
      description:
        "Independent analysis examining power, perception, media narratives, and emerging systems shaping the world.",
      sameAs: ["https://x.com/LibertySoldierz"],
    },
    {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      name: "Liberty Soldiers",
      url: "https://libertysoldiers.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://libertysoldiers.com/logo.png",
      },
      sameAs: ["https://x.com/LibertySoldierz"],
      publishingPrinciples: "https://libertysoldiers.com/about",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Liberty Soldiers",
      url: "https://libertysoldiers.com/",
      dateModified: nowIso,
      publisher: {
        "@type": "Organization",
        name: "Liberty Soldiers",
        url: "https://libertysoldiers.com/",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://libertysoldiers.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Liberty Soldiers | Geopolitics, Global Conflict & Power Analysis",
      url: "https://libertysoldiers.com/",
      dateModified: nowIso,
      isPartOf: {
        "@type": "WebSite",
        name: "Liberty Soldiers",
        url: "https://libertysoldiers.com/",
      },
    },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[32vh] w-full items-center py-10 sm:h-[32vh] sm:py-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />

        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 text-white sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              LIBERTY SOLDIERS
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
              Independent analysis of geopolitical conflict, financial systems,
              technological control structures, and emerging global narratives
              shaping the future.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/reports"
                className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
              >
                Read Reports →
              </a>
              <a
                href="/news"
                className="inline-flex items-center rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Live Intelligence →
              </a>
            </div>

            <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
              Tracking power, conflict, and the narratives shaping the world.
            </p>
          </div>
        </div>
      </section>

      {/* War & Escalation Radar — top band */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              War & Escalation Radar
            </h2>
            <p className="text-sm text-neutral-500">
              Real-time headlines referencing Iran, regional escalation, and
              related conflict signals.
            </p>
          </div>

          <IranWarCarousel items={iranItems} />
        </div>
      </section>

      {/* Live Briefing */}
      <LiveBriefingAuto />

      {/* Live Signal Desk */}
      <LiveSignalDesk />

      {/* Email signup — desktop only */}
      <div className="hidden sm:block">
        <EmailBand />
      </div>

      {/* Latest LS Report — desktop only */}
      <div className="hidden sm:block">
        <LatestReportBand report={latestReport} />
      </div>

      {/* Latest Headlines */}
      <section className="border-t border-zinc-200 bg-zinc-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                  Latest Headlines
                </h2>
                <p className="mt-1 text-sm text-zinc-600 sm:text-base">
                  External signals being monitored across systems, policy,
                  conflict, and finance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/news"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                Full feed <span className="text-red-600">→</span>
              </a>
            </div>
          </div>

          <div className="sm:hidden">
            <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
              <Carousel title="">
                <Suspense fallback={<HeadlinesFallback />}>
                 <HomeHeadlines variant="carousel" items={carouselHeadlines} />
                </Suspense>
              </Carousel>
            </div>
          </div>

          <div className="hidden sm:block">
            <Suspense fallback={<HeadlinesFallback />}>
             <HomeHeadlines variant="grid" items={headlines} />
            </Suspense>

            <div className="mt-6">
              <a
                href="/news"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                View full News Feed <span className="text-red-600">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Signal vs Noise */}
      <SignalVsNoiseAuto />

      {/* Bottom context */}
      <section className="border-t border-zinc-200 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="hidden sm:block">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Liberty Soldiers is an independent investigative media platform
              for geopolitical analysis.
            </h2>

            <p className="mt-3 leading-relaxed text-zinc-800">
              We publish investigative reporting and analytical research on
              global geopolitics, modern conflict, information warfare,
              psychological operations, and the power structures and belief
              systems that shape public perception and policy.
            </p>

            <p className="mt-3 leading-relaxed text-zinc-700">
              Our reports connect breaking news and world events to historical
              patterns, strategic doctrine, and long-term ideological
              frameworks—separating signal from noise, fact from propaganda,
              and context from narrative—so readers gain situational awareness
              and clarity, not partisan opinion.
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Topics include geopolitics, global conflict, media manipulation,
              surveillance systems, digital identity, financial power, and
              narrative control.
            </p>
          </div>

          <div className="sm:hidden">
            <h2 className="text-xl font-extrabold text-zinc-900">
              Independent analysis of power, perception, and control.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">
              Reports connect headlines to historical patterns—separating
              signal from noise.
            </p>
            <div className="mt-3">
              <a
                href="/about"
                className="inline-flex items-center text-sm font-semibold text-zinc-900 hover:underline"
              >
                Read the mission →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
