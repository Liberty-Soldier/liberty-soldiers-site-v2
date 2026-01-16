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
  /* --- HARD REMOVE KIT BRANDING --- */
  .ck-powered-by,
  .ck-form .ck-powered-by,
  .formkit-powered-by,
  .formkit-powered-by-container,
  a[href*="kit.com"],
  a[href*="convertkit"],
  a[href*="ck.page"] {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* --- FORM WRAPPER TIGHTEN --- */
  .ck-form {
    margin: 0 !important;
    padding: 0 !important;
  }

  .ck-form > div {
    margin: 0 !important;
    padding: 0 !important;
  }

  /* --- INPUT + BUTTON ROW --- */
  .ck-form form {
    display: flex !important;
    gap: 8px !important;
    align-items: center !important;
  }

  /* --- EMAIL INPUT --- */
  .ck-form input[type="email"] {
    height: 40px !important;
    padding: 8px 10px !important;
    font-size: 14px !important;
    border-radius: 10px !important;
    margin: 0 !important;
  }

  /* --- SUBSCRIBE BUTTON --- */
  .ck-form button,
  .ck-form input[type="submit"] {
    height: 40px !important;
    padding: 8px 14px !important;
    font-size: 14px !important;
    border-radius: 10px !important;
    white-space: nowrap !important;
    margin: 0 !important;
  }

  /* --- MOBILE STACK --- */
  @media (max-width: 640px) {
    .ck-form form {
      flex-direction: column !important;
      align-items: stretch !important;
    }
  }
`}</style>
    </section>
  );
}
