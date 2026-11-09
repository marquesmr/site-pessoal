import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const IDS = new Set(["projetos", "servicos", "pacotes", "metodo", "estudio", "orcamento"]);
const FILE = join(process.cwd(), ".data", "sections.json");
const JSON_PATH = "sections.json";

function normalize(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string => typeof item === "string" && IDS.has(item)))];
}

async function readFileStore(): Promise<string[] | null> {
  try {
    return normalize(JSON.parse(await readFile(FILE, "utf8")));
  } catch {
    return null;
  }
}

async function writeFileStore(hidden: string[]) {
  await mkdir(join(process.cwd(), ".data"), { recursive: true });
  await writeFile(FILE, JSON.stringify(hidden));
}

export async function readHiddenSections(): Promise<string[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return (await readFileStore()) ?? [];
  }
  const { get } = await import("@vercel/blob");
  const blob = await get(JSON_PATH, { access: "public", useCache: false });
  if (!blob) return [];
  try {
    return normalize(JSON.parse(await new Response(blob.stream).text()));
  } catch {
    return [];
  }
}

export async function writeHiddenSections(hidden: string[]): Promise<string[]> {
  const stored = normalize(hidden);
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
