import {
  ACCENT_THEMES,
  NICHE_IDS,
  NICHE_TEMPLATES,
  type AccentId,
  type NicheId,
} from '../data/niches'

export interface ResolvedDemoConfig {
  niche: NicheId
  brand: string
  city: string
  tagline: string
  offer: string
  accent: AccentId
}

const MAX_TEXT_LENGTH = 120

/**
 * Normalizes and bounds query-supplied display text to keep dynamic demo URLs clean and safe.
 */
export function sanitizeParamText(value: string | null | undefined, fallback: string): string {
  if (!value) return fallback
  const cleaned = value.replace(/[\r\n\t]+/g, ' ').trim()
  if (!cleaned) return fallback
  return cleaned.slice(0, MAX_TEXT_LENGTH)
}

export function resolveNicheId(rawNiche: string | undefined): NicheId {
  if (rawNiche && NICHE_IDS.includes(rawNiche as NicheId)) {
    return rawNiche as NicheId
  }
  return 'clinic'
}

export function resolveAccentId(rawAccent: string | null | undefined, fallback: AccentId): AccentId {
  if (rawAccent && rawAccent in ACCENT_THEMES) {
    return rawAccent as AccentId
  }
  return fallback
}

/**
 * Resolves a live demo configuration from the route niche and URL query parameters.
 */
export function parseDemoConfig(
  rawNiche: string | undefined,
  searchParams: URLSearchParams,
): ResolvedDemoConfig {
  const niche = resolveNicheId(rawNiche)
  const template = NICHE_TEMPLATES[niche]

  return {
    niche,
    brand: sanitizeParamText(searchParams.get('brand'), template.defaultBrand),
    city: sanitizeParamText(searchParams.get('city'), template.defaultCity),
    tagline: sanitizeParamText(searchParams.get('tagline'), template.defaultTagline),
    offer: sanitizeParamText(searchParams.get('offer'), template.defaultOffer),
    accent: resolveAccentId(searchParams.get('accent'), template.defaultAccent),
  }
}

/**
 * Builds a shareable Demo-First preview URL containing only non-default overrides.
 */
export function buildDemoUrl(
  origin: string,
  config: Partial<ResolvedDemoConfig> & { niche: NicheId },
): string {
  const template = NICHE_TEMPLATES[config.niche]
  const params = new URLSearchParams()

  const brand = config.brand?.trim()
  const city = config.city?.trim()
  const tagline = config.tagline?.trim()
  const offer = config.offer?.trim()

  if (brand && brand !== template.defaultBrand) params.set('brand', brand.slice(0, MAX_TEXT_LENGTH))
  if (city && city !== template.defaultCity) params.set('city', city.slice(0, MAX_TEXT_LENGTH))
  if (tagline && tagline !== template.defaultTagline) params.set('tagline', tagline.slice(0, MAX_TEXT_LENGTH))
  if (offer && offer !== template.defaultOffer) params.set('offer', offer.slice(0, MAX_TEXT_LENGTH))
  if (config.accent && config.accent !== template.defaultAccent) params.set('accent', config.accent)

  const base = origin.replace(/\/+$/, '')
  const query = params.toString()
  return `${base}/demo/${config.niche}${query ? `?${query}` : ''}`
}
