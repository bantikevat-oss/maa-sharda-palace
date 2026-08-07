import { Link } from 'react-router-dom'
import { useSite } from '../hooks/useSite'

export default function Footer() {
  const { v, list } = useSite()

  const businessName = v('businessName')
  const phone = v('phone')
  const phone2 = v('phone2')
  const email = v('email')
  const address = v('address')
  const instagram = v('instagram')
  const facebook = v('facebook')
  const gmb = v('gmb')
  const logo = v('img_logo')
  const year = new Date().getFullYear()

  const quickLinks = list('footer_quick_links')
  const amenityLinks = list('footer_amenity_links')

  const copyright = String(v('footer_copyright'))
    .replace(/\{year\}/g, year)
    .replace(/\{name\}/g, businessName)

  return (
    <footer className="bg-[#080b18] text-white">

      <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-amber-400/40">
              <img src={logo} alt={businessName} className="w-full h-full object-contain" style={{ filter: 'invert(1)' }} />
            </div>
            <div>
              <div className="font-bold text-base leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{businessName}</div>
              <div className="text-amber-400 text-[11px] tracking-widest uppercase">{v('brand_region')}</div>
            </div>
          </div>
          <p className="text-white/45 text-xs leading-relaxed mb-5">{v('footer_about')}</p>
          <div className="flex gap-2.5 items-center">
            {email && (
              <a href={`mailto:${email}`} aria-label="Email"
                className="w-9 h-9 bg-white/8 rounded-full flex items-center justify-center hover:bg-amber-400 transition-all text-white/70 hover:text-primary">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 bg-white/8 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 transition-all text-white/70 hover:text-white">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 bg-white/8 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all text-white/70 hover:text-white">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            )}
            {gmb && (
              <a href={gmb} target="_blank" rel="noopener noreferrer" aria-label="Location on Google Maps"
                className="w-9 h-9 bg-white/8 rounded-full flex items-center justify-center hover:bg-red-500 transition-all text-white/70 hover:text-white">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        {quickLinks.length > 0 && (
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-amber-400 mb-4 uppercase tracking-widest text-[11px]">{v('footer_links_title')}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {quickLinks.map((l, i) => (
                <Link key={i} to={l.to || '/'}
                  className="text-white/50 hover:text-amber-400 transition-colors text-xs py-0.5">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        {amenityLinks.length > 0 && (
          <div>
            <h3 className="font-semibold text-amber-400 mb-4 uppercase tracking-widest text-[11px]">{v('footer_amenities_title')}</h3>
            <ul className="space-y-1.5">
              {amenityLinks.map((l, i) => (
                <li key={i}>
                  <Link to={l.to || '/'} className="text-white/50 hover:text-amber-400 transition-colors text-xs">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-amber-400 mb-4 uppercase tracking-widest text-[11px]">{v('footer_contact_title')}</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors">
                <svg className="w-4 h-4 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                +91 {phone}
              </a>
            </li>
            {phone2 && (
              <li>
                <a href={`tel:${phone2}`} className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  +91 {phone2}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors break-all">
                  <svg className="w-4 h-4 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  {email}
                </a>
              </li>
            )}
            <li className="flex items-start gap-2 text-white/45 leading-relaxed">
              <svg className="w-4 h-4 flex-shrink-0 text-white mt-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>{address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-20 lg:pb-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-white/30">
        <p>{copyright}</p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link to="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-amber-400 transition-colors">Terms of Use</Link>
          <span className="text-white/15">|</span>
          <a href="https://byteflowtech.in/" target="_blank" rel="noopener"
            className="flex items-center gap-1 text-white/25 hover:text-amber-400 transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            Website by ByteFlow Technologies Pvt Ltd
          </a>
        </div>
      </div>

    </footer>
  )
}
