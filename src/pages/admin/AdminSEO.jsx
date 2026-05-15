import { useState, useEffect } from 'react'
import { useAdmin } from '../../contexts/AdminContext'

const SEO_PAGES = [
  { key: 'homepage', titleKey: 'metaTitle', descKey: 'metaDescription', kwKey: 'metaKeywords', label: 'Homepage' },
  { key: 'rooms', objKey: 'seo_rooms', label: 'Rooms Page' },
  { key: 'gallery', objKey: 'seo_gallery', label: 'Gallery Page' },
  { key: 'about', objKey: 'seo_about', label: 'About Page' },
  { key: 'contact', objKey: 'seo_contact', label: 'Contact Page' },
  { key: 'pool', objKey: 'seo_pool', label: 'Pool Page' },
  { key: 'gym', objKey: 'seo_gym', label: 'Gym Page' },
  { key: 'banquet', objKey: 'seo_banquet', label: 'Banquet Page' },
  { key: 'faq', objKey: 'seo_faq', label: 'FAQ Page' },
]

export default function AdminSEO() {
  const { config, updateConfig } = useAdmin()
  const [draft, setDraft] = useState({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const d = {
      metaTitle: config.metaTitle || '',
      metaDescription: config.metaDescription || '',
      metaKeywords: config.metaKeywords || '',
    }
    SEO_PAGES.forEach(p => {
      if (p.objKey) d[p.objKey] = { ...(config[p.objKey] || {}) }
    })
    setDraft(d)
  }, [config])

  const setObj = (objKey, field, val) => {
    setDraft(d => ({ ...d, [objKey]: { ...(d[objKey] || {}), [field]: val } }))
  }

  const save = async () => {
    await updateConfig(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">SEO Settings</h1>
          <p className="text-gray-500 text-sm">Edit page titles & descriptions for Google search</p>
        </div>
        <button onClick={save}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-90'}`}>
          {saved ? '✅ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Homepage (flat keys) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4 pb-3 border-b">Homepage</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Title <span className="text-xs text-gray-400">(shown in browser tab & Google)</span></label>
              <input type="text" value={draft.metaTitle || ''} onChange={e => setDraft(d => ({ ...d, metaTitle: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={70} />
              <p className="text-xs text-gray-400 mt-1">{(draft.metaTitle || '').length}/70 chars</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description <span className="text-xs text-gray-400">(shown in Google search snippets)</span></label>
              <textarea rows={3} value={draft.metaDescription || ''} onChange={e => setDraft(d => ({ ...d, metaDescription: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={160} />
              <p className="text-xs text-gray-400 mt-1">{(draft.metaDescription || '').length}/160 chars</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords <span className="text-xs text-gray-400">(comma-separated)</span></label>
              <input type="text" value={draft.metaKeywords || ''} onChange={e => setDraft(d => ({ ...d, metaKeywords: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        {/* Other pages (object keys) */}
        {SEO_PAGES.filter(p => p.objKey).map(page => (
          <div key={page.key} className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4 pb-3 border-b">{page.label}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input type="text" value={draft[page.objKey]?.title || ''} onChange={e => setObj(page.objKey, 'title', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={70} />
                <p className="text-xs text-gray-400 mt-1">{(draft[page.objKey]?.title || '').length}/70 chars</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea rows={2} value={draft[page.objKey]?.description || ''} onChange={e => setObj(page.objKey, 'description', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={160} />
                <p className="text-xs text-gray-400 mt-1">{(draft[page.objKey]?.description || '').length}/160 chars</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <button onClick={save}
          className={`px-8 py-3 rounded-xl font-semibold transition ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-90'}`}>
          {saved ? '✅ Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
