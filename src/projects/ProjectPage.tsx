import { useParams } from 'react-router-dom'
import { projects } from './data'

export function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  return (
    <main className="flex min-h-svh items-center justify-center px-5 text-center sm:px-8 lg:px-12">
      <h1 className="text-4xl font-semibold uppercase tracking-[-0.03em] sm:text-6xl">
        {project?.title ?? 'Projeto não encontrado'}
      </h1>
    </main>
  )
}
