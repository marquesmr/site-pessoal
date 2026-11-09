import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { SiteFrame } from "@/components/site-frame";
import { listPublicProjects } from "@/lib/portfolio-api";
import { useProjects, type Project } from "@/lib/portfolio";

const EMAIL = "contato@marquestecnologies.com";

export const Route = createFileRoute("/")({
  loader: () => listPublicProjects(),
  headers: () => ({ "Cache-Control": "private, no-store" }),
  component: Home,
});

const skills = [
  "Desenvolvimento web",
  "UI/UX",
  "Identidade visual",
  "E-commerce",
  "Landing pages",
  "Design editorial",
  "Design systems",
  "Performance",
];

const facts = [
  { value: "4", label: "etapas de trabalho" },
  { value: "1", label: "dia para responder" },
  { value: "4–8", label: "semanas de entrega" },
  { value: "3", label: "formas de começar" },
];

const services = [
  { name: "Identidade visual", desc: "Logo, sistema tipográfico, paleta, papelaria e manual de marca.", price: "R$ 4.500" },
  { name: "Landing page", desc: "Uma página, um objetivo: narrativa, conversão e performance.", price: "R$ 2.900" },
  { name: "E-commerce", desc: "Loja própria com catálogo, checkout e operação integrada.", price: "R$ 12.900" },
  { name: "Design editorial", desc: "Catálogos, revistas digitais e materiais impressos.", price: "R$ 3.200" },
  { name: "Manutenção mensal", desc: "Evolução contínua, backups, monitoramento e ajustes finos.", price: "R$ 890/mês" },
  { name: "Social kit", desc: "Templates de posts e stories alinhados à marca.", price: "R$ 1.800" },
];

const packages = [
  {
    id: "start",
    number: "01",
    name: "Start",
    summary: "Para quem precisa existir bem na internet, rápido.",
    price: "a partir de R$ 6.900",
    items: ["Site institucional até 6 páginas", "Copy assistida e estrutura de conteúdo", "SEO técnico e analytics", "Formulário de contato", "30 dias de suporte"],
    highlight: false,
  },
  {
    id: "estudio",
    number: "02",
    name: "Estúdio",
    summary: "Marca e site nascem juntos, com o mesmo sistema.",
    price: "a partir de R$ 14.900",
    items: ["Identidade visual completa", "Site com design system próprio", "Até 12 páginas + blog", "Integrações com CRM, e-mail e pagamentos", "90 dias de acompanhamento"],
    highlight: true,
  },
  {
    id: "sob-medida",
    number: "03",
    name: "Sob medida",
    summary: "Produto digital, loja ou operação que precisa de software.",
    price: "a partir de R$ 29.000",
    items: ["Discovery e arquitetura do produto", "Interface e protótipo navegável", "Front-end e back-end sob medida", "Painel administrativo", "Acompanhamento dedicado"],
    highlight: false,
  },
];

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    lead: "Entender antes de desenhar.",
    body: "Conversa com você, análise de concorrentes e mapa de conteúdo. Sai daqui um documento curto e claro: objetivo, público e métricas.",
    deliverable: "Briefing + mapa do site",
    tools: ["Entrevistas", "Benchmark", "Arquitetura", "Métricas"],
  },
  {
    number: "02",
    title: "Design",
    lead: "A marca encontra a forma.",
    body: "Direção de arte, wireframes e protótipo navegável. Nada avança sem aprovação visual — você vê a página funcionando antes do código.",
    deliverable: "Protótipo navegável",
    tools: ["Figma", "Design system", "Tipografia", "Motion"],
  },
  {
    number: "03",
    title: "Desenvolvimento",
    lead: "Precisão em cada breakpoint.",
    body: "Front-end componentizado, um jeito de você editar sozinho e integrações com o que já usa. Performance e acessibilidade entram como requisito, não como acabamento.",
    deliverable: "Site publicado e editável",
    tools: ["React", "TypeScript", "Tailwind", "CMS"],
  },
  {
    number: "04",
    title: "Lançamento",
    lead: "No ar, medido e evoluindo.",
    body: "QA em dispositivos reais, publicação, passagem do projeto e um mês de acompanhamento. Depois disso, evolução contínua se você quiser.",
    deliverable: "Publicação + 30 dias",
    tools: ["QA", "Deploy", "Analytics", "SEO"],
  },
];

const projectTypes = ["Site institucional", "Loja virtual", "Identidade visual", "Produto digital", "Outro"];
const budgets = ["Até R$ 5 mil", "R$ 5 mil a R$ 15 mil", "R$ 15 mil a R$ 30 mil", "Acima de R$ 30 mil"];
const deadlines = ["Para ontem", "Em 1 a 3 meses", "Sem pressa"];

function Home() {
  const initial = Route.useLoaderData();
  const { projects } = useProjects({ initial });
  const visible = projects.filter((project) => !project.hidden);
  const featured = visible.slice(0, 4);
  const rest = visible.slice(4);

  return (
    <SiteFrame>
      <main>
        <Hero />
        <Marquee />
        <Projects featured={featured} rest={rest} />
        <Services />
        <Packages />
        <Method />
        <Studio />
        <Budget />
      </main>
    </SiteFrame>
  );
}

function Hero() {
  return (
    <section id="top" className="pt-16">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex items-center justify-between border-b border-line py-3">
          <span className="label">Estúdio independente · Mário Campos, MG</span>
          <span className="label hidden sm:block">programador e design gráfico</span>
        </div>
        <div className="grid gap-8 py-10 md:grid-cols-12 md:gap-8 md:py-16">
          <div className="md:col-span-8">
            <h1 className="rise font-sans text-[13.5vw] leading-[0.86] font-extrabold tracking-[-0.045em] uppercase md:text-[8vw]">
              Marcas com
              <span className="mt-1 block font-serif text-[16vw] font-normal tracking-[-0.02em] normal-case italic md:text-[8.6vw]">
                estrutura
              </span>
              <span className="block">
                de código
                <span className="text-oxide">.</span>
              </span>
            </h1>
          </div>
          <div className="md:col-span-4 md:pt-3">
            <p className="rise-2 max-w-sm text-[17px] leading-relaxed text-mute md:text-lg">
              Desenvolvimento web e design gráfico. Crio identidades, sites e produtos digitais para negócios que
              precisam ser levados a sério.
            </p>
            <div className="rise-3 mt-8 flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href="#projetos"
                className="flex min-h-[52px] items-center justify-center gap-2 bg-oxide px-6 font-mono text-[11px] tracking-[0.2em] text-white uppercase transition-colors hover:bg-ink"
              >
                Ver projetos <span aria-hidden>↘</span>
              </a>
              <a
                href="#orcamento"
                className="flex min-h-[52px] items-center justify-center border border-line px-6 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                Pedir orçamento
              </a>
            </div>
            <div className="mt-9 border-t border-line pt-4">
              <p className="label">Agenda aberta para novos projetos</p>
              <p className="mt-1.5 text-sm text-mute">Resposta em até 1 dia útil.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="relative h-[38vh] overflow-hidden border border-line md:h-[58vh]">
          <img
            src="/work/refracao.jpg"
            alt="Prisma de vidro refratando luz âmbar sobre superfície escura"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-6">
            <span className="font-mono text-[10px] tracking-[0.24em] text-white/90 uppercase">
              FIG. 01 — Refração / processo de design
            </span>
            <span className="hidden font-mono text-[10px] tracking-[0.24em] text-white/70 uppercase sm:block">
              Mário Campos
            </span>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-px border-x border-b border-line bg-ink/15 md:grid-cols-4">
          {facts.map((item) => (
            <div key={item.label} className="bg-paper px-4 py-6 md:px-6">
              <dt className="font-sans text-4xl font-semibold tracking-[-0.03em] md:text-5xl">{item.value}</dt>
              <dd className="label mt-2">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Marquee() {
  const loop = [...skills, ...skills];
  return (
    <div className="mt-10 overflow-hidden border-y border-line bg-ink py-3.5 md:mt-14">
      <div className="marquee-track flex w-max items-center">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center font-mono text-[11px] tracking-[0.26em] text-paper/75 uppercase">
            <span className="px-6">{item}</span>
            <span className="text-oxide" aria-hidden>
              ◦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({
  index,
  label,
  title,
  note,
}: {
  index: string;
  label: string;
  title: ReactNode;
  note?: string;
}) {
  return (
    <div className="grid gap-6 border-b border-line pb-7 md:grid-cols-12 md:items-end md:gap-8">
      <div className="md:col-span-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-oxide">{index}</span>
          <span className="label">{label}</span>
        </div>
        <h2 className="mt-4 font-sans text-[10.5vw] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase md:text-[4.2vw]">
          {title}
        </h2>
      </div>
      {note ? <p className="max-w-sm text-mute md:col-span-4 md:pb-2">{note}</p> : null}
    </div>
  );
}

function Projects({ featured, rest }: { featured: Project[]; rest: Project[] }) {
  return (
    <section id="projetos" className="mx-auto max-w-[1600px] scroll-mt-16 px-5 pt-16 md:px-10 md:pt-24">
      <SectionHead
        index="01"
        label="Portfólio"
        title={
          <>
            Arquivo <span className="font-serif font-normal normal-case italic">vivo</span>
          </>
        }
        note="Trabalhos recentes. O que entra aqui é publicado no estúdio e aparece para todo mundo."
      />
      <div className="grid gap-12 pt-10 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
        {featured.map((project, index) => (
          <article key={project.id} className={index % 2 === 1 ? "md:mt-16" : ""}>
            <div className="group relative overflow-hidden border border-line bg-paper-2">
              <img
                src={project.image || "/work/mesa.jpg"}
                alt=""
                className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] md:h-[380px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/60" />
              <div className="pointer-events-none absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-7">
                <p className="max-w-xs text-sm text-paper">{project.role}</p>
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-3">
              <h3 className="font-sans text-xl font-semibold tracking-[-0.02em] md:text-2xl">{project.title}</h3>
              <span className="label shrink-0">
                {project.discipline} · {project.year}
              </span>
            </div>
            <p className="mt-2 max-w-md text-justify hyphens-auto text-mute">{project.summary}</p>
            {project.link ? (
              <a href={project.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm hover:text-oxide">
                Abrir projeto ↗
              </a>
            ) : null}
          </article>
        ))}
      </div>
      {rest.length > 0 ? (
        <div className="mt-16 md:mt-24">
          <p className="label border-b border-line pb-3">Outros projetos</p>
          <ul>
            {rest.map((project) => (
              <li key={project.id} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                <span className="font-sans text-lg font-medium tracking-[-0.01em] md:text-xl">{project.title}</span>
                <span className="label text-right">
                  {project.discipline} · {project.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="mx-auto max-w-[1600px] scroll-mt-16 px-5 pt-16 md:px-10 md:pt-24">
      <SectionHead
        index="02"
        label="Serviços"
        title={
          <>
            Peças <span className="font-serif font-normal normal-case italic">sob medida</span>
          </>
        }
        note="Contrate o que falta. Cada item inclui direção de arte, entrega organizada e arquivos abertos."
      />
      <div>
        {services.map((item, index) => (
          <div
            key={item.name}
            className="grid gap-2 border-b border-line py-5 transition-colors duration-300 hover:bg-white/40 md:grid-cols-12 md:items-baseline md:gap-6 md:py-6"
          >
            <span className="label md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="font-sans text-2xl font-semibold tracking-[-0.02em] md:col-span-4 md:text-3xl">{item.name}</h3>
            <p className="text-mute md:col-span-5">{item.desc}</p>
            <span className="font-mono text-sm md:col-span-2 md:text-right">{item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="pacotes" className="mx-auto max-w-[1600px] scroll-mt-16 px-5 pt-16 md:px-10 md:pt-24">
      <SectionHead
        index="03"
        label="Pacotes"
        title={
          <>
            Três formas de <span className="font-serif font-normal normal-case italic">começar</span>
          </>
        }
        note="Escopo fechado, prazo definido e pagamento em etapas. Se o caso não couber, montamos um escopo do zero."
      />
      <div className="grid gap-px border border-line bg-ink/15 md:grid-cols-3">
        {packages.map((item) => (
          <div key={item.id} className={`flex flex-col p-6 md:p-8 ${item.highlight ? "bg-ink text-paper" : "bg-paper"}`}>
            <div className="flex items-baseline justify-between">
              <span className={`font-mono text-[11px] ${item.highlight ? "text-oxide" : "text-mute"}`}>{item.number}</span>
              {item.highlight ? (
                <span className="font-mono text-[10px] tracking-[0.2em] text-oxide uppercase">mais escolhido</span>
              ) : null}
            </div>
            <h3 className="mt-4 font-sans text-3xl font-bold tracking-[-0.03em] uppercase md:text-4xl">{item.name}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${item.highlight ? "text-paper/70" : "text-mute"}`}>{item.summary}</p>
            <p className={`mt-5 border-t pt-4 font-mono text-sm ${item.highlight ? "border-paper/20" : "border-line"}`}>
              {item.price}
            </p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {item.items.map((line) => (
                <li key={line} className={`flex gap-2.5 text-sm ${item.highlight ? "text-paper/85" : "text-ink/80"}`}>
                  <span className="text-oxide" aria-hidden>
                    /
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <a
              href="#orcamento"
              className={`mt-7 flex min-h-12 items-center justify-center font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${item.highlight ? "bg-oxide text-white hover:bg-paper hover:text-ink" : "border border-line hover:bg-ink hover:text-paper"}`}
            >
              Pedir proposta
            </a>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-mute">
        Valores de referência para escopo padrão. Conteúdo, integrações e prazo alteram o investimento — o orçamento sai
        em até 1 dia útil.
      </p>
    </section>
  );
}

function Method() {
  const [open, setOpen] = useState(steps[0].number);
  return (
    <section id="metodo" className="mx-auto max-w-[1600px] scroll-mt-16 px-5 pt-16 md:px-10 md:pt-24">
      <SectionHead
        index="04"
        label="Método"
        title={
          <>
            Quatro etapas, <span className="font-serif font-normal normal-case italic">zero</span> surpresa
          </>
        }
        note="Um processo curto e visível. Você sabe o que acontece em cada semana e o que precisa ser aprovado."
      />
      <div>
        {steps.map((step) => {
          const active = open === step.number;
          return (
            <div key={step.number} className="border-b border-line">
              <button
                type="button"
                aria-expanded={active}
                onClick={() => setOpen(active ? "" : step.number)}
                className="flex w-full items-baseline gap-5 py-5 text-left md:gap-8 md:py-6"
              >
                <span className={`font-mono text-[11px] ${active ? "text-oxide" : "text-mute"}`}>{step.number}</span>
                <span className="flex-1">
                  <span className="block font-sans text-2xl font-semibold tracking-[-0.02em] uppercase md:text-4xl">
                    {step.title}
                  </span>
                  <span className="mt-1 block text-sm text-mute md:text-base">{step.lead}</span>
                </span>
                <span className={`font-mono text-xl leading-none transition-transform duration-300 ${active ? "rotate-45 text-oxide" : "text-mute"}`} aria-hidden>
                  +
                </span>
              </button>
              <div className={`grid overflow-hidden transition-all duration-500 ${active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="min-h-0">
                  <div className="grid gap-6 pb-8 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-1" />
                    <p className="text-mute md:col-span-6 md:text-lg">{step.body}</p>
                    <div className="md:col-span-5">
                      <p className="label">Ferramentas</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {step.tools.map((tool) => (
                          <span key={tool} className="border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-mute uppercase">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <p className="label mt-6">Você recebe</p>
                      <p className="mt-1.5 text-sm">{step.deliverable}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section id="estudio" className="mx-auto max-w-[1600px] scroll-mt-16 px-5 pt-16 md:px-10 md:pt-24">
      <SectionHead
        index="05"
        label="Estúdio"
        title={
          <>
            Desenho e <span className="font-serif font-normal normal-case italic">código</span> no mesmo lugar
          </>
        }
      />
      <div className="grid gap-10 pt-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <p className="max-w-2xl font-sans text-xl leading-snug tracking-[-0.01em] md:text-[1.75rem]">
            Quem desenha também escreve e programa. Isso encurta o caminho entre a ideia e o site no ar — sem camadas de
            e-mail, sem perda de intenção no meio.
          </p>
          <p className="mt-6 max-w-xl text-mute">
            Poucos projetos por vez. Você fala direto com quem entrega, com revisões ao longo do caminho e um ambiente
            para ver tudo antes de publicar.
          </p>
          <div className="mt-8 grid gap-px border border-line bg-ink/15 sm:grid-cols-2">
            <div className="bg-paper px-5 py-5">
              <p className="label">Design + desenvolvimento</p>
              <p className="mt-2 text-sm text-mute">Marca, interface e código sob o mesmo teto.</p>
            </div>
            <div className="bg-paper px-5 py-5">
              <p className="label">Entrega em 4 a 8 semanas</p>
              <p className="mt-2 text-sm text-mute">Cronograma com datas de aprovação definidas na semana 1.</p>
            </div>
          </div>
        </div>
        <div className="md:col-span-5">
          <figure className="border border-line">
            <img src="/work/mesa.jpg" alt="Mesa de trabalho com papel, tinta e cerâmica" className="aspect-[4/5] w-full object-cover" />
            <figcaption className="flex items-baseline justify-between gap-4 border-t border-line px-5 py-4">
              <span className="font-sans text-sm font-semibold">Carlos Marques</span>
              <span className="label">Mário Campos</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const fieldClass =
  "min-h-12 w-full border-b border-paper/25 bg-transparent py-3 text-paper placeholder:text-paper/35 focus:border-oxide focus:outline-none";

function Budget() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    project_type: projectTypes[0],
    budget: budgets[1],
    deadline: deadlines[1],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function set(key: keyof typeof form) {
    return (event: { target: { value: string } }) => setForm((current) => ({ ...current, [key]: event.target.value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const body = [
      `Nome: ${form.name}`,
      `E-mail: ${form.email}`,
      `WhatsApp: ${form.whatsapp || "—"}`,
      `Empresa: ${form.company || "—"}`,
      `Tipo: ${form.project_type}`,
      `Investimento: ${form.budget}`,
      `Prazo: ${form.deadline}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Orçamento — ${form.project_type}`)}&body=${encodeURIComponent(body)}`;
    setStatus("done");
  }

  return (
    <section id="orcamento" className="scroll-mt-16 bg-ink px-5 py-16 text-paper md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-oxide">06</span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-paper/50 uppercase">Orçamento</span>
          </div>
          <h2 className="mt-5 font-sans text-[11vw] leading-[0.88] font-extrabold tracking-[-0.04em] uppercase md:text-[4vw]">
            Conte o
            <span className="mt-2 block font-serif text-[13vw] leading-none font-normal normal-case italic md:text-[4.4vw]">projeto</span>
          </h2>
          <p className="mt-6 max-w-sm text-paper/70">
            Quanto mais contexto, mais preciso o orçamento. A resposta vem com escopo, prazo e valor — não com uma tabela
            genérica.
          </p>
          <dl className="mt-9 space-y-4 border-t border-paper/15 pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase">Resposta</dt>
              <dd>em até 1 dia útil</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase">Reunião</dt>
              <dd>30 min, sem custo</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase">E-mail</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="break-all hover:text-oxide">
                  {EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-7">
          {status === "done" ? (
            <div className="flex h-full flex-col justify-center border border-paper/20 p-7 md:p-10">
              <span className="font-mono text-[11px] tracking-[0.24em] text-oxide uppercase">Pronto para enviar</span>
              <p className="mt-4 font-sans text-3xl leading-tight font-semibold tracking-[-0.02em] md:text-4xl">
                Obrigado, {form.name.split(" ")[0] || "tudo bem"}.
              </p>
              <p className="mt-4 max-w-md text-paper/70">
                O e-mail já está aberto com o pedido de {form.project_type.toLowerCase()}. Se não abriu, escreva para{" "}
                <span className="text-paper">{EMAIL}</span>.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 w-fit border border-paper/25 px-5 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors hover:bg-paper hover:text-ink"
              >
                Escrever outro
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nome*">
                  <input required value={form.name} onChange={set("name")} placeholder="Seu nome" className={fieldClass} />
                </Field>
                <Field label="E-mail*">
                  <input required type="email" value={form.email} onChange={set("email")} placeholder="voce@empresa.com" className={fieldClass} />
                </Field>
                <Field label="WhatsApp">
                  <input value={form.whatsapp} onChange={set("whatsapp")} placeholder="(31) 90000-0000" className={fieldClass} />
                </Field>
                <Field label="Empresa">
                  <input value={form.company} onChange={set("company")} placeholder="Nome da empresa" className={fieldClass} />
                </Field>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                <Field label="Tipo de projeto">
                  <select value={form.project_type} onChange={set("project_type")} className={fieldClass}>
                    {projectTypes.map((item) => (
                      <option key={item} className="text-ink">
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Investimento">
                  <select value={form.budget} onChange={set("budget")} className={fieldClass}>
                    {budgets.map((item) => (
                      <option key={item} className="text-ink">
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Prazo">
                  <select value={form.deadline} onChange={set("deadline")} className={fieldClass}>
                    {deadlines.map((item) => (
                      <option key={item} className="text-ink">
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="O projeto">
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="O que precisa existir, para quem, e o que já existe hoje."
                  className={`${fieldClass} min-h-32 resize-y`}
                />
              </Field>
              <button
                type="submit"
                className="flex min-h-[52px] items-center justify-center bg-oxide px-8 font-mono text-[11px] tracking-[0.2em] text-white uppercase transition-colors hover:bg-paper hover:text-ink"
              >
                Enviar pedido
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase">{label}</span>
      {children}
    </label>
  );
}
