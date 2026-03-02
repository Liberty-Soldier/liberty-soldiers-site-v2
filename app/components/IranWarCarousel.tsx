import Link from "next/link";
import Image from "next/image";

type Item = {
  title: string;
  url: string;
  source?: string;
  publishedAt?: number;
  image?: string;
};

function hostFromUrl(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function displayTime(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const SOURCE_OG_MAP: Record<string, string> = {
  "aljazeera.com": "/og-aljazeera.jpg",
  "worthynews.com": "/og-worthy news.jpg",
  "realclearreligion.org": "/og-real clear religion.jpg",
  "cbn.com": "/og-cbn.jpg",
  "olivetreeviews.org": "/og-olive tree ministries.jpg",
};

// matches subdomains too (e.g. www., feeds., etc.)
function sourceFallbackOg(url: string): string | undefined {
  const h = hostFromUrl(url).toLowerCase();
  const key = Object.keys(SOURCE_OG_MAP).find((k) => h.includes(k));
  return key ? SOURCE_OG_MAP[key] : undefined;
}

export default function IranWarCarousel({
  items,
  fallbackOg = "/og-iran-war.jpg",
}: {
  items: Item[];
  fallbackOg?: string;
}) {
  if (!items?.length) return null;

  // Duplicate items to create an “infinite” marquee feel
  const loop = [...items, ...items];

  return (
    <section className="w-full">
      <div className="mb-2 flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-neutral-500">
            Live Conflict Feed
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Iran War Updates</h2>
        </div>

        <Link
          href="/iran-war"
          className="text-sm text-neutral-700 hover:text-neutral-900 underline underline-offset-4"
        >
          View all
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="py-3 overflow-hidden">
        <div className="flex w-max gap-3 px-3 animate-marquee hover:[animation-play-state:paused]">  
            {loop.map((it, idx) => {
              const og = it.image || sourceFallbackOg(it.url) || fallbackOg;
              const src = it.source || hostFromUrl(it.url);
              const time = it.publishedAt
              ? displayTime(new Date(it.publishedAt).toISOString())
              : "";

              return (
                <a
                  key={`${it.url}-${idx}`}
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-[340px] shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="relative h-[90px] w-[140px] shrink-0 bg-neutral-100">
                    <img
                      src={og}
                      alt=""
                      className="h-full w-full object-cover"
                      loading={idx < 4 ? "eager" : "lazy"}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col p-3">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                      <span className="truncate">{src}</span>
                      {time ? <span className="text-neutral-300">•</span> : null}
                      {time ? <span className="truncate">{time}</span> : null}
                    </div>

                    <div className="mt-1 line-clamp-3 text-sm font-medium text-neutral-900 group-hover:underline underline-offset-4">
                      {it.title}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
