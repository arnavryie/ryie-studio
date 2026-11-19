import { useState } from 'react'
import { ArrowRight, Check, Clapperboard, Code2, Cpu, Mail, Video } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { PROOF_PROJECTS, STUDIO_CONTACT, type Currency } from '../data/studio'

const UGC_PACKAGES = [
  {
    id: 'single-reel',
    name: 'Single Product Demo Reel',
    turnaround: '48 Hours',
    price: { INR: '₹3,500', USD: '$75' },
    desc: '1 crisp 30–45s 9:16 walkthrough pairing live UI screen capture with developer voiceover + face cam.',
    items: [
      '2 custom hook variations (first 3 seconds)',
      '1080×1920 60fps OBS screen + face recording',
      'Clean burnt-in captions & SFX pacing',
      'Full organic & paid ad usage rights',
    ],
  },
  {
    id: 'launch-pack',
    name: '3-Angle Launch Pack',
    turnaround: '4 Days',
    highlighted: true,
    price: { INR: '₹9,000', USD: '$190' },
    desc: 'Built for Product Hunt, X, Reels, and paid creative testing — 3 distinct pain-point angles.',
    items: [
      '3 full 30–45s vertical walkthrough videos',
      'Problem-hook, Speed-demo, & Feature-breakdown angles',
      'Raw clean screen recordings included',
      '1 fast revision pass per video',
    ],
  },
]

export function UgcPage() {
  const [currency, setCurrency] = useState<Currency>('INR')

  return (
    <div className="min-h-screen bg-[#06070b] text-zinc-100">
      <Navbar currency={currency} onCurrencyChange={setCurrency} />

      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-grid-subtle">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-violet-500/15 via-cyan-500/5 to-transparent" />
          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 font-mono text-xs text-violet-300">
              <Clapperboard className="h-3.5 w-3.5" />
              Developer-Led SaaS &amp; AI Product UGC
            </span>

            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Product Demo Reels shot by an{' '}
              <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
                engineer who ships AI apps.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Most UGC creators read a generic script without understanding your workflow. I build Next.js, FastAPI,
              and multi-agent AI products myself — so your demos look natural, technical, and credible to founders and
              buyers.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent('Product Demo UGC Inquiry')}`}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-300"
              >
                <Mail className="h-4 w-4" />
                Book a Demo Reel
              </a>
              <a
                href="#ugc-pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-100 hover:bg-white/10"
              >
                See Reel Pricing
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Video,
                  title: '60fps Screen + Face Cam',
                  desc: 'Clean OBS capture, tight zoom cuts on UI actions, and studio-tuned voice audio.',
                },
                {
                  icon: Code2,
                  title: 'Zero Technical Hand-Holding',
                  desc: 'Send your staging link or repo — I understand prompts, dashboards, APIs, and dev tools.',
                },
                {
                  icon: Cpu,
                  title: '48-Hour Turnaround',
                  desc: 'No physical shipping delays. Ready-to-post 9:16 vertical cuts for X, Reels, and Shorts.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4">
                  <Icon className="h-5 w-5 text-violet-300" />
                  <h2 className="mt-3 font-display text-sm font-semibold text-white">{title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ugc-pricing" className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-violet-300">Transparent Rates</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">Simple flat-fee creative packs</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {UGC_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 ${
                  pkg.highlighted
                    ? 'border-violet-400/50 bg-gradient-to-b from-violet-500/10 via-zinc-950 to-zinc-950'
                    : 'border-white/10 bg-zinc-950/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-white">{pkg.name}</h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                      {pkg.turnaround}
                    </span>
                  </div>
                  <div className="mt-3 font-display text-3xl font-bold text-white">{pkg.price[currency]}</div>
                  <p className="mt-2 text-sm text-zinc-400">{pkg.desc}</p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent(
                    `[${pkg.name}] ${pkg.price[currency]} — Demo Reel Request`,
                  )}`}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-300"
                >
                  Request {pkg.name}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
            <h3 className="font-display text-sm font-semibold text-white">Apps I Built (Product Domain Proof)</h3>
            <div className="mt-3 flex flex-wrap gap-3 text-xs font-mono">
              {PROOF_PROJECTS.slice(0, 4).map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-cyan-300 hover:border-cyan-400/40"
                >
                  {p.title}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
