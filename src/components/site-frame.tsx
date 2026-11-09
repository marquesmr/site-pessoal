import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

const EMAIL = "contato@marquestecnologies.com";

const menu = [
  { href: "/#projetos", label: "Projetos", index: "01" },
  { href: "/#servicos", label: "Serviços", index: "02" },
  { href: "/#pacotes", label: "Pacotes", index: "03" },
  { href: "/#metodo", label: "Método", index: "04" },
  { href: "/#estudio", label: "Estúdio", index: "05" },
  { href: "/#orcamento", label: "Orçamento", index: "06" },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="flex items-baseline gap-3">
            <span className="font-sans text-lg font-extrabold tracking-[-0.03em]">CARLOS MARQUES</span>
            <span className="hidden font-mono text-[10px] tracking-[0.26em] text-mute uppercase sm:block">
              web & design
            </span>
          </Link>
          <div className="flex items-center gap-7">
            <a
              href="/#orcamento"
              className="hidden font-mono text-[11px] tracking-[0.2em] uppercase transition-colors hover:text-oxide md:block"
            >
              Orçamento ↗
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={open}
              className="flex min-h-11 items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] uppercase"
            >
              Menu
              <span className="flex flex-col gap-1">
                <span className="block h-px w-5 bg-ink" />
                <span className="block h-px w-5 bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-ink text-paper transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-paper/15 px-5 md:px-10">
            <span className="font-sans text-lg font-extrabold tracking-[-0.03em]">CARLOS MARQUES</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="min-h-11 font-mono text-[11px] tracking-[0.2em] text-paper/70 uppercase hover:text-oxide"
            >
              Fechar ✕
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 py-4 md:px-10 md:py-6">
            <ul>
              {menu.map((item) => (
                <li key={item.href} className="border-b border-paper/10">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between py-3 md:py-4"
                  >
                    <span className="flex items-baseline gap-4 md:gap-8">
                      <span className="font-mono text-[10px] text-oxide">{item.index}</span>
                      <span className="font-sans text-[11vw] leading-[0.95] font-semibold tracking-[-0.04em] uppercase transition-transform duration-500 group-hover:translate-x-2 md:text-[4.8vw]">
                        {item.label}
                      </span>
                    </span>
                    <span className="hidden font-mono text-xs text-paper/40 sm:block">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid shrink-0 grid-cols-2 gap-5 border-t border-paper/15 px-5 py-6 md:grid-cols-3 md:px-10">
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase">E-mail</p>
              <a href={`mailto:${EMAIL}`} className="mt-1 block text-sm break-all hover:text-oxide">
                {EMAIL}
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase">Estúdio</p>
              <p className="mt-1 text-sm">Mário Campos, MG</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase">Agenda</p>
              <p className="mt-1 text-sm">Vagas limitadas</p>
            </div>
          </div>
        </div>
      </div>

      {children}

      <footer className="border-t border-line bg-paper px-5 pt-12 pb-8 md:px-10 md:pt-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="max-w-sm text-mute">
                Desenvolvimento web e design gráfico. Identidades, sites e produtos digitais feitos com precisão.
              </p>
              <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-mute uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-oxide opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-oxide" />
                </span>
                Sistema online{time ? ` · ${time} BRT` : ""}
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="label">Navegação</p>
              <ul className="mt-3 grid grid-cols-2 gap-y-1.5 md:grid-cols-1">
                {menu.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm transition-colors hover:text-oxide">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <p className="label">Contato</p>
              <a href={`mailto:${EMAIL}`} className="mt-3 block text-sm break-all transition-colors hover:text-oxide">
                {EMAIL}
              </a>
              <p className="mt-4 text-xs text-mute">Mário Campos, MG</p>
            </div>
          </div>
          <div className="mt-12 overflow-hidden border-t border-line pt-6">
            <p className="font-sans text-[16vw] leading-[0.78] font-extrabold tracking-[-0.05em] uppercase select-none md:text-[14vw]">
              Marques
              <span className="text-oxide">®</span>
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2 border-t border-line pt-5 font-mono text-[10px] tracking-[0.2em] text-mute uppercase md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Carlos Marques</span>
            <span>Feito no estúdio · Mário Campos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
