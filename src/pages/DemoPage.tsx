import { useState, type FormEvent } from 'react'
import { ArrowLeft, CalendarCheck, CheckCircle2, MapPin, Sparkles } from 'lucide-react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { AiReceptionistWidget } from '../components/AiReceptionistWidget'
import { ACCENT_THEMES, NICHE_IDS, NICHE_TEMPLATES } from '../data/niches'
import { STUDIO_CONTACT } from '../data/studio'
import { parseDemoConfig } from '../lib/demoParams'

export function DemoPage() {
  const { niche: rawNiche } = useParams()
  const [searchParams] = useSearchParams()
  const config = parseDemoConfig(rawNiche, searchParams)
  const template = NICHE_TEMPLATES[config.niche]
  const theme = ACCENT_THEMES[config.accent]

  const [customerName, setCustomerName] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [selectedOption, setSelectedOption] = useState(template.bookingOptions[0])
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null)

  function handleBookingSubmit(e: FormEvent) {
    e.preventDefault()
    if (!customerName.trim() || !contactInfo.trim()) return
    setSubmittedSummary(
      `Preview confirmed for ${customerName.trim()} (${selectedOption}) — in production, this routes directly to ${config.brand}'s WhatsApp & email (${contactInfo.trim()}).`,
    )
  }

  return (
    <div className="min-h-screen bg-[#06070b] text-zinc-100">
      {/* Studio Preview Top Banner */}
      <div className="border-b border-white/10 bg-zinc-950/95 px-4 py-2.5 text-xs">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-1 font-mono text-zinc-400 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" />
              RYIE Studio
            </Link>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-300">
              Interactive Preview branded for <strong className="text-white">{config.brand}</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {NICHE_IDS.map((id) => (
              <Link
                key={id}
                to={`/demo/${id}`}
                className={`rounded-md px-2 py-1 font-mono text-[11px] transition ${
                  id === config.niche
                    ? 'bg-white/15 text-white'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                }`}
              >
                {id}
              </Link>
            ))}
            <a
              href={`mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent(
                `Launch This Build for ${config.brand}`,
              )}`}
              className={`rounded-md px-2.5 py-1 font-semibold transition ${theme.button}`}
            >
              Launch This For Your Brand
            </a>
          </div>
        </div>
      </div>

      {/* Prospect Branded Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-grid-subtle">
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b ${theme.glow}`} />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs ${theme.badge}`}>
              <Sparkles className="h-3.5 w-3.5" />
              {template.eyebrow}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300">
              <MapPin className="h-3.5 w-3.5" />
              {config.city}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {config.brand}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">{config.tagline}</p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2 text-sm">
            <span className={`font-mono text-xs uppercase ${theme.text}`}>Featured Offer:</span>
            <span className="font-medium text-white">{config.offer}</span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#interactive-desk"
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${theme.button}`}
            >
              {template.ctaPrimary}
            </a>
            <a
              href="#interactive-desk"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-100 hover:bg-white/10"
            >
              {template.ctaSecondary}
            </a>
          </div>

          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-zinc-400">{template.heroSummary}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {template.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4">
                <div className="font-mono text-xs text-zinc-400">{metric.label}</div>
                <div className={`mt-1 font-display text-xl font-bold ${theme.text}`}>{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Capabilities */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-white">{template.servicesHeading}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {template.services.map((service) => (
            <div key={service.title} className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5">
              <span className={`font-mono text-[11px] ${theme.text}`}>{service.meta}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Booking + AI Receptionist */}
      <section id="interactive-desk" className="border-t border-white/10 bg-zinc-950/50 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <form
            onSubmit={handleBookingSubmit}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#06070b] p-6"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <CalendarCheck className={`h-5 w-5 ${theme.text}`} />
                <h2 className="font-display text-xl font-bold text-white">{template.bookingTitle}</h2>
              </div>
              <p className="mt-2 text-sm text-zinc-400">{template.bookingSubtitle}</p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block font-mono text-xs text-zinc-400">Your Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rohan Sharma"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400">Phone / WhatsApp / Email</label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="e.g. +91 98xxx xxxxx or email"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400">Select Option</label>
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white/30"
                  >
                    {template.bookingOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${theme.button}`}
              >
                {template.ctaPrimary} (Demo Action)
              </button>

              {submittedSummary && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-xs leading-relaxed text-emerald-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{submittedSummary}</span>
                </div>
              )}
            </div>
          </form>

          <AiReceptionistWidget
            brand={config.brand}
            city={config.city}
            offer={config.offer}
            roleTitle={template.assistantRole}
            greeting={template.assistantGreeting}
            faqs={template.faqs}
            accent={config.accent}
          />
        </div>
      </section>
    </div>
  )
}
