import type { MouseEvent } from "react";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
  className?: string;
};

// Tono dentro de la paleta: de cian (190) a violeta (270)
const hueFor = (id: number) => 190 + ((id * 37) % 80);

export default function ProjectCard({ project, className = "" }: Props) {
  const hue = hueFor(project.id);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onMouseMove={handleMove}
      className={`glass spotlight group flex flex-col overflow-hidden rounded-3xl ${className}`}
    >
      <div className="aspect-[16/10] overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="relative flex h-full w-full flex-col items-center justify-center transition duration-700 group-hover:scale-105"
            style={{
              background: `radial-gradient(circle at 30% 20%, hsl(${hue} 90% 60% / 0.5), transparent 60%),
                           linear-gradient(135deg, hsl(${hue} 70% 16%), hsl(${hue + 30} 70% 8%))`,
            }}
          >
            {/* Cuadrícula tipo blueprint */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(255 255 255 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
              }}
            />
            <span className="relative font-mono text-6xl font-semibold text-white/85">
              {project.title.charAt(0)}
            </span>
            {project.tags[0] && (
              <span className="relative mt-2 font-mono text-xs text-white/50">
                // {project.tags[0]}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <h3 className="text-xl font-medium">{project.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg/60">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-fg/10 bg-fg/5 px-3 py-1 font-mono text-[11px] text-fg/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-5 pt-6 text-sm">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1 text-fg/70 transition hover:text-accent"
            >
              Código
              <span className="transition group-hover/link:translate-x-1">→</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1 text-fg/70 transition hover:text-accent-2"
            >
              Demo
              <span className="transition group-hover/link:translate-x-1">→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}