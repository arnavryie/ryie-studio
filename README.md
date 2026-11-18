# RYIE Studio — Client Sprints & Demo-First Outreach Engine

Full-stack web, AI lead desk, and MVP sprint storefront paired with an instant **Demo-First Prospect Preview Engine** (`/demo/:niche`) and a private outreach + revenue tracker console (`/pitch`).

## Routes

- `/` — Client-facing Studio page (INR/USD toggle, verified live deployments, fixed-scope sprint tiers, workflow)
- `/demo/:niche` — Live interactive industry previews (`clinic`, `fitness`, `cafe`, `saas`) customizable via URL query parameters (`?brand=...&city=...&offer=...&tagline=...&accent=...`)
- `/pitch` — Outreach copy generator (WhatsApp, Cold Email, X DM, Reddit/Upwork) + local pipeline tracker toward ₹80,000

## Local Development & Verification

```bash
bun install
bun run dev
bun run test
bun run build
```

## CLI Pitch Generator

```bash
node scripts/generate_pitch.mjs --brand "Apex Dental" --city "Baner, Pune" --niche clinic --currency INR
```

## Execution Docs

- [30-Day Execution Playbook](docs/30_DAY_EXECUTION_PLAYBOOK.md)
- [India 2026 Verified Options Research](docs/INDIA_OPTIONS_RESEARCH.md)
- [Day 1 Action Channels](docs/DAY1_TARGET_CHANNELS.md)
- [Outreach Templates](docs/OUTREACH_TEMPLATES.md)
- [Client Scope Confirmation One-Pager](docs/CLIENT_AGREEMENT_TEMPLATE.md)
- [Payout & Zero-Cost Hosting Checklist](docs/PAYOUT_AND_ONBOARDING_CHECKLIST.md)
- [SPPU Original Revision Pack Launch Guide](docs/SPPU_STUDY_PACK_LAUNCH.md)
