import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../hooks/useSite'
import { useSEO } from '../hooks/useSEO'
import { fadeUp, staggerContainer } from '../animations'
import GradientText from '../components/ui/GradientText'

export default function Dining() {
  const { v, list, on } = useSite()

  useSEO({
    title: v('seo_dining_title'),
    description: v('seo_dining_desc'),
    ogImage: v('dining_hero_img'),
  })

  const phone = v('phone')
  const phone2 = v('phone2')

  return (
    <main className="pt-24">
      {/* Hero Banner */}
      <section className="relative h-72 bg-primary overflow-hidden">
        {v('dining_hero_img') && (
          <img src={v('dining_hero_img')} alt={v('dining_title')}
            className="absolute inset-0 w-full h-full object-cover opacity-35" />
        )}
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{v('dining_eyebrow')}</p>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">
              <GradientText>{v('dining_title')}</GradientText>
            </h1>
            <nav className="text-sm text-white/60 mt-4">
              <Link to="/" className="hover:text-accent">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Dining</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {v('dining_badge') && (
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-5 py-2 rounded-full text-sm font-semibold mb-8">
                {v('dining_badge')}
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-display mb-6">
              <GradientText>{v('dining_intro_title')}</GradientText>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4 max-w-2xl mx-auto">{v('dining_intro_body')}</p>
            <p className="text-gray-500 text-base">{v('dining_intro_note')}</p>
          </motion.div>
        </div>
      </section>

      {/* Preview gallery */}
      {on('show_dining_gallery') && list('dining_gallery').length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('dining_gallery_eyebrow')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">
                <GradientText>{v('dining_gallery_title')}</GradientText>
              </h2>
              <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">{v('dining_gallery_desc')}</p>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {list('dining_gallery').map((img, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="relative overflow-hidden rounded-2xl shadow-md group h-64 bg-gray-100">
                  <img src={img.src} alt={img.alt} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                  {v('dining_gallery_badge') && (
                    <span className="absolute top-3 left-3 bg-accent text-primary text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                      {v('dining_gallery_badge')}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* What to expect */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('dining_menu_eyebrow')}</p>
            <h2 className="text-4xl font-bold text-primary font-display"><GradientText>{v('dining_menu_title')}</GradientText></h2>
            <p className="text-gray-500 mt-3 text-sm">{v('dining_menu_desc')}</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {list('dining_menu').map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-accent/30 transition-all text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features strip */}
      {list('dining_features').length > 0 && (
        <section className="py-14 bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {list('dining_features').map((f, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div className="text-4xl mb-2">{f.icon}</div>
                  <p className="text-white/80 text-sm font-medium">{f.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-primary font-display mb-4">{v('dining_cta_title')}</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">{v('dining_cta_desc')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${phone}`}
                className="bg-yellow-400 text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone}
              </a>
              {phone2 && (
                <a href={`tel:${phone2}`}
                  className="bg-red-500 text-white px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                  📞 {phone2}
                </a>
              )}
              <Link to="/contact"
                className="bg-primary text-white px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                {v('dining_cta_btn')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
