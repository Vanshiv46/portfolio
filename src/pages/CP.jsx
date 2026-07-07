import { ExternalLink } from "lucide-react";
import { cpProfiles } from "../data/content";

export default function CP() {
  return (
    <div className="px-6 md:px-16 py-14 md:py-20 max-w-4xl">
      <p className="font-mono text-xs text-amber tracking-widest uppercase mb-3">
        Practice
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-text mb-10">
        Competitive Programming
      </h1>

      <div className="flex flex-col gap-4">
        {cpProfiles.map((c) => (
          <a
            key={c.platform}
            href={c.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border border-line rounded-xl px-6 py-4 bg-surface hover:border-amberDim transition-colors group"
          >
            <div>
              <p className="font-display text-lg text-text">{c.platform}</p>
              <p className="font-mono text-xs text-muted">@{c.handle}</p>
            </div>
            <ExternalLink
              size={16}
              className="text-muted group-hover:text-amber transition-colors"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
