import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name} — portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The card shown when the site is shared in chats and on social media. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: 'radial-gradient(circle at 70% 20%, #3A1052 0%, #1B0230 55%, #0E0118 100%)',
        color: '#F7E6EE',
      }}
    >
      <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#C574B0' }}>PORTFOLIO</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 104, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>{site.name}</div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 34, color: '#D3AEC8' }}>
          Software Development Lead · Full-Stack Developer · Digital Designer
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#B889B0' }}>Somewhere between code and constellations</div>
    </div>,
    size,
  );
}
