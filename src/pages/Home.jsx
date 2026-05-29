import { useEffect } from 'react'
import { useAdmin } from '../contexts/AdminContext'
import { useSEO } from '../hooks/useSEO'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Rooms from '../components/Rooms'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import BlogPreview from '../components/blog/BlogPreview'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../animations'

export default function Home() {
  const { config } = useAdmin()
  useSEO({
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.metaKeywords,
    image: config.img_hero_bg,
  })

  // LocalBusiness JSON-LD schema for SEO
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: config.businessName,
      telephone: config.phone,
      email: config.email,
      url: 'https://maashardapalaceujjain.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.address,
        addressLocality: 'Ujjain',
        addressRegion: 'Madhya Pradesh',
        postalCode: '456006',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: '23.18', longitude: '75.79' },
      image: config.img_hero_bg,
      description: config.metaDescription,
      priceRange: '₹₹',
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Indoor Swimming Pool', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Banquet Hall', value: true },
      ],
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'local-business-schema'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => { const el = document.getElementById('local-business-schema'); if (el) el.remove() }
  }, [config.businessName, config.phone, config.email, config.address, config.metaDescription, config.img_hero_bg])

  return (
    <main>
      <Hero />
      <TrustBar />
      <Rooms />
      <AmenitiesStrip config={config} />
      <WhyChooseUs />
      <Testimonials />
      <FAQPreview config={config} />
      <BlogPreview />
      <CallToAction config={config} />
    </main>
  )
}

function AmenitiesStrip({ config }) {
  const amenities = [
    { icon: '🏊', label: 'Indoor Pool', link: '/amenities/pool' },
    { icon: '🎪', label: 'Banquet Halls', link: '/amenities/banquet' },
    { icon: '🎉', label: 'Party Hall', link: '/amenities/party-hall' },
    { icon: '🅿️', label: 'Free Parking', link: null },
    { icon: '📶', label: 'Free WiFi', link: null },
    { icon: '🛎️', label: '24/7 Room Service', link: null },
    { icon: '❄️', label: 'AC Rooms', link: null },
  ]
  return (
    <section className="py-12 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {amenities.map((a, i) => (
            <motion.div key={i} variants={fadeUp}>
              {a.link ? (
                <Link to={a.link} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition group text-center">
                  <span className="text-3xl">{a.icon}</span>
                  <span className="text-xs font-medium text-amber-200 group-hover:text-white transition">{a.label}</span>
                </Link>
              ) : (
                <div className="flex flex-col items-center gap-2 p-3 text-center">
                  <span className="text-3xl">{a.icon}</span>
                  <span className="text-xs font-medium text-white/70">{a.label}</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FAQPreview({ config }) {
  const items = (config.faq_items || []).slice(0, 4)
  if (!items.length) return null
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div {...fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-accent text-sm font-semibold uppercase tracking-widest text-center mb-2">FAQ</p>
          <h2 className="section-title mb-8">Frequently Asked Questions</h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          {items.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </motion.div>
        <div className="text-center mt-8">
          <Link to="/faq" className="text-primary font-semibold border-b-2 border-accent pb-0.5 hover:text-accent transition-colors text-sm">
            View All FAQs →
          </Link>
        </div>
      </div>
    </section>
  )
}

function FAQItem({ item }) {
  return (
    <motion.details variants={fadeUp} className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 cursor-pointer">
      <summary className="flex justify-between items-center p-5 font-semibold text-primary list-none select-none">
        <span>{item.q}</span>
        <span className="text-accent text-xl group-open:rotate-45 transition-transform duration-200">+</span>
      </summary>
      <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</div>
    </motion.details>
  )
}

function CallToAction({ config }) {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/hero_bg.jpg')] bg-cover bg-center opacity-10" />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-accent font-semibold uppercase tracking-widest text-sm mb-3">Book Your Stay</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Ready for an Unforgettable Stay?</h2>
          <p className="text-white/70 text-lg mb-8">Call us directly or send a WhatsApp message — we'll confirm your booking instantly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${config.phone}`}
              className="bg-accent text-primary px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 transition shadow-lg">
              📞 Call: {config.phone}
            </a>
            <a href={`https://wa.me/91${config.whatsapp.replace(/^0+/,'')}?text=Hi, I'd like to book a room at Hotel Maa Sharda Palace.`}
              target="_blank" rel="noopener"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition shadow-lg">
              💬 WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
