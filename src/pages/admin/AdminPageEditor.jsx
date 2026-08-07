import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'
import { CONTENT_MODEL, SITE_DEFAULTS } from '../../content/schema'
import { FieldInput } from './fields/Fields'

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b)

export default function AdminPageEditor() {
  const { pageId } = useParams()
  const { config, updateConfig, saveState } = useAdmin()
  const page = CONTENT_MODEL.find(p => p.id === pageId)

  const keys = useMemo(
    () => (page ? page.sections.flatMap(s => s.fields.map(f => f.k)) : []),
    [page]
  )

  const buildDraft = useCallback(() => {
    const d = {}
    keys.forEach(k => {
      const val = config?.[k]
      d[k] = val === undefined ? SITE_DEFAULTS[k] : val
    })
    return d
  }, [keys, config])

  const [draft, setDraft] = useState(buildDraft)
  const [open, setOpen] = useState(() => (page ? [page.sections[0]?.id] : []))
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  useEffect(() => { setDraft(buildDraft()); setError('') }, [buildDraft])

  if (!page) return <Navigate to="/admin/pages" replace />

  const dirtyKeys = keys.filter(k => !eq(draft[k], config?.[k] === undefined ? SITE_DEFAULTS[k] : config[k]))
  const dirty = dirtyKeys.length > 0

  const set = k => val => setDraft(d => ({ ...d, [k]: val }))

  const save = async () => {
    setError('')
    const patch = {}
    dirtyKeys.forEach(k => { patch[k] = draft[k] })
    const res = await updateConfig(patch)
    if (!res?.ok) setError(res?.error || 'Could not save. Check your connection and try again.')
  }

  const discard = () => setDraft(buildDraft())

  const resetSection = (section) => {
    if (!window.confirm(`Reset "${section.label}" back to the original content?`)) return
    setDraft(d => {
      const next = { ...d }
      section.fields.forEach(f => { next[f.k] = SITE_DEFAULTS[f.k] })
      return next
    })
  }

  const toggleSection = id => setOpen(o => (o.includes(id) ? o.filter(x => x !== id) : [...o, id]))

  const q = query.trim().toLowerCase()
  const matches = (section) => {
    if (!q) return true
    if (section.label.toLowerCase().includes(q)) return true
    return section.fields.some(f =>
      f.label.toLowerCase().includes(q) || f.k.toLowerCase().includes(q)
    )
  }
  const visibleSections = page.sections.filter(matches)

  return (
    <div className="pb-28">
      {/* ── Header ── */}
      <div className="mb-5">
        <Link to="/admin/pages" className="text-xs text-gray-400 hover:text-primary">← All pages</Link>
        <div className="flex flex-wrap items-center gap-3 mt-1.5">
          <h1 className="text-2xl font-bold text-gray-900 font-display flex items-center gap-2">
            <span>{page.icon}</span> {page.label}
          </h1>
          <a href={page.path} target="_blank" rel="noopener noreferrer"
            className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200">
            View live page ↗
          </a>
        </div>
        {page.desc && <p className="text-gray-500 text-sm mt-1.5 max-w-3xl">{page.desc}</p>}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap gap-2 mb-5">
        <input type="search" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Find a section or field…"
          className="flex-1 min-w-[180px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        <button onClick={() => setOpen(page.sections.map(s => s.id))}
          className="text-sm px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">Expand all</button>
        <button onClick={() => setOpen([])}
          className="text-sm px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">Collapse all</button>
      </div>

      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      {/* ── Sections ── */}
      <div className="space-y-3">
        {visibleSections.map(section => {
          const isOpen = open.includes(section.id) || !!q
          const sectionDirty = section.fields.some(f => dirtyKeys.includes(f.k))
          return (
            <div key={section.id}
              className={`bg-white rounded-2xl shadow-sm border transition ${sectionDirty ? 'border-amber-300' : 'border-transparent'}`}>
              <button onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-3 p-5 text-left">
                <span className={`text-gray-300 text-sm transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                <span className="font-bold text-gray-800">{section.label}</span>
                {sectionDirty && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">unsaved</span>}
                <span className="ml-auto text-xs text-gray-300">{section.fields.length} field{section.fields.length === 1 ? '' : 's'}</span>
              </button>

              {isOpen && (
                <div className="px-5 pb-6">
                  {section.hint && <p className="text-xs text-gray-400 -mt-1 mb-5">{section.hint}</p>}
                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                    {section.fields.map(field => (
                      <div key={field.k}
                        className={`min-w-0 ${field.full || ['textarea', 'list', 'tags'].includes(field.type) ? 'md:col-span-2' : ''}`}>
                        <FieldInput field={field} value={draft[field.k]} onChange={set(field.k)} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-50 text-right">
                    <button onClick={() => resetSection(section)}
                      className="text-xs text-gray-400 hover:text-red-500">Reset this section to original content</button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {!visibleSections.length && (
          <p className="text-center text-gray-400 py-16 text-sm">Nothing matches “{query}”.</p>
        )}
      </div>

      {/* ── Sticky save bar ── */}
      <div className="fixed bottom-0 inset-x-0 md:left-64 z-30 bg-white/95 backdrop-blur border-t border-gray-200 px-4 md:px-8 py-3">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500 flex-1 min-w-0 truncate">
            {saveState === 'saving' ? 'Saving…'
              : saveState === 'saved' ? '✅ Saved — changes are live on the website'
              : saveState === 'error' ? '⚠️ Save failed'
              : dirty ? `${dirtyKeys.length} unsaved change${dirtyKeys.length === 1 ? '' : 's'}`
              : 'All changes saved'}
          </p>
          {dirty && (
            <button onClick={discard}
              className="text-sm px-4 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100">Discard</button>
          )}
          <button onClick={save} disabled={!dirty || saveState === 'saving'}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition ${
              !dirty ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : saveState === 'saving' ? 'bg-primary/60 text-white'
              : 'bg-primary text-white hover:opacity-90'}`}>
            {saveState === 'saving' ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
