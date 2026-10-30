import { createServerFn } from "@tanstack/react-start";

const COOKIE = "cm_studio";

export const getStudioAccess = createServerFn({ method: "GET" }).handler(async () => {
  const { getCookie } = await import("@tanstack/react-start/server");
  const { studioToken } = await import("./studio-secret.server");
  return { open: getCookie(COOKIE) === studioToken() };
});

export const openStudio = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => {
    if (!data || typeof data.password !== "string" || data.password.length > 200) {
      throw new Error("Senha inválida");
    }
    return { password: data.password };
  })
  .handler(async ({ data }) => {
    const { getRequestProtocol, setCookie } = await import("@tanstack/react-start/server");
    const { studioPassword, studioToken } = await import("./studio-secret.server");
    if (data.password !== studioPassword()) return { open: false };
    setCookie(COOKIE, studioToken(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: getRequestProtocol() === "https",
    });
    return { open: true };
  });
