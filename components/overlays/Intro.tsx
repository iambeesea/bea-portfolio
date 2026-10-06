// Generated from the Claude Design export, then maintained by hand.
import { css } from '@/lib/experience/view';
import type { ViewModel } from '@/lib/experience/view';
export function Intro({ v }: { v: ViewModel }) {
  return (
    <div
      ref={v.introRef}
      role={'dialog'}
      aria-modal={'true'}
      aria-label={'Welcome'}
      style={{
        position: 'absolute',
        inset: '0',
        zIndex: '170',
        background: 'var(--deep)',
        overflow: 'hidden',
        display: 'grid',
        placeItems: 'center',
        transformOrigin: '50% 50%',
      }}
    >
      <div
        aria-hidden={'true'}
        style={{
          position: 'absolute',
          inset: '0',
          pointerEvents: 'none',
          background: 'radial-gradient(48% 42% at 50% 50%,rgba(123,55,132,.13),transparent 72%)',
        }}
      ></div>
      <svg
        viewBox={'0 0 1000 620'}
        preserveAspectRatio={'xMidYMid slice'}
        aria-hidden={'true'}
        style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <g
          strokeWidth={'0.6'}
          style={css(`stroke:var(--accent);opacity:${v.introLinkOp ?? ''};transition:opacity 700ms cubic-bezier(.16,1,.3,1)`)}
        >
          <line x1={'398'} y1={'196'} x2={'462'} y2={'160'} />
          <line x1={'462'} y1={'160'} x2={'536'} y2={'184'} />
          <line x1={'536'} y1={'184'} x2={'602'} y2={'148'} />
        </g>
        <circle cx={'398'} cy={'196'} r={'1.1'} style={{ fill: 'var(--accent)', animation: 'twinkle 3.0s 0.0s ease-in-out infinite' }} />
        <circle cx={'462'} cy={'160'} r={'1.6'} style={{ fill: 'var(--ink2)', animation: 'twinkle 3.6s 0.5s ease-in-out infinite' }} />
        <circle cx={'536'} cy={'184'} r={'1.1'} style={{ fill: 'var(--accent)', animation: 'twinkle 4.2s 1.0s ease-in-out infinite' }} />
        <circle cx={'602'} cy={'148'} r={'1.1'} style={{ fill: 'var(--accent)', animation: 'twinkle 4.8s 1.5s ease-in-out infinite' }} />
        <circle
          data-istar={'0'}
          cx={'70'}
          cy={'90'}
          r={'1.1'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 2.4s 0s ease-in-out infinite' }}
        />
        <circle
          data-istar={'1'}
          cx={'180'}
          cy={'300'}
          r={'0.9'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 3.0s 1.2s ease-in-out infinite' }}
        />
        <circle
          data-istar={'2'}
          cx={'120'}
          cy={'520'}
          r={'1.3'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 3.5s 2.1s ease-in-out infinite' }}
        />
        <circle
          data-istar={'3'}
          cx={'300'}
          cy={'70'}
          r={'1'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 2.7s 0.6s ease-in-out infinite' }}
        />
        <circle
          data-istar={'4'}
          cx={'258'}
          cy={'440'}
          r={'0.8'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 3.8s 2.8s ease-in-out infinite' }}
        />
        <circle
          data-istar={'5'}
          cx={'860'}
          cy={'80'}
          r={'1.2'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 3.1s 1.5s ease-in-out infinite' }}
        />
        <circle
          data-istar={'6'}
          cx={'930'}
          cy={'260'}
          r={'0.9'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 2.5s 0.3s ease-in-out infinite' }}
        />
        <circle
          data-istar={'7'}
          cx={'820'}
          cy={'540'}
          r={'1.4'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 3.6s 2.4s ease-in-out infinite' }}
        />
        <circle
          data-istar={'8'}
          cx={'700'}
          cy={'580'}
          r={'0.8'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 3.0s 1.1s ease-in-out infinite' }}
        />
        <circle
          data-istar={'9'}
          cx={'40'}
          cy={'340'}
          r={'0.9'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 3.9s 3s ease-in-out infinite' }}
        />
        <circle
          data-istar={'10'}
          cx={'960'}
          cy={'430'}
          r={'1'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 3.3s 1.9s ease-in-out infinite' }}
        />
        <circle
          data-istar={'11'}
          cx={'520'}
          cy={'40'}
          r={'0.8'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 3.7s 2.6s ease-in-out infinite' }}
        />
        <circle
          data-istar={'12'}
          cx={'330'}
          cy={'590'}
          r={'1'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 2.9s 0.9s ease-in-out infinite' }}
        />
        <circle
          data-istar={'13'}
          cx={'610'}
          cy={'96'}
          r={'0.9'}
          style={{ fill: 'var(--ink2)', animation: 'twinkle 4.0s 3.3s ease-in-out infinite' }}
        />
      </svg>
      <div
        ref={v.glowRef}
        aria-hidden={'true'}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '24vmin',
          height: '24vmin',
          margin: '-12vmin 0 0 -12vmin',
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(var(--ink-rgb),.85),rgba(var(--accent-rgb),.22) 38%,transparent 70%)',
          opacity: '0',
          pointerEvents: 'none',
        }}
      ></div>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(26px,4.6vh,42px)',
          padding: '0 6vw',
          textAlign: 'center',
        }}
      >
        {/* A paragraph, not a heading: the page has one <h1>, in the hero. */}
        <p
          ref={v.introHeadRef}
          onClick={v.introTap}
          style={{
            position: 'relative',
            margin: '0',
            fontFamily: 'var(--wide)',
            fontWeight: '600',
            fontStretch: '118%',
            fontSize: 'clamp(21px,min(4.2vw,7.2vh),62px)',
            lineHeight: '1.12',
            letterSpacing: '.01em',
            textTransform: 'uppercase',
            color: 'var(--body)',
          }}
        >
          <span data-mask={'1'} style={{ display: 'block', overflow: 'hidden', paddingBottom: '.08em' }}>
            <span style={{ display: 'block', position: 'relative', animation: 'introLine 1000ms 350ms cubic-bezier(.16,1,.3,1) both' }}>
              {'Somewhere between'}
              <span
                data-glow={'1'}
                aria-hidden={'true'}
                style={{
                  position: 'absolute',
                  inset: '0',
                  color: 'var(--glow)',
                  textShadow: '0 0 4px rgba(var(--glow-rgb),.55),0 0 10px rgba(var(--ink-rgb),.3),0 0 22px rgba(var(--accent-rgb),.16)',
                  opacity: '0',
                  pointerEvents: 'none',
                  WebkitMaskImage:
                    'radial-gradient(circle var(--r,78px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                  maskImage:
                    'radial-gradient(circle var(--r,78px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                }}
              >
                {'Somewhere between'}
              </span>
            </span>
          </span>
          <span data-mask={'1'} style={{ display: 'block', overflow: 'hidden', paddingBottom: '.08em' }}>
            <span style={{ display: 'block', position: 'relative', animation: 'introLine 1000ms 520ms cubic-bezier(.16,1,.3,1) both' }}>
              <span data-word={'code'} style={{ position: 'relative', display: 'inline-block', color: 'var(--ink)' }}>
                {'code'}
                <span
                  data-spark={'1'}
                  aria-hidden={'true'}
                  style={{
                    position: 'absolute',
                    right: '-.34em',
                    top: '-.26em',
                    width: '.36em',
                    height: '.36em',
                    opacity: '0',
                    transform: 'scale(0)',
                    pointerEvents: 'none',
                    background:
                      'linear-gradient(var(--glow),var(--glow)) center/1px 100% no-repeat,linear-gradient(90deg,var(--glow),var(--glow)) center/100% 1px no-repeat',
                    filter: 'drop-shadow(0 0 3px rgba(var(--glow-rgb),.75))',
                  }}
                ></span>
              </span>
              {' and '}
              <span data-word={'cons'} style={{ position: 'relative', display: 'inline-block', color: 'var(--ink)' }}>
                {'constellations'}
                <span
                  data-cons={''}
                  aria-hidden={'true'}
                  style={{ position: 'absolute', left: '-4%', right: '-4%', top: '-38%', bottom: '-38%', pointerEvents: 'none' }}
                >
                  <svg
                    viewBox={'0 0 100 100'}
                    preserveAspectRatio={'none'}
                    style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', overflow: 'visible' }}
                  >
                    <g fill={'none'} strokeWidth={'0.5'} style={{ stroke: 'var(--ink2)' }}>
                      <line
                        data-cl={'1'}
                        x1={'9'}
                        y1={'12'}
                        x2={'50'}
                        y2={'6'}
                        pathLength={'1'}
                        vectorEffect={'non-scaling-stroke'}
                        style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                      />
                      <line
                        data-cl={'1'}
                        x1={'50'}
                        y1={'6'}
                        x2={'92'}
                        y2={'16'}
                        pathLength={'1'}
                        vectorEffect={'non-scaling-stroke'}
                        style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                      />
                      <line
                        data-cl={'1'}
                        x1={'30'}
                        y1={'90'}
                        x2={'71'}
                        y2={'92'}
                        pathLength={'1'}
                        vectorEffect={'non-scaling-stroke'}
                        style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                      />
                      <line
                        data-cl={'1'}
                        x1={'50'}
                        y1={'6'}
                        x2={'71'}
                        y2={'92'}
                        pathLength={'1'}
                        vectorEffect={'non-scaling-stroke'}
                        style={{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }}
                      />
                    </g>
                  </svg>
                  <span
                    data-cp={'9,12'}
                    style={{
                      position: 'absolute',
                      left: '9%',
                      top: '12%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--glow)',
                      boxShadow: '0 0 5px rgba(var(--glow-rgb),.7)',
                      opacity: '0',
                      transform: 'scale(.4)',
                    }}
                  ></span>
                  <span
                    data-cp={'30,90'}
                    style={{
                      position: 'absolute',
                      left: '30%',
                      top: '90%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--glow)',
                      boxShadow: '0 0 5px rgba(var(--glow-rgb),.7)',
                      opacity: '0',
                      transform: 'scale(.4)',
                    }}
                  ></span>
                  <span
                    data-cp={'50,6'}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '6%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--glow)',
                      boxShadow: '0 0 5px rgba(var(--glow-rgb),.7)',
                      opacity: '0',
                      transform: 'scale(.4)',
                    }}
                  ></span>
                  <span
                    data-cp={'71,92'}
                    style={{
                      position: 'absolute',
                      left: '71%',
                      top: '92%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--glow)',
                      boxShadow: '0 0 5px rgba(var(--glow-rgb),.7)',
                      opacity: '0',
                      transform: 'scale(.4)',
                    }}
                  ></span>
                  <span
                    data-cp={'92,16'}
                    style={{
                      position: 'absolute',
                      left: '92%',
                      top: '16%',
                      width: '3px',
                      height: '3px',
                      margin: '-1.5px 0 0 -1.5px',
                      borderRadius: '50%',
                      background: 'var(--glow)',
                      boxShadow: '0 0 5px rgba(var(--glow-rgb),.7)',
                      opacity: '0',
                      transform: 'scale(.4)',
                    }}
                  ></span>
                </span>
              </span>
              {'…'}
              <span
                data-glow={'1'}
                aria-hidden={'true'}
                style={{
                  position: 'absolute',
                  inset: '0',
                  color: 'var(--glow)',
                  textShadow: '0 0 4px rgba(var(--glow-rgb),.55),0 0 10px rgba(var(--ink-rgb),.3),0 0 22px rgba(var(--accent-rgb),.16)',
                  opacity: '0',
                  pointerEvents: 'none',
                  WebkitMaskImage:
                    'radial-gradient(circle var(--r,78px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                  maskImage:
                    'radial-gradient(circle var(--r,78px) at var(--mx,-999px) var(--my,-999px),#000 0%,rgba(0,0,0,.55) 40%,transparent 100%)',
                }}
              >
                <span style={{ display: 'inline-block' }}>{'code'}</span>
                {' and '}
                <span style={{ display: 'inline-block' }}>{'constellations'}</span>
                {'…'}
              </span>
            </span>
          </span>
          <span
            data-cs={'1'}
            aria-hidden={'true'}
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '8px',
              height: '8px',
              margin: '-4px 0 0 -4px',
              opacity: '0',
              pointerEvents: 'none',
              background:
                'linear-gradient(var(--glow),var(--glow)) center/1px 100% no-repeat,linear-gradient(90deg,var(--glow),var(--glow)) center/100% 1px no-repeat',
              filter: 'drop-shadow(0 0 3px rgba(var(--glow-rgb),.75))',
            }}
          ></span>
          <span
            data-cs={'1'}
            aria-hidden={'true'}
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '8px',
              height: '8px',
              margin: '-4px 0 0 -4px',
              opacity: '0',
              pointerEvents: 'none',
              background:
                'linear-gradient(var(--glow),var(--glow)) center/1px 100% no-repeat,linear-gradient(90deg,var(--glow),var(--glow)) center/100% 1px no-repeat',
              filter: 'drop-shadow(0 0 3px rgba(var(--glow-rgb),.75))',
            }}
          ></span>
        </p>
        <div ref={v.introCtaRef} style={{ flex: 'none', animation: 'rise 700ms 1320ms cubic-bezier(.16,1,.3,1) both' }}>
          <button
            className="px-hc px-f8"
            ref={v.introBtnRef}
            onClick={v.enterUniverse}
            onMouseEnter={v.introHoverOn}
            onMouseLeave={v.introHoverOff}
            onFocus={v.introHoverOn}
            onBlur={v.introHoverOff}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              minHeight: '44px',
              padding: '0 22px',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(var(--ink-rgb),.28)',
              background: 'rgba(var(--ink-rgb),.06)',
              fontFamily: 'var(--sans)',
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '.1em',
              color: 'var(--ink)',
              cursor: 'pointer',
              transition: 'transform 320ms cubic-bezier(.16,1,.3,1),background 320ms,border-color 320ms',
            }}
          >
            {'ENTER MY UNIVERSE'}
          </button>
        </div>
      </div>
    </div>
  );
}
