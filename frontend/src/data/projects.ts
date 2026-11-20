export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  github?: string;
  demo?: string;
};

// Proyectos de ejemplo: reemplázalos por los tuyos.
// Para usar una imagen, guarda el archivo en public/projects/
// y escribe image: "/projects/nombre.png" (mejor en proporción 16:10, p. ej. 1600×1000).
export const projects: Project[] = [
  {
    id: 1,
    title: "API de gestión de tareas",
    description:
      "API REST con autenticación JWT, documentación Swagger y persistencia en PostgreSQL. Arquitectura por capas con Spring Boot.",
    tags: ["Java", "Spring Boot", "JWT", "PostgreSQL"],
    featured: true,
    github: "https://github.com/tu-usuario/proyecto-1",
  },
  {
    id: 2,
    title: "Dashboard en tiempo real",
    description:
      "Panel con gráficos que se actualizan en vivo, consumiendo una API propia. Interfaz en React con TypeScript.",
    tags: ["React", "TypeScript", "Spring Boot"],
    featured: true,
    github: "https://github.com/tu-usuario/proyecto-2",
    demo: "https://tu-demo.com",
  },
  {
    id: 3,
    title: "Plataforma de comercio",
    description:
      "Tienda en línea con catálogo, carrito y panel de administración. Proyecto en equipo: describe aquí cuál fue tu parte.",
    tags: ["Spring Boot", "React", "PostgreSQL"],
    featured: true,
  },
  {
    id: 4,
    title: "App de finanzas personales",
    description:
      "Registro de ingresos y gastos por categorías, con resumen mensual.",
    tags: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com/tu-usuario/proyecto-4",
  },
];