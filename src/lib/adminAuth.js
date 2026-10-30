/**
 * Admin session — the browser side of api/auth.php.
 *
 * The password is checked on the server; a successful login hands back a
 * 12-hour token that every write sends as X-Admin-Token. Nothing here can
 * decide on its own that someone is an admin.
 */

const TOKEN_KEY = 'admin_token'
const EXPIRES_KEY = 'admin_token_expires'
export const SESSION_EXPIRED_EVENT = 'admin-session-expired'

export function getAdminToken() {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY) || ''
    const expires = Number(sessionStorage.getItem(EXPIRES_KEY) || 0)
    if (!token || expires * 1000 < Date.now()) return ''
    return token
  } catch {
    return ''
  }
}

export function storeAdminToken(token, expires) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token)
    sessionStorage.setItem(EXPIRES_KEY, String(expires))
  } catch { /* private mode — the session just won't survive a reload */ }
}

export function clearAdminToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(EXPIRES_KEY)
    sessionStorage.removeItem('admin_auth') // flag from the old client-side login
  } catch { /* ignore */ }
}

/** POST to auth.php; resolves with the JSON body or throws with the server's message. */
export async function authRequest(body) {
  const res = await fetch('/api/auth.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  let data = null
  try { data = await res.json() } catch { /* non-JSON error page */ }
  if (!res.ok) throw new Error((data && data.error) || `Request failed (${res.status})`)
  return data || {}
}

/**
 * fetch() for admin write endpoints. Adds the token; a 401 means the session
 * is over, so the panel is told to sign out instead of pretending it saved.
 */
export async function adminFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { ...(options.headers || {}), 'X-Admin-Token': getAdminToken() },
  })
  if (res.status === 401) {
    clearAdminToken()
    window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT))
  }
  return res
}
