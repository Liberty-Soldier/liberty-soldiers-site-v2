import Link from "next/link";
import HyvorComments from "../../components/HyvorComments";

// ----- Newsletter + Volunteer server actions (simple "log + thank you")
async function submitNewsletter(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "");
  console.log("[Newsletter] signup:", email);
  // TODO: wire Mailchimp/ConvertKit later
}

async function submitVolunteer(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const roles = formData.getAll("roles").map(String);
  const message = String(formData.get("message") || "");
  console.log("[Volunteer] submission:", { name, email, roles, message });
  // TODO: send email via Resend/Nodemailer later
}

export const metadata = {
  title: "Community | Liberty Soldiers",
  description:
    "Discuss research, share Scripture, and connect with others pursuing truth and obedience.",
};

type Hub = { title: string; href: string; desc: string; badge?: "Coming Soon" };

const hubs: Hub[] = [
  { title: "Prayer Wall", href: "/prayer", desc: "Requests & praise reports." },
  { title: "Persecution Map", href: "/persecution", desc: "Track incidents & pray.", badge: "Coming Soon" },
  { title: "Videos", href: "/videos", desc: "Investigative reports & archives." },
  { title: "Forum", href: "/forum", desc: "Research threads & verse lists.", badge: "Coming Soon" },
  { title: "Contact / Collab", href: "/contact", desc: "Invite, collaborate, or reach out." },
  { title: "Devotional", href: "/devotional", desc: "Daily verse + short meditation.", badge: "Coming Soon" },
  { title: "Guidelines", href: "/community/guidelines", desc: "How we keep it Scriptural." },
];

export default function CommunityPage() {
  const HYVOR_ID = process.env.NEXT_PUBLIC_HYVOR_TALK_WEBSITE_ID || "";

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Hero */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Community</h1>
        <p className="mt-3 text-white/70">
          Discuss research, share Scripture, and connect with others pursuing truth and obedience.
        </p>
        <div className="mt-6 h-px bg-white/10" />
      </header>

      {/* Hubs grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {hubs.map((h) => (
          <Link
            key={h.title}
            href={h.href}
            className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">{h.title}</h3>
              {h.badge && (
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/70">
                  {h.badge}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-white/70">{h.desc}</p>
            <div className="mt-4 text-sm text-white/60 group-hover:text-white/80">Enter →</div>
          </Link>
        ))}
      </div>

      {/* Newsletter (simple) */}
      <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-xl font-semibold">Newsletter</h2>
        <p className="mt-1 text-white/70">
          Get weekly studies, new videos, and community highlights—no fluff.
        </p>
        <form action={submitNewsletter} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/40"
          />
          <button
            type="submit"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
          >
            Join
          </button>
        </form>
        <p className="mt-2 text-xs text-white/50">We’ll wire this to a provider later.</p>
      </section>

      {/* Volunteer */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-xl font-semibold">Volunteer</h2>
        <p className="mt-1 text-white/70">
          Help moderate, curate resources, pray, or test features.
        </p>
        <form action={submitVolunteer} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            name="name"
            required
            placeholder="Name"
            className="rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/40"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/40"
          />
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm text-white/70">Role interest</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["Moderation","Resource Curation","Prayer Team","Tech/Next.js"].map((r) => (
                <label key={r} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2">
                  <input type="checkbox" name="roles" value={r} className="accent-white" />
                  <span className="text-sm">{r}</span>
                </label>
              ))}
            </div>
          </div>
          <textarea
            name="message"
            rows={4}
            placeholder="How you’d like to help…"
            className="sm:col-span-2 rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/40"
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      {/* Guidelines summary */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-xl font-semibold">Community Guidelines</h2>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          <li>• Truth over tribe (John 17:17).</li>
          <li>• Judge righteously (John 7:24).</li>
          <li>• No false witness or reviling (Exodus 20:16; Ephesians 4:29).</li>
          <li>• Restore in gentleness (Galatians 6:1).</li>
          <li>• Be doers, not hearers only (James 1:22).</li>
        </ul>
        <Link href="/community/guidelines" className="mt-3 inline-block text-sm text-white/70 underline">
          Read the full guidelines →
        </Link>
      </section>

      {/* Comments (Hyvor Talk) */}
      <section className="mt-12">
        <h2 className="mb-3 text-xl font-semibold">Comments</h2>
        <HyvorComments
          websiteId={HYVOR_ID}
          pageId="community" // stable id so comments persist
          // pageUrl="https://<YOUR_DOMAIN>/community" // optional canonical URL
        />
      </section>
    </div>
  );
}


