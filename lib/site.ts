/** Static site configuration: identity, links and SEO defaults. */
export const site = {
  name: 'Beatrice Capule',
  shortName: 'Beatrice',
  title: 'Beatrice Capule — Software Development Lead, Full-Stack Developer & Digital Designer',
  description:
    'Portfolio of Beatrice Capule, a Computer Science graduate turning curiosity into meaningful digital experiences across software development, full-stack engineering and digital design.',
  jobTitle: 'Software Development Lead',
  email: 'beaxcapule@gmail.com',
  linkedin: 'https://www.linkedin.com/in/beacapule/',
  location: 'Philippines',
  themeColor: { dark: '#1B0230', light: '#F6EEF0' },
  /** Public address of the site; set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
} as const;
