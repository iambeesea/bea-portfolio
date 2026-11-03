import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ProofCard } from '@/components/services/ProofCard';
import { getPortfolioContent } from '@/lib/content';
import { automations, reels, services } from '@/lib/services';
import { site } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Brand and social design, social media management, websites and web apps, automation, and reels by Beatrice Capule, a front-end developer and digital designer in the Philippines.',
  alternates: { canonical: '/services' },
};

const mail = `mailto:${site.email}?subject=${encodeURIComponent('Project inquiry')}`;

const button =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export default async function ServicesPage() {
  const { projects } = await getPortfolioContent();
  const bySlug = new Map(projects.map((p) => [p.slug, p]));

  return (
    <div className="min-h-dvh bg-bg font-sans text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link href="/" className="flex min-h-11 items-center font-serif text-2xl text-ink italic no-underline hover:text-accent">
          beatrice
        </Link>
        <nav aria-label="Services page" className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className={`${button} px-4 text-body hover:text-ink`}>
            Portfolio
          </Link>
          <a href={mail} className={`${button} bg-ink text-bg hover:bg-accent hover:text-bg`}>
            Let’s talk
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-10 pb-16 sm:px-8 sm:pt-16 sm:pb-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <p className="m-0 text-xs tracking-[0.3em] text-muted uppercase">Services</p>
            <h1 className="m-0 mt-5 max-w-[16ch] font-wide text-[clamp(36px,6.4vw,84px)] leading-[0.98] font-bold tracking-[-0.03em] text-balance">
              I design it, build it, and make it{' '}
              <span className="font-serif font-normal tracking-normal text-accent italic">work for you.</span>
            </h1>
            <p className="m-0 mt-6 max-w-[56ch] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-body">
              One person for your brand visuals, your social media, your website, the automations behind it, and the reels that promote it,
              so nothing gets lost between handoffs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mail} className={`${button} bg-ink text-bg hover:bg-accent hover:text-bg`}>
                Start a project
              </a>
              <Link href="/" className={`${button} border border-line text-ink hover:border-accent hover:text-accent`}>
                See my portfolio
              </Link>
            </div>
            <dl className="m-0 mt-12 grid max-w-3xl grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              {[
                ['4 years', 'of front-end experience'],
                [`${projects.length} projects`, 'in my portfolio'],
                ['Design + code', 'from one person'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-wide text-2xl font-semibold text-ink">{k}</dt>
                  <dd className="m-0 mt-1 text-sm text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {/* A glimpse of each kind of work: a website, social design and a reel. */}
          <div aria-hidden="true" className="relative mx-auto hidden aspect-[4/5] w-full max-w-[440px] lg:block">
            <div className="absolute top-[4%] left-0 w-[78%] -rotate-6 overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/40">
              <Image src="/images/projects/kata.webp" alt="" width={2400} height={1500} sizes="340px" className="block h-auto w-full" />
            </div>
            <div className="absolute top-[30%] right-0 w-[82%] rotate-3 overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/40">
              <Image src="/images/projects/oasis.webp" alt="" width={2400} height={1500} sizes="360px" className="block h-auto w-full" />
            </div>
            <div className="absolute bottom-0 left-[12%] w-[38%] -rotate-3 overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/40">
              <Image src="/videos/rion-reel-entrance.webp" alt="" width={720} height={1280} sizes="170px" className="block h-auto w-full" />
            </div>
          </div>
        </section>

        {/* Services */}
        {services.map((service, i) => {
          const proof = (service.projects ?? []).map((s) => bySlug.get(s)).filter((p) => p !== undefined);
          return (
            <section key={service.id} id={service.id} aria-labelledby={`${service.id}-title`} className="border-t border-line">
              <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
                <div>
                  <p className="m-0 font-wide text-sm text-accent">{String(i + 1).padStart(2, '0')}</p>
                  <h2
                    id={`${service.id}-title`}
                    className="m-0 mt-3 font-wide text-[clamp(26px,3.4vw,42px)] leading-tight font-bold tracking-[-0.02em]"
                  >
                    {service.title}
                  </h2>
                  <p className="m-0 mt-4 max-w-[44ch] text-lg leading-relaxed text-body">{service.pitch}</p>
                  <ul className="m-0 mt-6 list-none space-y-3 p-0">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-body">
                        <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {service.tools.length ? (
                    <ul aria-label={`Tools for ${service.title}`} className="m-0 mt-7 flex list-none flex-wrap gap-2 p-0">
                      {service.tools.map((tool) => (
                        <li key={tool} className="rounded-full border border-line px-3 py-1.5 text-[13px] text-body">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div>
                  {proof.length ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {proof.map((project) => (
                        <ProofCard key={project.slug} project={project} />
                      ))}
                    </div>
                  ) : null}

                  {service.id === 'automation' ? (
                    <div className="grid gap-4">
                      {automations.map((a) => (
                        <article key={a.title} className="rounded-2xl border border-line bg-panel p-6">
                          <h3 className="m-0 font-wide text-lg font-semibold">{a.title}</h3>
                          <p className="m-0 mt-2 text-[15px] leading-relaxed text-body">{a.body}</p>
                          <ol aria-label="How it flows" className="m-0 mt-5 flex list-none flex-wrap items-center gap-2 p-0">
                            {a.steps.map((step, k) => (
                              <li key={step} className="flex items-center gap-2">
                                <span className="rounded-lg border border-line bg-well px-3 py-1.5 text-[13px] text-ink">{step}</span>
                                {k < a.steps.length - 1 ? (
                                  <span aria-hidden="true" className="text-accent">
                                    →
                                  </span>
                                ) : null}
                              </li>
                            ))}
                          </ol>
                        </article>
                      ))}
                    </div>
                  ) : null}

                  {service.id === 'reels' ? (
                    <div className="grid grid-cols-2 items-start gap-4">
                      {reels.map((reel) => (
                        <figure key={reel.src} className="m-0 overflow-hidden rounded-2xl border border-line bg-panel">
                          <video
                            className="block h-auto w-full bg-well"
                            src={reel.src}
                            poster={reel.poster}
                            width={reel.width}
                            height={reel.height}
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            preload="metadata"
                            aria-label={reel.label}
                          />
                          <figcaption className="px-4 py-3 text-xs text-muted">{reel.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          );
        })}

        {/* How we'll work */}
        <section aria-labelledby="process-title" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 id="process-title" className="m-0 font-wide text-[clamp(26px,3.4vw,42px)] font-bold tracking-[-0.02em]">
              How we’ll work
            </h2>
            <ol className="m-0 mt-10 grid list-none gap-6 p-0 md:grid-cols-3">
              {[
                ['Talk', 'You tell me the goal, the audience and the deadline. I ask the questions that shape the work.'],
                ['Make', 'I design and build in short rounds and share progress, so you can steer before anything is final.'],
                ['Launch', 'I launch, check it on every screen size, and hand over everything you need to keep it running.'],
              ].map(([title, body], k) => (
                <li key={title} className="rounded-2xl border border-line bg-panel p-6">
                  <p className="m-0 font-wide text-sm text-accent">{String(k + 1).padStart(2, '0')}</p>
                  <h3 className="m-0 mt-3 font-wide text-xl font-semibold">{title}</h3>
                  <p className="m-0 mt-2 text-[15px] leading-relaxed text-body">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Call to action */}
        <section className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-20 sm:px-8 sm:py-24 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="m-0 font-wide text-[clamp(30px,4.6vw,60px)] leading-none font-bold tracking-[-0.03em]">
                Have something in mind?
              </h2>
              <p className="m-0 mt-4 max-w-[44ch] text-lg text-body">Tell me what you’re working on, and I’ll tell you how I can help.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={mail} className={`${button} bg-ink text-bg hover:bg-accent hover:text-bg`}>
                Email me
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${button} border border-line text-ink hover:border-accent hover:text-accent`}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-muted sm:px-8">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <a href={`mailto:${site.email}`} className="text-muted hover:text-accent">
            {site.email}
          </a>
        </div>
      </footer>
    </div>
  );
}
