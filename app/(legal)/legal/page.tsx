export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy & Terms</h1>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">Privacy Policy</h2>
        <p className="text-white/80 mt-2">
          We collect minimal data necessary to operate this site (e.g., newsletter emails, contact form submissions).
          We never sell your data. Full policy coming soon.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">Terms of Use</h2>
        <p className="text-white/80 mt-2">
          Use this site responsibly and lawfully. Content is provided for research and discussion. Full terms coming soon.
        </p>
      </section>
    </div>
  );
}
