export type Tech = {
  name: string;
  description: string;
  icon: string;
};

export type StackGroup = {
  title: string;
  items: Tech[];
};

const icon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export const stack: StackGroup[] = [
  {
    title: "Backend",
    items: [
      {
        name: "Java",
        description: "Mi lenguaje principal para el backend",
        icon: icon("java/java-original.svg"),
      },
      {
        name: "Spring Boot",
        description: "APIs REST rápidas y bien estructuradas",
        icon: icon("spring/spring-original.svg"),
      },
      {
        name: "PostgreSQL",
        description: "Base de datos relacional",
        icon: icon("postgresql/postgresql-original.svg"),
      },
    ],
  },
  {
    title: "Frontend",
    items: [
      {
        name: "React",
        description: "Interfaces rápidas e interactivas",
        icon: icon("react/react-original.svg"),
      },
      {
        name: "TypeScript",
        description: "JavaScript con tipos, más seguro",
        icon: icon("typescript/typescript-original.svg"),
      },
      {
        name: "Tailwind CSS",
        description: "Estilos rápidos y consistentes",
        icon: icon("tailwindcss/tailwindcss-original.svg"),
      },
    ],
  },
  {
    title: "Herramientas",
    items: [
      {
        name: "Git",
        description: "Control de versiones con Gitflow",
        icon: icon("git/git-original.svg"),
      },
      {
        name: "Docker",
        description: "Contenedores para entornos aislados",
        icon: icon("docker/docker-original.svg"),
      },
    ],
  },
];