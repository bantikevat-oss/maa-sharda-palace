import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import { useSEO } from '../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../animations'
import { Link } from 'react-router-dom'
import GradientText from '../components/ui/GradientText'

const MENU_HIGHLIGHTS = [
  { icon: '🍛', title: 'North Indian Cuisine', desc: 'Rich curries, dal makhani, butter naan and authentic Mughal delicacies.' },
  { icon: '🥗', title: 'Continental Dishes', desc: 'Fresh salads, grilled specialties and international flavors.' },
  { icon: '🍜', title: 'South Indian', desc: 'Crispy dosas, idli sambhar and traditional South Indian breakfast.' },
  { icon: '🍰', title: 'Desserts & Sweets', desc: 'Gulab jamun, kheer, and a variety of Indian and continental desserts.' },
  { icon: '☕', title: 'Beverages', desc: 'Fresh juices, masala chai, cold drinks and welcome beverages.' },
  { icon: '🎂', title: 'Special Occasions', desc: 'Custom cakes and special menus for birthdays, anniversaries and events.' },
]

export default function Dining() {
  const { config } = useAdmin()
  const phone = config?.phone || SITE_DEFAULTS.phone
  const phone2 = config?.phone2 || SITE_DEFAULTS.phone2

  useSEO({
    title: 'Dining | Hotel Maa Sharda Palace Ujjain',
    description: 'Experience an elevated dining experience at Hotel Maa Sharda Palace, Ujjain. Multi-cuisine restaurant coming soon.',
  })

  return (
    <main className="pt-24">
      {/* Hero Banner */}
      <section className="relative h-72 bg-primary overflow-hidden">
        <img src="/images/banquet_hall_2.jpg" alt="Dining at Hotel Maa Sharda Palace"
          className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Restaurant</p>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">
              <GradientText>Dining</GradientText> Experience
            </h1>
            <nav className="text-sm text-white/60 mt-4">
              <Link to="/" className="hover:text-accent">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Dining</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Main */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-5 py-2 rounded-full text-sm font-semibold mb-8">
              🍽️ Opening Soon
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-display mb-6">
              An Elevated Dining Experience —<br />
              <GradientText>Arriving Soon</GradientText>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4 max-w-2xl mx-auto">
              Discover a refined culinary journey inspired by flavor, elegance, and exceptional hospitality.
              Our restaurant is set to redefine dining with exquisite cuisine, sophisticated interiors,
              and unforgettable experiences.
            </p>
            <p className="text-gray-500 text-base mb-4">
              Stay tuned for our grand opening.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Restaurant Photo Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Preview Glimpse</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">A Look Into Our <GradientText>Upcoming Restaurant</GradientText></h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
              Reference visuals of the refined dining experience we are bringing to {SITE_DEFAULTS.businessName}.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { src: '/images/banquet_hall_2.jpg', alt: 'Banquet Hall — dining space view 1' },
              { src: '/images/banquet_hall_2_2.jpg', alt: 'Banquet Hall — dining space view 2' },
              { src: '/images/banquet_hall_2_3.jpg', alt: 'Banquet Hall — dining space view 3' },
            ].map((img, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative overflow-hidden rounded-2xl shadow-md group h-64">
                <img src={img.src} alt={img.alt} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                <span className="absolute top-3 left-3 bg-accent text-primary text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                  Coming Soon
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Preview</p>
            <h2 className="text-4xl font-bold text-primary font-display">What to <GradientText>Expect</GradientText></h2>
            <p className="text-gray-500 mt-3 text-sm">A glimpse of the culinary journey we are preparing for you</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {MENU_HIGHLIGHTS.map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-accent/30 transition-all text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-14 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🌿', label: 'Fresh Ingredients' },
              { icon: '👨‍🍳', label: 'Expert Chefs' },
              { icon: '🏮', label: 'Elegant Ambience' },
              { icon: '🛎️', label: 'Table Service' },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="text-4xl mb-2">{f.icon}</div>
                <p className="text-white/80 text-sm font-medium">{f.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Notify / Contact CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-primary font-display mb-4">Stay in Touch</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Want to know when our restaurant opens? Call us or enquire at the reception and we will keep you updated.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${phone}`}
                className="bg-yellow-400 text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone}
              </a>
              <a href={`tel:${phone2}`}
                className="bg-red-500 text-white px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone2}
              </a>
              <Link to="/contact"
                className="bg-primary text-white px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
