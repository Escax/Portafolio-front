import GlassCard from "./GlassCard";
import Reveal from "./Reveal";
import { bio, experience, education } from "../data/about";
import type { TimelineItem } from "../data/about";

type TimelineProps = {
  title: string;
  items: TimelineItem[];
  delay?: number;
};

function Timeline({ title, items, delay = 0 }: TimelineProps) {
  return (
    <GlassCard delay={delay}>
      <h3 className="text-xs font-medium uppercase tracking-widest text-fg/50">
        {title}
      </h3>
      <ol className="mt-6 space-y-6 border-l border-fg/10 pl-6">
        {items.map((item) => (
          <li key={`${item.title}-${item.period}`} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-fg/70" />
            <p className="text-xs text-fg/40">{item.period}</p>
            <h4 className="mt-1 font-medium">{item.title}</h4>
            <p className="text-sm text-fg/60">{item.place}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg/50">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </GlassCard>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight">Sobre mí</h2>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <GlassCard className="self-start">
          <div className="glass flex h-24 w-24 items-center justify-center rounded-full text-2xl font-semibold text-fg/80">
            TN
          </div>
          <div className="mt-6 space-y-4">
            {bio.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-fg/70">
                {paragraph}
              </p>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-4">
          <Timeline title="Experiencia" items={experience} delay={0.2} />
          <Timeline title="Formación" items={education} delay={0.4} />
        </div>
      </div>
    </section>
  );
}