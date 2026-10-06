// Generated from the Claude Design export, then maintained by hand.
import { css } from '@/lib/experience/view';
import type { ViewModel } from '@/lib/experience/view';
export function Nav({ v }: { v: ViewModel }) {
  return (
    <nav
      aria-label={'Primary'}
      style={{
        position: 'absolute',
        top: 'clamp(12px,2.2vh,20px)',
        left: '50%',
        zIndex: '60',
        width: 'min(1120px,calc(100% - clamp(20px,6vw,80px)))',
        transform: 'translateX(-50%)',
      }}
    >
      <div
        ref={v.navBarRef}
        onMouseMove={v.navMove}
        onMouseLeave={v.navLeave}
        style={css(
          `position:relative;display:grid;grid-template-columns:${v.navCols ?? ''};align-items:center;gap:${v.navGap ?? ''};padding:6px 6px 6px clamp(6px,1.6vw,18px);border-radius:999px;overflow:hidden;background:${v.navBg ?? ''};border:1px solid rgba(var(--ink-rgb),${v.navBorder ?? ''});backdrop-filter:blur(16px) saturate(1.15);-webkit-backdrop-filter:blur(16px) saturate(1.15);box-shadow:0 10px 30px rgba(var(--deep-rgb),.28);transition:background-color 320ms ease,border-color 320ms ease;animation:rise 700ms 150ms cubic-bezier(.16,1,.3,1) both;animation-play-state:${v.heroPlay ?? ''}`,
        )}
      >
        <span
          aria-hidden={'true'}
          data-navlight={'1'}
          style={{
            position: 'absolute',
            inset: '0',
            pointerEvents: 'none',
            background: 'radial-gradient(160px circle at var(--nx,-200px) var(--ny,50%),rgba(var(--glow-rgb),.07),transparent 70%)',
            opacity: '0',
            transition: 'opacity 300ms ease',
          }}
        ></span>
        <span
          aria-hidden={'true'}
          style={{
            position: 'absolute',
            left: '14%',
            top: '30%',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: 'var(--ink2)',
            opacity: '.14',
          }}
        ></span>
        <span
          aria-hidden={'true'}
          style={{
            position: 'absolute',
            left: '78%',
            top: '64%',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: 'var(--ink2)',
            opacity: '.12',
          }}
        ></span>
        <button
          className="px-f0"
          onClick={v.navHome}
          onMouseEnter={v.logoOn}
          onMouseLeave={v.logoOff}
          aria-label={'Beatrice Capule — back to top'}
          style={css(
            `display:${v.logoDisplay ?? ''};justify-self:start;position:relative;z-index:1;display:flex;align-items:center;gap:1px;min-height:38px;padding:0 6px;border-radius:999px;color:var(--ink)`,
          )}
        >
          <span
            aria-hidden={'true'}
            style={css(`font-family:var(--serif);font-style:italic;font-size:${v.logoSize ?? ''};line-height:1;letter-spacing:-.01em`)}
          >
            {'beatrice'}
          </span>
        </button>
        <div
          ref={v.navRef}
          style={{
            position: 'relative',
            justifySelf: 'center',
            minWidth: '0',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0px,.4vw,4px)',
          }}
        >
          <span
            ref={v.navPillRef}
            aria-hidden={'true'}
            style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '0',
              width: '0',
              borderRadius: '999px',
              background: 'rgba(var(--ink-rgb),.1)',
              boxShadow: 'inset 0 0 0 1px rgba(var(--ink-rgb),.12)',
              opacity: '0',
              transition: 'transform 480ms cubic-bezier(.16,1,.3,1),width 480ms cubic-bezier(.16,1,.3,1),opacity 300ms ease',
            }}
          ></span>
          <button
            className="px-h1 px-f0"
            data-nav={'0'}
            onClick={v.navHome}
            onMouseEnter={v.curOn}
            onMouseLeave={v.curOff}
            aria-current={v.navCur0}
            style={css(
              `position:relative;z-index:1;display:flex;align-items:center;gap:6px;min-height:38px;padding:${v.navPad ?? ''};border-radius:999px;white-space:nowrap;font-size:${v.navFont ?? ''};letter-spacing:.01em;font-weight:${v.navW0 ?? ''};color:${v.navC0 ?? ''};text-shadow:${v.navT0 ?? ''};transition:color 220ms ease,transform 220ms ease`,
            )}
          >
            {'Home'}
          </button>
          <button
            className="px-h1 px-f0"
            data-nav={'1'}
            onClick={v.navAbout}
            onMouseEnter={v.curOn}
            onMouseLeave={v.curOff}
            aria-current={v.navCur1}
            style={css(
              `position:relative;z-index:1;display:flex;align-items:center;gap:6px;min-height:38px;padding:${v.navPad ?? ''};border-radius:999px;white-space:nowrap;font-size:${v.navFont ?? ''};letter-spacing:.01em;font-weight:${v.navW1 ?? ''};color:${v.navC1 ?? ''};text-shadow:${v.navT1 ?? ''};transition:color 220ms ease,transform 220ms ease`,
            )}
          >
            {'About'}
          </button>
          <button
            className="px-h1 px-f0"
            data-nav={'2'}
            onClick={v.navExperience}
            onMouseEnter={v.curOn}
            onMouseLeave={v.curOff}
            aria-current={v.navCur2}
            style={css(
              `position:relative;z-index:1;display:flex;align-items:center;gap:6px;min-height:38px;padding:${v.navPad ?? ''};border-radius:999px;white-space:nowrap;font-size:${v.navFont ?? ''};letter-spacing:.01em;font-weight:${v.navW2 ?? ''};color:${v.navC2 ?? ''};text-shadow:${v.navT2 ?? ''};transition:color 220ms ease,transform 220ms ease`,
            )}
          >
            {'Experience'}
          </button>
          <button
            className="px-h1 px-f0"
            data-nav={'3'}
            onClick={v.navWork}
            onMouseEnter={v.curOn}
            onMouseLeave={v.curOff}
            aria-current={v.navCur3}
            style={css(
              `position:relative;z-index:1;display:flex;align-items:center;gap:6px;min-height:38px;padding:${v.navPad ?? ''};border-radius:999px;white-space:nowrap;font-size:${v.navFont ?? ''};letter-spacing:.01em;font-weight:${v.navW3 ?? ''};color:${v.navC3 ?? ''};text-shadow:${v.navT3 ?? ''};transition:color 220ms ease,transform 220ms ease`,
            )}
          >
            {'Work'}
          </button>
          <button
            className="px-h1 px-f0"
            data-nav={'4'}
            onClick={v.navContact}
            onMouseEnter={v.curOn}
            onMouseLeave={v.curOff}
            aria-current={v.navCur4}
            style={css(
              `position:relative;z-index:1;display:flex;align-items:center;gap:6px;min-height:38px;padding:${v.navPad ?? ''};border-radius:999px;white-space:nowrap;font-size:${v.navFont ?? ''};letter-spacing:.01em;font-weight:${v.navW4 ?? ''};color:${v.navC4 ?? ''};text-shadow:${v.navT4 ?? ''};transition:color 220ms ease,transform 220ms ease`,
            )}
          >
            {'Contact'}
          </button>
        </div>
        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="px-h2 px-f0"
            onClick={v.toggleSound}
            onMouseEnter={v.curOn}
            onMouseLeave={v.curOff}
            aria-label={v.soundAria}
            aria-pressed={v.soundPressed}
            style={css(
              `position:relative;flex:none;display:grid;place-items:center;width:${v.togSize ?? ''};height:${v.togSize ?? ''};border-radius:50%;border:1px solid rgba(var(--ink-rgb),.18);background:rgba(var(--ink-rgb),.05);color:var(--ink);transition:background-color 220ms ease,border-color 220ms ease`,
            )}
          >
            <svg
              aria-hidden={'true'}
              viewBox={'0 0 24 24'}
              width={'17'}
              height={'17'}
              style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round' }}
            >
              <path d={'M4 9.5h3.2L12 5.5v13l-4.8-4H4z'} />
              <g style={css(`opacity:${v.sndWaveOp ?? ''};transition:opacity 260ms ease`)}>
                <path d={'M15.5 9.2a4 4 0 0 1 0 5.6'} />
                <path d={'M18.2 6.6a7.6 7.6 0 0 1 0 10.8'} />
                <circle cx={'20.4'} cy={'4.6'} r={'.7'} style={{ fill: 'currentColor', stroke: 'none' }} />
              </g>
              <g style={css(`opacity:${v.sndMuteOp ?? ''};transition:opacity 260ms ease`)}>
                <path d={'M16 9.5l5 5M21 9.5l-5 5'} />
              </g>
            </svg>
          </button>
          <button
            className="px-h2 px-f0"
            onClick={v.toggleTheme}
            onMouseEnter={v.curOn}
            onMouseLeave={v.curOff}
            aria-label={v.themeLabel}
            style={css(
              `position:relative;flex:none;width:${v.togSize ?? ''};height:${v.togSize ?? ''};border-radius:50%;border:1px solid rgba(var(--ink-rgb),.18);background:rgba(var(--ink-rgb),.05);color:var(--ink);transition:background-color 220ms ease,border-color 220ms ease`,
            )}
          >
            <svg
              aria-hidden={'true'}
              viewBox={'0 0 24 24'}
              width={'17'}
              height={'17'}
              style={css(
                `position:absolute;left:50%;top:50%;margin:-8.5px 0 0 -8.5px;opacity:${v.moonOp ?? ''};transform:${v.moonT ?? ''};transition:opacity 300ms ease,transform 300ms cubic-bezier(.16,1,.3,1)`,
              )}
            >
              <path
                d={'M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z'}
                fill={'none'}
                stroke={'currentColor'}
                strokeWidth={'1.6'}
                strokeLinejoin={'round'}
              />
            </svg>
            <svg
              aria-hidden={'true'}
              viewBox={'0 0 24 24'}
              width={'17'}
              height={'17'}
              style={css(
                `position:absolute;left:50%;top:50%;margin:-8.5px 0 0 -8.5px;opacity:${v.sunOp ?? ''};transform:${v.sunT ?? ''};transition:opacity 300ms ease,transform 300ms cubic-bezier(.16,1,.3,1)`,
              )}
            >
              <g fill={'none'} stroke={'currentColor'} strokeWidth={'1.6'} strokeLinecap={'round'}>
                <circle cx={'12'} cy={'12'} r={'4'} />
                <path d={'M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4'} />
              </g>
            </svg>
          </button>
          {v.showCta ? (
            <>
              <button
                className="px-h3 px-f0"
                onClick={v.navContact}
                onMouseEnter={v.curOn}
                onMouseLeave={v.curOff}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '40px',
                  padding: '0 20px',
                  borderRadius: '999px',
                  background: 'var(--ink)',
                  color: 'var(--bg)',
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '.01em',
                  whiteSpace: 'nowrap',
                  transition: 'transform 220ms ease,background-color 320ms ease,color 320ms ease',
                }}
              >
                {'Let’s Talk'}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
