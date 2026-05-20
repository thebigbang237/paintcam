import { Reveal } from '@/components/ui/Reveal'
import type { Lang } from '@/hooks/useLanguage'

const copy = {
  fr: { closing: 'Au plaisir de vous accueillir. \u2756' },
  en: { closing: 'We look forward to welcoming you. \u2756' },
}

export function Synopsis({ lang }: { lang: Lang }) {
  const t = copy[lang]

  return (
    <section className="pt-32 px-6">
      <div className="mx-auto max-w-[720px] text-center space-y-10">


        <Reveal delay={0.1}>
          <div className="gold-divider max-w-[60px] mx-auto" />
        </Reveal>

        <Reveal delay={0.3}>
          <p
            className="text-sm text-[#D7B66F]"
            style={{ fontFamily: 'var(--font-manrope)', letterSpacing: '0.1em' }}
          >
            {t.closing}
          </p>
        </Reveal>
      </div>
    </section>
  )
}