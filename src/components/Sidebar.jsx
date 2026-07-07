import { NavLink } from "react-router-dom";
import { Home, FolderKanban, Cpu, Code2, FileText, Mail, Sun, Moon } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "../data/content";
import { useTheme } from "../theme";

const navItems = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/skills", label: "Skills", icon: Cpu },
  { to: "/cp", label: "CP Profiles", icon: Code2 },
  { to: "/cv", label: "CV", icon: FileText },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-full md:w-72 shrink-0 md:h-screen md:sticky md:top-0 border-b md:border-b-0 md:border-r border-line bg-surface flex md:flex-col">
      <div className="hidden md:flex flex-col items-center pt-12 pb-8 px-6 border-b border-line">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-36 h-36 rounded-full object-cover border-2 border-line shadow-md"
          loading="eager"
          decoding="async"
        />
        <h1 className="mt-4 font-display text-lg text-text text-center">{profile.name}</h1>
        <p className="mt-1 text-xs text-muted text-center font-mono">{profile.role}</p>
      </div>

      <nav className="flex-1 flex md:flex-col overflow-x-auto md:overflow-visible px-2 md:px-4 md:pt-6 gap-1 items-center">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-text text-ink font-medium"
                  : "text-muted hover:text-text hover:bg-surface2"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="md:hidden ml-2 mr-2 w-9 h-9 shrink-0 flex items-center justify-center rounded-full border border-line text-muted hover:text-amber hover:border-amberDim transition-colors"
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </nav>

      <div className="hidden md:flex flex-col items-center gap-5 py-6 border-t border-line">
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-line text-muted hover:text-amber hover:border-amberDim transition-colors"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="flex items-center justify-center gap-5">
          <a href={`mailto:${profile.email}`} className="text-muted hover:text-amber transition-colors" aria-label="Email">
            <Mail size={18} />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-muted hover:text-amber transition-colors" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-amber transition-colors" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </a>
        </div>
      </div>
    </aside>
  );
}
