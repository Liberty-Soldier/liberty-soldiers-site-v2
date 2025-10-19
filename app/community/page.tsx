import HyvorComments from "../../components/HyvorComments";

export default function CommunityPage() {
  const HYVOR_ID = process.env.NEXT_PUBLIC_HYVOR_TALK_WEBSITE_ID || "";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* --- HEADER --- */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Community</h1>
        <p className="mt-3 text-white/70">
          Discuss Scripture, share insight, and connect with others pursuing truth and obedience.
        </p>
        <div className="mt-6 h-px bg-white/10" />
      </header>

      {/* --- COMMENTS FIRST --- */}
      <section className="mb-12">
        <h2 className="mb-3 text-xl font-semibold">Community Discussion</h2>
        <p className="mb-4 text-sm text-white/70">
          Post your thoughts, questions, and insights below.
        </p>
        <HyvorComments websiteId={HYVOR_ID} pageId="community" />
      </section>

      {/* --- COMING SOON PLACEHOLDERS --- */}
      <section className="mt-16 text-center">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-white/70 mb-6">
          We’re building new interactive sections for the Liberty Soldiers community:
        </p>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            "Prayer Wall",
            "Persecution Map",
            "Video Archive",
            "Forum",
            "Contact / Collaboration",
            "Daily Devotionals",
            "Community Guidelines",
          ].map((title) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] py-4 px-2 text-white/80 hover:bg-white/[0.06] transition"
            >
              {title}
              <div className="mt-1 text-xs te


