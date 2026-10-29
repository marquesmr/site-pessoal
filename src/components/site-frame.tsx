import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const links = [
  { href: "/#trabalhos", label: "Trabalhos" },
  { href: "/#metodo", label: "Método" },
  { href: "/#contato", label: "Contato" },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <Link to="/" className="font-serif text-lg leading-none tracking-tight">
            Carlos Marques
          </Link>
          <nav className="hidden items-center gap-6 text-sm sm:flex">
            {links.map((item) => (
              <a key={item.href} href={item.href} className="text-mute hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <Link
            to="/estudio"
            className="inline-flex h-11 items-center border border-ink px-4 text-sm hover:bg-ink hover:text-paper"
          >
            Estúdio
          </Link>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-5 border-t border-line px-5 py-2.5 text-sm sm:hidden">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="text-mute">
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      {children}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>Carlos Marques · Mário Campos, MG</p>
          <p>Programador e design gráfico</p>
        </div>
      </footer>
    </div>
  );
}
