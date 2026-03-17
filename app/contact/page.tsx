// app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://libertysoldiers.com";

export const metadata: Metadata = {
  title: "Contact | Liberty Soldiers",
  description:
    "Contact Liberty Soldiers for general inquiries, media questions, and business communication.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact | Liberty Soldiers",
    description:
      "Contact Liberty Soldiers for general inquiries, media questions, and business communication.",
    url: `${SITE_URL}/contact`,
    siteName: "Liberty Soldiers",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Liberty Soldiers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Liberty Soldiers",
    description:
      "Contact Liberty Soldiers for general inquiries, media questions, and business communication.",
    images: ["/og-default.jpg"],
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Contact
        </h1>
        <p className="mt-3 text-zinc-600">
          For questions, media inquiries, collaborations, or general contact,
          use the information below.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900">
            General Contact
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Email:
          </p>
          <a
            href="mailto:briefings@libertysoldiers.com"
            className="mt-1 inline-block text-base font-medium text-zinc-900 underline underline-offset-4"
          >
            briefings@libertysoldiers.com
          </a>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900">
            Media & Partnerships
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            For interviews, partnerships, sponsorships, or business-related
            inquiries, please reach out by email and include relevant details in
            the subject line.
          </p>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Follow Liberty Soldiers
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="https://x.com/LibertySoldierz"
            target="_self"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
          >
            X / Twitter
          </Link>
          <Link
            href="https://www.youtube.com/@LibertySoldiers"
            target="_self"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
          >
            YouTube
          </a>
        </div>
      </section>
    </main>
  );
}
