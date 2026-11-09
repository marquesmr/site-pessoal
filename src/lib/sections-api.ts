import { createServerFn } from "@tanstack/react-start";

const IDS = new Set(["projetos", "servicos", "pacotes", "metodo", "estudio", "orcamento"]);

function asHidden(value: unknown): string[] {
  if (!Array.isArray(value) || value.length > 12) throw new Error("Lista inválida");
  return [...new Set(value.filter((item): item is string => typeof item === "string" && IDS.has(item)))];
}

export const listHiddenSections = createServerFn({ method: "POST" }).handler(async () => {
  const { readHiddenSections } = await import("./sections-store.server");
  return readHiddenSections();
});

export const saveHiddenSections = createServerFn({ method: "POST" })
  .validator((data: { hidden: unknown }) => ({ hidden: asHidden(data?.hidden) }))
  .handler(async ({ data }) => {
    const { getCookie } = await import("@tanstack/react-start/server");
    const { studioToken } = await import("./studio-secret.server");
    if (getCookie("cm_studio") !== studioToken()) throw new Error("Acesso negado");
    const { writeHiddenSections } = await import("./sections-store.server");
    return writeHiddenSections(data.hidden);
  });
