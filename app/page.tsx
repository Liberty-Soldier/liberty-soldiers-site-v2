export const revalidate = 600;

type Item = { title: string; url: string; source: string; publishedAt?: number };

import { fetchAllHeadlines } from "@/lib/rss";

function humanAgo(input?: number | string | Date): string {
  if (!input) return "Just now";
  const ts = typeof input === "number" ? input : new Date(input).getTime();
  if (!Number.isFinite(ts)) return "Just now";
  const diff = Date.now() - ts;
  const sec = Math.max(1, Math.floor(diff / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

export default async function Home() {
  let items: Item[] = [];
  try {
    items = await fetchAllHeadlines();
  } catch {
    items = [];
  }

  const top = items.slice(0, 6);

  // ✅ Update this title text anytime you publish a new video
  const VIDEO_ID = "WeFeWyonzgc";
  const VIDEO_TITLE = "Latest Liberty Soldiers Video";
  const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] sm:h-[80vh] w-full flex items-center">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              LIBERTY SOLDIERS
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl">
              Exposing deception. Standing For Truth.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/news"
                className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90"
              >
                News Feed
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Report (your own content) */}
<section className="py-12 sm:py-16 border-t border-white/10">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-end justify-between gap-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold">Latest Report</h2>
        <p className="mt-1 text-white/70">
          Original Liberty Soldiers investigative reports.
        </p>
      </div>

      <a href="/news" className="text-sm hover:text-white/80">
        View all →
      </a>
    </div>

    <a
      href="/news/dispensationalism-middle-east"
      className="mt-6 block w-full rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold">
          How Dispensationalism Scripts the Middle East
        </h3>
        <span className="text-sm text-white/70">Read →</span>
      </div>

      <p className="mt-2 max-w-3xl text-white/80">
        From Sunday sermons to congressional votes, a theology that reshapes foreign policy.
      </p>
    </a>
  </div>
</section>


      {/* Featured Video (card style like news links) */}
      <section className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Video</h2>
              <p className="mt-1 text-white/70">Latest release from Liberty Soldiers.</p>
            </div>
            <a
              href="https://www.youtube.com/@LibertySoldiers/videos"
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:text-white/80"
            >
              All videos →
            </a>
          </div>

          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/30 transition"
          >
            <span className="text-[11px] uppercase tracking-wide text-white/60">YouTube</span>
            <h3 className="mt-2 text-xl font-bold leading-snug">{VIDEO_TITLE}</h3>
            <p className="mt-2 text-white/80 max-w-3xl">
              Primary video briefing. External playback.
            </p>
            <div className="mt-4 text-sm text-white/70">Watch →</div>
          </a>
        </div>
      </section>

      {/* Latest Headlines (News feed preview) */}
      <section className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold">Latest Headlines</h2>

    <p className="mt-1 text-white/70">
      Live headlines relevant to world events and prophetic times.
    </p>

    <p className="mt-1 text-xs text-white/40">
      External sources for situational awareness. Not endorsements.
    </p>
  </div>

  <a href="/news" className="text-sm hover:text-white/80">
    Full feed →
  </a>
</div>


          {top.length === 0 ? (
            <div className="mt-6 rounded-xl border border-white/10 p-6 text-white/70">
              No headlines yet.
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {top.map((h, idx) => (
                <a
                  key={idx}
                  href={h.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-white/10 p-4 bg-white/5 hover:border-white/30 transition"
                >
                  <span className="text-[11px] uppercase tracking-wide text-white/60">{h.source}</span>
                  <h3 className="mt-1 font-semibold leading-snug hover:underline">{h.title}</h3>
                  <span className="text-xs text-white/50">{humanAgo(h.publishedAt)}</span>
                </a>
              ))}
            </div>
          )}

          <div className="mt-8">
            <a
              href="/news"
              className="inline-flex items-center rounded-xl border border-white/15 px-5 py-3 text-sm hover:border-white/35 transition"
            >
              View the full News Feed →
            </a>
          </div>
        </div>
      </section>

      {/* Who we are (editable blurb) */}
      <section className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Who is Liberty Soldiers</h2>
          <p className="mt-3 text-white/90 leading-relaxed">
            We publish investigative reports—Scripture first—exposing deception and calling people out of man-made
            constructs of the mind and back to truth. Liberty Soldiers exists to challenge false doctrine,
            manufactured narratives, and modern religious compromise. We prioritize documented sources, Scripture,
            and accountability over opinion, tradition, or consensus.
          </p>
        </div>
      </section>
    </div>
  );
}








