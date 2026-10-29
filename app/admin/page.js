'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Admin() {
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    tags: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-projects')
    if (saved) setProjects(JSON.parse(saved))
  }, [])

  const saveProjects = (newProjects) => {
    setProjects(newProjects)
    localStorage.setItem('portfolio-projects', JSON.stringify(newProjects))
  }

  const addProject = (e) => {
    e.preventDefault()
    const newProject = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      image: form.image || 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
      link: form.link || '#',
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    }
    saveProjects([newProject, ...projects])
    setForm({ title: '', description: '', image: '', link: '', tags: '' })
  }

  const removeProject = (id) => {
    saveProjects(projects.filter(p => p.id !== id))
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Admin — Portfólio</h1>
        <button
          onClick={() => router.push('/')}
          className="text-sm text-neutral-400 hover:text-white"
        >
          ← Voltar ao site
        </button>
      </div>

      <form onSubmit={addProject} className="space-y-4 bg-neutral-900 p-6 rounded-2xl border border-neutral-800 mb-10">
        <h2 className="text-lg font-semibold mb-2">Adicionar projeto</h2>
        <input
          required
          placeholder="Título"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />
        <textarea
          required
          placeholder="Descrição"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />
        <input
          placeholder="URL da imagem"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />
        <input
          placeholder="Link do projeto (opcional)"
          value={form.link}
          onChange={e => setForm({ ...form, link: e.target.value })}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />
        <input
          placeholder="Tags (separadas por vírgula)"
          value={form.tags}
          onChange={e => setForm({ ...form, tags: e.target.value })}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
        >
          Adicionar projeto
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Projetos atuais</h2>
        {projects.length === 0 && <p className="text-neutral-500">Nenhum projeto ainda.</p>}
        {projects.map(p => (
          <div key={p.id} className="flex items-center justify-between bg-neutral-900 p-4 rounded-xl border border-neutral-800">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-neutral-400">{p.description.slice(0, 80)}...</p>
            </div>
            <button
              onClick={() => removeProject(p.id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
