import { useState } from 'react'
import { NavLink, Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'
import { CONTENT_MODEL } from '../../content/schema'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/pages', label: 'Website Content', icon: '✏️' },
  { to: '/admin/media', label: 'Photos', icon: '🖼️' },
  { to: '/admin/blog', label: 'Blog', icon: '📝' },
  { to: '/admin/seo', label: 'SEO & Verification', icon: '🔍' },
  { to: '/admin/gtm', label: 'Analytics', icon: '📈' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
]

export default function AdminLayout() {
  const { isAdmin, logout, config } = useAdmin()
  const navigate = useNavigate()
  const location = useLocation()
  const [drawer, setDrawer] = useState(false)

  if (!isAdmin) return <Navigate to="/admin/login" replace />

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const onPages = location.pathname.startsWith('/admin/pages')

  const Nav = ({ onNavigate }) => (
    <>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.map(item => (
          <div key={item.to}>
            <NavLink to={item.to} end={item.end} onClick={onNavigate}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${isActive ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>

            {/* Quick jump to any page while the content editor is open */}
            {item.to === '/admin/pages' && onPages && (
              <div className="mt-1 mb-2 ml-4 pl-3 border-l border-white/10 space-y-0.5">
                {CONTENT_MODEL.map(p => (
                  <NavLink key={p.id} to={`/admin/pages/${p.id}`} onClick={onNavigate}
                    className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] transition ${isActive ? 'text-accent bg-white/10' : 'text-white/45 hover:text-white/80 hover:bg-white/5'}`}>
                    <span className="text-xs">{p.icon}</span>
                    <span className="truncate">{p.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-1">
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition">
          <span>🌐</span> <span>View website</span>
        </a>
        <button onClick={handleLogout}
          className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition flex items-center gap-3">
          <span>🚪</span> <span>Logout</span>
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="w-64 bg-primary text-white shrink-0 hidden md:flex flex-col fixed inset-y-0 left-0">
        <div className="p-6 border-b border-white/10">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Admin Panel</div>
          <div className="font-bold text-lg font-display leading-tight">{config?.businessName || 'Hotel Admin'}</div>
        </div>
        <Nav />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-primary text-white px-4 py-3 flex justify-between items-center">
        <button onClick={() => setDrawer(true)} aria-label="Open menu" className="flex items-center gap-2">
          <span className="text-lg">☰</span>
          <span className="font-bold text-sm font-display">Admin Panel</span>
        </button>
        <button onClick={handleLogout} className="text-white/60 text-xs">Logout</button>
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="md:hidden fixed inset-0 z-50 flex" onClick={() => setDrawer(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <aside className="relative w-72 max-w-[85%] bg-primary text-white flex flex-col h-full"
            onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-white/10 flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Admin Panel</div>
                <div className="font-bold font-display leading-tight">{config?.businessName || 'Hotel Admin'}</div>
              </div>
              <button onClick={() => setDrawer(false)} aria-label="Close menu"
                className="w-8 h-8 rounded-full bg-white/10 text-white shrink-0">✕</button>
            </div>
            <Nav onNavigate={() => setDrawer(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 min-w-0 md:ml-64 md:p-8 p-4 pt-16 md:pt-8">
        <Outlet />
      </main>
    </div>
  )
}
