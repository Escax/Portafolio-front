import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { flushSync } from "react-dom";
import type { MouseEvent } from "react";
import { useTheme } from "../hooks/useTheme";

const links = [
  { label: "Inicio", to: "/" },
  { label: "Proyectos", to: "/works" },
  { label: "Sobre mí", to: "/about" },
];

const base = "relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] transition-colors sm:px-4 sm:text-sm";
const idle = "text-fg/70 hover:text-fg";

const iconProps = {
  viewBox: "0 0 24 24",
  className: "h-4 w-4",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
};

function SunIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();

  const handleClick = (to: string) => {
    if (pathname === to) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Cambio de tema con un círculo que se expande desde el botón
  const handleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      toggle();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => flushSync(toggle));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-4 z-50 w-max max-w-[calc(100vw-1.5rem)] -translate-x-1/2"
    >
      <nav className="glass flex items-center gap-0.5 rounded-full p-1 sm:gap-1 sm:p-1.5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            onClick={() => handleClick(link.to)}
            className={({ isActive }) => `${base} ${isActive ? "text-fg" : idle}`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-fg/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </>
            )}
          </NavLink>
        ))}

        <a href="#contact" className={`${base} ${idle}`}>
          Contacto
        </a>

        <button
          onClick={handleTheme}
          aria-label="Cambiar entre tema claro y oscuro"
          className={`${base} ${idle} hover:bg-fg/10`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="block"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>
    </motion.header>
  );
}