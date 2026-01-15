"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/liberty-logo.png"
            alt="Liberty Soldiers Logo"
            width={48}
            height={48}
            className="rounded-full"
            priority
          />
          <span className="font-extrabold tracking-widest text-lg sm:text-xl">
            LIBERTY SOLDIERS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/news" className="hover:text-white/80">News</Link>
          <Link href="/store" className="hover:text-white/80">Store</Link>
        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden px-3 py-2 border border-white/20 rounded-lg text-sm"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden bg-black border-t border-white/10 px-4 py-4 flex flex-col gap-4 text-base"
          onClick={() => setOpen(false)} // close after tapping a link
        >
          <Link href="/news" className="hover:text-white/80">News</Link>
          <Link href="/store" className="hover:text-white/80">Store</Link>
        </nav>
      )}
    </header>
  );
}
