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
      <div className={isCompact ? "mb-2" : ""}>
        <h3 className={isCompact ? "text-sm font-semibold text-zinc-900" : "text-base font-semibold text-zinc-900"}>
          {title}
        </h3>
        <p className={isCompact ? "mt-0.5 text-xs text-zinc-600" : "mt-0.5 text-sm text-zinc-600"}>
          {subtitle}
        </p>
      </div>

      {/* Kit embed mount */}
      <div ref={mountRef} className={isCompact ? "" : "mt-3"} />

      {/* Scoped Kit cleanup: ONLY affects embed inside this component */}
      <style jsx>{`
        :global(.ck-form) {
          margin: 0 !important;
          padding: 0 !important;
        }
        :global(.ck-form > div) {
          margin: 0 !important;
          padding: 0 !important;
        }

        /* HARD REMOVE KIT BRANDING — scoped */
        :global(.ck-form .ck-powered-by),
        :global(.ck-form .formkit-powered-by),
        :global(.ck-form .formkit-powered-by-container),
        :global(.ck-form a[href*="kit.com"]),
        :global(.ck-form a[href*="convertkit"]),
        :global(.ck-form a[href*="ck.page"]) {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* INPUT + BUTTON ROW */
        :global(.ck-form form) {
          display: flex !important;
          gap: 8px !important;
          align-items: center !important;
        }

        /* EMAIL INPUT */
        :global(.ck-form input[type="email"]) {
          height: 38px !important;
          padding: 8px 10px !important;
          font-size: 14px !important;
          border-radius: 10px !important;
          margin: 0 !important;
        }

        /* SUBSCRIBE BUTTON */
        :global(.ck-form button),
        :global(.ck-form input[type="submit"]) {
          height: 38px !important;
          padding: 8px 14px !important;
          font-size: 14px !important;
          border-radius: 10px !important;
          white-space: nowrap !important;
          margin: 0 !important;
        }

        /* MOBILE STACK */
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
