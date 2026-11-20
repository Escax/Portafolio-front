import Reveal from "./Reveal";
import { stack } from "../data/stack";

// Junta todas las tecnologías en una sola lista, guardando su categoría
const techs = stack.flatMap((group) =>
  group.items.map((tech) => ({ ...tech, group: group.title }))
);

// La lista se duplica: la animación mueve la cinta hasta -50% y vuelve a empezar sin saltos
const track = [...techs, ...techs];

export default function Stack() {
  return (
    <section id="stack" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-fg/40">
            Tech Stack
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Stack</h2>
          <p className="mt-2 text-fg/60">
            Las tecnologías con las que he trabajado.
          </p>
        </Reveal>
      </div>

      <Reveal blur={false} delay={0.3} className="mt-12">
        <div className="relative overflow-hidden py-4">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {track.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="glass mr-5 w-72 shrink-0 rounded-3xl p-6"
              >
                <div className="flex items-center gap-4">
                  <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    <img src={tech.icon} alt={tech.name} className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-fg/40">
                      {tech.group}
                    </p>
                    <h3 className="font-medium">{tech.name}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-fg/60">{tech.description}</p>
              </div>
            ))}
          </div>

          {/* Bordes que desvanecen la cinta hacia el fondo */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-bg to-transparent" />
        </div>
      </Reveal>
    </section>
  );
}