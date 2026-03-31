"use client";

import { useMemo, useState, useEffect } from "react";

type ReportKind = "report" | "analysis" | "brief" | "news";

type QueueStatus = "draft" | "review" | "approved" | "rejected";

type HardCategory =
  | "Power & Control"
  | "Markets & Finance"
  | "Digital ID / Technocracy"
  | "War & Geopolitics"
  | "Religion & Ideology"
  | "Prophecy Watch";

type QueueItem = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  sourceUrl?: string;
  dateISO: string;
  byline: string;
  coverImage: string;
  category: string;
  hardCategory: HardCategory;
  readTime: string;
  featured: boolean;
  priority: number;
  kind: ReportKind;
  slug: string;
  status: QueueStatus;
  body: string;
};

const HARD_CATEGORIES: HardCategory[] = [
  "Power & Control",
  "Markets & Finance",
  "Digital ID / Technocracy",
  "War & Geopolitics",
  "Religion & Ideology",
  "Prophecy Watch",
];

const KINDS: ReportKind[] = ["report", "analysis", "brief", "news"];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cls(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getStatusPill(status: QueueStatus) {
  switch (status) {
    case "draft":
      return "bg-zinc-100 text-zinc-700 border-zinc-200";
    case "review":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "approved":
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    case "rejected":
      return "bg-red-50 text-red-800 border-red-200";
    default:
      return "bg-zinc-100 text-zinc-700 border-zinc-200";
  }
}

function getHardCategoryDefaultImage(hardCategory: HardCategory) {
  switch (hardCategory) {
    case "Power & Control":
      return "/og-power-control.jpg";
    case "Markets & Finance":
      return "/og-markets-finance.jpg";
    case "Digital ID / Technocracy":
      return "/og-digital-id.jpg";
    case "War & Geopolitics":
      return "/og-war-geopolitics.jpg";
    case "Religion & Ideology":
      return "/og-religion-ideology.jpg";
    case "Prophecy Watch":
      return "/og-prophecy-watch.jpg";
    default:
      return "/og-default.jpg";
  }
}

function formatReportsObject(item: QueueItem) {
  return `{
  slug: "${item.slug}",
  title: "${item.title.replace(/"/g, '\\"')}",
  excerpt: "${item.excerpt.replace(/"/g, '\\"')}",
  dateISO: "${item.dateISO}",
  byline: "${item.byline}",
  coverImage: "${item.coverImage}",
  category: "${item.category}",
  hardCategory: "${item.hardCategory}",
  readTime: "${item.readTime}",
  featured: ${item.featured},
  priority: ${item.priority},
  kind: "${item.kind}",
},`;
}

function formatPageTsxTemplate(item: QueueItem) {
  return `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${item.title.replace(/"/g, '\\"')} | Liberty Soldiers",
  description: "${item.excerpt.replace(/"/g, '\\"')}",
  alternates: {
    canonical: "https://libertysoldiers.com/news/${item.slug}",
  },
  openGraph: {
    title: "${item.title.replace(/"/g, '\\"')}",
    description: "${item.excerpt.replace(/"/g, '\\"')}",
    url: "https://libertysoldiers.com/news/${item.slug}",
    siteName: "Liberty Soldiers",
    images: [
      {
        url: "${item.coverImage}",
        width: 1200,
        height: 630,
        alt: "${item.title.replace(/"/g, '\\"')}",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "${item.title.replace(/"/g, '\\"')}",
    description: "${item.excerpt.replace(/"/g, '\\"')}",
    images: ["${item.coverImage}"],
  },
};

export default function ArticlePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
          <div className="mb-3 inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
            ${item.hardCategory}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">${item.title
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</h1>
          <p className="mt-4 text-lg leading-7 text-zinc-600">
            ${item.excerpt.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </p>
          <div className="mt-4 text-sm text-zinc-500">
            By ${item.byline} · ${item.readTime}
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200">
          <img
            src="${item.coverImage}"
            alt="${item.title.replace(/"/g, '\\"')}"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="prose prose-zinc max-w-none whitespace-pre-line">
${item.body
  .split("\n")
  .map((line) => `          ${line}`)
  .join("\n")}
        </div>
      </article>
    </main>
  );
}
`;
}

export default function AdminPage() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"queue" | "editor" | "export">("queue");
  const [intakeUrl, setIntakeUrl] = useState("");
  const [intakeTitle, setIntakeTitle] = useState("");
  const [intakeNotes, setIntakeNotes] = useState("");
  const [search, setSearch] = useState("");

  const selected = useMemo(() => {
    return queue.find((item) => item.id === selectedId) ?? queue[0];
  }, [queue, selectedId]);

  const filteredQueue = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return queue;
    return queue.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.hardCategory.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q)
      );
    });
  }, [queue, search]);

async function loadQueue() {
  try {
    const res = await fetch("/api/admin/queue");
    const data = await res.json();

    if (data.ok) {
      const nextQueue = Array.isArray(data.queue) ? data.queue : [];

      setQueue(nextQueue);

      if (nextQueue.length > 0) {
        setSelectedId((prev) => prev || nextQueue[0].id);
      } else {
        setSelectedId("");
      }
    }
  } catch (err) {
    console.error("Failed to load queue", err);
    setQueue([]);
    setSelectedId("");
  }
}
  } catch (err) {
    console.error("Failed to load queue", err);
setQueue([]);
setSelectedId("");
  }
}
async function handleDelete() {
  if (!selected) return;

  const confirmed = window.confirm("Delete this draft?");
  if (!confirmed) return;

  const nextQueue = queue.filter((item) => item.id !== selected.id);

  setQueue(nextQueue);

  if (nextQueue.length > 0) {
    setSelectedId(nextQueue[0].id);
  } else {
    setSelectedId("");
  }

  await saveQueue(nextQueue);
}

  async function saveQueue(nextQueue: QueueItem[]) {
    try {
      const res = await fetch("/api/admin/queue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queue: nextQueue }),
      });

      const data = await res.json();

      if (!data.ok) {
        console.error("Save failed", data);
      }
    } catch (err) {
      console.error("Failed to save queue", err);
    }
  }

  useEffect(() => {
    loadQueue();
  }, []);

  function updateSelected<K extends keyof QueueItem>(key: K, value: QueueItem[K]) {
    if (!selected) return;

    setQueue((prev) => {
      const nextQueue = prev.map((item) => {
        if (item.id !== selected.id) return item;

        const next = { ...item, [key]: value };

        if (key === "title") {
          next.slug = slugify(String(value));
        }

        if (key === "hardCategory") {
          next.coverImage = getHardCategoryDefaultImage(value as HardCategory);
        }

        return next;
      });

      void saveQueue(nextQueue);
      return nextQueue;
    });
  }

  function handleAddIntake() {
    const title = intakeTitle.trim() || "Untitled Draft";
    const slug = slugify(title);

    const newItem: QueueItem = {
      id: `q-${Date.now()}`,
      title,
      excerpt:
        "First-pass draft created from manual intake. Review wording, sources, metadata, and export output before publishing.",
      source: intakeUrl.trim() ? "Manual URL intake" : "Manual notes intake",
      sourceUrl: intakeUrl.trim() || undefined,
      dateISO: new Date().toISOString().slice(0, 10),
      byline: "Liberty Soldiers",
      coverImage: "/og-default.jpg",
      category: "General",
      hardCategory: "Power & Control",
      readTime: "5 min",
      featured: false,
      priority: 3,
      kind: "report",
      slug,
      status: "draft",
      body:
        intakeNotes.trim() ||
        "Paste source notes here, then refine into Liberty Soldiers format. Focus on signal, not noise.",
    };

    setQueue((prev) => {
      const nextQueue = [newItem, ...prev];
      void saveQueue(nextQueue);
      return nextQueue;
    });
    setSelectedId(newItem.id);
    setActiveTab("editor");
    setIntakeUrl("");
    setIntakeTitle("");
    setIntakeNotes("");
  }
  async function handleGenerateDraft() {
  try {
    const res = await fetch("/api/admin/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intakeUrl,
        intakeTitle,
        intakeNotes,
      }),
    });

    const data = await res.json();

  if (!data.ok) {
  console.error("Generate failed", data);
  alert(data.details || data.error || "Generate failed");
  return;
}

    if (Array.isArray(data.queue)) {
      setQueue(data.queue);
      if (data.item?.id) {
        setSelectedId(data.item.id);
      } else if (data.queue[0]?.id) {
        setSelectedId(data.queue[0].id);
      }
    } else {
      await loadQueue();
      if (data.item?.id) {
        setSelectedId(data.item.id);
      }
    }

    setActiveTab("editor");
    setIntakeUrl("");
    setIntakeTitle("");
    setIntakeNotes("");
  } catch (err) {
    console.error("Failed to generate draft", err);
    alert("Failed to generate draft");
  }
}

  function updateStatus(status: QueueStatus) {
    if (!selected) return;
    updateSelected("status", status);
  }

  const counts = useMemo(() => {
    return {
      total: queue.length,
      draft: queue.filter((x) => x.status === "draft").length,
      review: queue.filter((x) => x.status === "review").length,
      approved: queue.filter((x) => x.status === "approved").length,
      rejected: queue.filter((x) => x.status === "rejected").length,
    };
  }, [queue]);

  if (!selected) {
    return (
      <main className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-900">
        <div className="mx-auto max-w-5xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">LBS Admin</h1>
          <p className="mt-3 text-zinc-600">No queue items found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Liberty Soldiers
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Admin Queue + Draft Workflow
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 md:text-base">
                This is the first working admin layer for LBS. It lets you intake
                story ideas, edit article fields, manage queue status, and export
                content in your exact report object format and self-contained page
                pattern.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <StatCard label="Total" value={counts.total} />
              <StatCard label="Draft" value={counts.draft} />
              <StatCard label="Review" value={counts.review} />
              <StatCard label="Approved" value={counts.approved} />
              <StatCard label="Rejected" value={counts.rejected} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Manual Intake</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Add a source URL, story title, or notes to create a draft.
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">
                    Source URL
                  </label>
                  <input
                    value={intakeUrl}
                    onChange={(e) => setIntakeUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">
                    Draft title
                  </label>
                  <input
                    value={intakeTitle}
                    onChange={(e) => setIntakeTitle(e.target.value)}
                    placeholder="Enter working title"
                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">
                    Source notes / summary
                  </label>
                  <textarea
                    value={intakeNotes}
                    onChange={(e) => setIntakeNotes(e.target.value)}
                    placeholder="Paste notes, transcript excerpts, or rough analysis..."
                    rows={6}
                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
  <button
    onClick={handleAddIntake}
    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
  >
    Create Draft
  </button>

  <button
    onClick={handleGenerateDraft}
    className="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
  >
    Generate Draft
  </button>
</div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Queue</h2>
                <span className="text-xs text-zinc-500">{filteredQueue.length} items</span>
              </div>

              <div className="mt-4">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search queue..."
                  className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                />
              </div>

              <div className="mt-4 max-h-[720px] space-y-3 overflow-y-auto pr-1">
                {filteredQueue.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedId(item.id);
                      setActiveTab("editor");
                    }}
                    className={cls(
                      "w-full rounded-2xl border p-4 text-left transition",
                      item.id === selectedId
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div
                          className={cls(
                            "text-xs",
                            item.id === selectedId ? "text-zinc-300" : "text-zinc-500"
                          )}
                        >
                          {item.source}
                        </div>
                        <div className="mt-1 text-sm font-semibold leading-5 md:text-[15px]">
                          {item.title}
                        </div>
                      </div>

                      <span
                        className={cls(
                          "rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide",
                          item.id === selectedId
                            ? "border-white/20 bg-white/10 text-white"
                            : getStatusPill(item.status)
                        )}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div
                      className={cls(
                        "mt-3 line-clamp-2 text-xs leading-5",
                        item.id === selectedId ? "text-zinc-300" : "text-zinc-600"
                      )}
                    >
                      {item.excerpt}
                    </div>

                    <div
                      className={cls(
                        "mt-3 flex flex-wrap gap-2 text-[11px]",
                        item.id === selectedId ? "text-zinc-300" : "text-zinc-500"
                      )}
                    >
                      <span>{item.hardCategory}</span>
                      <span>•</span>
                      <span>{item.kind}</span>
                      <span>•</span>
                      <span>{item.dateISO}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm">
              <div className="flex flex-wrap gap-2">
                <TabButton
                  active={activeTab === "queue"}
                  onClick={() => setActiveTab("queue")}
                  label="Overview"
                />
                <TabButton
                  active={activeTab === "editor"}
                  onClick={() => setActiveTab("editor")}
                  label="Editor"
                />
                <TabButton
                  active={activeTab === "export"}
                  onClick={() => setActiveTab("export")}
                  label="Export"
                />
              </div>
            </div>

            {activeTab === "queue" && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={cls(
                          "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                          getStatusPill(selected.status)
                        )}
                      >
                        {selected.status}
                      </span>

                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
                        {selected.hardCategory}
                      </span>

                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
                        {selected.kind}
                      </span>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      {selected.title}
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 md:text-base">
                      {selected.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
                      <span>By {selected.byline}</span>
                      <span>{selected.dateISO}</span>
                      <span>{selected.readTime}</span>
                      <span>Priority {selected.priority}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
  onClick={() => updateStatus("review")}
  className="rounded-2xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
>
  Mark Review
</button>

<button
  onClick={() => updateStatus("approved")}
  className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
>
  Approve
</button>

<button
 onClick={async () => {
  if (!selected) return;

  const res = await fetch("/api/admin/publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: selected.id }),
  });

  const data = await res.json();

  if (!data.ok) {
    console.error("Publish failed", data);
    alert(data.error || "Publish failed");
    return;
  }

  await loadQueue();

  if (data.xPost && data.xPost.ok === false) {
    console.warn("X post failed", data.xPost);
    alert(
      `Article published, but X posting failed.\n\n` +
        `${data.xPost.error || "Unknown X error"}\n\n` +
        `${JSON.stringify(data.xPost.details || data.xPost, null, 2)}`
    );
  }
}}
  className="rounded-2xl border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-100"
>
  Publish
</button>

<button
  onClick={() => updateStatus("rejected")}
  className="rounded-2xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-100"
>
  Reject
</button>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <InfoCard
                    label="Source"
                    value={selected.source}
                    sub={selected.sourceUrl || "No source URL"}
                  />
                  <InfoCard label="Slug" value={selected.slug} sub="/news route target" />
                  <InfoCard label="Cover Image" value={selected.coverImage} sub="OG / hero asset" />
                </div>

                <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <div className="text-sm font-semibold text-zinc-800">Body Preview</div>
                  <div className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-700">
                    {selected.body}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "editor" && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold tracking-tight">Article Editor</h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    Edit this draft before export or later API-based publishing.
                  </p>
                  <div className="mt-4 flex gap-3">
  <button
    onClick={handleDelete}
    className="rounded-2xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
  >
    Delete Draft
  </button>
</div>

                  <div className="mt-6 grid gap-5">
                    <Field label="Title">
                      <input
                        value={selected.title}
                        onChange={(e) => updateSelected("title", e.target.value)}
                        className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                      />
                    </Field>

                    <Field label="Excerpt">
                      <textarea
                        value={selected.excerpt}
                        onChange={(e) => updateSelected("excerpt", e.target.value)}
                        rows={4}
                        className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                      />
                    </Field>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Slug">
                        <input
                          value={selected.slug}
                          onChange={(e) => updateSelected("slug", slugify(e.target.value))}
                          className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                        />
                      </Field>

                      <Field label="Date ISO">
                        <input
                          value={selected.dateISO}
                          onChange={(e) => updateSelected("dateISO", e.target.value)}
                          className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Byline">
                        <input
                          value={selected.byline}
                          onChange={(e) => updateSelected("byline", e.target.value)}
                          className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                        />
                      </Field>

                      <Field label="Read Time">
                        <input
                          value={selected.readTime}
                          onChange={(e) => updateSelected("readTime", e.target.value)}
                          className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Category">
                        <input
                          value={selected.category}
                          onChange={(e) => updateSelected("category", e.target.value)}
                          className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                        />
                      </Field>

                      <Field label="Hard Category">
                        <select
                          value={selected.hardCategory}
                          onChange={(e) =>
                            updateSelected("hardCategory", e.target.value as HardCategory)
                          }
                          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                        >
                          {HARD_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                      <Field label="Kind">
                        <select
                          value={selected.kind}
                          onChange={(e) => updateSelected("kind", e.target.value as ReportKind)}
                          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                        >
                          {KINDS.map((kind) => (
                            <option key={kind} value={kind}>
                              {kind}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Priority">
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={selected.priority}
                          onChange={(e) =>
                            updateSelected("priority", Number(e.target.value || 1))
                          }
                          className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                        />
                      </Field>

                      <Field label="Featured">
                        <select
                          value={selected.featured ? "true" : "false"}
                          onChange={(e) => updateSelected("featured", e.target.value === "true")}
                          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                        >
                          <option value="false">false</option>
                          <option value="true">true</option>
                        </select>
                      </Field>
                    </div>

                    <Field label="Cover Image">
                      <input
                        value={selected.coverImage}
                        onChange={(e) => updateSelected("coverImage", e.target.value)}
                        className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                      />
                    </Field>

                    <Field label="Body">
                      <textarea
                        value={selected.body}
                        onChange={(e) => updateSelected("body", e.target.value)}
                        rows={16}
                        className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm leading-7 outline-none transition focus:border-zinc-500"
                      />
                    </Field>
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Live Article Preview</h3>

                  <article className="mt-5 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
                    <div className="aspect-[16/7] bg-zinc-100">
                      <img
                        src={selected.coverImage}
                        alt={selected.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
                        {selected.hardCategory}
                      </div>

                      <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                        {selected.title}
                      </h1>

                      <p className="mt-4 text-lg leading-7 text-zinc-600">
                        {selected.excerpt}
                      </p>

                      <div className="mt-4 text-sm text-zinc-500">
                        By {selected.byline} · {selected.readTime}
                      </div>

                      <div className="mt-8 whitespace-pre-line text-[15px] leading-8 text-zinc-800">
                        {selected.body}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            )}

            {activeTab === "export" && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold tracking-tight">Reports Array Entry</h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    This matches your required reports object format.
                  </p>

                  <CodeBlock code={formatReportsObject(selected)} />
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Self-Contained page.tsx Template
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    This follows your preferred single-file article pattern.
                  </p>

                  <CodeBlock code={formatPageTsxTemplate(selected)} />
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold tracking-tight">Next Build Targets</h2>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-700">
                    <p>
                      1. Add simple route protection so only you can access <code>/admin</code>.
                    </p>
                    <p>2. Replace mock queue state with real persistence.</p>
                    <p>3. Add API routes for intake, save draft, approve, and publish.</p>
                    <p>
                      4. Add bot generation later so sources become first-pass LBS drafts
                      automatically.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-center">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</div>
      <div className="mt-1 text-xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cls(
        "rounded-2xl px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-zinc-900 text-white"
          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
      )}
    >
      {label}
    </button>
  );
}

function InfoCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <div className="mt-2 break-words text-sm font-medium text-zinc-900">{value}</div>
      {sub ? <div className="mt-1 text-xs text-zinc-500">{sub}</div> : null}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-zinc-700">{label}</div>
      {children}
    </label>
  );
}

function CodeBlock({ code }: { code: string }) {
  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3">
        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Generated Output
        </div>
        <button
          onClick={() => copyText(code)}
          className="rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Copy
        </button>
      </div>
      <pre className="overflow-x-auto bg-white p-4 text-xs leading-6 text-zinc-800">
        <code>{code}</code>
      </pre>
    </div>
  );
}