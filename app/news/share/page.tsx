// app/news/share/page.tsx
import type { Metadata } from "next";

export const revalidate = 600;

function safeDecode(input: string) {
  try {
    return decodeURIComponent(input);
  } catch {
    return input;
  }
}

function hostFromUrl(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

type SP = { searchParams: Record<string, string | string[] | undefined> };

export async function generateMetadata({ searchParams }: SP): Promise<Metadata> {
  const uRaw = searchParams.u;
  const sRaw = searchParams.s;
  const tRaw = searchParams.t;

  const u = typeof uRaw === "string" ? safeDecode(uRaw) : "";
  const source = typeof sRaw === "string" ? safeDecode(sRaw) : hostFromUrl(u);
  const title = typeof tRaw === "string" ? safeDecode(tRaw) : "Shared Headline";

  const pageTitle = `${title} | Liberty Soldiers`;
  const desc = source
    ? `Shared for situational awareness (source: ${source}).`
    : "Shared for situational awareness.";

  const canonical =
    u
      ? `https://libertysoldiers.com/news/share?u=${encodeURIComponent(u)}&t=${encodeURIComponent(
          title
        )}&s=${encodeURIComponent(source)}`
      : "https://libertysoldiers.com/news";

  return {
    title: pageTitle,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: desc,
      url: canonical,
      siteName: "Liberty Soldiers",
      type: "article",
      images: ["/og.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: desc,
      images: ["/og.jpg"],
    },
  };
}

export default function ShareNewsItemPage({ searchParams }: SP) {
  const uRaw = searchParams.u;
  const tRaw = searchParams.t;
  const sRaw = searchParams.s;
  const pRaw = searchParams.p;

  const url = typeof uRaw === "string" ? safeDecode(uRaw) : "";
  const title = typeof tRaw === "string" ? safeDecode(tRaw) : "Shared Headline";
  const source = typeof sRaw === "string" ? safeDecode(sRaw) : hostFromUrl(url);

  const publishedAt =
    typeof pRaw === "string" ? Number(safeDecode(pRaw)) : undefined;

  const when =
    publishedAt && Number.isFinite(publishedAt)
      ? new Date(publishedAt).toLocaleString()
      : null;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <a href="/news" className="text-sm hover:text-white/80">
          ← Back to News
        </a>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-[11px] uppercase tracking-wide text-white/60">
            Shared via Liberty Soldiers
          </p>

          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
            {title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/60">
            {source ? <span>Source: {source}</span> : null}
            {when ? <span>• {when}</span> : null}
          </div>

          {/* Always-available fallback */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={url || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm hover:border-white/30"
            >
              Open original →
            </a>
          </div>

          <p className="mt-4 text-xs text-white/40">
            Some sources block embedding. If the page below is blank or shows an
            error, use “Open original”.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-bold">Liberty Soldiers Context</h2>
          <p className="mt-2 text-sm text-white/70">
            This headline is presented for situational awareness. Liberty
            Soldiers provides independent analysis and original reporting to
            help readers interpret events beyond surface narratives.
          </p>
        </div>

        {/* Embedded view by default */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <p className="text-sm text-white/70">
              Embedded view (may be blocked by the source)
            </p>
          </div>

          <iframe
            src={url}
            title={title}
            className="w-full h-[75vh]"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
}

