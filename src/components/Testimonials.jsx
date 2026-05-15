import { motion } from 'framer-motion'
import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import GradientText from './ui/GradientText'
import { staggerContainer, fadeUp } from '../animations'

export default function Testimonials() {
  const { config } = useAdmin()
  const testimonials = config?.testimonials || SITE_DEFAULTS.testimonials
  const heroBg2 = config?.img_hero_bg_2 || SITE_DEFAULTS.img_hero_bg_2

  return (
    <section className="py-16 relative overflow-hidden">
      <img src={heroBg2} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 brightness-110" loading="lazy" />
      <div className="absolute inset-0 bg-white/90" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Guest Reviews</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            What Our <GradientText>Guests Say</GradientText>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.id || i} variants={fadeUp}
              whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex text-accent text-lg mb-3">
                {'★'.repeat(t.rating)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="border-t pt-4">
                <div className="font-bold text-primary text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs">{t.location} · {t.date}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Google review CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mt-12">
          <a href={config?.gmb || SITE_DEFAULTS.gmb} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all">
            ⭐ View All Reviews on Google
          </a>
        </motion.div>
      </div>
    </section>
  )
}
