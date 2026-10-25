import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types/content';

/** A portfolio project used as proof for a service; opens its case study. */
export function ProofCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/#work/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-panel no-underline transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-well">
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : null}
      </div>
      <div className="flex items-baseline justify-between gap-3 px-4 py-3">
        <span className="font-wide text-[15px] font-semibold text-ink">{project.name}</span>
        <span className="shrink-0 text-xs text-muted">{project.tag}</span>
      </div>
    </Link>
  );
}
