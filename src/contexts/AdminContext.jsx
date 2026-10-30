import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { SITE_DEFAULTS, migrateConfig } from '../content/schema'
import { adminFetch, authRequest, clearAdminToken, getAdminToken, storeAdminToken, SESSION_EXPIRED_EVENT } from '../lib/adminAuth'

const AdminContext = createContext(null)

/* Re-exported so existing imports keep working. */
export { SITE_DEFAULTS }

export function AdminProvider({ children, configKey }) {
  const [isAdmin, setIsAdmin] = useState(() => !!getAdminToken())
  const [config, setConfig] = useState(SITE_DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved | error
  const savedRef = useRef(null)

  useEffect(() => {
    // 1. Instant paint from localStorage so the site never flashes defaults.
    let local = SITE_DEFAULTS
    try {
      const cached = localStorage.getItem(configKey)
      if (cached) local = { ...SITE_DEFAULTS, ...migrateConfig(JSON.parse(cached)) }
    } catch { /* corrupted cache — ignore and use defaults */ }
    setConfig(local)

    // 2. Then reconcile with the server copy (the source of truth).
    fetch('/api/get-config.php', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(server => {
        if (server && typeof server === 'object' && Object.keys(server).length) {
          savedRef.current = server
          const merged = { ...SITE_DEFAULTS, ...migrateConfig(server) }
          setConfig(merged)
          try { localStorage.setItem(configKey, JSON.stringify(server)) } catch { /* quota */ }
        }
      })
      .catch(() => { /* offline — localStorage copy stands */ })
      .finally(() => setLoading(false))
  }, [configKey])

  // a write that comes back 401 means the token expired — drop back to the login screen
  useEffect(() => {
    const onExpired = () => setIsAdmin(false)
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired)
  }, [])

  // Username + password are checked by api/auth.php on the server, never in the browser.
  const login = async (username, password) => {
    try {
      const r = await authRequest({ action: 'login', username, password })
      storeAdminToken(r.token, r.expires)
      setIsAdmin(true)
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e.message }
    }
  }

  const logout = () => {
    clearAdminToken()
    setIsAdmin(false)
  }

  /** changes: { newPassword?, newUsername? } — always confirmed with the current password. */
  const changeCredentials = async (currentPassword, changes) => {
    const r = await authRequest({ action: 'change', token: getAdminToken(), currentPassword, ...changes })
    storeAdminToken(r.token, r.expires)
  }

  /**
   * Persist a partial config change.
   * Only keys that differ from the schema defaults are written to the server,
   * which keeps site-config.json small and lets future default changes flow through.
   */
  const updateConfig = useCallback(async (patch) => {
    setSaveState('saving')
    const merged = { ...config, ...patch }
    setConfig(merged)

    const diff = {}
    Object.keys(merged).forEach(k => {
      const cur = merged[k]
      const def = SITE_DEFAULTS[k]
      if (JSON.stringify(cur) !== JSON.stringify(def)) diff[k] = cur
    })

    try { localStorage.setItem(configKey, JSON.stringify(diff)) } catch { /* quota */ }

    try {
      const res = await adminFetch('/api/save-config.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: diff }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.success) throw new Error(data?.error || 'Save failed')
      savedRef.current = diff
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2500)
      return { ok: true }
    } catch (e) {
      setSaveState('error')
      setTimeout(() => setSaveState('idle'), 4000)
      return { ok: false, error: e.message }
    }
  }, [config, configKey])

  /** Restore one or more keys to their shipped defaults. */
  const resetKeys = useCallback(async (keys) => {
    const patch = {}
    keys.forEach(k => { patch[k] = SITE_DEFAULTS[k] })
    return updateConfig(patch)
  }, [updateConfig])

  return (
    <AdminContext.Provider value={{ isAdmin, config, loading, saveState, login, logout, changeCredentials, updateConfig, resetKeys }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
