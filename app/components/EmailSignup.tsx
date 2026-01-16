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

    // If already mounted, do nothing
    if (mountRef.current.querySelector(`script[data-uid="${UID}"]`)) return;

    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-uid", UID);
    s.src = SRC;

    mountRef.current.appendChild(s);
  }, []);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
      <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>

      {/* Kit form renders here */}
     {/* Kit style patch (scoped) */}
<style jsx global>{`
  /* Scope to our signup box only */
  .ck-form,
  .ck-form * {
    font-family: inherit !important;
  }

  /* Make sure inputs actually show */
  .ck-form input[type="email"],
  .ck-form input[type="text"] {
    display: block !important;
    width: 100% !important;
    min-height: 44px !important;
    padding: 10px 12px !important;
    border: 1px solid #d4d4d8 !important; /* zinc-300 */
    border-radius: 12px !important;
    background: #ffffff !important;
    color: #18181b !important; /* zinc-900 */
    opacity: 1 !important;
    visibility: visible !important;
  }

  .ck-form input::placeholder {
    color: #71717a !important; /* zinc-500 */
    opacity: 1 !important;
  }

  /* Button visible + clickable */
  .ck-form button,
  .ck-form input[type="submit"] {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 44px !important;
    padding: 10px 16px !important;
    border-radius: 12px !important;
    border: 1px solid #d4d4d8 !important;
    background: #18181b !important; /* zinc-900 */
    color: #ffffff !important;
    cursor: pointer !important;
    opacity: 1 !important;
    visibility: visible !important;
  }

  .ck-form button:hover,
  .ck-form input[type="submit"]:hover {
    background: #000000 !important;
  }

  /* Remove the big 'Built with Kit' footer if you want */
  .ck-powered-by {
    display: none !important;
  }
`}</style>

      <div ref={mountRef} className="mt-4" />
    </section>
  );
}
