import { useState, useEffect } from 'react'
import { useAdmin } from '../../contexts/AdminContext'

function Field({ label, hint, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
  )
}

export default function AdminGTM() {
  const { config, updateConfig } = useAdmin()
  const [draft, setDraft] = useState({ gtmId: '', ga4Id: '', fbPixelId: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setDraft({
      gtmId: config.gtmId || '',
      ga4Id: config.ga4Id || '',
      fbPixelId: config.fbPixelId || '',
    })
  }, [config.gtmId, config.ga4Id, config.fbPixelId])

  const set = key => val => setDraft(d => ({ ...d, [key]: val }))

  const save = async () => {
    await updateConfig(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">GTM / Analytics</h1>
          <p className="text-gray-500 text-sm">Connect tracking tools — leave blank to disable</p>
        </div>
        <button onClick={save}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-90'}`}>
          {saved ? '✅ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-4 max-w-xl">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-gray-800 border-b pb-3">Google Tag Manager</h2>
          <Field label="GTM Container ID" placeholder="GTM-XXXXXXX"
            hint="Injects GTM on all pages. Get from tagmanager.google.com"
            value={draft.gtmId} onChange={set('gtmId')} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-gray-800 border-b pb-3">Google Analytics 4</h2>
          <Field label="GA4 Measurement ID" placeholder="G-XXXXXXXXXX"
            hint="Get from analytics.google.com → Admin → Data Streams"
            value={draft.ga4Id} onChange={set('ga4Id')} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-gray-800 border-b pb-3">Meta / Facebook Pixel</h2>
          <Field label="Facebook Pixel ID" placeholder="1234567890123"
            hint="Get from Meta Business Suite → Events Manager → Pixels"
            value={draft.fbPixelId} onChange={set('fbPixelId')} />
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5 max-w-xl">
        <h3 className="font-bold text-blue-800 mb-2 text-sm">Note</h3>
        <p className="text-xs text-blue-700">You can use GTM alone and configure GA4 + FB Pixel inside GTM. Or enter them directly here for simpler setup without GTM.</p>
      </div>
    </div>
  )
}
