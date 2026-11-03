export type Project = {
  id: string;
  title: string;
  year: string;
  discipline: string;
  summary: string;
  role: string;
  image: string;
  link: string;
  hidden: boolean;
};

export const seedProjects: Project[] = [
  {
    id: "serra",
    title: "Serra & Grão",
    year: "2025",
    discipline: "Identidade",
    summary:
      "Sistema visual para um café de terroir mineiro. Marca, embalagem e peças de balcão com a mesma matéria: papel, barro e ferrugem.",
    role: "Direção de arte e embalagem",
    image: "/work/serra.jpg",
    link: "",
    hidden: false,
  },
  {
    id: "atlas",
    title: "Atlas",
    year: "2025",
    discipline: "Produto digital",
    summary:
      "Um app de leitura com ritmo de revista. A interface foi desenhada como página impressa e construída para ser rápida no celular.",
    role: "Interface e desenvolvimento",
    image: "/work/atlas.jpg",
    link: "",
    hidden: false,
  },
  {
    id: "barro",
    title: "Casa do Barro",
    year: "2024",
    discipline: "Identidade",
    summary:
      "Direção para um ateliê de cerâmica: catálogo, embalagem e um conjunto de fotos que trata o objeto como peça, não como produto.",
    role: "Identidade e direção de foto",
    image: "/work/barro.jpg",
    link: "",
    hidden: false,
  },
  {
    id: "arco",
    title: "Série Arco",
    year: "2024",
    discipline: "Peça gráfica",
    summary:
      "Cartazes para uma mostra de design. Um gesto só — o arco — repetido em escala, cor e corte, sem tipografia decorativa.",
    role: "Direção de arte",
    image: "/work/poster.jpg",
    link: "",
    hidden: false,
  },
  {
    id: "norte",
    title: "Oficina Norte",
    year: "2023",
    discipline: "Site",
    summary:
      "Site de um estúdio de arquitetura. Pouca animação, muita luz: os projetos entram como plantas, não como slides.",
    role: "Design e front-end",
    image: "/work/norte.jpg",
    link: "",
    hidden: false,
  },
];

export function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false;
  const project = value as Record<string, unknown>;
  return (
    typeof project.id === "string" &&
    typeof project.title === "string" &&
    typeof project.year === "string" &&
    typeof project.discipline === "string" &&
    typeof project.summary === "string" &&
    typeof project.role === "string" &&
    typeof project.image === "string" &&
    typeof project.link === "string" &&
    (project.hidden === undefined || typeof project.hidden === "boolean")
  );
}
