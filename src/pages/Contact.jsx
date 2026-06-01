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
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">Phone</p>
                    <a href={`tel:${phone}`} className="text-primary font-bold text-lg hover:text-accent transition">+91 {phone.replace(/^0/, '')}</a>
                  </div>
                </motion.div>

                {/* Phone Secondary */}
                <motion.div variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">Phone</p>
                    <a href={`tel:${phone2}`} className="text-primary font-bold text-lg hover:text-accent transition">+91 {phone2.replace(/^0/, '')}</a>
                  </div>
                </motion.div>

                {/* WhatsApp */}
                <motion.div variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">WhatsApp</p>
                    <a href={`https://wa.me/91${whatsapp.replace(/^0+/, '')}`} target="_blank" rel="noopener noreferrer"
                      className="text-primary font-semibold hover:text-accent transition">+91 {whatsapp.replace(/^0/, '')}</a>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">Email</p>
                    <a href={`mailto:${email}`} className="text-primary font-semibold hover:text-accent transition">{email}</a>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
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
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-0.5">Check-In / Check-Out</p>
                    <p className="text-primary font-semibold">{config.checkIn || SITE_DEFAULTS.checkIn} / {config.checkOut || SITE_DEFAULTS.checkOut}</p>
                  </div>
                </motion.div>

              </motion.div>

              {/* Social */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 flex gap-4 flex-wrap">
                {config.facebook && (
                  <a href={config.facebook} target="_blank" rel="noopener"
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                )}
                {config.instagram && (
                  <a href={config.instagram} target="_blank" rel="noopener"
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    Instagram
                  </a>
                )}
                {config.gmb && (
                  <a href={config.gmb} target="_blank" rel="noopener"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Google Maps
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
