import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../hooks/useSite'
import { useSEO } from '../hooks/useSEO'
import { fadeUp, staggerContainer } from '../animations'
import GradientText from '../components/ui/GradientText'

const Icon = {
  phone: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
  wa: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  mail: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  pin: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  clock: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
}

function Item({ tone, icon, label, children }) {
  return (
    <motion.div variants={fadeUp} className="flex gap-4 items-start">
      <div className={`w-12 h-12 ${tone} rounded-xl flex items-center justify-center shrink-0`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-sm text-gray-400 font-medium mb-0.5">{label}</p>
        {children}
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const { v, list, wa } = useSite()

  useSEO({
    title: v('seo_contact_title'),
    description: v('seo_contact_desc'),
    ogImage: v('contact_hero_img'),
  })

  const phone = v('phone')
  const phone2 = v('phone2')
  const email = v('email')
  const address = v('address')
  const whatsapp = v('whatsapp')
  const gmb = v('gmb')
  const facebook = v('facebook')
  const instagram = v('instagram')

  return (
    <main className="pt-24">
      {/* Banner */}
      <section className="relative h-64 bg-primary overflow-hidden">
        {v('contact_hero_img') && (
          <img src={v('contact_hero_img')} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        )}
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-3">
            <GradientText>{v('contact_hero_title')}</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </nav>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('contact_eyebrow')}</p>
                <h2 className="text-4xl font-bold text-primary font-display mb-8">
                  <GradientText>{v('contact_hero_title')}</GradientText>
                </h2>
              </motion.div>

              <motion.div variants={staggerContainer} className="space-y-5">
                <Item tone="bg-yellow-400/20 text-yellow-600" icon={Icon.phone} label="Phone">
                  <a href={`tel:${phone}`} className="text-primary font-bold text-lg hover:text-accent transition">+91 {phone.replace(/^0/, '')}</a>
                </Item>

                {phone2 && (
                  <Item tone="bg-red-500/10 text-red-500" icon={Icon.phone} label="Phone (Events)">
                    <a href={`tel:${phone2}`} className="text-primary font-bold text-lg hover:text-accent transition">+91 {phone2.replace(/^0/, '')}</a>
                  </Item>
                )}

                <Item tone="bg-green-500/10 text-green-600" icon={Icon.wa} label="WhatsApp">
                  <a href={wa()} target="_blank" rel="noopener noreferrer"
                    className="text-primary font-semibold hover:text-accent transition">+91 {whatsapp.replace(/^0/, '')}</a>
                </Item>

                {email && (
                  <Item tone="bg-accent/10 text-accent" icon={Icon.mail} label="Email">
                    <a href={`mailto:${email}`} className="text-primary font-semibold hover:text-accent transition break-all">{email}</a>
                  </Item>
                )}

                <Item tone="bg-accent/10 text-accent" icon={Icon.pin} label="Visit Us">
                  <p className="text-primary font-semibold leading-relaxed">{address}</p>
                  {gmb && (
                    <a href={gmb} target="_blank" rel="noopener noreferrer"
                      className="text-accent text-sm font-medium hover:underline mt-1 inline-block">
                      Get Directions →
                    </a>
                  )}
                </Item>

                <Item tone="bg-accent/10 text-accent" icon={Icon.clock} label="Check-In / Check-Out">
                  <p className="text-primary font-semibold">{v('checkIn')} / {v('checkOut')}</p>
                </Item>
              </motion.div>

              {/* Social */}
              <motion.div variants={fadeUp} className="mt-10 flex gap-4 flex-wrap">
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    Instagram
                  </a>
                )}
                {gmb && (
                  <a href={gmb} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition">
                    {Icon.pin}
                    Google Maps
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Map */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {v('mapEmbedUrl') && (
                <div className="rounded-2xl overflow-hidden shadow-lg h-96 bg-gray-100">
                  <iframe
                    title={`${v('businessName')} location`}
                    src={v('mapEmbedUrl')}
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
              {list('contact_reach').length > 0 && (
                <div className="mt-6 p-6 bg-gray-50 rounded-2xl">
                  <h3 className="font-bold text-primary mb-2">{v('contact_reach_title')}</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {list('contact_reach').map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
