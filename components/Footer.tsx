import Image from 'next/image'
import type { Lang } from '@/hooks/useLanguage'

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-[#030303] border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-8">

        <div
          className="mt-4 h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(215,182,111,0.4), transparent)',
          }}
          aria-hidden="true"
        />
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Image
            src="/assets/logo-white.png"
            alt="PAINTCAM"
            width={120}
            height={46}
            className="h-10 w-auto opacity-80"
          />
          <div className="flex flex-col sm:flex-row gap-5">
            <a
              href="mailto:reservation@paintcam.com"
              className="flex items-center gap-2 text-xs tracking-[0.18em] text-white/40 uppercase hover:text-[#D7B66F] transition-colors"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
              reservation@paintcam.com
            </a>
            <a
              href="tel:+237698880888"
              className="flex items-center gap-2 text-xs tracking-[0.18em] text-white/40 uppercase hover:text-[#D7B66F] transition-colors"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
              +237 6 98 88 08 88
            </a>
          </div>
          <p
            className="text-[0.6rem] text-white/25"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            © 2026 · Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}