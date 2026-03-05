// app/search/page.tsx
import Link from "next/link";
import { fetchAllHeadlines } from "@/lib/rss";
import { REPORTS } from "@/lib/reports";

export const revalidate = 300;

function norm(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreMatch(haystack: string, qTokens: string[]) {
  let score = 0;
  for (const t of qTokens) {
    if (!t) continue;
    if (haystack.includes(t)) score += 2; // token present
  }
  // small boost if exact phrase appears
  const phrase = qTokens.join(" ");
  if (phrase.length > 2 && haystack.includes(phrase)) score += 3;
  return score;
}

function humanTime(ms?: number) {
  if (!ms || !Number.isFinite(ms)) return "";
  try {
    return new Date(ms).toLocaleString();
  } catch {
    return "";
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const qRaw = (searchParams?.q ?? "").toString();
  const q = norm(qRaw);
  const qTokens = q.split(" ").filter(Boolean).slice(0, 8);

  const [headlines] = await Promise.all([fetchAllHeadlines()]);

  // Reports search
  const reportHits = REPORTS.map((r) => {
    const hay = norm(`${r.title} ${r.excerpt} ${r.byline ?? ""}`);
    return { r, score: scoreMatch(hay, qTokens) };
  })
    .filter((x) => (q ? x.score > 0 : true))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  // Headlines search
  const headlineHits = headlines
    .map((h) => {
      const hay = norm(`${h.title} ${h.summary ?? ""} ${h.source ?? ""}`);
      return { h, score: scoreMatch(hay, qTokens) };
    })
    .filter((x) => (q ? x.score > 0 : true))
    .sort((a, b) => b.score - a.score)
    .slice(0, 50);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
          Search
        </h1>
        <p className="text-zinc-600">
          Search across live headlines + Liberty Soldiers reports.
        </p>
      </div>

      {/* Search box */}
      <form action="/search" method="get" className="mt-6">
        <div className="flex gap-2">
          <input
            name="q"
            defaultValue={qRaw}
            placeholder="Search (e.g., Iran, sanctions, digital ID, proxy, central bank...)"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-zinc-900 px-5 py-3 text-base font-semibold text-white hover:bg-zinc-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold text-zinc-900">Reports</h2>
            <Link
              href="/reports"
              className="text-sm font-semibold text-zinc-700 hover:text-zinc-900 hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {reportHits.length === 0 ? (
              <p className="text-sm text-zinc-600">No report matches yet.</p>
            ) : (
              reportHits.map(({ r }) => (
                <Link
                  key={r.slug}
                  href={`/news/${r.slug}`}
                  className="block rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 hover:bg-zinc-100"
                >
                  <div className="text-sm text-zinc-500">{r.dateISO}</div>
                  <div className="mt-1 font-semibold text-zinc-900">
                    {r.title}
                  </div>
                  <div className="mt-1 text-sm text-zinc-700 line-clamp-2">
                    {r.excerpt}
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Headlines */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold text-zinc-900">Live Headlines</h2>
            <Link
              href="/news"
              className="text-sm font-semibold text-zinc-700 hover:text-zinc-900 hover:underline"
            >
              Full feed →
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {headlineHits.length === 0 ? (
              <p className="text-sm text-zinc-600">No headline matches yet.</p>
            ) : (
              headlineHits.map(({ h }) => (
                <a
                  key={h.url}
                  href={h.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-zinc-200 bg-white px-4 py-3 hover:bg-zinc-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-semibold text-zinc-600">
                      {h.source}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {humanTime(h.publishedAt)}
                    </div>
                  </div>
                  <div className="mt-1 font-semibold text-zinc-900">
                    {h.title}
                  </div>
                  {h.summary ? (
                    <div className="mt-1 text-sm text-zinc-700 line-clamp-2">
                      {h.summary}
                    </div>
                  ) : null}
                </a>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Tip */}
      <div className="mt-8 text-sm text-zinc-500">
        Tip: use 1–3 keywords for best results.
      </div>
    </div>
  );
}
