import { useEffect } from 'react'

export function useSEO({ title, description, keywords, canonical, ogImage }) {
  useEffect(() => {
    if (title) document.title = title
    const setMeta = (name, content, attr = 'name') => {
      if (!content) return
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    setMeta('description', description)
    if (keywords) setMeta('keywords', keywords)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'website', 'property')
    if (ogImage) setMeta('og:image', ogImage, 'property')
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link) }
      link.setAttribute('href', canonical)
    }
  }, [title, description, keywords, canonical, ogImage])
}
