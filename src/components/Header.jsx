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
  const whatsapp = config?.whatsapp || SITE_DEFAULTS.whatsapp
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
    { to: '/wedding', label: 'Wedding' },
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
          <div className="flex items-center gap-3">
            <a href={`mailto:${email}`} className="hover:text-accent transition-colors" title={email}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
            {instagram ? (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" title="Instagram">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            ) : (
              <span className="text-white/30 cursor-default" title="Instagram">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </span>
            )}
            {facebook ? (
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" title="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            ) : (
              <span className="text-white/30 cursor-default" title="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </span>
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
              <div className="text-white font-bold text-sm leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{businessName.replace(/^Hotel /i, '')}</div>
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
            <Link to="/gallery"
              className="bg-white/10 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-white/20 transition-colors whitespace-nowrap border border-white/20">
              🎥 Virtual Tour
            </Link>
            <a href={`tel:${phone}`}
              className="bg-yellow-400 text-primary px-3 py-1.5 rounded text-xs font-bold hover:bg-yellow-300 transition-colors whitespace-nowrap">
              📞 {phone}
            </a>
            <a href={`https://wa.me/91${whatsapp.replace(/\D/g,'').replace(/^91/,'')}?text=Hi, I'd like to book a room at Hotel Maa Sharda Palace.`}
              target="_blank" rel="noopener noreferrer"
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-primary backdrop-blur-md border-t border-white/10 max-h-[85vh] overflow-y-auto">

            {/* Menu Header */}
            <div className="px-4 pt-4 pb-2 flex items-center justify-between border-b border-white/10">
              <div>
                <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>{businessName}</p>
                <p className="text-accent text-xs">Luxury Hotel · Ujjain</p>
              </div>
              <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white text-lg hover:bg-white/20 transition-colors">
                ✕
              </button>
            </div>

            {/* Nav Links */}
            <nav className="px-3 py-3">
              <div className="flex flex-col gap-1">
                {navLinks.map(link => (
                  <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'text-accent bg-accent/15 border border-accent/30' : 'text-white/80 hover:text-accent hover:bg-white/5 border border-transparent'}`
                    }>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* Divider */}
            <div className="mx-4 border-t border-white/10" />

            {/* CTA Buttons */}
            <div className="px-4 py-3 flex flex-col gap-2">
              <a href={`tel:${phone}`} className="flex items-center justify-center gap-1.5 bg-yellow-400 text-primary px-3 py-2.5 rounded-xl text-xs font-bold hover:bg-yellow-300 transition-colors">
                📞 {phone}
              </a>
              <Link to="/gallery" onClick={() => setMenuOpen(false)}
                className="block text-center bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors">
                🎥 Virtual Tour
              </Link>
              <a href={`https://wa.me/91${whatsapp.replace(/\D/g,'').replace(/^91/,'')}?text=Hi, I'd like to book a room at Hotel Maa Sharda Palace.`}
                target="_blank" rel="noopener noreferrer"
                className="block text-center bg-accent text-primary px-4 py-3 rounded-xl text-sm font-bold hover:bg-yellow-400 transition-colors tracking-wide">
                🏨 BOOK NOW
              </a>
            </div>

            {/* Social + Address */}
            <div className="px-4 pb-4 flex items-center justify-between">
              <p className="text-white/40 text-xs">📍 Ujjain Indore Road</p>
              <div className="flex gap-2">
                {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-accent transition-colors text-xs">📸 IG</a>}
                {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-accent transition-colors text-xs">👍 FB</a>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
