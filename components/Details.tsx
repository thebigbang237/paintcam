import { Reveal } from '@/components/ui/Reveal'
import { MapPin, Clock, Calendar } from 'lucide-react'
import type { Lang } from '@/hooks/useLanguage'

const copy = {
  fr: {
    sectionLabel: 'Détails de la soirée',
    venue: { label: 'Lieu', line1: 'One Rooftop', line2: 'Bonapriso, Douala' },
    time: { label: 'Heure', line1: '18h30 — 23h00', line2: 'Accueil à partir de 18h30' },
    date: { label: 'Date', line1: 'Jeudi 04 Juin 2026', line2: 'Soirée anniversaire officielle' },
  },
  en: {
    sectionLabel: 'Event Details',
    venue: { label: 'Venue', line1: 'One Rooftop', line2: 'Bonapriso, Douala' },
    time: { label: 'Time', line1: '6:30 PM — 11:00 PM', line2: 'Doors open from 6:30 PM' },
    date: { label: 'Date', line1: 'Thursday, June 4th 2026', line2: 'Official Anniversary Evening' },
  },
}

const cards = (t: typeof copy['fr']) => [
  { icon: MapPin, ...t.venue },
  { icon: Clock, ...t.time },
  { icon: Calendar, ...t.date },
]

export function Details({ lang }: { lang: Lang }) {
  const t = copy[lang]

  return (
    <section id="details" className="pb-32 pt-10 px-6">
      <div className="mx-auto max-w-[1100px]">
        {/* Section label */}
        <Reveal className="text-center mb-14">

          <div className="gold-divider max-w-[60px] mx-auto" />
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards(t).map(({ icon: Icon, label, line1, line2 }, i) => (
            <Reveal key={label} delay={i * 0.12}>
              <div className="group border border-[#D7B66F]/30 bg-[#030303] p-10 flex flex-col items-center text-center space-y-4 transition-colors duration-500 hover:border-[#D7B66F]">
                <Icon
                  size={32}
                  className="text-[#D7B66F] transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <h3
                  className="text-[0.72rem] font-bold text-[#D7B66F] tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {label}
                </h3>
                <p
                  className="text-base text-[#F5F2EA]"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {line1}
                  <br />
                  <span className="text-sm text-white/50">{line2}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}