#!/usr/bin/env node
/**
 * Generate a personalized Demo-First URL and outreach pitch from CLI flags.
 *
 * Usage:
 *   node scripts/generate_pitch.mjs --brand "Apex Dental" --city "Baner, Pune" --niche clinic --channel whatsapp
 */

const DEFAULTS = {
  origin: 'https://ryie-studio.vercel.app',
  niche: 'clinic',
  brand: 'Apex Dental Studio',
  city: 'Pune',
  channel: 'whatsapp',
  currency: 'INR',
  pain: '',
}

function parseArgs(argv) {
  const args = { ...DEFAULTS }
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i]
    const next = argv[i + 1]
    if (!key.startsWith('--') || next === undefined) continue
    const name = key.slice(2)
    if (name in args) {
      args[name] = next
      i += 1
    }
  }
  return args
}

const VALID_NICHES = new Set(['clinic', 'fitness', 'cafe', 'saas'])
const PRICES = {
  clinic: { INR: '₹15,000–₹22,000', USD: '$390–$550' },
  fitness: { INR: '₹15,000–₹22,000', USD: '$390–$550' },
  cafe: { INR: '₹12,000–₹18,000', USD: '$350–$490' },
  saas: { INR: '₹25,000–₹35,000', USD: '$450–$750' },
}

const opts = parseArgs(process.argv.slice(2))
const niche = VALID_NICHES.has(opts.niche) ? opts.niche : 'clinic'
const currency = opts.currency.toUpperCase() === 'USD' ? 'USD' : 'INR'

const params = new URLSearchParams({
  brand: opts.brand,
  city: opts.city,
})
const demoUrl = `${opts.origin.replace(/\/+$/, '')}/demo/${niche}?${params.toString()}`
const price = PRICES[niche][currency]
const pain = opts.pain || 'capturing mobile bookings and automating instant customer replies'

console.log(`DEMO URL:\n${demoUrl}\n`)
console.log(`CHANNEL (${opts.channel}) · QUOTE (${price}):`)
console.log(
  [
    `Hi ${opts.brand} team — I'm Arnav, a full-stack & AI developer.`,
    `I put together a working live preview for ${opts.brand} (${opts.city}) focused on ${pain}:`,
    demoUrl,
    `If you like the direction, I can ship it live on your domain in 3–5 days for ${price} (50% after preview approval).`,
  ].join('\n\n'),
)
