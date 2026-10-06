'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-bg px-6 text-center font-sans text-ink">
      <p className="text-xs tracking-[0.3em] text-muted uppercase">Something went wrong</p>
      <h1 className="m-0 font-wide text-[clamp(28px,6vw,60px)] leading-none font-bold uppercase">A star flickered out</h1>
      <p className="m-0 max-w-[46ch] text-body">The page hit an unexpected problem. Trying again usually fixes it.</p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex min-h-11 items-center rounded-full border border-line2 px-6 text-sm text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Try again
      </button>
    </main>
  );
}
