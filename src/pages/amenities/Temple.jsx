import { useAdmin, SITE_DEFAULTS } from '../../contexts/AdminContext'
import { useSEO } from '../../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations'
import { Link } from 'react-router-dom'
import GradientText from '../../components/ui/GradientText'

export default function Temple() {
  const { config } = useAdmin()
  const phone = config?.phone || SITE_DEFAULTS.phone
  const mainImg = config.img_mandir || '/images/mandir_main.jpg'

  useSEO({
    title: config.seo_mandir?.title || 'In-House Temple (Mandir) | Hotel Maa Sharda Palace Ujjain',
    description: config.seo_mandir?.description || 'Begin your day with darshan at our serene in-house Shiv-Parvati temple. Daily aarti for guests at Hotel Maa Sharda Palace, Ujjain.',
    image: mainImg,
  })

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-96 bg-primary overflow-hidden">
        <img src={mainImg} alt="In-House Temple at Hotel Maa Sharda Palace"
          className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Spiritual Space</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            In-House <GradientText>Temple</GradientText>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/70 text-sm">Darshan · Shanti · Blessings</motion.p>
          <nav className="text-sm text-white/60 mt-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/amenities" className="hover:text-accent">Amenities</Link>
            <span className="mx-2">/</span>
            <span className="text-white">In-House Temple</span>
          </nav>
        </div>
      </section>

      {/* Description + Aarti Timings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Within Our Premises</p>
              <h2 className="text-4xl font-bold text-primary font-display mb-6">
                Darshan at Our <GradientText>Sacred Mandir</GradientText>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Set within the hotel premises, our serene Shiv-Parvati temple offers guests a peaceful space for prayer and reflection. With a beautiful Kailash backdrop and marble shrine, it is the perfect place to seek blessings before beginning your Ujjain temple tours — especially fitting for pilgrims visiting the nearby Navgrah Shani Mandir and Mahakaleshwar.
              </p>

              <a href={`tel:${phone}`}
                className="inline-block bg-accent text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 Plan Your Spiritual Stay →
              </a>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {[config.img_mandir, config.img_mandir_2, config.img_mandir_3, config.img_mandir]
                .filter(Boolean).map((src, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <img src={src} alt={`In-House Temple view ${i + 1}`} loading="lazy"
                    className="rounded-2xl w-full h-44 object-cover shadow-md" />
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
            <h2 className="text-3xl font-bold text-primary font-display">Temple <GradientText>Highlights</GradientText></h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🕉️', title: 'Shiv-Parvati Shrine', desc: 'A beautifully adorned Shiv-Parvati murti set against a serene Kailash backdrop for daily darshan.' },
              { icon: '🙏', title: 'Daily Morning & Evening Aarti', desc: 'Start and end your day with peaceful aarti — open to all our guests during their stay.' },
              { icon: '🧘', title: 'Quiet & Peaceful Ambience', desc: 'A calm, sacred corner within the hotel where you can pause, pray, and find your centre.' },
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
          <h2 className="text-2xl font-bold font-display mb-2">A Blessed Start to Your Ujjain Yatra</h2>
          <p className="text-white/60 mb-6 text-sm">Stay with us and enjoy darshan at our in-house temple, steps from Navgrah Shani Mandir.</p>
          <a href={`tel:${phone}`}
            className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
            📞 {phone}
          </a>
        </div>
      </section>
    </main>
  )
}
