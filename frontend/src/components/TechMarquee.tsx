import { stack } from "../data/stack";

const techs = stack.flatMap((group) => group.items);

export default function TechMarquee() {
  return (
    <section className="py-10">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...techs, ...techs].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="glass mr-4 flex shrink-0 items-center gap-3 rounded-full px-5 py-3"
            >
              <img src={tech.icon} alt={tech.name} className="h-6 w-6" />
              <span className="text-sm text-fg/80">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}