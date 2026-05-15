import { Link } from 'react-router-dom'
import { useAdmin, SITE_DEFAULTS } from '../contexts/AdminContext'

export default function Footer() {
  const { config } = useAdmin()
  const businessName = config?.businessName || SITE_DEFAULTS.businessName
  const phone = config?.phone || SITE_DEFAULTS.phone
  const phone2 = config?.phone2 || SITE_DEFAULTS.phone2
  const email = config?.email || SITE_DEFAULTS.email
  const address = config?.address || SITE_DEFAULTS.address
  const instagram = config?.instagram || SITE_DEFAULTS.instagram
  const facebook = config?.facebook || SITE_DEFAULTS.facebook
  const gmb = config?.gmb || SITE_DEFAULTS.gmb
  const logo = config?.img_logo || SITE_DEFAULTS.img_logo
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent">
                <img src={logo} alt={businessName} className="w-full h-full object-contain" style={{ filter: 'invert(1)' }} />
              </div>
              <div>
                <div className="font-bold text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{businessName}</div>
                <div className="text-accent text-xs">Ujjain, M.P.</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {config?.tagline || SITE_DEFAULTS.tagline} — Indoor pool, gym & 3 grand banquet halls on Indore Road.
            </p>
            <div className="flex gap-3">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all text-white">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-white">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {gmb && (
                <a href={gmb} target="_blank" rel="noopener noreferrer" aria-label="View us on Google Maps"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-white">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-accent mb-5 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/rooms', 'Rooms'], ['/dining', 'Dining'], ['/amenities/banquet', 'Banquet Hall'], ['/ujjain-darshan', 'Ujjain Darshan'], ['/gallery', 'Gallery'], ['/about', 'About Us'], ['/faq', 'FAQ'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-white/60 hover:text-accent transition-colors text-sm">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-bold text-accent mb-5 uppercase tracking-wider text-sm">Amenities</h3>
            <ul className="space-y-2">
              {[['/amenities/pool', 'Swimming Pool'], ['/amenities/gym', 'Gym & Fitness'], ['/amenities/banquet', 'Banquet Halls'], ['/amenities/party-hall', 'Party Hall'], ['/rooms/super-executive', 'Super Executive Suite']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-white/60 hover:text-accent transition-colors text-sm">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-accent mb-5 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${phone}`} className="flex items-start gap-2 text-white/60 hover:text-accent transition-colors">
                  <span className="mt-0.5">📞</span><span>{phone} (Primary)</span>
                </a>
              </li>
              {phone2 && (
                <li>
                  <a href={`tel:${phone2}`} className="flex items-start gap-2 text-white/60 hover:text-accent transition-colors">
                    <span className="mt-0.5">📞</span><span>{phone2} (Reception)</span>
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${email}`} className="flex items-start gap-2 text-white/60 hover:text-accent transition-colors">
                  <span className="mt-0.5">✉️</span><span>{email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60">
                <span className="mt-0.5">📍</span><span className="leading-relaxed">{address}</span>
              </li>
              <li className="flex items-start gap-2 text-white/60">
                <span>🕐</span><span>Check-in: {config?.checkIn || SITE_DEFAULTS.checkIn} · Check-out: {config?.checkOut || SITE_DEFAULTS.checkOut}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/40">
        <p>© {year} {businessName}. All rights reserved.</p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-accent transition-colors">Terms of Use</Link>
          <span className="text-white/20">|</span>
          <a href="https://byteflowtech.in/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/30 hover:text-accent transition-colors text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            Designed by ByteFlow Technologies Pvt. Ltd.
          </a>
        </div>
      </div>
    </footer>
  )
}
