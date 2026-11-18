export type NicheId = 'clinic' | 'fitness' | 'cafe' | 'saas'
export type AccentId = 'cyan' | 'emerald' | 'amber' | 'violet'

export interface NicheService {
  title: string
  meta: string
  description: string
}

export interface NicheFaq {
  keywords: string[]
  question: string
  answer: string
}

export interface NicheTemplate {
  id: NicheId
  label: string
  defaultBrand: string
  defaultCity: string
  defaultTagline: string
  defaultOffer: string
  defaultAccent: AccentId
  eyebrow: string
  heroSummary: string
  ctaPrimary: string
  ctaSecondary: string
  metrics: { label: string; value: string }[]
  servicesHeading: string
  services: NicheService[]
  bookingTitle: string
  bookingSubtitle: string
  bookingOptions: string[]
  assistantRole: string
  assistantGreeting: string
  faqs: NicheFaq[]
}

export const ACCENT_THEMES: Record<
  AccentId,
  {
    name: string
    badge: string
    button: string
    border: string
    glow: string
    text: string
  }
> = {
  cyan: {
    name: 'Cyan',
    badge: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
    button: 'bg-cyan-400 text-zinc-950 hover:bg-cyan-300',
    border: 'border-cyan-400/30',
    glow: 'from-cyan-500/20 via-transparent to-transparent',
    text: 'text-cyan-300',
  },
  emerald: {
    name: 'Emerald',
    badge: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    button: 'bg-emerald-400 text-zinc-950 hover:bg-emerald-300',
    border: 'border-emerald-400/30',
    glow: 'from-emerald-500/20 via-transparent to-transparent',
    text: 'text-emerald-300',
  },
  amber: {
    name: 'Amber',
    badge: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    button: 'bg-amber-400 text-zinc-950 hover:bg-amber-300',
    border: 'border-amber-400/30',
    glow: 'from-amber-500/20 via-transparent to-transparent',
    text: 'text-amber-300',
  },
  violet: {
    name: 'Violet',
    badge: 'border-violet-400/30 bg-violet-400/10 text-violet-300',
    button: 'bg-violet-400 text-zinc-950 hover:bg-violet-300',
    border: 'border-violet-400/30',
    glow: 'from-violet-500/20 via-transparent to-transparent',
    text: 'text-violet-300',
  },
}

export const NICHE_TEMPLATES: Record<NicheId, NicheTemplate> = {
  clinic: {
    id: 'clinic',
    label: 'Clinic / Healthcare',
    defaultBrand: 'Apex Dental & Care Studio',
    defaultCity: 'Baner, Pune',
    defaultTagline: 'Same-day consultations, transparent treatment plans, and 24/7 digital slot booking.',
    defaultOffer: 'Free Digital Consultation Assessment',
    defaultAccent: 'emerald',
    eyebrow: 'Healthcare Experience Demo',
    heroSummary:
      'Patients search on mobile first. This experience pairs clear doctor credentials with an AI front desk that answers fee questions and captures appointments automatically.',
    ctaPrimary: 'Book Appointment Slot',
    ctaSecondary: 'Ask AI Front Desk',
    metrics: [
      { label: 'Booking Flow', value: 'Under 30s' },
      { label: 'Front Desk Coverage', value: '24/7 Instant' },
      { label: 'Mobile Speed', value: 'Sub-1s Load' },
    ],
    servicesHeading: 'Treatments & Care Programs',
    services: [
      {
        title: 'Comprehensive Checkup & Diagnostics',
        meta: '30 min · Same-day slots',
        description: 'Clear visual breakdown of care steps and upfront pricing so first-time patients book with zero hesitation.',
      },
      {
        title: 'Specialized Procedures & Recovery',
        meta: 'Custom Care Plan',
        description: 'Dedicated procedure explanations, post-visit checklists, and automated follow-up reminders.',
      },
      {
        title: 'Preventive & Family Care',
        meta: 'Weekend Slots Open',
        description: 'Multi-member scheduling and recurring hygiene/checkup reminders sent directly on WhatsApp.',
      },
    ],
    bookingTitle: 'Reserve Your Consultation',
    bookingSubtitle: 'Pick a preferred slot and our care coordinator confirms within minutes.',
    bookingOptions: ['First-Time Consultation', 'Follow-Up Review', 'Urgent Pain / Same-Day Slot', 'Family Checkup'],
    assistantRole: 'AI Clinic Front Desk',
    assistantGreeting: 'Hi! Ask me about clinic timings, consultation fees, location, or available slots.',
    faqs: [
      {
        keywords: ['time', 'timing', 'open', 'hours', 'sunday', 'weekend'],
        question: 'What are the clinic timings?',
        answer: 'Typical demo schedule: Mon–Sat 10:00 AM – 8:30 PM, Sun 10:30 AM – 2:00 PM. Your exact real hours are configured on launch.',
      },
      {
        keywords: ['fee', 'price', 'cost', 'charge', 'consult'],
        question: 'What is the consultation fee?',
        answer: 'Upfront consultation fee & treatment ranges are displayed cleanly here—helping qualify patients before they call.',
      },
      {
        keywords: ['book', 'slot', 'appointment', 'visit'],
        question: 'How do I book an appointment?',
        answer: 'Use the instant slot form right beside this chat—it sends confirmed patient details directly to the clinic WhatsApp/dashboard.',
      },
    ],
  },
  fitness: {
    id: 'fitness',
    label: 'Gym / Fitness Studio',
    defaultBrand: 'IronPulse Performance Club',
    defaultCity: 'Kothrud, Pune',
    defaultTagline: 'Strength, conditioning, and guided coaching — claim your trial session in 20 seconds.',
    defaultOffer: '3-Day All-Access Trial Pass',
    defaultAccent: 'amber',
    eyebrow: 'Fitness & Coaching Demo',
    heroSummary:
      'Turn Instagram and Google Maps visitors into booked trial walk-ins with interactive program cards, transparent memberships, and an automated AI fitness concierge.',
    ctaPrimary: 'Claim Trial Pass',
    ctaSecondary: 'Ask AI Coach Desk',
    metrics: [
      { label: 'Trial Conversion', value: '1-Tap Form' },
      { label: 'Coach Inquiry Reply', value: 'Instant 24/7' },
      { label: 'Plan Clarity', value: 'Mobile-First' },
    ],
    servicesHeading: 'Training Tracks & Memberships',
    services: [
      {
        title: 'Strength & Hypertrophy Floor',
        meta: '6:00 AM – 10:30 PM',
        description: 'Structured programming with certified floor trainers and progress tracking.',
      },
      {
        title: '1-on-1 Transformation Coaching',
        meta: 'Custom Nutrition + Training',
        description: 'Dedicated accountability, macro targets, and weekly body-composition check-ins.',
      },
      {
        title: 'Small-Group Conditioning Batches',
        meta: 'Morning & Evening Batches',
        description: 'High-energy 45-minute functional sessions capped at 12 members per batch.',
      },
    ],
    bookingTitle: 'Book Your Trial Session',
    bookingSubtitle: 'Lock in a preferred batch time and tour the training floor.',
    bookingOptions: ['3-Day Trial Pass', '1-on-1 Coaching Assessment', 'Group Conditioning Batch', 'Annual Membership Inquiry'],
    assistantRole: 'AI Gym Concierge',
    assistantGreeting: 'Welcome! Ask about membership plans, batch timings, personal training, or trial passes.',
    faqs: [
      {
        keywords: ['fee', 'price', 'membership', 'cost', 'plan'],
        question: 'What are the membership plans?',
        answer: 'We can display monthly, quarterly, and annual tiers clearly or gate exact pricing behind a trial-pass lead capture.',
      },
      {
        keywords: ['time', 'batch', 'morning', 'evening', 'hours'],
        question: 'When are group batches held?',
        answer: 'Morning batches (6 AM / 7 AM / 8 AM) and evening batches (6 PM / 7 PM / 8 PM) are highlighted for instant sign-up.',
      },
      {
        keywords: ['trial', 'demo', 'visit', 'pass'],
        question: 'Can I book a trial pass?',
        answer: 'Yes — submit your name and preferred goal in the trial pass box and your pass details go straight to the front desk.',
      },
    ],
  },
  cafe: {
    id: 'cafe',
    label: 'Cafe / Restaurant',
    defaultBrand: 'Kanso Roasters & Kitchen',
    defaultCity: 'Koregaon Park, Pune',
    defaultTagline: 'Specialty pour-overs, artisanal plates, and instant table or takeaway booking.',
    defaultOffer: '15% Off Direct Table Reservations',
    defaultAccent: 'cyan',
    eyebrow: 'Hospitality & Dining Demo',
    heroSummary:
      'Skip third-party aggregator commissions on repeat regulars. Showcase signature dishes cleanly and take direct table bookings or takeaway orders straight to WhatsApp.',
    ctaPrimary: 'Reserve a Table',
    ctaSecondary: 'Ask Menu Concierge',
    metrics: [
      { label: 'Direct Orders', value: '0% Commission' },
      { label: 'Menu Experience', value: 'Visual & Fast' },
      { label: 'Table Booking', value: 'Instant Confirm' },
    ],
    servicesHeading: 'Signature Menu Highlights',
    services: [
      {
        title: 'Single-Origin Pour Overs & Cold Brews',
        meta: 'House Roasted Daily',
        description: 'Tasting notes, milk alternatives, and seasonal brews presented with clean visual cards.',
      },
      {
        title: 'All-Day Artisanal Plates',
        meta: 'Fresh Prep · Dine-In & Takeaway',
        description: 'Dietary tags (Veg, Vegan, High-Protein) and chef specials updated easily without PDF menus.',
      },
      {
        title: 'Weekend Brunch & Group Tables',
        meta: 'Pre-Book Recommended',
        description: 'Smooth group reservation requests for birthdays, remote-work tables, and weekend meetups.',
      },
    ],
    bookingTitle: 'Reserve Table or Pre-Order',
    bookingSubtitle: 'Hold a spot or schedule a pickup in seconds—zero aggregator fees.',
    bookingOptions: ['Table for 2', 'Group Table (4–8 Guests)', 'Takeaway Pre-Order', 'Private Event / Catering'],
    assistantRole: 'AI Menu & Booking Host',
    assistantGreeting: 'Hey! Ask me about vegetarian/vegan options, Wi-Fi/work seating, timings, or table bookings.',
    faqs: [
      {
        keywords: ['veg', 'vegan', 'gluten', 'menu', 'food', 'coffee'],
        question: 'Do you have veg / vegan options?',
        answer: 'Every menu item can carry instant filter tags (Veg, Vegan, Dairy-Free, Chef Special) so guests find dishes fast.',
      },
      {
        keywords: ['wifi', 'work', 'laptop', 'plug', 'seating'],
        question: 'Is it laptop / remote-work friendly?',
        answer: 'Yes — dedicated indoor seating info, power outlets, and peak-hour etiquette can be surfaced cleanly right here.',
      },
      {
        keywords: ['table', 'book', 'reserve', 'group'],
        question: 'How do I book a table?',
        answer: 'Pick your party size in the reservation panel and it sends a structured request directly to the floor manager.',
      },
    ],
  },
  saas: {
    id: 'saas',
    label: 'Startup / AI SaaS',
    defaultBrand: 'SignalForge AI',
    defaultCity: 'Global Remote SaaS',
    defaultTagline: 'Turn raw support tickets and product docs into automated customer resolution in minutes.',
    defaultOffer: '14-Day Interactive Pilot Demo',
    defaultAccent: 'violet',
    eyebrow: 'B2B AI SaaS Launch Demo',
    heroSummary:
      'Built to convert cold traffic from Product Hunt, X, and LinkedIn into qualified demos. Combines sharp positioning, interactive product proof, and instant onboarding capture.',
    ctaPrimary: 'Request Pilot Access',
    ctaSecondary: 'Test Live AI Agent',
    metrics: [
      { label: 'Time to Value', value: '< 5 Min Setup' },
      { label: 'API Latency', value: 'Streaming UI' },
      { label: 'Stack Ready', value: 'Next.js + FastAPI' },
    ],
    servicesHeading: 'Core Product Capabilities',
    services: [
      {
        title: 'Multi-Source Knowledge Sync',
        meta: 'Docs · Notion · GitHub · URLs',
        description: 'Automatic chunking, citation links, and zero-hallucination retrieval guardrails.',
      },
      {
        title: 'Workflow Actions & Webhooks',
        meta: 'REST · Slack · CRM',
        description: 'Go beyond Q&A—create tickets, qualify leads, and trigger internal API calls safely.',
      },
      {
        title: 'Usage Metering & Billing Ready',
        meta: 'Stripe · Razorpay · Role Auth',
        description: 'Production multi-tenant Postgres schema with API keys, quotas, and team permissions.',
      },
    ],
    bookingTitle: 'Book a Custom Pilot Walkthrough',
    bookingSubtitle: 'Drop your stack and use case — get a tailored sandbox in 24 hours.',
    bookingOptions: ['14-Day Guided Pilot', 'Custom Integration Scope', 'Architecture Review', 'Enterprise Sandbox'],
    assistantRole: 'AI Product Specialist',
    assistantGreeting: 'Ask about integrations, API latency, deployment security, or pilot pricing.',
    faqs: [
      {
        keywords: ['price', 'cost', 'plan', 'tier', 'billing'],
        question: 'How does pricing scale?',
        answer: 'Starter plans cover up to 5,000 monthly agent runs; Pro unlocks custom webhooks, SSO, and dedicated deployment.',
      },
      {
        keywords: ['api', 'stack', 'integrate', 'webhook', 'slack'],
        question: 'What integrations are supported?',
        answer: 'Ships with clean REST/webhook endpoints plus native hooks for Slack, Linear, Notion, and Postgres.',
      },
      {
        keywords: ['security', 'data', 'privacy', 'soc', 'host'],
        question: 'Where is customer data stored?',
        answer: 'Tenant-isolated PostgreSQL with encrypted credentials and optional self-hosted/VPC deployment.',
      },
    ],
  },
}

export const NICHE_IDS: NicheId[] = ['clinic', 'fitness', 'cafe', 'saas']
