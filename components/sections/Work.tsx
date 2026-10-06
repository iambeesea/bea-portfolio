// Generated from the Claude Design export, then maintained by hand.
import { Fragment } from 'react';
import { txt, list } from '@/lib/experience/view';
import { ProjectCard } from '@/components/projects/ProjectCard';
import type { ViewModel } from '@/lib/experience/view';
export function Work({ v }: { v: ViewModel }) {
  return (
    <section
      data-panel={''}
      data-screen-label={'Work'}
      style={{
        position: 'sticky',
        top: '0',
        height: '100%',
        overflow: 'hidden',
        zIndex: '5',
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          height: '100%',
          padding: 'clamp(76px,12vh,108px) 6vw clamp(28px,5vh,48px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(14px,2.4vh,26px)',
        }}
      >
        <div data-wrev={'0'} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '20px' }}>
          <span style={{ fontSize: '12px', letterSpacing: '.06em', color: 'var(--muted)' }}>{'Selected Work'}</span>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            {txt(v.workCount)}
            {' projects'}
          </span>
        </div>
        <div
          style={{ flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.4vw,18px)', margin: '0 -6vw' }}
        >
          <div data-wrev={'1'} style={{ flex: '1', minHeight: '0', overflow: 'hidden' }}>
            <div
              ref={v.track1Ref}
              onMouseEnter={v.pause1}
              onMouseLeave={v.resume1}
              style={{ display: 'flex', gap: 'clamp(10px,1.4vw,18px)', height: '100%', width: 'max-content', willChange: 'transform' }}
            >
              {list(v.row1).map((p, i0) => (
                <Fragment key={i0}>
                  <ProjectCard p={p} />
                </Fragment>
              ))}
            </div>
          </div>
          <div data-wrev={'2'} style={{ flex: '1', minHeight: '0', overflow: 'hidden' }}>
            <div
              ref={v.track2Ref}
              onMouseEnter={v.pause2}
              onMouseLeave={v.resume2}
              style={{ display: 'flex', gap: 'clamp(10px,1.4vw,18px)', height: '100%', width: 'max-content', willChange: 'transform' }}
            >
              {list(v.row2).map((p, i0) => (
                <Fragment key={i0}>
                  <ProjectCard p={p} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
