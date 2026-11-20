import { motion, type Variants } from "framer-motion";
import { useTyping } from "../hooks/useTyping";

const WORDS = ["Java · Spring Boot", "React · TypeScript", "Oracle ADF", "APIs REST con JWT"];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const typed = useTyping(WORDS);

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl text-center"
      >
        <motion.span
          variants={item}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-fg/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
          </span>
          Ingeniero de Software · Java
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 bg-linear-to-br from-fg from-40% to-accent bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-7xl"
        >
          Esneider Cardozo
        </motion.h1>

        <motion.p variants={item} className="mt-5 h-6 font-mono text-sm text-accent-2 sm:text-base">
          &gt; {typed}
          <span className="ml-0.5 animate-pulse">▍</span>
        </motion.p>

        <motion.p variants={item} className="mx-auto mt-5 max-w-xl text-lg font-light text-fg/60">
          Construyo APIs robustas con Spring Boot e interfaces cuidadas con React.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#projects"
            className="rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_32px_-4px_var(--accent)]"
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            className="glass rounded-full px-6 py-3 text-sm font-medium text-fg transition duration-300 hover:-translate-y-0.5 hover:bg-fg/10"
          >
            Contacto
          </a>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.a
        href="#projects"
        aria-label="Bajar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 flex h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-fg/20 pt-2"
      >
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-1 rounded-full bg-fg/60"
        />
      </motion.a>
    </section>
  );
}