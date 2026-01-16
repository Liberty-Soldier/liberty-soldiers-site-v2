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
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
        <p className="text-sm text-zinc-600">{subtitle}</p>
      </div>

      {/* ConvertKit inline form */}
      <div className="mt-4">
        <script
          async
          data-uid="46e6214f34"
          src="https://liberty-soldiers.kit.com/46e6214f34/index.js"
        />
      </div>
    </section>
  );
}
