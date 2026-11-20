import type { MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function SpotlightCard({ children, className = "" }: Props) {
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div onMouseMove={handleMove} className={`glass spotlight rounded-2xl ${className}`}>
      {children}
    </div>
  );
}