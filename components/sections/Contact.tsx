// Generated from the Claude Design export, then maintained by hand.
import { Fragment } from 'react';
import { css, txt, list } from '@/lib/experience/view';
import type { ViewModel } from '@/lib/experience/view';
export function Contact({ v }: { v: ViewModel }) {
  return (
    <section
      data-panel={''}
      data-screen-label={'Contact'}
      style={{
        position: 'sticky',
        top: '0',
        height: '100%',
        overflow: 'hidden',
        zIndex: '7',
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div style={css(`height:100%;padding:${v.cpPadTop ?? ''} 6vw 0;display:flex;flex-direction:column`)}>
        <div
          ref={v.cpStageRef}
          onMouseMove={v.cpMove}
          onMouseLeave={v.cpLeave}
          style={{ position: 'relative', flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(18px,3vh,28px)' }}
        >
          <svg
            ref={v.cpLineRef}
            aria-hidden={'true'}
            style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
          >
            <line
              data-cpline={'1'}
              x1={'0'}
              y1={'0'}
              x2={'0'}
              y2={'0'}
              style={{ stroke: 'var(--ink2)', strokeWidth: '.6', opacity: '0' }}
            />
            <line
              data-cpline={'1'}
              x1={'0'}
              y1={'0'}
              x2={'0'}
              y2={'0'}
              style={{ stroke: 'var(--ink2)', strokeWidth: '.6', opacity: '0' }}
            />
          </svg>
          <div data-par={'0.08'} style={css(`position:relative;z-index:1;max-width:${v.cpHeadW ?? ''}`)}>
            <span style={{ fontSize: '12px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              {'Contact me'}
            </span>
            <h2
              style={css(
                `margin:clamp(10px,1.8vh,16px) 0 0;font-family:var(--wide);font-weight:700;font-stretch:118%;font-size:${v.cpH2 ?? ''};line-height:1;letter-spacing:-.03em;color:var(--ink);text-wrap:balance`,
              )}
            >
              {'Let’s build something meaningful.'}
            </h2>
            <p
              style={{
                margin: 'clamp(12px,2.2vh,20px) 0 0',
                maxWidth: '40ch',
                fontSize: 'clamp(15px,1.4vw,18px)',
                lineHeight: '1.6',
                color: 'var(--body)',
              }}
            >
              {'Have an idea, opportunity, collaboration, or just want to say hello? I’d love to hear from you.'}
            </p>
            <p style={{ margin: '12px 0 0', fontSize: 'clamp(14px,1.2vw,16px)' }}>
              <a href="/services" style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                {'See what I can do for you →'}
              </a>
            </p>
            <p
              style={css(
                `display:${v.cpItalic ?? ''};margin:10px 0 0;font-family:var(--serif);font-style:italic;font-size:17px;color:var(--muted)`,
              )}
            >
              {'Maybe this is where our paths cross.'}
            </p>
          </div>
          <div
            style={css(
              `position:${v.cpWrapPos ?? ''};inset:0;display:flex;flex-direction:${v.cpWrapDir ?? ''};flex-wrap:wrap;align-items:flex-start;gap:8px;opacity:${v.cpPillsOp ?? ''};pointer-events:${v.cpPillsPe ?? ''};transition:opacity 360ms ease`,
            )}
          >
            <button
              className="px-f8"
              data-cpill={'0'}
              onClick={v.openBook}
              data-w={'1'}
              onMouseEnter={v.cpIn0}
              onMouseLeave={v.cpOut}
              onFocus={v.cpIn0}
              onBlur={v.cpOut}
              style={css(
                `position:${v.cpPos ?? ''};left:${v.cpL0 ?? ''};top:${v.cpT0 ?? ''};width:${v.cpW0 ?? ''};justify-content:center;display:inline-flex;align-items:center;gap:.5em;white-space:nowrap;border-radius:999px;font-family:var(--wide);font-stretch:110%;letter-spacing:-.01em;transform:rotate(${v.cpR0 ?? ''});will-change:transform;transition:background-color 260ms ease,border-color 260ms ease,color 260ms ease;z-index:2;padding:clamp(16px,2.4vh,24px) clamp(28px,3vw,44px);font-size:clamp(22px,min(2.8vw,4.4vh),40px);font-weight:700;background:var(--ink);color:var(--bg);border:1px solid var(--ink);box-shadow:0 14px 40px rgba(var(--deep-rgb),.35)`,
              )}
            >
              {'Let’s talk'}
              <span
                aria-hidden={'true'}
                data-cparrow={'1'}
                style={{ fontSize: '.7em', opacity: '.5', transition: 'opacity 260ms ease,transform 260ms ease' }}
              >
                {'↗'}
              </span>
            </button>
            <a
              className="px-f8"
              data-cpill={'1'}
              href={'mailto:beaxcapule@gmail.com'}
              aria-label={'Email me at beaxcapule@gmail.com'}
              onMouseEnter={v.cpIn1}
              onMouseLeave={v.cpOut}
              onFocus={v.cpIn1}
              onBlur={v.cpOut}
              style={css(
                `position:${v.cpPos ?? ''};left:${v.cpL1 ?? ''};top:${v.cpT1 ?? ''};display:inline-flex;align-items:center;gap:.5em;white-space:nowrap;border-radius:999px;font-family:var(--wide);font-stretch:110%;letter-spacing:-.01em;transform:rotate(${v.cpR1 ?? ''});will-change:transform;transition:background-color 260ms ease,border-color 260ms ease,color 260ms ease;z-index:1;padding:clamp(12px,1.8vh,18px) clamp(20px,2.2vw,30px);font-size:clamp(17px,min(1.9vw,3vh),26px);font-weight:600;background:rgba(var(--ink-rgb),.06);color:var(--ink);border:1px solid rgba(var(--ink-rgb),.18)`,
              )}
            >
              {'Email me '}
              <span
                style={css(
                  `display:${v.cpAddr ?? ''};font-family:var(--sans);font-size:.55em;font-weight:400;letter-spacing:0;color:var(--muted)`,
                )}
              >
                {'beaxcapule@gmail.com'}
              </span>
              <span
                aria-hidden={'true'}
                data-cparrow={'1'}
                style={{ fontSize: '.7em', opacity: '.5', transition: 'opacity 260ms ease,transform 260ms ease' }}
              >
                {'↗'}
              </span>
            </a>
            <a
              className="px-f8"
              data-cpill={'2'}
              href={'https://www.linkedin.com/in/beacapule/'}
              target={'_blank'}
              rel={'noopener'}
              aria-label={'LinkedIn — opens in a new tab'}
              onMouseEnter={v.cpIn2}
              onMouseLeave={v.cpOut}
              onFocus={v.cpIn2}
              onBlur={v.cpOut}
              style={css(
                `position:${v.cpPos ?? ''};left:${v.cpL2 ?? ''};top:${v.cpT2 ?? ''};display:inline-flex;align-items:center;gap:.5em;white-space:nowrap;border-radius:999px;font-family:var(--wide);font-stretch:110%;letter-spacing:-.01em;transform:rotate(${v.cpR2 ?? ''});will-change:transform;transition:background-color 260ms ease,border-color 260ms ease,color 260ms ease;z-index:1;padding:clamp(10px,1.6vh,16px) clamp(18px,2vw,26px);font-size:clamp(16px,min(1.7vw,2.8vh),23px);font-weight:600;background:rgba(var(--ink-rgb),.06);color:var(--ink);border:1px solid rgba(var(--ink-rgb),.18)`,
              )}
            >
              {'LinkedIn'}
              <span
                aria-hidden={'true'}
                data-cparrow={'1'}
                style={{ fontSize: '.7em', opacity: '.5', transition: 'opacity 260ms ease,transform 260ms ease' }}
              >
                {'↗'}
              </span>
            </a>
            <a
              className="px-f8"
              data-cpill={'3'}
              href={'#'}
              target={'_blank'}
              rel={'noopener'}
              aria-label={'Resume (file not linked yet)'}
              onMouseEnter={v.cpIn3}
              onMouseLeave={v.cpOut}
              onFocus={v.cpIn3}
              onBlur={v.cpOut}
              style={css(
                `position:${v.cpPos ?? ''};left:${v.cpL3 ?? ''};top:${v.cpT3 ?? ''};display:inline-flex;align-items:center;gap:.5em;white-space:nowrap;border-radius:999px;font-family:var(--wide);font-stretch:110%;letter-spacing:-.01em;transform:rotate(${v.cpR3 ?? ''});will-change:transform;transition:background-color 260ms ease,border-color 260ms ease,color 260ms ease;z-index:1;padding:clamp(9px,1.4vh,14px) clamp(16px,1.8vw,22px);font-size:clamp(15px,min(1.5vw,2.5vh),20px);font-weight:600;background:transparent;color:var(--ink);border:1px solid rgba(var(--ink-rgb),.28)`,
              )}
            >
              {'Resume '}
              <span style={{ fontFamily: 'var(--sans)', fontSize: '.55em', color: 'var(--muted)' }}>{'[PH]'}</span>
              <span
                aria-hidden={'true'}
                data-cparrow={'1'}
                style={{ fontSize: '.7em', opacity: '.5', transition: 'opacity 260ms ease,transform 260ms ease' }}
              >
                {'↗'}
              </span>
            </a>
            <button
              className="px-f8"
              data-cpill={'4'}
              onClick={v.openForm}
              onMouseEnter={v.cpIn4}
              onMouseLeave={v.cpOut}
              onFocus={v.cpIn4}
              onBlur={v.cpOut}
              style={css(
                `position:${v.cpPos ?? ''};left:${v.cpL4 ?? ''};top:${v.cpT4 ?? ''};display:inline-flex;align-items:center;gap:.5em;white-space:nowrap;border-radius:999px;font-family:var(--wide);font-stretch:110%;letter-spacing:-.01em;transform:rotate(${v.cpR4 ?? ''});will-change:transform;transition:background-color 260ms ease,border-color 260ms ease,color 260ms ease;z-index:1;padding:clamp(10px,1.6vh,16px) clamp(18px,2vw,26px);font-size:clamp(15px,min(1.6vw,2.6vh),22px);font-weight:500;background:rgba(var(--accent-rgb),.14);color:var(--ink);border:1px solid rgba(var(--accent-rgb),.4)`,
              )}
            >
              {'Send a message'}
              <span
                aria-hidden={'true'}
                data-cparrow={'1'}
                style={{ fontSize: '.7em', opacity: '.5', transition: 'opacity 260ms ease,transform 260ms ease' }}
              >
                {'↗'}
              </span>
            </button>
            <button
              className="px-h9 px-f0"
              onClick={v.copyEmail}
              aria-live={'polite'}
              style={css(
                `position:${v.cpPos ?? ''};left:${v.cpCopyL ?? ''};top:${v.cpCopyT ?? ''};min-height:32px;padding:0 12px;border-radius:999px;border:1px solid rgba(var(--ink-rgb),.16);font-size:11px;letter-spacing:.06em;color:var(--muted)`,
              )}
            >
              {txt(v.copyLabel)}
            </button>
          </div>
          {v.bookOpen ? (
            <>
              <div
                ref={v.bookRef}
                role={'dialog'}
                aria-label={'Book a call with Beatrice'}
                style={{
                  position: 'absolute',
                  zIndex: '6',
                  left: '50%',
                  top: '50%',
                  width: 'min(760px,100%)',
                  height: 'min(720px,100%)',
                  overflow: 'hidden',
                  transform: 'translate(-50%,-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  padding: 'clamp(16px,2.6vh,24px)',
                  borderRadius: '22px',
                  background: 'var(--panel)',
                  border: '1px solid rgba(var(--ink-rgb),.16)',
                  boxShadow: '0 24px 60px rgba(var(--deep-rgb),.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <div
                      style={{ fontFamily: 'var(--wide)', fontWeight: '700', fontStretch: '112%', fontSize: '20px', color: 'var(--ink)' }}
                    >
                      {'Book a 30-minute call'}
                    </div>
                    <div style={{ marginTop: '4px', fontSize: '13px', color: 'var(--muted)' }}>
                      {'Pick any open slot — you’ll get a calendar invite by email.'}
                    </div>
                  </div>
                  <button
                    className="px-f0"
                    type={'button'}
                    onClick={v.closeBook}
                    aria-label={'Close scheduler'}
                    style={{
                      flex: 'none',
                      minHeight: '34px',
                      padding: '0 12px',
                      borderRadius: '999px',
                      border: '1px solid rgba(var(--ink-rgb),.18)',
                      fontSize: '12px',
                      color: 'var(--muted)',
                    }}
                  >
                    {'Close'}
                  </button>
                </div>
                <div
                  style={{
                    position: 'relative',
                    flex: '1',
                    minHeight: '0',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid var(--line)',
                    background: 'var(--panel)',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      inset: '0',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '13px',
                      color: 'var(--muted)',
                    }}
                  >
                    {'Loading calendar…'}
                  </span>
                  {list(v.calList).map((cal, i0) => (
                    <Fragment key={i0}>
                      <iframe
                        src={cal?.src}
                        title={'Book a 30-minute call with Beatrice on Calendly'}
                        loading={'lazy'}
                        style={{
                          position: 'relative',
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          border: '0',
                          background: 'transparent',
                        }}
                      />
                    </Fragment>
                  ))}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                    fontSize: '12px',
                    color: 'var(--muted)',
                  }}
                >
                  <span>{'Booking powered by Calendly · times shown in your timezone'}</span>
                  <a href={'https://calendly.com/beaxcapule/30min'} target={'_blank'} rel={'noopener'} style={{ color: 'var(--ink)' }}>
                    {'Open in Calendly ↗'}
                  </a>
                </div>
              </div>
            </>
          ) : null}
          {v.formOpen ? (
            <>
              <form
                ref={v.cpFormRef}
                onSubmit={v.sendForm}
                aria-label={'Send me a message'}
                style={{
                  position: 'absolute',
                  zIndex: '5',
                  left: '50%',
                  top: '50%',
                  width: 'min(520px,100%)',
                  transform: 'translate(-50%,-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: 'clamp(18px,3vh,28px)',
                  borderRadius: '22px',
                  background: 'var(--panel)',
                  border: '1px solid rgba(var(--ink-rgb),.16)',
                  boxShadow: '0 24px 60px rgba(var(--deep-rgb),.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span
                    style={{ fontFamily: 'var(--wide)', fontWeight: '700', fontStretch: '112%', fontSize: '20px', color: 'var(--ink)' }}
                  >
                    {'Send me a message'}
                  </span>
                  <button
                    className="px-f0"
                    type={'button'}
                    onClick={v.closeForm}
                    aria-label={'Close form'}
                    style={{
                      minHeight: '34px',
                      padding: '0 12px',
                      borderRadius: '999px',
                      border: '1px solid rgba(var(--ink-rgb),.18)',
                      fontSize: '12px',
                      color: 'var(--muted)',
                    }}
                  >
                    {'Close'}
                  </button>
                </div>
                <div aria-hidden="true" className="sr-only">
                  <label>
                    {'Company'}
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '12px',
                    letterSpacing: '.04em',
                    color: 'var(--muted)',
                  }}
                >
                  {'Name'}
                  <input
                    className="px-fa"
                    required
                    name={'name'}
                    placeholder={'Your name'}
                    autoComplete={'name'}
                    style={{
                      minHeight: '42px',
                      padding: '0 14px',
                      borderRadius: '12px',
                      border: '1px solid rgba(var(--ink-rgb),.18)',
                      background: 'rgba(var(--ink-rgb),.04)',
                      font: 'inherit',
                      fontSize: '15px',
                      letterSpacing: '0',
                      color: 'var(--ink)',
                      outline: 'none',
                    }}
                  />
                </label>
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '12px',
                    letterSpacing: '.04em',
                    color: 'var(--muted)',
                  }}
                >
                  {'Email'}
                  <input
                    className="px-fa"
                    required
                    type={'email'}
                    name={'email'}
                    placeholder={'you@example.com'}
                    autoComplete={'email'}
                    style={{
                      minHeight: '42px',
                      padding: '0 14px',
                      borderRadius: '12px',
                      border: '1px solid rgba(var(--ink-rgb),.18)',
                      background: 'rgba(var(--ink-rgb),.04)',
                      font: 'inherit',
                      fontSize: '15px',
                      letterSpacing: '0',
                      color: 'var(--ink)',
                      outline: 'none',
                    }}
                  />
                </label>
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '12px',
                    letterSpacing: '.04em',
                    color: 'var(--muted)',
                  }}
                >
                  {'Message'}
                  <textarea
                    className="px-fa"
                    required
                    name={'message'}
                    rows={3}
                    placeholder={'Tell me what you have in mind…'}
                    style={{
                      minHeight: '42px',
                      borderRadius: '12px',
                      border: '1px solid rgba(var(--ink-rgb),.18)',
                      background: 'rgba(var(--ink-rgb),.04)',
                      font: 'inherit',
                      fontSize: '15px',
                      letterSpacing: '0',
                      color: 'var(--ink)',
                      outline: 'none',
                      padding: '10px 14px',
                      lineHeight: '1.5',
                      resize: 'vertical',
                    }}
                  ></textarea>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <span role={'status'} style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {txt(v.formStatus)}
                  </span>
                  <button
                    className="px-f6"
                    type={'submit'}
                    style={{
                      minHeight: '44px',
                      padding: '0 22px',
                      borderRadius: '999px',
                      background: 'var(--ink)',
                      color: 'var(--bg)',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    {'Send Message'}
                  </button>
                </div>
              </form>
            </>
          ) : null}
        </div>
        <footer
          ref={v.footRef}
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: 'clamp(14px,2.6vh,24px) 0 clamp(10px,2vh,18px)',
            marginTop: 'clamp(14px,3vh,32px)',
            textAlign: 'center',
          }}
        >
          <span
            aria-hidden={'true'}
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: 'min(120px,30%)',
              height: '1px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg,transparent,rgba(var(--ink-rgb),.28),transparent)',
            }}
          ></span>
          <span
            data-fstar={'1'}
            aria-hidden={'true'}
            style={{
              position: 'absolute',
              top: '-2px',
              left: '50%',
              width: '4px',
              height: '4px',
              marginLeft: '-2px',
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 8px rgba(var(--accent-rgb),.5)',
              opacity: '.25',
              transition: 'opacity 900ms ease',
            }}
          ></span>
          <p
            data-fl={'0'}
            style={css(
              `margin:0;font-size:12px;letter-spacing:.04em;color:var(--muted);opacity:${v.footOp ?? ''};transition:opacity 500ms ease`,
            )}
          >
            {'© '}
            {txt(v.footYear)} {txt(v.footName)}
          </p>
          <p
            data-fl={'1'}
            style={css(
              `margin:0;font-family:var(--serif);font-style:italic;font-size:14px;line-height:1.5;color:var(--muted);opacity:${v.footOp2 ?? ''};transform:translateY(${v.footY ?? ''});transition:opacity 600ms 120ms ease,transform 600ms 120ms cubic-bezier(.16,1,.3,1)`,
            )}
          >
            {txt(v.footLine)}
          </p>
        </footer>
      </div>
    </section>
  );
}
