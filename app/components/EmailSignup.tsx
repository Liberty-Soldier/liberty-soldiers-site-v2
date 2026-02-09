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
  const isCompact = variant === "compact";

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

  return (
    <section
      className={
        isCompact
          ? "w-full"
          : "rounded-xl border border-zinc-200 bg-white px-5 py-4"
      }
    >
     {/* Copy block (ONLY for non-compact) */}
      {!isCompact && (
        <div className="mb-2">
          <h3 className="text-base font-semibold text-zinc-900">
            {title}
          </h3>
          <p className="mt-0.5 text-sm text-zinc-600">
            {subtitle}
          </p>
        </div>
      )}
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

      {/* ✅ Scope wrapper: everything Kit injects will be inside this */}
      <div className="kit-scope">
        <div ref={mountRef} />
      </div>

      <style jsx>{`
        /* ---------- REMOVE "BUILT WITH KIT" / POWERED BY (scoped) ---------- */
        :global(.kit-scope .ck-powered-by),
        :global(.kit-scope .ck-form__powered-by),
        :global(.kit-scope .ck-form__powered-by-container),
        :global(.kit-scope .formkit-powered-by),
        :global(.kit-scope .formkit-powered-by-container),
        :global(.kit-scope [class*="powered-by"]),
        :global(.kit-scope a[href*="kit.com"]),
        :global(.kit-scope a[href*="convertkit"]),
        :global(.kit-scope a[href*="ck.page"]),
        :global(.kit-scope a[href*="formkit"]) {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* In case Kit renders "Built with Kit" as plain text in a footer-like div */
        :global(.kit-scope footer),
        :global(.kit-scope .ck-footer),
        :global(.kit-scope .formkit-footer) {
          display: none !important;
        }

        /* ---------- TIGHTEN ALL DEFAULT SPACING (scoped) ---------- */
        :global(.kit-scope .ck-form),
        :global(.kit-scope .ck-form > div),
        :global(.kit-scope form) {
          margin: 0 !important;
          padding: 0 !important;
        }

        /* ---------- INLINE ROW (DESKTOP) ---------- */
        :global(.kit-scope form) {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        }

       /* INPUT */
      :global(.kit-scope input[type="email"]) {
        height: 36px !important;
        padding: 6px 10px !important;
        font-size: 14px !important;
        border-radius: 8px !important;
        margin: 0 !important;
      }
      
      /* BUTTON */
      :global(.kit-scope button),
      :global(.kit-scope input[type="submit"]) {
        height: 36px !important;
        padding: 6px 14px !important;
        font-size: 14px !important;
        line-height: 1 !important;
        border-radius: 8px !important;
        white-space: nowrap !important;
        margin: 0 !important;
      }

        /* ---------- MOBILE STACK ---------- */
        @media (max-width: 640px) {
          :global(.kit-scope form) {
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </section>
  );
}
