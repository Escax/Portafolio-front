import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function GlassCard({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay, ease: "easeOut" },
      }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`glass rounded-3xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}