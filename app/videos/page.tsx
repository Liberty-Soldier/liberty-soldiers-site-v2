// app/videos/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Videos | Liberty Soldiers",
  description:
    "Liberty Soldiers video content is published externally for availability and reach. Use the links here to view releases and briefings.",
  alternates: { canonical: "https://libertysoldiers.com/videos" },
};

const CHANNELS = [
  {
    name: "YouTube",
    label: "Primary releases",
    desc: "Video releases, investigative reports, and briefings.",
    href: "https://www.youtube.com/@LibertySoldiers", //
    cta: "View channel",
    accent: "bg-black/80",
  },
  {
    name: "Rumble",
    label: "Mirror uploads",
    desc: "Mirror uploads and extended availability.",
    href: "https://rumble.com/user/LibertySoldiers", //
    cta: "View channel",
    accent: "bg-zinc-300",
  },
];

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Top header row */}
        <div className="mb-8 flex items-start justify-between gap-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Videos
            </h1>

            <p className="mt-2 text-zinc-600 leading-relaxed">
              Liberty Soldiers video reports publish externally for availability and reach.
              Use the channels below to follow new drops and briefings.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-[6px] w-[6px] rounded-full bg-zinc-400" />
                Filed for distribution
              </span>
              <span className="text-zinc-300">•</span>
              <span>External platforms for redundancy</span>
            </div>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 whitespace-nowrap"
          >
            ← Home
          </Link>
        </div>

        {/* Hero band */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Watch locations
                </div>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Follow the official channels
                </h2>
                <p className="mt-2 text-zinc-600 max-w-2xl">
                  New releases may drop on one platform first. Subscribing to both improves
                  reliability and reach.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                  Live
                </span>
              </div>
            </div>

            {/* Channel cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHANNELS.map((c) => (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-zinc-200 bg-zinc-50/40 p-5 transition hover:border-zinc-300 hover:bg-white hover:shadow-sm"
                >
                  <div className="relative pl-4">
                    {/* signal line */}
                    <div
                      className={`absolute left-0 top-0 h-full w-[3px] rounded-full ${c.accent}`}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                          {c.label}
                        </div>
                        <h3 className="mt-2 text-xl font-extrabold tracking-tight">
                          {c.name}
                        </h3>
                      </div>

                      <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                        Official
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                      {c.desc}
                    </p>

                    <div className="mt-4 inline-flex items-center text-sm font-semibold text-zinc-900">
                      {c.cta}
                      <span className="ml-1 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Intentional “coming soon” panel */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="relative pl-4">
                <div className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-zinc-200" />
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Archive
                </div>
                <h3 className="mt-2 text-lg font-extrabold tracking-tight">
                  Searchable video index coming later
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed max-w-3xl">
                  This page will evolve into a browsable archive (topics, series, and tags).
                  For now, all releases are hosted on the platforms above.
                </p>

                {/* Optional: tiny roadmap bullets */}
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-zinc-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    Series pages (Anathema, Briefings, etc.)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    Tags + search (topics & keywords)
                  </li>
                </ul>
              </div>
            </div>

            {/* OPTIONAL SECTION: enable later when you want a “latest drop” */}
            {/* <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Latest drop
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                Add your newest video link here when ready.
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
