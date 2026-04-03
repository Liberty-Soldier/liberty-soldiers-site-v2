export default function LoadingNews() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="text-2xl font-bold">News Feed</h1>
      <p className="mt-3 text-white/70">Loading relevant news…</p>

      {/* skeleton cards */}
      <div className="mt-8 grid gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-white/5 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
