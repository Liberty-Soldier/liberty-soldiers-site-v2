export type Video = {
  title: string;
  url: string;
  platform: "YouTube" | "Rumble";
  date: string; // YYYY-MM-DD
  thumbnail?: string; // optional local image
};

export const VIDEOS: Video[] = [
  {
    title: "Anathema: How Galatians 1 Is Weaponized",
    url: "https://youtu.be/9_BCBwzKd00?si=uYPCjjMWHEoOZNbX",
    platform: "YouTube",
    date: "2025-10-15",
    thumbnail: "/videos/anathema.jpg",
  },
  {
    title: "Situational Awareness Briefing — January",
    url: "https://rumble.com/v73fukq-dispensationalism-exposed-darby-scofield-and-the-myth-of-modern-israel.html?e9s=src_v1_ucp_a",
    platform: "Rumble",
    date: "2025-08-08",
  },
];
