import 'server-only';
import { createPublicClient } from '@/lib/supabase/server';
import type { ExperienceRow, ProjectRow } from '@/types/database';
import type { Experience, PortfolioContent, Project } from '@/types/content';
import { fallbackContent } from './fallback';

const optional = (value: string | null): string | undefined => value ?? undefined;

function toProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    name: row.title,
    tag: row.category,
    role: row.role ?? '',
    year: row.year ?? '',
    org: row.organization ?? '',
    tags: row.tags.length ? row.tags : [row.category, row.role].filter((v): v is string => Boolean(v)),
    ar: row.aspect_ratio,
    description: row.short_description,
    stack: row.stack,
    features: row.features.length ? row.features : undefined,
    showFeatures: row.show_features,
    overview: optional(row.overview),
    problem: optional(row.problem),
    roleDetail: optional(row.role_detail),
    solution: optional(row.solution),
    process: optional(row.process),
    learnings: optional(row.learnings),
    outcome: optional(row.outcome),
    liveUrl: optional(row.project_url),
    githubUrl: optional(row.github_url),
    thumbnailUrl: optional(row.thumbnail_url),
  };
}

function toExperience(row: ExperienceRow): Experience {
  return {
    kind: row.kind,
    role: row.role,
    company: row.company,
    dates: row.date_label,
    place: row.location ?? '',
    summary: row.summary,
    bullets: row.bullets,
    tags: row.tags,
    media: [],
  };
}

/**
 * Loads the editable portfolio content from Supabase on the server.
 * Any problem — Supabase not configured, unreachable, or returning nothing —
 * falls back to the built-in content, section by section, so the site never
 * renders empty or crashes because of the database.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackContent;

  try {
    const [projects, experiences] = await Promise.all([
      supabase.from('projects').select('*').eq('status', 'published').order('sort_order').order('created_at'),
      supabase.from('experiences').select('*').eq('published', true).order('sort_order').order('created_at'),
    ]);

    // Falling back is expected behaviour (e.g. while a free-tier project is
    // paused), so this is a warning, not an error.
    const failed = projects.error ?? experiences.error;
    if (failed) console.warn(`[content] Supabase unavailable (${failed.message}); showing built-in content where needed.`);

    const projectList = (projects.data ?? []).map(toProject);
    const experienceList = (experiences.data ?? []).map(toExperience);
    const ofKind = (kind: Experience['kind'], fallback: Experience[]) => {
      const rows = experienceList.filter((e) => e.kind === kind);
      return rows.length ? rows : fallback;
    };

    return {
      projects: projectList.length ? projectList : fallbackContent.projects,
      experience: ofKind('work', fallbackContent.experience),
      leadership: ofKind('leadership', fallbackContent.leadership),
      education: ofKind('education', fallbackContent.education),
    };
  } catch (error) {
    console.warn('[content] Supabase unreachable; showing built-in content.', error);
    return fallbackContent;
  }
}
