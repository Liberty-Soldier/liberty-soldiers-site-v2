import type { Metadata } from "next";
import React from "react";
import Script from "next/script";

import Header from "./components/Header";
import TopicStrip from "./components/TopicStrip";
import EmailSignup from "./components/EmailSignup";
import ClearSW from "../components/ClearSW";
import "../styles/globals.css";

const GA_MEASUREMENT_ID = "G-6HE5GBG1H2";
const GOOGLE_ADS_ID = "AW-17340858149";

const SITE_URL = "https://libertysoldiers.com";
const SITE_NAME = "Liberty Soldiers";
const X_URL = "https://x.com/LibertySoldierz";
const YT_URL = "https://www.youtube.com/@LibertySoldiers";

export const metadata: Metadata = {
  title: "Liberty Soldiers",
  description:
    "Independent situational awareness and investigative analysis of power, perception, and emerging systems shaping the world.",
  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: `${SITE_URL}/`,
  },

  openGraph: {
    title: "Liberty Soldiers",
    description:
      "Independent situational awareness and investigative analysis of power, perception, and emerging systems shaping the world.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Liberty Soldiers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Liberty Soldiers",
    description:
      "Independent situational awareness and investigative analysis of power, perception, and emerging systems shaping the world.",
    images: ["/og-default.jpg"],
  },

  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-50 text-zinc-900">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">

        {/* ✅ ADSENSE AUTO ADS SCRIPT (NEW — VERY IMPORTANT) */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5473357618900232"
          crossOrigin="anonymous"
        />

        {/* GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              anonymize_ip: true,
              send_page_view: true
            });
          `}
        </Script>

        {/* Google Ads Conversion Tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>

        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/icon.png`,
              sameAs: [X_URL, YT_URL],
            }),
          }}
        />

        {/* JSON-LD WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
            }),
          }}
        />

        <ClearSW />
        <Header />
        <TopicStrip />

        <main>{children}</main>

       <footer className="border-t border-zinc-200 py-8 mt-12">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mb-6">
      <EmailSignup
        title="Get Liberty Soldiers briefings"
        subtitle="Email only when new reports publish. No spam."
      />
    </div>

    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-zinc-600">
        © {new Date().getFullYear()} Liberty Soldiers. All rights reserved.
      </p>

      <nav
        aria-label="Footer"
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-600"
      >
        <a href="/about" className="hover:text-zinc-900">
          About
        </a>
        <a href="/contact" className="hover:text-zinc-900">
          Contact
        </a>
        <a href="/privacy" className="hover:text-zinc-900">
          Privacy
        </a>
        <a href="/terms" className="hover:text-zinc-900">
          Terms
        </a>
      </nav>
    </div>
  </div>
</footer>

      </body>
    </html>
  );
}
