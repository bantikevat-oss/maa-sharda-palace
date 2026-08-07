import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'
import { CONTENT_MODEL, SITE_DEFAULTS } from '../../content/schema'

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const inputCls = 'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition'

/* Collect every SEO section declared in the content model. */
function seoGroups() {
  const out = []
  CONTENT_MODEL.forEach(page => {
    page.sections.forEach(sec => {
      if (!sec.id.includes('seo')) return
      out.push({ pageId: page.id, pageLabel: page.label, icon: page.icon, path: page.path, fields: sec.fields })
    })
  })
  return out
}

export default function AdminSEO() {
  const { config, updateConfig, saveState } = useAdmin()
  const groups = useMemo(seoGroups, [])
  const keys = useMemo(() => groups.flatMap(g => g.fields.map(f => f.k)), [groups])

  const build = useCallback(() => {
    const d = {}
    keys.forEach(k => { d[k] = config?.[k] === undefined ? SITE_DEFAULTS[k] : config[k] })
    d.verify_google = config?.verify_google || ''
    d.verify_bing = config?.verify_bing || ''
    d.verify_pinterest = config?.verify_pinterest || ''
    d.verify_facebook = config?.verify_facebook || ''
    return d
  }, [keys, config])

  const [draft, setDraft] = useState(build)
  useEffect(() => { setDraft(build()) }, [build])

  const metaKeys = ['verify_google', 'verify_bing', 'verify_pinterest', 'verify_facebook']
  const allKeys = [...keys, ...metaKeys]
  const dirtyKeys = allKeys.filter(k => {
    const saved = config?.[k] === undefined ? (SITE_DEFAULTS[k] ?? '') : config[k]
    return !eq(draft[k] ?? '', saved ?? '')
  })
  const dirty = dirtyKeys.length > 0

  const set = k => v => setDraft(d => ({ ...d, [k]: v }))

  const save = async () => {
    const patch = {}
    dirtyKeys.forEach(k => { patch[k] = draft[k] })
    await updateConfig(patch)
  }

  return (
    <div className="pb-28">
      <h1 className="text-2xl font-bold text-gray-900 mb-1.5 font-display">SEO & Verification</h1>
      <p className="text-gray-500 text-sm mb-7">
        Page titles and descriptions that appear in Google search results, plus site-verification files
        for Google Search Console, Bing and others.
      </p>

      <VerificationFiles />

      {/* Meta-tag verification */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-5">
        <h2 className="font-bold text-gray-800 mb-1">Verification Meta Tags</h2>
        <p className="text-xs text-gray-400 mb-5">
          Alternative to uploading a file — paste only the <code className="bg-gray-100 px-1 rounded">content</code> value
          from the tag the platform gives you. Leave blank if you used the file method above.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ['verify_google', 'Google Search Console', 'google-site-verification content value'],
            ['verify_bing', 'Bing Webmaster Tools', 'msvalidate.01 content value'],
            ['verify_pinterest', 'Pinterest', 'p:domain_verify content value'],
            ['verify_facebook', 'Facebook Domain Verification', 'facebook-domain-verification content value'],
          ].map(([k, label, ph]) => (
            <div key={k}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type="text" value={draft[k] || ''} onChange={e => set(k)(e.target.value)}
                placeholder={ph} className={`${inputCls} font-mono text-xs`} />
            </div>
          ))}
        </div>
      </div>

      {/* Per-page SEO */}
      <h2 className="font-bold text-gray-800 mt-8 mb-3">Page Titles & Descriptions</h2>
      <div className="space-y-4">
        {groups.map(g => (
          <div key={g.pageId} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b">
              <span>{g.icon}</span>
              <h3 className="font-bold text-gray-800">{g.pageLabel}</h3>
              <code className="text-[11px] text-gray-400">{g.path}</code>
              <Link to={`/admin/pages/${g.pageId}`} className="ml-auto text-xs text-primary hover:underline">Edit page content →</Link>
            </div>
            <div className="space-y-4">
              {g.fields.map(f => {
                const val = draft[f.k] ?? ''
                const max = f.type === 'textarea' ? 160 : 70
                const over = String(val).length > max
                return (
                  <div key={f.k}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    {f.type === 'textarea'
                      ? <textarea rows={2} value={val} onChange={e => set(f.k)(e.target.value)} className={inputCls} />
                      : <input type="text" value={val} onChange={e => set(f.k)(e.target.value)} className={inputCls} />}
                    <p className={`text-xs mt-1 ${over ? 'text-amber-600' : 'text-gray-400'}`}>
                      {String(val).length}/{max} characters{over ? ' — Google may trim this' : ''}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky save */}
      <div className="fixed bottom-0 inset-x-0 md:left-64 z-30 bg-white/95 backdrop-blur border-t border-gray-200 px-4 md:px-8 py-3 flex items-center gap-3">
        <p className="text-sm text-gray-500 flex-1 truncate">
          {saveState === 'saving' ? 'Saving…'
            : saveState === 'saved' ? '✅ Saved'
            : saveState === 'error' ? '⚠️ Save failed'
            : dirty ? `${dirtyKeys.length} unsaved change${dirtyKeys.length === 1 ? '' : 's'}` : 'All changes saved'}
        </p>
        <button onClick={save} disabled={!dirty || saveState === 'saving'}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition ${!dirty ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:opacity-90'}`}>
          {saveState === 'saving' ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

/* ── Verification file manager ───────────────────────────── */

function VerificationFiles() {
  const [files, setFiles] = useState([])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)
  const [manualName, setManualName] = useState('')
  const [manualBody, setManualBody] = useState('')

  const load = useCallback(() => {
    fetch('/api/verify-file.php', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : { files: [] }))
      .then(d => setFiles(Array.isArray(d.files) ? d.files : []))
      .catch(() => setFiles([]))
  }, [])

  useEffect(load, [load])

  const send = async (payload) => {
    setBusy(true); setMsg(null)
    try {
      const res = await fetch('/api/verify-file.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Request failed')
      setFiles(Array.isArray(data.files) ? data.files : [])
      setMsg({ ok: true, text: payload.delete ? 'File removed.' : `Uploaded — live at ${data.url}` })
    } catch (e) {
      setMsg({ ok: false, text: e.message })
    }
    setBusy(false)
  }

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    // Browsers append " (1)" to duplicate downloads — strip it so the name still matches.
    const filename = file.name.replace(/\s*\(\d+\)(?=\.[a-z0-9]+$)/i, '')
    const content = await file.text()
    await send({ filename, content })
  }

  const addManual = async () => {
    const name = manualName.trim()
    if (!name) { setMsg({ ok: false, text: 'Enter the filename Google gave you.' }); return }
    const body = manualBody.trim() || `google-site-verification: ${name}`
    await send({ filename: name, content: body })
    setManualName(''); setManualBody('')
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="font-bold text-gray-800 mb-1">Site Verification Files</h2>
      <p className="text-xs text-gray-400 mb-5">
        Google Search Console gives you a small file like <code className="bg-gray-100 px-1 rounded">google871b0a7dee5b2128.html</code>.
        Upload it here and it goes straight to the website root — no FTP needed. Bing
        (<code className="bg-gray-100 px-1 rounded">BingSiteAuth.xml</code>) and Yandex files work the same way.
      </p>

      <label className="block border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-primary/40 transition">
        <input type="file" accept=".html,.txt,.xml" className="sr-only" onChange={onFile} disabled={busy} />
        <div className="text-3xl mb-2">📄</div>
        <p className="text-sm font-semibold text-gray-700">{busy ? 'Uploading…' : 'Choose the verification file'}</p>
        <p className="text-xs text-gray-400 mt-1">.html, .txt or .xml — downloaded from Search Console</p>
      </label>

      {msg && (
        <p className={`mt-3 text-sm ${msg.ok ? 'text-primary' : 'text-red-600'}`}>{msg.text}</p>
      )}

      {/* Manual entry — for when the client only has the filename */}
      <details className="mt-4">
        <summary className="text-xs text-gray-500 cursor-pointer hover:text-primary">
          Don't have the file? Enter the name instead
        </summary>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <input type="text" value={manualName} onChange={e => setManualName(e.target.value)}
            placeholder="google871b0a7dee5b2128.html" className={`${inputCls} font-mono text-xs`} />
          <input type="text" value={manualBody} onChange={e => setManualBody(e.target.value)}
            placeholder="Leave blank — filled in automatically" className={`${inputCls} font-mono text-xs`} />
          <button onClick={addManual} disabled={busy}
            className="md:col-span-2 bg-gray-100 text-gray-700 text-sm py-2.5 rounded-xl hover:bg-gray-200">
            Create verification file
          </button>
        </div>
      </details>

      {/* Existing files */}
      {files.length > 0 && (
        <div className="mt-5 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Live on the site</p>
          {files.map(f => (
            <div key={f.name} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-lg">✅</span>
              <div className="min-w-0 flex-1">
                <a href={`/${f.name}`} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-800 hover:text-primary truncate block">{f.name}</a>
                <p className="text-[11px] text-gray-400 truncate">{f.size} bytes · added {f.modified}</p>
              </div>
              <button onClick={() => { if (window.confirm(`Remove ${f.name}? Search Console may lose verification.`)) send({ filename: f.name, delete: 1 }) }}
                disabled={busy}
                className="text-xs text-gray-400 hover:text-red-500 shrink-0">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
