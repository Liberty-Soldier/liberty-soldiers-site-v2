import FallbackImg from "@/app/components/FallbackImg";

type Item = {
  title: string;
  url: string;
  source: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
  category?: string;
  hardCategory?: string;
};

function hostFromUrl(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
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

function previewFromSummary(summary?: string): string {
  const clean = cleanSummary(summary);
  if (!clean) return "";

  return clean.length > 180
    ? clean.slice(0, 177).replace(/\s+\S*$/, "").trim() + "..."
    : clean;
}

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

function fallbackForCategory(cat?: string) {
  const c = (cat || "").toLowerCase().trim();

  if (c === "power & control") return "/og-power-control.jpg";
  if (c === "markets & finance") return "/og-markets-finance.jpg";
  if (c === "digital id / technocracy") return "/og-digital-id.jpg";
  if (c === "war & geopolitics") return "/og-war-geopolitics.jpg";
  if (c === "religion & ideology") return "/og-religion-ideology.jpg";
  if (c === "prophecy watch") return "/og-prophecy-watch.jpg";

  if (c.includes("finance") || c.includes("crypto") || c.includes("markets")) {
    return "/og-markets-finance.jpg";
  }

  if (
    c.includes("digital id") ||
    c.includes("technocracy") ||
    c.includes("surveillance") ||
    c.includes("control systems") ||
    c.includes("censorship") ||
    c.includes("speech") ||
    c.includes("power") ||
    c.includes("control")
  ) {
    return "/og-digital-id.jpg";
  }

  if (
    c.includes("war") ||
    c.includes("geopolitics") ||
    c.includes("middle east") ||
    c.includes("iran")
  ) {
    return "/og-war-geopolitics.jpg";
  }

  if (
    c.includes("religion") ||
    c.includes("ideology") ||
    c.includes("persecution")
  ) {
    return "/og-religion-ideology.jpg";
  }

  if (c.includes("prophecy")) return "/og-prophecy-watch.jpg";

  return "/og-power-control.jpg";
}

function sourceFallbackForUrl(url: string): string | undefined {
  const h = hostFromUrl(url).toLowerCase();

  if (h.includes("reuters")) return "/og-reuters.jpg";
  if (h.includes("apnews")) return "/og-ap.jpg";
  if (h.includes("bbc")) return "/og-bbc.jpg";
  if (h.includes("cnn")) return "/og-cnn.jpg";
  if (h.includes("foxnews")) return "/og-fox.jpg";
  if (h.includes("aljazeera")) return "/og-aljazeera.jpg";
  if (h.includes("france24")) return "/og-france24.jpg";
  if (h.includes("timesofisrael")) return "/og-timesofisrael.jpg";
  if (h.includes("jpost")) return "/og-jpost.jpg";
  if (h.includes("tehrantimes")) return "/og-tehrantimes.jpg";
  if (h.includes("presstv")) return "/og-presstv.jpg";
  if (h.includes("zerohedge")) return "/og-zerohedge.jpg";

  return undefined;
}

function resolveThumb(h: Item) {
  const categoryFallback = fallbackForCategory(h.hardCategory || h.category);
  const sourceFallback = sourceFallbackForUrl(h.url);

  const raw = (h.image || "").trim();

  const isGenericDefault =
    raw === "/og-default.jpg" ||
    raw === "/og-default.jpeg" ||
    raw === "/default-og.jpg" ||
    raw === "/default-og.jpeg" ||
    raw.includes("og-default") ||
    raw.includes("default-og");

  const fallback = sourceFallback || categoryFallback;
  const thumb = raw && !isGenericDefault ? raw : fallback;

  return { thumb, fallback };
}

function buildNewsShareAbs(args: {
  url: string;
  title: string;
  source?: string;
  publishedAt?: number;
  image?: string;
  summary?: string;
}) {
  const sp = new URLSearchParams();

  sp.set("u", args.url);
  sp.set("t", args.title);

  const src = args.source || hostFromUrl(args.url);
  if (src) sp.set("s", src);

  if (
    typeof args.publishedAt === "number" &&
    Number.isFinite(args.publishedAt)
  ) {
    sp.set("p", String(args.publishedAt));
  }

  if (args.image) sp.set("i", args.image);

  const cleaned = cleanSummary(args.summary);
  if (cleaned) sp.set("x", cleaned);

  return `https://libertysoldiers.com/news/share?${sp.toString()}`;
}

function categoryBucket(h: Item): string {
  return (h.hardCategory || h.category || "General").trim();
}

function categoryPriority(cat: string): number {
  const c = cat.toLowerCase();

  if (c.includes("war") || c.includes("geopolitics") || c.includes("iran")) return 100;
  if (c.includes("prophecy")) return 92;
  if (c.includes("religion") || c.includes("ideology") || c.includes("persecution")) return 88;
  if (
    c.includes("digital") ||
    c.includes("technocracy") ||
    c.includes("control") ||
    c.includes("surveillance") ||
    c.includes("censorship") ||
    c.includes("speech")
  ) {
    return 84;
  }
  if (c.includes("power")) return 80;
  if (c.includes("finance") || c.includes("crypto") || c.includes("markets")) return 55;

  return 65;
}

function pickBalanced(items: Item[], total: number) {
  const sorted = items
    .filter((h) => h.category !== "Pinned")
    .slice()
    .sort((a, b) => {
      const ta = a.publishedAt || 0;
      const tb = b.publishedAt || 0;

      const pa = categoryPriority(categoryBucket(a));
      const pb = categoryPriority(categoryBucket(b));

      if (pb !== pa) return pb - pa;
      return tb - ta;
    });

  const MONEY = new Set(["Finance", "Crypto", "Markets & Finance"]);
  const maxMoney = Math.min(3, Math.ceil(total / 3));
  const perCatMax = total >= 12 ? 3 : 2;
  const perDomainMax = 1;

  const picked: Item[] = [];
  const perCat = new Map<string, number>();
  const perDomain = new Map<string, number>();
  let moneyCount = 0;

  for (const h of sorted) {
    if (picked.length >= total) break;

    const cat = categoryBucket(h);
    const domain = hostFromUrl(h.url).toLowerCase();

    const catCount = perCat.get(cat) || 0;
    const domainCount = perDomain.get(domain) || 0;

    if (catCount >= perCatMax) continue;
    if (domain && domainCount >= perDomainMax) continue;

    const isMoney =
      MONEY.has(h.category || "") ||
      MONEY.has(h.hardCategory || "") ||
      cat.toLowerCase().includes("finance") ||
      cat.toLowerCase().includes("crypto") ||
      cat.toLowerCase().includes("markets");

    if (isMoney && moneyCount >= maxMoney) continue;

    picked.push(h);
    perCat.set(cat, catCount + 1);
    if (domain) perDomain.set(domain, domainCount + 1);
    if (isMoney) moneyCount += 1;
  }

  if (picked.length < total) {
    const used = new Set(picked.map((x) => x.url));

    for (const h of sorted) {
      if (picked.length >= total) break;
      if (used.has(h.url)) continue;

      const domain = hostFromUrl(h.url).toLowerCase();
      const domainCount = perDomain.get(domain) || 0;

      if (domain && domainCount >= 2) continue;

      picked.push(h);
      used.add(h.url);
      if (domain) perDomain.set(domain, domainCount + 1);
    }
  }

  return picked;
}

function HeadlineCard({
  h,
  clampTitle = false,
  compact = false,
}: {
  h: Item;
  clampTitle?: boolean;
  compact?: boolean;
}) {
  const { thumb, fallback } = resolveThumb(h);

  const shareHrefAbs = buildNewsShareAbs({
    url: h.url,
    title: h.title,
    source: h.source,
    publishedAt: h.publishedAt,
    image: thumb.startsWith("http")
      ? thumb
      : `https://libertysoldiers.com${thumb}`,
    summary: h.summary,
  });

  return (
    <div
      className={
        compact
          ? "flex h-[420px] flex-col rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5"
          : "rounded-xl border border-zinc-200 bg-white p-4"
      }
    >
      {compact ? (
        <div className="mb-3 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
          <div className="relative w-full pt-[56.25%]">
            <FallbackImg
              src={thumb}
              alt=""
              className="absolute inset-0 block h-full w-full object-cover"
              style={{ objectPosition: "50% 15%" }}
              loading="lazy"
              fallback={fallback}
            />
          </div>
        </div>
      ) : (
        <div className="relative mb-3 h-[160px] w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 sm:h-[176px]">
          <FallbackImg
            src={thumb}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 10%" }}
            loading="lazy"
            fallback={fallback}
          />
        </div>
      )}

      <span className="text-[11px] uppercase tracking-wide text-zinc-500">
        {h.source}
      </span>

      <a href={h.url} className="mt-1 block">
        <h3
          className={[
            "font-semibold leading-snug text-zinc-900 hover:underline",
            clampTitle ? "line-clamp-2" : "",
          ].join(" ")}
        >
          {h.title}
        </h3>
      </a>

      {previewFromSummary(h.summary) && (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-700">
          {previewFromSummary(h.summary)}
        </p>
      )}

      {h.category && (
        <div className="mt-2">
          <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
            {h.category}
          </span>
        </div>
      )}

      <div className={compact ? "mt-auto flex items-center justify-between gap-3 pt-4" : "mt-3 flex items-center justify-between gap-3"}>
        <span className="text-xs text-zinc-500">{humanAgo(h.publishedAt)}</span>
        <a
          href={shareHrefAbs}
          className="text-sm font-semibold text-zinc-900 hover:underline"
        >
          Share →
        </a>
      </div>
    </div>
  );
}
export default function HomeHeadlines({
  variant = "grid",
  items = [],
}: {
  variant?: "grid" | "carousel";
  items?: Item[];
}) {

  const top =
    variant === "grid" ? pickBalanced(items, 9) : pickBalanced(items, 20);

  if (top.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 text-zinc-700">
        No headlines yet.
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {top.map((h, idx) => (
          <HeadlineCard key={`${h.url}-${idx}`} h={h} />
        ))}
      </div>
    );
  }

  return (
    <>
      {top.map((h, idx) => (
        <div
          key={`${h.url}-${idx}`}
          className="w-[88%] shrink-0 sm:w-[520px] lg:w-[640px]"
        >
          <HeadlineCard h={h} clampTitle compact />
        </div>
      ))}
    </>
  );
}
