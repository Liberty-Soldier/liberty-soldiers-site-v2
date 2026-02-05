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

    // Scroll by the visible width of the carousel (one “page”)
    const amount = el.clientWidth;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="mt-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            aria-label="Previous"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            aria-label="Next"
          >
            ▶
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory"
      >
        {children}
      </div>
    </section>
  );
}
