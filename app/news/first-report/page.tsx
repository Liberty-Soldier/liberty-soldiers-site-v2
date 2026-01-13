export const metadata = {
  title: "The Mechanism of Betrayal | Liberty Soldiers",
  description:
    "An investigative report on how truth is abandoned through agreement, conformity, and manufactured consensus.",
};

export default function NewsArticle() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Title */}
      <header>
        <p className="text-xs uppercase tracking-wide text-white/60">Liberty Soldiers Report</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
          The Mechanism of Betrayal
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-white/85 leading-relaxed">
          Truth is rarely destroyed by lies alone. More often, it is abandoned through agreement — when
          enough people align with a narrative, truth becomes irrelevant.
        </p>
      </header>

      {/* Divider */}
      <div className="mt-10 h-px w-full bg-white/10" />

      {/* Body */}
      <section className="mt-10 space-y-10">
        <div>
          <h2 className="text-2xl font-bold">Agreement as a Weapon</h2>
          <p className="mt-3 text-white/85 leading-relaxed">
            Throughout history, power structures have relied less on force and more on consensus. When
            populations agree on what is acceptable, what is virtuous, and what is unthinkable, truth no
            longer needs to be debated — it is simply left behind.
          </p>
          <p className="mt-4 text-white/85 leading-relaxed">
            The lie does not need to be perfect. It only needs to be repeated until resistance becomes
            socially expensive.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">From Alignment to Conformity</h2>
          <p className="mt-3 text-white/85 leading-relaxed">
            Alignment is often framed as unity. In practice, it becomes conformity. Dissent is labeled
            dangerous or immoral, while obedience to deception is elevated as moral virtue.
          </p>

          <blockquote className="mt-6 border-l-2 border-white/20 pl-4 text-white/80 italic">
            When agreement becomes the standard, truth becomes a liability.
          </blockquote>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Why This Matters Now</h2>
          <p className="mt-3 text-white/85 leading-relaxed">
            In an age of algorithmic reinforcement and institutional consensus, the pressure to align has
            never been greater. Those who refuse are increasingly marginalized, censored, or dismissed —
            not because they are wrong, but because they will not agree.
          </p>
          <p className="mt-4 text-white/85 leading-relaxed">
            Betrayal does not always look like open hostility. Often it looks like compliance — quiet,
            normalized, and justified as “peace.”
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Conclusion</h2>
          <p className="mt-3 text-white/85 leading-relaxed">
            This report is not a call to rebellion for its own sake, but a warning: truth does not survive
            by majority vote. It survives by resistance — and by refusing to treat conformity as righteousness.
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-12 flex flex-wrap gap-3">
        <a
          href="/news"
          className="inline-flex items-center rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-white/35 transition"
        >
          ← Back to News
        </a>
        <a
          href="/"
          className="inline-flex items-center rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-white/35 transition"
        >
          Home
        </a>
      </div>
    </main>
  );
}
