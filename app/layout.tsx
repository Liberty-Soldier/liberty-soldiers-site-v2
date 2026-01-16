import type { Metadata } from "next";
import Header from "./components/Header";
import ClearSW from "../components/ClearSW";
import "../styles/globals.css";
import React from "react";
import EmailSignup from "./components/EmailSignup";

export const metadata: Metadata = {
  title: "Liberty Soldiers",
  description: "Investigative reports. Scripture-first.",
  metadataBase: new URL("https://libertysoldiers.com"),

  openGraph: {
    title: "Liberty Soldiers",
    description: "Investigative reports. Scripture-first.",
    url: "https://libertysoldiers.com",
    siteName: "Liberty Soldiers",
    type: "website",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Liberty Soldiers" },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Liberty Soldiers",
    description: "Investigative reports. Scripture-first.",
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
        © {new Date().getFullYear()} Liberty Soldiers. All rights reserved.
      </p>
    </div>
  </div>
</footer>






