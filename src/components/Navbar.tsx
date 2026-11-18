import { ArrowUpRight, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { STUDIO_CONTACT, type Currency } from '../data/studio'

interface NavbarProps {
  currency?: Currency
  onCurrencyChange?: (next: Currency) => void
}

export function Navbar({ currency, onCurrencyChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06070b]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 text-zinc-100 hover:opacity-90">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
            <Terminal className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <span className="font-display text-sm font-bold tracking-wide">RYIE STUDIO</span>
            <span className="block font-mono text-[10px] text-zinc-400">WEB · AI · MVPs</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          <a href="#work" className="transition hover:text-zinc-100">
            Live Work
          </a>
          <a href="#demos" className="transition hover:text-zinc-100">
            Interactive Demos
          </a>
          <a href="#pricing" className="transition hover:text-zinc-100">
            Sprint Pricing
          </a>
          <a href="#process" className="transition hover:text-zinc-100">
            Process
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          {currency && onCurrencyChange && (
            <div
              className="flex rounded-lg border border-white/10 bg-zinc-900/80 p-0.5 font-mono text-xs"
              role="group"
              aria-label="Currency selector"
            >
              {(['INR', 'USD'] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => onCurrencyChange(unit)}
                  className={`rounded-md px-2.5 py-1 transition ${
                    currency === unit
                      ? 'bg-cyan-400 font-semibold text-zinc-950'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {unit === 'INR' ? '₹ INR' : '$ USD'}
                </button>
              ))}
            </div>
          )}

          <a
            href={`mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent('Project Sprint Inquiry — RYIE Studio')}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-400 px-3.5 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-cyan-300 sm:text-sm"
          >
            Book Sprint
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  )
}
