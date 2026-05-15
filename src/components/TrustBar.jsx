import { motion } from 'framer-motion'
import AnimatedNumber from './ui/AnimatedNumber'
import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import { staggerContainer, scaleUp } from '../animations'

export default function TrustBar() {
  const { config } = useAdmin()
  const rooms = parseInt(config?.stat_rooms || SITE_DEFAULTS.stat_rooms)
  const guests = parseInt(config?.stat_guests || SITE_DEFAULTS.stat_guests)
  const experience = parseInt(config?.stat_experience || SITE_DEFAULTS.stat_experience)
  const banquets = parseInt(config?.stat_banquets || SITE_DEFAULTS.stat_banquets)

  const stats = [
    { value: rooms, suffix: '+', label: 'Luxury Rooms', icon: '🛏️' },
    { value: guests, suffix: '+', label: 'Happy Guests', icon: '😊' },
    { value: experience, suffix: ' Yrs', label: 'Of Excellence', icon: '🏆' },
    { value: banquets, suffix: '', label: 'Banquet Halls', icon: '🎪' },
  ]

  return (
    <section className="bg-primary py-12 relative overflow-hidden">
      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={scaleUp} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/70 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
