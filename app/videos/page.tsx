import { VIDEOS } from "@/lib/videos";

export const metadata = {
  title: "Videos | Liberty Soldiers",
  description:
    "Investigative video reports, briefings, and short-form analysis from Liberty Soldiers.",
};

export default function VideosPage() {
  return (
    <main className="min-h-[70vh] bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Videos
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-700">
          Investigative video reports and briefings from Liberty Soldiers.
          Videos are hosted externally for availability and distribution.
        </p>

        {/* Featured videos */}
        <div className="mt-8 space-y-4">
          {VIDEOS.map((v) => (
            <a
              key={v.url}
              href={v.url}
              target="_blank"
              rel="noreferrer"
              className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 transition"
            >
              {v.thumbnail ? (
                <img
                  src={v.thumbnail}
                  alt=""
                  className="h-24 w-40 rounded-lg object-cover bg-zinc-100"
                />
              ) : (
                <div className="h-24 w-40 rounded-lg bg-zinc-100 flex items-center justify-center text-xs text-zinc-500">
                  {v.platform}
                </div>
              )}

              <div className="min-w-0">
                <span className="text-xs uppercase tracking-wide text-zinc-500">
                  {v.platform}
                </span>
                <h2 className="mt-1 font-semibold leading-snug">
                  {v.title}
                </h2>
                <p className="mt-1 text-xs text-zinc-500">{v.date}</p>
                <span className="mt-2 inline-block text-sm text-zinc-900 font-medium">
                  Watch →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Channel links */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://www.youtube.com/@LibertySoldiers/videos"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 transition"
          >
            <h3 className="font-semibold">YouTube</h3>
            <p className="mt-1 text-sm text-zinc-700">
              Primary video releases and briefings.
            </p>
            <span className="mt-3 inline-block text-sm font-medium">
              View channel →
            </span>
          </a>

          <a
            href="https://rumble.com/c/LibertySoldiers"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 transition"
          >
            <h3 className="font-semibold">Rumble</h3>
            <p className="mt-1 text-sm text-zinc-700">
              Mirror uploads and extended availability.
            </p>
            <span className="mt-3 inline-block text-sm font-medium">
              View channel →
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
