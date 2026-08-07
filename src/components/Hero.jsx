import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSite } from '../hooks/useSite'
import TextReveal from './ui/TextReveal'
import ShimmerButton from './ui/ShimmerButton'
import { fadeUp } from '../animations'

export default function Hero() {
  const { v, list, wa } = useSite()

  const phone = v('phone')
  const slides = ['img_hero_bg', 'img_hero_bg_2', 'hero_slide_3', 'hero_slide_4']
    .map(k => v(k))
    .filter(Boolean)
  const features = list('hero_features')
  const seconds = Number(v('hero_slide_seconds')) || 5

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), seconds * 1000)
    return () => clearInterval(timer)
  }, [slides.length, seconds])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Slider Background */}
      <AnimatePresence mode="sync">
        {slides.map((src, i) => i === current && (
          <motion.div key={i}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-primary">
            <img src={src} alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Slide dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 w-full">
        <div className="max-w-2xl">
          {v('hero_badge') && (
            <motion.span variants={fadeUp} initial="hidden" animate="visible"
              className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs px-4 py-1.5 rounded-full">
              {v('hero_badge')}
            </motion.span>
          )}

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white font-display leading-tight mt-6 mb-4">
            <TextReveal text={v('hero_h1')} />
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.35 }}
            className="text-accent text-xl md:text-2xl font-display italic mb-4">
            {v('hero_tagline')}
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.5 }}
            className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            {v('hero_desc')}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.65 }}
            className="flex flex-wrap gap-4">
            <ShimmerButton href={wa()} target="_blank" rel="noopener noreferrer" className="text-base px-8 py-4">
              {v('hero_cta_label')}
            </ShimmerButton>
            <a href={`tel:${phone}`}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/20 transition">
              📞 {phone}
            </a>
          </motion.div>

          {features.length > 0 && (
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-4 text-sm text-white/70">
              {features.map((f, i) => <span key={i}>{f}</span>)}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
