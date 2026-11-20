import { motion } from "framer-motion";

// Textura de grano en SVG, sin imágenes externas
const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <motion.div
        className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{ background: "var(--blob-1)" }}
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{ background: "var(--blob-2)" }}
        animate={{ x: [0, -70, 0], y: [0, 80, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: "var(--blob-3)" }}
        animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grano sutil */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: grain, opacity: "var(--grain-opacity)" }}
      />
    </div>
  );
}