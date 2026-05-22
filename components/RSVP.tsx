'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/ui/Reveal'
import type { Lang } from '@/hooks/useLanguage'

const copy = {
  fr: {
    heading: 'Confirmez votre présence',
    sub: 'Veuillez renseigner votre adresse e-mail afin de confirmer votre participation.',
    placeholder: 'votre@email.com',
    cta: 'Je confirme',
    sending: 'Envoi en cours…',
    successTitle: 'Merci !',
    successBody: 'Votre place est réservée. Un email de confirmation vous a été envoyé.',
    errorMsg: 'Une erreur est survenue. Veuillez réessayer ou contacter reservation@paintcam.com',
    contact: 'ou contactez-nous directement',
  },
  en: {
    heading: 'Confirm Your Attendance',
    sub: 'Kindly enter your email address to receive your confirmation.',
    placeholder: 'your@email.com',
    cta: 'I Confirm',
    sending: 'Sending…',
    successTitle: 'Thank you!',
    successBody: 'Your seat is reserved. A confirmation email has been sent to you.',
    errorMsg: 'Something went wrong. Please retry or contact reservation@paintcam.com',
    contact: 'or contact us directly',
  },
}

export function RSVP({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), lang }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'server')
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg(t.errorMsg)
    }
  }

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-[#0e0e0e] py-32 px-6"
    >
      {/* Top gold line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D7B66F]/40 to-transparent" />

      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-64 w-96 rounded-full blur-[120px]"
        style={{ background: 'rgba(215,182,111,0.07)' }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[580px] text-center space-y-10 relative">

        {/* Heading */}
        <Reveal>
          <div className="space-y-4">
            <span className="text-[#D7B66F] text-lg block">✦</span>
            <h2
              className="text-4xl md:text-5xl text-white"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {t.heading}
            </h2>
            <p
              className="text-base text-white/50"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              {t.sub}
            </p>
          </div>
        </Reveal>

        {/* Form / Success */}
        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="border border-[#D7B66F]/50 bg-[#D7B66F]/08 px-8 py-10 space-y-4"
              >
                <span className="text-[#D7B66F] text-3xl block">✦</span>
                <p
                  className="text-2xl text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {t.successTitle}
                </p>
                <p
                  className="text-sm text-white/55"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {t.successBody}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-0 border-b border-[#D7B66F]/40 py-4 px-0 text-[#F5F2EA] text-lg placeholder:text-white/25 focus:outline-none focus:border-[#D7B66F] transition-colors duration-300 disabled:opacity-50"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#D7B66F] text-[#030303] py-5 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {status === 'loading' ? t.sending : t.cta}
                </button>

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-400"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>

        {/* Contact links */}
        <Reveal delay={0.2}>
          <div className="pt-2 space-y-2">
            <p
              className="text-xs text-white/35 uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              {t.contact}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-2">
              <a
                href="mailto:reservation@paintcam.com"
                className="flex items-center gap-2 justify-center text-xs tracking-widest text-white/45 uppercase hover:text-[#D7B66F] transition-colors"
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                reservation@paintcam.com
              </a>
              <a
                href="tel:+237698880888"
                className="flex items-center gap-2 justify-center text-xs tracking-widest text-white/45 uppercase hover:text-[#D7B66F] transition-colors"
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
                +237 6 98 88 08 88
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}