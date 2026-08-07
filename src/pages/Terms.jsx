import { Link } from 'react-router-dom'
import { useSite } from '../hooks/useSite'
import { useSEO } from '../hooks/useSEO'

export default function Terms() {
  const { v, list } = useSite()
  const businessName = v('businessName')

  useSEO({
    title: `${v('terms_title')} | ${businessName}`,
    description: `Terms and conditions for ${businessName}.`,
  })

  return (
    <main className="pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span>{v('terms_title')}</span>
        </nav>
        <h1 className="text-4xl font-bold text-primary font-display mb-8">{v('terms_title')}</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          {v('terms_updated') && <p>Last updated: {v('terms_updated')}</p>}
          <p>Standard check-in time is {v('checkIn')} and check-out time is {v('checkOut')}.</p>
          {list('terms_sections').map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-primary">{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          ))}
          <div>
            <h2 className="text-xl font-bold text-primary">Contact</h2>
            <p>{[v('email'), v('phone')].filter(Boolean).join(' | ')}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
