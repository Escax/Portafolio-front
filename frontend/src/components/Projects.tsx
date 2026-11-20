import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="eyebrow">Portafolio</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Proyectos</h2>
        <p className="mt-2 text-fg/60">Una selección de lo que he construido.</p>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.id}
            blur={false}
            delay={(i % 2) * 0.15}
            className="h-full"
          >
            <ProjectCard project={project} className="h-full" />
            </Reveal>
        ))}
      </div>
    </section>
  );
}