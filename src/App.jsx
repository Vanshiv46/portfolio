import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import CP from "./pages/CP";
import CV from "./pages/CV";

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-text font-body flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/cp" element={<CP />} />
          <Route path="/cv" element={<CV />} />
        </Routes>
      </main>
    </div>
  );
}
