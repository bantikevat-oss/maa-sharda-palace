import { useState } from 'react'
import MediaPicker from './MediaPicker'
import { blankItem } from '../../../content/schema'

/* ── shared bits ─────────────────────────────────────────── */

const inputCls =
  'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition'

function Label({ field }) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">{field.label}</label>
      {field.hint && <p className="text-xs text-gray-400 mt-0.5 mb-1.5">{field.hint}</p>}
    </>
  )
}

/* ── individual widgets ──────────────────────────────────── */

function TextInput({ field, value, onChange }) {
  return (
    <div>
      <Label field={field} />
      <input type="text" value={value ?? ''} onChange={e => onChange(e.target.value)}
        className={`${inputCls} mt-1`} placeholder={field.placeholder} />
    </div>
  )
}

function NumberInput({ field, value, onChange }) {
  return (
    <div>
      <Label field={field} />
      <input type="number" value={value ?? ''} onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        className={`${inputCls} mt-1`} />
    </div>
  )
}

function TextareaInput({ field, value, onChange }) {
  const str = value ?? ''
  return (
    <div>
      <Label field={field} />
      <textarea rows={field.rows || 3} value={str} onChange={e => onChange(e.target.value)}
        className={`${inputCls} mt-1 leading-relaxed`} />
      <p className="text-[11px] text-gray-300 mt-1">{String(str).length} characters</p>
    </div>
  )
}

function ToggleInput({ field, value, onChange }) {
  const checked = value === undefined || value === null ? true : !!value
  return (
    <div className="flex items-start gap-3 py-1">
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={`mt-0.5 w-11 h-6 rounded-full shrink-0 transition-colors ${checked ? 'bg-primary' : 'bg-gray-300'}`}>
        <span className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
      </button>
      <div>
        <span className="text-sm font-medium text-gray-700">{field.label}</span>
        {field.hint && <p className="text-xs text-gray-400">{field.hint}</p>}
        <p className={`text-xs mt-0.5 font-medium ${checked ? 'text-primary' : 'text-gray-400'}`}>
          {checked ? 'Visible on the website' : 'Hidden from the website'}
        </p>
      </div>
    </div>
  )
}

function SelectInput({ field, value, onChange }) {
  return (
    <div>
      <Label field={field} />
      <select value={value ?? ''} onChange={e => onChange(e.target.value)} className={`${inputCls} mt-1`}>
        {(field.options || []).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

/** A plain list of strings, edited one per line. */
function TagsInput({ field, value, onChange }) {
  const arr = Array.isArray(value) ? value : []
  return (
    <div>
      <Label field={field} />
      <textarea
        rows={Math.min(Math.max(arr.length + 1, 3), 12)}
        value={arr.join('\n')}
        onChange={e => onChange(e.target.value.split('\n').map(s => s.trimEnd()).filter((s, i, a) => s !== '' || i < a.length - 1))}
        className={`${inputCls} mt-1 font-mono text-[13px] leading-relaxed`} />
      <p className="text-[11px] text-gray-300 mt-1">{arr.filter(Boolean).length} item(s) · one per line</p>
    </div>
  )
}

function ImageInput({ field, value, onChange }) {
  const [picking, setPicking] = useState(false)
  const [uploading, setUploading] = useState(false)
  const url = value || ''

  const uploadDirect = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (file.size > 6 * 1024 * 1024) { alert('Image must be under 6 MB.'); return }
    setUploading(true)
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
      if (data.url) onChange(data.url)
      else alert('Upload failed: ' + (data.error || 'unknown error'))
    } catch (err) {
      alert('Upload failed: ' + err.message)
    }
    setUploading(false)
  }

  return (
    <div>
      <Label field={field} />
      <div className="mt-1 flex gap-3 items-start">
        <div className="w-24 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
          {url
            ? <img src={url} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">🖼</div>}
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <input type="text" value={url} onChange={e => onChange(e.target.value)}
            placeholder="/images/example.jpg"
            className={`${inputCls} font-mono text-xs py-2`} />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setPicking(true)}
              className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:opacity-90">
              Choose from library
            </button>
            <label>
              <input type="file" accept="image/*" className="sr-only" onChange={uploadDirect} disabled={uploading} />
              <span className="inline-block text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-200">
                {uploading ? 'Uploading…' : 'Upload new'}
              </span>
            </label>
            {url && (
              <button type="button" onClick={() => onChange('')}
                className="text-xs text-gray-400 px-2 py-1.5 rounded-lg hover:text-red-500">
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <MediaPicker open={picking} currentUrl={url} onClose={() => setPicking(false)} onPick={onChange} />
    </div>
  )
}

/** Repeater — add / remove / reorder / duplicate rows. */
function ListInput({ field, value, onChange }) {
  const rows = Array.isArray(value) ? value : []
  const [openRow, setOpenRow] = useState(0)

  const setRow = (i, key, val) => {
    const next = rows.map((r, idx) => (idx === i ? { ...r, [key]: val } : r))
    onChange(next)
  }
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= rows.length) return
    const next = [...rows]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
    setOpenRow(j)
  }
  const remove = (i) => {
    const title = rows[i]?.[field.itemLabel] || `item ${i + 1}`
    if (!window.confirm(`Remove "${title}"? This cannot be undone once you save.`)) return
    onChange(rows.filter((_, idx) => idx !== i))
    setOpenRow(-1)
  }
  const duplicate = (i) => {
    const next = [...rows]
    next.splice(i + 1, 0, JSON.parse(JSON.stringify(rows[i])))
    onChange(next)
    setOpenRow(i + 1)
  }
  const add = () => {
    onChange([...rows, blankItem(field)])
    setOpenRow(rows.length)
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-gray-800">{field.label}</label>
          {field.hint && <p className="text-xs text-gray-400 mt-0.5">{field.hint}</p>}
        </div>
        <span className="text-xs text-gray-400 shrink-0">{rows.length} item{rows.length === 1 ? '' : 's'}</span>
      </div>

      <div className="space-y-2">
        {rows.map((row, i) => {
          const isOpen = openRow === i
          const title = row?.[field.itemLabel] || row?.name || row?.title || row?.label || `Item ${i + 1}`
          const thumb = row?.img || row?.image || row?.src || row?.main
          return (
            <div key={i} className={`rounded-xl border transition ${isOpen ? 'border-primary/40 bg-white shadow-sm' : 'border-gray-200 bg-gray-50'}`}>
              {/* Row header */}
              <div className="flex items-center gap-2 p-2.5">
                <button type="button" onClick={() => setOpenRow(isOpen ? -1 : i)}
                  className="flex items-center gap-2.5 flex-1 min-w-0 text-left">
                  <span className="w-6 h-6 rounded-md bg-gray-200 text-gray-500 text-[11px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  {thumb && <img src={thumb} alt="" className="w-8 h-8 rounded-md object-cover shrink-0" />}
                  <span className="text-sm font-medium text-gray-700 truncate">{String(title).slice(0, 70)}</span>
                  <span className={`ml-auto text-gray-300 text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <div className="flex items-center gap-0.5 shrink-0">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up"
                    className="w-7 h-7 rounded-md text-gray-400 hover:bg-gray-200 disabled:opacity-25 disabled:hover:bg-transparent">↑</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1} title="Move down"
                    className="w-7 h-7 rounded-md text-gray-400 hover:bg-gray-200 disabled:opacity-25 disabled:hover:bg-transparent">↓</button>
                  <button type="button" onClick={() => duplicate(i)} title="Duplicate"
                    className="w-7 h-7 rounded-md text-gray-400 hover:bg-gray-200">⧉</button>
                  <button type="button" onClick={() => remove(i)} title="Delete"
                    className="w-7 h-7 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-500">🗑</button>
                </div>
              </div>

              {/* Row body */}
              {isOpen && (
                <div className="px-3.5 pb-4 pt-1 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    {(field.item || []).map(sub => (
                      <div key={sub.k} className={`min-w-0 ${sub.full || sub.type === 'textarea' || sub.type === 'tags' || sub.type === 'list' ? 'md:col-span-2' : ''}`}>
                        <FieldInput field={sub} value={row?.[sub.k]} onChange={val => setRow(i, sub.k, val)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button type="button" onClick={add}
        className="mt-3 w-full border-2 border-dashed border-gray-200 text-gray-500 rounded-xl py-2.5 text-sm font-medium hover:border-primary/40 hover:text-primary transition">
        + {field.addLabel || 'Add item'}
      </button>
    </div>
  )
}

/* ── dispatcher ──────────────────────────────────────────── */

export function FieldInput({ field, value, onChange }) {
  switch (field.type) {
    case 'textarea': return <TextareaInput field={field} value={value} onChange={onChange} />
    case 'number': return <NumberInput field={field} value={value} onChange={onChange} />
    case 'toggle': return <ToggleInput field={field} value={value} onChange={onChange} />
    case 'select': return <SelectInput field={field} value={value} onChange={onChange} />
    case 'image': return <ImageInput field={field} value={value} onChange={onChange} />
    case 'tags': return <TagsInput field={field} value={value} onChange={onChange} />
    case 'list': return <ListInput field={field} value={value} onChange={onChange} />
    default: return <TextInput field={field} value={value} onChange={onChange} />
  }
}

export default FieldInput
