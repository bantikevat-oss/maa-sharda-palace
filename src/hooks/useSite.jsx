import { useMemo } from 'react'
import { useAdmin } from '../contexts/AdminContext'
import { SITE_DEFAULTS } from '../content/schema'

const isBlank = v => v === undefined || v === null || v === ''

/**
 * The single reader used by every public page.
 *
 *   const { v, list, on, img, wa, tel } = useSite()
 *   v('hero_h1')            → saved value, else the schema default
 *   list('why_cards')       → array (falls back to schema default when empty)
 *   on('show_trustbar')     → boolean section toggle
 *   img('img_pool')         → image URL with a safe fallback
 *   wa('custom message')    → full wa.me link
 */
export function useSite() {
  const { config } = useAdmin()

  return useMemo(() => {
    const v = (key, fallback) => {
      const val = config?.[key]
      if (!isBlank(val)) return val
      if (fallback !== undefined) return fallback
      return SITE_DEFAULTS[key] ?? ''
    }

    const list = (key, fallback) => {
      const val = config?.[key]
      if (Array.isArray(val) && val.length) return val
      if (Array.isArray(fallback)) return fallback
      const d = SITE_DEFAULTS[key]
      return Array.isArray(d) ? d : []
    }

    /** Section visibility — defaults to shown unless explicitly turned off. */
    const on = key => {
      const val = config?.[key]
      if (val === undefined || val === null) {
        const d = SITE_DEFAULTS[key]
        return d === undefined ? true : !!d
      }
      return !!val
    }

    const img = (key, fallback) => v(key, fallback)

    const digits = n => String(n || '').replace(/\D/g, '').replace(/^0+/, '').replace(/^91/, '')

    const tel = (key = 'phone') => `tel:${v(key)}`

    const wa = (message, key = 'whatsapp') => {
      const num = digits(v(key))
      const text = message || v('whatsapp_message')
      return `https://wa.me/91${num}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    }

    /** Split a textarea into paragraphs on blank lines. */
    const paras = key => String(v(key) || '').split(/\n{2,}/).map(s => s.trim()).filter(Boolean)

    return { config, v, list, on, img, wa, tel, paras, digits }
  }, [config])
}

/**
 * Renders *starred* words in gold. Used for headlines the client can edit,
 * e.g. "Your Dream *Wedding* Awaits".
 */
export function highlight(text, className = 'text-accent') {
  const str = String(text || '')
  if (!str.includes('*')) return str
  return str.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2
      ? <span key={i} className={className}>{part.slice(1, -1)}</span>
      : part
  )
}
