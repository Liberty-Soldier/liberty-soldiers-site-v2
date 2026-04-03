// app/page.tsx
import type { Metadata } from "next";

import Carousel from "./components/Carousel";
import LiveBriefingAuto from "./components/LiveBriefingAuto";
import EmailBand from "./components/EmailBand";
import IranWarCarousel from "./components/IranWarCarousel";

import { getLatestReports } from "../lib/reports";
import { getPublishedForHomepage } from "../lib/published-store";
import { fetchAllHeadlines } from "../lib/rss";
import { pickIranRadarHeadlines } from "../lib/news.select";

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

function hostFromUrl(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function displayDate(dateISO?: string) {
  if (!dateISO) return "";
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function displayHeadlineDate(publishedAt?: number) {
  if (!publishedAt) return "";
  const d = new Date(publishedAt);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function ReportCard({
  report,
}: {
  report: {
    slug: string;
    title: string;
    excerpt: string;
    dateISO: string;
    coverImage: string;
    readTime?: string;
    category?: string;
  };
}) {
  return (
    <a
      href={`/news/${report.slug}`}
      className="group block min-w-[260px] max-w-[260px] shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:min-w-[285px] sm:max-w-[285px] lg:min-w-[300px] lg:max-w-[300px]"
    >
      <div className="relative h-[170px] w-full overflow-hidden bg-zinc-100">
        <img
          src={report.coverImage}
          alt={report.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-700">
          <span className="inline-flex h-2 w-2 rounded-full bg-red-600 motion-safe:animate-pulse" />
          Liberty Soldiers
        </div>
      </div>

      <div className="p-3.5">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-500">
          <span>{displayDate(report.dateISO)}</span>
          {report.readTime ? <span>• {report.readTime}</span> : null}
          {report.category ? <span>• {report.category}</span> : null}
        </div>

        <h3 className="line-clamp-3 text-[1.05rem] font-extrabold leading-[1.15] text-zinc-900 group-hover:text-red-700">
          {report.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
          {report.excerpt}
        </p>

        <div className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-red-700">
          Read report →
        </div>
      </div>
    </a>
  );
}

function HeadlineCard({
  item,
}: {
  item: {
    title: string;
    url: string;
    source?: string;
    publishedAt?: number;
    image?: string;
    summary?: string;
    category?: string;
  };
}) {
  const source = item.source || hostFromUrl(item.url);
  const date = displayHeadlineDate(item.publishedAt);
  const image = item.image || "/og-default.jpg";

  return (
    <a
      href={item.url}
      className="group block min-w-[260px] max-w-[260px] shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:min-w-[285px] sm:max-w-[285px] lg:min-w-[300px] lg:max-w-[300px]"
      target="_self"
      rel="noreferrer"
    >
      <div className="relative h-[170px] w-full overflow-hidden bg-zinc-100">
        <img
          src={image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-700">
          <span className="inline-flex h-2 w-2 rounded-full bg-red-600 motion-safe:animate-pulse" />
          External Signal
        </div>
      </div>

      <div className="p-3.5">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-500">
          <span>{source}</span>
          {date ? <span>• {date}</span> : null}
          {item.category ? <span>• {item.category}</span> : null}
        </div>

        <h3 className="line-clamp-3 text-[1.05rem] font-extrabold leading-[1.15] text-zinc-900 group-hover:text-red-700">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
          {item.summary || "Read the latest monitored development and source coverage."}
        </p>

        <div className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-red-700">
          Open source →
        </div>
      </div>
    </a>
  );
}

function FiledReportCard({
  article,
}: {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    dateISO: string;
    readTime?: string;
    hardCategory?: string;
  };
}) {
  return (
    <a
      href={`/published/${article.slug}`}
      className="group block min-w-[260px] max-w-[260px] shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:min-w-[285px] sm:max-w-[285px] lg:min-w-[300px] lg:max-w-[300px]"
    >
      <div className="relative h-[170px] w-full overflow-hidden bg-zinc-100">
        <img
          src={article.coverImage}
          alt={article.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-700">
          <span className="inline-flex h-2 w-2 rounded-full bg-red-600 motion-safe:animate-pulse" />
          Filed Report
        </div>
      </div>

      <div className="p-3.5">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-500">
          <span>{displayDate(article.dateISO)}</span>
          {article.readTime ? <span>• {article.readTime}</span> : null}
          {article.hardCategory ? <span>• {article.hardCategory}</span> : null}
        </div>

        <h3 className="line-clamp-3 text-[1.05rem] font-extrabold leading-[1.15] text-zinc-900 group-hover:text-red-700">
          {article.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
          {article.excerpt}
        </p>

        <div className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-red-700">
          Open report →
        </div>
      </div>
    </a>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900">
        {value}
      </div>
      <div className="mt-1 text-xs leading-relaxed text-zinc-600">{sub}</div>
    </div>
  );
}

export default async function Home() {
  const all = await fetchAllHeadlines();
  const published = await getPublishedForHomepage();
  const latestPublished = published.slice(0, 4);

  const featuredReports = getLatestReports(4);
  const latestHeadlines = [...all]
    .sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0))
    .slice(0, 4);

  const iranItems = pickIranRadarHeadlines(all, 4);
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

      <LiveBriefingAuto />

      <section className="relative flex min-h-[44vh] w-full items-center py-14 sm:min-h-[52vh] sm:py-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 text-white sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-200 backdrop-blur-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-red-500 motion-safe:animate-pulse" />
              Live Signals • Active Monitoring
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              LIBERTY SOLDIERS
            </h1>

            <p className="mt-4 max-w-3xl text-xl font-semibold text-white/95 sm:text-2xl">
              Global escalation is accelerating. Most people are missing it.
            </p>

            <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
              War, energy, financial pressure, and control systems are converging
              fast. Liberty Soldiers tracks the structural signals beneath the
              noise.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/reports"
                className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
              >
                Enter Reports Desk →
              </a>

              <a
                href="/war-escalation"
                className="inline-flex items-center rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Escalation Tracker →
              </a>
            </div>

            <p className="mt-5 max-w-2xl text-sm text-white/70 sm:text-base">
              Independent situational awareness on conflict, systems, narrative warfare,
              and the structures shaping world events.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-8 sm:py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <StatCard
            label="Filed Reports"
            value={published.length}
            sub="Latest bot-published reports in the system."
          />
          <StatCard
            label="Featured Reports"
            value={featuredReports.length}
            sub="Curated Liberty Soldiers reporting and analysis."
          />
          <StatCard
            label="Active Headlines"
            value={latestHeadlines.length}
            sub="External developments under current monitoring."
          />
          <StatCard
            label="Iran Radar"
            value={iranItems.length}
            sub="Conflict escalation, shipping risk, and strike indicators."
          />
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                  Latest Filed Reports
                </h2>
                <p className="mt-1 text-sm text-zinc-600 sm:text-base">
                  Newly published Liberty Soldiers reports and analysis.
                </p>
              </div>
            </div>

            <a
              href="/reports"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              Open reports desk <span className="text-red-600">→</span>
            </a>
          </div>

          <Carousel title="" subtitle="">
            {latestPublished.map((article) => (
              <FiledReportCard key={article.slug} article={article} />
            ))}
          </Carousel>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                  Featured Reports
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-zinc-600 sm:text-base">
                  Original Liberty Soldiers reporting, investigations, and field analysis.
                </p>
              </div>
            </div>

            <a
              href="/reports"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              View all reports <span className="text-red-600">→</span>
            </a>
          </div>

          <Carousel title="" subtitle="">
            {featuredReports.map((report) => (
              <ReportCard key={report.slug} report={report} />
            ))}
          </Carousel>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50/60 py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-start gap-3">
            <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                Escalation Tracker
              </h2>
              <p className="mt-1 text-sm text-zinc-600 sm:text-base">
                Monitored headlines tied to Iran, regional conflict, shipping risk, and military escalation.
              </p>
            </div>
          </div>

          <IranWarCarousel items={iranItems} />
        </div>
      </section>

      <EmailBand />

      <section className="border-t border-zinc-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-600 motion-safe:animate-pulse" />
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                  Active Developments
                </h2>
                <p className="mt-1 text-sm text-zinc-600 sm:text-base">
                  External signals being monitored across war, markets, policy, and systems.
                </p>
              </div>
            </div>

            <a
              href="/news"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              Full feed <span className="text-red-600">→</span>
            </a>
          </div>

          <Carousel title="" subtitle="">
            {latestHeadlines.map((item, idx) => (
              <HeadlineCard key={`${item.url}-${idx}`} item={item} />
            ))}
          </Carousel>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                <span className="h-2 w-2 rounded-full bg-black" />
                Mission Profile
              </div>

              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                Liberty Soldiers is an independent intelligence-style media platform.
              </h2>

              <p className="mt-4 leading-relaxed text-zinc-800">
                We publish investigative reporting and analytical research on global
                geopolitics, modern conflict, information warfare, psychological
                operations, and the power structures and belief systems shaping
                public perception and policy.
              </p>

              <p className="mt-3 leading-relaxed text-zinc-700">
                Our work connects breaking developments to historical patterns,
                strategic doctrine, and long-term ideological frameworks — separating
                signal from noise, fact from propaganda, and context from narrative.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Tracks
                </div>
                <div className="mt-2 text-sm font-semibold leading-relaxed text-zinc-900">
                  Geopolitics, conflict, markets, surveillance, digital identity, ideology
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Focus
                </div>
                <div className="mt-2 text-sm font-semibold leading-relaxed text-zinc-900">
                  Structural meaning, pressure points, escalation signals, narrative control
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Method
                </div>
                <div className="mt-2 text-sm font-semibold leading-relaxed text-zinc-900">
                  Monitor, compare, interpret, and file original analysis
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Goal
                </div>
                <div className="mt-2 text-sm font-semibold leading-relaxed text-zinc-900">
                  Situational awareness with clarity, context, and signal discipline
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}