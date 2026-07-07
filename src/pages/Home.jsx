import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { profile, projects, experience } from "../data/content";
import GitGraph from "../components/GitGraph";
import { GithubIcon } from "../components/icons";

function useTypewriter(text, speed = 45) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

export default function Home() {
  const typed = useTypewriter(profile.role, 40);

  return (
    <div className="px-6 md:px-16 py-14 md:py-20 max-w-4xl">
      <p className="font-mono text-xs text-amber tracking-widest uppercase mb-4">
        ~/portfolio
      </p>
      <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-text">
        {profile.name}
      </h1>
      <p className="mt-4 font-mono text-base md:text-lg text-muted h-8">
        {typed}
        <span className="cursor-blink text-amber">▍</span>
      </p>

      <GitGraph className="w-full max-w-md h-6 mt-8 mb-8" />

      <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl">
        {profile.tagline}
      </p>
      <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl whitespace-pre-line">
        {profile.bio}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-text text-ink px-5 py-3 rounded-lg font-medium text-sm hover:bg-amber transition-colors"
        >
          <GithubIcon size={16} />
          View on GitHub
        </a>
      </div>

      <div className="mt-20">
        <h2 className="font-display text-2xl text-text mb-6">Experience</h2>
        <div className="flex flex-col gap-0">
          {experience.map((e, i) => (
            <div key={e.role} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-amber mt-1.5 shrink-0" />
                {i !== experience.length - 1 && (
                  <span className="w-px flex-1 bg-line" />
                )}
              </div>
              <div className="pb-8">
                <p className="font-mono text-xs text-amber uppercase tracking-wide">
                  {e.period}
                </p>
                <h3 className="font-display text-lg text-text mt-1">{e.role}</h3>
                <p className="text-sm text-muted mt-0.5">{e.org}</p>
                <p className="text-sm text-muted leading-relaxed mt-2 max-w-xl">
                  {e.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-display text-2xl text-text mb-6 flex items-center gap-3">
          Featured Work <span className="text-amber font-mono text-lg">{"</>"}</span>
        </h2>
        <div className="flex flex-col gap-4">
          {projects.slice(0, 2).map((p) => (
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
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {p.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
