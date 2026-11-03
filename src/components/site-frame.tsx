import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const links = [
  { href: "/#trabalhos", label: "Trabalhos" },
  { href: "/#metodo", label: "Método" },
  { href: "/#contato", label: "Contato" },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3.5">
          <Link to="/" className="font-serif text-lg leading-none tracking-tight">
            Carlos Marques
          </Link>
          <nav className="flex items-center gap-1 text-sm sm:gap-2">
            {links.map((item) => (
              <a key={item.href} href={item.href} className="inline-flex h-11 items-center px-2 text-mute hover:text-ink sm:px-3">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
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
