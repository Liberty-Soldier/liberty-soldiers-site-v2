"use client";

import { ReactNode, useRef } from "react";

export default function Carousel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    const el = ref.current;
    if (!el) return;

    // scroll about one card width
    const amount = Math.min(el.clientWidth * 0.9, 720);

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-zinc-600 text-sm">{subtitle}</p>}
        </div>
      </div>

      <div className="relative">
        {/* Left / Right overlay arrows (desktop only) */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10
                     h-10 w-10 rounded-full border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50"
          aria-label="Previous"
        >
          &lt;
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10
                     h-10 w-10 rounded-full border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50"
          aria-label="Next"
        >
          &gt;
        </button>

        <div
          ref={ref}
          className="
            flex gap-4 md:gap-6
            overflow-x-auto
            pb-2
            scroll-smooth
            [-webkit-overflow-scrolling:touch]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
