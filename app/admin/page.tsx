"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

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
  xPost1?: string;
  xPost2?: string;
  xPost3?: string;
};

type FeedStory = {
  title: string;
  link?: string;
  source?: string;
  domain?: string;
  isoDate?: string;
  minutesOld?: number;
  score?: number;
  reasonTags?: string[];
  hardCategory?: HardCategory;
  snippet?: string;
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
  const [feedStories, setFeedStories] = useState<FeedStory[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"queue" | "editor" | "export">(
    "queue"
  );
  const [intakeUrl, setIntakeUrl] = useState("");
  const [intakeTitle, setIntakeTitle] = useState("");
  const [intakeNotes, setIntakeNotes] = useState("");
  const [search, setSearch] = useState("");
  const [loadingIntake, setLoadingIntake] = useState(false);
  const [loadingGenerateDraft, setLoadingGenerateDraft] = useState(false);
  const [loadingGenerateSelected, setLoadingGenerateSelected] = useState(false);
  const [loadingGenerateOg, setLoadingGenerateOg] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);

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

  const counts = useMemo(() => {
    return {
      total: queue.length,
      draft: queue.filter((x) => x.status === "draft").length,
      review: queue.filter((x) => x.status === "review").length,
      approved: queue.filter((x) => x.status === "approved").length,
      rejected: queue.filter((x) => x.status === "rejected").length,
    };
  }, [queue]);

  async function loadQueue() {
    try {
      const res = await fetch("/api/admin/queue", {
        cache: "no-store",
      });
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

  async function runIntake() {
    try {
      setLoadingIntake(true);

      const res = await fetch("/api/admin/intake", {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json();

      if (!data.ok) {
        alert(data.error || "Pull Feed failed");
        return;
      }

      const stories = Array.isArray(data.stories) ? data.stories : [];
      setFeedStories(stories);

      alert(
        `Scanned: ${data.scanned}\nSelected: ${data.selected}\nStories loaded: ${stories.length}`
      );
    } catch (err) {
      console.error("INTAKE ERROR:", err);
      alert("Pull Feed failed — check console");
    } finally {
      setLoadingIntake(false);
    }
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
      xPost1: "",
      xPost2: "",
      xPost3: "",
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

  function handleAddFeedStory(story: FeedStory) {
    const title = (story.title || "").trim() || "Untitled Draft";
    const slug = slugify(title);

    const newItem: QueueItem = {
      id: `q-${Date.now()}`,
      title,
      excerpt:
        story.snippet || "Scanned from feed. Review before publishing.",
      source: story.source || "Feed Intake",
      sourceUrl: story.link || undefined,
      dateISO:
        typeof story.isoDate === "string" && story.isoDate
          ? story.isoDate.slice(0, 10)
          : new Date().toISOString().slice(0, 10),
      byline: "Liberty Soldiers",
      coverImage: getHardCategoryDefaultImage(
        story.hardCategory || "Power & Control"
      ),
      category: story.hardCategory || "Power & Control",
      hardCategory: story.hardCategory || "Power & Control",
      readTime: "3 min",
      featured: false,
      priority: 3,
      kind: "report",
      slug,
      status: "draft",
      body: story.snippet || "Expand this scanned story into a full draft.",
      xPost1: "",
      xPost2: "",
      xPost3: "",
    };

    setQueue((prev) => {
      const nextQueue = [newItem, ...prev];
      void saveQueue(nextQueue);
      return nextQueue;
    });

    setSelectedId(newItem.id);
    setActiveTab("editor");
  }

  async function handleGenerateDraft() {
    try {
      setLoadingGenerateDraft(true);

      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "manual",
          intakeUrl,
          intakeTitle,
          intakeNotes,
          intakeMeta: {
            source: intakeUrl.trim() ? "Manual URL intake" : "Manual notes intake",
          },
          skipOg: true,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        console.error("Generate failed", data);
        alert(data.details || data.error || "Generate failed");
        return;
      }

      await loadQueue();

      if (data.item?.id) {
        setSelectedId(data.item.id);
      }

      setActiveTab("editor");
      setIntakeUrl("");
      setIntakeTitle("");
      setIntakeNotes("");
      alert("Draft generated");
    } catch (err) {
      console.error("Failed to generate draft", err);
      alert("Failed to generate draft");
    } finally {
      setLoadingGenerateDraft(false);
    }
  }

  async function handleGenerateFeedStory(story: FeedStory) {
    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "manual",
          intakeUrl: story.link || "",
          intakeTitle: story.title || "",
          intakeNotes: story.snippet || "",
          intakeMeta: {
            source: story.source || "Feed Intake",
            domain: story.domain,
            isoDate: story.isoDate,
            score: story.score,
            reasonTags: story.reasonTags || [],
            hardCategory: story.hardCategory || "Power & Control",
          },
          skipOg: true,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        console.error("Generate feed story failed", data);
        alert(data.details || data.error || "Generate failed");
        return;
      }

      await loadQueue();

      if (data.item?.id) {
        setSelectedId(data.item.id);
      }

      setActiveTab("editor");
      alert("Draft generated from feed story");
    } catch (err) {
      console.error("Failed to generate feed story", err);
      alert("Failed to generate feed story");
    }
  }

  async function handleGenerateSelected() {
    if (!selected) return;

    try {
      setLoadingGenerateSelected(true);

      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "manual",
          id: selected.id,
          intakeUrl: selected.sourceUrl || "",
          intakeTitle: selected.title,
          intakeNotes: selected.excerpt || "",
          intakeMeta: {
            source: selected.source,
            hardCategory: selected.hardCategory,
          },
          skipOg: true,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        console.error("Generate selected draft failed", data);
        alert(data.details || data.error || "Generate selected draft failed");
        return;
      }

      if (data.skipped) {
        alert(`Skipped: ${data.reason || "unknown reason"}`);
        return;
      }

      await loadQueue();
      setSelectedId(selected.id);
      setActiveTab("editor");
      alert("Draft regenerated");
    } catch (err) {
      console.error("Failed to generate selected draft", err);
      alert("Failed to generate selected draft");
    } finally {
      setLoadingGenerateSelected(false);
    }
  }

  async function handleGenerateOg() {
    if (!selected) return;

    try {
      setLoadingGenerateOg(true);

      const res = await fetch("/api/admin/generate-og", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: selected.title,
          excerpt: selected.excerpt,
          hardCategory: selected.hardCategory,
          slug: selected.slug,
        }),
      });

      const data = await res.json();

      if (!data.ok || !data.url) {
        console.error("Generate OG failed", data);
        alert(data.error || "Generate OG failed");
        return;
      }

      const nextQueue = queue.map((item) =>
        item.id === selected.id ? { ...item, coverImage: data.url } : item
      );

      setQueue(nextQueue);
      await saveQueue(nextQueue);

      alert("OG image generated");
    } catch (err) {
      console.error("Failed to generate OG", err);
      alert("Failed to generate OG");
    } finally {
      setLoadingGenerateOg(false);
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

  async function handlePublish() {
    if (!selected) return;

    try {
      setLoadingPublish(true);

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
          `Article published, but X posting failed.\n\n${
            data.xPost.error || "Unknown X error"
          }`
        );
        return;
      }

      alert("Published successfully");
    } catch (err) {
      console.error("Publish failed", err);
      alert("Publish failed");
    } finally {
      setLoadingPublish(false);
    }
  }

  useEffect(() => {
    void loadQueue();
  }, []);

  function updateSelected<K extends keyof QueueItem>(
    key: K,
    value: QueueItem[K]
  ) {
    if (!selected) return;

    setQueue((prev) => {
      const nextQueue = prev.map((item) => {
        if (item.id !== selected.id) return item;

        const next: QueueItem = { ...item, [key]: value };

        if (key === "title") {
          next.slug = slugify(String(value));
        }

        return next;
      });

      void saveQueue(nextQueue);
      return nextQueue;
    });
  }

  function updateStatus(status: QueueStatus) {
    if (!selected) return;
    updateSelected("status", status);
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

              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  onClick={runIntake}
                  disabled={loadingIntake}
                  className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50"
                >
                  {loadingIntake ? "Pulling..." : "Pull Feed"}
                </button>
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 md:text-base">
                Scan fresh stories, generate drafts one at a time, manually edit
                every field, regenerate or override OG images, and publish to
                the site and X from one place.
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

        <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Manual Intake</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Add a source URL, story title, or notes to create or generate a
                draft manually.
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
                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
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
                    disabled={loadingGenerateDraft}
                    className="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50"
                  >
                    {loadingGenerateDraft ? "Generating..." : "Generate Draft"}
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Feed Stories</h2>
                <span className="text-xs text-zinc-500">
                  {feedStories.length} loaded
                </span>
              </div>

              <p className="mt-1 text-sm text-zinc-600">
                Pull fresh scanned stories, then choose which ones to add to the
                queue or turn directly into drafts.
              </p>

              <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">
                {feedStories.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">
                    No scanned stories loaded yet. Click Pull Feed.
                  </div>
                ) : (
                  feedStories.map((story, idx) => (
                    <FeedStoryCard
                      key={`${story.link || story.title || "story"}-${idx}`}
                      story={story}
                      onAdd={() => handleAddFeedStory(story)}
                      onGenerate={() => handleGenerateFeedStory(story)}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Queue</h2>
                <span className="text-xs text-zinc-500">
                  {filteredQueue.length} items
                </span>
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
                {filteredQueue.map((item) => {
                  const isActive =
                    item.id === selectedId || (!selectedId && item.id === queue[0]?.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedId(item.id);
                        setActiveTab("editor");
                      }}
                      className={cls(
                        "w-full rounded-2xl border p-4 text-left transition",
                        isActive
                          ? "border-zinc-900 bg-zinc-900 text-white"
                          : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div
                            className={cls(
                              "text-xs",
                              isActive ? "text-zinc-300" : "text-zinc-500"
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
                            isActive
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
                          isActive ? "text-zinc-300" : "text-zinc-600"
                        )}
                      >
                        {item.excerpt}
                      </div>

                      <div
                        className={cls(
                          "mt-3 flex flex-wrap gap-2 text-[11px]",
                          isActive ? "text-zinc-300" : "text-zinc-500"
                        )}
                      >
                        <span>{item.hardCategory}</span>
                        <span>•</span>
                        <span>{item.kind}</span>
                        <span>•</span>
                        <span>{item.dateISO}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            {!selected ? (
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold tracking-tight">
                  No queue items yet
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
                  Use Manual Intake or Pull Feed on the left to create a draft.
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
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
                          onClick={handleGenerateSelected}
                          disabled={loadingGenerateSelected}
                          className="rounded-2xl border border-zinc-300 bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
                        >
                          {loadingGenerateSelected ? "Generating..." : "Regenerate Draft"}
                        </button>

                        <button
                          onClick={handleGenerateOg}
                          disabled={loadingGenerateOg}
                          className="rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 disabled:opacity-50"
                        >
                          {loadingGenerateOg ? "Generating OG..." : "Generate OG"}
                        </button>

                        <button
                          onClick={() => {
                            updateSelected(
                              "coverImage",
                              getHardCategoryDefaultImage(selected.hardCategory)
                            );
                          }}
                          className="rounded-2xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
                        >
                          Use Default OG
                        </button>

                        <button
                          onClick={() => updateStatus("approved")}
                          className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
                        >
                          Approve
                        </button>

                        <button
                          onClick={handlePublish}
                          disabled={loadingPublish}
                          className="rounded-2xl border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50"
                        >
                          {loadingPublish ? "Publishing..." : "Publish"}
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
                      <InfoCard
                        label="Slug"
                        value={selected.slug}
                        sub="/news route target"
                      />
                      <InfoCard
                        label="Cover Image"
                        value={selected.coverImage}
                        sub="OG / hero asset"
                      />
                    </div>

                    <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                      <div className="text-sm font-semibold text-zinc-800">
                        Body Preview
                      </div>
                      <div className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-700">
                        {selected.body}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "editor" && (
                  <div className="space-y-6">
                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                      <h2 className="text-xl font-semibold tracking-tight">
                        Article Editor
                      </h2>
                      <p className="mt-1 text-sm text-zinc-600">
                        Edit the draft, override X thread copy, and manually set
                        the OG file path if needed.
                      </p>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={handleDelete}
                          className="rounded-2xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                        >
                          Delete Draft
                        </button>
                      </div>

                      <div className="mt-6 rounded-2xl border border-black bg-white p-4">
                        <div className="mb-3 text-sm font-semibold text-black">
                          X Thread (What actually gets seen)
                        </div>

                        <div className="space-y-4">
                          <Field label="X Post 1">
                            <textarea
                              value={selected.xPost1 || ""}
                              onChange={(e) =>
                                updateSelected("xPost1", e.target.value)
                              }
                              rows={3}
                              className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
                            />
                            <div className="mt-1 text-xs text-zinc-500">
                              {(selected.xPost1 || "").length}/280
                            </div>
                          </Field>

                          <Field label="X Post 2">
                            <textarea
                              value={selected.xPost2 || ""}
                              onChange={(e) =>
                                updateSelected("xPost2", e.target.value)
                              }
                              rows={3}
                              className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
                            />
                            <div className="mt-1 text-xs text-zinc-500">
                              {(selected.xPost2 || "").length}/280
                            </div>
                          </Field>

                          <Field label="X Post 3 (optional)">
                            <textarea
                              value={selected.xPost3 || ""}
                              onChange={(e) =>
                                updateSelected("xPost3", e.target.value)
                              }
                              rows={2}
                              className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
                            />
                            <div className="mt-1 text-xs text-zinc-500">
                              {(selected.xPost3 || "").length}/280
                            </div>
                          </Field>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-5">
                        <Field label="Title">
                          <input
                            value={selected.title}
                            onChange={(e) =>
                              updateSelected("title", e.target.value)
                            }
                            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                          />
                        </Field>

                        <Field label="Excerpt">
                          <textarea
                            value={selected.excerpt}
                            onChange={(e) =>
                              updateSelected("excerpt", e.target.value)
                            }
                            rows={4}
                            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                          />
                        </Field>

                        <Field label="Body">
                          <textarea
                            value={selected.body}
                            onChange={(e) =>
                              updateSelected("body", e.target.value)
                            }
                            rows={18}
                            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                          />
                        </Field>

                        <div className="grid gap-5 md:grid-cols-2">
                          <Field label="Slug">
                            <input
                              value={selected.slug}
                              onChange={(e) =>
                                updateSelected("slug", slugify(e.target.value))
                              }
                              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                            />
                          </Field>

                          <Field label="Date ISO">
                            <input
                              value={selected.dateISO}
                              onChange={(e) =>
                                updateSelected("dateISO", e.target.value)
                              }
                              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                            />
                          </Field>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                          <Field label="Byline">
                            <input
                              value={selected.byline}
                              onChange={(e) =>
                                updateSelected("byline", e.target.value)
                              }
                              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                            />
                          </Field>

                          <Field label="Read Time">
                            <input
                              value={selected.readTime}
                              onChange={(e) =>
                                updateSelected("readTime", e.target.value)
                              }
                              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                            />
                          </Field>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                          <Field label="Category">
                            <input
                              value={selected.category}
                              onChange={(e) =>
                                updateSelected("category", e.target.value)
                              }
                              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                            />
                          </Field>

                          <Field label="Hard Category">
                            <select
                              value={selected.hardCategory}
                              onChange={(e) =>
                                updateSelected(
                                  "hardCategory",
                                  e.target.value as HardCategory
                                )
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
                              onChange={(e) =>
                                updateSelected(
                                  "kind",
                                  e.target.value as ReportKind
                                )
                              }
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
                                updateSelected(
                                  "priority",
                                  Number(e.target.value || 1)
                                )
                              }
                              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                            />
                          </Field>

                          <Field label="Featured">
                            <select
                              value={selected.featured ? "true" : "false"}
                              onChange={(e) =>
                                updateSelected(
                                  "featured",
                                  e.target.value === "true"
                                )
                              }
                              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                            >
                              <option value="false">False</option>
                              <option value="true">True</option>
                            </select>
                          </Field>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                          <Field label="Source">
                            <input
                              value={selected.source}
                              onChange={(e) =>
                                updateSelected("source", e.target.value)
                              }
                              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                            />
                          </Field>

                          <Field label="Source URL">
                            <input
                              value={selected.sourceUrl || ""}
                              onChange={(e) =>
                                updateSelected("sourceUrl", e.target.value)
                              }
                              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                            />
                          </Field>
                        </div>

                        <Field label="Cover Image Path / URL">
                          <input
                            value={selected.coverImage}
                            onChange={(e) =>
                              updateSelected("coverImage", e.target.value)
                            }
                            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "export" && (
                  <div className="space-y-6">
                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                      <h2 className="text-xl font-semibold tracking-tight">
                        reports.ts Object
                      </h2>
                      <p className="mt-1 text-sm text-zinc-600">
                        Copy this into your reports array entry.
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
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function FeedStoryCard({
  story,
  onAdd,
  onGenerate,
}: {
  story: FeedStory;
  onAdd: () => void;
  onGenerate: () => void;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="text-xs text-zinc-500">{story.source || "Unknown source"}</div>

      <div className="mt-1 text-sm font-semibold leading-5 text-zinc-900">
        {story.title}
      </div>

      <div className="mt-2 line-clamp-3 text-xs leading-5 text-zinc-600">
        {story.snippet}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-zinc-500">
        <span>{story.hardCategory || "Uncategorized"}</span>
        {typeof story.score === "number" ? (
          <>
            <span>•</span>
            <span>Score {story.score}</span>
          </>
        ) : null}
        {story.domain ? (
          <>
            <span>•</span>
            <span>{story.domain}</span>
          </>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={onAdd}
          className="rounded-2xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
        >
          Add to Queue
        </button>

        <button
          onClick={onGenerate}
          className="rounded-2xl border border-zinc-300 bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Generate Draft
        </button>

        {story.link ? (
          <a
            href={story.link}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
          >
            Open Source
          </a>
        ) : null}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-zinc-700">{label}</div>
      {children}
    </label>
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
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <div className="mt-2 break-words text-sm font-semibold text-zinc-900">
        {value}
      </div>
      {sub ? <div className="mt-1 text-xs text-zinc-500">{sub}</div> : null}
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

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  return (
    <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <div className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Code
        </div>
        <button
          onClick={handleCopy}
          className="rounded-xl border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-200 hover:bg-zinc-800"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-6 text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
