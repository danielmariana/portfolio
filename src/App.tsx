import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import logo from './assets/marimari.svg'
import { ProjectsSection } from './projects/ProjectsSection'
import { ProjectPage } from './projects/ProjectPage'
import { ScrollIndicator } from './ScrollIndicator'
import { projects } from './projects/data'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/side-b" element={<SideB />} />
      <Route path="/projetos/:slug" element={<ProjectPageWithHeader />} />
    </Routes>
  )
}

function ProjectPageWithHeader() {
  return (
    <>
      <SiteHeader />
      <ProjectPage />
    </>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-5 top-5 z-30 grid grid-cols-[1fr_auto_1fr] items-center rounded-xl px-5 py-3 text-sm font-bold tracking-[0.01em] transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out sm:inset-x-8 sm:top-8 sm:grid-cols-3 lg:inset-x-12 lg:top-12 ${
        scrolled
          ? 'bg-[#FAFAFA]/30 shadow-[0_2px_10px_rgba(0,0,0,0.06)] backdrop-blur-[6px]'
          : 'bg-transparent shadow-[0_2px_10px_rgba(0,0,0,0)] backdrop-blur-none'
      }`}
    >
      <Link
        className="min-w-0 justify-self-start transition-opacity hover:opacity-50"
        to="/side-b"
      >
        side b
      </Link>
      <Link className="justify-self-center" to="/">
        <img className="block h-4 w-auto sm:h-5" src={logo} alt="Mariana" />
      </Link>
      <a
        className="gradient-cta min-w-0 justify-self-end rounded-lg px-1.5 py-1.5 text-[10px] whitespace-nowrap sm:px-4 sm:py-2 sm:text-sm"
        href="#"
        target="_blank"
        rel="noreferrer"
      >
        vamos conversar
      </a>
    </header>
  )
}

function Home() {
  return (
    <>
      <SiteHeader />
      <main data-scroll-section="0" className="min-h-svh px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8">
        <section className="flex min-h-[calc(100svh-2.5rem)] items-center justify-start text-left sm:min-h-[calc(100svh-4rem)]">
          <h1 className="max-w-[1100px] text-[clamp(2.6rem,5.8vw,5.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.075em]">
            aqui uma frase de<br className="hidden sm:block" /> apresentação aqui uma<br className="hidden sm:block" /> frase de apresentação aqui<br className="hidden sm:block" /> uma frase de apresentação
          </h1>
        </section>
      </main>
      <ProjectsSection />
      <ScrollIndicator count={projects.length + 1} />
    </>
  )
}

function SideB() {
  return (
    <main className="min-h-svh px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8">
      <SiteHeader />
      <section className="flex min-h-[calc(100svh-2.5rem)] flex-col justify-center gap-6 sm:min-h-[calc(100svh-4rem)]">
        <p className="text-xs uppercase tracking-[0.16em] text-[#121111]/50">Side B</p>
        <h1 className="max-w-2xl text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.06em] sm:text-7xl">
          outros lados da mesma ideia.
        </h1>
      </section>
    </main>
  )
}

export default App
