// app/news/[u]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

function safeDecode(input: string) {
  try {
    return decodeURIComponent(input);
  } catch {
    return input;
  }
}

function isHttpUrl(u: string) {
  return /^https?:\/\/.+/i.test(u);
}

function hostFromUrl(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function faviconFromUrl(articleUrl: string): string {
  try {
    const u = new URL(articleUrl);
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
      u.hostname
    )}&sz=128`;
  } catch {
    return "/briefing-fallback.jpg";
  }
}

function cleanSummary(summary?: string): string {
  if (!summary) return "";
  return summary
    .replace(/<[^>]*>/g, " ")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function bulletsFromSummary(summary?: string): string[] {
  const clean = cleanSummary(summary);
  if (!clean) return [];

  // Try bullet-ish separators first
  const preBullets = clean
    .split(/(?:•|·|\u2022|\s-\s|\s—\s)/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (preBullets.length >= 2) {
    return preBullets
      .slice(0, 2)
      .map((s) => (/[.!?]$/.test(s) ? s : s + "."));
  }

  // Otherwise take first 2 sentences
  const parts = clean
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length >= 2) return parts.slice(0, 2);

  // Fallback chunking
  const chunk1 = clean.slice(0, 110).trim();
  const chunk2 = clean.slice(110, 220).trim();

  return [chunk1, chunk2]
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => (/[.!?]$/.test(s) ? s : s + "."));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { u: string };
  searchParams?: Record<string, string | string[] | undefined>;
}): Promise<Metadata> {
  const decodedUrl = safeDecode(params.u);
  const ok = isHttpUrl(decodedUrl);
  const source = ok ? hostFromUrl(decodedUrl) : "";

  const tRaw = searchParams?.t;
  const xRaw = searchParams?.x;

  const titleFromQuery =
    typeof tRaw === "string" ? safeDecode(tRaw).trim() : "";

  const summaryFromQuery =
    typeof xRaw === "string" ? safeDecode(xRaw) : "";

  const bullets = bulletsFromSummary(summaryFromQuery);
  const ogDesc =
    bullets[0] ||
    "External reporting shared via Liberty Soldiers for situational awareness.";

  // ✅ This is what Android Messages will show as the card title
  // Keep it headline-first, with source as context.
  const ogTitle = titleFromQuery
    ? `${titleFromQuery}${source ? ` • ${source}` : ""}`
    : source
    ? `Liberty Soldiers • ${source}`
    : "Liberty Soldiers";

  return {
    title: ogTitle,
    description: ogDesc,
    metadataBase: new URL("https://libertysoldiers.com"),
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      siteName: "Liberty Soldiers",
      type: "website",
      url: `/news/${params.u}`,
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: ["/og-default.jpg"],
    },
  };
}

export default function NewsWrappedLinkPage({
  params,
  searchParams,
}: {
  params: { u: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const decodedUrl = safeDecode(params.u);
  const ok = isHttpUrl(decodedUrl);
  const source = ok ? hostFromUrl(decodedUrl) : "";

  const tRaw = searchParams?.t;
  const xRaw = searchParams?.x;

  const headline =
    typeof tRaw === "string" && safeDecode(tRaw).trim()
      ? safeDecode(tRaw).trim()
      : "Liberty Soldiers Intelligence Brief";

  const summary =
    typeof xRaw === "string" ? safeDecode(xRaw) : "";

  const bullets = bulletsFromSummary(summary);

  const thumb = ok ? faviconFromUrl(decodedUrl) : "/briefing-fallback.jpg";

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between gap-4">
          <Link href="/news" className="text-sm text-zinc-700 hover:text-zinc-900">
            ← Back to News
          </Link>
          <Link href="/" className="text-sm text-zinc-700 hover:text-zinc-900">
            Home →
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-4 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
            <img
              src={thumb}
              alt=""
              className="h-44 w-full object-cover"
              loading="lazy"
            />
          </div>

          <p className="text-[11px] uppercase tracking-wide text-zinc-500">
            Shared via Liberty Soldiers
          </p>

          {source ? (
            <div className="mt-3 text-xs text-zinc-600">
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5">
                Source: {source}
              </span>
            </div>
          ) : null}

          {/* ✅ Headline shown on the wrapper page */}
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
            {headline}
          </h1>

          <p className="mt-2 text-sm text-zinc-700">
            External reporting shared for situational awareness. Liberty Soldiers may add context
            and analysis separately.
          </p>

          {/* ✅ “Quick brief” summary BEFORE opening original */}
          {bullets.length > 0 && (
            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
                Quick brief
              </div>
              <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-zinc-400">•</span>
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={ok ? decodedUrl : "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Open original source →
            </a>
          </div>

          {!ok ? (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Invalid or missing URL.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
