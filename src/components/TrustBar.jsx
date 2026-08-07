import { motion } from 'framer-motion'
import AnimatedNumber from './ui/AnimatedNumber'
import { useSite } from '../hooks/useSite'
import { staggerContainer, scaleUp } from '../animations'

export default function TrustBar() {
  const { list, on } = useSite()
  if (!on('show_trustbar')) return null

  const stats = list('hotel_stats')
  if (!stats.length) return null

  return (
    <section className="bg-primary py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className={`grid grid-cols-2 gap-8 ${stats.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {stats.map((stat, i) => (
            <motion.div key={i} variants={scaleUp} className="text-center">
              {stat.icon && <div className="text-3xl mb-2">{stat.icon}</div>}
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                <AnimatedNumber value={parseInt(stat.value, 10) || 0} suffix={stat.suffix || ''} />
              </div>
              <div className="text-white/70 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
