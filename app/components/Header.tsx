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
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      <div className="border-b border-white/10 bg-gradient-to-r from-zinc-950 to-zinc-900 text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide sm:text-xs">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-red-500 motion-safe:animate-pulse" />
              LIVE BRIEFING
            </span>
            <span className="hidden text-white/50 sm:inline">•</span>
            <span className="hidden text-white/75 sm:inline">{nowLabel}</span>
          </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-3"
            onClick={close}
          >
            <div className="relative shrink-0">
              <Image
                src="/liberty-logo.png"
                alt="Liberty Soldiers Logo"
                width={38}
                height={38}
                className="rounded-full ring-2 ring-zinc-900/10 transition group-hover:ring-zinc-900/25"
                priority
              />
              <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </div>

            <div className="min-w-0 leading-none">
              <div className="max-w-[48vw] overflow-hidden text-ellipsis whitespace-nowrap text-[1.05rem] font-extrabold tracking-[0.16em] text-zinc-900 sm:text-[1.15rem]">
                LIBERTY SOLDIERS
              </div>
              <div className="hidden overflow-hidden text-ellipsis whitespace-nowrap pt-1 text-[10px] text-zinc-500 sm:block">
                Signal over noise • Real-time monitoring
              </div>
            </div>
          </Link>

          <div className="ml-4 hidden min-w-0 flex-1 items-center justify-start gap-2 md:flex">
            <nav className="flex flex-wrap items-center gap-2">
              {NAV_LEFT.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 text-[11px] font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
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
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 text-[11px] font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
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
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900"
              >
                <FaXTwitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-900 shadow-sm md:hidden"
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500 motion-safe:animate-pulse" />
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav className="fixed left-0 right-0 top-[100px] z-50 flex flex-col gap-3 border-b border-zinc-200 bg-white px-4 py-4 shadow-lg md:hidden">
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
