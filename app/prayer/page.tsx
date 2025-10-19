// app/prayer/page.tsx
import Link from "next/link";
import HyvorComments from "../../components/HyvorComments";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export const metadata = {
  title: "Prayer Wall | Liberty Soldiers",
  description: "Requests & praise reports. Public replies below.",
};

// ---- Server Action: sends email and redirects with ?sent=1
async function submitPrayer(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "Anonymous");
  const email = String(formData.get("email") || "");
  const request = String(formData.get("request") || "");
  const isAnon = formData.get("anonymous") === "on";
  const honey = String(formData.get("website") || ""); // honeypot

  // basic bot guard
  if (honey) redirect("/prayer?sent=1");

  if (!request.trim()) redirect("/prayer?sent=0");

  const resendKey = process.env.RESEND_API_KEY;
  const inbox = process.env.PRAYER_INBOX;

  if (!resendKey || !inbox) {
    console.error("[Prayer] Missing RESEND_API_KEY or PRAYER_INBOX");
    redirect("/prayer?sent=0");
  }

  const resend = new Resend(resendKey!);

  // Compose email
  const subject = `Prayer Request — ${isAnon ? "Anonymous" : name}`;
  const fromLine = isAnon ? "Anonymous" : `${name}${email ? ` <${email}>` : ""}`;

  const text = [
    `Name: ${isAnon ? "Anonymous" : name}`,
    `Email: ${email || "(none provided)"}`,
    "",
    "Request:",
    request,
  ].join("\n");

  await resend.emails.send({
    from: `Liberty Soldiers <no-reply@resend.dev>`,
    to: inbox!,
    subject,
    text,
    reply_to: email || undefined,
    headers: { "X-LS-Form": "PrayerWall" },
  });

  redirect("/prayer?sent=1");
}

export default function PrayerWallPage({
  searchParams,
}: {
  searchParams: { sent?: string };
}) {
  const HYVOR_ID = process.env.NEXT_PUBLIC_HYVOR_TALK_WEBSITE_ID || "";
  const sent = searchParams?.sent === "1";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header>
        <h1 className="text-3xl font-bold">Prayer Wall</h1>
        <p className="mt-2 text-white/70">
          Submit a request (private to admins). Community replies happen below in the public thread.
        </p>
        <div className="mt-6 h-px bg-white/10" />
      </header>

      {/* Success/Fail banner */}
      {searchParams?.sent && (
        <div
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            sent
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
              : "border-red-400/30 bg-red-400/10 text-red-200"
          }`}
        >
          {sent
            ? "Thank you. Your request has been sent to the prayer team."
            : "Something went wrong sending your request. Please try again later."}
        </div>
      )}

      {/* Private submission form → emails you via Resend */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-xl font-semibold">Submit a Prayer Request</h2>
        <p className="mt-1 text-white/70 text-sm">
          Requests are emailed to moderators. Share only what you’re comfortable posting.
        </p>

        <form action={submitPrayer} className="mt-4 grid grid-cols-1 gap-3">
          {/* Honeypot (hidden) */}
          <input
            type="text"
            name="website"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="name"
              placeholder="Name (optional)"
              className="rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/40"
            />
            <input
              type="email"
              name="email"
              placeholder="Email (optional, for follow-up)"
              className="rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/40"
            />
          </div>

          <textarea
            name="request"
            required
            rows={5}
            placeholder="Your prayer request…"
            className="rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/40"
          />

          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" name="anonymous" className="accent-white" />
            Share as anonymous with the prayer team
          </label>

          <div className="mt-1 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
            >
              Send Request
            </button>
            <Link
              href="/community"
              className="text-sm text-white/70 underline hover:text-white/90"
            >
              Back to Community
            </Link>
          </div>
        </form>
      </section>

      {/* Public thread using Hyvor Talk */}
      <section className="mt-12">
        <h2 className="mb-3 text-xl font-semibold">Community Replies</h2>
        <p className="mb-4 text-sm text-white/70">
          Share encouragement and Scripture here. Keep it gracious and on-mission (John 7:24, Gal 6:1).
        </p>
        <HyvorComments websiteId={HYVOR_ID} pageId="prayer" />
      </section>
    </div>
  );
}
