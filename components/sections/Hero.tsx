// Generated from the Claude Design export, then maintained by hand.
import { css } from '@/lib/experience/view';
import type { ViewModel } from '@/lib/experience/view';
export function Hero({ v }: { v: ViewModel }) {
  return (
    <section
      data-panel={''}
      data-screen-label={'Hero'}
      style={{ position: 'sticky', top: '0', height: '100%', overflow: 'hidden', zIndex: '1', background: 'var(--bg)' }}
    >
      <div style={{ height: '100%', position: 'relative' }}>
        <div
          aria-hidden={'true'}
          style={{
            position: 'absolute',
            inset: '0',
            pointerEvents: 'none',
            background:
              'radial-gradient(60% 55% at 30% 40%,rgba(123,55,132,.28),transparent 70%),radial-gradient(45% 40% at 78% 70%,rgba(var(--accent-rgb),.10),transparent 70%)',
          }}
        ></div>
        <svg
          viewBox={'0 0 1000 620'}
          preserveAspectRatio={'xMidYMid slice'}
          aria-hidden={'true'}
          style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <g strokeWidth={'0.5'} style={{ stroke: 'var(--line2)' }}>
            <line x1={'148'} y1={'118'} x2={'232'} y2={'196'} />
            <line x1={'232'} y1={'196'} x2={'186'} y2={'308'} />
            <line x1={'232'} y1={'196'} x2={'336'} y2={'164'} />
            <line x1={'336'} y1={'164'} x2={'392'} y2={'78'} />
            <line x1={'604'} y1={'112'} x2={'688'} y2={'178'} />
            <line x1={'688'} y1={'178'} x2={'742'} y2={'132'} />
            <line x1={'688'} y1={'178'} x2={'666'} y2={'286'} />
            <line x1={'666'} y1={'286'} x2={'770'} y2={'344'} />
            <line x1={'770'} y1={'344'} x2={'874'} y2={'296'} />
            <line x1={'874'} y1={'296'} x2={'912'} y2={'392'} />
            <line x1={'392'} y1={'78'} x2={'604'} y2={'112'} />
            <line x1={'186'} y1={'308'} x2={'284'} y2={'436'} />
            <line x1={'284'} y1={'436'} x2={'430'} y2={'472'} />
            <line x1={'430'} y1={'472'} x2={'546'} y2={'398'} />
          </g>
          <circle cx={'148'} cy={'118'} r={'1.9'} style={{ fill: 'var(--ink)', animation: 'twinkle 5.2s 0s ease-in-out infinite' }} />
          <circle cx={'232'} cy={'196'} r={'1.4'} style={{ fill: 'var(--ink)', animation: 'twinkle 6.1s .8s ease-in-out infinite' }} />
          <circle cx={'186'} cy={'308'} r={'1.6'} style={{ fill: 'var(--ink)', animation: 'twinkle 4.8s 1.6s ease-in-out infinite' }} />
          <circle cx={'336'} cy={'164'} r={'2.2'} style={{ fill: 'var(--accent)', animation: 'twinkle 6.6s .4s ease-in-out infinite' }} />
          <circle cx={'392'} cy={'78'} r={'1.3'} style={{ fill: 'var(--ink)', animation: 'twinkle 5.5s 2.3s ease-in-out infinite' }} />
          <circle cx={'604'} cy={'112'} r={'1.7'} style={{ fill: 'var(--ink)', animation: 'twinkle 5.9s 1.1s ease-in-out infinite' }} />
          <circle cx={'688'} cy={'178'} r={'2.1'} style={{ fill: 'var(--accent)', animation: 'twinkle 7.2s 1.9s ease-in-out infinite' }} />
          <circle cx={'742'} cy={'132'} r={'1.3'} style={{ fill: 'var(--ink)', animation: 'twinkle 4.6s .2s ease-in-out infinite' }} />
          <circle cx={'666'} cy={'286'} r={'1.5'} style={{ fill: 'var(--ink)', animation: 'twinkle 6.4s 2.6s ease-in-out infinite' }} />
          <circle cx={'770'} cy={'344'} r={'1.8'} style={{ fill: 'var(--ink)', animation: 'twinkle 5.1s .9s ease-in-out infinite' }} />
          <circle cx={'874'} cy={'296'} r={'2.3'} style={{ fill: 'var(--accent)', animation: 'twinkle 6.9s 2.2s ease-in-out infinite' }} />
          <circle cx={'912'} cy={'392'} r={'1.4'} style={{ fill: 'var(--ink)', animation: 'twinkle 5.7s .5s ease-in-out infinite' }} />
          <circle cx={'284'} cy={'436'} r={'1.5'} style={{ fill: 'var(--ink)', animation: 'twinkle 6.2s 1.4s ease-in-out infinite' }} />
          <circle cx={'430'} cy={'472'} r={'1.7'} style={{ fill: 'var(--ink)', animation: 'twinkle 4.9s 2.8s ease-in-out infinite' }} />
          <circle cx={'546'} cy={'398'} r={'1.2'} style={{ fill: 'var(--ink)', animation: 'twinkle 5.4s 1.2s ease-in-out infinite' }} />
          <circle cx={'86'} cy={'388'} r={'1.2'} style={{ fill: 'var(--ink)', animation: 'twinkle 6.8s 2.1s ease-in-out infinite' }} />
          <circle cx={'948'} cy={'164'} r={'1.3'} style={{ fill: 'var(--ink)', animation: 'twinkle 5.3s 1.7s ease-in-out infinite' }} />
          <circle cx={'520'} cy={'556'} r={'1.4'} style={{ fill: 'var(--ink)', animation: 'twinkle 6.5s .6s ease-in-out infinite' }} />
        </svg>
        <div ref={v.floatRef} aria-hidden={'true'} style={{ position: 'absolute', inset: '0', overflow: 'hidden', pointerEvents: 'none' }}>
          <span
            data-fw={'0'}
            style={{
              position: 'absolute',
              left: '-3%',
              top: '9%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '112%',
              fontSize: 'clamp(20px,3.2vw,56px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'HOLA, SOY BEATRICE'}
          </span>
          <span
            data-fw={'1'}
            style={{
              position: 'absolute',
              left: '52%',
              top: '5%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '112%',
              fontSize: 'clamp(18px,2.6vw,46px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'BONJOUR, JE SUIS BEATRICE'}
          </span>
          <span
            data-fw={'2'}
            style={{
              position: 'absolute',
              left: '58%',
              top: '24%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '112%',
              fontSize: 'clamp(22px,3.4vw,60px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'CIAO, SONO BEATRICE'}
          </span>
          <span
            data-fw={'3'}
            style={{
              position: 'absolute',
              left: '-6%',
              top: '33%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '112%',
              fontSize: 'clamp(22px,3.6vw,62px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'HALLO, ICH BIN BEATRICE'}
          </span>
          <span
            data-fw={'4'}
            style={{
              position: 'absolute',
              left: '64%',
              top: '44%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '112%',
              fontSize: 'clamp(18px,2.4vw,42px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'KUMUSTA, AKO SI BEATRICE'}
          </span>
          <span
            data-fw={'5'}
            style={{
              position: 'absolute',
              left: '4%',
              top: '66%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '112%',
              fontSize: 'clamp(20px,3vw,52px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'OLÁ, SOU A BEATRICE'}
          </span>
          <span
            data-fw={'6'}
            style={{
              position: 'absolute',
              left: '8%',
              top: '52%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '100%',
              fontSize: 'clamp(18px,2.6vw,44px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'こんにちは、ベアトリスです'}
          </span>
          <span
            data-fw={'7'}
            style={{
              position: 'absolute',
              left: '56%',
              top: '63%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '100%',
              fontSize: 'clamp(22px,3.4vw,58px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'مرحباً، أنا بياتريس'}
          </span>
          <span
            data-fw={'8'}
            style={{
              position: 'absolute',
              left: '22%',
              top: '82%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '112%',
              fontSize: 'clamp(20px,3vw,52px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'ΓΕΙΑ, ΕΙΜΑΙ Η ΒΕΑΤΡΙΚΗ'}
          </span>
          <span
            data-fw={'9'}
            style={{
              position: 'absolute',
              left: '62%',
              top: '84%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '100%',
              fontSize: 'clamp(16px,2.2vw,38px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'안녕하세요, 베아트리체입니다'}
          </span>
          <span
            data-fw={'10'}
            style={{
              position: 'absolute',
              left: '28%',
              top: '17%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '112%',
              fontSize: 'clamp(16px,2.2vw,38px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'ПРИВЕТ, Я БЕАТРИС'}
          </span>
          <span
            data-fw={'11'}
            style={{
              position: 'absolute',
              left: '78%',
              top: '14%',
              fontFamily: 'var(--wide)',
              fontWeight: '400',
              fontStretch: '100%',
              fontSize: 'clamp(18px,2.6vw,44px)',
              lineHeight: '1',
              letterSpacing: '-.01em',
              whiteSpace: 'nowrap',
              color: 'var(--ink2)',
              opacity: '0',
            }}
          >
            {'你好，我是碧翠丝'}
          </span>
        </div>
        <div
          style={{
            position: 'relative',
            height: '100%',
            padding: 'clamp(72px,12vh,124px) 6vw clamp(56px,8vh,72px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(22px,3.6vh,40px)',
            textAlign: 'center',
          }}
        >
          <h1
            data-par={'0.06'}
            style={{
              margin: '0',
              fontFamily: 'var(--wide)',
              fontWeight: '800',
              fontStretch: '125%',
              fontSize: 'clamp(28px,min(7.4vw,13vh),150px)',
              lineHeight: '.96',
              letterSpacing: '-.02em',
              color: 'var(--ink2)',
            }}
          >
            <span
              style={css(
                `display:block;transform-origin:50% 50%;animation:heroIn 1200ms 260ms cubic-bezier(.22,1,.36,1) both;animation-play-state:${v.heroPlay ?? ''}`,
              )}
            >
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{"HELLO, I'M"}</span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{'BEATRICE'}</span>
            </span>
          </h1>
          <div data-par={'0.12'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(18px,3vh,30px)' }}>
            <p
              style={css(
                `margin:0;max-width:44ch;font-family:var(--wide);font-stretch:100%;font-size:clamp(14px,1.3vw,18px);line-height:1.55;color:var(--ink3);animation:rise 800ms 560ms cubic-bezier(.22,1,.36,1) both;animation-play-state:${v.heroPlay ?? ''}`,
              )}
            >
              {'Full stack developer and UI/UX designer, based in the Philippines. Open to work. '}
              <span style={{ color: 'var(--muted)' }}>{'[PH]'}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
