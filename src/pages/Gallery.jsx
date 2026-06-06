import { useState } from 'react'
import { useAdmin } from '../contexts/AdminContext'
import { useSEO } from '../hooks/useSEO'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '../animations'
import { Link } from 'react-router-dom'
import GradientText from '../components/ui/GradientText'

const CATEGORIES = ['All', 'Rooms', 'Pool', 'Banquet', 'Lobby', 'Exterior']

export default function Gallery() {
  const { config } = useAdmin()
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  useSEO({
    title: config.seo_gallery?.title,
    description: config.seo_gallery?.description,
    image: config.img_lobby,
  })

  const allPhotos = [
    // Exterior
    { src: '/images/hotel_front.jpg', alt: 'Hotel Exterior', cat: 'Exterior' },
    { src: '/images/hero_bg_2.jpg', alt: 'Hotel Front View', cat: 'Exterior' },
    // Lobby & Reception
    { src: '/images/hotel_corridor.jpg', alt: 'Hotel Corridor', cat: 'Lobby' },
    { src: '/images/lobby.jpg', alt: 'Hotel Lobby', cat: 'Lobby' },
    { src: '/images/reception_2.jpg', alt: 'Reception Area', cat: 'Lobby' },
    // Rooms
    { src: '/images/room_deluxe_new.jpg', alt: 'Superior Room', cat: 'Rooms' },
    { src: '/images/room_deluxe.jpg', alt: 'Superior Room View', cat: 'Rooms' },
    { src: '/images/room_super_deluxe.jpg', alt: 'Superior Deluxe Room', cat: 'Rooms' },
    { src: '/images/room_super_deluxe_2.jpg', alt: 'Superior Deluxe View', cat: 'Rooms' },
    { src: '/images/room_executive_suite.jpg', alt: 'Executive Suite', cat: 'Rooms' },
    { src: '/images/room_executive.jpg', alt: 'Executive Room', cat: 'Rooms' },
    { src: '/images/room_super_executive_2.jpg', alt: 'Executive Deluxe View', cat: 'Rooms' },
    { src: '/images/room_super_executive_3.jpg', alt: 'Executive Deluxe Interior', cat: 'Rooms' },
    // Pool
    { src: '/images/pool_indoor.jpg', alt: 'Indoor Swimming Pool', cat: 'Pool' },
    { src: '/images/pool_4.jpg', alt: 'Pool Lounge', cat: 'Pool' },
    // Banquet
    { src: '/images/banquet_hall_1.jpg', alt: 'Grand Banquet Hall', cat: 'Banquet' },
    { src: '/images/banquet_hall_2.jpg', alt: 'Banquet Hall', cat: 'Banquet' },
    { src: '/images/banquet_hall_3.jpg', alt: 'Banquet Setup', cat: 'Banquet' },
    { src: '/images/banquet_hall_4.jpg', alt: 'Banquet Decor', cat: 'Banquet' },
  ].filter(p => p.src)

  const filtered = active === 'All' ? allPhotos : allPhotos.filter(p => p.cat === active)

  return (
    <main className="pt-20">
      {/* Banner */}
      <section className="relative h-64 bg-primary overflow-hidden">
        <img src={config.img_lobby} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-3">
            Photo <GradientText>Gallery</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Gallery</span>
          </nav>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 flex-wrap justify-center">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${active === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div key={active} variants={staggerContainer} initial="hidden" animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((photo, i) => (
                <motion.div key={`${active}-${i}`} variants={fadeUp}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-square bg-gray-200"
                  onClick={() => setLightbox(photo)}>
                  <img src={photo.src} alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">🔍</span>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">{photo.cat}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-24 text-gray-400">No photos in this category yet.</div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={e => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.alt}
                className="w-full max-h-[85vh] object-contain rounded-xl" />
              <p className="text-white text-center mt-3 text-sm">{lightbox.alt}</p>
              <button onClick={() => setLightbox(null)}
                className="absolute top-2 right-2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full text-white text-xl flex items-center justify-center transition">
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
