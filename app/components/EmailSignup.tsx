"use client";

import { useEffect } from "react";

const FORM_UID = "46e6214f34";
const FORM_SRC = "https://liberty-soldiers.kit.com/46e6214f34/index.js";

export default function EmailSignup({
  title = "Get Liberty Soldiers briefings",
  subtitle = "Email only when new reports publish. No spam.",
}: {
  title?: string;
  subtitle?: string;
}) {
  useEffect(() => {
    // Prevent loading the same ConvertKit script multiple times
    const existing = document.querySelector(`script[data-uid="${FORM_UID}"]`);
    if (existing) return;

    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-uid", FORM_UID);
    s.src = FORM_SRC;
    document.body.appendChild(s);
  }, []);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
        <p className="text-sm text-zinc-600">{subtitle}</p>
      </div>

      {/* ConvertKit renders the form below via the script */}
      <div className="mt-4" />
    </section>
  );
}
