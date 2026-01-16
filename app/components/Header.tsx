"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter, FaYoutube, FaPlay } from "react-icons/fa6";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand (left) */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/liberty-logo.png"
            alt="Liberty Soldiers Logo"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <span className="font-extrabold tracking-widest text-lg sm:text-xl text-zinc-900">
            LIBERTY SOLDIERS
          </span>
        </Link>

        {/* Center: socials + nav (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              aria-label="Liberty Soldiers on X"
              className="text-zinc-600 hover:text-zinc-900"
            >
              <FaXTwitter className="h-4 w-4" />
            </a>

            <a
              href="https://www.youtube.com/@LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              aria-label="Liberty Soldiers on YouTube"
              className="text-zinc-600 hover:text-zinc-900"
            >
              <FaYoutube className="h-4 w-4" />
            </a>

            <a
              href="https://rumble.com/c/LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              aria-label="Liberty Soldiers on Rumble"
              className="text-zinc-600 hover:text-zinc-900"
            >
              <FaPlay className="h-4 w-4" />
            </a>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6 text-sm text-zinc-800">
            <Link href="/news" className="hover:text-zinc-600">
              News
            </Link>
            <Link href="/store" className="hover:text-zinc-600">
              Store
            </Link>
          </nav>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden px-3 py-2 border border-zinc-300 rounded-lg text-sm text-zinc-800"
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
          className="md:hidden bg-white border-t border-zinc-200 px-4 py-4 flex flex-col gap-4 text-base text-zinc-800"
          onClick={() => setOpen(false)}
        >
          {/* Socials (mobile) */}
          <div className="flex items-center gap-5">
            <a
              href="https://x.com/LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.youtube.com/@LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900"
            >
              <FaYoutube />
            </a>
            <a
              href="https://rumble.com/c/LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900"
            >
              <FaPlay />
            </a>
          </div>

          <Link href="/news" className="hover:text-zinc-600">
            News
          </Link>
          <Link href="/store" className="hover:text-zinc-600">
            Store
          </Link>
        </nav>
      )}
    </header>
  );
}
