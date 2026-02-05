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
    const amount = Math.min(el.clientWidth * 0.9, 520);

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

        <div className="hidden md:flex gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            aria-label="Scroll left"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            aria-label="Scroll right"
          >
            ▶
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="
          flex gap-4 overflow-x-auto pb-2
          [-webkit-overflow-scrolling:touch]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {children}
      </div>
    </div>
  );
}
