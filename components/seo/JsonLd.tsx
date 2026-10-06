import { site } from '@/lib/site';
import type { Project } from '@/types/content';

/** Structured data: who the site is about, the site itself, and the projects on it. */
export function JsonLd({ projects }: { projects: Project[] }) {
  const person = {
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.name,
    alternateName: 'Bea Capule',
    jobTitle: site.jobTitle,
    email: `mailto:${site.email}`,
    url: site.url,
    image: `${site.url}/images/bea-grad.jpg`,
    sameAs: [site.linkedin],
    address: { '@type': 'PostalAddress', addressCountry: 'PH' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of the Philippines Los Baños' },
  };

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — Portfolio`,
        description: site.description,
        inLanguage: 'en',
        author: { '@id': person['@id'] },
      },
      ...projects.map((project) => ({
        '@type': 'CreativeWork',
        '@id': `${site.url}/#work/${project.slug}`,
        name: project.name,
        description: project.description,
        genre: project.tag,
        ...(project.year ? { dateCreated: project.year } : {}),
        ...(project.stack.length ? { keywords: project.stack.join(', ') } : {}),
        ...(project.liveUrl ? { url: project.liveUrl } : {}),
        creator: { '@id': person['@id'] },
      })),
    ],
  };

  // "<" is escaped so content can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
