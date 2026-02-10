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

export async function generateMetadata({
  params,
}: {
  params: { u: string };
}): Promise<Metadata> {
  const decoded = safeDecode(params.u);
  const source = hostFromUrl(decoded);

  // Basic safety: if it isn't an http(s) URL, keep metadata generic
  const title = source ? `Shared link • ${source}` : "Shared link • Liberty Soldiers";

  return {
    title,
    description: "External link shared via Liberty Soldiers.",
    metadataBase: new URL("https://libertysoldiers.com"),
    openGraph: {
      title,
      description: "External link shared via Liberty Soldiers.",
      type: "website",
      url: `/news/${params.u}`,
      images: [
        {
          url: "/og-default.jpg", // make sure this exists in /public
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "External link shared via Liberty Soldiers.",
      images: ["/og-default.jpg"],
    },
  };
}

export default function NewsWrappedLinkPage({ params }: { params: { u: string } }) {
  const decoded = safeDecode(params.u);
  const ok = isHttpUrl(decoded);
  const source = ok ? hostFromUrl(decoded) : "";

  const thumb = ok ? faviconFromUrl(decoded) : "/briefing-fallback.jpg";

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
            <img src={thumb} alt="" className="h-44 w-full object-cover" loading="lazy" />
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

          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
            External link
          </h1>

          <p className="mt-2 text-sm text-zinc-700">
            This link is shared for situational awareness. Liberty Soldiers provides context and
            analysis.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={ok ? decoded : "#"}
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
