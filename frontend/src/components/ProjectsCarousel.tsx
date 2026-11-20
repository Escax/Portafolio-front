import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const featured = projects.filter((project) => project.featured);

const arrowClass =
  "glass flex h-10 w-10 items-center justify-center rounded-full text-fg/80 transition hover:bg-fg/10 hover:text-fg disabled:pointer-events-none disabled:opacity-30";

export default function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  const update = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < max - 4);
    setProgress(max > 0 ? track.scrollLeft / max : 1);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  // Difumina solo el borde hacia donde hay más contenido
  const mask = `linear-gradient(to right, ${canPrev ? "transparent" : "black"}, black 48px, black calc(100% - 48px), ${canNext ? "transparent" : "black"})`;

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Proyectos</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Trabajo destacado
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            disabled={!canPrev}
            aria-label="Proyecto anterior"
            className={arrowClass}
          >
            ←
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={!canNext}
            aria-label="Proyecto siguiente"
            className={arrowClass}
          >
            →
          </button>
        </div>
      </Reveal>

      <div className="mt-10">
        <div
          ref={trackRef}
          onScroll={update}
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featured.map((project, i) => (
            <Reveal
              key={project.id}
              blur={false}
              delay={Math.min(i, 3) * 0.12}
              className="w-80 shrink-0 snap-start sm:w-96"
            >
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="mx-auto mt-2 h-0.5 w-32 overflow-hidden rounded-full bg-fg/10">
          <div
            className="h-full rounded-full bg-linear-to-r from-accent to-accent-2 transition-[width] duration-300"
            style={{ width: `${Math.max(progress * 100, 15)}%` }}
          />
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/works"
          className="glass group inline-flex items-center gap-1 rounded-full px-6 py-3 text-sm font-medium transition hover:bg-fg/10"
        >
          Ver todos los proyectos
          <span className="transition group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}