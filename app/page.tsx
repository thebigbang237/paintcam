'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Synopsis } from '@/components/Synopsis'
import { Details } from '@/components/Details'
import { RSVP } from '@/components/RSVP'
import { Footer } from '@/components/Footer'

export default function Page() {
  const lang = useLanguage()

  return (
    <>
      <Header />
      <main>
        <Hero lang={lang} />
        <Synopsis lang={lang} />
        <Details lang={lang} />
        <RSVP lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  )
}