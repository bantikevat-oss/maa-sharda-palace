import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../../hooks/useSite'
import { useSEO } from '../../hooks/useSEO'
import { fadeUp, staggerContainer } from '../../animations'
import GradientText from '../../components/ui/GradientText'

export default function PartyHall() {
  const { v, list, paras, wa } = useSite()

  useSEO({
    title: v('seo_party_title'),
    description: v('seo_party_desc'),
    ogImage: v('ph_hero_img'),
  })

  const phone = v('phone')

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-80 bg-primary overflow-hidden">
        {v('ph_hero_img') && (
          <img src={v('ph_hero_img')} alt={v('ph_title')} className="absolute inset-0 w-full h-full object-cover opacity-45" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{v('ph_eyebrow')}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            <GradientText>{v('ph_title')}</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60 mt-2">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Party Hall</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('ph_intro_eyebrow')}</p>
              <h2 className="text-4xl font-bold text-primary font-display mb-6">{v('ph_intro_title')}</h2>
              {paras('ph_intro_body').map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
              ))}

              {list('ph_occasions').length > 0 && (
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="grid grid-cols-2 gap-3 mb-8 mt-6">
                  {list('ph_occasions').map((item, i) => (
                    <motion.div key={i} variants={fadeUp} className="bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700">{item}</motion.div>
                  ))}
                </motion.div>
              )}

              <div className="flex flex-wrap gap-3">
                <a href={`tel:${phone}`} className="btn-primary">📞 Call Us</a>
                <a href={wa("Hi, I'd like to book the party hall.")} target="_blank" rel="noopener noreferrer"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
                  💬 WhatsApp
                </a>
              </div>
            </motion.div>

            {v('ph_side_img') && (
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <img src={v('ph_side_img')} alt="Party Hall Setup" loading="lazy"
                  className="rounded-3xl w-full h-96 object-cover shadow-xl" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* What's included */}
      {list('ph_included').length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-primary font-display mb-8">{v('ph_included_title')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {list('ph_included').map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm font-medium text-primary">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
