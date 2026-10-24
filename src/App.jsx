import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, Phone, Download, MapPin, Plus, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./components/icons";
import { profile, experience, leadership, education, projects, skills } from "./data/content";

const words = ["software", "models", "ideas", "systems"];
const links = [["projects", "Projects"], ["about", "About"], ["contact", "Contact"]];

/* ---------- small interactive pieces ---------- */
function CursorRing() {
  const ref = useRef(null);
  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);
  useEffect(() => {
    if (!fine) return;
    const el = ref.current;
    let x = 0, y = 0, tx = 0, ty = 0, raf;
    const move = (e) => {
      tx = e.clientX; ty = e.clientY;
      el.dataset.big = String(!!e.target.closest?.("a,button,[data-hover]"));
    };
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      el.style.transform = `translate(${x}px,${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, [fine]);
  return fine ? <div ref={ref} className="cursor-ring" aria-hidden="true" /> : null;
}

function Topbar() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(([id]) => io.observe(document.getElementById(id)));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  return (
    <>
      <div className="fixed top-0 left-0 h-[3px] bg-red z-50" style={{ width: `${progress * 100}%` }} />
      <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-14 py-4 bg-gradient-to-b from-ink/90 to-transparent">
        <a href="#top" aria-label="Back to top"><img src="/logo-pv.png" alt="PV" className="h-10 w-auto" /></a>
        <div className="hidden sm:flex gap-7 text-sm">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`transition-colors hover:text-red ${active === id ? "text-red" : "text-text/80"}`}>
              {label}
            </a>
          ))}
        </div>
        <a href="#contact" className="flex items-center gap-2 text-sm hover:text-red transition-colors">
          Open to internships <Plus size={16} className="text-red" />
        </a>
      </nav>
    </>
  );
}

function SectionTitle({ children }) {
  return <h2 className="font-display text-2xl tracking-wide mb-8">{children}</h2>;
}

function Spot({ as: Tag = "div", className = "", children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return <Tag onMouseMove={onMove} className={`spot ${className}`} {...rest}>{children}</Tag>;
}

/* ---------- page ---------- */
export default function App() {
  const hero = useRef(null);
  const [wi, setWi] = useState(0);
  const [openExp, setOpenExp] = useState(0);
  const [cat, setCat] = useState(Object.keys(skills)[0]);

  useEffect(() => {
    const t = setInterval(() => setWi((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  const onHeroMove = (e) => {
    const el = hero.current, r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--px", ((x / r.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--py", ((y / r.height - 0.5) * 2).toFixed(3));
  };
  const onHeroLeave = () => {
    hero.current.style.setProperty("--px", 0);
    hero.current.style.setProperty("--py", 0);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <CursorRing />
      <Topbar />

      {/* HERO */}
      <header id="top" ref={hero} onMouseMove={onHeroMove} onMouseLeave={onHeroLeave}
        className="hero relative min-h-[100svh] flex flex-col px-6 md:px-14 overflow-hidden">
        <div className="hero-spot" />
        <div className="parallax-word bgword absolute inset-x-0 top-20 md:top-14 text-center" aria-hidden="true">
          PORTFOLIO
        </div>

        <div className="relative z-10 flex-1 grid md:grid-cols-[1.1fr_1.1fr_.8fr] items-end gap-6 pt-28 md:pt-24">
          <div className="order-2 md:order-1 relative z-20 pb-10 md:pb-20 rise">
            <p className="font-script text-red text-5xl md:text-6xl -mb-2">Hello, I’m</p>
            <h1 className="font-display text-5xl md:text-7xl leading-[.95] uppercase">Vanshiv<br />Garg</h1>
            <p className="mt-4 font-display text-xl md:text-2xl tracking-wide uppercase">
              Student developer<br />and builder
            </p>
            <p className="mt-5 text-muted leading-relaxed max-w-sm">
              Second-year computer science student at IIIT Una. I learn by building,
              from research work to apps people can actually use.
            </p>
            <p className="mt-5 text-lg">
              Right now I’m making <span key={wi} className="swap text-red font-medium">{words[wi]}</span>
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <MapPin size={14} className="text-red" /> Based in India
            </p>
          </div>

          <div className="order-1 md:order-2 relative h-[50vh] md:h-[80vh] self-end">
            <div className="photo-glow absolute left-1/2 -translate-x-1/2 bottom-[8%] w-[120%] aspect-square opacity-80" />
            <div className="parallax-photo absolute inset-0">
              <img src={profile.photo} alt={profile.name}
                className="photo-fade absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-[0_0_28px_rgba(212,32,44,.45)]" />
            </div>
          </div>

          <ul className="order-3 relative z-20 pb-10 md:pb-24 flex flex-col gap-5 rise" style={{ animationDelay: ".15s" }}>
            <li className="flex gap-3 text-xl leading-snug max-w-[17rem] font-medium">
              <Plus size={18} className="text-red shrink-0 mt-1.5" />
              I can build it, ship it and lead the team behind it.
            </li>
            {[
              "Strong tech foundation across code, AI and the web",
              "Pick up any new problem and get it done",
              "Organise people, events and deadlines without dropping the ball",
            ].map((f) => (
              <li key={f} className="flex gap-3 text-muted max-w-[17rem]">
                <Plus size={16} className="text-red shrink-0 mt-1" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <main className="px-6 md:px-14">
        {/* PROJECTS */}
        <section id="projects" className="pt-20 scroll-mt-10">
          <SectionTitle>Selected projects</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <Spot as="a" key={p.title} href={p.link} target="_blank" rel="noreferrer"
                className="group flex flex-col justify-between min-h-[15rem] p-6 bg-panel border border-line hover:border-red hover:-translate-y-1 transition-all overflow-hidden">
                <span aria-hidden="true" className="absolute -right-3 -bottom-8 font-display text-[9rem] leading-none text-red/10 group-hover:text-red/25 transition-colors select-none">
                  {p.title[0]}
                </span>
                <div className="relative">
                  <p className="text-sm text-red">{p.tag}</p>
                  <h3 className="mt-2 font-display text-3xl uppercase tracking-wide">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">{p.description}</p>
                </div>
                <ArrowUpRight className="relative mt-6 transition-all group-hover:text-red group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Spot>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="pt-24 scroll-mt-10 grid lg:grid-cols-[1fr_1.15fr_.9fr] gap-10 lg:gap-0">
          <div className="lg:pr-10 lg:border-r border-line">
            <SectionTitle>Education and skills</SectionTitle>
            <p className="text-sm text-red">{education.period}</p>
            <p className="mt-1 text-lg">{education.degree}</p>
            <p className="text-muted text-sm">{education.school}</p>

            <div className="mt-10 flex flex-wrap gap-2" role="tablist">
              {Object.keys(skills).map((c) => (
                <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                  className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${cat === c ? "bg-red border-red text-white" : "border-line text-muted hover:border-red hover:text-text"}`}>
                  {c}
                </button>
              ))}
            </div>
            <div key={cat} className="mt-5 flex flex-wrap gap-2 rise">
              {skills[cat].map((s) => (
                <span key={s} className="text-xs border border-line rounded-full px-3 py-1.5 hover:border-red hover:text-red transition-colors" data-hover>{s}</span>
              ))}
            </div>
          </div>

          <div className="lg:px-10 lg:border-r border-line">
            <SectionTitle>Experience</SectionTitle>
            <ol className="relative border-l border-line ml-1.5">
              {experience.map((e, i) => {
                const open = openExp === i;
                return (
                  <li key={e.role + e.org} className="pl-7 pb-3 relative">
                    <span className={`absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full transition-colors ${open ? "bg-red" : "bg-line"}`} />
                    <button onClick={() => setOpenExp(open ? -1 : i)} aria-expanded={open}
                      className="w-full text-left py-2 flex items-start justify-between gap-3 group">
                      <span>
                        <span className="block text-xs text-red">{e.period}</span>
                        <span className="block text-lg font-medium leading-snug group-hover:text-red transition-colors">{e.role}</span>
                        <span className="block text-sm text-muted">{e.org}</span>
                      </span>
                      <ChevronDown size={18} className={`mt-5 shrink-0 text-muted transition-transform ${open ? "rotate-180 text-red" : ""}`} />
                    </button>
                    <div className="acc" data-open={open}>
                      <div><p className="pb-4 text-sm text-muted/90 leading-relaxed">{e.description}</p></div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="lg:pl-10">
            <div className="grain h-full min-h-[22rem] p-8 flex flex-col justify-between border border-line">
              <p className="font-display text-red text-6xl leading-none">“</p>
              <p className="font-display text-3xl md:text-4xl uppercase leading-[1.05]">
                The most valuable education happens beyond the classroom.
              </p>
              <p className="font-script text-5xl mt-8">Vanshiv</p>
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="pt-24">
          <SectionTitle>Leadership</SectionTitle>
          <ul className="grid md:grid-cols-2 border-t border-line">
            {leadership.map((l) => (
              <li key={l.role} className="py-5 border-b border-line md:odd:pr-8 md:even:pl-8 md:odd:border-r">
                <div className="flex justify-between gap-4">
                  <h3 className="font-medium">{l.role}</h3>
                  {l.period && <span className="text-xs text-red shrink-0 mt-1">{l.period}</span>}
                </div>
                <p className="text-sm text-muted">{l.org}</p>
                {l.description && <p className="text-sm text-muted/90 mt-2 max-w-md">{l.description}</p>}
              </li>
            ))}
          </ul>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 scroll-mt-10 grid md:grid-cols-2 gap-12 items-end">
          <div>
            <h2 className="font-display text-5xl md:text-7xl uppercase leading-[.95]">Let’s work<br />together</h2>
            <p className="mt-5 text-muted max-w-sm">I’m open to internships and projects. Send a message or grab my CV.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/cv.pdf" download className="inline-flex items-center gap-2 bg-red text-white px-5 py-3 font-medium hover:bg-red-deep transition-colors">
                <Download size={16} /> Download CV
              </a>
              <a href="/cv-ai-data-science.pdf" download className="inline-flex items-center gap-2 border border-line px-5 py-3 text-sm hover:border-red transition-colors">
                AI and data science CV
              </a>
            </div>
          </div>
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {[
              [Mail, profile.email, `mailto:${profile.email}`],
              [Phone, profile.phone, `tel:${profile.phone.replace(/[^+\d]/g, "")}`],
              [GithubIcon, "github.com/Vanshiv46", profile.github],
              [LinkedinIcon, "linkedin.com/in/vanshivgarg", profile.linkedin],
            ].map(([Icon, label, href]) => (
              <li key={label}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="flex items-center gap-4 py-4 hover:text-red hover:pl-3 transition-all">
                  <Icon size={18} className="text-red" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="px-6 md:px-14 pb-8 text-xs text-muted flex justify-between">
        <span>© 2026 Vanshiv Garg</span>
        <a href="#top" className="hover:text-red transition-colors">Back to top</a>
      </footer>
    </div>
  );
}
