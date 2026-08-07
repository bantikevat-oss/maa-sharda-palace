import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../hooks/useSite'
import { useSEO } from '../hooks/useSEO'
import { fadeUp, staggerContainer } from '../animations'

export default function RoomPage() {
  const { slug } = useParams()
  const { v, list, wa } = useSite()

  const rooms = list('rooms')
  const room = rooms.find(r => r.slug === slug)

  const gallery = room ? [room.img, room.img2, room.img3].filter(Boolean) : []
  const features = Array.isArray(room?.features) ? room.features : []
  const policies = list('room_policies')
  const nearby = list('room_nearby')

  useSEO({
    title: room ? `${room.name} | ${v('businessName')}` : '',
    description: room ? `${room.name} at ${v('businessName')}, Ujjain. ${String(room.longDesc || room.desc || '').slice(0, 130)}` : '',
    ogImage: room?.img,
  })

  if (!room) return <Navigate to="/rooms" replace />

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-96 bg-primary overflow-hidden">
        {room.img && <img src={room.img} alt={room.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <div className="relative h-full flex flex-col items-end justify-end pb-10 px-8 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {room.badge && <span className="bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-3 inline-block">{room.badge}</span>}
            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-2">{room.name}</h1>
            {room.tagline && <p className="text-white/70 text-lg">{room.tagline}</p>}
          </motion.div>
        </div>
      </section>

      {/* Photo gallery */}
      {gallery.length >= 2 && (
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-8">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">{v('room_gallery_title')}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary font-display">{room.name} — Inside View</h2>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`grid gap-4 ${gallery.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
              {gallery.map((src, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="relative overflow-hidden rounded-2xl shadow-md bg-gray-900 h-64">
                  <img src={src} alt="" aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60" />
                  <img src={src} alt={`${room.name} view ${i + 1}`} loading="lazy"
                    className="relative w-full h-full object-contain" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

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
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <h2 className="text-2xl font-bold text-primary font-display">Room Overview</h2>
                  {room.size && (
                    <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full border border-accent/20">
                      📐 {room.size}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">{room.longDesc || room.desc}</p>

                {features.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-primary mb-4">Room Features & Amenities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl text-sm text-gray-700">
                          <span className="text-accent font-bold flex-shrink-0">✓</span> {f}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>

              {/* Meal plan */}
              {room.meal && (
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-primary mb-3">🍽️ Meal Plan</h3>
                  <p className="text-gray-700 font-medium">{room.meal}</p>
                  <p className="text-gray-500 text-sm mt-1">{v('room_meal_note')}</p>
                </motion.div>
              )}

              {/* Policies */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mt-8 bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-primary mb-4">📋 Hotel Policies</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-accent">🕐</span>
                    <span><span className="font-semibold">Check-In:</span> {v('checkIn')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-accent">🕑</span>
                    <span><span className="font-semibold">Check-Out:</span> {v('checkOut')}</span>
                  </div>
                  {policies.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-700">
                      <span className="text-accent">{p.icon}</span> <span>{p.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400">{v('room_policy_note')}</p>
              </motion.div>

              {/* Nearby */}
              {nearby.length > 0 && (
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8">
                  <h3 className="text-lg font-bold text-primary mb-4">📍 Nearby Attractions</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {nearby.map((n, i) => (
                      <div key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                        <span className="text-xl">{n.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-primary">{n.place}</p>
                          <p className="text-xs text-gray-400">{n.dist}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Booking card */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-primary text-white rounded-3xl p-8 sticky top-24">
                <p className="text-accent font-bold text-lg mb-6">{v('room_booking_title')}</p>
                <div className="space-y-3 mb-6 text-sm">
                  <Row label="Check-In" value={v('checkIn')} />
                  <Row label="Check-Out" value={v('checkOut')} />
                  {room.meal && <Row label="Meal Plan" value={room.meal} accent />}
                  {room.guests && <Row label="Guests" value={room.guests} />}
                  {room.bed && <Row label="Bed" value={room.bed} />}
                </div>
                <div className="space-y-3">
                  <a href={`tel:${v('phone')}`}
                    className="w-full bg-accent text-primary font-bold py-3 rounded-xl text-center block hover:brightness-110 transition">
                    📞 Call to Book
                  </a>
                  <a href={wa(`Hi, I'd like to book the ${room.name} at ${v('businessName')}.`)}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white font-bold py-3 rounded-xl text-center block hover:bg-green-600 transition">
                    💬 WhatsApp
                  </a>
                  <a href={v('bookingUrl')} target="_blank" rel="noopener noreferrer"
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl text-center block transition">
                    Book Online
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Other rooms */}
      {rooms.length > 1 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-primary font-display mb-6">Explore Other Rooms</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {rooms.filter(r => r.slug !== slug).map((r, i) => (
                <Link key={r.slug || i} to={`/rooms/${r.slug}`}
                  className="bg-white border border-gray-200 px-6 py-3 rounded-full text-sm font-medium text-primary hover:border-accent hover:text-accent transition">
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-white/60 shrink-0">{label}</span>
      <span className={`font-medium text-right ${accent ? 'text-accent text-xs max-w-[140px] leading-tight' : ''}`}>{value}</span>
    </div>
  )
}
