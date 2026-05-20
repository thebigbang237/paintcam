'use client'

import { useEffect, useState } from 'react'

export type Lang = 'fr' | 'en'

export function useLanguage(): Lang {
  const [lang, setLang] = useState<Lang>('fr') // default fr during SSR

  useEffect(() => {
    const browserLang =
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      'fr'

    // Only switch to English if browser is explicitly English
    setLang(browserLang.toLowerCase().startsWith('en') ? 'en' : 'fr')
  }, [])

  return lang
}