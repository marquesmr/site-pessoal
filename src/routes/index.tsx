import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site-frame";
import { useProjects } from "@/lib/portfolio";

export const Route = createFileRoute("/")({ component: Home });

const principles = [
  {
    n: "01",
    title: "O olho primeiro",
    text: "Hierarquia antes de ornamento. Se a peça precisa de explicação, ela ainda não está pronta.",
  },
  {
    n: "02",
    title: "Código também é forma",
    text: "O site não é um PDF animado. Tipografia, ritmo e performance entram no mesmo desenho.",
  },
  {
    n: "03",
    title: "Poucas decisões",
    text: "Uma paleta, um gesto, um sistema. O resto é corte — e o corte é o trabalho.",
  },
];

function Home() {
  const { projects } = useProjects();
  const visible = projects.filter((project) => !project.hidden);

  return (
    <SiteFrame>
      <main>
        <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-8 pt-10 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-7">
            <div className="grid w-max max-w-full grid-cols-[min-content]">
              <h1 className="font-serif text-6xl leading-[0.86] tracking-tight sm:text-7xl lg:text-8xl">
                Carlos
                <br />
                Marques
              </h1>
              <p className="mt-5 min-w-0 text-justify text-base leading-snug text-mute sm:mt-6 sm:text-lg">
                Programador e designer gráfico. Trabalho entre a marca e a interface — identidades, sites e
                produtos com uma linguagem própria: clara, tátil e contemporânea.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure>
              <img
                src="/work/mesa.jpg"
                alt="Mesa de trabalho com papel, tinta ferrugem e uma xícara de cerâmica"
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs tracking-[0.18em] text-mute uppercase">
                <span>Estúdio</span>
                <span>Papel, tinta, código</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col gap-6 px-5 pb-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-2xl leading-snug text-balance italic sm:text-3xl">
            Tem um projeto em mente?
            <span className="not-italic text-oxide"> Vamos dar forma a ele.</span>
          </p>
          <a
            href="#contato"
            className="inline-flex h-12 shrink-0 items-center justify-center bg-oxide px-6 text-paper hover:bg-oxide-deep"
          >
            Escrever agora
          </a>
        </section>

        <section id="trabalhos" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 pt-12">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">Trabalhos</h2>
              <p className="hidden text-sm text-mute sm:block">Seleção recente</p>
            </div>
            <ol className="mt-4">
              {visible.map((project, index) => (
                <li key={project.id} className="border-b border-line py-10 lg:py-14">
                  <article className="grid items-start gap-6 lg:grid-cols-12 lg:gap-10">
                    <div className={index % 2 === 1 ? "lg:order-2 lg:col-span-5" : "lg:col-span-4"}>
                      <p className="font-serif text-sm text-oxide tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-serif text-4xl leading-[0.95] tracking-tight text-balance sm:text-5xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm text-mute">
                        {project.discipline} · {project.year}
                      </p>
                      <p className="mt-4 max-w-sm text-justify leading-relaxed">{project.summary}</p>
                      <p className="mt-4 text-sm text-mute">{project.role}</p>
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex h-11 items-center border border-ink px-4 text-sm hover:bg-ink hover:text-paper"
                        >
                          Abrir projeto
                        </a>
                      ) : null}
                    </div>
                    <figure className={index % 2 === 1 ? "lg:order-1 lg:col-span-7" : "lg:col-span-8"}>
                      <div className="overflow-hidden bg-paper-2">
                        <img
                          src={project.image}
                          alt=""
                          className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.03]"
                        />
                      </div>
                    </figure>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="metodo" className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
            <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">Método</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {principles.map((item) => (
                <article key={item.n}>
                  <p className="font-serif text-oxide tabular-nums">{item.n}</p>
                  <h3 className="mt-3 font-serif text-2xl tracking-tight">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-pretty text-paper-2">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <p className="text-xs tracking-[0.28em] text-mute uppercase">Contato</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.92] tracking-tight text-balance sm:text-7xl">
            Escreva.
            <br />
            Eu respondo.
          </h2>
          <a
            href="mailto:contato@marquestecnologies.com?subject=Projeto%20com%20Carlos%20Marques"
            className="mt-8 inline-block font-serif text-2xl text-oxide underline decoration-line underline-offset-8 hover:text-oxide-deep sm:text-4xl"
          >
            contato@marquestecnologies.com
          </a>
          <p className="mt-6 max-w-md leading-relaxed text-pretty text-mute">
            Identidade, site ou produto. Manda o contexto — mesmo que ainda esteja solto. A gente acerta a forma
            depois.
          </p>
        </section>
      </main>
    </SiteFrame>
  );
}
