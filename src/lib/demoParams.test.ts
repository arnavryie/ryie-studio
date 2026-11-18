import { describe, expect, it } from 'vitest'
import { buildDemoUrl, parseDemoConfig, sanitizeParamText } from './demoParams'

describe('sanitizeParamText', () => {
  it('falls back when input is empty or whitespace', () => {
    expect(sanitizeParamText('', 'Default')).toBe('Default')
    expect(sanitizeParamText('   \n\t  ', 'Default')).toBe('Default')
  })

  it('normalizes whitespace and truncates oversized inputs', () => {
    const long = 'A'.repeat(160)
    expect(sanitizeParamText(long, 'Fallback')).toHaveLength(120)
    expect(sanitizeParamText('Hello\nWorld\tStudio', 'Fallback')).toBe('Hello World Studio')
  })
})

describe('parseDemoConfig', () => {
  it('uses niche defaults when query params are omitted', () => {
    const config = parseDemoConfig('fitness', new URLSearchParams())
    expect(config.niche).toBe('fitness')
    expect(config.brand).toBe('IronPulse Performance Club')
    expect(config.accent).toBe('amber')
  })

  it('falls back to clinic for unknown niches and ignores invalid accents', () => {
    const config = parseDemoConfig(
      'unknown-niche',
      new URLSearchParams({ brand: 'Nova Care', accent: 'neon-pink' }),
    )
    expect(config.niche).toBe('clinic')
    expect(config.brand).toBe('Nova Care')
    expect(config.accent).toBe('emerald')
  })
})

describe('buildDemoUrl', () => {
  it('omits default overrides and builds clean query parameters', () => {
    const url = buildDemoUrl('https://ryie-studio.vercel.app/', {
      niche: 'saas',
      brand: 'PulseDesk AI',
      city: 'San Francisco',
    })
    expect(url).toBe('https://ryie-studio.vercel.app/demo/saas?brand=PulseDesk+AI&city=San+Francisco')
  })
})
