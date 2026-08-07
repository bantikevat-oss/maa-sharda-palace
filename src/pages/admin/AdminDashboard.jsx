import { Link } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'
import { useBlogList } from '../../hooks/useBlog'
import { CONTENT_MODEL, SITE_DEFAULTS } from '../../content/schema'

export default function AdminDashboard() {
  const { config } = useAdmin()
  const { posts } = useBlogList()

  const rooms = Array.isArray(config?.rooms) ? config.rooms : SITE_DEFAULTS.rooms
  const photos = Array.isArray(config?.gallery_photos) ? config.gallery_photos : SITE_DEFAULTS.gallery_photos
  const reviews = Array.isArray(config?.testimonials) ? config.testimonials : SITE_DEFAULTS.testimonials

  const cards = [
    { label: 'Room Types', value: rooms.length, icon: '🛏️', link: '/admin/pages/rooms' },
    { label: 'Gallery Photos', value: photos.length, icon: '🖼️', link: '/admin/pages/gallery' },
    { label: 'Guest Reviews', value: reviews.length, icon: '⭐', link: '/admin/pages/home' },
    { label: 'Blog Posts', value: posts.length, icon: '📝', link: '/admin/blog' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1.5 font-display">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-7">
        Welcome back. Every word and photo on the website is editable from here — no coding needed.
      </p>

      {/* Counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => (
          <Link key={i} to={c.link}
            className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition">
            <div className="text-2xl mb-2">{c.icon}</div>
            <div className="font-bold text-2xl text-gray-800">{c.value}</div>
            <div className="text-xs mt-0.5 text-gray-400">{c.label}</div>
          </Link>
        ))}
      </div>

      {/* Contact snapshot */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-800 text-sm">Contact details shown on the website</h2>
          <Link to="/admin/pages/global" className="text-xs text-primary hover:underline">Edit →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          {[
            ['📞 Phone', config?.phone],
            ['📞 Phone 2', config?.phone2],
            ['💬 WhatsApp', config?.whatsapp],
            ['✉️ Email', config?.email],
          ].map(([label, val]) => (
            <div key={label} className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-[11px] text-gray-400">{label}</p>
              <p className="font-medium text-gray-700 truncate">{val || '—'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit any page */}
      <h2 className="text-lg font-bold text-gray-800 mb-3">Edit any page</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {CONTENT_MODEL.map(p => (
          <Link key={p.id} to={`/admin/pages/${p.id}`}
            className="bg-white border border-gray-100 rounded-xl px-4 py-3.5 hover:shadow-sm hover:border-primary/20 transition flex items-center gap-2.5">
            <span>{p.icon}</span>
            <span className="text-sm font-medium text-gray-700 truncate">{p.label}</span>
          </Link>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3 className="font-bold text-amber-800 mb-2">💡 Quick guide</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• <strong>Website Content</strong> — every heading, paragraph, photo and list, page by page.</li>
          <li>• <strong>Photos</strong> — upload once, then reuse anywhere on the site.</li>
          <li>• <strong>SEO & Verification</strong> — Google titles plus Search Console file upload.</li>
          <li>• Changes go live the moment you press Save. No page reload needed.</li>
        </ul>
      </div>
    </div>
  )
}
