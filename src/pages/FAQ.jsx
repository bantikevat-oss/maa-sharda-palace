import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSite } from '../hooks/useSite'
import { useSEO } from '../hooks/useSEO'
import { fadeUp, staggerContainer } from '../animations'
import GradientText from '../components/ui/GradientText'

export default function FAQ() {
  const { v, list, wa } = useSite()
  const [open, setOpen] = useState(null)

  useSEO({
    title: v('seo_faq_title'),
    description: v('seo_faq_desc'),
    ogImage: v('faq_hero_img'),
  })

  const faqs = list('faq_items')
  const phone = v('phone')

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <main className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Banner */}
      <section className="relative h-64 bg-primary overflow-hidden">
        {v('faq_hero_img') && (
          <img src={v('faq_hero_img')} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        )}
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-3">
            <GradientText>{v('faq_hero_title')}</GradientText>
          </motion.h1>
          <nav className="text-sm text-white/60">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">FAQ</span>
          </nav>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="space-y-4">
            {faqs.map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
                <button
                  className="w-full flex justify-between items-center p-6 text-left font-semibold text-primary hover:text-accent transition"
                  onClick={() => setOpen(open === i ? null : i)}>
                  <span className="pr-4">{item.q}</span>
                  <span className={`text-accent text-2xl font-light shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}>
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {!faqs.length && (
            <div className="text-center py-16 text-gray-400">No FAQs available yet.</div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary font-display mb-3">{v('faq_cta_title')}</h2>
          <p className="text-gray-600 mb-6">{v('faq_cta_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${phone}`} className="btn-primary">📞 Call: {phone}</a>
            <a href={wa()} target="_blank" rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
