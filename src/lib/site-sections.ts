export const siteSections = [
  { id: "projetos", label: "Projetos", href: "/#projetos" },
  { id: "servicos", label: "Serviços", href: "/#servicos" },
  { id: "pacotes", label: "Pacotes", href: "/#pacotes" },
  { id: "metodo", label: "Método", href: "/#metodo" },
  { id: "estudio", label: "Estúdio", href: "/#estudio" },
  { id: "orcamento", label: "Orçamento", href: "/#orcamento" },
] as const;

export type SectionId = (typeof siteSections)[number]["id"];

export function numberedSections(hidden: readonly string[]) {
  return siteSections
    .filter((section) => !hidden.includes(section.id))
    .map((section, index) => ({
      ...section,
      index: String(index + 1).padStart(2, "0"),
    }));
}
