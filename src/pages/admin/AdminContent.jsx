import { useState, useEffect } from 'react'
import { useAdmin, SITE_DEFAULTS } from '../../contexts/AdminContext'

function Field({ label, value, onChange, multiline = false, type = 'text', hint }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {multiline ? (
        <textarea rows={3} value={value} onChange={e => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      )}
    </div>
  )
}

export default function AdminContent() {
  const { config, updateConfig } = useAdmin()
  const makeDraft = (c) => ({
    businessName: c.businessName || SITE_DEFAULTS.businessName,
    phone: c.phone || SITE_DEFAULTS.phone,
    whatsapp: c.whatsapp || SITE_DEFAULTS.whatsapp,
    email: c.email || '',
    address: c.address || SITE_DEFAULTS.address,
    tagline: c.tagline || SITE_DEFAULTS.tagline,
    bookingUrl: c.bookingUrl || SITE_DEFAULTS.bookingUrl,
    instagram: c.instagram || '',
    facebook: c.facebook || '',
    gmb: c.gmb || '',
    checkIn: c.checkIn || SITE_DEFAULTS.checkIn,
    checkOut: c.checkOut || SITE_DEFAULTS.checkOut,
    totalRooms: c.totalRooms || SITE_DEFAULTS.totalRooms,
    establishedYear: c.establishedYear || SITE_DEFAULTS.establishedYear,
    hero_badge: c.hero_badge || SITE_DEFAULTS.hero_badge,
    hero_h1: c.hero_h1 || SITE_DEFAULTS.hero_h1,
    hero_tagline: c.hero_tagline || SITE_DEFAULTS.hero_tagline,
    hero_desc: c.hero_desc || SITE_DEFAULTS.hero_desc,
    stat_rooms: c.stat_rooms || SITE_DEFAULTS.stat_rooms,
    stat_guests: c.stat_guests || SITE_DEFAULTS.stat_guests,
    stat_experience: c.stat_experience || SITE_DEFAULTS.stat_experience,
    stat_banquets: c.stat_banquets || SITE_DEFAULTS.stat_banquets,
  })
  const [draft, setDraft] = useState(() => makeDraft(SITE_DEFAULTS))
  const [saved, setSaved] = useState(false)

  useEffect(() => { setDraft(makeDraft(config)) }, [config])

  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }))

  const save = async () => {
    await updateConfig(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Content</h1>
          <p className="text-gray-500 text-sm">Edit all text content — changes reflect on website instantly</p>
        </div>
        <button onClick={save}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-90'}`}>
          {saved ? '✅ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <Section title="Basic Information">
          <Field label="Hotel Name" value={draft.businessName} onChange={set('businessName')} />
          <Field label="Tagline" value={draft.tagline} onChange={set('tagline')} hint="Short one-liner below the hotel name" />
          <Field label="Phone" value={draft.phone} onChange={set('phone')} />
          <Field label="WhatsApp" value={draft.whatsapp} onChange={set('whatsapp')} />
          <Field label="Email" value={draft.email} onChange={set('email')} type="email" />
          <Field label="Address" value={draft.address} onChange={set('address')} multiline />
        </Section>

        {/* Hotel Details */}
        <Section title="Hotel Details">
          <Field label="Check-In Time" value={draft.checkIn} onChange={set('checkIn')} />
          <Field label="Check-Out Time" value={draft.checkOut} onChange={set('checkOut')} />
          <Field label="Total Rooms" value={draft.totalRooms} onChange={set('totalRooms')} />
          <Field label="Established Year" value={draft.establishedYear} onChange={set('establishedYear')} />
          <Field label="Book Now URL" value={draft.bookingUrl} onChange={set('bookingUrl')} hint="The URL for the Book Now button" />
        </Section>

        {/* Social */}
        <Section title="Social & Maps">
          <Field label="Instagram URL" value={draft.instagram} onChange={set('instagram')} />
          <Field label="Facebook URL" value={draft.facebook} onChange={set('facebook')} />
          <Field label="Google Maps / GMB URL" value={draft.gmb} onChange={set('gmb')} />
        </Section>

        {/* Hero */}
        <Section title="Homepage Hero Section">
          <Field label="Hero Badge Text" value={draft.hero_badge} onChange={set('hero_badge')} hint="Small pill shown above the title (e.g. 'Near Navgrah Shani Mandir · Ujjain')" />
          <Field label="Hero Headline" value={draft.hero_h1} onChange={set('hero_h1')} />
          <Field label="Hero Tagline" value={draft.hero_tagline} onChange={set('hero_tagline')} />
          <Field label="Hero Description" value={draft.hero_desc} onChange={set('hero_desc')} multiline />
        </Section>

        {/* Stats */}
        <Section title="Stats (Numbers shown on homepage)">
          <Field label="Rooms Count (e.g. 65)" value={draft.stat_rooms} onChange={set('stat_rooms')} />
          <Field label="Guests Served (e.g. 50000)" value={draft.stat_guests} onChange={set('stat_guests')} />
          <Field label="Years of Experience" value={draft.stat_experience} onChange={set('stat_experience')} />
          <Field label="Number of Banquet Halls" value={draft.stat_banquets} onChange={set('stat_banquets')} />
        </Section>
      </div>

      <div className="mt-8 text-right">
        <button onClick={save}
          className={`px-8 py-3 rounded-xl font-semibold transition ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-90'}`}>
          {saved ? '✅ Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-base font-bold text-gray-800 mb-5 pb-3 border-b">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}
