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
    {
      url: `${baseUrl}/live`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/timeline/us-israel-iran-war-timeline`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    // optional pages if they exist
    // {
    //   url: `${baseUrl}/videos`,
    //   lastModified: now,
    //   changeFrequency: "weekly",
    //   priority: 0.75,
    // },
    // {
    //   url: `${baseUrl}/store`,
    //   lastModified: now,
    //   changeFrequency: "monthly",
    //   priority: 0.5,
    // },
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: now,
    //   changeFrequency: "yearly",
    //   priority: 0.4,
    // },
  ];
}
