import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSite, highlight } from '../hooks/useSite'
import { useSEO } from '../hooks/useSEO'
import { fadeUp, staggerContainer } from '../animations'
import GradientText from '../components/ui/GradientText'

const GOLD = 'bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent'

export default function Wedding() {
  const { v, list, on, wa } = useSite()
  const [lightbox, setLightbox] = useState(null)

  useSEO({
    title: v('seo_wedding_title'),
    description: v('seo_wedding_desc'),
    ogImage: v('wd_hero_img'),
  })

  const phone2 = v('phone2') || v('phone')
  const gallery = list('wd_gallery').filter(g => g.src)
  const halls = list('bq_halls')

  return (
    <main className="pt-0">

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {v('wd_hero_img') && (
          <img src={v('wd_hero_img')} alt="Wedding Venue" className="absolute inset-0 w-full h-full object-cover scale-105" />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-yellow-500/10 blur-[80px] rounded-full" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-[0.4em]">{v('wd_hero_label')}</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-yellow-400 to-yellow-400" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: 'spring', stiffness: 60 }}
            className="font-display font-bold text-white leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
            {highlight(v('wd_hero_title'), GOLD)}
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-white/75 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {v('wd_hero_desc')}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 justify-center mb-16">
            <a href={`tel:${phone2}`}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-sm md:text-base hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all duration-300">
              {v('wd_hero_cta')}
            </a>
            <a href="#gallery"
              className="border border-white/40 text-white px-8 py-4 rounded-full font-semibold text-sm md:text-base hover:bg-white/10 hover:border-white/70 transition-all duration-300 backdrop-blur-sm">
              {v('wd_hero_cta2')}
            </a>
          </motion.div>

          {list('wd_stats').length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
              {list('wd_stats').map((s, i) => (
                <div key={i} className="bg-black/20 py-5 px-4 text-center hover:bg-black/10 transition-colors">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">{s.value}</div>
                  <div className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-yellow-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-yellow-400" />
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              </div>
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-yellow-400" />
            </div>
            <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">{v('wd_intro_eyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-6 leading-tight">
              <GradientText>{v('wd_intro_title')}</GradientText>
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">{v('wd_intro_body')}</p>
          </motion.div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 bg-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-3">{v('wd_why_eyebrow')}</p>
            <h2 className="text-4xl font-bold font-display text-gray-900">
              <GradientText>{v('wd_why_title')}</GradientText>
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list('wd_why').map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-xl hover:border-yellow-200 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-50 to-transparent rounded-bl-3xl" />
                <div className="relative">
                  <div className="text-4xl mb-5">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-yellow-700 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  <div className="mt-6 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-200 group-hover:w-16 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0c1d 0%, #1a1a2e 50%, #0f0c1d 100%)' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-yellow-400/5 blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-yellow-600/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-900/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-yellow-400/80 text-xs font-semibold uppercase tracking-[0.3em] mb-3">{v('wd_services_eyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              <GradientText>{v('wd_services_title')}</GradientText>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">{v('wd_services_desc')}</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {list('wd_services').map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 text-center hover:bg-white/[0.08] hover:border-yellow-400/30 transition-all duration-500 overflow-hidden">
                <div className="relative">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                  <h3 className="text-white/90 font-bold text-sm mb-2 group-hover:text-yellow-400 transition-colors">{s.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VENUE SHOWCASE */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative order-2 lg:order-1">
              {v('wd_venue_img') && (
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 relative">
                  <img src={v('wd_venue_img')} alt="Wedding Hall" className="w-full h-[480px] object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}
              {v('wd_venue_img2') && (
                <div className="hidden lg:block absolute -bottom-8 -right-8 w-44 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img src={v('wd_venue_img2')} alt="Wedding Stage" className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              {v('wd_venue_rating') && (
                <div className="hidden lg:block absolute -top-5 -left-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-xl p-4 text-gray-900">
                  <p className="font-bold text-xl leading-none">{v('wd_venue_rating')}</p>
                  <p className="text-xs font-semibold opacity-80 mt-1">{v('wd_venue_rating_label')}</p>
                </div>
              )}
              {v('wd_venue_count') && (
                <div className="hidden lg:flex absolute bottom-20 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-xl shrink-0">💍</div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{v('wd_venue_count')}</p>
                      <p className="text-gray-400 text-xs">{v('wd_venue_count_label')}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="order-1 lg:order-2">
              <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-3">{v('wd_venue_eyebrow')}</p>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-6 leading-tight">
                <GradientText>{v('wd_venue_title')}</GradientText>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 text-base">{v('wd_venue_body')}</p>

              <div className="grid grid-cols-2 gap-3 mb-10">
                {list('wd_venue_specs').map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#faf8f3] rounded-xl p-3.5 border border-yellow-50">
                    <span className="text-2xl">{spec.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{spec.label}</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HALLS */}
      {on('show_wd_halls') && halls.length > 0 && (
        <section className="py-20 bg-[#faf8f3]">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-3">{v('wd_halls_eyebrow')}</p>
              <h2 className="text-4xl font-bold font-display text-gray-900">
                <GradientText>{v('wd_halls_title')}</GradientText>
              </h2>
              <p className="text-gray-400 mt-3 text-sm">{v('wd_halls_desc')}</p>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6">
              {halls.map((hall, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="bg-white rounded-3xl p-8 border border-yellow-100 shadow-sm hover:shadow-xl hover:border-yellow-300 transition-all duration-500 text-center">
                  <div className="text-5xl mb-4">{['🏛️', '🎊', '🌸'][i % 3]}</div>
                  <span className="text-yellow-600 text-xs font-bold uppercase tracking-widest">{hall.tag}</span>
                  <h3 className="text-xl font-bold text-gray-900 font-display my-2">{hall.name}</h3>
                  <p className="text-2xl font-bold text-yellow-500 mb-3">{hall.capacity}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{hall.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section id="gallery" className="py-20 bg-[#faf8f3]">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-3">{v('wd_gallery_eyebrow')}</p>
              <h2 className="text-4xl font-bold font-display text-gray-900">
                <GradientText>{v('wd_gallery_title')}</GradientText>
              </h2>
              <p className="text-gray-400 mt-3 text-sm">{v('wd_gallery_desc')}</p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {gallery.map((img, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group bg-gray-900 aspect-[4/3] shadow-md hover:shadow-xl transition-shadow"
                  onClick={() => setLightbox(img)}>
                  <img src={img.src} alt={img.alt} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-semibold tracking-wide">{img.alt}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {on('show_wd_testimonials') && list('wd_testimonials').length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
              <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-3">{v('wd_testi_eyebrow')}</p>
              <h2 className="text-4xl font-bold font-display text-gray-900">
                <GradientText>{v('wd_testi_title')}</GradientText>
              </h2>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6">
              {list('wd_testimonials').map((t, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl" />
                  <div className="text-5xl text-yellow-100 font-serif leading-none mb-4 select-none">"</div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 italic">{t.text}</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {String(t.name || '?').trim().charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">💍 {t.name}</p>
                      <p className="text-gray-400 text-xs">{[t.location, t.date].filter(Boolean).join(' · ')}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-28 relative overflow-hidden">
        {v('wd_cta_img') && (
          <img src={v('wd_cta_img')} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" loading="lazy" />
        )}
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 via-transparent to-yellow-900/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-64 bg-yellow-400/10 blur-[80px] rounded-full" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400" />
              <span className="text-yellow-400 text-3xl">💍</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4 leading-tight">
              {highlight(v('wd_cta_title'), GOLD)}
            </h2>
            <p className="text-white/60 mb-12 text-base max-w-2xl mx-auto leading-relaxed">{v('wd_cta_desc')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${phone2}`}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold hover:brightness-110 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all text-sm md:text-base">
                📞 {phone2}
              </a>
              <a href={wa("Hi, I'd like to enquire about a wedding booking.", 'phone2')}
                target="_blank" rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 hover:shadow-lg transition-all text-sm md:text-base">
                💬 WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}>
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.alt} className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
              <p className="text-white/60 text-center mt-4 text-sm">{lightbox.alt}</p>
              <button onClick={() => setLightbox(null)} aria-label="Close"
                className="absolute -top-4 -right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full text-white text-xl flex items-center justify-center transition backdrop-blur-sm">
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
