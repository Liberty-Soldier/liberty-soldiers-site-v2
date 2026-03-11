// app/news/share/page.tsx
import type { Metadata } from "next";
import ShareClient from "./ShareClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

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

function cleanSummary(summary?: string): string {
  if (!summary) return "";
  return summary
    .replace(/<[^>]*>/g, " ")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function truncate(text: string, max = 220) {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "").trim() + "…";
}

type SP = { searchParams: Record<string, string | string[] | undefined> };

export async function generateMetadata({ searchParams }: SP): Promise<Metadata> {
  const uRaw = searchParams.u;
  const tRaw = searchParams.t;
  const sRaw = searchParams.s;
  const iRaw = searchParams.i;
  const xRaw = searchParams.x;
  const pRaw = searchParams.p;

  const u = typeof uRaw === "string" ? safeDecode(uRaw) : "";
  const title = typeof tRaw === "string" ? safeDecode(tRaw) : "Shared Headline";
  const source = typeof sRaw === "string" ? safeDecode(sRaw) : hostFromUrl(u);
  const img = typeof iRaw === "string" ? safeDecode(iRaw) : "";
  const summary = typeof xRaw === "string" ? safeDecode(xRaw) : "";
  const publishedAt =
    typeof pRaw === "string" ? Number(safeDecode(pRaw)) : undefined;

  const cleanedSummary = cleanSummary(summary);

  const desc = cleanedSummary
    ? truncate(cleanedSummary, 220)
    : source
      ? `Key external reporting from ${source}, shared by Liberty Soldiers for situational awareness and analysis.`
      : "External reporting shared by Liberty Soldiers for situational awareness and analysis.";

  const pageTitle = `${title} | Liberty Soldiers`;

  const canonical =
    u
      ? `https://libertysoldiers.com/news/share?u=${encodeURIComponent(u)}&t=${encodeURIComponent(
          title
        )}&s=${encodeURIComponent(source)}${
          img ? `&i=${encodeURIComponent(img)}` : ""
        }${
          cleanedSummary ? `&x=${encodeURIComponent(cleanedSummary)}` : ""
        }${
          publishedAt ? `&p=${encodeURIComponent(String(publishedAt))}` : ""
        }`
      : "https://libertysoldiers.com/news";

  const OG_FALLBACK = "https://libertysoldiers.com/og-default.jpg?v=2";
  const ogImage = img && /^https?:\/\//i.test(img) ? img : OG_FALLBACK;

  return {
    metadataBase: new URL("https://libertysoldiers.com"),
    title: pageTitle,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: desc,
      url: canonical,
      siteName: "Liberty Soldiers",
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: desc,
      images: [ogImage],
    },
  };
}

export default function ShareNewsItemPage({ searchParams }: SP) {
  return <ShareClient searchParams={searchParams} />;
}
