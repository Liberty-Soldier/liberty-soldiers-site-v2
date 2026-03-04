import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://libertysoldiers.com";
  const now = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reports`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/war-escalation`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.95,
    },

    // keep your other static pages if they exist:
    // { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // { url: `${baseUrl}/privacy-terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // { url: `${baseUrl}/store`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
