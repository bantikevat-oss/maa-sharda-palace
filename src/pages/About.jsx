import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../hooks/useSite'
import { useSEO } from '../hooks/useSEO'
import { fadeUp, staggerContainer, slideLeft, slideRight } from '../animations'
import AnimatedNumber from '../components/ui/AnimatedNumber'
import GradientText from '../components/ui/GradientText'

export default function About() {
  const { v, list, on, paras } = useSite()

  useSEO({
    title: v('seo_about_title'),
    description: v('seo_about_desc'),
    ogImage: v('about_hero_img'),
  })

  const phone = v('phone')
  const collage = ['about_collage_1', 'about_collage_2', 'about_collage_3', 'about_collage_4'].map(k => v(k)).filter(Boolean)
  const stats = list('hotel_stats')

  return (
    <main className="pt-24">
      {/* Hero Banner */}
      <section className="relative h-72 md:h-96 bg-primary overflow-hidden">
        {v('about_hero_img') && (
          <img src={v('about_hero_img')} alt={v('businessName')}
            className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-primary/30" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3 drop-shadow-lg">
            <GradientText>{v('about_hero_title')}</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">About</span>
          </nav>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('about_welcome_eyebrow')}</p>
              <h2 className="text-4xl font-bold text-primary font-display mb-6">{v('about_welcome_title')}</h2>
              {paras('about_welcome_body').map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">{p}</p>
              ))}
            </motion.div>
            {collage.length > 0 && (
              <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="grid grid-cols-2 gap-4">
                  {collage.map((src, i) => (
                    <img key={i} src={src} alt="" loading="lazy"
                      className={`rounded-2xl h-48 w-full object-cover ${['', 'mt-8', '-mt-4', 'mt-4'][i % 4]}`} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      {on('show_about_stats') && stats.length > 0 && (
        <section className="py-14 bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`grid grid-cols-2 gap-8 text-center ${stats.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
              {stats.map((s, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div className="text-4xl font-bold font-display text-accent">
                    <AnimatedNumber value={parseInt(s.value, 10) || 0} />{s.suffix}
                  </div>
                  <div className="text-white/70 text-sm mt-1">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Story / Mission / Vision */}
      <section className="pt-20 pb-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('about_story_eyebrow')}</p>
            <h2 className="text-4xl font-bold text-primary font-display">{v('about_story_title')}</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 items-stretch">
            {list('about_story_cards').map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-8 shadow-sm text-center flex flex-col h-full">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary font-display mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 text-justify [text-align-last:center]">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('about_why_eyebrow')}</p>
            <h2 className="text-4xl font-bold text-primary font-display">
              <GradientText>{v('about_why_title')}</GradientText>
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {list('about_why_items').map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <p className="text-gray-700 font-medium text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('about_fac_eyebrow')}</p>
            <h2 className="text-4xl font-bold font-display"><GradientText>{v('about_fac_title')}</GradientText></h2>
            <p className="text-white/60 mt-3 text-sm max-w-xl mx-auto">{v('about_fac_desc')}</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {list('about_facilities').map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white/10 rounded-xl p-5 text-center hover:bg-white/20 transition-colors">
                <div className="text-3xl mb-2">{f.icon}</div>
                <p className="text-white/90 text-xs font-medium leading-tight">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {v('about_promise_img') && (
                <img src={v('about_promise_img')} alt="" loading="lazy"
                  className="rounded-3xl w-full h-80 object-cover shadow-xl" />
              )}
            </motion.div>
            <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('about_promise_eyebrow')}</p>
              <h2 className="text-4xl font-bold text-primary font-display mb-6">{v('about_promise_title')}</h2>
              {paras('about_promise_body').map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">{p}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-16 bg-accent/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-5xl mb-4">{v('about_commit_icon')}</div>
            <h2 className="text-3xl font-bold text-primary font-display mb-4">{v('about_commit_title')}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{v('about_commit_body')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${phone}`}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone}
              </a>
              <Link to={v('about_commit_cta_link')}
                className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
                {v('about_commit_cta')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
