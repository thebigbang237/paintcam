'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from '@/hooks/useScrollDirection'

export function Header() {
  const visible = useScrollDirection()

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="header"
          className="fixed inset-x-0 top-0 z-50 flex justify-center py-7"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Subtle top fade so header blends into hero */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-28"

            aria-hidden="true"
          />
          <a
            href="#home"
            aria-label="PAINTCAM — retour en haut"
            className="relative z-10 transition-opacity hover:opacity-75"
          >
            <Image
              src="/assets/logo-white.png"
              alt="PAINTCAM"
              width={260}
              height={100}
              className="h-20 w-auto"
              priority
            />
          </a>
        </motion.header>
      )}
    </AnimatePresence>
  )
}