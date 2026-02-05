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

    // Scroll one "page" (one headline at a time with your wide cards)
    const amount = el.clientWidth;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="mt-6">
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>}
      </div>

      {/* Slider frame */}
      <div className="relative">
        {/* Left arrow (desktop only) */}
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Previous"
          className="hidden md:inline-flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/90 hover:bg-white shadow-sm"
        >
          ◀
        </button>

        {/* Right arrow (desktop only) */}
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Next"
          className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/90 hover:bg-white shadow-sm"
        >
          ▶
        </button>

        {/* Scroll area */}
         <div
          ref={ref}
          className="flex gap-4 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory
                     [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",     // Firefox
            msOverflowStyle: "none",    // IE / Edge legacy
          }}
        >

          {/* Hide scrollbars in WebKit */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {children}
        </div>
      </div>
    </section>
  );
}
