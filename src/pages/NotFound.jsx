import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../hooks/useSite'

export default function NotFound() {
  const { v, list } = useSite()
  const phone = v('phone')
  const links = list('nav_links').slice(0, 6)

  return (
    <main className="min-h-screen bg-primary flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center relative z-10 max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-8xl md:text-9xl font-bold text-accent/20 leading-none select-none" style={{ fontFamily: 'Playfair Display, serif' }}>
            404
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-5xl mb-6 -mt-4">
          {v('nf_icon')}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            {v('nf_title')}
          </h1>
          <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">{v('nf_desc')}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/"
            className="bg-accent text-primary px-8 py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-colors">
            {v('nf_cta')}
          </Link>
          <a href={`tel:${phone}`}
            className="bg-white/10 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20">
            📞 Call Us
          </a>
        </motion.div>

        {links.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3 justify-center">
            {links.map((l, i) => (
              <Link key={i} to={l.to || '/'}
                className="text-white/40 hover:text-accent text-xs transition-colors underline underline-offset-2">
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  )
}
