import { Link } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'
import { useBlogList } from '../../hooks/useBlog'

export default function AdminDashboard() {
  const { config } = useAdmin()
  const { posts } = useBlogList()

  const cards = [
    { label: 'Total Rooms', value: config.totalRooms, icon: '🛏️', link: '/admin/rooms', color: 'bg-blue-50 text-blue-700' },
    { label: 'Blog Posts', value: posts.length, icon: '📝', link: '/admin/blog', color: 'bg-green-50 text-green-700' },
    { label: 'Phone', value: config.phone, icon: '📞', link: '/admin/content', color: 'bg-purple-50 text-purple-700' },
    { label: 'WhatsApp', value: config.whatsapp, icon: '💬', link: '/admin/content', color: 'bg-emerald-50 text-emerald-700' },
  ]

  const shortcuts = [
    { to: '/admin/content', label: 'Edit Content', icon: '✏️', desc: 'Hero, tagline, contact info' },
    { to: '/admin/rooms', label: 'Manage Rooms', icon: '🛏️', desc: 'Pricing & room details' },
    { to: '/admin/blog', label: 'Write Blog Post', icon: '📝', desc: 'Create & manage posts' },
    { to: '/admin/images', label: 'Upload Images', icon: '🖼️', desc: 'Replace photos' },
    { to: '/admin/seo', label: 'Edit SEO', icon: '🔍', desc: 'Meta titles & descriptions' },
    { to: '/admin/settings', label: 'Settings', icon: '⚙️', desc: 'Password & advanced' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2 font-display">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome back. Everything is editable — no coding needed.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => (
          <Link key={i} to={c.link}
            className={`${c.color} rounded-2xl p-5 hover:opacity-80 transition`}>
            <div className="text-2xl mb-2">{c.icon}</div>
            <div className="font-bold text-lg">{c.value}</div>
            <div className="text-xs mt-0.5 opacity-70">{c.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {shortcuts.map((s, i) => (
          <Link key={i} to={s.to}
            className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition group">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="font-semibold text-gray-800 group-hover:text-primary transition">{s.label}</div>
            <div className="text-xs text-gray-400 mt-1">{s.desc}</div>
          </Link>
        ))}
      </div>

      {/* Info */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3 className="font-bold text-amber-800 mb-2">💡 Tips</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Changes save automatically when you click Save — no page reload needed</li>
          <li>• All changes reflect on the live website instantly</li>
          <li>• Use the Blog section to write SEO articles and attract more visitors</li>
          <li>• Update your phone number in Content → it updates everywhere at once</li>
        </ul>
      </div>
    </div>
  )
}
