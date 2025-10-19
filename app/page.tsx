export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] sm:h-[80vh] w-full flex items-center">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('/hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">LIBERTY SOLDIERS</h1>
            <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl">Waging War Against Lies, Standing For Truth, and Fighting Deception.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/news" className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90">Read the News Feed</a>
              <a href="/community" className="px-5 py-3 rounded-xl border border-white/30 hover:border-white/60">Join the Community</a>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are (editable blurb) */}
      <section className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Who is Liberty Soldiers</h2>
          <p className="mt-3 text-white/90 leading-relaxed">
            {/* EDIT THIS COPY */}
            We publish tight, investigative reports—Scripture first—exposing deception and calling people back to obedience.
          </p>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Video</h2>
            <a href="https://www.youtube.com/@LibertySoldiers/videos" target="_blank" rel="noreferrer" className="text-sm hover:text-white/80">All videos →</a>
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/PEGmJzUgb-E?rel=0&start=12"
              title="Latest Liberty Soldiers Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );

}
