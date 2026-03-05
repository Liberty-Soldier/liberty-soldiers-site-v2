"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaXTwitter,
  FaYoutube,
  FaPlay,
  FaNewspaper,
  FaFileLines,
  FaVideo,
  FaMagnifyingGlass,
  FaTimeline,
  FaSatelliteDish,
  FaBolt,
} from "react-icons/fa6";

const NAV = [
  { href: "/news", label: "News", icon: FaNewspaper },
  { href: "/war-escalation", label: "War Radar", icon: FaSatelliteDish },
  { href: "/timeline/us-israel-iran-war-timeline", label: "Timeline", icon: FaTimeline },
  { href: "/reports", label: "Reports", icon: FaFileLines },
  { href: "/search", label: "Search", icon: FaMagnifyingGlass },
  { href: "/videos", label: "Videos", icon: FaVideo },
  { href: "/store", label: "Store", icon: FaBolt },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  const nowLabel = useMemo(() => {
    try {
      return new Date().toLocaleString();
    } catch {
      return "";
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/85 backdrop-blur">
      {/* TOP STRIP */}
      <div className="border-b border-zinc-200 bg-gradient-to-r from-zinc-950 to-zinc-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-wide">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-red-500 motion-safe:animate-pulse" />
              LIVE BRIEFING
            </span>
            <span className="hidden sm:inline text-white/70">•</span>
            <span className="hidden sm:inline text-white/80">{nowLabel}</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/war-escalation"
              onClick={close}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 hover:bg-white/15"
            >
              <FaSatelliteDish className="h-3.5 w-3.5" />
              War Radar
            </Link>
            <Link
              href="/timeline/us-israel-iran-war-timeline"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 hover:bg-white/15"
            >
              <FaTimeline className="h-3.5 w-3.5" />
              Timeline
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN BAR */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group" onClick={close}>
          <div className="relative">
            <Image
              src="/liberty-logo.png"
              alt="Liberty Soldiers Logo"
              width={42}
              height={42}
              className="rounded-full ring-2 ring-zinc-900/10 group-hover:ring-zinc-900/25 transition"
              priority
            />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
          </div>

          <div className="leading-tight">
            <div className="font-extrabold tracking-widest text-base sm:text-lg text-zinc-900">
              LIBERTY SOLDIERS
            </div>
            <div className="hidden sm:block text-[11px] text-zinc-600">
              Signal over noise • Real-time monitoring
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-2 text-sm">
            {NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 transition"
                >
                  <Icon className="h-4 w-4 text-zinc-700" />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA */}
          <Link
            href="/news"
            onClick={close}
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-extrabold text-white shadow-sm hover:bg-zinc-800 transition"
            aria-label="Go to latest briefings"
          >
            <FaBolt className="h-4 w-4" />
            Latest Briefings
          </Link>

          {/* Socials */}
          <div className="flex items-center gap-3 pl-2 border-l border-zinc-200">
            <a
              href="https://x.com/LibertySoldierz"
              target="_blank"
              rel="noreferrer"
              aria-label="Liberty Soldiers on X"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition"
            >
              <FaXTwitter className="h-4 w-4" />
            </a>

            <a
              href="https://www.youtube.com/@LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              aria-label="Liberty Soldiers on YouTube"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition"
            >
              <FaYoutube className="h-4 w-4" />
            </a>

            <a
              href="https://rumble.com/c/LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              aria-label="Liberty Soldiers on Rumble"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition"
            >
              <FaPlay className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center gap-2 px-3 py-2 border border-zinc-300 rounded-xl text-sm font-semibold text-zinc-900 bg-white shadow-sm"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500 motion-safe:animate-pulse" />
          Menu
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden bg-white border-t border-zinc-200 px-4 py-4 flex flex-col gap-3 text-base text-zinc-900"
        >
          {/* quick CTA */}
          <Link
            href="/war-escalation"
            className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-950 text-white px-4 py-3 shadow-sm"
            onClick={close}
          >
            <span className="flex items-center gap-3 font-extrabold">
              <FaSatelliteDish className="h-5 w-5" />
              War Radar
            </span>
            <span className="text-xs text-white/80">LIVE</span>
          </Link>

          {/* nav items */}
          <div className="grid grid-cols-2 gap-3">
            {NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3 hover:bg-zinc-100"
                  onClick={close}
                >
                  <Icon className="h-4 w-4 text-zinc-700" />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Socials (mobile) */}
          <div className="mt-2 flex items-center gap-3">
            <a
              href="https://x.com/LibertySoldierz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700"
              aria-label="X"
              onClick={close}
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.youtube.com/@LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700"
              aria-label="YouTube"
              onClick={close}
            >
              <FaYoutube />
            </a>
            <a
              href="https://rumble.com/c/LibertySoldiers"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700"
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
