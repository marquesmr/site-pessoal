import { useCallback, useEffect, useState } from "react";
import { isProject, seedProjects, type Project } from "./portfolio-data";

export type { Project };
export { seedProjects };

const KEY = "cm-portfolio-v1";

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

async function listPublic() {
  const { listPublicProjects } = await import("./portfolio-api");
  return listPublicProjects();
}

async function saveRemote(projects: Project[]) {
  const { savePublicProjects } = await import("./portfolio-api");
  return savePublicProjects({ data: { projects } });
}

export function isUntouched(projects: Project[]) {
  if (projects.length !== seedProjects.length) return false;
  return seedProjects.every(
    (seed, index) =>
      projects[index]?.id === seed.id &&
      projects[index]?.summary === seed.summary &&
      projects[index]?.hidden !== true,
  );
}

export function useProjects(options?: { migrateLocal?: boolean; initial?: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(options?.initial ?? seedProjects);
  const [ready, setReady] = useState(Boolean(options?.initial));

  useEffect(() => {
    let live = true;
    listPublic()
      .then((remote) => {
        if (!live) return;
        if (!options?.migrateLocal) {
          setProjects(remote);
          return;
        }
        const localRaw = window.localStorage.getItem(KEY);
        const local = loadProjects();
        if (localRaw && isUntouched(remote) && !isUntouched(local)) {
          return saveRemote(local).then((saved) => {
            if (live) setProjects(saved);
          });
        }
        window.localStorage.setItem(KEY, JSON.stringify(remote));
        setProjects(remote);
      })
      .catch(() => {
        if (live && options?.migrateLocal) setProjects(loadProjects());
      })
      .finally(() => {
        if (live) setReady(true);
      });
    return () => {
      live = false;
    };
  }, [options?.migrateLocal]);

  const update = useCallback(async (next: Project[]) => {
    const saved = await saveRemote(next);
    setProjects(saved);
    window.localStorage.setItem(KEY, JSON.stringify(saved));
    return saved;
  }, []);

  return { projects, update, ready };
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
