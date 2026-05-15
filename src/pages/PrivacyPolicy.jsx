import { useAdmin } from '../contexts/AdminContext'
import { useSEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  const { config } = useAdmin()
  useSEO({ title: `Privacy Policy | ${config.businessName}`, description: `Privacy policy for ${config.businessName}.` })
  return (
    <main className="pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span>Privacy Policy</span>
        </nav>
        <h1 className="text-4xl font-bold text-primary font-display mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p>Last updated: January 2026</p>
          <h2 className="text-xl font-bold text-primary">Information We Collect</h2>
          <p>When you contact us via phone, WhatsApp, or our website, we may collect your name, phone number, email address, and booking details to process your reservation and provide hospitality services.</p>
          <h2 className="text-xl font-bold text-primary">How We Use Your Information</h2>
          <p>We use your information solely to process bookings, confirm reservations, send relevant communications about your stay, and improve our services. We do not sell or share your data with third parties for marketing purposes.</p>
          <h2 className="text-xl font-bold text-primary">Data Security</h2>
          <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorized access, alteration, or disclosure.</p>
          <h2 className="text-xl font-bold text-primary">Cookies</h2>
          <p>Our website may use cookies to improve your browsing experience. You can choose to disable cookies in your browser settings.</p>
          <h2 className="text-xl font-bold text-primary">Contact Us</h2>
          <p>For any privacy-related queries, please contact us at: {config.email} or call {config.phone}.</p>
        </div>
      </div>
    </main>
  )
}
