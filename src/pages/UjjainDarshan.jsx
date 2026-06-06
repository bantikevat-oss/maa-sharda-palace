import { useState } from 'react'
import { useSEO } from '../hooks/useSEO'
import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '../animations'
import { Link } from 'react-router-dom'
import GradientText from '../components/ui/GradientText'

const PLACES = [
  {
    id: 1,
    name: 'Mahakaleshwar Jyotirlinga',
    subtitle: 'One of the 12 Sacred Jyotirlingas of India',
    image: '/images/mahakaleshwar.jpg',
    icon: '🕉️',
    short: 'The most sacred temple of Ujjain, dedicated to Lord Shiva. One of the 12 Jyotirlingas in India and the only south-facing Shiva lingam.',
    details: `Mahakaleshwar Temple is one of the most sacred Hindu temples in India, dedicated to Lord Shiva. Located in the ancient city of Ujjain, Madhya Pradesh, it is one of the twelve Jyotirlingas — the most sacred abodes of Shiva.

What makes this temple unique is that the Shiva lingam here is Swayambhu (self-manifested), deriving its power from within itself. The deity is also unique as it faces south (Dakshinamukhi), which is rare among Jyotirlingas.

The famous Bhasma Aarti (ash ritual) performed every morning before sunrise is one of the most extraordinary religious rituals in India. Devotees wait months to attend this aarti.

**Timings:** 4:00 AM – 11:00 PM
**Bhasma Aarti:** 4:00 AM – 6:00 AM (Pre-booking required)
**Distance from Hotel:** Approximately 8 km`,
    timing: '4:00 AM – 11:00 PM',
    distance: '~8 km from hotel',
  },
  {
    id: 2,
    name: 'Mahakal Lok',
    subtitle: 'Grand Spiritual Corridor of Ujjain',
    image: '/images/mahakal_lok.jpg',
    icon: '🏛️',
    short: 'A grand 900-meter spiritual corridor connecting Rudra Sagar to Mahakaleshwar Temple, featuring 190+ sculptures and statues depicting scenes from Shiva Purana.',
    details: `Mahakal Lok is a magnificent spiritual corridor developed by the Government of Madhya Pradesh to enhance the religious experience of pilgrims visiting the Mahakaleshwar Temple.

Stretching over 900 meters, this corridor features over 190 murals and 108 life-size statues depicting stories from the Shiva Purana and Srimad Bhagavatam. The beautifully illuminated walkway is especially breathtaking in the evening.

The corridor connects Rudra Sagar Lake to the Mahakaleshwar Temple and features:
- 108 pillars with intricate carvings
- Beautiful landscaped gardens
- Food courts and resting areas
- Stunning light and sound show in the evenings

**Best Time to Visit:** Evening for the light show
**Timings:** Open 24 hours
**Distance from Hotel:** Approximately 8 km`,
    timing: 'Open 24 hours',
    distance: '~8 km from hotel',
  },
  {
    id: 3,
    name: 'Kal Bhairav Temple',
    subtitle: 'Ancient Temple of the Guardian of Ujjain',
    image: '/images/kal_bhairav.jpg',
    icon: '🔱',
    short: 'An ancient and mysterious temple dedicated to Kal Bhairav, the guardian deity of Ujjain. Famous for the unique prasad offering of liquor to the deity.',
    details: `Kal Bhairav Temple is one of the most ancient and mystical temples of Ujjain. Kal Bhairav is considered the guardian deity (Kotwal) of Ujjain and is a fierce manifestation of Lord Shiva.

The temple is famous for its unique ritual where liquor (Madira) is offered to the deity as prasad. Devotees bring bottles of alcohol which are believed to be consumed by the idol — a phenomenon that has astonished scientists and devotees alike.

The temple dates back to the time of King Chandapradeep, and finds mention in the ancient text Avanti Khand. The main idol is adorned with garlands and vibrant decorations.

**Key Features:**
- Ancient idol with a striking red face
- Unique liquor prasad ritual
- Vibrant festival celebrations
- Historical significance dating back centuries

**Timings:** 6:00 AM – 10:00 PM
**Distance from Hotel:** Approximately 6 km`,
    timing: '6:00 AM – 10:00 PM',
    distance: '~6 km from hotel',
  },
  {
    id: 4,
    name: 'Mangalnath Temple',
    subtitle: 'The Birthplace of Mars (Mangal Grah)',
    image: '/images/Mangalnath.jpg',
    icon: '🪐',
    short: 'According to ancient scriptures, Mars (Mangal Grah) was born in Ujjain. This temple is considered the birthplace of the planet Mars and is significant for Navgrah worship.',
    details: `Mangalnath Temple, situated on the banks of the Shipra River, is one of the most important astrological sites in India. According to the ancient text Matsya Purana, Mars (Mangal Grah) was born from the earth in Ujjain, making this city the birthplace of the planet.

The temple sits on a hill and offers a panoramic view of the city and the Shipra River. It is especially significant for people with Mangal Dosha in their horoscope, who come here to perform special pujas.

**Significance:**
- Only place on Earth considered birthplace of planet Mars
- Important Navgrah pilgrimage site
- Special Mangal Dosha Nivaran puja performed here
- Ancient temple with historical importance

**Special Puja:** Mangal (Tuesday) puja is most significant
**Timings:** 6:00 AM – 9:00 PM
**Distance from Hotel:** Approximately 5 km`,
    timing: '6:00 AM – 9:00 PM',
    distance: '~5 km from hotel',
  },
  {
    id: 5,
    name: 'Navgrah Shani Mandir',
    subtitle: 'Temple of the Nine Planets',
    image: '/images/navgrah_shani.jpg',
    icon: '⭐',
    short: 'A famous temple dedicated to all nine planets (Navgrahas), especially Lord Shani (Saturn). Located very close to our hotel, it is one of Ujjain\'s most visited temples.',
    details: `The Navgrah Shani Mandir in Ujjain is one of the most revered temples dedicated to the nine planets (Navgrahas), with special emphasis on Lord Shani (Saturn). Ujjain has been considered the center of astrological studies since ancient times, and this temple holds immense importance.

Conveniently located very close to Hotel Maa Sharda Palace, this temple draws thousands of devotees every Saturday (Shani's sacred day) who come seeking blessings for relief from Shani's malefic effects.

**Key Features:**
- Idols of all nine planets installed
- Special Shani puja every Saturday
- Renowned for astrological significance
- Beautiful temple architecture
- Very close to our hotel — walking distance possible

**Most Crowded:** Saturday (Shani Day)
**Timings:** 5:00 AM – 10:00 PM
**Distance from Hotel:** Walking distance / 0.5 km`,
    timing: '5:00 AM – 10:00 PM',
    distance: 'Walking distance from hotel',
  },
  {
    id: 6,
    name: 'Harsiddhi Temple',
    subtitle: 'One of the 51 Shakti Peethas of India',
    image: '/images/Harsiddhii.webp',
    icon: '🌺',
    short: 'An important Shakti Peetha and one of the 51 sacred sites of Goddess Shakti. The temple is known for its two giant lamps that are lit during Navratri.',
    details: `Harsiddhi Temple is one of the most important Shakti Peethas in India. According to Hindu mythology, when Lord Shiva was carrying the body of Goddess Sati, her elbow fell at this spot in Ujjain. This makes it one of the 51 Shakti Peethas — sacred sites where parts of Goddess Sati's body fell.

The presiding deity is Goddess Harsiddhi, considered the patron goddess of the legendary King Vikramaditya. The king is said to have offered his head to the goddess nine times, each time miraculously restored.

**Famous For:**
- Two giant lamp pillars (Deepstambh) with 1,100 earthen lamps lit during Navratri
- Ancient idol of Goddess Harsiddhi
- Connection to King Vikramaditya's legend
- Beautiful illumination during festivals

**Best Time:** Navratri for the spectacular lamp lighting
**Timings:** 5:00 AM – 10:00 PM
**Distance from Hotel:** Approximately 7 km`,
    timing: '5:00 AM – 10:00 PM',
    distance: '~7 km from hotel',
  },
  {
    id: 7,
    name: 'ISKCON Temple',
    subtitle: 'International Society for Krishna Consciousness',
    image: '/images/ISKCON.jpg',
    icon: '🪷',
    short: 'A beautiful and serene temple of the International Society for Krishna Consciousness (ISKCON), dedicated to Lord Krishna and Radha. Known for its cleanliness and spiritual atmosphere.',
    details: `The ISKCON Temple in Ujjain is a beautiful and peaceful temple dedicated to Radha-Madanmohan (Lord Krishna). Built by the International Society for Krishna Consciousness, the temple is known for its stunning architecture, cleanliness, and serene spiritual atmosphere.

The temple complex features beautifully decorated deities, daily bhajans and kirtans, and a sattvik prasadam (vegetarian food) distribution facility. It is a perfect place for those seeking peace and devotion in a calm environment.

**Activities at ISKCON Ujjain:**
- Daily aarti and kirtan sessions
- Prasadam distribution
- Spiritual discourses
- Beautiful garden and temple complex
- Book shop with spiritual literature

**Special Days:** Janmashtami, Radhashtami, and Ekadashi
**Timings:** 4:30 AM – 1:00 PM | 4:00 PM – 9:00 PM
**Distance from Hotel:** Approximately 10 km`,
    timing: '4:30 AM – 1:00 PM | 4:00 PM – 9:00 PM',
    distance: '~10 km from hotel',
  },
  {
    id: 8,
    name: 'Sandipani Ashram',
    subtitle: 'Gurukul of Lord Krishna and Sudama',
    image: '/images/sandipani_ashram.jpg',
    icon: '📚',
    short: 'The ancient ashram where Lord Krishna, Balrama, and Sudama received their education from Guru Sandipani. A place of immense historical and religious significance.',
    details: `Sandipani Ashram is one of the most historically significant sites in Ujjain. This is the sacred gurukul (school) where Lord Krishna, Balarama, and their dear friend Sudama received their education from their guru, Sandipani Muni.

The ashram is maintained in the same spirit as an ancient gurukul and is an important pilgrimage site for Krishna devotees. A stone slab here is believed to have been used as a writing slate by Lord Krishna himself.

**Historical Significance:**
- Lord Krishna and Balarama's place of education
- Ancient well where Krishna fetched water for his guru
- Stone slab believed to be Krishna's writing slate
- Statues of Guru Sandipani with Krishna and Balarama
- Peaceful and spiritually charged environment

**Perfect For:** Families, students, and Krishna devotees
**Timings:** 7:00 AM – 12:00 PM | 4:00 PM – 8:00 PM
**Distance from Hotel:** Approximately 9 km`,
    timing: '7:00 AM – 12:00 PM | 4:00 PM – 8:00 PM',
    distance: '~9 km from hotel',
  },
  {
    id: 9,
    name: 'Chintaman Ganesh Temple',
    subtitle: 'Swayambhu Ganesh — The Wish Fulfilling God',
    image: '/images/chintaman_ganesh.webp',
    icon: '🐘',
    short: 'One of the most ancient Ganesh temples in India. The idol here is Swayambhu (self-manifested) and is believed to fulfill all wishes of sincere devotees.',
    details: `Chintaman Ganesh Temple is one of the most revered and ancient Ganesh temples in India, located in Ujjain. The word "Chintaman" means "one who removes all worries and fulfills wishes," and devotees believe that sincere prayers here are always answered.

The idol of Lord Ganesha here is Swayambhu (self-manifested), meaning it was not carved by human hands but appeared naturally. The temple is situated near the Shipra River and holds immense religious significance.

**Temple Highlights:**
- Swayambhu (self-manifested) Ganesha idol
- One of the oldest Ganesha temples in India
- Beautifully decorated during Ganesh Chaturthi
- Peaceful location near the Shipra River
- Special morning and evening aartis

**Best Time to Visit:** Ganesh Chaturthi festival
**Timings:** 5:00 AM – 10:00 PM
**Distance from Hotel:** Approximately 6 km`,
    timing: '5:00 AM – 10:00 PM',
    distance: '~6 km from hotel',
  },
  {
    id: 10,
    name: 'Gopal Mandir',
    subtitle: 'The Grand Temple of Lord Krishna in the Heart of Ujjain',
    image: '/images/gopal_mandir.jpg',
    icon: '🌼',
    short: 'A magnificent 19th-century temple dedicated to Lord Krishna, built by the Maratha Queen Bayajibai Shinde. Known for its stunning silver-plated entrance doors.',
    details: `Gopal Mandir, also known as Dwarkadheesh Temple, is one of the largest and most beautiful temples in Ujjain. Built in the 19th century by Maratha Queen Bayajibai Shinde, the temple is dedicated to Lord Krishna and is a fine example of Maratha temple architecture.

The temple is most famous for its stunning silver-plated entrance doors, which were originally part of the Somnath Temple and were brought here by Mahadji Shinde. The main shrine houses a beautiful idol of Lord Krishna with Radha.

**Temple Features:**
- Magnificent silver-plated entrance doors
- Beautiful Maratha-style architecture
- Large courtyard with a sacred tank
- Stunning idol of Radha-Krishna
- Located in the heart of Ujjain city — easy to visit

**Best Time:** Morning aarti and evening darshan
**Timings:** 6:00 AM – 12:00 PM | 4:00 PM – 9:00 PM
**Distance from Hotel:** Approximately 8 km`,
    timing: '6:00 AM – 12:00 PM | 4:00 PM – 9:00 PM',
    distance: '~8 km from hotel',
  },
]

function PlaceCard({ place, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div variants={fadeUp}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Temple Image */}
      <div className="relative overflow-hidden bg-gray-900" style={{ height: '360px' }}>
        {place.image ? (
          <>
            {/* Blurred backdrop — same image scaled & blurred to fill space */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${place.image})`,
                filter: 'blur(24px) brightness(0.45) saturate(1.2)',
                transform: 'scale(1.15)'
              }}
            />
            {/* Foreground full image — NO crop, NO cut */}
            <img
              src={place.image}
              alt={place.name}
              className="relative z-10 w-full h-full object-contain object-center hover:scale-[1.03] transition-transform duration-700"
              loading="lazy"
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling && (e.target.nextSibling.style.display = 'flex');
              }}
            />
          </>
        ) : null}
        {/* Fallback if image fails */}
        <div className="hidden w-full h-full items-center justify-center text-6xl bg-primary/10">
          {place.icon}
        </div>
        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
        {/* Number badge */}
        <span className="absolute top-3 left-3 z-30 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
          #{index + 1}
        </span>
        {/* Icon badge */}
        <span className="absolute top-3 right-3 z-30 text-2xl drop-shadow-lg">
          {place.icon}
        </span>
        {/* Temple name on image */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
          <p className="text-white font-bold text-lg font-display leading-tight drop-shadow-lg">{place.name}</p>
          <p className="text-amber-300 text-xs mt-0.5 drop-shadow">{place.subtitle}</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-600 text-sm leading-relaxed">{place.short}</p>

        <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
          <span>🕐 {place.timing}</span>
          <span>📍 {place.distance}</span>
        </div>
      </div>

      {/* Read More */}
      <div className="border-t border-gray-100">
        <button onClick={() => setOpen(!open)}
          className="w-full px-6 py-3 flex items-center justify-between text-sm font-semibold text-primary hover:bg-gray-50 transition-colors">
          <span>{open ? 'Show Less' : 'Read More'}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            ▼
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden">
              <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {place.details.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-3 last:mb-0">
                    {para.split('\n').map((line, j) => (
                      <span key={j}>
                        {line.startsWith('**') && line.endsWith('**')
                          ? <strong className="text-primary">{line.slice(2, -2)}</strong>
                          : line.startsWith('- ')
                            ? <span className="flex items-start gap-2 mt-1"><span className="text-accent mt-0.5">•</span>{line.slice(2)}</span>
                            : line
                        }
                        {j < para.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function UjjainDarshan() {
  const { config } = useAdmin()
  const phone = config?.phone || SITE_DEFAULTS.phone

  useSEO({
    title: 'Ujjain Darshan | Temple Tour Guide | Hotel Maa Sharda Palace',
    description: 'Complete guide to Ujjain\'s top 10 temples and religious places — Mahakaleshwar, Mahakal Lok, Kal Bhairav, Navgrah Shani Mandir and more. Stay at Hotel Maa Sharda Palace.',
  })

  return (
    <main className="pt-24">
      {/* Hero — Branded with Mahakaleshwar */}
      <section className="relative h-[420px] md:h-[480px] bg-primary overflow-hidden">
        {/* Background image - Mahakaleshwar temple */}
        <img src="/images/mahakaleshwarr.jpg" alt="Mahakaleshwar Temple Ujjain"
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.55)' }} />

        {/* Brand gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-primary/60" />

        {/* Decorative gold orb (left) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent/15 blur-[100px] rounded-full pointer-events-none" />
        {/* Decorative gold orb (right) */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
        {/* Bottom gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4 z-10">
          {/* Ornament — gold lines with Om */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-accent text-3xl md:text-4xl drop-shadow-[0_0_20px_rgba(201,168,76,0.6)]">🕉</span>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-accent" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-accent text-xs md:text-sm font-semibold uppercase tracking-[0.35em] mb-4">
            Explore the Sacred City
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}>
            <GradientText>Ujjain Darshan</GradientText>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-white/85 text-sm md:text-base max-w-2xl leading-relaxed font-light">
            Discover the sacred temples and spiritual destinations of Ujjain — <span className="text-accent font-medium">the City of Lord Mahakal</span>
          </motion.p>

          {/* Quick stats badges */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-7">
            <span className="bg-white/10 backdrop-blur-sm border border-white/15 text-white text-xs px-4 py-1.5 rounded-full">🛕 10 Sacred Temples</span>
            <span className="bg-white/10 backdrop-blur-sm border border-white/15 text-white text-xs px-4 py-1.5 rounded-full">📍 Near Our Hotel</span>
            <span className="bg-accent/20 backdrop-blur-sm border border-accent/40 text-accent text-xs px-4 py-1.5 rounded-full font-semibold">✨ Bhasma Aarti</span>
          </motion.div>

          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-xs text-white/50 mt-6">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Ujjain Darshan</span>
          </motion.nav>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-accent/5 border-b border-accent/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-gray-600 leading-relaxed">
              Ujjain, one of the seven sacred cities (Sapta Puri) of India, is a city of immense religious and historical significance. Home to the famous Mahakaleshwar Jyotirlinga, this ancient city on the banks of the Shipra River is a must-visit for every devotee.
              <br /><br />
              Conveniently located near major temples, <strong>Hotel Maa Sharda Palace</strong> is the perfect base for your Ujjain pilgrimage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Must Visit</p>
            <h2 className="text-4xl font-bold text-primary font-display">
              Top 10 Places in <GradientText>Ujjain</GradientText>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">Click "Read More" on any place to get full details, timings and distance from our hotel</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6">
            {PLACES.map((place, i) => (
              <PlaceCard key={place.id} place={place} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Travel Tips — colorful redesigned */}
      <section className="py-20 bg-gradient-to-b from-accent/5 via-white to-accent/5 relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-accent text-xs font-semibold uppercase tracking-[0.3em] mb-3">Helpful Guide</p>
            <h2 className="text-4xl font-bold text-primary font-display">Travel <GradientText>Tips</GradientText></h2>
            <p className="text-gray-500 mt-3 text-sm">Make your darshan experience smooth and memorable</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: '👕', tip: 'Dress Code', desc: 'Wear modest, traditional clothing while visiting temples. Avoid shorts and sleeveless tops.',
                from: 'from-pink-400', to: 'to-rose-500', bg: 'bg-rose-50', ring: 'ring-rose-100' },
              { icon: '🥿', tip: 'Footwear', desc: 'Remove footwear before entering all temple premises. Carry a bag for your shoes.',
                from: 'from-amber-400', to: 'to-orange-500', bg: 'bg-amber-50', ring: 'ring-amber-100' },
              { icon: '📷', tip: 'Photography', desc: 'Photography may be restricted inside main shrines. Always ask before clicking photos.',
                from: 'from-purple-400', to: 'to-indigo-500', bg: 'bg-purple-50', ring: 'ring-purple-100' },
              { icon: '⏰', tip: 'Best Time', desc: 'Visit temples early morning for a peaceful darshan experience and shorter queues.',
                from: 'from-sky-400', to: 'to-blue-500', bg: 'bg-sky-50', ring: 'ring-sky-100' },
              { icon: '💧', tip: 'Stay Hydrated', desc: 'Carry water especially during summers. Ujjain can be very hot from April to June.',
                from: 'from-cyan-400', to: 'to-teal-500', bg: 'bg-cyan-50', ring: 'ring-cyan-100' },
              { icon: '🚗', tip: 'Transport', desc: 'Our hotel offers pickup & drop services. Auto rickshaws are also easily available.',
                from: 'from-emerald-400', to: 'to-green-500', bg: 'bg-emerald-50', ring: 'ring-emerald-100' },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className={`group ${t.bg} rounded-3xl p-6 shadow-sm hover:shadow-xl ring-1 ${t.ring} hover:scale-[1.03] transition-all duration-300 border border-white relative overflow-hidden`}>
                {/* Decorative gradient blob */}
                <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${t.from} ${t.to} opacity-20 group-hover:opacity-30 transition-opacity blur-2xl`} />
                {/* Icon circle */}
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${t.from} ${t.to} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-4`}>
                  <span className="drop-shadow-md">{t.icon}</span>
                </div>
                <h3 className="font-bold text-primary mb-2 text-base font-display">{t.tip}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold font-display mb-4">Plan Your Ujjain Pilgrimage</h2>
            <p className="text-white/60 mb-8 text-sm">
              Stay at Hotel Maa Sharda Palace — centrally located, close to all major temples. Our staff can help you plan your darshan schedule.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${phone}`}
                className="bg-accent text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                📞 {phone}
              </a>
              <Link to="/rooms"
                className="bg-white text-primary px-7 py-3 rounded-full font-bold hover:brightness-110 transition">
                View Rooms
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
