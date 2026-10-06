import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// The portfolio is a single page; case studies open as overlays on it.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
