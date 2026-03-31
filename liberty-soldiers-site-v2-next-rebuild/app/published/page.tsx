import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { getPublished } from "@/lib/published-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function PublishedPage() {
  noStore();

  const articles = await getPublished();

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Liberty Soldiers
          </div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Published Articles</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 md:text-base">
            Articles published from the admin workflow.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 text-zinc-600">
            No published articles yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.id}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <Link href={`/published/${article.slug}`} className="block">
                  <div className="aspect-[16/9] bg-zinc-100">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-700">
                        {article.hardCategory}
                      </span>
                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-700">
                        {article.kind}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold leading-7 tracking-tight">
                      {article.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">
                      {article.excerpt}
                    </p>

                    <div className="mt-4 text-xs text-zinc-500">
                      {article.dateISO} • {article.readTime}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}