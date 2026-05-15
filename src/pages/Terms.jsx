import { useAdmin } from '../contexts/AdminContext'
import { useSEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'

export default function Terms() {
  const { config } = useAdmin()
  useSEO({ title: `Terms & Conditions | ${config.businessName}`, description: `Terms and conditions for ${config.businessName}.` })
  return (
    <main className="pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span>Terms & Conditions</span>
        </nav>
        <h1 className="text-4xl font-bold text-primary font-display mb-8">Terms & Conditions</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p>Last updated: January 2026</p>
          <h2 className="text-xl font-bold text-primary">Reservations & Bookings</h2>
          <p>Room reservations are subject to availability. A booking is confirmed only upon receiving confirmation from our team. We reserve the right to cancel unconfirmed bookings.</p>
          <h2 className="text-xl font-bold text-primary">Check-In & Check-Out</h2>
          <p>Standard check-in time is {config.checkIn} and check-out time is {config.checkOut}. Early check-in and late check-out are available subject to room availability and may incur additional charges.</p>
          <h2 className="text-xl font-bold text-primary">Cancellation Policy</h2>
          <p>Cancellations made 24 hours before the check-in date will receive a full refund. Late cancellations or no-shows may be charged for one night's stay.</p>
          <h2 className="text-xl font-bold text-primary">Guest Conduct</h2>
          <p>Guests are expected to conduct themselves in a manner that respects the comfort and privacy of other guests. The hotel reserves the right to request guests to vacate the premises in case of misconduct.</p>
          <h2 className="text-xl font-bold text-primary">Amenities Usage</h2>
          <p>Pool, gym, and other amenities are available for hotel guests only. Usage timings are as specified by the hotel and may change without notice.</p>
          <h2 className="text-xl font-bold text-primary">Liability</h2>
          <p>The hotel is not liable for any loss or damage to guests' personal belongings. We recommend using the in-room safe for valuables.</p>
          <h2 className="text-xl font-bold text-primary">Contact</h2>
          <p>For queries: {config.email} | {config.phone}</p>
        </div>
      </div>
    </main>
  )
}
