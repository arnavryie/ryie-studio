import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Check, Copy, ExternalLink, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NICHE_IDS, NICHE_TEMPLATES, type NicheId } from '../data/niches'
import type { Currency } from '../data/studio'
import { buildOutreachPitch, type OutreachChannel } from '../lib/pitchBuilder'

type LeadStage = 'Lead' | 'Demo Sent' | 'Replied' | 'Deposit 50%' | 'Paid'

interface PipelineItem {
  id: string
  brand: string
  city: string
  niche: NicheId
  valueInr: number
  stage: LeadStage
  demoUrl: string
  createdAt: string
}

const STORAGE_KEY = 'ryie_studio_pipeline_v1'
const GOAL_INR = 80000

const STAGES: LeadStage[] = ['Lead', 'Demo Sent', 'Replied', 'Deposit 50%', 'Paid']

const QUICK_PRESETS: {
  label: string
  niche: NicheId
  brand: string
  city: string
  painPoint: string
  currency: Currency
  channel: OutreachChannel
}[] = [
  {
    label: 'Pune Dental Clinic',
    niche: 'clinic',
    brand: 'SmileCraft Dental Studio',
    city: 'Baner, Pune',
    painPoint: 'mobile slot booking and automated fee/timing answers',
    currency: 'INR',
    channel: 'whatsapp',
  },
  {
    label: 'Pune Gym / Fitness',
    niche: 'fitness',
    brand: 'PulseFit Training Club',
    city: 'Kothrud, Pune',
    painPoint: 'converting Google Maps visitors into trial pass bookings',
    currency: 'INR',
    channel: 'whatsapp',
  },
  {
    label: 'Global AI SaaS Founder',
    niche: 'saas',
    brand: 'PulseDesk AI',
    city: 'Remote SaaS',
    painPoint: 'a conversion-focused launch site with a live interactive agent preview',
    currency: 'USD',
    channel: 'x_dm',
  },
  {
    label: 'Boutique Dev Agency',
    niche: 'saas',
    brand: 'Northstar Digital Studio',
    city: 'Austin / London',
    painPoint: 'Next.js, FastAPI, and AI chatbot client overflow',
    currency: 'USD',
    channel: 'agency_whitelabel',
  },
  {
    label: 'AI SaaS UGC Deal',
    niche: 'saas',
    brand: 'CodePilot Labs',
    city: 'Remote',
    painPoint: '45s launch demo hooks for X & Reels',
    currency: 'USD',
    channel: 'saas_ugc',
  },
]

function loadPipeline(): PipelineItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function PitchPage() {
  const [niche, setNiche] = useState<NicheId>('clinic')
  const [brand, setBrand] = useState('SmileCraft Dental Studio')
  const [city, setCity] = useState('Baner, Pune')
  const [contactName, setContactName] = useState('')
  const [painPoint, setPainPoint] = useState('')
  const [currency, setCurrency] = useState<Currency>('INR')
  const [channel, setChannel] = useState<OutreachChannel>('whatsapp')
  const [dealValueInr, setDealValueInr] = useState(18000)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [pipeline, setPipeline] = useState<PipelineItem[]>(() => loadPipeline())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pipeline))
    } catch {
      // Ignore storage quota errors in restricted browser contexts.
    }
  }, [pipeline])

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ryie-studio.vercel.app'

  const pitch = useMemo(
    () =>
      buildOutreachPitch({
        niche,
        brand,
        city,
        contactName,
        painPoint,
        currency,
        channel,
        origin,
      }),
    [niche, brand, city, contactName, painPoint, currency, channel, origin],
  )

  const earnedInr = pipeline.reduce((sum, item) => {
    if (item.stage === 'Paid') return sum + item.valueInr
    if (item.stage === 'Deposit 50%') return sum + Math.round(item.valueInr * 0.5)
    return sum
  }, 0)

  const activePipelineInr = pipeline.reduce(
    (sum, item) => (item.stage === 'Paid' ? sum : sum + item.valueInr),
    0,
  )

  const progressPct = Math.min(100, Math.round((earnedInr / GOAL_INR) * 100))

  async function copyText(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 1600)
    } catch {
      // Clipboard API unavailable in headless or restricted context.
    }
  }

  function addProspectToPipeline() {
    if (!brand.trim()) return
    const nextItem: PipelineItem = {
      id: `${Date.now()}`,
      brand: brand.trim(),
      city: city.trim() || 'Remote',
      niche,
      valueInr: Math.max(1000, Number(dealValueInr) || 15000),
      stage: 'Demo Sent',
      demoUrl: pitch.demoUrl,
      createdAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
    }
    setPipeline((prev) => [nextItem, ...prev])
  }

  function updateStage(id: string, stage: LeadStage) {
    setPipeline((prev) => prev.map((item) => (item.id === id ? { ...item, stage } : item)))
  }

  function removeItem(id: string) {
    setPipeline((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#06070b] text-zinc-100">
      <header className="border-b border-white/10 bg-zinc-950/90 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" />
              Studio Home
            </Link>
            <span className="text-zinc-600">/</span>
            <h1 className="font-display text-base font-bold text-white">Demo-First Pitch &amp; Pipeline Console</h1>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="rounded-lg border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-cyan-300">
              Earned: ₹{earnedInr.toLocaleString('en-IN')} / ₹{GOAL_INR.toLocaleString('en-IN')} ({progressPct}%)
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        {/* Progress bar */}
        <section className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-mono uppercase tracking-wider text-zinc-400">Target Progress (₹80,000 Goal)</span>
            <span className="font-mono text-zinc-300">
              Active Pipeline: ₹{activePipelineInr.toLocaleString('en-IN')} · Prospects Logged: {pipeline.length}
            </span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-zinc-900">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </section>

        {/* Generator */}
        <section className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 rounded-2xl border border-white/10 bg-zinc-950/80 p-5 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-lg font-semibold text-white">1. Configure Prospect</h2>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setNiche(preset.niche)
                      setBrand(preset.brand)
                      setCity(preset.city)
                      setPainPoint(preset.painPoint)
                      setCurrency(preset.currency)
                      setChannel(preset.channel)
                      setDealValueInr(preset.currency === 'USD' ? 35000 : 18000)
                    }}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-zinc-300 hover:border-cyan-400/40 hover:text-cyan-200"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[11px] text-zinc-400">Niche Template</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value as NicheId)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none"
                >
                  {NICHE_IDS.map((id) => (
                    <option key={id} value={id}>
                      {NICHE_TEMPLATES[id].label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-zinc-400">Pricing Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-zinc-400">Prospect Business / Startup Name</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[11px] text-zinc-400">City / Region</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-zinc-400">Contact First Name (Optional)</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Dr. Mehta / Alex"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-zinc-400">Specific Gap / Offer Focus</label>
              <input
                type="text"
                value={painPoint}
                onChange={(e) => setPainPoint(e.target.value)}
                placeholder="e.g. missing mobile booking & WhatsApp triage"
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[11px] text-zinc-400">Channel</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as OutreachChannel)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none"
                >
                  <option value="whatsapp">WhatsApp (Local India)</option>
                  <option value="email">Cold Email</option>
                  <option value="x_dm">X / Twitter DM</option>
                  <option value="reddit_upwork">Reddit / Contra</option>
                  <option value="agency_whitelabel">Agency White-Label (LinkedIn/Email)</option>
                  <option value="saas_ugc">SaaS / AI Product UGC Pitch</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-zinc-400">Est. Value (₹)</label>
                <input
                  type="number"
                  min={1000}
                  step={1000}
                  value={dealValueInr}
                  onChange={(e) => setDealValueInr(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-zinc-950/80 p-5 lg:col-span-7">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-lg font-semibold text-white">2. Ready-to-Send Demo &amp; Pitch</h2>
                <span className="font-mono text-xs text-cyan-300">Target Quote: {pitch.offerPrice}</span>
              </div>

              <div className="rounded-xl border border-cyan-400/25 bg-black/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-zinc-400">LIVE CUSTOM DEMO URL</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyText('url', pitch.demoUrl)}
                      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-200 hover:bg-white/10"
                    >
                      {copiedKey === 'url' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      {copiedKey === 'url' ? 'Copied' : 'Copy URL'}
                    </button>
                    <a
                      href={pitch.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-cyan-400 px-2.5 py-1 font-mono text-[11px] font-semibold text-zinc-950 hover:bg-cyan-300"
                    >
                      Open
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <p className="mt-1.5 break-all font-mono text-xs text-cyan-200">{pitch.demoUrl}</p>
              </div>

              {pitch.subject && (
                <div className="rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5">
                  <span className="font-mono text-[10px] text-zinc-500">SUBJECT</span>
                  <p className="mt-0.5 text-sm font-medium text-white">{pitch.subject}</p>
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-black/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-zinc-400">MESSAGE COPY</span>
                  <button
                    type="button"
                    onClick={() => copyText('body', pitch.body)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-200 hover:bg-white/10"
                  >
                    {copiedKey === 'body' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    {copiedKey === 'body' ? 'Copied Message' : 'Copy Pitch'}
                  </button>
                </div>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-200">
                  {pitch.body}
                </pre>
              </div>
            </div>

            <button
              type="button"
              onClick={addProspectToPipeline}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-300"
            >
              <Plus className="h-4 w-4" />
              Save Prospect to Pipeline Tracker
            </button>
          </div>
        </section>

        {/* Pipeline table */}
        <section className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5">
          <h2 className="font-display text-lg font-semibold text-white">3. Outreach Pipeline (Local Browser Storage)</h2>
          {pipeline.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-400">
              No prospects logged yet. Generate a custom demo URL above, send the pitch, and click &ldquo;Save Prospect
              to Pipeline Tracker&rdquo; to track progress toward ₹80,000.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 font-mono text-xs text-zinc-400">
                  <tr>
                    <th className="py-2 pr-4">Prospect</th>
                    <th className="py-2 pr-4">Niche</th>
                    <th className="py-2 pr-4">Est. Value</th>
                    <th className="py-2 pr-4">Stage</th>
                    <th className="py-2 pr-4">Demo</th>
                    <th className="py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pipeline.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 pr-4">
                        <div className="font-medium text-white">{item.brand}</div>
                        <div className="text-xs text-zinc-500">
                          {item.city} · {item.createdAt}
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-zinc-300">{item.niche}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-cyan-300">
                        ₹{item.valueInr.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 pr-4">
                        <select
                          value={item.stage}
                          onChange={(e) => updateStage(item.id, e.target.value as LeadStage)}
                          className="rounded-lg border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-xs text-white outline-none"
                        >
                          {STAGES.map((stage) => (
                            <option key={stage} value={stage}>
                              {stage}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 pr-4">
                        <a
                          href={item.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-cyan-300 hover:underline"
                        >
                          Preview
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.brand}`}
                          className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-rose-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
