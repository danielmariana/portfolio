import { useEffect, useRef, useState } from 'react'

export function ScrollIndicator({ count }: { count: number }) {
  const [active, setActive] = useState(0)
  const topsRef = useRef<number[]>([])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-section]')).sort(
      (a, b) => Number(a.dataset.scrollSection) - Number(b.dataset.scrollSection),
    )

    // offsetTop reflects each element's static (un-stuck) layout position even while it's
    // currently pinned by position: sticky, but it's relative to its own offsetParent rather
    // than the document — so walk the offsetParent chain to get an absolute, scroll-independent top.
    function getAbsoluteTop(el: HTMLElement) {
      let top = 0
      let node: HTMLElement | null = el
      while (node) {
        top += node.offsetTop
        node = node.offsetParent as HTMLElement | null
      }
      return top
    }

    let tops: number[] = []
    function measure() {
      tops = elements.map(getAbsoluteTop)
      topsRef.current = tops
    }

    let raf = 0
    function computeActive() {
      const centerY = window.scrollY + window.innerHeight / 2
      let current = 0
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= centerY) current = i
      }
      setActive(current)
    }
    function onScroll() {
      if (raf) return
      raf = requestAnimationFrame(() => {
        computeActive()
        raf = 0
      })
    }

    function onResize() {
      measure()
      computeActive()
    }

    measure()
    computeActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  function goTo(index: number) {
    // Sticky cards stay visually "stuck" (rect.top: 0) even once a later card has covered
    // them, so scrollIntoView wrongly treats them as already in view — scroll by our own
    // measured absolute position instead.
    const top = topsRef.current[index]
    if (top !== undefined) window.scrollTo({ top, behavior: 'smooth' })
  }

  const dots = Array.from({ length: count }, (_, i) => i)

  return (
    <>
      <div className="fixed top-1/2 right-6 z-20 hidden -translate-y-1/2 flex-col gap-2.5 rounded-lg bg-[#F2F2F2]/30 px-2 py-2.5 shadow-md backdrop-blur-[6px] sm:flex lg:right-10">
        {dots.map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para a seção ${i + 1}`}
            aria-current={active === i}
            onClick={() => goTo(i)}
            className={`h-2 w-2 cursor-pointer rounded-full transition-colors ${
              active === i ? 'bg-[#121111]' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <div
        className="fixed inset-x-0 z-20 flex justify-center sm:hidden"
        style={{ bottom: 'calc(16px + env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-2.5 rounded-lg bg-[#F2F2F2]/30 px-2.5 py-2 shadow-md backdrop-blur-[6px]">
          {dots.map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para a seção ${i + 1}`}
              aria-current={active === i}
              onClick={() => goTo(i)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-colors ${
                active === i ? 'bg-[#121111]' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
