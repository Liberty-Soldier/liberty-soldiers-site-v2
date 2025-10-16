async function fetchNews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/news`, { cache: 'no-store' });
  if (!res.ok) return { pinned: [], items: [] };
  return res.json();
}

export default async function NewsPage() {
  const { pinned, items } = await fetchNews();
  const list = items?.slice(0, 60) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">News Feed</h1>
          <p className="text-white/70 mt-1">Curated headlines relevant to end times and Torah keeping.</p>
        </div>
        <a href="/" className="text-sm hover:text-white/80">← Home</a>
      </div>

      {/* Editor's Picks */}
      {pinned?.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {pinned.map((p: any, i: number) => (
            <a key={i} href={p.url} target="_blank" rel="noreferrer"
               className="rounded-xl border border-white/10 p-4 bg-white/5 hover:border-white/30 transition">
              <span className="text-xs uppercase tracking-wide text-white/60">Editor's Pick</span>
              <h3 className="mt-1 font-semibold hover:underline">{p.title}</h3>
              <span className="text-xs text-white/50">{p.source || ''}</span>
            </a>
          ))}
        </div>
      )}

      {/* Headlines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((h: any, idx: number) => (
          <a key={idx} href={h.url} target="_blank" rel="noreferrer"
             className="rounded-xl border border-white/10 p-4 bg-white/5 hover:border-white/30 transition">
            <span className="text-[11px] uppercase tracking-wide text-white/60">{h.source}</span>
            <h3 className="mt-1 font-semibold hover:underline leading-snug">{h.title}</h3>
            {h.date && <span className="text-xs text-white/50">{new Date(h.date).toLocaleString()}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
