import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../../hooks/useSite'
import { useSEO } from '../../hooks/useSEO'
import { fadeUp, staggerContainer } from '../../animations'
import GradientText from '../../components/ui/GradientText'

export default function Gym() {
  const { v, list, on } = useSite()

  useSEO({
    title: v('seo_gym_title'),
    description: v('seo_gym_desc'),
    ogImage: v('gym_hero_img'),
  })

  const phone = v('phone')

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-80 bg-primary overflow-hidden">
        {v('gym_hero_img') && (
          <img src={v('gym_hero_img')} alt={v('gym_title')}
            className="absolute inset-0 w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{v('gym_eyebrow')}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            <GradientText>{v('gym_title')}</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60 mt-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/amenities" className="hover:text-accent">Amenities</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Gymnasium</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {v('gym_badge') && (
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-5 py-2 rounded-full text-sm font-semibold mb-8">
                {v('gym_badge')}
              </div>
            )}
            <h2 className="text-4xl font-bold text-primary font-display mb-6">
              <GradientText>{v('gym_intro_title')}</GradientText>
            </h2>
            <p className="text-gray-600 leading-relaxed text-base mb-4">{v('gym_intro_body')}</p>
            <p className="text-gray-500 text-sm mb-10">{v('gym_intro_note')}</p>
            {v('gym_box_title') && (
              <div className="inline-block bg-primary text-white px-8 py-4 rounded-2xl mb-4">
                <p className="text-accent font-bold text-lg">{v('gym_box_title')}</p>
                <p className="text-white/70 text-sm mt-1">{v('gym_box_desc')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Preview gallery */}
      {on('show_gym_gallery') && list('gym_gallery').length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('gym_gallery_eyebrow')}</p>
              <h2 className="text-3xl font-bold text-primary font-display">
                <GradientText>{v('gym_gallery_title')}</GradientText>
              </h2>
              <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">{v('gym_gallery_desc')}</p>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {list('gym_gallery').map((img, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="relative overflow-hidden rounded-2xl shadow-md group h-52 bg-gray-100">
                  <img src={img.src} alt={img.alt} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Planned facilities */}
      {list('gym_facilities').length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('gym_fac_eyebrow')}</p>
              <h2 className="text-3xl font-bold text-primary font-display"><GradientText>{v('gym_fac_title')}</GradientText></h2>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {list('gym_facilities').map((f, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-4xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-primary text-sm mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Hours */}
      {list('gym_hours').length > 0 && (
        <section className="py-16 bg-primary text-white">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-2xl font-bold font-display mb-8">{v('gym_hours_title')}</h2>
              <div className={`grid gap-6 mb-8 ${list('gym_hours').length > 2 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'}`}>
                {list('gym_hours').map((h, i) => (
                  <div key={i} className="bg-white/10 rounded-2xl p-6">
                    <div className="text-3xl mb-2">{h.icon}</div>
                    <p className="text-accent font-bold mb-1">{h.label}</p>
                    <p className="text-white font-semibold">{h.value}</p>
                  </div>
                ))}
              </div>
              <a href={`tel:${phone}`}
                className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone}
              </a>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  )
}
