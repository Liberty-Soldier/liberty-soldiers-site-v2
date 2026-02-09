"use client";

import { useEffect, useRef } from "react";

const UID = "46e6214f34";
const SRC = "https://liberty-soldiers.kit.com/46e6214f34/index.js";

type Props = {
  title?: string;
  subtitle?: string;
  variant?: "card" | "compact";
};

export default function EmailSignup({
  title = "Get Liberty Soldiers briefings",
  subtitle = "Email only when new reports publish. No spam.",
  variant = "card",
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Prevent duplicate loads (client nav)
    if (mountRef.current.querySelector(`script[data-uid="${UID}"]`)) return;

    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-uid", UID);
    s.src = SRC;

    mountRef.current.appendChild(s);
  }, []);

  const isCompact = variant === "compact";

  return (
    <section
      className={
        isCompact
          ? "w-full"
          : "rounded-xl border border-zinc-200 bg-white px-5 py-4"
      }
    >
      {/* Copy block */}
      <div className={isCompact ? "mb-1" : ""}>
        <h3
          className={
            isCompact
              ? "text-xs font-semibold text-zinc-900"
              : "text-base font-semibold text-zinc-900"
          }
        >
          {title}
        </h3>
        <p
          className={
            isCompact ? "mt-0.5 text-[11px] text-zinc-600" : "mt-0.5 text-sm text-zinc-600"
          }
        >
          {subtitle}
        </p>
      </div>

      {/* Kit embed mount */}
      <div ref={mountRef} />

      {/* Scoped Kit cleanup + compact styling */}
      <style jsx>{`
        /* Remove extra wrapper spacing */
        :global(.ck-form),
        :global(.ck-form > div),
        :global(.ck-form form) {
          margin: 0 !important;
          padding: 0 !important;
        }

        /* HARD REMOVE KIT BRANDING (scoped) */
        :global(.ck-form .ck-powered-by),
        :global(.ck-form .formkit-powered-by),
        :global(.ck-form .formkit-powered-by-container),
        :global(.ck-form a[href*="kit.com"]),
        :global(.ck-form a[href*="convertkit"]),
        :global(.ck-form a[href*="ck.page"]),
        :global(.ck-form a[href*="formkit"]) {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* Row layout */
        :global(.ck-form form) {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        }

        /* Email input */
        :global(.ck-form input[type="email"]) {
          height: 34px !important;
          padding: 6px 8px !important;
          font-size: 13px !important;
          border-radius: 8px !important;
          margin: 0 !important;
        }

        /* Button */
        :global(.ck-form button),
        :global(.ck-form input[type="submit"]) {
          height: 34px !important;
          padding: 6px 12px !important;
          font-size: 13px !important;
          border-radius: 8px !important;
          white-space: nowrap !important;
          margin: 0 !important;
        }

        /* Mobile stack */
        @media (max-width: 640px) {
          :global(.ck-form form) {
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </section>
  );
}
