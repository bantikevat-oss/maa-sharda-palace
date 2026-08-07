import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSite } from '../hooks/useSite'
import GradientText from './ui/GradientText'
import ShimmerButton from './ui/ShimmerButton'
import { staggerContainer, fadeUp } from '../animations'

export default function Rooms() {
  const { v, list, on } = useSite()
  if (!on('show_home_rooms')) return null

  const rooms = list('rooms')
  if (!rooms.length) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-10">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{v('home_rooms_eyebrow')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            <GradientText>{v('home_rooms_title')}</GradientText>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-gray-500 max-w-xl mx-auto">{v('home_rooms_desc')}</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room, i) => (
            <motion.div key={room.slug || i} variants={fadeUp}
              whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-72 bg-gray-100">
                {room.img && (
                  <img src={room.img} alt={room.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy" />
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
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{room.desc}</p>
                {Array.isArray(room.features) && room.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {room.features.slice(0, 7).map((f, j) => (
                      <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">✓ {f}</span>
                    ))}
                  </div>
                )}
                <Link to={`/rooms/${room.slug}`}
                  className="block text-center border-2 border-primary text-primary py-2.5 rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all">
                  View Room Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mt-12">
          <ShimmerButton href="/rooms" className="mx-auto">
            {v('home_rooms_cta')}
          </ShimmerButton>
        </motion.div>
      </div>
    </section>
  )
}
