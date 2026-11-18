import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Code2, Cpu, Layers, Mail, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { ProofCard } from '../components/ProofCard'
import { NICHE_IDS, NICHE_TEMPLATES } from '../data/niches'
import {
  PROOF_PROJECTS,
  SERVICE_PACKAGES,
  SPRINT_WORKFLOW,
  STUDIO_CONTACT,
  type Currency,
} from '../data/studio'

export function HomePage() {
  const [currency, setCurrency] = useState<Currency>('INR')

  return (
    <div className="min-h-screen bg-[#06070b] text-zinc-100">
      <Navbar currency={currency} onCurrencyChange={setCurrency} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-grid-subtle">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-cyan-500/10 via-violet-500/5 to-transparent" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 font-mono text-xs text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Available for 3–7 Day Fixed-Scope Sprints · Pune &amp; Remote
            </div>

            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Websites, AI Lead Desks &amp; SaaS MVPs{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                shipped live in days.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Built solo by {STUDIO_CONTACT.builderName} (<span className="font-mono text-zinc-300">@arnavryie</span>).
              No bloated agency layers, no vague timelines — see a working live preview of your business or product
              before paying a single rupee.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#pricing"
                className="glow-cyan inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-300"
              >
                See Fixed Pricing
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#demos"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-white/30 hover:bg-white/10"
              >
                Try Interactive Demos
              </a>
              <a
                href={STUDIO_CONTACT.portfolio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 font-mono text-xs text-zinc-400 transition hover:text-cyan-300"
              >
                Full Engineering Portfolio
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Code2,
                  title: 'Full-Stack Production Stack',
                  desc: 'Next.js · React 19 · FastAPI · Supabase · PostgreSQL · GSAP',
                },
                {
                  icon: Cpu,
                  title: 'Practical AI Automation',
                  desc: '24/7 lead qualification, RAG knowledge bots, Groq / Gemini / OpenAI',
                },
                {
                  icon: Layers,
                  title: 'Zero-Risk Sprint Model',
                  desc: 'Custom live preview upfront · 50% kickoff · 50% on domain launch',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-zinc-950/75 p-4 backdrop-blur">
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <h2 className="mt-3 font-display text-sm font-semibold text-zinc-100">{title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Live Work */}
        <section id="work" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-300">Shipped &amp; Live</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Real deployed work — click any card to inspect
              </h2>
            </div>
            <a
              href={STUDIO_CONTACT.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-cyan-300"
            >
              github.com/arnavryie
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROOF_PROJECTS.map((project) => (
              <ProofCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Interactive Demo-First Showcase */}
        <section id="demos" className="border-y border-white/10 bg-zinc-950/60">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="font-mono text-xs uppercase tracking-widest text-violet-300">Demo-First Engine</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Test interactive industry builds right now
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Each demo includes a responsive landing layout, instant booking capture, and a working AI front-desk
              assistant. Every detail is tailored to your brand when shipped.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {NICHE_IDS.map((nicheId) => {
                const niche = NICHE_TEMPLATES[nicheId]
                return (
                  <Link
                    key={nicheId}
                    to={`/demo/${nicheId}`}
                    className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#06070b] p-5 transition hover:border-violet-400/40"
                  >
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-violet-300">
                        {niche.label}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-semibold text-white group-hover:text-violet-200">
                        {niche.defaultBrand}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-400">{niche.defaultTagline}</p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-cyan-300">
                      Open Live Preview
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Transparent Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-300">Fixed-Scope Sprints</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Clear prices, rapid turnaround
              </h2>
            </div>
            <div className="flex rounded-lg border border-white/10 bg-zinc-900/80 p-0.5 font-mono text-xs">
              {(['INR', 'USD'] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setCurrency(unit)}
                  className={`rounded-md px-3 py-1.5 transition ${
                    currency === unit ? 'bg-cyan-400 font-semibold text-zinc-950' : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {unit === 'INR' ? 'India (₹ INR)' : 'Global ($ USD)'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {SERVICE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 ${
                  pkg.highlighted
                    ? 'border-cyan-400/50 bg-gradient-to-b from-cyan-500/10 via-zinc-950 to-zinc-950'
                    : 'border-white/10 bg-zinc-950/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-300">{pkg.badge}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                      {pkg.turnaround}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-white">{pkg.name}</h3>
                  <div className="mt-3 font-display text-3xl font-bold text-white">{pkg.price[currency]}</div>
                  <p className="mt-2 text-sm text-zinc-400">{pkg.idealFor}</p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                    {pkg.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent(
                    `[${pkg.name}] Sprint Inquiry (${pkg.price[currency]})`,
                  )}&body=${encodeURIComponent(
                    `Hi Arnav,\n\nI'm interested in the ${pkg.name} (${pkg.price[currency]} / ${pkg.turnaround}).\n\nBusiness / Project name:\nGoal / Link:\nPreferred timeline:\n`,
                  )}`}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    pkg.highlighted
                      ? 'bg-cyan-400 text-zinc-950 hover:bg-cyan-300'
                      : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  Start {pkg.name}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section id="process" className="border-t border-white/10 bg-zinc-950/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-300">How We Ship</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Zero guesswork from preview to production
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SPRINT_WORKFLOW.map((item) => (
                <div key={item.step} className="rounded-2xl border border-white/10 bg-[#06070b] p-5">
                  <span className="font-mono text-xs font-semibold text-cyan-300">STEP {item.step}</span>
                  <h3 className="mt-2 font-display text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:px-6">
          <p>
            {STUDIO_CONTACT.brand} · {STUDIO_CONTACT.builderName} · {STUDIO_CONTACT.location}
          </p>
          <div className="flex flex-wrap items-center gap-4 font-mono">
            <a href={`mailto:${STUDIO_CONTACT.email}`} className="hover:text-zinc-200">
              {STUDIO_CONTACT.email}
            </a>
            <a href={STUDIO_CONTACT.github} target="_blank" rel="noreferrer" className="hover:text-zinc-200">
              GitHub
            </a>
            <Link to="/pitch" className="text-zinc-600 hover:text-cyan-300">
              Outreach Console
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
