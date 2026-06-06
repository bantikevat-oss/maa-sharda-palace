import { useAdmin, SITE_DEFAULTS } from '../../contexts/AdminContext'
import { useSEO } from '../../hooks/useSEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations'
import { Link } from 'react-router-dom'
import GradientText from '../../components/ui/GradientText'

export default function Gym() {
  const { config } = useAdmin()
  const phone = config?.phone || SITE_DEFAULTS.phone

  useSEO({
    title: 'Gymnasium | Hotel Maa Sharda Palace Ujjain',
    description: 'Modern fitness center coming soon at Hotel Maa Sharda Palace Ujjain.',
    image: config.img_lobby,
  })

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-80 bg-primary overflow-hidden">
        <img src="/images/gym.jpg" alt="Gymnasium at Hotel Maa Sharda Palace"
          className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Fitness</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            Gymnasium — <GradientText>Coming Soon</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60 mt-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/amenities" className="hover:text-accent">Amenities</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Gymnasium</span>
          </nav>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-5 py-2 rounded-full text-sm font-semibold mb-8">
              💪 Opening Soon
            </div>
            <h2 className="text-4xl font-bold text-primary font-display mb-6">
              A Modern Fitness Experience <GradientText>Arriving Soon</GradientText>
            </h2>
            <p className="text-gray-600 leading-relaxed text-base mb-4">
              A modern fitness experience is arriving soon at our property. Designed for both relaxation and performance, our upcoming gymnasium will feature advanced equipment and dedicated workout spaces to help you stay active and refreshed throughout your stay.
            </p>
            <p className="text-gray-500 text-sm mb-10">
              Stay tuned as we prepare to launch a complete wellness and fitness experience.
            </p>
            <div className="inline-block bg-primary text-white px-8 py-4 rounded-2xl mb-4">
              <p className="text-accent font-bold text-lg">🚀 Coming Soon</p>
              <p className="text-white/70 text-sm mt-1">We are working hard to bring you the best fitness experience</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Preview Glimpse</p>
            <h2 className="text-3xl font-bold text-primary font-display">A Look Into Our <GradientText>Upcoming Gym</GradientText></h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
              Reference visuals of the modern fitness setup we are bringing to {SITE_DEFAULTS.businessName}.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80&auto=format&fit=crop', alt: 'Modern gym interior' },
              { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80&auto=format&fit=crop', alt: 'Treadmill cardio zone' },
              { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80&auto=format&fit=crop', alt: 'Free weights area' },
              { src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=80&auto=format&fit=crop', alt: 'Dumbbells rack' },
              { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&q=80&auto=format&fit=crop', alt: 'Strength training zone' },
              { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=900&q=80&auto=format&fit=crop', alt: 'Kettlebells and accessories' },
            ].map((img, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative overflow-hidden rounded-2xl shadow-md group h-52">
                <img src={img.src} alt={img.alt} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Planned Facilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Preview</p>
            <h2 className="text-3xl font-bold text-primary font-display">Planned <GradientText>Facilities</GradientText></h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: '🏋️', title: 'Modern Fitness Equipment', desc: 'Latest machines for strength and cardio training.' },
              { icon: '🚴', title: 'Dedicated Cardio Zone', desc: 'Treadmills, cycles and ellipticals.' },
              { icon: '👨‍🏫', title: 'Personal Training Support', desc: 'Expert trainers available on request.' },
              { icon: '❄️', title: 'Comfortable Workout Environment', desc: 'Fully AC with proper ventilation.' },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-primary text-sm mb-2">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expected Hours */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-2xl font-bold font-display mb-8">Expected Hours</h2>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-3xl mb-2">☀️</div>
                <p className="text-accent font-bold mb-1">Morning</p>
                <p className="text-white font-semibold">06:00 AM – 10:00 AM</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-3xl mb-2">🌙</div>
                <p className="text-accent font-bold mb-1">Evening</p>
                <p className="text-white font-semibold">05:00 PM – 08:00 PM</p>
              </div>
            </div>
            <a href={`tel:${phone}`}
              className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition">
              📞 {phone}
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
