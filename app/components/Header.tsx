"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter, FaYoutube, FaPlay, FaNewspaper, FaFileLines, FaVideo } from "react-icons/fa6";

export default function Header() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand (left) */}
        <Link href="/" className="flex items-center gap-3 group" onClick={close}>
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

        {/* Desktop nav + socials */}
        <div className="hidden md:flex items-center gap-8">
          {/* Nav links */}
         <nav className="flex items-center gap-6 text-sm text-zinc-800">
          <Link href="/news" className="hover:text-zinc-600">
            News
          </Link>
        
          <Link href="/war-escalation" className="hover:text-zinc-600">
            War Radar
          </Link>
        
          <Link href="/reports" className="hover:text-zinc-600">
            Reports
          </Link>
        
          <Link href="/videos" className="hover:text-zinc-600">
            Videos
          </Link>
        
          <Link href="/store" className="hover:text-zinc-600">
            Store
          </Link>
        </nav>
          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/LibertySoldierz"
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
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
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
          className="md:hidden bg-white border-t border-zinc-200 px-4 py-4 flex flex-col gap-3 text-base text-zinc-900"
        >
          {/* Quick links (mobile) */}
          <Link
            href="/news"
            className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 hover:bg-zinc-100"
            onClick={close}
          >
            <FaNewspaper className="h-4 w-4 text-zinc-600" />
            <span>News</span>
          </Link>

          <Link
            href="/reports"
            className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 hover:bg-zinc-100"
            onClick={close}
          >
            <FaFileLines className="h-4 w-4 text-zinc-600" />
            <span>Reports</span>
          </Link>

          {/* Only keep this if /videos exists (recommended). Otherwise link to YouTube videos page. */}
          <Link
            href="/videos"
            className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 hover:bg-zinc-100"
            onClick={close}
          >
            <FaVideo className="h-4 w-4 text-zinc-600" />
            <span>Videos</span>
          </Link>

          <Link
            href="/store"
            className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 hover:bg-zinc-100"
            onClick={close}
          >
            <span className="font-semibold text-zinc-700">$</span>
            <span>Store</span>
          </Link>

          {/* Socials (mobile) */}
          <div className="mt-2 flex items-center gap-5">
            <a
              href="https://x.com/LibertySoldierz"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900"
              aria-label="X"
              onClick={close}
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.youtube.com/@LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900"
              aria-label="YouTube"
              onClick={close}
            >
              <FaYoutube />
            </a>
            <a
              href="https://rumble.com/c/LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900"
              aria-label="Rumble"
              onClick={close}
            >
              <FaPlay />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
