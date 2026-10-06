import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-bg px-6 text-center font-sans text-ink">
      <p className="text-xs tracking-[0.3em] text-muted uppercase">404 · Lost in space</p>
      <h1 className="m-0 font-wide text-[clamp(32px,7vw,72px)] leading-none font-bold uppercase">This star isn’t on the map</h1>
      <p className="m-0 max-w-[46ch] text-body">The page you were looking for doesn’t exist, or it has moved.</p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center rounded-full border border-line2 px-6 text-sm text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
