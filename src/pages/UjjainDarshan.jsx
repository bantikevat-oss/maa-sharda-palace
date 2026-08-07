import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSite } from '../hooks/useSite'
import { useSEO } from '../hooks/useSEO'
import { fadeUp, staggerContainer } from '../animations'
import GradientText from '../components/ui/GradientText'

/* Rotating palette so each tip card looks distinct without hard-coding one per tip. */
const TIP_TONES = [
  { from: 'from-pink-400', to: 'to-rose-500', bg: 'bg-rose-50', ring: 'ring-rose-100' },
  { from: 'from-amber-400', to: 'to-orange-500', bg: 'bg-amber-50', ring: 'ring-amber-100' },
  { from: 'from-purple-400', to: 'to-indigo-500', bg: 'bg-purple-50', ring: 'ring-purple-100' },
  { from: 'from-sky-400', to: 'to-blue-500', bg: 'bg-sky-50', ring: 'ring-sky-100' },
  { from: 'from-cyan-400', to: 'to-teal-500', bg: 'bg-cyan-50', ring: 'ring-cyan-100' },
  { from: 'from-yellow-400', to: 'to-amber-500', bg: 'bg-yellow-50', ring: 'ring-yellow-100' },
]

function PlaceCard({ place, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div variants={fadeUp}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="relative overflow-hidden bg-gray-900" style={{ height: '360px' }}>
        {place.image && (
          <>
            <div className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${place.image})`, filter: 'blur(24px) brightness(0.45) saturate(1.2)', transform: 'scale(1.15)' }} />
            <img src={place.image} alt={place.name} loading="lazy"
              className="relative z-10 w-full h-full object-contain object-center hover:scale-[1.03] transition-transform duration-700" />
          </>
        )}
        {!place.image && (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-primary/10">{place.icon}</div>
        )}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
        <span className="absolute top-3 left-3 z-30 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
          #{index + 1}
        </span>
        <span className="absolute top-3 right-3 z-30 text-2xl drop-shadow-lg">{place.icon}</span>
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
          <p className="text-white font-bold text-lg font-display leading-tight drop-shadow-lg">{place.name}</p>
          {place.subtitle && <p className="text-amber-300 text-xs mt-0.5 drop-shadow">{place.subtitle}</p>}
        </div>
      </div>

      <div className="p-5">
        <p className="text-gray-600 text-sm leading-relaxed">{place.short}</p>
        {(place.timing || place.distance) && (
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-400 flex-wrap">
            {place.timing && <span>🕐 {place.timing}</span>}
            {place.distance && <span>📍 {place.distance}</span>}
          </div>
        )}
      </div>

      {place.details && (
        <div className="border-t border-gray-100">
          <button onClick={() => setOpen(!open)}
            className="w-full px-6 py-3 flex items-center justify-between text-sm font-semibold text-primary hover:bg-gray-50 transition-colors">
            <span>{open ? 'Show Less' : 'Read More'}</span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>▼</motion.span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden">
                <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {String(place.details).split('\n\n').map((para, i) => {
                    const lines = para.split('\n')
                    return (
                      <p key={i} className="mb-3 last:mb-0">
                        {lines.map((line, j) => (
                          <span key={j}>
                            {line.startsWith('**') && line.endsWith('**')
                              ? <strong className="text-primary">{line.slice(2, -2)}</strong>
                              : line.startsWith('**')
                                ? <><strong className="text-primary">{line.slice(2, line.indexOf('**', 2))}</strong>{line.slice(line.indexOf('**', 2) + 2)}</>
                                : line.startsWith('- ')
                                  ? <span className="flex items-start gap-2 mt-1"><span className="text-accent mt-0.5">•</span>{line.slice(2)}</span>
                                  : line}
                            {j < lines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}

export default function UjjainDarshan() {
  const { v, list, on } = useSite()

  useSEO({
    title: v('seo_darshan_title'),
    description: v('seo_darshan_desc'),
    ogImage: v('ud_hero_img'),
  })

  const phone = v('phone')
  const places = list('ud_places')
  const intro = String(v('ud_intro_body') || '').split(/\n{2,}/).filter(Boolean)

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-[420px] md:h-[480px] bg-primary overflow-hidden">
        {v('ud_hero_img') && (
          <img src={v('ud_hero_img')} alt={v('ud_title')}
            className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.55)' }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-primary/60" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4 z-10">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-accent text-3xl md:text-4xl drop-shadow-[0_0_20px_rgba(201,168,76,0.6)]">{v('ud_hero_icon')}</span>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-accent" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-accent text-xs md:text-sm font-semibold uppercase tracking-[0.35em] mb-4">
            {v('ud_eyebrow')}
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}>
            <GradientText>{v('ud_title')}</GradientText>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-white/85 text-sm md:text-base max-w-2xl leading-relaxed font-light">
            {v('ud_desc')}
          </motion.p>

          {list('ud_badges').length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-7">
              {list('ud_badges').map((b, i) => (
                <span key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 text-white text-xs px-4 py-1.5 rounded-full">{b}</span>
              ))}
            </motion.div>
          )}

          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-xs text-white/50 mt-6">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Ujjain Darshan</span>
          </motion.nav>
        </div>
      </section>

      {/* Intro */}
      {intro.length > 0 && (
        <section className="py-12 bg-accent/5 border-b border-accent/20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {intro.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">{p}</p>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Places */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('ud_places_eyebrow')}</p>
            <h2 className="text-4xl font-bold text-primary font-display">
              <GradientText>{v('ud_places_title')}</GradientText>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">{v('ud_places_desc')}</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6">
            {places.map((place, i) => (
              <PlaceCard key={i} place={place} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Travel Tips */}
      {on('show_ud_tips') && list('ud_tips').length > 0 && (
        <section className="py-20 bg-gradient-to-b from-accent/5 via-white to-accent/5 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
              <p className="text-accent text-xs font-semibold uppercase tracking-[0.3em] mb-3">{v('ud_tips_eyebrow')}</p>
              <h2 className="text-4xl font-bold text-primary font-display"><GradientText>{v('ud_tips_title')}</GradientText></h2>
              <p className="text-gray-500 mt-3 text-sm">{v('ud_tips_desc')}</p>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {list('ud_tips').map((t, i) => {
                const tone = TIP_TONES[i % TIP_TONES.length]
                return (
                  <motion.div key={i} variants={fadeUp}
                    className={`group ${tone.bg} rounded-3xl p-6 shadow-sm hover:shadow-xl ring-1 ${tone.ring} hover:scale-[1.03] transition-all duration-300 border border-white relative overflow-hidden`}>
                    <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${tone.from} ${tone.to} opacity-20 group-hover:opacity-30 transition-opacity blur-2xl`} />
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${tone.from} ${tone.to} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-4`}>
                      <span className="drop-shadow-md">{t.icon}</span>
                    </div>
                    <h3 className="font-bold text-primary mb-2 text-base font-display">{t.tip}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{t.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold font-display mb-4">{v('ud_cta_title')}</h2>
            <p className="text-white/60 mb-8 text-sm">{v('ud_cta_desc')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${phone}`}
                className="bg-accent text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone}
              </a>
              <Link to={v('ud_cta_btn_link')}
                className="bg-white text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                {v('ud_cta_btn')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
