// Generated from the Claude Design export, then maintained by hand.
/* eslint-disable @next/next/no-img-element -- role images come from content with unknown dimensions, so next/image cannot size them */
import { Fragment } from 'react';
import { txt, list } from '@/lib/experience/view';
import type { ViewModel } from '@/lib/experience/view';
export function Lightbox({ v }: { v: ViewModel }) {
  return (
    <div
      role={'dialog'}
      aria-modal={'true'}
      aria-label={v.lbAlt}
      onClick={v.lbClose}
      style={{
        position: 'absolute',
        inset: '0',
        zIndex: '170',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: 'clamp(56px,8vh,80px) 6vw clamp(24px,5vh,48px)',
        background: 'rgba(var(--deep-rgb),.86)',
        animation: 'rise 360ms cubic-bezier(.16,1,.3,1) both',
      }}
    >
      {list(v.lbImgs).map((im, i0) => (
        <Fragment key={i0}>
          <img
            data-src={im?.src}
            alt={im?.alt}
            style={{
              display: 'block',
              maxWidth: 'min(1100px,100%)',
              maxHeight: 'calc(100% - 60px)',
              objectFit: 'contain',
              borderRadius: '14px',
              border: '1px solid rgba(var(--ink-rgb),.18)',
            }}
          />
        </Fragment>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {v.lbHasCap ? (
          <>
            <span style={{ fontSize: '13px', color: 'var(--body)' }}>{txt(v.lbCap)}</span>
          </>
        ) : null}
        <button
          className="px-f0"
          ref={v.lbBtnRef}
          onClick={v.lbClose}
          style={{
            minHeight: '36px',
            padding: '0 16px',
            borderRadius: '999px',
            border: '1px solid rgba(var(--ink-rgb),.24)',
            fontSize: '12px',
            color: 'var(--ink)',
          }}
        >
          {'Close'}
        </button>
      </div>
    </div>
  );
}
