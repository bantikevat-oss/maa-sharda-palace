import { useState } from 'react'
import { useAdmin, SITE_DEFAULTS } from '../../contexts/AdminContext'
import PasswordField from '../../components/ui/PasswordField'

export default function AdminSettings() {
  const { config, updateConfig } = useAdmin()

  // Username change state
  const [newUsername, setNewUsername] = useState('')
  const [unSaved, setUnSaved] = useState(false)
  const [unError, setUnError] = useState('')

  // Password change state
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  const changeUsername = async (e) => {
    e.preventDefault()
    setUnError('')
    if (!newUsername.trim() || newUsername.length < 3) {
      setUnError('Username must be at least 3 characters.')
      return
    }
    await updateConfig({ adminUsername: newUsername.trim() })
    setUnSaved(true)
    setNewUsername('')
    setTimeout(() => setUnSaved(false), 3000)
  }

  const changePassword = async (e) => {
    e.preventDefault()
    setPwError('')
    if (oldPassword !== (config.adminPassword || SITE_DEFAULTS.adminPassword)) {
      setPwError('Current password is incorrect.')
      return
    }
    if (newPassword.length < 6) {
      setPwError('New password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPwError('New passwords do not match.')
      return
    }
    await updateConfig({ adminPassword: newPassword })
    setPwSaved(true)
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPwSaved(false), 3000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2 font-display">Settings</h1>
      <p className="text-gray-500 text-sm mb-8">Manage admin credentials and advanced settings</p>

      {/* Change Username */}
      <div className="bg-white rounded-2xl p-6 shadow-sm max-w-md mb-5">
        <h2 className="font-bold text-gray-800 mb-1 pb-3 border-b">Change Admin Username</h2>
        <p className="text-xs text-gray-400 mb-4 mt-2">Current username: <span className="font-semibold text-gray-600">{config.adminUsername || SITE_DEFAULTS.adminUsername}</span></p>
        <form onSubmit={changeUsername} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Username</label>
            <input type="text" value={newUsername} onChange={e => { setNewUsername(e.target.value); setUnError('') }}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter new username" autoComplete="off" />
          </div>
          {unError && <p className="text-red-500 text-sm">{unError}</p>}
          {unSaved && <p className="text-green-600 text-sm font-medium">✅ Username updated successfully!</p>}
          <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition text-sm">
            Update Username
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl p-6 shadow-sm max-w-md">
        <h2 className="font-bold text-gray-800 mb-4 pb-3 border-b">Change Admin Password</h2>
        <form onSubmit={changePassword} className="space-y-4">
          <PasswordField label="Current Password" value={oldPassword} autoComplete="current-password"
            onChange={e => { setOldPassword(e.target.value); setPwError('') }} />
          <PasswordField label="New Password" value={newPassword} autoComplete="new-password"
            onChange={e => { setNewPassword(e.target.value); setPwError('') }} />
          <PasswordField label="Confirm New Password" value={confirmPassword} autoComplete="new-password"
            onChange={e => { setConfirmPassword(e.target.value); setPwError('') }} />
          {pwError && <p className="text-red-500 text-sm">{pwError}</p>}
          {pwSaved && <p className="text-green-600 text-sm font-medium">✅ Password changed successfully!</p>}
          <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition text-sm">
            Update Password
          </button>
        </form>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 max-w-md">
        <h3 className="font-bold text-amber-800 mb-2">⚠️ Important</h3>
        <p className="text-sm text-amber-700">Keep your admin credentials secure. Default login: username <code className="bg-amber-100 px-1 rounded">admin</code> / password <code className="bg-amber-100 px-1 rounded">msp@admin2024</code> — please change both after first login.</p>
      </div>
    </div>
  )
}
