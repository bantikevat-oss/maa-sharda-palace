import { useAdmin, SITE_DEFAULTS } from '../../contexts/AdminContext'
import { useSEO } from '../../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations'
import { Link } from 'react-router-dom'
import GradientText from '../../components/ui/GradientText'

export default function Pool() {
  const { config } = useAdmin()
  const phone = config?.phone || SITE_DEFAULTS.phone

  useSEO({
    title: config.seo_pool?.title || 'Swimming Pool | Hotel Maa Sharda Palace Ujjain',
    description: config.seo_pool?.description || 'Indoor temperature-controlled swimming pool at Hotel Maa Sharda Palace Ujjain.',
    image: config.img_pool,
  })

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-96 bg-primary overflow-hidden">
        <img src={config.img_pool} alt="Indoor Swimming Pool"
          className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Wellness</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            Indoor Swimming <GradientText>Pool</GradientText>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/70 text-sm">Relax · Rejuvenate · Recharge</motion.p>
          <nav className="text-sm text-white/60 mt-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/amenities" className="hover:text-accent">Amenities</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Swimming Pool</span>
          </nav>
        </div>
      </section>

      {/* Description + Timings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Exclusive for Guests</p>
              <h2 className="text-4xl font-bold text-primary font-display mb-6">
                Relax & Rejuvenate at Our <GradientText>Pool</GradientText>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Relax and rejuvenate at our tranquil swimming pool — an inviting space designed for leisure and comfort. Whether you prefer an energizing morning swim or a refreshing afternoon dip, our pool provides the perfect setting to unwind and recharge.
              </p>

              {/* Pool Timings */}
              <div className="bg-primary/5 rounded-2xl p-6 mb-6 border border-primary/10">
                <h3 className="font-bold text-primary mb-4 text-lg">🕐 Pool Timings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">☀️ Morning</span>
                    <span className="font-bold text-primary">07:00 AM – 10:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">🌤️ Afternoon</span>
                    <span className="font-bold text-primary">02:00 PM – 05:00 PM</span>
                  </div>
                  <div className="border-t border-primary/10 pt-3 flex items-center justify-between">
                    <span className="text-red-500 font-medium">🔴 Tuesday</span>
                    <span className="text-red-500 font-semibold">Closed for Maintenance</span>
                  </div>
                </div>
              </div>

              <a href={`tel:${phone}`}
                className="inline-block bg-accent text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                Book a Room to Access Pool →
              </a>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {[config.img_pool, config.img_pool_2, config.img_pool_3 || config.img_pool, config.img_pool_4 || config.img_pool_2].filter(Boolean).map((src, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <img src={src} alt={`Pool view ${i + 1}`} className="rounded-2xl w-full h-44 object-cover" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary font-display">Pool <GradientText>Features</GradientText></h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌡️', title: 'Indoor Temperature-Controlled Pool', desc: 'Enjoy comfortable swimming in any season with our climate-controlled water temperature.' },
              { icon: '🛋️', title: 'Comfortable Lounge Area', desc: 'Relax and unwind at our poolside lounge with comfortable seating arrangements.' },
              { icon: '🌿', title: 'Peaceful & Relaxing Ambience', desc: 'A tranquil environment designed to help you disconnect and recharge completely.' },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100 hover:border-accent/30 transition-all">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold font-display mb-2">Ready to Take a Dip?</h2>
          <p className="text-white/60 mb-6 text-sm">Book any room and get complimentary pool access during your stay.</p>
          <a href={`tel:${phone}`}
            className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
            📞 {phone}
          </a>
        </div>
      </section>
    </main>
  )
}
