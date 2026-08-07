import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSite } from '../hooks/useSite'
import SpotlightCard from './ui/SpotlightCard'
import GradientText from './ui/GradientText'

export default function WhyChooseUs() {
  const { v, list, on } = useSite()
  if (!on('show_why')) return null

  const cards = list('why_cards')
  const featureImg = v('why_feature_img')
  const featureLink = v('why_feature_link')

  const featureBody = (
    <>
      <img src={featureImg} alt={v('why_feature_title')}
        className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <div className="text-4xl mb-2">{v('why_feature_icon')}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{v('why_feature_title')}</h3>
        <p className="text-white/80">{v('why_feature_desc')}</p>
        {v('why_feature_link_label') && (
          <span className="inline-block mt-3 text-accent text-sm font-semibold">{v('why_feature_link_label')}</span>
        )}
      </div>
    </>
  )

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{v('why_eyebrow')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <GradientText>{v('why_title')}</GradientText>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureImg && (
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-2xl min-h-[300px] group">
              {featureLink
                ? <Link to={featureLink} className="block absolute inset-0">{featureBody}</Link>
                : featureBody}
            </motion.div>
          )}

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
