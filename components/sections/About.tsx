// Generated from the Claude Design export, then maintained by hand.
import { css } from '@/lib/experience/view';
import Image from 'next/image';
import type { ViewModel } from '@/lib/experience/view';
export function About({ v }: { v: ViewModel }) {
  return (
    <section
      data-panel={''}
      data-screen-label={'About'}
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
      <div
        style={{
          height: '100%',
          padding: 'clamp(84px,12vh,112px) 5vw clamp(28px,5vh,56px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'clamp(20px,3.4vh,40px)',
        }}
      >
        <div
          style={css(
            `width:100%;max-width:1480px;margin:0 auto;display:grid;grid-template-columns:${v.aboutCols ?? ''};gap:clamp(32px,5vw,96px);align-items:center`,
          )}
        >
          <div ref={v.aboutTextRef} onMouseEnter={v.aboutGlowOn} onMouseLeave={v.aboutGlowOff} data-par={'0.1'} style={{ minWidth: '0' }}>
            <h2
              data-rev={'0'}
              style={{
                position: 'relative',
                margin: '0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '.28em',
                fontFamily: 'var(--wide)',
                fontWeight: '700',
                fontStretch: '118%',
                fontSize: 'clamp(34px,min(6.4vw,10vh),112px)',
                lineHeight: '1',
                letterSpacing: '-.025em',
                color: 'var(--ink)',
              }}
            >
              {'Beatrice Capule'}
              <span
                data-aglow={'1'}
                aria-hidden={'true'}
                style={{
                  position: 'absolute',
                  inset: '0',
                  margin: '0',
                  display: 'inherit',
                  flexWrap: 'inherit',
                  alignItems: 'inherit',
                  gap: 'inherit',
                  textAlign: 'inherit',
                  hyphens: 'inherit',
                  WebkitHyphens: 'inherit',
                  color: 'var(--glow)',
                  textShadow: '0 0 4px rgba(var(--glow-rgb),.55),0 0 10px rgba(var(--ink-rgb),.3),0 0 22px rgba(var(--accent-rgb),.16)',
                  opacity: '0',
                  pointerEvents: 'none',
                  WebkitMaskImage:
                    'radial-gradient(circle var(--r,90px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                  maskImage:
                    'radial-gradient(circle var(--r,90px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                }}
              >
                {'Beatrice Capule'}
              </span>
            </h2>
            <p
              data-rev={'2'}
              style={{
                position: 'relative',
                margin: 'clamp(10px,1.6vh,16px) 0 0',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '6px 12px',
                fontSize: 'clamp(12px,1vw,15px)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              <span>{'SOFTWARE DEVELOPMENT LEAD'}</span>
              <span aria-hidden={'true'} style={{ color: 'var(--line2)' }}>
                {'·'}
              </span>
              <span>{'FULL-STACK DEVELOPER'}</span>
              <span aria-hidden={'true'} style={{ color: 'var(--line2)' }}>
                {'·'}
              </span>
              <span>{'DIGITAL DESIGNER'}</span>
              <span
                data-aglow={'1'}
                aria-hidden={'true'}
                style={{
                  position: 'absolute',
                  inset: '0',
                  margin: '0',
                  display: 'inherit',
                  flexWrap: 'inherit',
                  alignItems: 'inherit',
                  gap: 'inherit',
                  textAlign: 'inherit',
                  hyphens: 'inherit',
                  WebkitHyphens: 'inherit',
                  color: 'var(--glow)',
                  textShadow: '0 0 4px rgba(var(--glow-rgb),.55),0 0 10px rgba(var(--ink-rgb),.3),0 0 22px rgba(var(--accent-rgb),.16)',
                  opacity: '0',
                  pointerEvents: 'none',
                  WebkitMaskImage:
                    'radial-gradient(circle var(--r,90px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                  maskImage:
                    'radial-gradient(circle var(--r,90px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                }}
              >
                <span>{'SOFTWARE DEVELOPMENT LEAD'}</span>
                <span aria-hidden={'true'} style={{ color: 'var(--line2)' }}>
                  {'·'}
                </span>
                <span>{'FULL-STACK DEVELOPER'}</span>
                <span aria-hidden={'true'} style={{ color: 'var(--line2)' }}>
                  {'·'}
                </span>
                <span>{'DIGITAL DESIGNER'}</span>
              </span>
            </p>
            <p
              data-rev={'2'}
              style={{
                position: 'relative',
                margin: 'clamp(18px,3.2vh,34px) 0 0',
                maxWidth: '60ch',
                fontSize: 'clamp(15px,min(1.3vw,2.4vh),20px)',
                lineHeight: '1.72',
                color: 'var(--body)',
                textAlign: 'justify',
                hyphens: 'auto',
                WebkitHyphens: 'auto',
              }}
            >
              {
                'I’m a Computer Science graduate who loves turning curiosity into meaningful digital experiences. I see every project as another point in my constellation — connecting technology, creativity, service, and the things I continue to discover along the way. I build with purpose, explore with curiosity, and keep learning wherever the next idea takes me.'
              }
              <span
                data-aglow={'1'}
                aria-hidden={'true'}
                style={{
                  position: 'absolute',
                  inset: '0',
                  margin: '0',
                  display: 'inherit',
                  flexWrap: 'inherit',
                  alignItems: 'inherit',
                  gap: 'inherit',
                  textAlign: 'inherit',
                  hyphens: 'inherit',
                  WebkitHyphens: 'inherit',
                  color: 'var(--glow)',
                  textShadow: '0 0 4px rgba(var(--glow-rgb),.55),0 0 10px rgba(var(--ink-rgb),.3),0 0 22px rgba(var(--accent-rgb),.16)',
                  opacity: '0',
                  pointerEvents: 'none',
                  WebkitMaskImage:
                    'radial-gradient(circle var(--r,90px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                  maskImage:
                    'radial-gradient(circle var(--r,90px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                }}
              >
                {
                  'I’m a Computer Science graduate who loves turning curiosity into meaningful digital experiences. I see every project as another point in my constellation — connecting technology, creativity, service, and the things I continue to discover along the way. I build with purpose, explore with curiosity, and keep learning wherever the next idea takes me.'
                }
              </span>
            </p>
            <p
              data-rev={'3'}
              style={{
                position: 'relative',
                margin: 'clamp(12px,2vh,20px) 0 0',
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(16px,min(1.4vw,2.6vh),22px)',
                letterSpacing: '.01em',
                color: 'var(--muted)',
              }}
            >
              {'Still connecting the dots, one idea at a time. '}
              <span
                data-aglow={'1'}
                aria-hidden={'true'}
                style={{
                  position: 'absolute',
                  inset: '0',
                  margin: '0',
                  display: 'inherit',
                  flexWrap: 'inherit',
                  alignItems: 'inherit',
                  gap: 'inherit',
                  textAlign: 'inherit',
                  hyphens: 'inherit',
                  WebkitHyphens: 'inherit',
                  color: 'var(--glow)',
                  textShadow: '0 0 4px rgba(var(--glow-rgb),.55),0 0 10px rgba(var(--ink-rgb),.3),0 0 22px rgba(var(--accent-rgb),.16)',
                  opacity: '0',
                  pointerEvents: 'none',
                  WebkitMaskImage:
                    'radial-gradient(circle var(--r,90px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                  maskImage:
                    'radial-gradient(circle var(--r,90px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                }}
              >
                {'Still connecting the dots, one idea at a time. '}
              </span>
            </p>
          </div>
          <div data-par={'0.3'} style={{ minWidth: '0', display: 'flex', justifyContent: 'flex-end' }}>
            <div ref={v.cardWrapRef} data-rev={'1'} style={{ width: 'max-content', maxWidth: '100%', perspective: '900px' }}>
              <div
                ref={v.cardRef}
                onMouseEnter={v.cardEnter}
                onMouseLeave={v.cardLeave}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  padding: '8px 8px clamp(8px,1.6vh,12px)',
                  borderRadius: '18px',
                  background: 'var(--panel)',
                  border: '1px solid rgba(var(--ink-rgb),.12)',
                  transformOrigin: '50% 50%',
                }}
              >
                <div
                  data-klight={'1'}
                  aria-hidden={'true'}
                  style={{
                    position: 'absolute',
                    inset: '0',
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    opacity: '0',
                    background: 'radial-gradient(circle 180px at var(--mx,50%) var(--my,50%),rgba(var(--glow-rgb),.075),transparent 70%)',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      alignSelf: 'stretch',
                      width: '0',
                      minWidth: '100%',
                      padding: 'clamp(8px,1.6vh,14px) 6px 0',
                    }}
                  ></div>
                </div>
                <div aria-hidden={'true'} style={{ position: 'absolute', inset: '-16px', pointerEvents: 'none' }}>
                  <span
                    data-kp={'4,10'}
                    style={{
                      position: 'absolute',
                      left: '4%',
                      top: '10%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--ink2)',
                      opacity: '.25',
                      transform: 'scale(.8)',
                    }}
                  ></span>
                  <span
                    data-kp={'12,3'}
                    style={{
                      position: 'absolute',
                      left: '12%',
                      top: '3%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--ink2)',
                      opacity: '.25',
                      transform: 'scale(.8)',
                    }}
                  ></span>
                  <span
                    data-kp={'90,5'}
                    style={{
                      position: 'absolute',
                      left: '90%',
                      top: '5%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--ink2)',
                      opacity: '.25',
                      transform: 'scale(.8)',
                    }}
                  ></span>
                  <span
                    data-kp={'97,14'}
                    style={{
                      position: 'absolute',
                      left: '97%',
                      top: '14%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--ink2)',
                      opacity: '.25',
                      transform: 'scale(.8)',
                    }}
                  ></span>
                  <span
                    data-kp={'96,88'}
                    style={{
                      position: 'absolute',
                      left: '96%',
                      top: '88%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--ink2)',
                      opacity: '.25',
                      transform: 'scale(.8)',
                    }}
                  ></span>
                  <span
                    data-kp={'3,93'}
                    style={{
                      position: 'absolute',
                      left: '3%',
                      top: '93%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--ink2)',
                      opacity: '.25',
                      transform: 'scale(.8)',
                    }}
                  ></span>
                  <span
                    data-kp={'11,98'}
                    style={{
                      position: 'absolute',
                      left: '11%',
                      top: '98%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--ink2)',
                      opacity: '.25',
                      transform: 'scale(.8)',
                    }}
                  ></span>
                </div>
                <div
                  onClick={v.tapFlip}
                  style={{
                    position: 'relative',
                    zIndex: '1',
                    height: 'clamp(200px, calc(80vh - 240px), 560px)',
                    aspectRatio: '337/367',
                    width: 'auto',
                    perspective: '1200px',
                  }}
                >
                  <div
                    style={css(
                      `position:absolute;inset:0;transform-style:preserve-3d;transform:${v.flipT ?? ''};transition:transform 850ms cubic-bezier(.65,0,.35,1)`,
                    )}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: '0',
                        overflow: 'hidden',
                        borderRadius: '12px',
                        background: 'var(--well)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <Image
                        data-kimg="1"
                        src="/images/bea-grad.jpg"
                        width={1023}
                        height={1537}
                        sizes="(max-width: 640px) 90vw, 34vw"
                        alt={'Bea Capule in her University of the Philippines graduation toga'}
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '114.4%',
                          objectFit: 'cover',
                          objectPosition: '50% 50%',
                          position: 'static',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        inset: '0',
                        overflow: 'hidden',
                        borderRadius: '12px',
                        background: 'var(--well)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <Image
                        src="/images/bea-sablay.jpg"
                        width={1200}
                        height={1800}
                        sizes="(max-width: 640px) 90vw, 34vw"
                        alt={'Bea Capule wearing the University of the Philippines sablay'}
                        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 24%' }}
                      />
                    </div>
                  </div>
                  <div ref={v.fxRef} aria-hidden={'true'} style={{ position: 'absolute', inset: '0', zIndex: '1', pointerEvents: 'none' }}>
                    <svg
                      viewBox={'0 0 100 100'}
                      preserveAspectRatio={'none'}
                      style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', overflow: 'visible' }}
                    >
                      <g fill={'none'} strokeWidth={'0.8'} style={{ stroke: 'var(--ink)' }}>
                        <line
                          data-fxl={'1'}
                          x1={'18'}
                          y1={'20'}
                          x2={'38'}
                          y2={'12'}
                          pathLength={'1'}
                          vectorEffect={'non-scaling-stroke'}
                          style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                        />
                        <line
                          data-fxl={'1'}
                          x1={'38'}
                          y1={'12'}
                          x2={'62'}
                          y2={'26'}
                          pathLength={'1'}
                          vectorEffect={'non-scaling-stroke'}
                          style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                        />
                        <line
                          data-fxl={'1'}
                          x1={'62'}
                          y1={'26'}
                          x2={'80'}
                          y2={'16'}
                          pathLength={'1'}
                          vectorEffect={'non-scaling-stroke'}
                          style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                        />
                        <line
                          data-fxl={'1'}
                          x1={'62'}
                          y1={'26'}
                          x2={'70'}
                          y2={'52'}
                          pathLength={'1'}
                          vectorEffect={'non-scaling-stroke'}
                          style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                        />
                        <line
                          data-fxl={'1'}
                          x1={'70'}
                          y1={'52'}
                          x2={'44'}
                          y2={'60'}
                          pathLength={'1'}
                          vectorEffect={'non-scaling-stroke'}
                          style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                        />
                        <line
                          data-fxl={'1'}
                          x1={'44'}
                          y1={'60'}
                          x2={'24'}
                          y2={'78'}
                          pathLength={'1'}
                          vectorEffect={'non-scaling-stroke'}
                          style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                        />
                        <line
                          data-fxl={'1'}
                          x1={'70'}
                          y1={'52'}
                          x2={'76'}
                          y2={'84'}
                          pathLength={'1'}
                          vectorEffect={'non-scaling-stroke'}
                          style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                        />
                      </g>
                    </svg>
                    <span
                      data-fxs={'1'}
                      style={{
                        position: 'absolute',
                        left: '18%',
                        top: '20%',
                        width: '4px',
                        height: '4px',
                        margin: '-2px 0 0 -2px',
                        borderRadius: '50%',
                        background: 'var(--glow)',
                        boxShadow: '0 0 8px rgba(var(--glow-rgb),.9),0 0 18px rgba(var(--accent-rgb),.6)',
                        opacity: '0',
                      }}
                    ></span>
                    <span
                      data-fxs={'1'}
                      style={{
                        position: 'absolute',
                        left: '38%',
                        top: '12%',
                        width: '4px',
                        height: '4px',
                        margin: '-2px 0 0 -2px',
                        borderRadius: '50%',
                        background: 'var(--glow)',
                        boxShadow: '0 0 8px rgba(var(--glow-rgb),.9),0 0 18px rgba(var(--accent-rgb),.6)',
                        opacity: '0',
                      }}
                    ></span>
                    <span
                      data-fxs={'1'}
                      style={{
                        position: 'absolute',
                        left: '62%',
                        top: '26%',
                        width: '4px',
                        height: '4px',
                        margin: '-2px 0 0 -2px',
                        borderRadius: '50%',
                        background: 'var(--glow)',
                        boxShadow: '0 0 8px rgba(var(--glow-rgb),.9),0 0 18px rgba(var(--accent-rgb),.6)',
                        opacity: '0',
                      }}
                    ></span>
                    <span
                      data-fxs={'1'}
                      style={{
                        position: 'absolute',
                        left: '80%',
                        top: '16%',
                        width: '4px',
                        height: '4px',
                        margin: '-2px 0 0 -2px',
                        borderRadius: '50%',
                        background: 'var(--glow)',
                        boxShadow: '0 0 8px rgba(var(--glow-rgb),.9),0 0 18px rgba(var(--accent-rgb),.6)',
                        opacity: '0',
                      }}
                    ></span>
                    <span
                      data-fxs={'1'}
                      style={{
                        position: 'absolute',
                        left: '70%',
                        top: '52%',
                        width: '4px',
                        height: '4px',
                        margin: '-2px 0 0 -2px',
                        borderRadius: '50%',
                        background: 'var(--glow)',
                        boxShadow: '0 0 8px rgba(var(--glow-rgb),.9),0 0 18px rgba(var(--accent-rgb),.6)',
                        opacity: '0',
                      }}
                    ></span>
                    <span
                      data-fxs={'1'}
                      style={{
                        position: 'absolute',
                        left: '44%',
                        top: '60%',
                        width: '4px',
                        height: '4px',
                        margin: '-2px 0 0 -2px',
                        borderRadius: '50%',
                        background: 'var(--glow)',
                        boxShadow: '0 0 8px rgba(var(--glow-rgb),.9),0 0 18px rgba(var(--accent-rgb),.6)',
                        opacity: '0',
                      }}
                    ></span>
                    <span
                      data-fxs={'1'}
                      style={{
                        position: 'absolute',
                        left: '24%',
                        top: '78%',
                        width: '4px',
                        height: '4px',
                        margin: '-2px 0 0 -2px',
                        borderRadius: '50%',
                        background: 'var(--glow)',
                        boxShadow: '0 0 8px rgba(var(--glow-rgb),.9),0 0 18px rgba(var(--accent-rgb),.6)',
                        opacity: '0',
                      }}
                    ></span>
                    <span
                      data-fxs={'1'}
                      style={{
                        position: 'absolute',
                        left: '76%',
                        top: '84%',
                        width: '4px',
                        height: '4px',
                        margin: '-2px 0 0 -2px',
                        borderRadius: '50%',
                        background: 'var(--glow)',
                        boxShadow: '0 0 8px rgba(var(--glow-rgb),.9),0 0 18px rgba(var(--accent-rgb),.6)',
                        opacity: '0',
                      }}
                    ></span>
                    <div
                      data-fxg={'1'}
                      style={{
                        position: 'absolute',
                        inset: '0',
                        borderRadius: '12px',
                        background: 'radial-gradient(60% 50% at 50% 45%,rgba(var(--ink-rgb),.28),transparent 70%)',
                        opacity: '0',
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    position: 'relative',
                    width: '0',
                    minWidth: '100%',
                    padding: 'clamp(10px,1.8vh,14px) 6px 2px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--wide)',
                      fontWeight: '600',
                      fontStretch: '112%',
                      fontSize: 'clamp(14px,2.2vh,16px)',
                      lineHeight: '1.3',
                      letterSpacing: '-.01em',
                      color: 'var(--ink)',
                    }}
                  >
                    {'BS Computer Science Graduate'}
                  </span>
                  <span style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--body)' }}>
                    {'University of the Philippines Los Baños'}
                  </span>
                  <span style={{ fontSize: '12px', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    {'Batch 2022'}
                  </span>
                </div>
                <svg
                  viewBox={'0 0 100 100'}
                  preserveAspectRatio={'none'}
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: '0',
                    width: '100%',
                    height: '100%',
                    overflow: 'visible',
                    left: '-14px',
                    top: '-72px',
                  }}
                >
                  <g strokeWidth={'0.5'} fill={'none'} style={{ stroke: 'var(--ink2)' }}>
                    <line
                      data-kl={'1'}
                      x1={'4'}
                      y1={'10'}
                      x2={'12'}
                      y2={'3'}
                      vectorEffect={'non-scaling-stroke'}
                      style={{ opacity: '0' }}
                    />
                    <line
                      data-kl={'1'}
                      x1={'90'}
                      y1={'5'}
                      x2={'97'}
                      y2={'14'}
                      vectorEffect={'non-scaling-stroke'}
                      style={{ opacity: '0' }}
                    />
                    <line
                      data-kl={'1'}
                      x1={'3'}
                      y1={'93'}
                      x2={'11'}
                      y2={'98'}
                      vectorEffect={'non-scaling-stroke'}
                      style={{ opacity: '0' }}
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
