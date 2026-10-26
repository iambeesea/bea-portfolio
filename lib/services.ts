/**
 * The Services page content. Proof links point at projects in the portfolio
 * (opened as case studies) or at work described in text.
 */
export interface Service {
  id: string;
  title: string;
  pitch: string;
  includes: string[];
  tools: string[];
  /** Slugs of portfolio projects shown as proof. */
  projects?: string[];
}

export const services: Service[] = [
  {
    id: 'design',
    title: 'Brand & social design',
    pitch: 'Social posts and print pieces that stop the scroll and stay on brand.',
    includes: [
      'Instagram carousels, stories and single-post statics',
      'Menus, posters and print layouts',
      'Campaign assets for launches, promos and events',
    ],
    tools: ['Figma', 'Adobe Photoshop', 'Canva'],
    projects: ['kata-consulting', 'rion-events', 'trey-coffee-menu'],
  },
  {
    id: 'websites',
    title: 'Websites & web apps',
    pitch: 'Fast, responsive sites and apps, designed in Figma and built in code.',
    includes: [
      'Landing pages and marketing websites',
      'Full-stack web apps with sign-in, dashboards and databases',
      'Responsive, accessible builds that are ready for search',
    ],
    tools: ['Figma', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    projects: ['oasis-hookah-bar', 'sinag', 'ics-alumni', 'courtmate'],
  },
  {
    id: 'automation',
    title: 'Automation',
    pitch: 'Let the repetitive work run itself, so nothing slips through.',
    includes: [
      'Form → database → inbox workflows',
      'Booking confirmations, notifications and calendar reminders',
      'Scheduled jobs and connections between the tools you already use',
      'GoHighLevel (GHL): funnels and websites, CRM pipelines, and automated workflows for follow-ups and bookings',
    ],
    tools: ['GoHighLevel', 'Node.js', 'Supabase', 'Resend', 'Google Calendar API', 'Vercel Cron', 'GitHub Actions'],
  },
  {
    id: 'reels',
    title: 'Reels & short video',
    pitch: 'Short, polished reels that show the real thing.',
    includes: [
      'Instagram and TikTok reels for brands',
      'Event highlights and behind-the-scenes edits',
      'On-brand captions and text overlays',
    ],
    tools: ['CapCut'],
  },
];

/** Automation work, described rather than shown. */
export const automations = [
  {
    title: 'This portfolio’s contact form',
    body: 'Every message is checked for spam, saved to a database and emailed to me, and a daily job keeps the database awake.',
    steps: ['Form', 'Validate', 'Database', 'Email'],
  },
  {
    title: 'KINTAB car wash bookings',
    body: 'Booking confirmation emails, administrator notifications and Google Calendar reminders go out on their own.',
    steps: ['Booking', 'Confirm', 'Notify', 'Remind'],
  },
];

export const reels = [
  {
    src: '/videos/rion-reel-entrance.mp4',
    poster: '/videos/rion-reel-entrance.webp',
    width: 720,
    height: 1280,
    label: 'RION Events: Barangay Assembly Day setup',
  },
  {
    src: '/videos/rion-reel-teachers.mp4',
    poster: '/videos/rion-reel-teachers.webp',
    width: 1024,
    height: 1280,
    label: 'RION Events: Teachers’ Day celebration',
  },
];
