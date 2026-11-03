import { createServerFn } from "@tanstack/react-start";
import type { Project } from "./portfolio-data";

function asProjects(value: unknown): Project[] {
  if (!Array.isArray(value) || value.length > 40) throw new Error("Lista inválida");
  return value.map((item) => {
    if (!item || typeof item !== "object") throw new Error("Lista inválida");
    const project = item as Record<string, unknown>;
    const fields = ["id", "title", "year", "discipline", "summary", "role", "image", "link"] as const;
    if (fields.some((field) => typeof project[field] !== "string")) throw new Error("Lista inválida");
    return {
      id: project.id as string,
      title: (project.title as string).slice(0, 120),
      year: (project.year as string).slice(0, 12),
      discipline: (project.discipline as string).slice(0, 80),
      summary: (project.summary as string).slice(0, 2000),
      role: (project.role as string).slice(0, 160),
      image: project.image as string,
      link: (project.link as string).slice(0, 400),
      hidden: project.hidden === true,
    };
  });
}

export const listPublicProjects = createServerFn({ method: "POST" }).handler(async () => {
  const { readPortfolio } = await import("./portfolio-store.server");
  return readPortfolio();
});

export const savePublicProjects = createServerFn({ method: "POST" })
  .validator((data: { projects: unknown }) => ({ projects: asProjects(data?.projects) }))
  .handler(async ({ data }) => {
    const { getCookie } = await import("@tanstack/react-start/server");
    const { studioToken } = await import("./studio-secret.server");
    if (getCookie("cm_studio") !== studioToken()) {
      throw new Error("Acesso negado");
    }
    const { writePortfolio } = await import("./portfolio-store.server");
    return writePortfolio(data.projects);
  });
