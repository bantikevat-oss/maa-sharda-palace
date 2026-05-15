import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import { useSEO } from '../hooks/useSEO'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '../animations'
import { Link } from 'react-router-dom'
import GradientText from '../components/ui/GradientText'
import { useState } from 'react'

const SERVICES = [
  { icon: '💍', title: 'Grand Ceremony', desc: 'Floral mandap, traditional rituals & elegant décor for a perfect beginning.' },
  { icon: '🥂', title: 'Royal Reception', desc: 'Opulent evening with premium lighting, stage & live entertainment.' },
  { icon: '🎶', title: 'Sangeet Night', desc: 'Vibrant music, dance & laughter — memories crafted for a lifetime.' },
  { icon: '🌸', title: 'Mehendi Ceremony', desc: 'Beautifully decorated intimate setup with traditional floral ambience.' },
  { icon: '🎂', title: 'Wedding Cake', desc: 'Exquisite multi-tiered cakes as beautiful as your love story.' },
  { icon: '📸', title: 'Photo Shoot Setup', desc: 'Stunning backdrops & floral walls for breathtaking photographs.' },
  { icon: '🎵', title: 'Live Music & DJ', desc: 'Professional bands & DJs to keep your guests dancing all night.' },
  { icon: '🕯️', title: 'Candle & Floral Décor', desc: 'Rose petal paths & lush arrangements transforming every corner.' },
]

const WHY_US = [
  { icon: '🏛️', title: 'Grand Venue', desc: 'Spacious hall for 100–150 guests with majestic architecture & ambiance.' },
  { icon: '✨', title: 'Premium Décor', desc: 'Expert decorators bring your vision to life with luxury florals & drapes.' },
  { icon: '🍽️', title: 'Fine Catering', desc: 'Multi-cuisine menu by experienced chefs — Indian & continental spreads.' },
  { icon: '🎬', title: 'Grand Stage', desc: 'LED-lit stage with premium backdrops — every photo picture perfect.' },
  { icon: '🚘', title: 'Valet Parking', desc: 'Complimentary valet for all guests ensuring seamless arrivals.' },
  { icon: '🤝', title: 'Personal Coordinator', desc: 'Dedicated coordinator handling every detail so you enjoy your day.' },
]

// Gallery with VARIED photos — no duplicates, different categories
const GALLERY = [
  { src: '/images/banquet_grand.jpg', alt: 'Grand Banquet Hall', span: 'large' },
  { src: '/images/hotel_front.jpg', alt: 'Hotel Exterior', span: 'normal' },
  { src: '/images/banquet_3.jpg', alt: 'Wedding Décor', span: 'normal' },
  { src: '/images/pool_indoor.jpg', alt: 'Indoor Pool', span: 'normal' },
  { src: '/images/banquet_4.jpg', alt: 'Wedding Stage', span: 'normal' },
  { src: '/images/room_executive_suite.jpg', alt: 'Luxury Suite', span: 'normal' },
  { src: '/images/banquet_5.jpg', alt: 'Wedding Lighting', span: 'normal' },
  { src: '/images/hotel_corridor.jpg', alt: 'Hotel Corridor', span: 'normal' },
  { src: '/images/banquet_6.jpg', alt: 'Banquet View', span: 'normal' },
]

const TESTIMONIALS = [
  { name: 'Priya & Rahul', location: 'Indore', text: 'Maa Sharda Palace made our wedding truly magical. The décor was breathtaking, food was exceptional, and staff made us feel like royalty.', date: 'Feb 2026', initial: 'P' },
  { name: 'Anjali & Vikas', location: 'Bhopal', text: 'The grand hall, the lighting, the catering — everything was beyond our expectations. Our guests are still talking about it!', date: 'Jan 2026', initial: 'A' },
  { name: 'Sunita & Deepak', location: 'Ujjain', text: 'From sangeet to reception, every event was handled with care and professionalism. The team went above and beyond to make our dream real.', date: 'Mar 2026', initial: 'S' },
]

export default function Wedding() {
  const { config } = useAdmin()
  const phone = config?.phone || SITE_DEFAULTS.phone
  const phone2 = config?.phone2 || SITE_DEFAULTS.phone2
  const whatsapp = config?.whatsapp || SITE_DEFAULTS.whatsapp
  const [lightbox, setLightbox] = useState(null)

  useSEO({
    title: 'Wedding Venue in Ujjain | Hotel Maa Sharda Palace',
    description: 'Plan your dream wedding at Hotel Maa Sharda Palace Ujjain. Grand banquet hall, premium décor, fine catering & expert coordination. Capacity 100–150 guests.',
    image: '/images/banquet_grand.jpg',
  })

  return (
    <main className="pt-0">

      {/* ══════════════════════════════════════
          HERO — CINEMATIC FULL SCREEN
      ══════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <img src="/images/banquet_grand.jpg" alt="Wedding Venue"
          className="absolute inset-0 w-full h-full object-cover scale-105" />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        {/* Gold ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-yellow-500/10 blur-[80px] rounded-full" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Elegant label */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-[0.4em]">Hotel Maa Sharda Palace</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-yellow-400 to-yellow-400" />
          </motion.div>

          {/* Main heading */}
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: 'spring', stiffness: 60 }}
            className="font-display font-bold text-white leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
            Your Dream<br />
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Wedding
            </span>{' '}
            <span className="text-white">Awaits</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-white/75 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Where every detail is crafted with love, every moment is made magical, and every celebration becomes a timeless memory.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 justify-center mb-16">
            <a href={`tel:${phone}`}
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-sm md:text-base hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all duration-300">
              <span className="relative z-10">📞 Plan Your Wedding</span>
            </a>
            <a href="#gallery"
              className="border border-white/40 text-white px-8 py-4 rounded-full font-semibold text-sm md:text-base hover:bg-white/10 hover:border-white/70 transition-all duration-300 backdrop-blur-sm">
              View Gallery ↓
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
            {[['100–150', 'Guest Capacity'], ['3+', 'Banquet Halls'], ['500+', 'Weddings Hosted'], ['24/7', 'Event Support']].map(([val, label], i) => (
              <div key={i} className="bg-black/20 py-5 px-4 text-center hover:bg-black/10 transition-colors">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">{val}</div>
                <div className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-yellow-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          ELEGANT INTRO
      ══════════════════════════════════════ */}
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
            <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">Begin Your Forever</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-6 leading-tight">
              Celebrate Love at <GradientText>Maa Sharda Palace</GradientText>
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Our experienced event specialists work closely with you to personalize every detail and bring your vision to life — creating a celebration that is truly unforgettable. From intimate gatherings to grand royal celebrations, we make every wedding extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY CHOOSE US — PREMIUM CARDS
      ══════════════════════════════════════ */}
      <section className="py-20 bg-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-3">Why Choose Us</p>
            <h2 className="text-4xl font-bold font-display text-gray-900">
              The Perfect <GradientText>Wedding Venue</GradientText>
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-xl hover:border-yellow-200 transition-all duration-500 overflow-hidden">
                {/* Gold corner accent */}
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

      {/* ══════════════════════════════════════
          WEDDING SERVICES — DARK LUXURY
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0c1d 0%, #1a1a2e 50%, #0f0c1d 100%)' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-yellow-400/5 blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-yellow-600/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-900/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-yellow-400/80 text-xs font-semibold uppercase tracking-[0.3em] mb-3">Curated for You</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              Wedding <GradientText>Highlights</GradientText>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">Every service crafted to perfection for your most special day</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 text-center hover:bg-white/[0.08] hover:border-yellow-400/30 transition-all duration-500 cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />
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

      {/* ══════════════════════════════════════
          VENUE SHOWCASE
      ══════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image side */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative order-2 lg:order-1">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 relative">
                <img src="/images/banquet_grand.jpg" alt="Wedding Hall" className="w-full h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Small overlay image */}
              <div className="absolute -bottom-8 -right-8 w-44 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img src="/images/banquet_4.jpg" alt="Wedding Stage" className="w-full h-full object-cover" />
              </div>
              {/* Rating badge */}
              <div className="absolute -top-5 -left-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-xl p-4 text-gray-900">
                <p className="font-bold text-xl leading-none">⭐ 5.0</p>
                <p className="text-xs font-semibold opacity-80 mt-1">Couples Rating</p>
              </div>
              {/* Weddings badge */}
              <div className="absolute bottom-20 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-yellow-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-xl shrink-0">💍</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">500+ Weddings</p>
                    <p className="text-gray-400 text-xs">Successfully Hosted</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="order-1 lg:order-2">
              <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-3">The Venue</p>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-6 leading-tight">
                A Hall Fit for <GradientText>Royalty</GradientText>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 text-base">
                Our grand banquet hall is designed to transform your wedding into an extraordinary experience. Soaring ceilings, premium acoustics, mood lighting and elegant architecture — every inch exudes luxury and sophistication.
              </p>

              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  ['👥', 'Capacity', '100–150 Guests'],
                  ['❄️', 'Climate', 'Full AC'],
                  ['🔊', 'Sound', 'Premium System'],
                  ['💡', 'Lighting', 'Mood + LED'],
                  ['🎬', 'Stage', 'Grand LED Stage'],
                  ['🚘', 'Parking', 'Valet Service'],
                ].map(([icon, label, value], i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#faf8f3] rounded-xl p-3.5 border border-yellow-50">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-bold text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={`tel:${phone}`}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-7 py-3.5 rounded-full font-bold hover:brightness-110 hover:shadow-lg hover:shadow-yellow-200 transition-all text-sm">
                  📞 Book Venue
                </a>
                <Link to="/amenities/banquet"
                  className="border-2 border-gray-200 text-gray-700 px-7 py-3.5 rounded-full font-semibold hover:border-yellow-400 hover:text-yellow-700 transition-all text-sm">
                  View Banquet Hall →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY — VARIED MASONRY
      ══════════════════════════════════════ */}
      <section id="gallery" className="py-20 bg-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-3">Gallery</p>
            <h2 className="text-4xl font-bold font-display text-gray-900">
              Moments of <GradientText>Elegance</GradientText>
            </h2>
            <p className="text-gray-400 mt-3 text-sm">A glimpse of the magic we create</p>
          </motion.div>

          {/* Masonry-style grid with varied sizes */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>

            {/* Row 1 — 1 big + 2 small */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <motion.div variants={fadeUp} className="col-span-2 relative overflow-hidden rounded-2xl cursor-pointer group h-72"
                onClick={() => setLightbox(GALLERY[0])}>
                <img src={GALLERY[0].src} alt={GALLERY[0].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-end p-5">
                  <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">{GALLERY[0].alt}</span>
                </div>
              </motion.div>
              <div className="flex flex-col gap-4">
                {[GALLERY[1], GALLERY[2]].map((img, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex-1 relative overflow-hidden rounded-2xl cursor-pointer group"
                    onClick={() => setLightbox(img)}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Row 2 — 3 equal */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[GALLERY[3], GALLERY[4], GALLERY[5]].map((img, i) => (
                <motion.div key={i} variants={fadeUp} className="relative overflow-hidden rounded-2xl cursor-pointer group h-56"
                  onClick={() => setLightbox(img)}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{img.alt}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 3 — 2 small + 1 big */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-4">
                {[GALLERY[6], GALLERY[7]].map((img, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex-1 relative overflow-hidden rounded-2xl cursor-pointer group h-32"
                    onClick={() => setLightbox(img)}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300" />
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeUp} className="col-span-2 relative overflow-hidden rounded-2xl cursor-pointer group h-72"
                onClick={() => setLightbox(GALLERY[8])}>
                <img src={GALLERY[8].src} alt={GALLERY[8].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-end p-5">
                  <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">{GALLERY[8].alt}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-yellow-600 text-xs font-semibold uppercase tracking-[0.3em] mb-3">Happy Couples</p>
            <h2 className="text-4xl font-bold font-display text-gray-900">
              Love Stories at <GradientText>Maa Sharda Palace</GradientText>
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl" />
                {/* Quote icon */}
                <div className="text-5xl text-yellow-100 font-serif leading-none mb-4 select-none">"</div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 italic">{t.text}</p>
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">💍 {t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LUXURY CTA
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <img src="/images/banquet_5.jpg" alt="Wedding"
          className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 via-transparent to-yellow-900/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-64 bg-yellow-400/10 blur-[80px] rounded-full" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400" />
              <span className="text-yellow-400 text-3xl">💍</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4 leading-tight">
              Let's Plan Your{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                Perfect Day
              </span>
            </h2>
            <p className="text-white/60 mb-12 text-base max-w-2xl mx-auto leading-relaxed">
              Our dedicated wedding team is ready to turn your vision into reality. Get in touch today for a personalized consultation and exclusive packages.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${phone}`}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold hover:brightness-110 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all text-sm md:text-base">
                📞 {phone}
              </a>
              <a href={`tel:${phone2}`}
                className="bg-white/10 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-sm md:text-base">
                📞 {phone2}
              </a>
              <a href={`https://wa.me/91${whatsapp.replace(/^0+/, '')}`}
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
              <button onClick={() => setLightbox(null)}
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
