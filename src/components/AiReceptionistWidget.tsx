import { useState, type FormEvent } from 'react'
import { Bot, Send } from 'lucide-react'
import { ACCENT_THEMES, type AccentId, type NicheFaq } from '../data/niches'

interface ChatMessage {
  id: string
  sender: 'assistant' | 'user'
  text: string
}

interface AiReceptionistWidgetProps {
  brand: string
  city: string
  offer: string
  roleTitle: string
  greeting: string
  faqs: NicheFaq[]
  accent: AccentId
}

function resolveAssistantReply(
  query: string,
  brand: string,
  city: string,
  offer: string,
  faqs: NicheFaq[],
): string {
  const normalized = query.toLowerCase()
  const matched = faqs.find((faq) => faq.keywords.some((kw) => normalized.includes(kw)))
  if (matched) return matched.answer

  if (normalized.includes('offer') || normalized.includes('discount') || normalized.includes('free')) {
    return `${brand} currently highlights "${offer}" right in the hero and booking flow so visitors convert immediately.`
  }

  if (normalized.includes('where') || normalized.includes('location') || normalized.includes('address') || normalized.includes('city')) {
    return `${brand} (${city}) includes clickable Google Maps directions, hours, and WhatsApp routing here on launch.`
  }

  return `Great question — on your live build, this AI desk is trained directly on ${brand}'s exact services, pricing, and policies, and routes qualified leads straight to your WhatsApp or inbox.`
}

export function AiReceptionistWidget({
  brand,
  city,
  offer,
  roleTitle,
  greeting,
  faqs,
  accent,
}: AiReceptionistWidgetProps) {
  const theme = ACCENT_THEMES[accent]
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', sender: 'assistant', text: greeting },
  ])

  function submitQuery(rawText: string) {
    const text = rawText.trim()
    if (!text) return

    const reply = resolveAssistantReply(text, brand, city, offer, faqs)
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', text },
      { id: `a-${Date.now() + 1}`, sender: 'assistant', text: reply },
    ])
    setInput('')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    submitQuery(input)
  }

  return (
    <div className={`flex flex-col rounded-2xl border ${theme.border} bg-zinc-950/90 p-5`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2.5">
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${theme.badge}`}>
            <Bot className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-display text-sm font-semibold text-zinc-100">{roleTitle}</h3>
            <p className="font-mono text-[11px] text-zinc-400">Interactive Preview · {brand}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Online
        </span>
      </div>

      <div className="mt-4 flex max-h-60 flex-col gap-2.5 overflow-y-auto pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[90%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'ml-auto bg-white/10 text-zinc-100'
                : 'border border-white/10 bg-zinc-900/90 text-zinc-300'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {faqs.map((faq) => (
          <button
            key={faq.question}
            type="button"
            onClick={() => submitQuery(faq.question)}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-left text-xs text-zinc-300 transition hover:border-white/25 hover:bg-white/10"
          >
            {faq.question}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about pricing, timings, or booking..."
          className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-white/30"
        />
        <button
          type="submit"
          aria-label="Send message"
          className={`inline-flex shrink-0 items-center justify-center rounded-xl px-3.5 py-2 font-semibold transition ${theme.button}`}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
