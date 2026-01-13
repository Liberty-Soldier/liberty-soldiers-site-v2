export default function StorePage() {
  return (
    <main className="min-h-[70vh] px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Store</h1>
        <p className="mt-4 text-white/80 max-w-2xl mx-auto">
          Coming soon.
        </p>

        <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
          <span className="text-sm text-white/80">Status:</span>
          <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-black/30 uppercase tracking-wide text-white/80">
            Coming Soon
          </span>
        </div>
      </div>
    </main>
  );
}
