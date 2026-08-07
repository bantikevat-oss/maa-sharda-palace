import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../../hooks/useSite'
import { useSEO } from '../../hooks/useSEO'
import { fadeUp, staggerContainer } from '../../animations'
import GradientText from '../../components/ui/GradientText'

const BADGE_TONES = ['bg-primary', 'bg-amber-600', 'bg-blue-600', 'bg-rose-600']

export default function Amenities() {
  const { v, list, on } = useSite()

  useSEO({
    title: v('seo_amenities_title'),
    description: v('seo_amenities_desc'),
    ogImage: v('am_hero_img'),
  })

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-72 bg-primary overflow-hidden">
        {v('am_hero_img') && (
          <img src={v('am_hero_img')} alt="Amenities" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{v('am_hero_eyebrow')}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            <GradientText>{v('am_hero_title')}</GradientText>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/70 text-sm">{v('am_hero_desc')}</motion.p>
          <nav className="text-sm text-white/60 mt-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Amenities</span>
          </nav>
        </div>
      </section>

      {/* Facility rows */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('am_items_eyebrow')}</p>
            <h2 className="text-4xl font-bold text-primary font-display">
              <GradientText>{v('am_items_title')}</GradientText>
            </h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">{v('am_items_desc')}</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="space-y-16">
            {list('am_items').map((a, i) => (
              <AmenityRow key={i} item={a} reverse={i % 2 === 1} tone={BADGE_TONES[i % BADGE_TONES.length]} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nearby temples */}
      {on('show_am_temples') && list('am_temples').length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('am_temples_eyebrow')}</p>
              <h2 className="text-4xl font-bold text-primary font-display">
                <GradientText>{v('am_temples_title')}</GradientText>
              </h2>
              <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">{v('am_temples_desc')}</p>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {list('am_temples').map((t, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                  <div className="relative h-44 overflow-hidden bg-gray-900">
                    {t.img && (
                      <img src={t.img} alt={t.name} loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                    {t.dist && (
                      <div className="absolute top-3 right-3 bg-accent text-primary text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                        {t.dist}
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <h3 className="font-bold text-primary text-sm font-display">{t.name}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {v('am_temples_cta') && (
              <div className="text-center mt-10">
                <Link to="/ujjain-darshan"
                  className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors">
                  {v('am_temples_cta')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Wellness grid */}
      {on('show_am_wellness') && list('am_wellness').length > 0 && (
        <section className="py-16 bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-bold font-display"><GradientText>{v('am_wellness_title')}</GradientText></h2>
              <p className="text-white/60 mt-3 text-sm">{v('am_wellness_desc')}</p>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {list('am_wellness').map((w, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="bg-white/10 rounded-xl p-5 text-center hover:bg-white/20 transition-colors">
                  <div className="text-3xl mb-2">{w.icon}</div>
                  <p className="text-white font-semibold text-sm">{w.label}</p>
                  <p className="text-white/60 text-xs mt-1">{w.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </main>
  )
}

function AmenityRow({ item, reverse, tone }) {
  const thumbs = [item.thumb1, item.thumb2].filter(Boolean)
  const highlights = Array.isArray(item.highlights) ? item.highlights : []

  return (
    <motion.div variants={fadeUp}
      className={`grid md:grid-cols-2 gap-10 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
      {/* Images */}
      <div className="grid grid-cols-2 gap-3">
        {item.main && (
          <img src={item.main} alt={item.title} loading="lazy"
            className="col-span-2 rounded-2xl w-full h-64 object-cover shadow-lg" />
        )}
        {thumbs.map((t, i) => (
          <img key={i} src={t} alt={`${item.title} view ${i + 2}`} loading="lazy"
            className={`rounded-2xl w-full h-32 object-cover shadow-md ${thumbs.length === 1 ? 'col-span-2' : ''}`} />
        ))}
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <div className="text-4xl">{item.icon}</div>
          {item.badge && (
            <span className={`${tone} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
              {item.badge}
            </span>
          )}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-primary font-display mb-3">{item.title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm mb-5">{item.desc}</p>

        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {highlights.map((h, i) => (
              <span key={i} className="bg-accent/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-accent/20">
                {h}
              </span>
            ))}
          </div>
        )}

        {item.timings && <p className="text-sm text-accent font-medium mb-5">🕐 {item.timings}</p>}

        {item.link && (
          <Link to={item.link}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors">
            View Full Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        )}
      </div>
    </motion.div>
  )
}
