import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import { useSEO } from '../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, slideLeft, slideRight } from '../animations'
import { Link } from 'react-router-dom'
import AnimatedNumber from '../components/ui/AnimatedNumber'
import GradientText from '../components/ui/GradientText'

const WHY_CHOOSE = [
  { icon: '📍', text: 'Prime location near major attractions' },
  { icon: '🛏️', text: 'Elegant and comfortable rooms' },
  { icon: '🤝', text: 'Exceptional customer service' },
  { icon: '👨‍👩‍👧', text: 'Safe and family-friendly environment' },
  { icon: '✨', text: 'Modern amenities with traditional hospitality' },
  { icon: '💎', text: 'Affordable luxury and personalized experiences' },
]

const FACILITIES = [
  { icon: '🏨', text: 'Luxury Rooms & Suites' },
  { icon: '📶', text: 'Free High-Speed Wi-Fi' },
  { icon: '🍽️', text: 'Multi-cuisine Restaurant (Coming Soon)' },
  { icon: '🏊', text: 'Swimming Pool' },
  { icon: '💪', text: 'Fitness Center (Coming Soon)' },
  { icon: '🎪', text: 'Conference & Banquet Halls' },
  { icon: '🛎️', text: '24/7 Room Service' },
  { icon: '🚗', text: 'Pickup & Drop Service' },
  { icon: '🅿️', text: 'Secure Parking' },
  { icon: '🚘', text: 'Valet Parking' },
]

export default function About() {
  const { config } = useAdmin()
  useSEO({
    title: config.seo_about?.title,
    description: config.seo_about?.description,
    image: config.img_lobby,
  })

  const businessName = config.businessName || SITE_DEFAULTS.businessName
  const phone = config.phone || SITE_DEFAULTS.phone

  return (
    <main className="pt-24">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 bg-primary overflow-hidden">
        <img src={config.img_lobby} alt="Hotel lobby" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            About <GradientText>Our Hotel</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">About</span>
          </nav>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Welcome</p>
              <h2 className="text-4xl font-bold text-primary font-display mb-6">
                About <span className="text-accent">{businessName}</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to <strong>{businessName}</strong>, where comfort, elegance, and warm hospitality come together to create unforgettable experiences. Located in the heart of <strong>Ujjain, Madhya Pradesh</strong>, our hotel offers the perfect blend of modern luxury and personalized service for business travelers, families, couples, and tourists.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Designed to provide a relaxing and memorable stay, our hotel features beautifully crafted rooms, premium amenities, exceptional dining experiences, and a peaceful atmosphere that makes every guest feel at home.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you are visiting for leisure, pilgrimage, business, or celebration, we are committed to delivering comfort, convenience, and hospitality at every step of your journey.
              </p>
            </motion.div>
            <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-4">
                <img src={config.img_hero_bg || config.img_lobby} alt="Hotel front" className="rounded-2xl h-48 w-full object-cover" />
                <img src={config.img_banquet_1} alt="Banquet hall" className="rounded-2xl h-48 w-full object-cover mt-8" />
                <img src={config.img_pool} alt="Swimming pool" className="rounded-2xl h-48 w-full object-cover -mt-4" />
                <img src={config.img_gym || config.img_pool_2 || config.img_pool} alt="Gym" className="rounded-2xl h-48 w-full object-cover mt-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: config.stat_rooms, suffix: '+', label: 'Rooms' },
              { value: config.stat_guests, suffix: '+', label: 'Happy Guests' },
              { value: config.stat_experience, suffix: '+', label: 'Years of Service' },
              { value: config.stat_banquets, suffix: '', label: 'Banquet Halls' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="text-4xl font-bold font-display text-accent">
                  <AnimatedNumber value={parseInt(s.value) || 0} />{s.suffix}
                </div>
                <div className="text-white/70 text-sm mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Our Story</p>
            <h2 className="text-4xl font-bold text-primary font-display">A Legacy of Warm Hospitality</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                title: 'Our Story',
                icon: '📖',
                text: `Founded with a passion for hospitality, ${businessName} was created to offer guests a unique experience that combines luxury, comfort, and local culture. Over the years, we have proudly welcomed travelers from around the world and built a reputation for exceptional service and unforgettable stays.`,
              },
              {
                title: 'Our Mission',
                icon: '🎯',
                text: 'Our mission is to provide outstanding hospitality through personalized service, comfortable accommodations, and memorable guest experiences. We strive to create a welcoming environment where every guest feels valued, relaxed, and cared for.',
              },
              {
                title: 'Our Vision',
                icon: '🌟',
                text: 'To become one of the most trusted and preferred hospitality destinations known for excellence, comfort, and world-class guest satisfaction.',
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-8 shadow-sm text-center flex flex-col">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary font-display mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Why Us</p>
            <h2 className="text-4xl font-bold text-primary font-display">Why Choose <GradientText>Us</GradientText></h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <p className="text-gray-700 font-medium text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Facilities */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Facilities</p>
            <h2 className="text-4xl font-bold font-display">Our <GradientText>Facilities</GradientText></h2>
            <p className="text-white/60 mt-3 text-sm max-w-xl mx-auto">
              At {businessName}, guests can enjoy a wide range of modern facilities designed for comfort and convenience.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {FACILITIES.map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white/10 rounded-xl p-5 text-center hover:bg-white/20 transition-colors">
                <div className="text-3xl mb-2">{f.icon}</div>
                <p className="text-white/90 text-xs font-medium leading-tight">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience True Hospitality */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <img src={config.img_lobby_2 || config.img_lobby} alt="Hospitality"
                className="rounded-3xl w-full h-80 object-cover shadow-xl" />
            </motion.div>
            <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Our Promise</p>
              <h2 className="text-4xl font-bold text-primary font-display mb-6">Experience True Hospitality</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our dedicated team is committed to making your stay comfortable, peaceful, and memorable. From the moment you arrive until your departure, we focus on delivering exceptional service with warmth and professionalism.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                At {businessName}, we believe that every guest deserves more than just a stay — they deserve an experience filled with comfort, care, and lasting memories.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are committed to responsible hospitality by adopting eco-friendly practices, sustainable operations, and community-focused initiatives to create a better future for our guests and environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guest Commitment */}
      <section className="py-16 bg-accent/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-5xl mb-4">🤝</div>
            <h2 className="text-3xl font-bold text-primary font-display mb-4">Our Guest Commitment</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Your comfort, safety, and satisfaction are our highest priorities. We continuously work to exceed expectations and create memorable experiences that make guests return again and again.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${phone}`}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone}
              </a>
              <Link to="/rooms"
                className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
                View Rooms
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
