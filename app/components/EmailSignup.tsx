"use client";

export default function EmailSignup({
  title = "Get Liberty Soldiers briefings",
  subtitle = "Email only when new reports publish. No spam.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
      <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>

      <div className="mt-4">
        <iframe
          src="https://liberty-soldiers.kit.com/46e6214f34"
          className="w-full min-h-[120px] border-0"
          scrolling="no"
          title="Liberty Soldiers Email Signup"
        />
      </div>
    </section>
  );
}
