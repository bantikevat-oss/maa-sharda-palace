import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import GradientText from './ui/GradientText'
import ShimmerButton from './ui/ShimmerButton'
import { staggerContainer, fadeUp } from '../animations'

export default function Rooms() {
  const { config } = useAdmin()
  const bookingUrl = config?.bookingUrl || SITE_DEFAULTS.bookingUrl

  const rooms = [
    {
      id: 'deluxe',
      name: config?.room_deluxe_name || 'Deluxe Room',
      price: config?.room_deluxe_price || '₹3,000',
      image: config?.img_room_deluxe || SITE_DEFAULTS.img_room_deluxe,
      badge: 'Popular',
      features: ['King Bed', 'AC', 'Free WiFi', 'TV', 'Room Service'],
      desc: config?.room_deluxe_desc || 'Comfortable and well-appointed room with warm wooden interiors and modern amenities.',
    },
    {
      id: 'super-deluxe',
      name: config?.room_sdlx_name || 'Super Deluxe Room',
      price: config?.room_sdlx_price || '₹4,000',
      image: config?.img_room_super_deluxe || SITE_DEFAULTS.img_room_super_deluxe,
      badge: '',
      features: ['King Bed', 'Couch', 'AC', 'Free WiFi', 'Smart TV', 'Mini Fridge', 'Room Service'],
      desc: config?.room_sdlx_desc || 'Upgraded comfort with premium furnishings and extra space for a relaxed stay.',
    },
    {
      id: 'executive',
      name: config?.room_exec_name || 'Executive Room',
      price: config?.room_exec_price || '₹5,000',
      image: config?.img_room_executive || SITE_DEFAULTS.img_room_executive,
      badge: 'Best Value',
      features: ['King Bed + Twin Bed', 'AC', 'Free WiFi', 'Smart TV', 'Work Desk', 'Premium Bath'],
      desc: config?.room_exec_desc || 'Spacious suite-style room with dual beds, perfect for families or extended stays.',
    },
    {
      id: 'super-executive',
      name: config?.room_sexec_name || 'Super Executive',
      price: config?.room_sexec_price || '₹6,000',
      image: config?.img_room_super_executive || SITE_DEFAULTS.img_room_super_executive,
      badge: 'Premium',
      features: ['King Bed + King Bed', 'LED Cove Ceiling', 'AC', 'Smart TV', 'Kettle', 'Premium Bath', 'Full Mirror'],
      desc: config?.room_sexec_desc || 'Our finest room — coffered LED ceiling, lounge sofa, and 5-star finishes throughout.',
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-10">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Accommodations</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our <GradientText>Luxury Rooms</GradientText>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-gray-500 max-w-xl mx-auto">Request Standard Quote According to Stay</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room, i) => (
            <motion.div key={room.id} variants={fadeUp}
              whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-72">
                {/* Main image — fills card edge to edge */}
                <img src={room.image} alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy" />
                {room.badge && (
                  <span className="absolute top-4 left-4 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                    {room.badge}
                  </span>
                )}
                {/* Black transparent name strip with white text */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-3 px-4 z-10">
                  <h3 className="text-white text-lg md:text-xl font-bold text-center font-display tracking-wide">
                    {room.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{room.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {room.features.map(f => (
                    <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">✓ {f}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Link to={`/rooms/${room.id}`}
                    className="flex-1 text-center border-2 border-primary text-primary py-2.5 rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all">
                    View Room Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">Need help choosing? Call us directly.</p>
          <ShimmerButton href={`tel:${config?.phone || SITE_DEFAULTS.phone}`} className="mx-auto">
            📞 Call for Best Rates
          </ShimmerButton>
        </motion.div>
      </div>
    </section>
  )
}
