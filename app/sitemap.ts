import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-10-21');
  return [
    { url: 'https://codetechs.com', lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: 'https://codetechs.com/solutions', lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://codetechs.com/contact', lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
