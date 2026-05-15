import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/content', label: 'Content', icon: '✏️' },
  { to: '/admin/rooms', label: 'Rooms & Pricing', icon: '🛏️' },
  { to: '/admin/images', label: 'Images', icon: '🖼️' },
  { to: '/admin/blog', label: 'Blog', icon: '📝' },
  { to: '/admin/seo', label: 'SEO', icon: '🔍' },
  { to: '/admin/gtm', label: 'GTM / Analytics', icon: '📈' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
]

export default function AdminLayout() {
  const { isAdmin, logout } = useAdmin()
  const navigate = useNavigate()

  if (!isAdmin) return <Navigate to="/admin/login" replace />

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Admin Panel</div>
          <div className="font-bold text-lg font-display">Hotel Maa Sharda</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${isActive ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition flex items-center gap-3">
            <span>🚪</span> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-primary text-white px-4 py-3 flex justify-between items-center">
        <span className="font-bold text-sm font-display">Admin Panel</span>
        <button onClick={handleLogout} className="text-white/60 text-xs">Logout</button>
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0 md:p-8 p-4 pt-16 md:pt-8">
        <Outlet />
      </main>
    </div>
  )
}
