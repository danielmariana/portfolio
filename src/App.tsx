import { useEffect, useState, type MouseEvent } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import logo from './assets/marimari.svg'
import { ProjectsSection } from './projects/ProjectsSection'
import { ProjectPage } from './projects/ProjectPage'
import { ScrollIndicator } from './ScrollIndicator'
import { projects } from './projects/data'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre-mim" element={<AboutMe />} />
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
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  function goToProjects(e: MouseEvent) {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: 'projetos' } })
    }
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Lock background scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [menuOpen])

  const menuLabel = menuOpen ? 'fechar' : 'menu'

  const barClasses = `fixed inset-x-5 top-5 z-30 rounded-xl text-sm font-bold tracking-[0.01em] transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out sm:inset-x-8 sm:top-8 lg:inset-x-12 lg:top-12 ${
    scrolled || menuOpen
      ? 'bg-[#FAFAFA]/30 shadow-[0_2px_10px_rgba(0,0,0,0.06)] backdrop-blur-[6px]'
      : 'bg-transparent shadow-[0_2px_10px_rgba(0,0,0,0)] backdrop-blur-none'
  }`

  return (
    <>
      <header className={barClasses}>
        {/* Mobile: "menu" trigger + centered logo — side b / vamos conversar live in the full-screen menu. */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 sm:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            className="justify-self-start transition-opacity hover:opacity-50"
          >
            {menuLabel}
          </button>
          <Link className="justify-self-center" to="/">
            <img className="block h-5 w-auto" src={logo} alt="Mariana" />
          </Link>
          {/* Invisible twin of the trigger label — keeps the logo mathematically centered. */}
          <span aria-hidden="true" className="invisible justify-self-end">
            {menuLabel}
          </span>
        </div>

        {/* Desktop: unchanged layout, now with a left-hand nav group. */}
        <div className="hidden items-center px-5 py-3 sm:grid sm:grid-cols-3">
          <div className="flex items-center gap-6 justify-self-start">
            <Link className="transition-opacity hover:opacity-50" to="/sobre-mim">
              sobre mim
            </Link>
            <a className="transition-opacity hover:opacity-50" href="#projetos" onClick={goToProjects}>
              projetos
            </a>
            <Link className="transition-opacity hover:opacity-50" to="/side-b">
              side b
            </Link>
          </div>
          <Link className="justify-self-center" to="/">
            <img className="block h-5 w-auto" src={logo} alt="Mariana" />
          </Link>
          <a
            className="gradient-cta justify-self-end rounded-lg px-4 py-2"
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            vamos conversar
          </a>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100svh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-0 z-20 overflow-hidden bg-[#FAFAFA] sm:hidden"
          >
            <nav className="flex h-full flex-col items-start justify-center gap-6 px-8 text-3xl font-bold tracking-[0.01em] text-[#121111]">
              <Link to="/sobre-mim" className="transition-opacity hover:opacity-50">
                sobre mim
              </Link>
              <a className="transition-opacity hover:opacity-50" href="#projetos" onClick={goToProjects}>
                projetos
              </a>
              <Link to="/side-b" className="transition-opacity hover:opacity-50">
                side b
              </Link>
              <a className="gradient-cta rounded-lg px-5 py-3" href="#" target="_blank" rel="noreferrer">
                vamos conversar
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Home() {
  const location = useLocation()

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    if (state?.scrollTo === 'projetos') {
      document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.state])

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

function AboutMe() {
  return (
    <main className="min-h-svh px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8">
      <SiteHeader />
      <section className="flex min-h-[calc(100svh-2.5rem)] flex-col justify-center gap-6 sm:min-h-[calc(100svh-4rem)]">
        <p className="text-xs uppercase tracking-[0.16em] text-[#121111]/50">Sobre mim</p>
        <h1 className="max-w-2xl text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.06em] sm:text-7xl">
          conteúdo em breve.
        </h1>
      </section>
    </main>
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
