import Header from "./components/Header";
import ClearSW from '../components/ClearSW';
import "../styles/globals.css";
import React from "react";
import Image from "next/image"; // ✅ default import (no curly braces)

export const metadata = {
  title: "Liberty Soldiers",
  description: "Seeking truth, defending Torah, and fighting deception.",
  openGraph: {
    title: "Liberty Soldiers",
    description: "Investigative reports. Scripture-first.",
    url: "https://libertysoldiers.com",
    siteName: "Liberty Soldiers",
  },
  icons: {
    icon: "/icon.png", // main favicon / PWA icon
    apple: "/apple-touch-icon.png", // icon for iPhone/iPad
  },
  manifest: "/manifest.json", // manifest tells phones what to show when "Add to Home Screen"
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className="min-h-screen">
        <Header />
        <main>{children}</main>
        <footer className="border-t border-white/10 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">© {new Date().getFullYear()} Liberty Soldiers. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm">
              <a href="/about" className="hover:text-white/80">About</a>
              <a href="/about#contact" className="hover:text-white/80">Contact</a>
              <a href="/legal" className="hover:text-white/80">Privacy & Terms</a>
            </div>
          </div>
        </footer>
        <ClearSW />
      </body>
    </html>
  );
}





