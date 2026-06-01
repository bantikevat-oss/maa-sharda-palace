import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import TextReveal from './ui/TextReveal'
import ShimmerButton from './ui/ShimmerButton'
import { fadeIn, fadeUp } from '../animations'

export default function Hero() {
  const { config } = useAdmin()
  const h1       = config?.hero_h1       || SITE_DEFAULTS.hero_h1
  const tagline  = config?.hero_tagline  || SITE_DEFAULTS.hero_tagline
  const desc     = config?.hero_desc     || SITE_DEFAULTS.hero_desc
  const phone    = config?.phone         || SITE_DEFAULTS.phone
  const whatsapp = config?.whatsapp      || SITE_DEFAULTS.whatsapp
  const waLink   = `https://wa.me/91${whatsapp.replace(/\D/g,'').replace(/^91/,'')}?text=Hi, I'd like to book a room at Hotel Maa Sharda Palace.`

  const slides = [
    config?.img_hero_bg    || SITE_DEFAULTS.img_hero_bg,
    config?.img_hero_bg_2  || SITE_DEFAULTS.img_hero_bg_2,
    config?.hero_slide_3   || SITE_DEFAULTS.hero_slide_3,
    config?.hero_slide_4   || SITE_DEFAULTS.hero_slide_4,
  ].filter(Boolean)

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Slider Background */}
      <AnimatePresence mode="sync">
        {slides.map((src, i) => i === current && (
          <motion.div key={i}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-primary">
            <img src={src} alt="" className="w-full h-full object-cover object-center scale-105"
              style={{ animation: 'slowZoom 10s ease-in-out infinite alternate' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Slide dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 w-full">
        <div className="max-w-2xl">
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white font-display leading-tight mt-6 mb-4">
            <TextReveal text={h1} />
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.35 }}
            className="text-accent text-xl md:text-2xl font-display italic mb-4">
            {tagline}
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.5 }}
            className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            {desc}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.65 }}
            className="flex flex-wrap gap-4">
            <ShimmerButton href={waLink} target="_blank" rel="noopener noreferrer" className="text-base px-8 py-4">
              🏨 Book Your Stay
            </ShimmerButton>
            <a href={`tel:${phone}`}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/20 transition">
              📞 {phone}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-4 text-sm text-white/70">
            {['✓ 59 Rooms', '✓ 3 Banquet Halls', '✓ Indoor Pool', '✓ Gym', '✓ Prime Location'].map(f => (
              <span key={f}>{f}</span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-10 right-8 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <span className="text-white/40 text-xs tracking-widest rotate-90 origin-center">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>

      <style>{`
        @keyframes slowZoom { from { transform: scale(1.05); } to { transform: scale(1.12); } }
      `}</style>
    </section>
  )
}
