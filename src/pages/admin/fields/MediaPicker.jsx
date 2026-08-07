import { useState, useEffect, useCallback } from 'react'

/**
 * Shared media library.
 * Lists everything already in /images, lets the client upload new files,
 * and returns the chosen URL. Used by every image field in the admin.
 */
export default function MediaPicker({ open, onClose, onPick, currentUrl }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/list-images.php', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : { images: [] }))
      .then(d => setImages(Array.isArray(d.images) ? d.images : []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { if (open) load() }, [open, load])

  const upload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setError('')
    setUploading(true)
    for (const file of files) {
      if (!file.type.startsWith('image/')) { setError('Only image files are allowed.'); continue }
      if (file.size > 6 * 1024 * 1024) { setError(`${file.name} is larger than 6 MB.`); continue }
      try {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = ev => resolve(String(ev.target.result).split(',')[1])
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const res = await fetch('/api/upload-image.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: safeName, base64 }),
        })
        const data = await res.json()
        if (!data.url) throw new Error(data.error || 'Upload failed')
      } catch (err) {
        setError(err.message)
      }
    }
    setUploading(false)
    e.target.value = ''
    load()
  }

  if (!open) return null

  const filtered = query
    ? images.filter(i => i.toLowerCase().includes(query.toLowerCase()))
    : images

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-4 sm:p-5 border-b flex flex-wrap items-center gap-3">
          <div className="mr-auto">
            <h3 className="font-bold text-gray-900">Media Library</h3>
            <p className="text-xs text-gray-400">{images.length} image{images.length === 1 ? '' : 's'} available</p>
          </div>
          <input
            type="search" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search images…"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-52 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <label className="shrink-0">
            <input type="file" accept="image/*" multiple className="sr-only" onChange={upload} disabled={uploading} />
            <span className="inline-block bg-primary text-white text-sm px-4 py-2 rounded-lg cursor-pointer hover:opacity-90 whitespace-nowrap">
              {uploading ? 'Uploading…' : '⬆ Upload'}
            </span>
          </label>
          <button onClick={onClose} aria-label="Close"
            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 text-lg shrink-0">×</button>
        </div>

        {error && <p className="px-5 py-2 bg-red-50 text-red-600 text-sm">{error}</p>}

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {loading ? (
            <p className="text-center text-gray-400 py-16 text-sm">Loading images…</p>
          ) : !filtered.length ? (
            <p className="text-center text-gray-400 py-16 text-sm">
              {images.length ? 'No image matches your search.' : 'No images yet — upload one to get started.'}
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {filtered.map(name => {
                const url = `/images/${name}`
                const active = currentUrl === url
                return (
                  <button key={name} type="button"
                    onClick={() => { onPick(url); onClose() }}
                    className={`group text-left rounded-xl overflow-hidden border-2 transition ${active ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'}`}>
                    <div className="aspect-square bg-gray-100">
                      <img src={url} alt={name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] text-gray-500 px-1.5 py-1 truncate" title={name}>{name}</p>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="p-3 border-t bg-gray-50 text-center">
          <p className="text-[11px] text-gray-400">Click any image to use it. Uploads are saved to /images on the server.</p>
        </div>
      </div>
    </div>
  )
}
