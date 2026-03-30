export default function LegalPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
        Privacy & Terms
      </h1>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">Privacy Policy</h2>
        <p className="text-white/80 mt-2">
          We collect only the minimal data necessary to operate this site, such as
          newsletter email addresses and contact form submissions.
        </p>
        <p className="text-white/80 mt-2">
          Liberty Soldiers does not sell, rent, or trade user data. Information is
          used solely for site communication, updates, and operational purposes.
        </p>
        <p className="text-white/80 mt-2">
          This policy may be updated as the site expands or new features are added.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Terms of Use</h2>
        <p className="text-white/80 mt-2">
          This site is provided for research, analysis, and discussion purposes.
          Content is offered as-is and reflects investigative reporting and
          interpretation.
        </p>
        <p className="text-white/80 mt-2">
          Users are expected to engage with the site responsibly and lawfully.
          Liberty Soldiers makes no guarantees regarding accuracy, completeness,
          or outcomes resulting from the use of this content.
        </p>
        <p className="text-white/80 mt-2">
          Terms may be updated as the site evolves.
        </p>
      </section>
    </main>
  );
}


