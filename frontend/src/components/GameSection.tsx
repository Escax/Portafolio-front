import Reveal from "./Reveal";
import BugRunner from "./BugRunner";

export default function GameSection() {
  return (
    <section id="game" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="text-center">
        <p className="eyebrow">Easter egg</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Bug Runner</h2>
        <p className="mt-2 text-fg/60">
          Lo que hago todos los días, pero en juego. Hecho con React y Canvas.
        </p>
      </Reveal>

      <Reveal blur={false} delay={0.15} className="mt-10">
        <BugRunner />
      </Reveal>
    </section>
  );
}