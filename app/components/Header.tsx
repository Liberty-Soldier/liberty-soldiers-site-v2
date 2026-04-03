"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaXTwitter,
  FaNewspaper,
  FaFileLines,
  FaVideo,
  FaMagnifyingGlass,
  FaTimeline,
  FaSatelliteDish,
  FaBolt,
} from "react-icons/fa6";

const NAV_LEFT = [
  { href: "/news", label: "News Feed", icon: FaNewspaper },
  { href: "/reports", label: "Reports", icon: FaFileLines },
  { href: "/live", label: "Live Desk", icon: FaVideo },
  { href: "/war-escalation", label: "War Radar", icon: FaSatelliteDish },
  {
    href: "/timeline/us-israel-iran-war-timeline",
    label: "Timeline",
    icon: FaTimeline,
  },
  { href: "/search", label: "Search", icon: FaMagnifyingGlass },
];

const NAV_RIGHT = [{ href: "/store", label: "Store", icon: FaBolt }];

const NAV_ALL = [...NAV_LEFT, ...NAV_RIGHT];

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="border-b border-zinc-200 bg-gradient-to-r from-zinc-950 to-zinc-900 text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-wide">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-red-500 motion-safe:animate-pulse" />
              LIVE BRIEFING
            </span>
            <span className="hidden text-white/70 sm:inline">•</span>
            <span className="hidden text-white/80 sm:inline">{nowLabel}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/war-escalation"
              onClick={close}
              className="hidden items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15 sm:inline-flex"
            >
              <FaSatelliteDish className="h-3.5 w-3.5" />
              US-Iran War Updates
            </Link>

            <Link
              href="/timeline/us-israel-iran-war-timeline"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15"
            >
              <FaTimeline className="h-3.5 w-3.5" />
              US-Iran War Timeline
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-3"
            onClick={close}
          >
            <div className="relative shrink-0">
              <Image
                src="/liberty-logo.png"
                alt="Liberty Soldiers Logo"
                width={44}
                height={44}
                className="rounded-full ring-2 ring-zinc-900/10 transition group-hover:ring-zinc-900/25"
                priority
              />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="max-w-[52vw] overflow-hidden text-ellipsis whitespace-nowrap text-base font-extrabold tracking-widest text-zinc-900 sm:text-lg">
                LIBERTY SOLDIERS
              </div>
              <div className="hidden overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-zinc-600 sm:block">
                Signal over noise • Real-time monitoring
              </div>
            </div>
          </Link>

          <div className="ml-6 hidden min-w-0 flex-1 items-center justify-start gap-3 md:flex">
            <nav className="flex flex-wrap items-center gap-2">
              {NAV_LEFT.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-[11px] font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    <Icon className="h-3.5 w-3.5 text-zinc-700" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2 border-l border-zinc-200 pl-2">
              {NAV_RIGHT.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-[11px] font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    <Icon className="h-3.5 w-3.5 text-zinc-700" />
                    {item.label}
                  </Link>
                );
              })}

              <a
                href="https://x.com/LibertySoldierz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm md:hidden"
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500 motion-safe:animate-pulse" />
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav className="fixed left-0 right-0 top-[104px] z-50 flex flex-col gap-3 bg-white px-4 py-4 shadow-lg md:hidden">
          {NAV_ALL.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3"
                onClick={close}
              >
                <Icon className="h-4 w-4 text-zinc-700" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}