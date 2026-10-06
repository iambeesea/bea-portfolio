import { Fragment } from 'react';
import Image from 'next/image';
import { css, list, txt } from '@/lib/experience/view';
import type { ViewModel } from '@/lib/experience/view';

/**
 * One project in the Work marquee. `p` is a project plus the hover and open
 * handlers the engine attaches to it. Shows the project's thumbnail when it
 * has one, and a labelled placeholder until then.
 */
export function ProjectCard({ p }: { p: ViewModel }) {
  return (
    <button
      className="px-f6"
      tabIndex={p?.tab}
      aria-hidden={p?.hid}
      onClick={p?.open}
      onMouseEnter={p?.enter}
      onMouseLeave={p?.leave}
      onFocus={p?.enter}
      onBlur={p?.leave}
      aria-label={p?.aria}
      style={css(
        `position:relative;flex:none;height:100%;aspect-ratio:${p?.ar ?? ''};min-height:0;overflow:hidden;border-radius:18px;border:1px solid var(--line);background:var(--well);padding:0;text-align:left;color:var(--ink)`,
      )}
    >
      <span
        data-cover={'1'}
        aria-hidden={'true'}
        style={css(
          `position:absolute;inset:0;display:grid;place-items:center;background:repeating-linear-gradient(135deg,var(--well) 0 12px,var(--well2) 12px 24px);transform:scale(${p?.imgScale ?? ''});transition:transform 600ms cubic-bezier(.16,1,.3,1)`,
        )}
      >
        {p?.thumbnailUrl ? (
          <Image src={p.thumbnailUrl} alt="" fill sizes="(max-width: 640px) 85vw, 45vw" style={{ objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            {txt(p?.name)}
            {' · cover image [PH]'}
          </span>
        )}
      </span>
      <span
        aria-hidden={'true'}
        style={css(
          `position:absolute;inset:0;background:linear-gradient(to top,rgba(var(--deep-rgb),.88),rgba(var(--deep-rgb),.25) 55%,rgba(var(--deep-rgb),0));opacity:${p?.ovOp ?? ''};transition:opacity 450ms ease`,
        )}
      ></span>
      <span
        style={css(
          `position:absolute;left:clamp(14px,1.8vw,24px);right:clamp(14px,1.8vw,24px);bottom:clamp(14px,1.8vw,22px);display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:10px 12px;opacity:${p?.ovOp ?? ''};transform:translateY(${p?.ovY ?? ''});transition:opacity 450ms ease,transform 520ms cubic-bezier(.16,1,.3,1)`,
        )}
      >
        <span style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '0' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--wide)',
              fontWeight: '700',
              fontStretch: '118%',
              fontSize: 'clamp(18px,2.2vw,32px)',
              lineHeight: '1',
              letterSpacing: '-.02em',
              textTransform: 'uppercase',
            }}
          >
            {txt(p?.name)}
          </span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {list(p?.tags).map((t, i1) => (
              <Fragment key={i1}>
                <span
                  style={{
                    padding: '5px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(var(--ink-rgb),.3)',
                    background: 'rgba(var(--bg-rgb),.55)',
                    fontSize: '11px',
                    letterSpacing: '.03em',
                    color: 'var(--ink2)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {txt(t)}
                </span>
              </Fragment>
            ))}
          </span>
        </span>
        <span
          aria-hidden={'true'}
          style={{ flex: 'none', fontSize: '11px', letterSpacing: '.08em', color: 'var(--ink)', whiteSpace: 'nowrap' }}
        >
          {'VIEW PROJECT ↗'}
        </span>
      </span>
    </button>
  );
}
