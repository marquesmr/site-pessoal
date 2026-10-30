import { useCallback, useEffect, useState } from "react";

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

const KEY = "cm-portfolio-v1";
const EVENT = "cm-portfolio";

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

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.title === "string" &&
    typeof p.year === "string" &&
    typeof p.discipline === "string" &&
    typeof p.summary === "string" &&
    typeof p.role === "string" &&
    typeof p.image === "string" &&
    typeof p.link === "string" &&
    (p.hidden === undefined || typeof p.hidden === "boolean")
  );
}

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return seedProjects;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return seedProjects;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return seedProjects;
    const projects = parsed.filter(isProject).map((project) => ({
      ...project,
      hidden: project.hidden === true,
    }));
    return projects.length > 0 ? projects : seedProjects;
  } catch {
    return seedProjects;
  }
}

export function saveProjects(projects: Project[]) {
  window.localStorage.setItem(KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event(EVENT));
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(seedProjects);

  useEffect(() => {
    setProjects(loadProjects());
    const sync = () => setProjects(loadProjects());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((next: Project[]) => {
    saveProjects(next);
    setProjects(next);
  }, []);

  return { projects, update };
}

export const emptyDraft = {
  title: "",
  year: String(new Date().getFullYear()),
  discipline: "Identidade",
  summary: "",
  role: "",
  image: "",
  link: "",
};

export type Draft = typeof emptyDraft;
