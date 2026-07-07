import { ExternalLink } from "lucide-react";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <div className="px-6 md:px-16 py-14 md:py-20 max-w-4xl">
      <p className="font-mono text-xs text-amber tracking-widest uppercase mb-3">
        Work
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-text mb-10">Projects</h1>

      <div className="flex flex-col gap-5">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="border border-line rounded-xl p-6 bg-surface hover:border-amberDim transition-colors group block"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-amber uppercase tracking-wide mb-2">
                  {p.tag}
                </p>
                <h3 className="font-display text-xl text-text">{p.title}</h3>
              </div>
              <ExternalLink
                size={18}
                className="text-muted group-hover:text-amber transition-colors shrink-0 mt-1"
              />
            </div>
            <p className="mt-3 text-sm text-muted leading-relaxed">{p.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
