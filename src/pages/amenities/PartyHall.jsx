import { useAdmin } from '../../contexts/AdminContext'
import { useSEO } from '../../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations'
import { Link } from 'react-router-dom'
import GradientText from '../../components/ui/GradientText'

export default function PartyHall() {
  const { config } = useAdmin()
  useSEO({
    title: `Party Hall in Ujjain | Hotel Maa Sharda Palace`,
    description: `Book our exclusive Party Hall for birthdays, kitty parties, bachelor parties & celebrations in Ujjain. Call ${config.phone}.`,
    image: config.img_banquet_2,
  })

  return (
    <main className="pt-20">
      <section className="relative h-80 bg-primary overflow-hidden">
        <img src={config.img_banquet_4 || config.img_banquet_2} alt="Party Hall" className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Celebrations</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-3">
            Party Hall in <GradientText>Ujjain</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60 mt-2">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Party Hall</span>
          </nav>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Make it Special</p>
              <h2 className="text-4xl font-bold text-primary font-display mb-6">Your Party, Our Perfect Venue</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Celebrate life's best moments at our dedicated Party Hall. Whether it's a birthday bash, anniversary celebration, kitty party, or bachelor/bachelorette party — our venue sets the perfect stage.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With state-of-the-art sound systems, customizable lighting, in-house catering, and a dedicated event team, we handle every detail so you can focus on celebrating.
              </p>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="grid grid-cols-2 gap-3 mb-8">
                {[
                  '🎂 Birthday Parties',
                  '💍 Anniversaries',
                  '👗 Kitty Parties',
                  '🥂 Bachelor Parties',
                  '🎓 Graduation Parties',
                  '🏢 Office Parties',
                  '👶 Baby Showers',
                  '🎉 Get-togethers',
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700">{item}</motion.div>
                ))}
              </motion.div>
              <div className="flex gap-3">
                <a href={`tel:${config.phone}`} className="btn-primary">📞 Call Us</a>
                <a href={`https://wa.me/91${config.whatsapp.replace(/^0+/,'')}?text=Hi, I'd like to book the party hall.`} target="_blank" rel="noopener"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
                  💬 WhatsApp
                </a>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <img src={config.img_banquet_5 || config.img_banquet_1} alt="Party Hall Setup" className="rounded-3xl w-full h-96 object-cover shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary font-display mb-8">What's Included</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔊', label: 'DJ Sound System' },
              { icon: '💡', label: 'Ambient Lighting' },
              { icon: '🍽️', label: 'Catering Service' },
              { icon: '🅿️', label: 'Free Parking' },
              { icon: '❄️', label: 'Air Conditioning' },
              { icon: '📸', label: 'Photo Area' },
              { icon: '🎤', label: 'Microphone' },
              { icon: '👨‍💼', label: 'Event Staff' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-medium text-primary">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
