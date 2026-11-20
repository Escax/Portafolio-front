export type TimelineItem = {
  period: string;
  title: string;
  place: string;
  description: string;
};

export const bio: string[] = [
  "Soy estudiante de Ingeniería de Software y desarrollador Java. Me gusta construir APIs REST limpias y bien documentadas con Spring Boot.",
  "Busco crear productos completos, desde el backend hasta una interfaz cuidada con React y TypeScript.",
];

export const experience: TimelineItem[] = [
  {
    period: "2025 — Actualidad",
    title: "Desarrollador Java",
    place: "Green Horizon",
    description: "Desarrollo de aplicaciones empresariales con Java.",
  },
  {
    period: "2023 — 2024",
    title: "Desarrollador Backend Freelance",
    place: "Independiente",
    description:
      "APIs REST con Java y Spring Boot, autenticación JWT, documentación con Swagger y PostgreSQL. Trabajo con Git/GitHub (Gitflow) y Scrum.",
  },
  {
    period: "2022",
    title: "Programador Java Junior (prácticas)",
    place: "R-fast",
    description: "Desarrollo con Java, Spring Boot y SQL.",
  },
];

export const education: TimelineItem[] = [
  {
    period: "En curso",
    title: "Ingeniería de Software",
    place: "Corporación Iberoamericana de Formación Virtual",
    description: "Sexto semestre.",
  },
  {
    period: "Completado",
    title: "Técnico en Programación de Software",
    place: "SENA",
    description: "Base en programación, bases de datos y desarrollo de software.",
  },
];