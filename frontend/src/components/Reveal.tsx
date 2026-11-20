import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  blur?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  blur = true,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, ...(blur && { filter: "blur(10px)" }) }}
      whileInView={{ opacity: 1, y: 0, ...(blur && { filter: "blur(0px)" }) }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}