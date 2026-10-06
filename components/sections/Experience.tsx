// Generated from the Claude Design export, then maintained by hand.
/* eslint-disable @next/next/no-img-element -- role images come from content with unknown dimensions, so next/image cannot size them */
import { Fragment } from 'react';
import { css, txt, list } from '@/lib/experience/view';
import { ExperienceRow } from '@/components/experience/ExperienceRow';
import type { ViewModel } from '@/lib/experience/view';
export function Experience({ v }: { v: ViewModel }) {
  return (
    <section
      data-panel={''}
      data-screen-label={'Experience'}
      style={{
        position: 'sticky',
        top: '0',
        height: '100%',
        overflow: 'hidden',
        zIndex: '3',
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div style={css(`position:relative;height:100%;overflow:hidden;padding:${v.xpPadTop ?? ''} 7vw clamp(20px,4vh,56px)`)}>
        <span
          data-xwipe={'1'}
          aria-hidden={'true'}
          style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            width: '1px',
            zIndex: '4',
            background: 'linear-gradient(transparent,rgba(var(--glow-rgb),.8) 30%,rgba(var(--glow-rgb),.8) 70%,transparent)',
            boxShadow: '0 0 18px 2px rgba(var(--accent-rgb),.35)',
            opacity: '0',
            pointerEvents: 'none',
            willChange: 'transform,opacity',
          }}
        ></span>
        <div
          style={css(
            `height:100%;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:${v.xpCols ?? ''};gap:clamp(28px,5vw,80px);align-items:stretch`,
          )}
        >
          <div style={css(`min-width:0;min-height:0;display:flex;flex-direction:column;gap:${v.xpColGap ?? ''}`)}>
            <div>
              <h2
                style={{
                  margin: '0',
                  fontSize: '11px',
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  color: 'var(--muted)',
                }}
              >
                {'Experience'}
              </h2>
              <p
                style={css(
                  `display:${v.xpHeadDisp ?? ''};margin:clamp(10px,1.8vh,18px) 0 0;max-width:20ch;font-family:var(--wide);font-weight:500;font-stretch:110%;font-size:clamp(22px,min(2.8vw,4.8vh),40px);line-height:1.12;letter-spacing:-.02em;color:var(--ink);text-wrap:balance`,
                )}
              >
                {'Building products, solving problems, and learning with every release.'}
              </p>
            </div>
            <div>
              <h3
                style={{
                  margin: '0 0 8px',
                  fontSize: '11px',
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  fontWeight: '400',
                  color: 'var(--muted)',
                }}
              >
                {'Work experience'}
              </h3>
              {list(v.accWork).map((it, i0) => (
                <Fragment key={i0}>
                  <ExperienceRow it={it} v={v} />
                </Fragment>
              ))}
              <div style={{ borderTop: '1px solid var(--line)' }}></div>
            </div>
            <div>
              <h3
                style={{
                  margin: '0 0 8px',
                  fontSize: '11px',
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  fontWeight: '400',
                  color: 'var(--muted)',
                }}
              >
                {'Leadership experience'}
              </h3>
              {list(v.accLead).map((it, i0) => (
                <Fragment key={i0}>
                  <ExperienceRow it={it} v={v} />
                </Fragment>
              ))}
              <div style={{ borderTop: '1px solid var(--line)' }}></div>
            </div>
          </div>
          <div
            id={'xp-detail'}
            ref={v.xpPaneRef}
            role={'region'}
            aria-live={'polite'}
            aria-label={v.xpSel?.aria}
            style={css(
              `display:${v.xpPaneDisp ?? ''};position:${v.xpPanePos ?? ''};inset:${v.xpPaneInset ?? ''};z-index:6;min-width:0;min-height:0;flex-direction:column;gap:clamp(12px,2.2vh,20px);padding:clamp(20px,3.4vh,36px) clamp(18px,2.4vw,36px);border-radius:${v.xpPaneRad ?? ''};background:${v.xpPaneBg ?? ''};border:1px solid var(--line);overflow-x:hidden;overflow-y:${v.xpPaneScroll ?? ''};overscroll-behavior:auto`,
            )}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <span style={css(`font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${v.xpSel?.accent ?? ''}`)}>
                {txt(v.xpSel?.kindLabel)}
                {' · '}
                {txt(v.xpSel?.num)}
              </span>
              {v.xpSheet ? (
                <>
                  <button
                    className="px-f0"
                    onClick={v.xpClose}
                    style={{
                      minHeight: '34px',
                      padding: '0 12px',
                      borderRadius: '999px',
                      border: '1px solid rgba(var(--ink-rgb),.2)',
                      fontSize: '12px',
                      color: 'var(--ink)',
                    }}
                  >
                    {'Close'}
                  </button>
                </>
              ) : null}
            </div>
            <div>
              <h3
                style={{
                  margin: '0',
                  fontFamily: 'var(--wide)',
                  fontWeight: '500',
                  fontStretch: '108%',
                  fontSize: 'clamp(20px,min(2.2vw,3.8vh),32px)',
                  lineHeight: '1.15',
                  letterSpacing: '-.015em',
                  color: 'var(--ink)',
                }}
              >
                {txt(v.xpSel?.role)}
              </h3>
              <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                {txt(v.xpSel?.company)}
                {' · '}
                {txt(v.xpSel?.dates)}
                {' · '}
                {txt(v.xpSel?.place)}
              </p>
            </div>
            <p
              style={css(
                `margin:0;max-width:62ch;font-size:clamp(13px,1.9vh,15px);line-height:1.7;color:var(--body);display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:${v.xpSel?.clamp ?? ''};overflow:hidden`,
              )}
            >
              {txt(v.xpSel?.summary)}
            </p>
            {v.xpSel?.hasBullets ? (
              <>
                <ul
                  style={{
                    margin: '0',
                    padding: '0 0 0 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    fontSize: 'clamp(13px,1.8vh,14px)',
                    lineHeight: '1.6',
                    color: 'var(--body)',
                  }}
                >
                  {list(v.xpSel?.bullets).map((bl, i0) => (
                    <Fragment key={i0}>
                      <li>{txt(bl)}</li>
                    </Fragment>
                  ))}
                </ul>
              </>
            ) : null}
            {v.xpSel?.canExpand ? (
              <>
                <button
                  className="px-h5 px-f0"
                  onClick={v.xpFullToggle}
                  aria-expanded={v.xpFullExp}
                  style={{
                    alignSelf: 'flex-start',
                    minHeight: '32px',
                    padding: '0 14px',
                    borderRadius: '999px',
                    border: '1px solid rgba(var(--ink-rgb),.2)',
                    fontSize: '12px',
                    color: 'var(--ink)',
                    transition: 'border-color 220ms ease',
                  }}
                >
                  {txt(v.xpSel?.moreLabel)}
                </button>
              </>
            ) : null}
            {v.xpSel?.hasTags ? (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {list(v.xpSel?.tags).map((tg, i0) => (
                    <Fragment key={i0}>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          border: '1px solid rgba(var(--ink-rgb),.16)',
                          fontSize: '12px',
                          color: 'var(--body)',
                        }}
                      >
                        {txt(tg)}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
            {v.xpSel?.hasMedia ? (
              <>
                <div style={css(`flex:1;min-height:0;display:grid;grid-template-columns:${v.xpSel?.mCols ?? ''};gap:8px`)}>
                  <button
                    className="px-f6"
                    onClick={v.xpSel?.m0?.open}
                    onMouseEnter={v.mEnter}
                    onMouseLeave={v.mLeave}
                    aria-label={v.xpSel?.m0?.aria}
                    style={{
                      position: 'relative',
                      minHeight: '0',
                      height: '100%',
                      maxHeight: 'clamp(120px,30vh,300px)',
                      padding: '0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid rgba(var(--ink-rgb),.14)',
                      background: 'var(--well)',
                      cursor: 'zoom-in',
                    }}
                  >
                    <img
                      data-src={v.xpSel?.m0?.src}
                      alt={v.xpSel?.m0?.alt}
                      loading={'lazy'}
                      decoding={'async'}
                      style={css(
                        `display:block;width:100%;height:100%;object-fit:cover;object-position:${v.xpSel?.m0?.pos ?? ''};transition:transform 500ms cubic-bezier(.16,1,.3,1)`,
                      )}
                    />
                    {v.xpSel?.m0?.isPh ? (
                      <>
                        <span
                          style={{
                            position: 'absolute',
                            inset: '0',
                            display: 'grid',
                            placeItems: 'center',
                            padding: '10px',
                            textAlign: 'center',
                            fontSize: '11px',
                            color: 'var(--muted)',
                            background: 'repeating-linear-gradient(135deg,var(--well) 0 10px,var(--well2) 10px 20px)',
                          }}
                        >
                          {txt(v.xpSel?.m0?.label)}
                        </span>
                      </>
                    ) : null}
                    <span
                      data-mov={'1'}
                      aria-hidden={'true'}
                      style={{
                        position: 'absolute',
                        inset: '0',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        padding: '10px 12px',
                        background: 'linear-gradient(transparent 55%,rgba(var(--deep-rgb),.5))',
                        opacity: '0',
                        pointerEvents: 'none',
                        transition: 'opacity 300ms ease',
                        fontSize: '11px',
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        color: '#FFF3EC',
                      }}
                    >
                      {'View work'}
                    </span>
                  </button>
                  {v.xpSel?.hasRest ? (
                    <>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateRows: 'repeat(2,minmax(0,1fr))',
                          gap: '8px',
                          maxHeight: 'clamp(120px,30vh,300px)',
                        }}
                      >
                        {list(v.xpSel?.rest).map((m, i0) => (
                          <Fragment key={i0}>
                            <button
                              className="px-f6"
                              onClick={m?.open}
                              onMouseEnter={v.mEnter}
                              onMouseLeave={v.mLeave}
                              aria-label={m?.aria}
                              style={{
                                position: 'relative',
                                minHeight: '0',
                                padding: '0',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                border: '1px solid rgba(var(--ink-rgb),.14)',
                                background: 'var(--well)',
                                cursor: 'zoom-in',
                              }}
                            >
                              <img
                                data-src={m?.src}
                                alt={m?.alt}
                                loading={'lazy'}
                                decoding={'async'}
                                style={css(`display:block;width:100%;height:100%;object-fit:cover;object-position:${m?.pos ?? ''}`)}
                              />
                              {m?.isPh ? (
                                <>
                                  <span
                                    style={{
                                      position: 'absolute',
                                      inset: '0',
                                      display: 'grid',
                                      placeItems: 'center',
                                      padding: '6px',
                                      textAlign: 'center',
                                      fontSize: '10px',
                                      color: 'var(--muted)',
                                      background: 'repeating-linear-gradient(135deg,var(--well) 0 8px,var(--well2) 8px 16px)',
                                    }}
                                  >
                                    {txt(m?.label)}
                                  </span>
                                </>
                              ) : null}
                              <span
                                data-mov={'1'}
                                aria-hidden={'true'}
                                style={{
                                  position: 'absolute',
                                  inset: '0',
                                  background: 'rgba(var(--deep-rgb),.25)',
                                  opacity: '0',
                                  pointerEvents: 'none',
                                  transition: 'opacity 300ms ease',
                                }}
                              ></span>
                            </button>
                          </Fragment>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
