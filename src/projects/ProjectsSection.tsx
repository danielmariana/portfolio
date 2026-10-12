import { createRef, useEffect, useMemo, useRef, type CSSProperties, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { projects, type Project } from './data'

const MotionLink = motion.create(Link)
const TOP_OFFSET = 16
const MIN_ICON_GAP = 24

// Height of the sticky section title bar above the cards — kept in sync between the
// bar itself and each card's sticky offset/height so the white strip never gets covered.
const TITLE_BAR_CLASS = 'h-[160px] sm:h-[168px] lg:h-[185px]'
const TITLE_BAR_TOP_CLASS = 'top-[160px] sm:top-[168px] lg:top-[185px]'
const CARD_HEIGHT_CLASS =
  'h-[calc(100svh-160px)] sm:h-[calc(100svh-168px)] lg:h-[calc(100svh-185px)]'
const TAG_DARKEN_AMOUNT = 0.16

function darkenHex(hex: string, amount: number) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.round(((num >> 16) & 0xff) * (1 - amount))
  const g = Math.round(((num >> 8) & 0xff) * (1 - amount))
  const b = Math.round((num & 0xff) * (1 - amount))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

function MaterialIcon({
  path,
  className,
  style,
  ref,
}: {
  path: string
  className?: string
  style?: CSSProperties
  ref?: RefObject<SVGSVGElement | null>
}) {
  return (
    <svg ref={ref} viewBox="0 -960 960 960" className={className} style={style} aria-hidden="true">
      <path d={path} fill="currentColor" />
    </svg>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectCard({
  project,
  index,
  cardRef,
  nextRef,
}: {
  project: Project
  index: number
  cardRef: RefObject<HTMLDivElement | null>
  nextRef: RefObject<HTMLDivElement | null>
}) {
  const light = !project.dark
  const textColor = light ? 'text-white' : 'text-[#121111]'
  const descColor = light ? 'text-[#F2F2F7]' : 'text-[#121111]/70'
  const buttonClasses = light ? 'border-white text-white' : 'border-[#121111] text-[#121111]'
  const tagColor = darkenHex(project.color, TAG_DARKEN_AMOUNT)

  const boxRef = useRef<HTMLAnchorElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const riseDistanceRef = useRef(0)

  const { scrollYProgress: nextReveal } = useScroll({
    target: nextRef,
    offset: ['start end', 'start start'],
  })

  useEffect(() => {
    function measure() {
      if (nextReveal.get() > 0.01) return
      if (boxRef.current && contentRef.current) {
        const boxTop = boxRef.current.getBoundingClientRect().top
        const contentTop = contentRef.current.getBoundingClientRect().top
        const iconBottom = iconRef.current?.getBoundingClientRect().bottom ?? boxTop
        const minContentTop = Math.max(TOP_OFFSET, iconBottom - boxTop + MIN_ICON_GAP)
        riseDistanceRef.current = Math.max(contentTop - boxTop - minContentTop, 0)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [nextReveal])

  const contentY = useTransform(nextReveal, (p) => -riseDistanceRef.current * p)

  return (
    <div
      ref={cardRef}
      data-scroll-section={index + 1}
      className={`sticky ${TITLE_BAR_TOP_CLASS} ${CARD_HEIGHT_CLASS}`}
      style={{ zIndex: index + 1 }}
    >
      <MotionLink
        ref={boxRef}
        to={`/projetos/${project.slug}`}
        style={{ backgroundColor: project.color }}
        className="flex h-full w-full flex-col rounded-t-[60px] px-5 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8 lg:px-12 lg:pt-10 lg:pb-10"
      >
        <MaterialIcon
          ref={iconRef}
          path={project.iconPath}
          className="h-16 w-16 shrink-0 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          style={{ color: project.iconColor }}
        />

        <div className="min-h-0 shrink grow basis-80 sm:basis-96 lg:basis-[28rem]" />

        <motion.div style={{ y: contentY }} className="shrink-0">
          <div ref={contentRef}>
            <div>
              <h2 className={`text-2xl font-bold sm:text-4xl lg:text-5xl ${textColor}`}>{project.title}</h2>
              <p className={`mt-3 text-base font-semibold sm:text-xl ${descColor}`}>{project.description}</p>
            </div>
            <div className="mt-[20px] flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ backgroundColor: tagColor }}
                    className={`rounded-[10px] px-4 py-2 text-sm ${light ? 'text-white' : 'text-[#121111]'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className={`group flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 transition-colors duration-200 hover:bg-white ${buttonClasses}`}
              >
                <ArrowIcon className="h-6 w-6 transition-colors duration-200 group-hover:text-[#FF59A1]" />
              </motion.span>
            </div>
          </div>
        </motion.div>

        <div className="flex-1" />
      </MotionLink>
    </div>
  )
}

export function ProjectsSection() {
  const cardRefs = useMemo(() => projects.map(() => createRef<HTMLDivElement>()), [])
  const emptyRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative">
      <div
        className={`sticky top-0 z-10 flex items-end bg-white px-5 pb-4 sm:px-8 sm:pb-6 lg:px-12 lg:pb-8 ${TITLE_BAR_CLASS}`}
      >
        <h2 className="text-xl font-bold text-[#121111] sm:text-2xl lg:text-3xl">Projetos</h2>
      </div>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={index}
          cardRef={cardRefs[index]}
          nextRef={cardRefs[index + 1] ?? emptyRef}
        />
      ))}
    </section>
  )
}
