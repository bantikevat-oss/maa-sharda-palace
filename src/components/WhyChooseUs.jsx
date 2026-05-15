import { motion } from 'framer-motion'
import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import SpotlightCard from './ui/SpotlightCard'
import GradientText from './ui/GradientText'

export default function WhyChooseUs() {
  const { config } = useAdmin()
  const cards = config?.why_cards || SITE_DEFAULTS.why_cards
  const pool = config?.img_pool || SITE_DEFAULTS.img_pool

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <GradientText>The Maa Sharda Experience</GradientText>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured pool card */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-2xl min-h-[300px] group cursor-pointer">
            <img src={pool} alt="Indoor Swimming Pool" className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-4xl mb-2">🏊</div>
              <h3 className="text-2xl font-bold text-white mb-2">Indoor Swimming Pool</h3>
              <p className="text-white/80">Ujjain's finest indoor pool with living green wall — a true resort experience in the city.</p>
              <span className="inline-block mt-3 text-accent text-sm font-semibold">Exclusive for Guests →</span>
            </div>
          </motion.div>

          {/* Regular feature cards */}
          {cards.map((card, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}>
              <SpotlightCard className="border border-white/10 bg-white/5 p-6 h-full min-h-[140px]">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{card.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
