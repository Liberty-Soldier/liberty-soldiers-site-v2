export const metadata = { title: "Community Guidelines | Liberty Soldiers" };

export default function GuidelinesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Community Guidelines</h1>
      <p className="mt-2 text-white/70">
        We pursue truth with Scripture as the standard. Speak plainly, judge righteously (John 7:24),
        and avoid slander or reviling (Exodus 20:16; Ephesians 4:29).
      </p>
      <div className="mt-6 h-px bg-white/10" />
      <ul className="mt-6 space-y-2 text-sm text-white/80">
        <li>• Truth over tribe (John 17:17).</li>
        <li>• Judge righteously (John 7:24).</li>
        <li>• No false witness or reviling (Exodus 20:16; Ephesians 4:29).</li>
        <li>• Restore in gentleness (Galatians 6:1).</li>
        <li>• Be doers, not hearers only (James 1:22).</li>
      </ul>
    </div>
  );
}
