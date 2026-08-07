import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../hooks/useSite'
import { useSEO } from '../hooks/useSEO'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Rooms from '../components/Rooms'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import BlogPreview from '../components/blog/BlogPreview'
import { fadeUp, staggerContainer } from '../animations'

export default function Home() {
  const site = useSite()
  const { v, list, on } = site

  useSEO({
    title: v('metaTitle'),
    description: v('metaDescription'),
    keywords: v('metaKeywords'),
    ogImage: v('img_hero_bg'),
  })

  const businessName = v('businessName')
  const phone = v('phone')
  const email = v('email')
  const address = v('address')
  const metaDescription = v('metaDescription')
  const heroImg = v('img_hero_bg')
  const amenityNames = list('home_amenities').map(a => a.label).join('|')

  // LocalBusiness JSON-LD — amenities come straight from the admin list
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: businessName,
      telephone: phone,
      email,
      url: 'https://maashardapalaceujjain.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: address,
        addressLocality: 'Ujjain',
        addressRegion: 'Madhya Pradesh',
        postalCode: '456006',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: '23.18', longitude: '75.79' },
      image: heroImg,
      description: metaDescription,
      priceRange: '₹₹',
      amenityFeature: amenityNames.split('|').filter(Boolean).map(name => ({
        '@type': 'LocationFeatureSpecification', name, value: true,
      })),
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'local-business-schema'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => { const el = document.getElementById('local-business-schema'); if (el) el.remove() }
  }, [businessName, phone, email, address, metaDescription, heroImg, amenityNames])

  return (
    <main>
      <Hero />
      <TrustBar />
      <Rooms />
      <AmenitiesStrip site={site} />
      <WhyChooseUs />
      <Testimonials />
      <FAQPreview site={site} />
      {on('show_home_blog') && <BlogPreview />}
    </main>
  )
}

function AmenitiesStrip({ site }) {
  const { list, on } = site
  if (!on('show_home_amenities')) return null

  const amenities = list('home_amenities')
  if (!amenities.length) return null

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

function FAQPreview({ site }) {
  const { v, list, on } = site
  if (!on('show_home_faq')) return null

  const items = list('faq_items').slice(0, 4)
  if (!items.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-accent text-sm font-semibold uppercase tracking-widest text-center mb-2">{v('home_faq_eyebrow')}</p>
          <h2 className="section-title mb-8">{v('home_faq_title')}</h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          {items.map((item, i) => (
            <motion.details key={i} variants={fadeUp} className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 cursor-pointer">
              <summary className="flex justify-between items-center p-5 font-semibold text-primary list-none select-none">
                <span>{item.q}</span>
                <span className="text-accent text-xl group-open:rotate-45 transition-transform duration-200">+</span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</div>
            </motion.details>
          ))}
        </motion.div>
        <div className="text-center mt-8">
          <Link to="/faq" className="text-primary font-semibold border-b-2 border-accent pb-0.5 hover:text-accent transition-colors text-sm">
            {v('home_faq_cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
