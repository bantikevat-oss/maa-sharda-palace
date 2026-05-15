import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'

export default function Header() {
  const { config } = useAdmin()
  const phone = config?.phone || SITE_DEFAULTS.phone
  const phone2 = config?.phone2 || SITE_DEFAULTS.phone2
  const email = config?.email || SITE_DEFAULTS.email
  const address = config?.address || SITE_DEFAULTS.address
  const logo = config?.img_logo || SITE_DEFAULTS.img_logo
  const businessName = config?.businessName || SITE_DEFAULTS.businessName
  const bookingUrl = config?.bookingUrl || SITE_DEFAULTS.bookingUrl
  const instagram = config?.instagram || SITE_DEFAULTS.instagram
  const facebook = config?.facebook || SITE_DEFAULTS.facebook

  const location = useLocation()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/rooms', label: 'Rooms' },
    { to: '/dining', label: 'Dining' },
    { to: '/amenities/banquet', label: 'Banquet' },
    { to: '/amenities', label: 'Amenities' },
    { to: '/ujjain-darshan', label: 'Ujjain Darshan' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-primary/95 border-b border-white/10 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${email}`} className="hover:text-accent transition-colors">
              ✉️ {email}
            </a>
            {config?.virtualTour && (
              <a href={config.virtualTour} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                🎥 Virtual Tour
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                📸 Instagram
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                👍 Facebook
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`transition-all duration-500 ${scrolled || !isHome ? 'bg-primary/95 backdrop-blur-md shadow-xl' : 'bg-primary/80 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
              <img src={logo} alt={businessName} className="w-full h-full object-contain bg-primary" style={{ filter: 'invert(1)' }} />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{businessName}</div>
              <div className="text-accent text-xs">Ujjain</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'}
                className={({ isActive }) =>
                  `text-xs font-medium px-2.5 py-1.5 rounded transition-colors whitespace-nowrap ${isActive ? 'text-accent bg-white/10' : 'text-white/80 hover:text-accent hover:bg-white/5'}`
                }>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <a href={`tel:${phone}`}
              className="bg-yellow-400 text-primary px-3 py-1.5 rounded text-xs font-bold hover:bg-yellow-300 transition-colors whitespace-nowrap">
              📞 {phone}
            </a>
            <a href={`tel:${phone2}`}
              className="bg-red-500 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-red-400 transition-colors whitespace-nowrap">
              📞 {phone2}
            </a>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
              className="bg-accent text-primary px-4 py-1.5 rounded text-xs font-bold hover:shadow-lg hover:shadow-accent/30 transition-all whitespace-nowrap">
              BOOK NOW
            </a>
          </div>

          {/* Mobile menu btn */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2" aria-label="Menu">
            <div className={`w-6 h-0.5 bg-current transition-all mb-1.5 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-current transition-all mb-1.5 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary/98 backdrop-blur-md border-t border-white/10">
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-accent bg-white/10' : 'text-white/80 hover:text-accent hover:bg-white/5'}`
                  }>
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <a href={`tel:${phone}`} className="block text-center bg-yellow-400 text-primary px-4 py-2.5 rounded-lg text-sm font-bold">
                  📞 {phone}
                </a>
                <a href={`tel:${phone2}`} className="block text-center bg-red-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold">
                  📞 {phone2}
                </a>
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-accent text-primary px-4 py-2.5 rounded-lg text-sm font-bold">
                  BOOK NOW
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
