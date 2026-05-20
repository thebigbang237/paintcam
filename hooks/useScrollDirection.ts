'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollDirection() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const currentY = window.scrollY

        if (currentY < 80) {
          // Always show at top
          setVisible(true)
        } else {
          // Show when scrolling up, hide when scrolling down
          setVisible(currentY < lastY.current)
        }

        lastY.current = currentY
        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return visible
}