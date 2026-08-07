import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../../hooks/useSite'
import { useSEO } from '../../hooks/useSEO'
import { fadeUp, staggerContainer } from '../../animations'
import GradientText from '../../components/ui/GradientText'

export default function BanquetHall() {
  const { v, list, on, wa } = useSite()

  useSEO({
    title: v('seo_banquet_title'),
    description: v('seo_banquet_desc'),
    ogImage: v('bq_hero_img'),
  })

  const phone2 = v('phone2') || v('phone')
  const videoId = v('bq_video_id')
  const halls = list('bq_halls')

  return (
    <main className="pt-0">

      {/* Hero — YouTube video, or the fallback image when no video is set */}
      <section className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>
        {videoId ? (
          <div className="absolute inset-0 pointer-events-none">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&start=${Number(v('bq_video_start')) || 0}`}
              title="Banquet Hall Tour"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: '100vw', height: '56.25vw', minWidth: '177.78vh', minHeight: '100vh' }}
            />
          </div>
        ) : v('bq_hero_img') ? (
          <img src={v('bq_hero_img')} alt={v('bq_title')} className="absolute inset-0 w-full h-full object-cover" />
        ) : null}

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />

        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4 pt-20">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-amber-300 text-xs font-semibold uppercase tracking-[0.3em] mb-5">
            {v('bq_eyebrow')}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}>
            <GradientText>{v('bq_title')}</GradientText>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-white/75 text-base md:text-lg max-w-xl mb-8">
            {v('bq_desc')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${phone2}`}
              className="bg-amber-400 text-gray-900 px-7 py-3.5 rounded-full font-bold text-sm hover:brightness-110 transition shadow-lg">
              {v('bq_cta_label')} — {phone2}
            </a>
            <a href={wa("Hi, I'd like to enquire about the Banquet Hall.", 'phone2')}
              target="_blank" rel="noopener noreferrer"
              className="bg-green-500 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-green-600 transition shadow-lg">
              💬 WhatsApp Enquiry
            </a>
          </motion.div>
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="text-xs text-white/40 mt-6">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Banquet Hall</span>
          </motion.nav>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-amber-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Halls — alternating layout */}
      {halls.map((hall, i) => {
        const reverse = i % 2 === 1
        const thumbs = [hall.img2, hall.img3].filter(Boolean)
        const chips = Array.isArray(hall.chips) ? hall.chips : []
        const Images = (
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-3">
              {hall.img && (
                <img src={hall.img} alt={`${hall.name} — main view`} loading="lazy"
                  className="col-span-2 rounded-2xl w-full h-56 object-cover shadow-lg" />
              )}
              {thumbs.map((t, j) => (
                <img key={j} src={t} alt={`${hall.name} — view ${j + 2}`} loading="lazy"
                  className={`rounded-2xl w-full object-cover shadow-md ${thumbs.length === 1 ? 'col-span-2 h-40' : 'h-32'}`} />
              ))}
            </div>
            {hall.capacity && <p className="text-center text-sm text-gray-400 mt-3">Capacity: {hall.capacity}</p>}
          </motion.div>
        )
        const Content = (
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {hall.tag && <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">{hall.tag}</span>}
            <h2 className="text-4xl font-bold text-primary font-display mb-4">
              <GradientText>{hall.name}</GradientText>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{hall.desc}</p>
            {chips.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {chips.map((c, j) => (
                  <span key={j} className="bg-accent/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">{c}</span>
                ))}
              </div>
            )}
          </motion.div>
        )
        return (
          <section key={i} className={`py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-14 items-center">
                {reverse ? <>{Images}{Content}</> : <>{Content}{Images}</>}
              </div>
            </div>
          </section>
        )
      })}

      {/* Features */}
      {list('bq_features').length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('bq_features_eyebrow')}</p>
              <h2 className="text-4xl font-bold text-primary font-display"><GradientText>{v('bq_features_title')}</GradientText></h2>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {list('bq_features').map((f, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-accent/20 transition-all">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-primary mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Wedding strip */}
      {on('show_bq_wedding') && (
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('bq_wedding_eyebrow')}</p>
              <h2 className="text-4xl font-bold font-display"><GradientText>{v('bq_wedding_title')}</GradientText></h2>
              <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm">{v('bq_wedding_desc')}</p>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {list('bq_wedding_services').map((s, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="bg-white/10 rounded-xl p-5 text-center hover:bg-white/20 transition-colors">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="text-white/90 text-sm font-medium">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center">
              <Link to="/wedding"
                className="inline-block bg-accent text-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
                Explore Wedding Packages →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-accent/5 border-t border-accent/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-primary font-display mb-4">{v('bq_cta_title')}</h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-base">{v('bq_cta_desc')}</p>
            <p className="font-semibold text-primary mb-6">{v('bq_cta_note')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${phone2}`}
                className="bg-yellow-400 text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone2}
              </a>
              <a href={wa("Hi, I'd like to enquire about banquet hall booking.", 'phone2')}
                target="_blank" rel="noopener noreferrer"
                className="bg-green-500 text-white px-7 py-3 rounded-full font-bold hover:bg-green-600 transition">
                💬 WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
