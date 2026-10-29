import './globals.css'

export const metadata = {
  title: 'Carlos Marques | Programador & Design Gráfico',
  description: 'Programador e designer gráfico apaixonado por transformar ideias em experiências digitais modernas.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
