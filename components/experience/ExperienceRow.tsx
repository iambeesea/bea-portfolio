import { css, txt } from '@/lib/experience/view';
import type { ViewModel } from '@/lib/experience/view';

/**
 * One role in the Experience list (work or leadership). `it` is the role plus
 * the open/hover state and handlers the engine attaches to it.
 */
export function ExperienceRow({ it, v }: { it: ViewModel; v: ViewModel }) {
  return (
    <>
      <button
        className="px-f4"
        aria-pressed={it?.exp}
        aria-controls={'xp-detail'}
        onClick={it?.toggle}
        onMouseEnter={it?.enter}
        onMouseLeave={it?.leave}
        style={css(
          `width:100%;display:grid;grid-template-columns:14px minmax(0,1fr) 16px;align-items:center;gap:clamp(12px,1.6vw,20px);min-height:${v.xpRowMin ?? ''};padding:${v.xpRowPad ?? ''} clamp(8px,1vw,14px);text-align:left;border-top:1px solid var(--line);background:${it?.bg ?? ''};color:var(--ink);transition:background-color 320ms ease`,
        )}
      >
        <span aria-hidden={'true'} style={{ position: 'relative', display: 'grid', placeItems: 'center', width: '14px', height: '14px' }}>
          <span
            style={css(
              `width:7px;height:7px;border-radius:50%;border:1px solid ${it?.star ?? ''};background:${it?.starFill ?? ''};box-shadow:${it?.starGlow ?? ''};transition:background-color 320ms ease,box-shadow 320ms ease`,
            )}
          ></span>
        </span>
        <span style={{ minWidth: '0', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span
            style={css(
              `font-family:var(--wide);font-weight:400;font-stretch:104%;font-size:${v.xpRowFont ?? ''};line-height:1.25;letter-spacing:-.01em`,
            )}
          >
            {txt(it?.role)}
            <span style={{ color: 'var(--muted)' }}>
              {'  ·  '}
              {txt(it?.company)}
            </span>
          </span>
          <span style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {txt(it?.dates)}
          </span>
        </span>
        <span
          aria-hidden={'true'}
          style={css(
            `font-size:14px;color:var(--muted);opacity:${it?.arrow ?? ''};transform:translateX(${it?.arrowX ?? ''});transition:opacity 300ms ease,transform 420ms cubic-bezier(.16,1,.3,1)`,
          )}
        >
          {'→'}
        </span>
      </button>
    </>
  );
}
