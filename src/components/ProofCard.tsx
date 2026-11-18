import { ExternalLink } from 'lucide-react'
import type { ProofProject } from '../data/studio'

interface ProofCardProps {
  project: ProofProject
}

export function ProofCard({ project }: ProofCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/80 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-zinc-900/70"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-cyan-300">
            {project.category}
          </span>
          <ExternalLink className="h-4 w-4 shrink-0 text-zinc-500 transition group-hover:text-cyan-300" />
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold text-zinc-100 group-hover:text-cyan-200">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-white/10 bg-black/50 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  )
}
