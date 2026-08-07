import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../hooks/useSite'
import { useSEO } from '../hooks/useSEO'
import { fadeUp, staggerContainer } from '../animations'
import GradientText from '../components/ui/GradientText'

export default function Rooms() {
  const { v, list, wa } = useSite()

  useSEO({
    title: v('seo_rooms_title'),
    description: v('seo_rooms_desc'),
    ogImage: v('rooms_hero_img'),
  })

  const rooms = list('rooms')
  const infoStrip = list('rooms_info_strip')
  const phone = v('phone')

  return (
    <main className="pt-24">
      {/* Banner */}
      <section className="relative h-64 bg-primary overflow-hidden">
        {v('rooms_hero_img') && (
          <img src={v('rooms_hero_img')} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            <GradientText>{v('rooms_hero_title')}</GradientText>
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
          <span>✅ Check-In: {v('checkIn')}</span>
          <span>✅ Check-Out: {v('checkOut')}</span>
          {infoStrip.map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      {/* Rooms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {!rooms.length ? (
            <p className="text-center text-gray-400 py-16">No rooms have been added yet.</p>
          ) : (
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-10">
              {rooms.map((room, i) => (
                <motion.div key={room.slug || i} variants={fadeUp}
                  className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">

                  <div className="relative overflow-hidden h-72 group bg-gray-100">
                    {room.img && (
                      <img src={room.img} alt={room.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    )}
                    {room.badge && (
                      <span className="absolute top-4 left-4 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                        {room.badge}
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-3 px-4 z-10">
                      <h3 className="text-white text-lg md:text-xl font-bold text-center font-display tracking-wide">
                        {room.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    {(room.size || room.guests || room.bed) && (
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 border-b border-gray-100 pb-4">
                        {room.size && <span className="flex items-center gap-1.5"><span className="text-accent">📐</span> {room.size}</span>}
                        {room.guests && <span className="flex items-center gap-1.5"><span className="text-accent">👤</span> {room.guests}</span>}
                        {room.bed && <span className="flex items-center gap-1.5"><span className="text-accent">🛏️</span> {room.bed}</span>}
                      </div>
                    )}

                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{room.desc}</p>

                    {Array.isArray(room.features) && room.features.length > 0 && (
                      <div className="grid grid-cols-2 gap-1.5 mb-6">
                        {room.features.slice(0, 10).map((f, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="text-accent font-bold">✓</span> {f}
                          </div>
                        ))}
                      </div>
                    )}

                    <Link to={`/rooms/${room.slug}`}
                      className="block border-2 border-primary text-primary text-center py-3 rounded-lg font-semibold text-sm hover:bg-primary hover:text-white transition">
                      View Room Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold font-display mb-2">{v('rooms_cta_title')}</h2>
          <p className="text-white/60 mb-6 text-sm">{v('rooms_cta_desc')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${phone}`}
              className="bg-yellow-400 text-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
              📞 {phone}
            </a>
            <a href={wa("Hi, I'd like to know about room availability.")}
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
