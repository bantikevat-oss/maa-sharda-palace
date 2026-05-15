import { useState, useEffect } from 'react'
import { useAdmin, SITE_DEFAULTS } from '../../contexts/AdminContext'

const FIXED_ROOMS = [
  {
    label: 'Deluxe Room',
    nameKey: 'room_deluxe_name',    nameDefault: 'Deluxe Room',
    priceKey: 'room_deluxe_price',  priceDefault: '₹3,000',
    descKey:  'room_deluxe_desc',   descDefault: '',
    mealKey:  'room_deluxe_meal',   mealDefault: 'Breakfast Available (Chargeable)',
  },
  {
    label: 'Super Deluxe Room',
    nameKey: 'room_sdlx_name',    nameDefault: 'Super Deluxe Room',
    priceKey: 'room_sdlx_price',  priceDefault: '₹4,000',
    descKey:  'room_sdlx_desc',   descDefault: '',
    mealKey:  'room_sdlx_meal',   mealDefault: 'Breakfast Available (Chargeable)',
  },
  {
    label: 'Executive Room',
    nameKey: 'room_exec_name',    nameDefault: 'Executive Room',
    priceKey: 'room_exec_price',  priceDefault: '₹5,000',
    descKey:  'room_exec_desc',   descDefault: '',
    mealKey:  'room_exec_meal',   mealDefault: 'Complimentary Breakfast Included',
  },
  {
    label: 'Super Executive Room',
    nameKey: 'room_sexec_name',    nameDefault: 'Super Executive Room',
    priceKey: 'room_sexec_price',  priceDefault: '₹6,000',
    descKey:  'room_sexec_desc',   descDefault: '',
    mealKey:  'room_sexec_meal',   mealDefault: 'Complimentary Breakfast & Evening Snacks',
  },
]

const BLANK_EXTRA = { name: '', price: '', desc: '', meal: '', slug: '' }

function slugify(name) {
  return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function AdminRooms() {
  const { config, updateConfig } = useAdmin()
  const [draft, setDraft] = useState({})
  const [extraRooms, setExtraRooms] = useState([])
  const [newRoom, setNewRoom] = useState(BLANK_EXTRA)
  const [saved, setSaved] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    const d = {}
    FIXED_ROOMS.forEach(r => {
      d[r.nameKey]  = config[r.nameKey]  || r.nameDefault
      d[r.priceKey] = config[r.priceKey] || r.priceDefault
      d[r.descKey]  = config[r.descKey]  || r.descDefault
      d[r.mealKey]  = config[r.mealKey]  || SITE_DEFAULTS[r.mealKey] || r.mealDefault
    })
    setDraft(d)
    setExtraRooms(config.extra_rooms || SITE_DEFAULTS.extra_rooms || [])
  }, [config])

  const save = async () => {
    await updateConfig({ ...draft, extra_rooms: extraRooms })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const addExtra = () => {
    if (!newRoom.name.trim() || !newRoom.price.trim()) return
    const slug = slugify(newRoom.name)
    setExtraRooms(prev => [...prev, { ...newRoom, slug }])
    setNewRoom(BLANK_EXTRA)
    setShowAdd(false)
  }

  const deleteExtra = (idx) => {
    setExtraRooms(prev => prev.filter((_, i) => i !== idx))
  }

  const updateExtra = (idx, field, val) => {
    setExtraRooms(prev => prev.map((r, i) => i === idx ? { ...r, [field]: val } : r))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Rooms & Pricing</h1>
          <p className="text-gray-500 text-sm">Edit room names, prices, descriptions and meal plans</p>
        </div>
        <button onClick={save}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-90'}`}>
          {saved ? '✅ Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Fixed Rooms */}
      <div className="space-y-4">
        {FIXED_ROOMS.map(room => (
          <div key={room.nameKey} className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wide mb-4">{room.label}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Room Name</label>
                <input type="text" value={draft[room.nameKey] || ''}
                  onChange={e => setDraft(d => ({ ...d, [room.nameKey]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Price per Night</label>
                <input type="text" value={draft[room.priceKey] || ''}
                  onChange={e => setDraft(d => ({ ...d, [room.priceKey]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Meal Plan</label>
                <input type="text" value={draft[room.mealKey] || ''}
                  placeholder={room.mealDefault}
                  onChange={e => setDraft(d => ({ ...d, [room.mealKey]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Short Description</label>
                <textarea rows={2} value={draft[room.descKey] || ''}
                  onChange={e => setDraft(d => ({ ...d, [room.descKey]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Extra / Custom Rooms */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Additional Room Categories</h2>
            <p className="text-xs text-gray-400">Add custom room types beyond the 4 standard rooms</p>
          </div>
          <button onClick={() => setShowAdd(v => !v)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition">
            <span className="text-lg leading-none">+</span> Add Room
          </button>
        </div>

        {/* Add New Room Form */}
        {showAdd && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-4">
            <h3 className="text-sm font-bold text-gray-700 mb-4">New Room Details</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Room Name *</label>
                <input type="text" value={newRoom.name} placeholder="e.g. Honeymoon Suite"
                  onChange={e => setNewRoom(r => ({ ...r, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                {newRoom.name && (
                  <p className="text-xs text-gray-400 mt-1">URL slug: /rooms/{slugify(newRoom.name)}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Price per Night *</label>
                <input type="text" value={newRoom.price} placeholder="e.g. ₹7,500"
                  onChange={e => setNewRoom(r => ({ ...r, price: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Meal Plan</label>
                <input type="text" value={newRoom.meal} placeholder="e.g. Complimentary Breakfast Included"
                  onChange={e => setNewRoom(r => ({ ...r, meal: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <textarea rows={2} value={newRoom.desc} placeholder="Brief description of this room..."
                  onChange={e => setNewRoom(r => ({ ...r, desc: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={addExtra}
                disabled={!newRoom.name.trim() || !newRoom.price.trim()}
                className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-40">
                Add Room
              </button>
              <button onClick={() => { setShowAdd(false); setNewRoom(BLANK_EXTRA) }}
                className="border border-gray-200 text-gray-600 px-6 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Existing Extra Rooms */}
        {extraRooms.length > 0 ? (
          <div className="space-y-3">
            {extraRooms.map((room, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">Custom Room</span>
                    <p className="text-xs text-gray-400 mt-1">slug: /rooms/{room.slug}</p>
                  </div>
                  <button onClick={() => deleteExtra(idx)}
                    className="text-red-400 hover:text-red-600 transition p-1 rounded-lg hover:bg-red-50"
                    title="Delete this room">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Room Name</label>
                    <input type="text" value={room.name}
                      onChange={e => updateExtra(idx, 'name', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Price per Night</label>
                    <input type="text" value={room.price}
                      onChange={e => updateExtra(idx, 'price', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Meal Plan</label>
                    <input type="text" value={room.meal || ''}
                      onChange={e => updateExtra(idx, 'meal', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                    <textarea rows={2} value={room.desc || ''}
                      onChange={e => updateExtra(idx, 'desc', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !showAdd && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
              <p className="text-gray-400 text-sm">No additional room categories yet.</p>
              <p className="text-gray-400 text-xs mt-1">Click "Add Room" to create custom room types.</p>
            </div>
          )
        )}
      </div>

      <div className="mt-8 text-right">
        <button onClick={save}
          className={`px-8 py-3 rounded-xl font-semibold transition ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-90'}`}>
          {saved ? '✅ Saved!' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
