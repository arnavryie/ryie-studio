import { describe, expect, it } from 'vitest'
import { buildOutreachPitch } from './pitchBuilder'

describe('buildOutreachPitch', () => {
  it('builds a WhatsApp pitch containing the custom demo URL and INR quote', () => {
    const pitch = buildOutreachPitch({
      niche: 'clinic',
      brand: 'SmileCare Dental',
      city: 'Wakad, Pune',
      contactName: 'Dr. Kulkarni',
      currency: 'INR',
      channel: 'whatsapp',
      origin: 'https://ryie-studio.vercel.app',
    })

    expect(pitch.demoUrl).toContain('/demo/clinic?brand=SmileCare+Dental&city=Wakad%2C+Pune')
    expect(pitch.body).toContain('Hi Dr. Kulkarni')
    expect(pitch.body).toContain('₹15,000–₹22,000')
    expect(pitch.body).toContain(pitch.demoUrl)
  })

  it('builds an international X DM pitch in USD', () => {
    const pitch = buildOutreachPitch({
      niche: 'saas',
      brand: 'ShipFlow',
      city: 'Remote',
      currency: 'USD',
      channel: 'x_dm',
      origin: 'https://ryie-studio.vercel.app',
    })

    expect(pitch.offerPrice).toBe('$450–$750')
    expect(pitch.body).toContain('$450–$750')
    expect(pitch.body).toContain('ShipFlow')
  })

  it('includes a clear email subject for email and reddit channels', () => {
    const emailPitch = buildOutreachPitch({
      niche: 'cafe',
      brand: 'BrewHouse',
      city: 'KP, Pune',
      currency: 'INR',
      channel: 'email',
      origin: 'https://ryie-studio.vercel.app',
    })

    expect(emailPitch.subject).toBe('Built a live preview for BrewHouse')
    expect(emailPitch.body).toContain('officialarnav4@gmail.com')
  })

  it('builds an agency white-label pitch and SaaS UGC pitch linking /ugc', () => {
    const agencyPitch = buildOutreachPitch({
      niche: 'saas',
      brand: 'Northstar Agency',
      city: 'London',
      currency: 'USD',
      channel: 'agency_whitelabel',
      origin: 'https://ryie-studio.vercel.app',
    })
    expect(agencyPitch.subject).toContain('Northstar Agency')
    expect(agencyPitch.body).toContain('white-label')

    const ugcPitch = buildOutreachPitch({
      niche: 'saas',
      brand: 'CodePilot',
      city: 'Remote',
      currency: 'INR',
      channel: 'saas_ugc',
      origin: 'https://ryie-studio.vercel.app',
    })
    expect(ugcPitch.demoUrl).toBe('https://ryie-studio.vercel.app/ugc')
    expect(ugcPitch.body).toContain('₹3,500/reel')
  })
})
