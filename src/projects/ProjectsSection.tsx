import { createRef, useEffect, useMemo, useRef, type CSSProperties, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { projects, type Project } from './data'

const MotionLink = motion.create(Link)
const TOP_OFFSET = 16
const MIN_ICON_GAP = 30
const CORNER_RADIUS = 60
// The rise finishes within this fraction of the next card's reveal progress, instead
// of the full 0→1 span — otherwise the incoming card's covering edge (which sweeps the
// whole viewport) catches up to the text before it reaches MIN_ICON_GAP, covering it
// mid-rise rather than letting it settle there first.
const RISE_COMPLETE_AT = 0.3

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
        strokeLinecap="square"
        strokeLinejoin="miter"
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

  // This card's own entrance: 0 while it's still below the viewport rising into
  // place, 1 once it settles stuck at the top — corners flatten out over that span,
  // since a corner only reads as "rounded" while there's a reveal happening.
  const { scrollYProgress: ownReveal } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  })
  const cornerRadius = useTransform(ownReveal, [0, 1], [CORNER_RADIUS, 0])

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

  const contentY = useTransform(nextReveal, (p) => {
    const t = Math.min(p / RISE_COMPLETE_AT, 1)
    return -riseDistanceRef.current * t
  })

  return (
    <div
      ref={cardRef}
      data-scroll-section={index + 1}
      className="sticky top-0 h-svh"
      style={{ zIndex: index + 1 }}
    >
      <MotionLink
        ref={boxRef}
        to={`/projetos/${project.slug}`}
        style={{
          backgroundColor: project.color,
          borderTopLeftRadius: cornerRadius,
          borderTopRightRadius: cornerRadius,
        }}
        className="flex h-full w-full flex-col px-5 pt-20 pb-6 sm:px-8 sm:pt-24 sm:pb-8 lg:px-12 lg:pt-28 lg:pb-10"
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
      <div className="bg-white px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
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
