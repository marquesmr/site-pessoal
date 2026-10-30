import { createHash } from "node:crypto";

export function studioPassword() {
  return process.env.STUDIO_PASSWORD || "marques-estudio";
}

export function studioToken() {
  return createHash("sha256").update(`cm-studio:${studioPassword()}`).digest("hex");
}
