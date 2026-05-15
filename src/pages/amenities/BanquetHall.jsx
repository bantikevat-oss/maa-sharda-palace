import { useAdmin, SITE_DEFAULTS } from '../../contexts/AdminContext'
import { useSEO } from '../../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations'
import { Link } from 'react-router-dom'
import GradientText from '../../components/ui/GradientText'

const FEATURES = [
  { icon: '🎨', title: 'Stylish Décor', desc: 'Elegant and customizable décor to match your vision and theme perfectly.' },
  { icon: '🎤', title: 'Grand Stage', desc: 'Professionally designed stage with premium lighting for your special moment.' },
  { icon: '🔊', title: 'Premium Sound', desc: 'State-of-the-art sound system ensuring crystal clear audio for all events.' },
  { icon: '❄️', title: 'Full AC', desc: 'Fully air-conditioned halls for a comfortable experience year-round.' },
  { icon: '🍽️', title: 'Catering Service', desc: 'Multi-cuisine catering with customizable menus for every occasion.' },
  { icon: '🅿️', title: 'Ample Parking', desc: 'Spacious parking area with valet parking service for your guests.' },
]

const WEDDING_SERVICES = [
  { icon: '💍', label: 'Wedding Ceremony' },
  { icon: '🎊', label: 'Reception' },
  { icon: '💃', label: 'Sangeet Night' },
  { icon: '🌸', label: 'Mehendi Function' },
  { icon: '🍰', label: 'Cake Cutting' },
  { icon: '📸', label: 'Photo Shoot' },
  { icon: '🎶', label: 'Live Music' },
  { icon: '🕯️', label: 'Candle Décor' },
]

export default function BanquetHall() {
  const { config } = useAdmin()
  const phone = config?.phone || SITE_DEFAULTS.phone
  const phone2 = config?.phone2 || SITE_DEFAULTS.phone2
  const whatsapp = config?.whatsapp || SITE_DEFAULTS.whatsapp
  const videoUrl = config?.banquet_video_url || ''

  useSEO({
    title: config.seo_banquet?.title || 'Banquet Hall | Hotel Maa Sharda Palace Ujjain',
    description: config.seo_banquet?.description || 'Grand banquet halls for weddings, receptions and events at Hotel Maa Sharda Palace Ujjain. Capacity 100-150 guests.',
    image: config.img_banquet_1,
  })

  const photos = [
    config.img_banquet_1, config.img_banquet_2, config.img_banquet_3,
    config.img_banquet_4, config.img_banquet_5, config.img_banquet_6,
  ].filter(Boolean)

  return (
    <main className="pt-24">

      {/* Hero */}
      <section className="relative h-96 bg-primary overflow-hidden">
        <img src={config.img_banquet_1} alt="Banquet Hall"
          className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Events & Celebrations
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            Banquet Hall <GradientText>Ujjain</GradientText>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/70 max-w-xl text-sm">
            Stylish Décor &nbsp;|&nbsp; Grand Stage &nbsp;|&nbsp; Premium Sound Experience
          </motion.p>
          <nav className="text-sm text-white/60 mt-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Banquet</span>
          </nav>
        </div>
      </section>

      {/* Banquet Description + Capacity */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Our Banquet</p>
              <h2 className="text-4xl font-bold text-primary font-display mb-6">
                Grand Hall for Every <GradientText>Occasion</GradientText>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our banquet hall is designed to host a wide range of events — from lavish weddings and grand receptions to corporate gatherings and social celebrations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With elegant interiors, a grand stage, premium sound system, and experienced event staff, we ensure every event is flawlessly executed and truly unforgettable.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-accent/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  👥 Capacity: 100 – 150 Guests
                </span>
                <span className="bg-accent/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  🎪 Grand Stage
                </span>
                <span className="bg-accent/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  🔊 Premium Sound
                </span>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <img src={config.img_banquet_1} alt="Banquet Hall — Capacity 100-150 Guests"
                className="rounded-3xl w-full h-80 object-cover shadow-xl" />
              <p className="text-center text-sm text-gray-400 mt-3">Capacity: 100 – 150 Guests</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Facilities</p>
            <h2 className="text-4xl font-bold text-primary font-display">What We <GradientText>Offer</GradientText></h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
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

      {/* Wedding Highlight */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Wedding Special</p>
            <h2 className="text-4xl font-bold font-display">Your Dream <GradientText>Wedding</GradientText> Awaits</h2>
            <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm">
              Make your most special day truly unforgettable. Our dedicated wedding team handles every detail — from décor to catering — so you can enjoy every moment.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {WEDDING_SERVICES.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white/10 rounded-xl p-5 text-center hover:bg-white/20 transition-colors">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="text-white/90 text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <img src={config.img_banquet_2 || config.img_banquet_1} alt="Wedding Setup"
              className="rounded-2xl w-full h-64 object-cover" />
            <img src={config.img_banquet_3 || config.img_banquet_1} alt="Wedding Decoration"
              className="rounded-2xl w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Virtual Tour</p>
            <h2 className="text-4xl font-bold text-primary font-display">See Our <GradientText>Banquet Hall</GradientText></h2>
            <p className="text-gray-500 mt-3 text-sm">Take a virtual tour of our grand banquet hall and event spaces</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {videoUrl ? (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={videoUrl}
                  title="Banquet Hall Video Tour"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 h-80 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-gray-500 font-medium">Banquet Hall Video Tour</p>
                <p className="text-gray-400 text-sm mt-1">Video will appear here once uploaded</p>
                <p className="text-xs text-gray-400 mt-3">Admin panel se video URL add karein</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Gallery</p>
            <h2 className="text-4xl font-bold text-primary font-display">Banquet <GradientText>Photos</GradientText></h2>
          </motion.div>
          {photos.length > 0 ? (
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((src, i) => (
                <motion.div key={i} variants={fadeUp} className="overflow-hidden rounded-2xl group">
                  <img src={src} alt={`Banquet ${i + 1}`}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">📷</div>
              <p>Photos coming soon — upload from Admin Panel</p>
            </div>
          )}
        </div>
      </section>

      {/* Plan Your Event CTA */}
      <section className="py-20 bg-accent/5 border-t border-accent/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-primary font-display mb-4">
              Plan Your Special Event With Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-base">
              Our experienced event specialists will work closely with you to personalize every detail and bring your vision to life, creating a celebration that is truly unforgettable.
            </p>
            <p className="font-semibold text-primary mb-6">Get in Touch With Our Events Team</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${phone}`}
                className="bg-yellow-400 text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone}
              </a>
              <a href={`tel:${phone2}`}
                className="bg-red-500 text-white px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone2}
              </a>
              <a href={`https://wa.me/91${whatsapp.replace(/^0+/, '')}?text=Hi, I'd like to enquire about banquet hall booking.`}
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
