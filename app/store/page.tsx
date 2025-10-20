export default function StorePage({
  searchParams,
}: {
  searchParams?: { sent?: string; error?: string };
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Store</h1>
      <p className="mt-3 text-white/80 max-w-2xl mx-auto">
        Clean apparel and gear aligned with the Liberty Soldiers mission. Print-on-demand integration
        is underway.
      </p>

      <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
        <span className="text-sm">Status:</span>
        <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-black/30 uppercase tracking-wide">
          Coming Soon
        </span>
      </div>

      <section id="notify" className="mt-8 max-w-md mx-auto">
        {/* Success or Error Messages */}
        {searchParams?.sent === "1" && (
          <p className="text-green-400 mb-3 text-sm">
            ✅ You’re on the list. We’ll email you when the shop opens.
          </p>
        )}
        {searchParams?.error && (
          <p className="text-red-400 mb-3 text-sm">⚠️ {searchParams.error}</p>
        )}

        {/* Notify Form */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const data = new FormData(form);

            const res = await fetch("/api/notify", { method: "POST", body: data });
            if (res.ok) {
              window.location.href = "/store?sent=1#notify";
            } else {
              const j = await res.json().catch(() => ({}));
              window.location.href = `/store?error=${encodeURIComponent(
                j?.error || "Unable to subscribe"
              )}#notify`;
            }
          }}
          className="mt-8 max-w-md mx-auto flex gap-2"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-xl bg-white text-black placeholder-black/50"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl border border-white/20 hover:border-white/50"
          >
            Notify me
          </button>
        </form>

        <p className="text-white/60 text-sm mt-2">
          We’ll email once the shop opens. No spam.
        </p>
      </section>
    </div>
  );
}
