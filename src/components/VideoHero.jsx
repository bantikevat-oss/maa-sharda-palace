import { motion } from 'framer-motion'
import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'

export default function VideoHero() {
  const { config } = useAdmin()
  const phone     = config?.phone     || SITE_DEFAULTS.phone
  const whatsapp  = config?.whatsapp  || SITE_DEFAULTS.whatsapp
  const h1        = config?.hero_h1   || SITE_DEFAULTS.hero_h1
  const tagline   = config?.hero_tagline || SITE_DEFAULTS.hero_tagline
  const badge     = config?.hero_badge   || SITE_DEFAULTS.hero_badge
  const bookingUrl = config?.bookingUrl  || SITE_DEFAULTS.bookingUrl

  const videoId = '8IPnLZpV3CU'
  const start   = config?.video_start ?? 5
  const end     = config?.video_end   ?? ''

  const src = [
    `https://www.youtube.com/embed/${videoId}`,
    `?autoplay=1&mute=1&loop=1&playlist=${videoId}`,
    `&controls=0&rel=0&modestbranding=1&showinfo=0`,
    `&iv_load_policy=3&disablekb=1`,
    `&start=${start}`,
    end ? `&end=${end}` : '',
  ].join('')

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>

      {/* ── YouTube iframe – covers the full viewport ── */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src={src}
          title="Hotel Video"
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '100vw',
            height: '56.25vw',   /* 16:9 based on width  */
            minWidth: '177.78vh', /* 16:9 based on height */
            minHeight: '100vh',
          }}
        />
      </div>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />

      {/* ── Content ── */}
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4 pt-20">

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="inline-block bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-[0.25em] px-5 py-2 rounded-full text-amber-200 mb-6">
          {badge}
        </motion.span>

        {/* Hotel name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display font-bold leading-tight mb-4"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}>
          {h1}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="text-white/80 text-base md:text-xl max-w-2xl mb-10 leading-relaxed">
          {tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`tel:${phone}`}
            className="bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-bold text-base hover:brightness-110 transition shadow-lg shadow-amber-400/30">
            📞 {phone}
          </a>
          <a href={`https://wa.me/91${whatsapp.replace(/\D/g,'').replace(/^0+/,'')}?text=Hi, I'd like to book a room.`}
            target="_blank" rel="noopener noreferrer"
            className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-green-600 transition shadow-lg">
            💬 WhatsApp
          </a>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
            className="bg-white/15 border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/25 transition">
            Book Now →
          </a>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-amber-400 rounded-full animate-bounce" />
        </div>
      </motion.div>

    </section>
  )
}
