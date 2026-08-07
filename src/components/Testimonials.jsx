import { motion } from 'framer-motion'
import { useSite } from '../hooks/useSite'
import GradientText from './ui/GradientText'
import { staggerContainer, fadeUp } from '../animations'

export default function Testimonials() {
  const { v, list, on } = useSite()
  if (!on('show_testimonials')) return null

  const testimonials = list('testimonials')
  if (!testimonials.length) return null

  const bg = v('img_hero_bg_2')
  const gmb = v('gmb')

  return (
    <section className="py-16 relative overflow-hidden">
      {bg && <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 brightness-110" loading="lazy" />}
      <div className="absolute inset-0 bg-white/90" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{v('testimonials_eyebrow')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            <GradientText>{v('testimonials_title')}</GradientText>
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
                {'★'.repeat(Math.max(0, Math.min(5, parseInt(t.rating, 10) || 5)))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="border-t pt-4">
                <div className="font-bold text-primary text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs">{[t.location, t.date].filter(Boolean).join(' · ')}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {gmb && v('testimonials_cta') && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mt-12">
            <a href={gmb} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all">
              {v('testimonials_cta')}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
