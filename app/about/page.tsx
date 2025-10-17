export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About</h1>

      {/* EDIT THIS COPY ANYTIME */}
      <p className="text-white/80 mt-2 max-w-3xl">
        Liberty Soldiers is an investigative project committed to Scripture-first reporting and analysis.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Resources</h2>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {["Study Tools", "Primary Texts", "Historical Archives", "Recommended Channels"].map((r, i) => (
            <li key={i} className="rounded-xl border border-white/10 p-4 bg-white/5">{r}</li>
          ))}
        </ul>
      </section>

      <section id="contact" className="mt-10">
        <h2 className="text-2xl font-bold">Contact</h2>
        <form method="post" action="/api/contact" className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="name" required placeholder="Name" className="px-4 py-3 rounded-xl bg-white text-black placeholder-black/50" />
          <input name="email" type="email" required placeholder="Email" className="px-4 py-3 rounded-xl bg-white text-black placeholder-black/50" />
          <textarea name="message" required placeholder="Message" className="sm:col-span-2 px-4 py-3 rounded-xl bg-white text-black placeholder-black/50 min-h-[120px]" />
          <button className="sm:col-span-2 px-5 py-3 rounded-xl border border-white/20 hover:border-white/50">Send</button>
        </form>
      </section>
    </div>
  );
}
