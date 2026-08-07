import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../../hooks/useSite'
import { useSEO } from '../../hooks/useSEO'
import { fadeUp, staggerContainer } from '../../animations'
import GradientText from '../../components/ui/GradientText'

export default function Temple() {
  const { v, list } = useSite()

  const mainImg = v('img_mandir')

  useSEO({
    title: v('seo_mandir_title'),
    description: v('seo_mandir_desc'),
    ogImage: mainImg,
  })

  const phone = v('phone')
  const photos = ['img_mandir', 'img_mandir_2', 'img_mandir_3'].map(k => v(k)).filter(Boolean)

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-96 bg-primary overflow-hidden">
        {mainImg && (
          <img src={mainImg} alt={v('temple_title')} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{v('temple_eyebrow')}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            <GradientText>{v('temple_title')}</GradientText>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/70 text-sm">{v('temple_subtitle')}</motion.p>
          <nav className="text-sm text-white/60 mt-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/amenities" className="hover:text-accent">Amenities</Link>
            <span className="mx-2">/</span>
            <span className="text-white">In-House Temple</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('temple_intro_eyebrow')}</p>
              <h2 className="text-4xl font-bold text-primary font-display mb-6">
                <GradientText>{v('temple_intro_title')}</GradientText>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{v('temple_intro_body')}</p>

              <a href={`tel:${phone}`}
                className="inline-block bg-accent text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                {v('temple_cta_label')}
              </a>
            </motion.div>

            {photos.length > 0 && (
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="grid grid-cols-2 gap-4">
                {photos.map((src, i) => (
                  <motion.div key={i} variants={fadeUp} className={photos.length === 3 && i === 2 ? 'col-span-2' : ''}>
                    <img src={src} alt={`In-House Temple view ${i + 1}`} loading="lazy"
                      className="rounded-2xl w-full h-44 object-cover shadow-md" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Highlights */}
      {list('temple_features').length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-10">
              <h2 className="text-3xl font-bold text-primary font-display"><GradientText>{v('temple_features_title')}</GradientText></h2>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6">
              {list('temple_features').map((f, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100 hover:border-accent/30 transition-all">
                  <div className="text-4xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-primary mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold font-display mb-2">{v('temple_bottom_title')}</h2>
          <p className="text-white/60 mb-6 text-sm">{v('temple_bottom_desc')}</p>
          <a href={`tel:${phone}`}
            className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
            📞 {phone}
          </a>
        </div>
      </section>
    </main>
  )
}
