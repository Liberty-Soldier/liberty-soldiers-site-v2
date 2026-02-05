export const metadata = {
  title: "Videos | Liberty Soldiers",
  description:
    "Investigative video briefings and reports from Liberty Soldiers.",
};

export default function VideosPage() {
  return (
    <main className="min-h-[70vh] bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Videos
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-700">
          Liberty Soldiers video content is published externally to ensure
          availability and reach. Use the links below to view the latest video
          reports and briefings.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* YouTube */}
          <a
            href="https://www.youtube.com/@LibertySoldiers/videos"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 transition"
          >
            <h2 className="text-lg font-semibold">YouTube</h2>
            <p className="mt-1 text-sm text-zinc-700">
             Video releases, investigative reports, and briefings.
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-zinc-900">
              View channel →
            </span>
          </a>

          {/* Rumble */}
          <a
            href="https://rumble.com/c/LibertySoldiers"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 transition"
          >
            <h2 className="text-lg font-semibold">Rumble</h2>
            <p className="mt-1 text-sm text-zinc-700">
              Mirror uploads and extended availability.
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-zinc-900">
              View channel →
            </span>
          </a>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="font-semibold text-zinc-900">
            Video index coming later
          </h3>
          <p className="mt-2 text-sm text-zinc-700 max-w-2xl">
            This page will eventually host a searchable archive of Liberty
            Soldiers video reports. For now, all videos are available on the
            platforms above.
          </p>
        </div>
      </div>
    </main>
  );
}
