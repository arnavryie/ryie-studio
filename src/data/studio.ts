export type Currency = 'INR' | 'USD'

export interface ServicePackage {
  id: string
  name: string
  turnaround: string
  badge: string
  price: Record<Currency, string>
  idealFor: string
  deliverables: string[]
  highlighted?: boolean
}

export interface ProofProject {
  id: string
  title: string
  category: string
  stack: string[]
  summary: string
  url: string
}

export const STUDIO_CONTACT = {
  brand: 'RYIE Studio',
  builderName: 'Arnav Tagade',
  location: 'Pune, India · Remote Worldwide',
  email: 'officialarnav4@gmail.com',
  github: 'https://github.com/arnavryie',
  portfolio: 'https://ryie-hadaka.vercel.app',
} as const

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'launch-site',
    name: 'Launch Site Sprint',
    turnaround: '72 Hours',
    badge: 'FASTEST SHIP',
    price: {
      INR: '₹15,000',
      USD: '$390',
    },
    idealFor: 'Founders, clinics, local brands, and product launches needing credibility immediately.',
    deliverables: [
      'Custom React / Next.js responsive website (no generic templates)',
      'GSAP / motion micro-interactions tuned for 60fps mobile & desktop',
      'Lead capture / WhatsApp / Calendly booking integration',
      'SEO meta setup, domain connection, and Vercel deployment',
    ],
  },
  {
    id: 'ai-lead-desk',
    name: 'Site + AI Booking & Lead Desk',
    turnaround: '5 Days',
    badge: 'MOST POPULAR',
    highlighted: true,
    price: {
      INR: '₹22,000',
      USD: '$550',
    },
    idealFor: 'Service businesses & startups losing inquiries after hours or stuck replying manually.',
    deliverables: [
      'Everything in Launch Site Sprint',
      '24/7 AI Receptionist trained on your pricing, timings, and services',
      'Structured lead & appointment intake forwarded straight to email / sheet / WhatsApp',
      'FastAPI / Supabase backend hosted cleanly on serverless / Render',
    ],
  },
  {
    id: 'fullstack-mvp',
    name: 'Full-Stack & AI SaaS MVP',
    turnaround: '7–10 Days',
    badge: 'END-TO-END',
    price: {
      INR: '₹35,000',
      USD: '$750',
    },
    idealFor: 'Early-stage founders going from idea or Figma to a paying, live v1 product.',
    deliverables: [
      'Next.js / React 19 frontend + FastAPI or Node API architecture',
      'Auth, PostgreSQL / Supabase schema, and role-based dashboard',
      'LLM workflow (Groq / OpenAI / Gemini) with streaming & rate protection',
      'Razorpay or Stripe checkout integration + full source handover',
    ],
  },
]

export const PROOF_PROJECTS: ProofProject[] = [
  {
    id: 'clinic-site',
    title: 'Sanchi Physiotherapy Clinic',
    category: 'Healthcare Web Presence',
    stack: ['React', 'Responsive UI', 'Booking Flow'],
    summary: 'Clean, trust-first clinical website built for real patient discovery, treatment clarity, and direct inquiries.',
    url: 'https://clinic-sigma-eosin.vercel.app',
  },
  {
    id: 'oceanspice',
    title: 'Oceanspice Commerce',
    category: 'E-Commerce Storefront',
    stack: ['Full-Stack', 'REST API', 'Modern UI'],
    summary: 'Fresh seafood e-commerce web platform featuring categorized catalogs, cart workflows, and responsive product views.',
    url: 'https://licious-clone-ruby.vercel.app',
  },
  {
    id: 'agentearn',
    title: 'AgentEarn AI',
    category: 'Multi-Agent SaaS',
    stack: ['Next.js', 'Supabase', 'Groq', 'Razorpay'],
    summary: 'End-to-end SaaS application combining authentication, multi-agent LLM automation, and live payment integration.',
    url: 'https://agentearn-ai.vercel.app',
  },
  {
    id: 'medicare',
    title: 'MediCare AI',
    category: 'Health Assistant App',
    stack: ['AI Workflows', 'Frontend', 'Realtime'],
    summary: 'Smart health and medicine assistant built for structured symptom and medication guidance.',
    url: 'https://medicare-ai-lemon.vercel.app',
  },
  {
    id: 'lunar-statio',
    title: 'Lunar Statio',
    category: '3D Mission Planner (NASA Space Apps)',
    stack: ['Three.js', 'Python Pipeline', 'React'],
    summary: 'Interactive lunar south-pole visibility and terrain explorer validated against JPL Horizons ephemeris data.',
    url: 'https://lunar-statio.vercel.app',
  },
  {
    id: 'ryie-fx',
    title: 'RYIE FX Lab',
    category: 'Motion & WebGL Library',
    stack: ['GSAP', 'Canvas', 'GLSL Shaders'],
    summary: 'Collection of custom scroll, canvas particle, and WebGL visual effects used to make client launches stand out.',
    url: 'https://ryie-fx.vercel.app',
  },
]

export const SPRINT_WORKFLOW = [
  {
    step: '01',
    title: 'Free Live Preview First',
    detail: 'Before any invoice, you see an interactive tailored concept branded with your name, services, and layout.',
  },
  {
    step: '02',
    title: '50% Kickoff · Fixed Scope',
    detail: 'Clear deliverables and deadline locked in upfront. No surprise hourly billing or dragged-out timelines.',
  },
  {
    step: '03',
    title: 'Daily Live Staging Links',
    detail: 'Watch every milestone deploy on a real URL every 24 hours so feedback stays instant and concrete.',
  },
  {
    step: '04',
    title: '50% on Handover + Domain Live',
    detail: 'Full GitHub source code, domain DNS, analytics, and handover walkthrough once you approve the build.',
  },
]
