import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import { useSEO } from '../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../animations'
import { Link } from 'react-router-dom'
import GradientText from '../components/ui/GradientText'

export default function Contact() {
  const { config } = useAdmin()
  useSEO({
    title: config.seo_contact?.title,
    description: config.seo_contact?.description,
    image: config.img_hero_bg,
  })

  const phone = config.phone || SITE_DEFAULTS.phone
  const phone2 = config.phone2 || SITE_DEFAULTS.phone2
  const email = config.email || SITE_DEFAULTS.email
  const address = config.address || SITE_DEFAULTS.address
  const whatsapp = config.whatsapp || SITE_DEFAULTS.whatsapp

  return (
    <main className="pt-24">
      {/* Banner */}
      <section className="relative h-64 bg-primary overflow-hidden">
        <img src={config.img_hero_bg} alt="Hotel" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-3">
            Contact <GradientText>Us</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </nav>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Get in Touch</p>
                <h2 className="text-4xl font-bold text-primary font-display mb-8">Contact <GradientText>Us</GradientText></h2>
              </motion.div>

              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="space-y-5">

                {/* Phone Primary */}
                <motion.div variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center text-2xl shrink-0">📞</div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">Phone</p>
                    <a href={`tel:${phone}`} className="text-primary font-bold text-lg hover:text-accent transition">+91 {phone.replace(/^0/, '')}</a>
                  </div>
                </motion.div>

                {/* Phone Secondary */}
                <motion.div variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-2xl shrink-0">📞</div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">Phone</p>
                    <a href={`tel:${phone2}`} className="text-primary font-bold text-lg hover:text-accent transition">+91 {phone2.replace(/^0/, '')}</a>
                  </div>
                </motion.div>

                {/* WhatsApp */}
                <motion.div variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-2xl shrink-0">💬</div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">WhatsApp</p>
                    <a href={`https://wa.me/91${whatsapp.replace(/^0+/, '')}`} target="_blank" rel="noopener noreferrer"
                      className="text-primary font-semibold hover:text-accent transition">+91 {whatsapp.replace(/^0/, '')}</a>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl shrink-0">✉️</div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">Email</p>
                    <a href={`mailto:${email}`} className="text-primary font-semibold hover:text-accent transition">{email}</a>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl shrink-0">📍</div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">Visit Us</p>
                    <p className="text-primary font-semibold leading-relaxed">{address}</p>
                    {config.gmb && (
                      <a href={config.gmb} target="_blank" rel="noopener noreferrer"
                        className="text-accent text-sm font-medium hover:underline mt-1 inline-block">
                        Get Directions →
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* Check-in/out */}
                <motion.div variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl shrink-0">🕐</div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">Check-In / Check-Out</p>
                    <p className="text-primary font-semibold">{config.checkIn || SITE_DEFAULTS.checkIn} / {config.checkOut || SITE_DEFAULTS.checkOut}</p>
                  </div>
                </motion.div>

              </motion.div>

              {/* Social */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 flex gap-4">
                {config.instagram && (
                  <a href={config.instagram} target="_blank" rel="noopener"
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition">
                    📸 Instagram
                  </a>
                )}
                {config.gmb && (
                  <a href={config.gmb} target="_blank" rel="noopener"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition">
                    📍 Google Maps
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Map Embed */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="rounded-2xl overflow-hidden shadow-lg h-96 bg-gray-100">
                <iframe
                  title="Hotel Maa Sharda Palace Location"
                  src={config.mapEmbedUrl || SITE_DEFAULTS.mapEmbedUrl}
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-6 p-6 bg-gray-50 rounded-2xl">
                <h3 className="font-bold text-primary mb-2">How to Reach Us</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>🚗 From Ujjain Railway Station: ~10 min drive</li>
                  <li>✈️ From Indore Airport: ~60 min drive</li>
                  <li>🛺 Auto-rickshaws readily available</li>
                  <li>📍 On Indore Road, near Navgrah Shani Mandir</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
