import { useAdmin, SITE_DEFAULTS } from '../../contexts/AdminContext'
import { useSEO } from '../../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations'
import { Link } from 'react-router-dom'
import GradientText from '../../components/ui/GradientText'

const AMENITIES = [
  {
    icon: '🏊',
    title: 'Swimming Pool',
    desc: 'Indoor temperature-controlled pool. Morning & afternoon sessions. Closed Tuesday for maintenance.',
    timings: 'Morning: 7–10 AM | Afternoon: 2–5 PM',
    badge: 'Available',
    badgeColor: 'bg-green-500',
    link: '/amenities/pool',
  },
  {
    icon: '🎪',
    title: 'Banquet Hall',
    desc: 'Grand banquet hall for weddings, receptions and corporate events. Capacity 100–150 guests.',
    timings: 'Stylish Décor | Grand Stage | Premium Sound',
    badge: 'Available',
    badgeColor: 'bg-green-500',
    link: '/amenities/banquet',
  },
  {
    icon: '🎉',
    title: 'Party Hall',
    desc: 'Perfect venue for birthdays, kitty parties, small gatherings and private celebrations.',
    timings: 'Book in Advance',
    badge: 'Available',
    badgeColor: 'bg-green-500',
    link: '/amenities/party-hall',
  },
  {
    icon: '🚘',
    title: 'Valet Parking',
    desc: 'Hassle-free valet parking service for all guests. Safe and secure parking area.',
    timings: '24/7 Available',
    badge: 'Available',
    badgeColor: 'bg-green-500',
    link: null,
  },
  {
    icon: '📶',
    title: 'Free High-Speed Wi-Fi',
    desc: 'Complimentary high-speed Wi-Fi throughout the hotel — in rooms, lobby and common areas.',
    timings: '24/7 Available',
    badge: 'Available',
    badgeColor: 'bg-green-500',
    link: null,
  },
  {
    icon: '🛎️',
    title: '24/7 Room Service',
    desc: 'Round-the-clock room service for food, beverages and any assistance you need.',
    timings: 'Always Available',
    badge: 'Available',
    badgeColor: 'bg-green-500',
    link: null,
  },
  {
    icon: '🚗',
    title: 'Airport / Railway Transfer',
    desc: 'Convenient pickup and drop service from Ujjain Railway Station and nearby areas.',
    timings: 'Pre-booking Required',
    badge: 'Available',
    badgeColor: 'bg-green-500',
    link: null,
  },
]

export default function Amenities() {
  const { config } = useAdmin()

  useSEO({
    title: 'Amenities | Hotel Maa Sharda Palace Ujjain',
    description: 'Explore all amenities at Hotel Maa Sharda Palace — Swimming Pool, Banquet Hall, Party Hall, Valet Parking, Wi-Fi, Room Service and more.',
    image: config.img_pool,
  })

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-72 bg-primary overflow-hidden">
        <img src={config.img_pool} alt="Amenities"
          className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Facilities</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            Our <GradientText>Amenities</GradientText>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/70 text-sm">Everything you need for a comfortable stay</motion.p>
          <nav className="text-sm text-white/60 mt-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Amenities</span>
          </nav>
        </div>
      </section>

      {/* All Amenities Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="text-4xl font-bold text-primary font-display">
              World-Class <GradientText>Facilities</GradientText>
            </h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
              At Hotel Maa Sharda Palace, guests can enjoy a wide range of modern facilities designed for comfort and convenience.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AMENITIES.map((a, i) => (
              <motion.div key={i} variants={fadeUp}>
                {a.link ? (
                  <Link to={a.link} className="block h-full group">
                    <AmenityCard item={a} linked />
                  </Link>
                ) : (
                  <AmenityCard item={a} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wellness Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold font-display">Wellness at <GradientText>Maa Sharda Palace</GradientText></h2>
            <p className="text-white/60 mt-3 text-sm">Your comfort and well-being is our priority</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🏊', label: 'Indoor Pool', sub: 'Temp Controlled' },
              { icon: '🚘', label: 'Valet Parking', sub: '24/7 Service' },
              { icon: '🛎️', label: 'Room Service', sub: '24/7 Available' },
            ].map((w, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white/10 rounded-xl p-5 text-center hover:bg-white/20 transition-colors">
                <div className="text-3xl mb-2">{w.icon}</div>
                <p className="text-white font-semibold text-sm">{w.label}</p>
                <p className="text-white/60 text-xs mt-1">{w.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  )
}

function AmenityCard({ item, linked }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full transition-all ${linked ? 'group-hover:shadow-lg group-hover:border-accent/30' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{item.icon}</div>
        <span className={`${item.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
          {item.badge}
        </span>
      </div>
      <h3 className="font-bold text-primary mb-2 text-base">{item.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.desc}</p>
      <p className="text-xs text-accent font-medium">{item.timings}</p>
      {linked && (
        <p className="text-xs text-primary/50 mt-3 font-medium">Click to learn more →</p>
      )}
    </div>
  )
}
