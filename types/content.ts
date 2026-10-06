/** A portfolio project, shown as a card in Work and as a case study overlay. */
export interface Project {
  slug: string;
  name: string;
  /** Short category label, e.g. "Civic platform". */
  tag: string;
  role: string;
  year: string;
  org: string;
  /** Labels shown on the card. */
  tags: string[];
  /** Card aspect ratio as CSS, e.g. "16 / 10". */
  ar: string;
  description: string;
  stack: string[];
  features?: string[];
  overview?: string;
  problem?: string;
  roleDetail?: string;
  solution?: string;
  process?: string;
  learnings?: string;
  outcome?: string;
  liveUrl?: string;
  githubUrl?: string;
  thumbnailUrl?: string;
}

export interface ExperienceMedia {
  src: string;
  alt: string;
  caption?: string;
  /** Only media explicitly cleared for public display is ever rendered. */
  safeForPortfolio: boolean;
}

export type ExperienceKind = 'work' | 'leadership' | 'education';

/** A role in the Experience section (work, leadership or education). */
export interface Experience {
  kind: ExperienceKind;
  role: string;
  company: string;
  /** Free-form date label, e.g. "2024 – 2026". */
  dates: string;
  place: string;
  summary: string;
  bullets: string[];
  tags: string[];
  media: ExperienceMedia[];
}

/** A skill in the tech constellation. Static: it lives in lib/content/technologies.ts. */
export interface Technology {
  name: string;
  category: string;
  /** Short role of the tool, e.g. "UI library". */
  description: string;
  /** File name (without .svg) in /public/icons. */
  icon?: string;
  /** Colour the star lights up in on hover. */
  brandColor: string;
}

export interface PortfolioContent {
  projects: Project[];
  experience: Experience[];
  leadership: Experience[];
  education: Experience[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
  message: string;
}
