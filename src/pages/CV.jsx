import { Download } from "lucide-react";
import { profile } from "../data/content";

export default function CV() {
  return (
    <div className="px-6 md:px-16 py-14 md:py-20 max-w-4xl">
      <p className="font-mono text-xs text-amber tracking-widest uppercase mb-3">
        Resume
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-text mb-8">CV</h1>

      <div className="border border-line rounded-xl p-8 bg-surface flex flex-col items-center text-center gap-4">
        <p className="text-muted max-w-md">
          {profile.name}'s full resume — education, experience, positions of responsibility,
          and projects.
        </p>
        <a
          href="/cv.pdf"
          download
          className="inline-flex items-center gap-2 bg-text text-ink px-5 py-3 rounded-lg font-medium text-sm hover:bg-amber transition-colors"
        >
          <Download size={16} />
          Download CV
        </a>
        <p className="text-xs text-muted font-mono">
          Other versions:{" "}
          <a href="/cv-ai-data-science.pdf" download className="text-amber hover:underline">AI &amp; Data Science</a>
          {" · "}
          <a href="/cv-ats.pdf" download className="text-amber hover:underline">ATS (1-page)</a>
        </p>
      </div>

      <div className="mt-6 rounded-xl overflow-hidden border border-line bg-surface">
        <iframe
          src="/cv.pdf"
          title="CV preview"
          className="w-full"
          style={{ height: "70vh" }}
        />
      </div>
    </div>
  );
}
