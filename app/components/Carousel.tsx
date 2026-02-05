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

  function scrollOne(dir: "left" | "right") {
    const el = ref.current;
    if (!el) return;

    // IMPORTANT: children are direct slides (each has a fixed width)
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return;

    const slideW = first.getBoundingClientRect().width;

    const styles = window.getComputedStyle(el);
    const gapStr = styles.columnGap || styles.gap || "0px";
    const gap = Number.parseFloat(gapStr) || 0;

    const step = slideW + gap;

    el.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  }

  return (
    <section className="mt-4 sm:mt-6">
      <div className="mb-3 sm:mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>}
        </div>

        {/* Desktop arrows */}
        <div className="hidden md:flex gap-2">
          <button
            type="button"
            onClick={() => scrollOne("left")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            aria-label="Previous headline"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => scrollOne("right")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            aria-label="Next headline"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Scroll area */}
      <div
        ref={ref}
        className="
          flex gap-4 md:gap-6
          overflow-x-auto overflow-y-visible
          pb-1 sm:pb-2
          scroll-smooth
          snap-x snap-mandatory
          [-webkit-overflow-scrolling:touch]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
        style={{
          // Let vertical scrolling always work normally
          touchAction: "pan-y",
        }}
      >
        {children}
      </div>
    </section>
  );
}
