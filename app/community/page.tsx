import HyvorComments from "../../components/HyvorComments";

export default function CommunityPage() {
  const HYVOR_ID = process.env.NEXT_PUBLIC_HYVOR_TALK_WEBSITE_ID || "";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">Community</h1>
        <p className="mt-3 text-white/70">
          Discuss research, share Scripture, and connect with others pursuing truth and obedience.
        </p>
        <div className="mt-6 h-px bg-white/10" />
      </header>

      <section className="mb-12 text-center">
        <p className="text-white/60 italic">Features coming soon:</p>
        <ul className="mt-3 space-y-2 text-white/70">
          <li>• Prayer Wall</li>
          <li>• Persecution Map</li>
          <li>• Videos Archive</li>
          <li>• Forum</li>
          <li>• Contact & Collaboration</li>
          <li>• Daily Devotionals</li>
          <li>• Community Guidelines</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">Community Discussion</h2>
        <HyvorComments websiteId={HYVOR_ID} pageId="community" />
      </section>
    </div>
  );
}
