import { useAdmin, SITE_DEFAULTS } from '../../contexts/AdminContext'
import { useSEO } from '../../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations'
import { Link } from 'react-router-dom'
import GradientText from '../../components/ui/GradientText'

const AMENITIES = [
  {
    icon: '🏊',
    title: 'Indoor Swimming Pool',
    desc: 'Indoor temperature-controlled pool with a relaxing ambience. Perfect for guests of all ages. Morning & afternoon sessions available.',
    timings: 'Morning: 7–10 AM | Afternoon: 2–5 PM',
    badge: 'Available',
    badgeColor: 'bg-green-500',
    link: '/amenities/pool',
    main: '/images/pool_indoor.jpg',
    thumbs: ['/images/pool_2.jpg', '/images/pool_3.jpg'],
    highlights: ['💧 Temp Controlled', '👨‍👩‍👧 Family Friendly', '🛟 Lifeguard On Duty'],
  },
  {
    icon: '💪',
    title: 'Modern Gymnasium',
    desc: 'Fully equipped modern fitness centre with cardio and strength training equipment. Designed for guests who want to stay active during their stay.',
    timings: 'Morning: 6–10 AM | Evening: 4–8 PM',
    badge: 'Available',
    badgeColor: 'bg-green-500',
    link: '/amenities/gym',
    main: '/images/gym.jpg',
    thumbs: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80&auto=format&fit=crop',
    ],
    highlights: ['🏋️ Cardio + Strength', '❄️ Fully AC', '👨‍🏫 Trainer On Request'],
  },
]

export default function Amenities() {
  const { config } = useAdmin()

  useSEO({
    title: 'Amenities | Hotel Maa Sharda Palace Ujjain',
    description: 'Explore amenities at Hotel Maa Sharda Palace — Indoor Swimming Pool and fully equipped Gym for a comfortable stay in Ujjain.',
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
            className="space-y-16">
            {AMENITIES.map((a, i) => (
              <AmenityRow key={i} item={a} reverse={i % 2 === 1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nearby Temples / Mandir Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Spiritual Tourism</p>
            <h2 className="text-4xl font-bold text-primary font-display">
              Nearby <GradientText>Mandir & Temples</GradientText>
            </h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
              Ujjain — the spiritual capital of India. Explore sacred temples just a short drive from our hotel.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: '🛕', name: 'Navgrah Shani Mandir', dist: 'Steps Away', img: '/images/navgrah_shani.jpg' },
              { icon: '🕉️', name: 'Mahakaleshwar Temple', dist: '~8 km', img: '/images/mahakaleshwarr.jpg' },
              { icon: '🛕', name: 'Kal Bhairav Temple', dist: '~15 km', img: '/images/kal_bhairav.jpg' },
              { icon: '🌊', name: 'Ram Ghat (Shipra)', dist: '~8 km', img: '/images/mahakal_lok.jpg' },
              { icon: '🛕', name: 'Harsiddhi Mata Temple', dist: '~9 km', img: '/images/Harsiddhii.webp' },
              { icon: '🛕', name: 'Chintaman Ganesh', dist: '~10 km', img: '/images/chintaman_ganesh.webp' },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                <div className="relative h-44 overflow-hidden bg-gray-900">
                  <img src={t.img} alt={t.name} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-accent text-primary text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    {t.dist}
                  </div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <h3 className="font-bold text-primary text-sm font-display">{t.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Link to="/ujjain-darshan"
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors">
              Explore Ujjain Darshan
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              { icon: '🏊', label: 'Indoor Pool', sub: 'Temp Controlled' },
              { icon: '💪', label: 'Gym', sub: 'Fully Equipped' },
              { icon: '🎪', label: 'Banquet Halls', sub: '3 Grand Halls' },
              { icon: '🛎️', label: 'Room Service', sub: '24/7 Availability' },
              { icon: '🅿️', label: 'Free Parking', sub: 'Secure & Spacious' },
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

function AmenityRow({ item, reverse }) {
  return (
    <motion.div variants={fadeUp}
      className={`grid md:grid-cols-2 gap-10 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
      {/* Image collage — main + 2 thumbs */}
      <div className="grid grid-cols-2 gap-3">
        <img src={item.main} alt={item.title}
          className="col-span-2 rounded-2xl w-full h-64 object-cover shadow-lg" />
        {item.thumbs?.map((t, i) => (
          <img key={i} src={t} alt={`${item.title} view ${i + 2}`} loading="lazy"
            className="rounded-2xl w-full h-32 object-cover shadow-md" />
        ))}
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-4xl">{item.icon}</div>
          <span className={`${item.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
            {item.badge}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-primary font-display mb-3">{item.title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm mb-5">{item.desc}</p>

        {item.highlights && (
          <div className="flex flex-wrap gap-2 mb-5">
            {item.highlights.map((h, i) => (
              <span key={i} className="bg-accent/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-accent/20">
                {h}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-accent font-medium mb-5">🕐 {item.timings}</p>

        {item.link && (
          <Link to={item.link}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors">
            View Full Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        )}
      </div>
    </motion.div>
  )
}
