import type { Metadata } from "next";
import React from "react";
import Script from "next/script";

import Header from "./components/Header";
import EmailSignup from "./components/EmailSignup";
import ClearSW from "../components/ClearSW";
import "../styles/globals.css";

const GA_MEASUREMENT_ID = "G-6HE5GBG1H2";

export const metadata: Metadata = {
  title: "Liberty Soldiers",
  description:
    "Independent situational awareness and investigative analysis of power, perception, and emerging systems shaping the world.",
  metadataBase: new URL("https://libertysoldiers.com"),

  openGraph: {
    title: "Liberty Soldiers",
    description:
      "Independent situational awareness and investigative analysis of power, perception, and emerging systems shaping the world.",
    url: "https://libertysoldiers.com",
    siteName: "Liberty Soldiers",
    type: "website",
    images: [
      {
        url: "/og.jpg",
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
    images: ["/og.jpg"],
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
      <head>
        {/* GA4: load gtag.js */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        {/* GA4: init (Next-safe) */}
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
      </head>

      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <ClearSW />
        <Header />

        <main>{children}</main>

        <footer className="border-t border-zinc-200 py-8 mt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <EmailSignup
                title="Get Liberty Soldiers briefings"
                subtitle="Email only when new reports publish. No spam."
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-zinc-600">
                © {new Date().getFullYear()} Liberty Soldiers. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
