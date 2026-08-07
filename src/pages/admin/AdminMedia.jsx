import { useState, useEffect, useCallback } from 'react'
import { allFields } from '../../content/schema'
import { useAdmin } from '../../contexts/AdminContext'

/**
 * Photo manager — upload once here, then pick the image from any
 * image field elsewhere in the admin.
 */
export default function AdminMedia() {
  const { config } = useAdmin()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/list-images.php', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : { images: [] }))
      .then(d => setImages(Array.isArray(d.images) ? d.images : []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  /** Which content field(s) currently point at a given image. */
  const usageMap = (() => {
    const map = {}
    const note = (url, label) => {
      if (typeof url !== 'string' || !url.startsWith('/images/')) return
      const name = url.slice('/images/'.length)
      map[name] = map[name] || []
      if (!map[name].includes(label)) map[name].push(label)
    }
    allFields().forEach(f => {
      const val = config?.[f.k]
      if (f.type === 'image') note(val, `${f.pageLabel} · ${f.label}`)
      if (f.type === 'list' && Array.isArray(val)) {
        val.forEach(row => (f.item || []).forEach(sub => {
          if (sub.type === 'image') note(row?.[sub.k], `${f.pageLabel} · ${f.label}`)
        }))
      }
    })
    return map
  })()

  const upload = async (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    setError(''); setUploading(true)
    for (const file of files) {
      if (!file.type.startsWith('image/')) { setError(`${file.name} is not an image.`); continue }
      if (file.size > 6 * 1024 * 1024) { setError(`${file.name} is larger than 6 MB.`); continue }
      try {
        const base64 = await new Promise((res, rej) => {
          const r = new FileReader()
          r.onload = ev => res(String(ev.target.result).split(',')[1])
          r.onerror = rej
          r.readAsDataURL(file)
        })
        const resp = await fetch('/api/upload-image.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name.replace(/[^a-zA-Z0-9._-]/g, '_'), base64 }),
        })
        const data = await resp.json()
        if (!data.url) throw new Error(data.error || 'Upload failed')
      } catch (err) { setError(err.message) }
    }
    setUploading(false)
    load()
  }

  const copy = (url) => {
    navigator.clipboard?.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(''), 1800)
  }

  const filtered = query ? images.filter(i => i.toLowerCase().includes(query.toLowerCase())) : images

  return (
    <div>
      <div className="flex flex-wrap justify-between items-start gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Photos</h1>
          <p className="text-gray-500 text-sm">
            {images.length} photo{images.length === 1 ? '' : 's'} on the server. Upload here, then pick them from any page.
          </p>
        </div>
        <label>
          <input type="file" accept="image/*" multiple className="sr-only" onChange={upload} disabled={uploading} />
          <span className="inline-block bg-primary text-white text-sm px-5 py-2.5 rounded-xl cursor-pointer hover:opacity-90">
            {uploading ? 'Uploading…' : '⬆ Upload photos'}
          </span>
        </label>
      </div>

      <input type="search" value={query} onChange={e => setQuery(e.target.value)}
        placeholder="Search photos by filename…"
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-primary/40" />

      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      {loading ? (
        <p className="text-center text-gray-400 py-20 text-sm">Loading photos…</p>
      ) : !filtered.length ? (
        <p className="text-center text-gray-400 py-20 text-sm">
          {images.length ? 'No photo matches your search.' : 'No photos yet — upload some to get started.'}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filtered.map(name => {
            const url = `/images/${name}`
            const uses = usageMap[name] || []
            return (
              <div key={name} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <a href={url} target="_blank" rel="noopener noreferrer" className="block aspect-square bg-gray-100">
                  <img src={url} alt={name} loading="lazy" className="w-full h-full object-cover" />
                </a>
                <div className="p-3">
                  <p className="text-[11px] font-medium text-gray-700 truncate" title={name}>{name}</p>
                  {uses.length > 0 && (
                    <p className="text-[10px] text-primary mt-0.5 truncate" title={uses.join(', ')}>
                      In use · {uses.length} place{uses.length === 1 ? '' : 's'}
                    </p>
                  )}
                  <button onClick={() => copy(url)}
                    className="mt-2 w-full text-[11px] bg-gray-100 text-gray-600 py-1.5 rounded-lg hover:bg-gray-200">
                    {copied === url ? '✓ Copied' : 'Copy path'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3 className="font-bold text-amber-800 mb-2 text-sm">Tips</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Keep photos under 6 MB — large files slow the website down for guests.</li>
          <li>• Landscape photos (wider than tall) look best in banners and galleries.</li>
          <li>• Uploading a file with the same name replaces the old one everywhere it is used.</li>
        </ul>
      </div>
    </div>
  )
}
