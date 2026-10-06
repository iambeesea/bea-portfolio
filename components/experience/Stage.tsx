// Generated from the Claude Design export, then maintained by hand.
import { css, txt } from '@/lib/experience/view';
import type { ViewModel } from '@/lib/experience/view';
import { Nav } from '@/components/layout/Nav';
import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { TechConstellation } from '@/components/sections/TechConstellation';
import { Work } from '@/components/sections/Work';
import { Contact } from '@/components/sections/Contact';
import { CaseStudy } from '@/components/overlays/CaseStudy';
import { Lightbox } from '@/components/overlays/Lightbox';
import { Intro } from '@/components/overlays/Intro';
export function Stage({ v }: { v: ViewModel }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--sans)', fontWeight: '400', color: 'var(--ink)' }}>
      {v.isProto ? (
        <>
          <div
            style={css(
              `position:relative;height:100vh;min-height:min(560px,100vh);overflow:hidden;background:var(--bg);cursor:${v.cursorMode ?? ''}`,
            )}
          >
            <div
              ref={v.ringRef}
              aria-hidden={'true'}
              style={css(
                `display:${v.curDisp ?? ''};position:fixed;top:0;left:0;z-index:180;pointer-events:none;width:${v.ringSize ?? ''};height:${v.ringSize ?? ''};margin:${v.ringOffset ?? ''};border-radius:50%;border:1px solid ${v.ringColor ?? ''};background:${v.ringFill ?? ''};opacity:${v.curOpacity ?? ''};transition:width 320ms cubic-bezier(.16,1,.3,1),height 320ms cubic-bezier(.16,1,.3,1),opacity 240ms ease,border-color 240ms ease,background-color 240ms ease;will-change:transform`,
              )}
            ></div>
            <div
              ref={v.cursorRef}
              aria-hidden={'true'}
              style={css(
                `display:${v.curDisp ?? ''};position:fixed;top:0;left:0;z-index:181;pointer-events:none;width:${v.curSize ?? ''};height:${v.curSize ?? ''};margin:${v.curOffset ?? ''};border-radius:50%;background:var(--accent);opacity:${v.curOpacity ?? ''};transition:width 220ms cubic-bezier(.16,1,.3,1),height 220ms cubic-bezier(.16,1,.3,1),opacity 200ms ease;will-change:transform`,
              )}
            ></div>
            <div ref={v.homeRef} style={{ position: 'absolute', inset: '0', transformOrigin: '50% 45%' }}>
              <Nav v={v} />
              <div ref={v.scrollRef} style={{ position: 'relative', zIndex: '1', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
                <Hero v={v} />
                <Journey v={v} />
                <section
                  data-panel={''}
                  data-hold={'1'}
                  data-spacer={'1'}
                  aria-hidden={'true'}
                  style={{ position: 'sticky', top: '0', height: '100%', zIndex: '2', pointerEvents: 'none', background: 'transparent' }}
                >
                  <div style={{ height: '100%' }}></div>
                </section>
                <section
                  data-panel={''}
                  data-hold={'1'}
                  data-spacer={'1'}
                  aria-hidden={'true'}
                  style={{ position: 'sticky', top: '0', height: '100%', zIndex: '2', pointerEvents: 'none', background: 'transparent' }}
                >
                  <div style={{ height: '100%' }}></div>
                </section>
                <About v={v} />
                <Experience v={v} />
                <TechConstellation v={v} />
                <section
                  data-panel={''}
                  data-hold={'1'}
                  data-spacer={'1'}
                  aria-hidden={'true'}
                  style={{ position: 'sticky', top: '0', height: '100%', zIndex: '4', pointerEvents: 'none', background: 'transparent' }}
                >
                  <div style={{ height: '100%' }}></div>
                </section>
                <section
                  data-panel={''}
                  data-hold={'1'}
                  data-spacer={'1'}
                  aria-hidden={'true'}
                  style={{ position: 'sticky', top: '0', height: '100%', zIndex: '4', pointerEvents: 'none', background: 'transparent' }}
                >
                  <div style={{ height: '100%' }}></div>
                </section>
                <Work v={v} />
                <Contact v={v} />
              </div>
            </div>
            {v.caseOpen ? (
              <>
                <CaseStudy v={v} />
              </>
            ) : null}
            {v.lbOpen ? (
              <>
                <Lightbox v={v} />
              </>
            ) : null}
            {v.trans ? (
              <>
                <div
                  style={{
                    position: 'absolute',
                    inset: '0',
                    zIndex: '150',
                    pointerEvents: 'none',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'var(--bg)',
                    animation: 'curtain 820ms cubic-bezier(.76,0,.24,1) both',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--serif)',
                      fontWeight: '400',
                      fontSize: 'clamp(28px,5vw,64px)',
                      letterSpacing: '-.015em',
                      color: 'var(--muted)',
                      animation: 'rise 420ms 60ms cubic-bezier(.16,1,.3,1) both',
                    }}
                  >
                    {txt(v.transTo)}
                  </span>
                </div>
              </>
            ) : null}
            {v.introOn ? (
              <>
                <Intro v={v} />
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
