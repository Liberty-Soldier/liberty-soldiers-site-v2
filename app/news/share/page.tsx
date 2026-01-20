// app/news/share/page.tsx
import type { Metadata } from "next";
import ShareClient from "./ShareClient";

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
      images: ["https://libertysoldiers.com/og.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: desc,
      images: ["https://libertysoldiers.com/og.jpg"],
    },
  };
}

export default function ShareNewsItemPage({ searchParams }: SP) {
  return <ShareClient searchParams={searchParams} />;
}
