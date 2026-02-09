import EmailSignup from "./EmailSignup";

export default function EmailBand() {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              Get Liberty Soldiers briefings
            </p>
            <p className="text-xs text-zinc-600">
              Email only when new reports publish. No noise.
            </p>
          </div>

          <div className="w-full sm:max-w-md">
            <EmailSignup
              variant="compact"
              title="Subscribe"
              subtitle="Stay ahead of the convergence."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
