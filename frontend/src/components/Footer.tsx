import { Link } from "react-router-dom";

const menu = [
  { label: "Inicio", to: "/" },
  { label: "Proyectos", to: "/works" },
  { label: "Sobre mí", to: "/about" },
];

const follow = [
  { label: "GitHub", href: "https://github.com/Escax" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/esneider-cardozo/" },
];

const linkClass = "text-sm text-fg/60 transition hover:text-fg";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pb-10">
      <div className="glass grid gap-8 rounded-3xl p-8 md:grid-cols-3">
        <div>
          <p className="font-medium">Esneider Cardozo</p>
          <p className="mt-2 text-sm text-fg/50">
            Desarrollador de software. Construyo APIs y aplicaciones web.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-fg/40">
            Menú
          </p>
          <ul className="mt-4 space-y-2">
            {menu.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-fg/40">
            Sígueme
          </p>
          <ul className="mt-4 space-y-2">
            {follow.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  {item.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-fg/40">
        <span>© {new Date().getFullYear()} Esneider Cardozo</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="transition hover:text-fg"
        >
          Volver arriba ↑
        </button>
      </div>
    </footer>
  );
}