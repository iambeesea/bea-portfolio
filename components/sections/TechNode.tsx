import type { ViewModel } from '@/lib/experience/view';
import type { Technology } from '@/types/content';

const dot = { display: 'block', width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' } as const;

/** One star in the tech constellation: icon (or a plain dot), name and role. */
export function TechNode({ tech, index, v }: { tech: Technology; index: number; v: ViewModel }) {
  const mask = tech.icon ? `url(/icons/${tech.icon}.svg) center/contain no-repeat` : null;

  return (
    <li
      className="px-f7"
      data-tn={String(index)}
      tabIndex={0}
      aria-label={`${tech.name} — ${tech.category}, ${tech.description}`}
      onMouseEnter={v.curOn}
      onMouseLeave={v.curOff}
      style={{
        position: 'absolute',
        left: '0',
        top: '0',
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '3px',
        opacity: '0',
        willChange: 'transform,opacity',
        outline: 'none',
        borderRadius: '6px',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '.5em',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--wide)',
          fontWeight: '500',
          fontStretch: '106%',
          fontSize: 'clamp(11px,min(1.15vw,2.1vh),17px)',
          letterSpacing: '-.005em',
        }}
      >
        {mask ? (
          <span aria-hidden="true" style={{ position: 'relative', flex: 'none', width: '1.1em', height: '1.1em' }}>
            <span style={{ position: 'absolute', inset: '0', background: 'var(--body)', WebkitMask: mask, mask }}></span>
            <span
              data-tbrand="1"
              style={{ position: 'absolute', inset: '0', background: tech.brandColor, opacity: '0', WebkitMask: mask, mask }}
            ></span>
          </span>
        ) : (
          <span
            aria-hidden="true"
            style={{
              position: 'relative',
              flex: 'none',
              width: '1.1em',
              height: '1.1em',
              display: 'grid',
              placeItems: 'center',
              fontSize: '.8em',
              color: 'var(--body)',
            }}
          >
            <span style={dot}></span>
            <span
              data-tbrand="1"
              style={{ position: 'absolute', inset: '0', display: 'grid', placeItems: 'center', color: tech.brandColor, opacity: '0' }}
            >
              <span style={dot}></span>
            </span>
          </span>
        )}
        <span data-tlabel="1" style={{ color: 'var(--body)' }}>
          {tech.name}
        </span>
      </span>
      <span
        data-tdesc="1"
        style={{
          paddingLeft: '1.6em',
          fontSize: '10px',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          opacity: '0',
        }}
      >
        {tech.description}
      </span>
    </li>
  );
}
