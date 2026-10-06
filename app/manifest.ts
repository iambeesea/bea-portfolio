import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Portfolio`,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: site.themeColor.dark,
    theme_color: site.themeColor.dark,
    icons: [{ src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }],
  };
}
