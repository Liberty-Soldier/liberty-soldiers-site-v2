import Link from "next/link";
import Image from "next/image";

type Item = {
  title: string;
  url: string;
  source?: string;
  published?: string; // ISO string if you have it
  ogImage?: string | null; // resolved OG if you already compute it
  category?: string;
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
              const og = it.ogImage || fallbackOg;
              const src = it.source || hostFromUrl(it.url);
              const time = displayTime(it.published);

              return (
                <a
                  key={`${it.url}-${idx}`}
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-[340px] shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="relative h-[90px] w-[140px] shrink-0 bg-neutral-100">
                    <Image
                      src={og}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="140px"
                      priority={idx < 4}
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
