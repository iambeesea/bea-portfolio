// Generated from the Claude Design export, then maintained by hand.
import { Fragment } from 'react';
import { txt, list } from '@/lib/experience/view';
import Image from 'next/image';
import type { ViewModel } from '@/lib/experience/view';
export function CaseStudy({ v }: { v: ViewModel }) {
  return (
    <div
      ref={v.caseRef}
      role={'dialog'}
      aria-modal={'true'}
      aria-label={v.caseAria}
      tabIndex={-1}
      onKeyDown={v.caseKey}
      style={{
        position: 'absolute',
        inset: '0',
        zIndex: '130',
        background: 'var(--bg)',
        overflowY: 'auto',
        overflowX: 'hidden',
        outline: 'none',
      }}
    >
      <div style={{ padding: 'clamp(20px,4vh,36px) 6vw 96px', maxWidth: '1320px', margin: '0 auto' }}>
        <div
          data-cfade={'1'}
          style={{
            position: 'sticky',
            top: '0',
            zIndex: '3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '12px 0',
            background: 'linear-gradient(var(--bg) 70%,rgba(var(--bg-rgb),0))',
          }}
        >
          <button
            className="px-hb px-f6"
            ref={v.caseCloseRef}
            onClick={v.closeCase}
            onMouseEnter={v.curOn}
            onMouseLeave={v.curOff}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '40px',
              padding: '0 16px',
              borderRadius: '999px',
              border: '1px solid rgba(var(--ink-rgb),.24)',
              fontSize: '12px',
              letterSpacing: '.06em',
              color: 'var(--ink)',
              transition: 'border-color 260ms ease,background 260ms ease',
            }}
          >
            {'← BACK TO SELECTED WORK'}
          </button>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            {txt(v.caseNum)}
            {' / '}
            {txt(v.caseTotal)}
            {' · Esc to close'}
          </span>
        </div>
        <div data-cfade={'1'} style={{ paddingTop: 'clamp(24px,5vh,56px)' }}>
          <h2
            style={{
              margin: '0',
              fontFamily: 'var(--wide)',
              fontWeight: '700',
              fontStretch: '118%',
              fontSize: 'clamp(40px,8vw,128px)',
              lineHeight: '.95',
              letterSpacing: '-.03em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
            }}
          >
            {txt(v.caseName)}
          </h2>
          <p
            style={{
              margin: 'clamp(16px,3vh,26px) 0 0',
              maxWidth: '56ch',
              fontSize: 'clamp(16px,1.5vw,19px)',
              lineHeight: '1.65',
              color: 'var(--body)',
            }}
          >
            {txt(v.caseDesc)}
          </p>
          <dl
            style={{
              margin: 'clamp(22px,4vh,40px) 0 0',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
              gap: '18px 32px',
              padding: '20px 0',
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
            }}
          >
            {list(v.caseMeta).map((m, i0) => (
              <Fragment key={i0}>
                <div>
                  <dt style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    {txt(m?.k)}
                  </dt>
                  <dd style={{ margin: '6px 0 0', fontSize: '15px', color: 'var(--ink)' }}>{txt(m?.v)}</dd>
                </div>
              </Fragment>
            ))}
          </dl>
        </div>
        <div
          ref={v.caseHeroRef}
          style={{
            position: 'relative',
            marginTop: 'clamp(24px,4vh,40px)',
            aspectRatio: '16/9',
            borderRadius: '18px',
            overflow: 'hidden',
            border: '1px solid var(--line)',
            background: 'repeating-linear-gradient(135deg,var(--well) 0 12px,var(--well2) 12px 24px)',
            display: 'grid',
            placeItems: 'center',
            transformOrigin: '0 0',
          }}
        >
          {v.caseThumb ? (
            <Image
              src={v.caseThumb}
              alt={`${v.caseName} — screenshot of the project`}
              fill
              sizes="(max-width: 900px) 94vw, 1100px"
              style={{ objectFit: 'cover', objectPosition: '50% 0%' }}
            />
          ) : (
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {txt(v.caseName)}
              {' · hero image [PH]'}
            </span>
          )}
        </div>
        <div data-cfade={'1'} style={{ marginTop: 'clamp(36px,6vh,64px)' }}>
          {list(v.caseSections).map((sec, i0) => (
            <Fragment key={i0}>
              <div
                data-crev={'1'}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
                  gap: 'clamp(16px,3vw,48px)',
                  padding: 'clamp(26px,4vh,40px) 0',
                  borderTop: '1px solid var(--line)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'baseline',
                    fontSize: '12px',
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  <span>{txt(sec?.num)}</span>
                  <span style={{ color: 'var(--ink2)' }}>{txt(sec?.label)}</span>
                </div>
                <p
                  style={{
                    gridColumn: 'span 2',
                    minWidth: '0',
                    margin: '0',
                    maxWidth: '62ch',
                    fontSize: '16px',
                    lineHeight: '1.75',
                    color: 'var(--body)',
                  }}
                >
                  {txt(sec?.body)}
                </p>
              </div>
            </Fragment>
          ))}
          {v.caseShowFeatures ? (
            <div data-crev={'1'} style={{ padding: 'clamp(26px,4vh,40px) 0', borderTop: '1px solid var(--line)' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  fontSize: '12px',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                <span>{'08'}</span>
                <span style={{ color: 'var(--ink2)' }}>{'Key features'}</span>
              </div>
              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '14px' }}>
                {list(v.caseFeatures).map((f, i0) => (
                  <Fragment key={i0}>
                    <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--panel)' }}>
                      <div
                        style={{
                          aspectRatio: '4/3',
                          background: 'repeating-linear-gradient(135deg,var(--well) 0 12px,var(--well2) 12px 24px)',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '12px',
                          color: 'var(--muted)',
                        }}
                      >
                        {'Screenshot [PH]'}
                      </div>
                      <p style={{ margin: '0', padding: '14px 16px', fontSize: '14px', lineHeight: '1.6', color: 'var(--body)' }}>
                        {txt(f)}
                      </p>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          ) : null}
          <div data-crev={'1'} style={{ padding: 'clamp(26px,4vh,40px) 0', borderTop: '1px solid var(--line)' }}>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                fontSize: '12px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              <span>{txt(v.caseStackNum)}</span>
              <span style={{ color: 'var(--ink2)' }}>{'Tech stack'}</span>
            </div>
            <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {list(v.caseStack).map((t, i0) => (
                <Fragment key={i0}>
                  <span
                    style={{
                      padding: '7px 14px',
                      borderRadius: '999px',
                      border: '1px solid rgba(var(--ink-rgb),.26)',
                      fontSize: '13px',
                      color: 'var(--ink2)',
                    }}
                  >
                    {txt(t)}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
          {v.caseHasLinks ? (
            <>
              <div
                data-crev={'1'}
                style={{
                  padding: 'clamp(26px,4vh,40px) 0',
                  borderTop: '1px solid var(--line)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                {list(v.caseLinks).map((l, i0) => (
                  <Fragment key={i0}>
                    <a
                      href={l?.url}
                      target={'_blank'}
                      rel={'noopener'}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minHeight: '42px',
                        padding: '0 18px',
                        borderRadius: '999px',
                        border: '1px solid rgba(var(--ink-rgb),.3)',
                        fontSize: '13px',
                        letterSpacing: '.04em',
                        color: 'var(--ink)',
                      }}
                    >
                      {txt(l?.label)}
                      {' ↗'}
                    </a>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
          <button
            className="px-h5 px-f6"
            onClick={v.nextCase}
            onMouseEnter={v.curOn}
            onMouseLeave={v.curOff}
            style={{
              marginTop: 'clamp(28px,5vh,52px)',
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) clamp(120px,22vw,260px)',
              gap: 'clamp(16px,3vw,40px)',
              alignItems: 'center',
              padding: 'clamp(18px,3vh,28px)',
              borderRadius: '18px',
              border: '1px solid var(--line)',
              background: 'var(--panel)',
              textAlign: 'left',
              color: 'var(--ink)',
              transition: 'border-color 300ms ease',
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '.08em', color: 'var(--muted)' }}>{'NEXT PROJECT →'}</span>
              <span
                style={{
                  fontFamily: 'var(--wide)',
                  fontWeight: '700',
                  fontStretch: '118%',
                  fontSize: 'clamp(24px,3.4vw,48px)',
                  lineHeight: '1',
                  letterSpacing: '-.02em',
                  textTransform: 'uppercase',
                }}
              >
                {txt(v.nextCaseName)}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--body)' }}>{txt(v.nextCaseTag)}</span>
            </span>
            <span
              aria-hidden={'true'}
              style={{
                aspectRatio: '16/10',
                borderRadius: '12px',
                background: 'repeating-linear-gradient(135deg,var(--well) 0 12px,var(--well2) 12px 24px)',
              }}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
}
