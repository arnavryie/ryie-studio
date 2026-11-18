import type { NicheId } from '../data/niches'
import type { Currency } from '../data/studio'
import { buildDemoUrl } from './demoParams'

export type OutreachChannel = 'whatsapp' | 'email' | 'x_dm' | 'reddit_upwork'

export interface PitchInput {
  niche: NicheId
  brand: string
  city: string
  contactName?: string
  painPoint?: string
  currency: Currency
  channel: OutreachChannel
  origin: string
}

export interface GeneratedPitch {
  demoUrl: string
  subject?: string
  body: string
  offerPrice: string
}

const OFFER_PRICE_BY_NICHE: Record<NicheId, Record<Currency, string>> = {
  clinic: { INR: '₹15,000–₹22,000', USD: '$390–$550' },
  fitness: { INR: '₹15,000–₹22,000', USD: '$390–$550' },
  cafe: { INR: '₹12,000–₹18,000', USD: '$350–$490' },
  saas: { INR: '₹25,000–₹35,000', USD: '$450–$750' },
}

const DEFAULT_PAIN_BY_NICHE: Record<NicheId, string> = {
  clinic: 'easy mobile slot booking and instant fee/timing answers',
  fitness: 'turning map & Instagram visitors into booked trial passes',
  cafe: 'direct table reservations and menu browsing without aggregator fees',
  saas: 'a higher-converting launch site with an interactive product demo',
}

/**
 * Generates a concise, non-spammy outreach message tailored around a live prospect demo URL.
 */
export function buildOutreachPitch(input: PitchInput): GeneratedPitch {
  const brand = input.brand.trim() || 'your team'
  const city = input.city.trim()
  const greetingName = input.contactName?.trim()
  const greeting = greetingName ? `Hi ${greetingName}` : `Hi ${brand} team`
  const pain = input.painPoint?.trim() || DEFAULT_PAIN_BY_NICHE[input.niche]
  const offerPrice = OFFER_PRICE_BY_NICHE[input.niche][input.currency]

  const demoUrl = buildDemoUrl(input.origin, {
    niche: input.niche,
    brand,
    city,
  })

  switch (input.channel) {
    case 'whatsapp':
      return {
        demoUrl,
        offerPrice,
        body: [
          `${greeting} — I'm Arnav, a web & AI developer in Pune.`,
          `I noticed ${brand} could capture more inquiries with ${pain}, so I built a quick working preview for you to click through:`,
          demoUrl,
          '',
          `It already includes mobile booking and an interactive AI assistant preview. If you like it, I can customize it with your real photos, timings, and domain in 3–5 days for ${offerPrice} (50% only after you approve the preview).`,
          'Want me to tailor it for your setup?',
        ].join('\n'),
      }

    case 'email':
      return {
        demoUrl,
        offerPrice,
        subject: `Built a live preview for ${brand}`,
        body: [
          `${greeting},`,
          '',
          `I put together a quick interactive web + AI inquiry preview specifically for ${brand}${city ? ` (${city})` : ''} focused on ${pain}:`,
          demoUrl,
          '',
          `No pitch deck — you can test the booking flow and assistant right on that link. For reference, I've also shipped real healthcare, e-commerce, and AI SaaS builds (links on my studio page).`,
          '',
          `If this direction fits, I can ship the production version on your domain in 3–5 days for a flat ${offerPrice}. Happy to hop on a 10-minute call if helpful.`,
          '',
          '— Arnav Tagade',
          'Full-Stack & AI Builder · officialarnav4@gmail.com',
        ].join('\n'),
      }

    case 'x_dm':
      return {
        demoUrl,
        offerPrice,
        body: [
          `Hey${greetingName ? ` ${greetingName}` : ''} — saw what you're building with ${brand}.`,
          `Mocked up a quick live interactive demo page for ${pain}: ${demoUrl}`,
          `I ship Next.js/React + FastAPI + AI builds in 3–7 days (flat ${offerPrice}). If you want help getting your v1 or launch page shipped fast this week, let me know!`,
        ].join('\n\n'),
      }

    case 'reddit_upwork':
      return {
        demoUrl,
        offerPrice,
        subject: `Can ship ${brand} in 3–7 days (live interactive demo attached)`,
        body: [
          `${greeting},`,
          '',
          `I'm a full-stack & AI engineer (Next.js / React, FastAPI, Supabase/Postgres, LLM integrations). Instead of sending a generic resume, here's a live interactive concept built around ${pain}:`,
          demoUrl,
          '',
          'Recent live production work:',
          '- Multi-agent SaaS with Auth + Razorpay: https://agentearn-ai.vercel.app',
          '- 3D Geospatial Mission Planner (NASA Space Apps): https://lunar-statio.vercel.app',
          '- Custom Clinic Web App: https://clinic-sigma-eosin.vercel.app',
          '',
          `Scope like this ships in 3–7 days at a fixed ${offerPrice} with daily staging links. Let me know your exact requirements and I can start today.`,
        ].join('\n'),
      }
  }
}
