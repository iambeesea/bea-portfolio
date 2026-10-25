import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// The portfolio page (case studies open as overlays on it) and the Services page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
