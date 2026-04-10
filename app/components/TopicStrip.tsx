"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TOPIC_LINKS = [
  { href: "/news", label: "All News" },
  { href: "/news/us", label: "US" },
  { href: "/news/global", label: "Global" },
  { href: "/news/war", label: "War" },
  { href: "/news/finance", label: "Finance" },
  { href: "/news/control", label: "Control" },
];

export default function TopicStrip() {
  const pathname = usePathname();

  if (!pathname.startsWith("/news")) {
    return null;
  }

  return (
    <div className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-2.5 scrollbar-thin">
          {TOPIC_LINKS.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                  active
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
