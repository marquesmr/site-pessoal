'use client'

import { useState, useEffect } from 'react'

const defaultProjects = [
  {
    id: 1,
    title: 'Projeto Exemplo 1',
    description: 'Descrição de um projeto de design e desenvolvimento.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    link: '#',
    tags: ['Design', 'Web']
  },
  {
    id: 2,
    title: 'Projeto Exemplo 2',
    description: 'Outro trabalho combinando programação e visual moderno.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    link: '#',
    tags: ['Programação', 'UI']
  }
]

export default function Home() {
  const [projects, setProjects] = useState(defaultProjects)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-projects')
    if (saved) setProjects(JSON.parse(saved))
  }, [])

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Carlos Marques
        </h1>
        <p className="text-xl text-neutral-400 mb-2">Programador & Design Gráfico</p>
        <p className="max-w-2xl mx-auto text-neutral-300 leading-relaxed mt-6">
          Programador e designer gráfico apaixonado por transformar ideias em experiências digitais modernas, elegantes e funcionais. Do código ao visual, crio soluções que unem técnica e criatividade.
        </p>
        <div className="mt-10">
          <a
            href="#contato"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition"
          >
            Tem um projeto em mente? Vamos conversar
          </a>
        </div>
      </section>

      {/* Portfólio */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Portfólio</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-blue-500/50 transition"
            >
              <div className="aspect-video bg-neutral-800 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-neutral-400 text-sm mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags?.map((tag) => (
                    <span key={tag} className="text-xs bg-neutral-800 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="text-center py-16 border-t border-neutral-800">
        <h2 className="text-3xl font-bold mb-4">Contato</h2>
        <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
          Tem um projeto em mente? Vamos conversar e dar vida a ele.
        </p>
        <a
          href="mailto:karlos.antn@gmail.com"
          className="inline-block border border-neutral-700 hover:border-blue-500 px-8 py-3 rounded-full transition"
        >
          karlos.antn@gmail.com
        </a>
        <div className="mt-8 text-sm text-neutral-500">
          <a href="/admin" className="hover:text-neutral-300">Área administrativa</a>
        </div>
      </section>
    </main>
  )
}
