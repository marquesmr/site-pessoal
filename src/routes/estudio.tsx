import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { getStudioAccess, openStudio } from "@/lib/studio-gate";
import { emptyDraft, seedProjects, useProjects, type Draft, type Project } from "@/lib/portfolio";

export const Route = createFileRoute("/estudio")({
  head: () => ({
    meta: [
      { title: "Estúdio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Estudio,
});

function Estudio() {
  const [phase, setPhase] = useState<"checking" | "locked" | "open">("checking");

  useEffect(() => {
    let live = true;
    getStudioAccess()
      .then((result) => {
        if (live) setPhase(result.open ? "open" : "locked");
      })
      .catch(() => {
        if (live) setPhase("locked");
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <p className="font-serif text-lg leading-none">Estúdio</p>
          <Link to="/" className="text-sm text-mute hover:text-ink">
            Site
          </Link>
        </div>
      </header>
      {phase === "checking" ? <main className="mx-auto max-w-6xl px-5 py-16" /> : null}
      {phase === "locked" ? <Lock onOpen={() => setPhase("open")} /> : null}
      {phase === "open" ? <Editor /> : null}
    </div>
  );
}

function Lock({ onOpen }: { onOpen: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(false);
    try {
      const result = await openStudio({ data: { password } });
      if (result.open) onOpen();
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-5 py-20">
      <h1 className="font-serif text-4xl tracking-tight">Acesso privado</h1>
      <p className="mt-3 text-sm leading-relaxed text-mute">Esta área não faz parte do site público.</p>
      <form onSubmit={submit} className="mt-8 grid gap-3">
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Senha"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center bg-ink px-5 text-paper disabled:opacity-60"
        >
          {pending ? "Entrando…" : "Entrar"}
        </button>
        {error ? <p className="text-sm text-oxide">Senha incorreta.</p> : null}
      </form>
    </main>
  );
}

function Editor() {
  const { projects, update } = useProjects();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  function setField<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function onFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setField("image", reader.result);
    };
    reader.readAsDataURL(file);
  }

  function save(event: FormEvent) {
    event.preventDefault();
    const image = draft.image.trim() || "/work/mesa.jpg";
    if (editing) {
      update(
        projects.map((project) =>
          project.id === editing ? { ...project, ...draft, image } : project,
        ),
      );
      setNotice("Projeto atualizado.");
    } else {
      const project: Project = {
        id: crypto.randomUUID(),
        ...draft,
        image,
        hidden: false,
      };
      update([project, ...projects]);
      setNotice("Projeto publicado no portfólio.");
    }
    setDraft(emptyDraft);
    setEditing(null);
  }

  function edit(project: Project) {
    setEditing(project.id);
    setDraft({
      title: project.title,
      year: project.year,
      discipline: project.discipline,
      summary: project.summary,
      role: project.role,
      image: project.image,
      link: project.link,
    });
    setNotice("");
  }

  function remove(id: string) {
    update(projects.filter((project) => project.id !== id));
    if (editing === id) {
      setEditing(null);
      setDraft(emptyDraft);
    }
  }

  function toggleHidden(id: string) {
    update(projects.map((project) => (project.id === id ? { ...project, hidden: !project.hidden } : project)));
  }

  function move(index: number, direction: -1 | 1) {
    const next = [...projects];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    update(next);
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-serif text-5xl tracking-tight sm:text-6xl">Editar portfólio</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-pretty text-mute">
        Adicione, reordene ou oculte trabalhos sem mexer em código. O que estiver oculto sai da página inicial.
      </p>

      <form onSubmit={save} className="mt-10 grid gap-8 border border-line bg-paper-2/40 p-5 sm:p-8 lg:grid-cols-12">
        <div className="grid gap-4 lg:col-span-7">
          <h2 className="font-serif text-2xl">{editing ? "Editar trabalho" : "Novo trabalho"}</h2>
          <Field label="Título">
            <input
              required
              value={draft.title}
              onChange={(event) => setField("title", event.target.value)}
              className={inputClass}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Ano">
              <input
                required
                value={draft.year}
                onChange={(event) => setField("year", event.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Disciplina">
              <input
                required
                value={draft.discipline}
                onChange={(event) => setField("discipline", event.target.value)}
                className={inputClass}
                placeholder="Identidade, site, produto…"
              />
            </Field>
          </div>
          <Field label="Descrição">
            <textarea
              required
              rows={4}
              value={draft.summary}
              onChange={(event) => setField("summary", event.target.value)}
              className="w-full border border-line bg-paper px-3 py-3 text-ink outline-none focus:border-ink"
            />
          </Field>
          <Field label="Seu papel">
            <input
              required
              value={draft.role}
              onChange={(event) => setField("role", event.target.value)}
              className={inputClass}
              placeholder="Direção de arte, front-end…"
            />
          </Field>
          <Field label="Link (opcional)">
            <input
              type="url"
              value={draft.link}
              onChange={(event) => setField("link", event.target.value)}
              className={inputClass}
              placeholder="https://"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <Field label="Imagem">
            <input
              type="url"
              value={draft.image.startsWith("data:") ? "" : draft.image}
              onChange={(event) => setField("image", event.target.value)}
              className={inputClass}
              placeholder="Cole uma URL ou envie um arquivo"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => onFile(event.target.files?.[0])}
              className="mt-3 block w-full text-sm text-mute file:mr-4 file:h-11 file:border-0 file:bg-ink file:px-4 file:text-paper"
            />
            <p className="text-sm leading-relaxed text-mute">
              No site a foto entra em 4:3, cerca de 540 × 400 px no computador. Envie 1600 × 1200 px para ficar
              nítida. O que fugir dessa proporção é cortado.
            </p>
          </Field>
          <div className="overflow-hidden bg-paper">
            <img src={draft.image || "/work/mesa.jpg"} alt="" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="inline-flex h-12 items-center bg-oxide px-5 text-paper hover:bg-oxide-deep">
              {editing ? "Salvar alterações" : "Publicar no site"}
            </button>
            {editing ? (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setDraft(emptyDraft);
                }}
                className="inline-flex h-12 items-center border border-ink px-5"
              >
                Cancelar
              </button>
            ) : null}
          </div>
          {notice ? <p className="text-sm text-oxide-deep">{notice}</p> : null}
        </div>
      </form>

      <div className="mt-12 flex items-end justify-between gap-4">
        <h2 className="font-serif text-3xl">Na página</h2>
        <button
          type="button"
          onClick={() => {
            update(seedProjects);
            setNotice("Voltei para a seleção original.");
            setEditing(null);
            setDraft(emptyDraft);
          }}
          className="text-sm text-mute underline underline-offset-4 hover:text-ink"
        >
          Restaurar seleção
        </button>
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {projects.map((project, index) => (
          <li key={project.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
            <img src={project.image} alt="" className="h-20 w-28 shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-serif text-2xl leading-none">{project.title}</p>
              <p className="mt-2 text-sm text-mute">
                {project.discipline} · {project.year}
                {project.hidden ? " · oculto" : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => move(index, -1)} className={ghost} aria-label="Subir">
                Subir
              </button>
              <button type="button" onClick={() => move(index, 1)} className={ghost} aria-label="Descer">
                Descer
              </button>
              <button type="button" onClick={() => toggleHidden(project.id)} className={ghost}>
                {project.hidden ? "Mostrar" : "Ocultar"}
              </button>
              <button type="button" onClick={() => edit(project)} className={ghost}>
                Editar
              </button>
              <button
                type="button"
                onClick={() => remove(project.id)}
                className="inline-flex h-11 items-center px-3 text-sm text-oxide hover:text-oxide-deep"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

const inputClass = "h-12 w-full border border-line bg-paper px-3 text-ink outline-none focus:border-ink";

const ghost = "inline-flex h-11 items-center border border-line bg-paper px-3 text-sm hover:border-ink";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-mute">{label}</span>
      {children}
    </label>
  );
}
