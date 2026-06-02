import { useParams, Link, Navigate } from 'react-router-dom'
import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import { useSEO } from '../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../animations'
import ShimmerButton from '../components/ui/ShimmerButton'

const ROOMS_DATA = {
  deluxe: {
    name: 'Deluxe Room',
    price: '₹3,000',
    tagline: 'Comfortable Stay, Excellent Value',
    size: '140 sq ft',
    desc: 'Our Deluxe Rooms are designed for travellers who value comfort without compromise. Featuring a plush king-size bed, modern amenities, and a clean, well-appointed bathroom, these rooms are perfect for solo travellers and couples visiting Ujjain.',
    features: ['King Size Bed', 'Couch', 'Air Conditioning', 'Free WiFi', 'Hot Water', 'LCD TV', 'Room Service', 'Free Parking', 'Daily Housekeeping', 'Intercom', 'Smoke-Free Room'],
    imgKey: 'img_room_deluxe',
    badge: 'Best Value',
    mealKey: 'room_deluxe_meal',
  },
  'super-deluxe': {
    name: 'Super Deluxe Room',
    price: '₹4,000',
    tagline: 'More Space, More Comfort',
    size: '154 sq ft',
    desc: 'Step up your stay with our Super Deluxe Rooms — offering additional space, a mini fridge, dedicated work desk, and upgraded furnishings. Ideal for business travellers and families who need more room to breathe.',
    features: ['King Size Bed', 'Air Conditioning', 'Free WiFi', 'Hot Water', 'LCD TV', 'Room Service', 'Free Parking', 'Mini Fridge', 'Work Desk', 'Daily Housekeeping', 'Intercom', 'Tea/Coffee Maker'],
    imgKey: 'img_room_super_deluxe',
    badge: 'Most Popular',
    mealKey: 'room_sdlx_meal',
  },
  executive: {
    name: 'Executive Room',
    price: '₹5,000',
    tagline: 'Premium Comfort, Thoughtful Touches',
    size: '168 sq ft',
    desc: 'Our Executive Rooms elevate your stay with a luxurious bathtub, 42" Smart TV, premium toiletries, and carefully curated decor. The perfect choice for guests who want a premium experience at a sensible price.',
    features: ['King Size Bed + Twin Bed', 'Air Conditioning', 'Free WiFi', 'Hot Water', '42" Smart TV', 'Room Service', 'Free Parking', 'Mini Fridge', 'Work Desk', 'Bathtub', 'Premium Toiletries', 'Daily Housekeeping', 'Bathrobe & Slippers'],
    imgKey: 'img_room_executive',
    badge: 'Premium',
    mealKey: 'room_exec_meal',
  },
  'super-executive': {
    name: 'Super Executive Room',
    price: '₹6,000',
    tagline: 'The Ultimate Luxury Experience',
    size: '192 sq ft',
    desc: 'Experience true luxury in our Super Executive Rooms — the finest accommodation we offer. With a Jacuzzi, 55" Smart TV, private mini bar, and a separate living lounge area, this room redefines comfort in Ujjain. Perfect for honeymoons and special occasions.',
    features: ['King Bed + King Bed', 'Air Conditioning', 'Free WiFi', 'Hot Water', '55" Smart TV', 'Room Service', 'Free Parking', 'Mini Bar', 'Work Desk', 'Jacuzzi', 'Premium Toiletries', 'Living Lounge Area', 'Welcome Fruit Basket', 'Bathrobe & Slippers', 'Daily Housekeeping', 'Concierge Service'],
    imgKey: 'img_room_super_executive',
    badge: 'Luxury',
    mealKey: 'room_sexec_meal',
  },
}

const CONFIG_KEYS = {
  deluxe:           { nameKey: 'room_deluxe_name', priceKey: 'room_deluxe_price', descKey: 'room_deluxe_desc' },
  'super-deluxe':   { nameKey: 'room_sdlx_name',   priceKey: 'room_sdlx_price',   descKey: 'room_sdlx_desc'   },
  executive:        { nameKey: 'room_exec_name',    priceKey: 'room_exec_price',   descKey: 'room_exec_desc'   },
  'super-executive':{ nameKey: 'room_sexec_name',   priceKey: 'room_sexec_price',  descKey: 'room_sexec_desc'  },
}

const NEARBY = [
  { place: 'Navgrah Shani Mandir', dist: 'Steps away', icon: '🛕' },
  { place: 'Mahakaleshwar Temple', dist: '~3.5 km', icon: '🛕' },
  { place: 'Kal Bhairav Temple', dist: '~4 km', icon: '🛕' },
  { place: 'Ujjain Railway Station', dist: '~10 min drive', icon: '🚉' },
  { place: 'Ram Ghat', dist: '~5 km', icon: '🌊' },
  { place: 'Indore Airport', dist: '~60 min drive', icon: '✈️' },
]

const POLICIES = [
  { label: 'Check-In', icon: '🕐', valueKey: 'checkIn' },
  { label: 'Check-Out', icon: '🕑', valueKey: 'checkOut' },
]

export default function RoomPage() {
  const { slug } = useParams()
  const { config } = useAdmin()
  const base = ROOMS_DATA[slug]

  // Check extra_rooms for dynamic ones
  const extraRooms = config.extra_rooms || SITE_DEFAULTS.extra_rooms || []
  const extraRoom = !base ? extraRooms.find(r => r.slug === slug) : null

  if (!base && !extraRoom) return <Navigate to="/rooms" replace />

  let room, roomImg, mealPlan

  if (base) {
    const keys = CONFIG_KEYS[slug]
    room = {
      ...base,
      name:  config[keys.nameKey]  || base.name,
      price: config[keys.priceKey] || base.price,
      desc:  config[keys.descKey]  || base.desc,
    }
    roomImg = config[room.imgKey]
    mealPlan = config[base.mealKey] || SITE_DEFAULTS[base.mealKey] || 'Available on request'
  } else {
    room = {
      name: extraRoom.name,
      price: extraRoom.price,
      tagline: extraRoom.tagline || 'A Comfortable Stay',
      desc: extraRoom.desc || '',
      features: extraRoom.features || [],
      imgKey: extraRoom.imgKey || 'img_lobby',
      badge: extraRoom.badge || 'Available',
    }
    roomImg = config[room.imgKey] || SITE_DEFAULTS[room.imgKey] || SITE_DEFAULTS.img_lobby
    mealPlan = extraRoom.meal || 'Available on request'
  }

  useSEO({
    title: `${room.name} | Hotel Maa Sharda Palace Ujjain`,
    description: `Book our ${room.name} starting at ${room.price}/night. ${room.desc.slice(0, 120)}... Call ${config.phone || '08435965777'}.`,
    image: roomImg,
  })

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-96 bg-primary overflow-hidden">
        <img src={roomImg} alt={room.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <div className="relative h-full flex flex-col items-end justify-end pb-10 px-8 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-3 inline-block">{room.badge}</span>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-2">{room.name}</h1>
            <p className="text-white/70 text-lg">{room.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 border-b">
        <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/rooms" className="hover:text-accent">Rooms</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{room.name}</span>
        </div>
      </div>

      {/* Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-primary font-display">Room Overview</h2>
                  {room.size && (
                    <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full border border-accent/20">
                      📐 {room.size}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">{room.desc}</p>
                <h3 className="text-xl font-bold text-primary mb-4">Room Features & Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {room.features.map(f => (
                    <div key={f} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl text-sm text-gray-700">
                      <span className="text-accent font-bold flex-shrink-0">✓</span> {f}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Meal Plan */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-primary mb-3">🍽️ Meal Plan</h3>
                <p className="text-gray-700 font-medium">{mealPlan}</p>
                <p className="text-gray-500 text-sm mt-1">Contact us for customised meal arrangements.</p>
              </motion.div>

              {/* Hotel Policies */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mt-8 bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-primary mb-4">📋 Hotel Policies</h3>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-accent">🕐</span>
                    <span><span className="font-semibold">Check-In:</span> {config.checkIn || SITE_DEFAULTS.checkIn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-accent">🕑</span>
                    <span><span className="font-semibold">Check-Out:</span> {config.checkOut || SITE_DEFAULTS.checkOut}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-accent">🚭</span> <span>Non-smoking rooms available</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-accent">🅿️</span> <span>Complimentary parking</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-accent">🪪</span> <span>Valid ID required at check-in</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-accent">💳</span> <span>Cash & UPI accepted</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Early check-in and late check-out available on request, subject to availability.</p>
              </motion.div>

              {/* Nearby Attractions */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mt-8">
                <h3 className="text-lg font-bold text-primary mb-4">📍 Nearby Attractions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {NEARBY.map(n => (
                    <div key={n.place} className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                      <span className="text-xl">{n.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-primary">{n.place}</p>
                        <p className="text-xs text-gray-400">{n.dist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Booking Card */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-primary text-white rounded-3xl p-8 sticky top-24">
                <p className="text-accent font-bold text-lg mb-6">📞 Call for Best Rates</p>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Check-In</span>
                    <span className="font-medium">{config.checkIn || SITE_DEFAULTS.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Check-Out</span>
                    <span className="font-medium">{config.checkOut || SITE_DEFAULTS.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Meal Plan</span>
                    <span className="font-medium text-accent text-xs text-right max-w-[120px] leading-tight">{mealPlan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Parking</span>
                    <span className="font-medium text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">WiFi</span>
                    <span className="font-medium text-green-400">Free</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <a href={`tel:${config.phone || SITE_DEFAULTS.phone}`}
                    className="w-full bg-accent text-primary font-bold py-3 rounded-xl text-center block hover:brightness-110 transition">
                    📞 Call to Book
                  </a>
                  <a href={`https://wa.me/91${(config.whatsapp || SITE_DEFAULTS.whatsapp).replace(/^0+/,'')}?text=Hi, I'd like to book the ${room.name} at Hotel Maa Sharda Palace.`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white font-bold py-3 rounded-xl text-center block hover:bg-green-600 transition">
                    💬 WhatsApp
                  </a>
                  <a href={config.bookingUrl || SITE_DEFAULTS.bookingUrl} target="_blank" rel="noopener noreferrer"
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl text-center block transition">
                    Book Online
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Rooms */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-primary font-display mb-6">Explore Other Rooms</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(ROOMS_DATA).filter(([s]) => s !== slug).map(([s, r]) => (
              <Link key={s} to={`/rooms/${s}`}
                className="bg-white border border-gray-200 px-6 py-3 rounded-full text-sm font-medium text-primary hover:border-accent hover:text-accent transition">
                {r.name}
              </Link>
            ))}
            {extraRooms.filter(r => r.slug !== slug).map(r => (
              <Link key={r.slug} to={`/rooms/${r.slug}`}
                className="bg-white border border-gray-200 px-6 py-3 rounded-full text-sm font-medium text-primary hover:border-accent hover:text-accent transition">
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
