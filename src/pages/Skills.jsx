import { skills } from "../data/content";

export default function Skills() {
  return (
    <div className="px-6 md:px-16 py-14 md:py-20 max-w-4xl">
      <p className="font-mono text-xs text-amber tracking-widest uppercase mb-3">
        Toolbox
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-text mb-10">Skills</h1>

      <div className="grid sm:grid-cols-2 gap-6">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="border border-line rounded-xl p-6 bg-surface"
          >
            <h3 className="font-display text-lg text-text mb-4">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs text-muted border border-line rounded-full px-3 py-1.5 hover:border-amberDim hover:text-amber transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
