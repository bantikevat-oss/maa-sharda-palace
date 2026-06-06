import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import { useSEO } from '../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../animations'
import { Link } from 'react-router-dom'
import GradientText from '../components/ui/GradientText'

const ROOM_DATA = {
  dlx: {
    size: '28 m²',
    guests: '2 Adults',
    bed: 'King Bed',
    features: ['King Bed', 'Work Desk', 'Premium Toiletries', 'Free Wi-Fi', 'Air Conditioning', 'Room Service', 'LCD TV', 'Hot Water'],
    badge: 'Best Value',
  },
  sdlx: {
    size: '32 m²',
    guests: '2 Adults',
    bed: 'King Bed',
    features: ['King Bed', 'Work Desk', 'Premium Toiletries', 'Free Wi-Fi', 'Air Conditioning', 'Room Service', 'Smart TV', 'Mini Fridge'],
    badge: 'Popular',
  },
  exec: {
    size: '38 m²',
    guests: '2 Adults',
    bed: 'King Bed',
    features: ['King Bed', 'Work Desk', 'Premium Toiletries', 'Free Wi-Fi', 'Air Conditioning', 'Room Service', '42" Smart TV', 'Bathtub'],
    badge: 'Premium',
  },
  sexec: {
    size: '48 m²',
    guests: '2 Adults + 1 Child',
    bed: 'King Bed',
    features: ['King Bed', 'Work Desk', 'Premium Toiletries', 'Free Wi-Fi', 'Air Conditioning', 'Room Service', '55" Smart TV', 'Jacuzzi', 'Mini Bar', 'Living Lounge'],
    badge: 'Luxury',
  },
}

export default function Rooms() {
  const { config } = useAdmin()

  useSEO({
    title: config.seo_rooms?.title,
    description: config.seo_rooms?.description,
    image: config.img_room_executive,
  })

  const rooms = [
    {
      slug: 'deluxe',
      key: 'dlx',
      name: config.room_deluxe_name || SITE_DEFAULTS.room_deluxe_name,
      price: config.room_deluxe_price || SITE_DEFAULTS.room_deluxe_price,
      img: config.img_room_deluxe,
      desc: config.room_deluxe_desc || SITE_DEFAULTS.room_deluxe_desc,
      meal: config.room_deluxe_meal || SITE_DEFAULTS.room_deluxe_meal,
    },
    {
      slug: 'super-deluxe',
      key: 'sdlx',
      name: config.room_sdlx_name || SITE_DEFAULTS.room_sdlx_name,
      price: config.room_sdlx_price || SITE_DEFAULTS.room_sdlx_price,
      img: config.img_room_super_deluxe,
      desc: config.room_sdlx_desc || SITE_DEFAULTS.room_sdlx_desc,
      meal: config.room_sdlx_meal || SITE_DEFAULTS.room_sdlx_meal,
    },
    {
      slug: 'executive',
      key: 'exec',
      name: config.room_exec_name || SITE_DEFAULTS.room_exec_name,
      price: config.room_exec_price || SITE_DEFAULTS.room_exec_price,
      img: config.img_room_executive,
      desc: config.room_exec_desc || SITE_DEFAULTS.room_exec_desc,
      meal: config.room_exec_meal || SITE_DEFAULTS.room_exec_meal,
    },
    {
      slug: 'super-executive',
      key: 'sexec',
      name: config.room_sexec_name || SITE_DEFAULTS.room_sexec_name,
      price: config.room_sexec_price || SITE_DEFAULTS.room_sexec_price,
      img: config.img_room_super_executive,
      desc: config.room_sexec_desc || SITE_DEFAULTS.room_sexec_desc,
      meal: config.room_sexec_meal || SITE_DEFAULTS.room_sexec_meal,
    },
  ]

  return (
    <main className="pt-24">
      {/* Banner */}
      <section className="relative h-64 bg-primary overflow-hidden">
        <img src={config.img_room_executive} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            Our <GradientText>Rooms</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Rooms</span>
          </nav>
        </div>
      </section>

      {/* Info strip */}
      <div className="bg-accent/10 py-3 border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm text-primary font-medium">
          <span>✅ Check-In: {config.checkIn || SITE_DEFAULTS.checkIn}</span>
          <span>✅ Check-Out: {config.checkOut || SITE_DEFAULTS.checkOut}</span>
          <span>✅ Free Parking</span>
          <span>✅ Free WiFi</span>
          <span>✅ Pool Access</span>
        </div>
      </div>

      {/* Rooms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10">
            {rooms.map((room) => {
              const data = ROOM_DATA[room.key]
              return (
                <motion.div key={room.slug} variants={fadeUp}
                  className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">

                  {/* Image */}
                  <div className="relative overflow-hidden h-72 group">
                    <img src={room.img} alt={room.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                      {data.badge}
                    </span>
                    {/* Black transparent name strip with white text — matches home page */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-3 px-4 z-10">
                      <h3 className="text-white text-lg md:text-xl font-bold text-center font-display tracking-wide">
                        {room.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Quick Info */}
                    <div className="flex gap-4 mb-4 text-sm text-gray-600 border-b border-gray-100 pb-4">
                      <span className="flex items-center gap-1.5">
                        <span className="text-accent">📐</span> {data.size}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-accent">👤</span> {data.guests}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-accent">🛏️</span> {data.bed}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{room.desc}</p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-1.5 mb-6">
                      {data.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="text-accent font-bold">✓</span> {f}
                        </div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <Link to={`/rooms/${room.slug}`}
                        className="flex-1 border-2 border-primary text-primary text-center py-3 rounded-lg font-semibold text-sm hover:bg-primary hover:text-white transition">
                        View Room Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold font-display mb-2">Need Help Choosing the Right Room?</h2>
          <p className="text-white/60 mb-6 text-sm">Call us and our team will help you pick the best option for your budget and needs.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${config.phone || SITE_DEFAULTS.phone}`}
              className="bg-yellow-400 text-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
              📞 {config.phone || SITE_DEFAULTS.phone}
            </a>
            <a href={`https://wa.me/91${(config.whatsapp || SITE_DEFAULTS.whatsapp).replace(/\D/g,'').replace(/^91/,'')}?text=Hi, I'd like to know about room availability.`}
              target="_blank" rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
