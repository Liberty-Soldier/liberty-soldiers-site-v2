"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaXTwitter, FaYoutube, FaPlay } from "react-icons/fa6";

type ThemeChoice = "system" | "light" | "dark";

export default function Header() {
  const [open, setOpen] = useState(false);

  // next-themes
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const ThemeControl = () => (
    <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-white/10 bg-white/70 dark:bg-white/5 px-2 py-1">
      <span className="text-[11px] tracking-wide uppercase text-zinc-600 dark:text-white/60 px-1">
        Theme
      </span>

      {/* Avoid hydration mismatch by not rendering select value until mounted */}
      <select
        aria-label="Theme"
        value={mounted ? (theme as ThemeChoice) : "system"}
        onChange={(e) => setTheme(e.target.value as ThemeChoice)}
        className="text-xs rounded-lg border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-2 py-1 outline-none"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-white/10">
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
          <span className="font-extrabold tracking-widest text-lg sm:text-xl text-zinc-900 dark:text-zinc-50">
            LIBERTY SOLDIERS
          </span>
        </Link>

        {/* Center: socials + nav (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/LibertySoldierz"
              target="_blank"
              rel="noreferrer"
              aria-label="Liberty Soldiers on X"
              className="text-zinc-600 hover:text-zinc-900 dark:text-white/70 dark:hover:text-white"
            >
              <FaXTwitter className="h-4 w-4" />
            </a>

            <a
              href="https://www.youtube.com/@LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              aria-label="Liberty Soldiers on YouTube"
              className="text-zinc-600 hover:text-zinc-900 dark:text-white/70 dark:hover:text-white"
            >
              <FaYoutube className="h-4 w-4" />
            </a>

            <a
              href="https://rumble.com/c/LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              aria-label="Liberty Soldiers on Rumble"
              className="text-zinc-600 hover:text-zinc-900 dark:text-white/70 dark:hover:text-white"
            >
              <FaPlay className="h-4 w-4" />
            </a>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6 text-sm text-zinc-800 dark:text-white/80">
            <Link href="/news" className="hover:text-zinc-600 dark:hover:text-white">
              News
            </Link>
            <Link href="/store" className="hover:text-zinc-600 dark:hover:text-white">
              Store
            </Link>
          </nav>

          {/* Theme toggle (desktop) */}
          <ThemeControl />
        </div>

        {/* Right side: theme + mobile menu button (mobile) */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeControl />

          <button
            onClick={() => setOpen((v) => !v)}
            className="px-3 py-2 border border-zinc-300 dark:border-white/10 rounded-lg text-sm text-zinc-800 dark:text-zinc-100 bg-white/70 dark:bg-white/5"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/10 px-4 py-4 flex flex-col gap-4 text-base text-zinc-800 dark:text-zinc-100"
          onClick={() => setOpen(false)}
        >
          {/* Socials (mobile) */}
          <div className="flex items-center gap-5">
            <a
              href="https://x.com/LibertySoldierz"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-white/70 dark:hover:text-white"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.youtube.com/@LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-white/70 dark:hover:text-white"
            >
              <FaYoutube />
            </a>
            <a
              href="https://rumble.com/c/LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-white/70 dark:hover:text-white"
            >
              <FaPlay />
            </a>
          </div>

          <Link href="/news" className="hover:text-zinc-600 dark:hover:text-white">
            News
          </Link>
          <Link href="/store" className="hover:text-zinc-600 dark:hover:text-white">
            Store
          </Link>
        </nav>
      )}
    </header>
  );
}

