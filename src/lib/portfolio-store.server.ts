import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { isProject, seedProjects, type Project } from "./portfolio-data";

const FILE = join(process.cwd(), ".data", "portfolio.json");
const JSON_PATH = "portfolio.json";

function normalize(value: unknown): Project[] | null {
  if (!Array.isArray(value)) return null;
  return value.filter(isProject).map((project) => ({
    ...project,
    hidden: project.hidden === true,
    title: project.title.slice(0, 120),
    summary: project.summary.slice(0, 2000),
    link: project.link.slice(0, 400),
  }));
}

async function readFileStore(): Promise<Project[] | null> {
  try {
    return normalize(JSON.parse(await readFile(FILE, "utf8")));
  } catch {
    return null;
  }
}

async function writeFileStore(projects: Project[]) {
  await mkdir(join(process.cwd(), ".data"), { recursive: true });
  await writeFile(FILE, JSON.stringify(projects));
}

async function storeImage(project: Project): Promise<Project> {
  if (!project.image.startsWith("data:") || !process.env.BLOB_READ_WRITE_TOKEN) return project;
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/.exec(project.image);
  if (!match) return project;
  const { put } = await import("@vercel/blob");
  const type = match[1] === "image/png" ? "image/png" : "image/jpeg";
  const ext = type === "image/png" ? "png" : "jpg";
  const saved = await put(`works/${project.id}.${ext}`, Buffer.from(match[2], "base64"), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: type,
    cacheControlMaxAge: 60,
  });
  return { ...project, image: saved.url };
}

export async function readPortfolio(): Promise<Project[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return (await readFileStore()) ?? seedProjects;
  }
  const { get } = await import("@vercel/blob");
  const blob = await get(JSON_PATH, { access: "public", useCache: false });
  if (!blob) return seedProjects;
  const text = await new Response(blob.stream).text();
  try {
    return normalize(JSON.parse(text)) ?? seedProjects;
  } catch {
    return seedProjects;
  }
}

export async function writePortfolio(projects: Project[]): Promise<Project[]> {
  const stored = await Promise.all(projects.map(storeImage));
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    await writeFileStore(stored);
    return stored;
  }
  const { put } = await import("@vercel/blob");
  await put(JSON_PATH, JSON.stringify(stored), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
  return stored;
}
