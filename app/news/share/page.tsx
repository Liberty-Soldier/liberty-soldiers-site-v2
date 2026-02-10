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

type SP = { searchParams: Record<string, string | string[] | undefined> };

export async function generateMetadata({ searchParams }: SP): Promise<Metadata> {
  const uRaw = searchParams.u;
  const tRaw = searchParams.t;
  const sRaw = searchParams.s;
  const iRaw = searchParams.i; // optional image URL

  const u = typeof uRaw === "string" ? safeDecode(uRaw) : "";
  const title = typeof tRaw === "string" ? safeDecode(tRaw) : "Shared Headline";

  // If s is missing, infer from u
  const source =
    typeof sRaw === "string" ? safeDecode(sRaw) : hostFromUrl(u);

  // Optional image passed in
  const img = typeof iRaw === "string" ? safeDecode(iRaw) : "";

  const pageTitle = `${title} | Liberty Soldiers`;
  const desc = source
    ? `Shared for situational awareness (source: ${source}).`
    : "Shared for situational awareness.";

  // Canonical should be your wrapper URL (not the original article)
  const canonical =
    u
      ? `https://libertysoldiers.com/news/share?u=${encodeURIComponent(u)}&t=${encodeURIComponent(
          title
        )}&s=${encodeURIComponent(source)}${img ? `&i=${encodeURIComponent(img)}` : ""}`
      : "https://libertysoldiers.com/news";

  // Use article image if provided; otherwise fallback to your default OG image
  const ogImage = img && /^https?:\/\//i.test(img)
    ? img
    : "https://libertysoldiers.com/og.jpg";

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
      images: [{ url: ogImage }],
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
