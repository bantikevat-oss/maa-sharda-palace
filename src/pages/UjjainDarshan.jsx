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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Mahakaleshwar_Temple%2C_Ujjain.jpg/800px-Mahakaleshwar_Temple%2C_Ujjain.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Mahakal_Lok_ujjain.jpg/800px-Mahakal_Lok_ujjain.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Kal_Bhairav_temple_Ujjain.jpg/800px-Kal_Bhairav_temple_Ujjain.jpg',
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
    image: 'https://cdn.s3waas.gov.in/s3ab817c9349cf9c4f6877e1894a1faa00/uploads/2019/07/2019072682.jpg',
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
    image: 'https://cdn.s3waas.gov.in/s3ab817c9349cf9c4f6877e1894a1faa00/uploads/2019/07/2019072673.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Harsiddhi_Temple%2C_Ujjain_01.jpg/800px-Harsiddhi_Temple%2C_Ujjain_01.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/ISKCON_Temple_Ujjain.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Krishna_and_Balarama_Studying_with_the_Brahman_Sandipani_%281525-1550_CE%29.jpg/800px-Krishna_and_Balarama_Studying_with_the_Brahman_Sandipani_%281525-1550_CE%29.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Chintamann_Ganesh_Temple_Ujjain_-_panoramio.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Shikhara_of_Shri_Dwarkadhish_Gopal_Mandir.jpg',
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
      {place.image && (
        <div className="relative h-44 overflow-hidden bg-gray-100">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.display = 'none' }}
          />
          <span className="absolute top-3 left-3 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            #{index + 1}
          </span>
          <span className="absolute top-3 right-3 text-2xl">
            {place.icon}
          </span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {!place.image && (
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              {place.icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {!place.image && (
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                  #{index + 1}
                </span>
              </div>
            )}
            <h3 className="text-lg font-bold text-primary font-display leading-tight">{place.name}</h3>
            <p className="text-accent text-xs font-medium mt-0.5">{place.subtitle}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mt-4">{place.short}</p>

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
      {/* Hero */}
      <section className="relative h-72 bg-primary overflow-hidden">
        <img src={config?.img_lobby || '/images/lobby.jpg'} alt="Ujjain Darshan"
          className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Explore Ujjain
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display mb-3">
            <GradientText>Ujjain Darshan</GradientText>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/70 text-sm max-w-xl">
            Discover the sacred temples and spiritual destinations of Ujjain — the City of Lord Mahakal
          </motion.p>
          <nav className="text-sm text-white/60 mt-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Ujjain Darshan</span>
          </nav>
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

      {/* Travel Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary font-display">Travel <GradientText>Tips</GradientText></h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '👕', tip: 'Dress Code', desc: 'Wear modest, traditional clothing while visiting temples. Avoid shorts and sleeveless tops.' },
              { icon: '🥿', tip: 'Footwear', desc: 'Remove footwear before entering all temple premises. Carry a bag for your shoes.' },
              { icon: '📷', tip: 'Photography', desc: 'Photography may be restricted inside the main shrines. Always ask before clicking photos.' },
              { icon: '⏰', tip: 'Best Time', desc: 'Visit temples early morning for a peaceful darshan experience and shorter queues.' },
              { icon: '💧', tip: 'Stay Hydrated', desc: 'Carry water especially during summers. Ujjain can be very hot from April to June.' },
              { icon: '🚗', tip: 'Transport', desc: 'Our hotel offers pickup and drop services. Auto rickshaws are also easily available.' },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-primary mb-1 text-sm">{t.tip}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{t.desc}</p>
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
