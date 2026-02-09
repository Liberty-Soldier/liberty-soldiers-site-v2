import EmailSignup from "./EmailSignup";

export default function EmailBand() {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-900">
              Get Liberty Soldiers briefings
            </p>
            <p className="text-xs text-zinc-600">
              Alerts only when new reports publish.
            </p>
          </div>

          <div className="w-full sm:max-w-md">
          <EmailSignup variant="compact" />
          </div>
        </div>
      </div>
    </section>
  );
}
