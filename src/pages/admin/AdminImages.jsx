import { useState } from 'react'
import { useAdmin } from '../../contexts/AdminContext'

const IMAGE_SLOTS = [
  { key: 'img_hero_bg', label: 'Hero Background 1', hint: 'Main homepage hero image (landscape)' },
  { key: 'img_hero_bg_2', label: 'Hero Background 2', hint: 'Alternate hero image' },
  { key: 'img_logo', label: 'Hotel Logo', hint: 'PNG with transparent background preferred' },
  { key: 'img_lobby', label: 'Lobby Photo 1', hint: 'Main lobby or common area' },
  { key: 'img_lobby_2', label: 'Lobby Photo 2', hint: 'Second lobby/common area image' },
  { key: 'img_reception', label: 'Reception Desk', hint: 'Front desk / check-in area' },
  { key: 'img_pool', label: 'Pool Photo 1', hint: 'Indoor swimming pool' },
  { key: 'img_pool_2', label: 'Pool Photo 2', hint: 'Pool angle / detail' },
  { key: 'img_banquet_1', label: 'Banquet Hall 1', hint: 'Grand banquet hall' },
  { key: 'img_banquet_2', label: 'Banquet Hall 2', hint: 'Second banquet hall' },
  { key: 'img_room_deluxe', label: 'Deluxe Room', hint: 'Deluxe room photo' },
  { key: 'img_room_super_deluxe', label: 'Super Deluxe Room', hint: 'Super Deluxe room photo' },
  { key: 'img_room_executive', label: 'Executive Room', hint: 'Executive room photo' },
  { key: 'img_room_super_executive', label: 'Super Executive Room', hint: 'Super Executive room photo' },
]

function ImageUploader({ slot, currentUrl, onUpload }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { alert('Please select an image file.'); return }
    if (file.size > 5 * 1024 * 1024) { alert('File size must be under 5MB.'); return }

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        const base64 = ev.target.result.split(',')[1]
        const res = await fetch('/api/upload-image.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: slot.key + '.' + file.name.split('.').pop(), base64 }),
        })
        const data = await res.json()
        if (data.url) {
          setPreview(data.url)
          onUpload(slot.key, data.url)
        } else {
          alert('Upload failed: ' + (data.error || 'Unknown error'))
        }
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      alert('Upload failed: ' + err.message)
      setUploading(false)
    }
  }

  const displayUrl = preview || currentUrl

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <div className="relative bg-gray-100 h-40 overflow-hidden">
        {displayUrl ? (
          <img src={displayUrl + '?t=' + Date.now()} alt={slot.label}
            className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-sm font-medium">Uploading...</div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="font-semibold text-sm text-gray-800 mb-0.5">{slot.label}</div>
        {slot.hint && <p className="text-xs text-gray-400 mb-3">{slot.hint}</p>}
        <label className="block w-full">
          <input type="file" accept="image/*" className="sr-only" onChange={handleFile} disabled={uploading} />
          <span className="block text-center w-full bg-primary text-white text-sm py-2 rounded-lg cursor-pointer hover:opacity-90 transition">
            {uploading ? 'Uploading...' : 'Replace Image'}
          </span>
        </label>
      </div>
    </div>
  )
}

export default function AdminImages() {
  const { config, updateConfig } = useAdmin()
  const [saved, setSaved] = useState(false)
  const [updates, setUpdates] = useState({})

  const handleUpload = (key, url) => {
    setUpdates(u => ({ ...u, [key]: url }))
  }

  const saveAll = async () => {
    if (Object.keys(updates).length === 0) return
    await updateConfig(updates)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Images</h1>
          <p className="text-gray-500 text-sm">Upload and replace hotel photos</p>
        </div>
        <button onClick={saveAll}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition ${saved ? 'bg-green-500 text-white' : Object.keys(updates).length > 0 ? 'bg-primary text-white hover:opacity-90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
          {saved ? '✅ Saved!' : `Save ${Object.keys(updates).length > 0 ? `(${Object.keys(updates).length})` : ''}`}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {IMAGE_SLOTS.map(slot => (
          <ImageUploader key={slot.key} slot={slot}
            currentUrl={updates[slot.key] || config[slot.key]}
            onUpload={handleUpload} />
        ))}
      </div>

      {Object.keys(updates).length > 0 && (
        <div className="mt-6 text-right">
          <button onClick={saveAll}
            className={`px-8 py-3 rounded-xl font-semibold transition ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-90'}`}>
            {saved ? '✅ Saved!' : 'Save All Changes'}
          </button>
        </div>
      )}
    </div>
  )
}
