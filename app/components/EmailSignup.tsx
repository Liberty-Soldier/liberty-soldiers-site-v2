"use client";

import { useEffect, useRef } from "react";

const UID = "46e6214f34";
const SRC = "https://liberty-soldiers.kit.com/46e6214f34/index.js";

export default function EmailSignup({
  title = "Get Liberty Soldiers briefings",
  subtitle = "Email only when new reports publish. No spam.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    if (mountRef.current.querySelector(`script[data-uid="${UID}"]`)) return;

    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-uid", UID);
    s.src = SRC;

    mountRef.current.appendChild(s);
  }, []);

  return (
    <section className="rounded-xl border border-zinc-200 bg-white px-5 py-4">
      <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
      <p className="mt-0.5 text-sm text-zinc-600">{subtitle}</p>

      {/* Kit embed */}
      <div ref={mountRef} className="mt-3" />

      {/* Scoped Kit cleanup */}
      <style jsx global>{`
        /* Hide branding */
        .ck-powered-by {
          display: none !important;
        }

        /* Tighten form spacing */
        .ck-form {
          margin-top: 0.25rem !important;
        }

        .ck-form > div {
          margin-bottom: 0.25rem !important;
        }

        /* Input */
        .ck-form input[type="email"] {
          min-height: 40px !important;
          padding: 8px 10px !important;
          font-size: 14px !important;
        }

        /* Button */
        .ck-form button,
        .ck-form input[type="submit"] {
          min-height: 40px !important;
          padding: 8px 14px !important;
          font-size: 14px !important;
        }
      `}</style>
    </section>
  );
}
