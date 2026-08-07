import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSite } from '../../hooks/useSite'
import { useSEO } from '../../hooks/useSEO'
import { useBlogList } from '../../hooks/useBlog'
import { fadeUp, staggerContainer } from '../../animations'
import GradientText from '../../components/ui/GradientText'

export default function BlogHome() {
  const { v } = useSite()
  const { posts, loading } = useBlogList()
  const [activeCategory, setActiveCategory] = useState('All')

  useSEO({
    title: `${v('blog_hero_title')} | ${v('businessName')}`,
    description: `${v('blog_hero_desc')} — ${v('businessName')}, Ujjain.`,
    ogImage: v('blog_hero_img'),
  })

  const categories = ['All', ...new Set(posts.map(p => p.category).filter(Boolean))]
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)
  const [featured, ...rest] = filtered

  return (
    <main className="pt-20">
      <section className="relative h-64 bg-primary overflow-hidden">
        <img src={v('blog_hero_img')} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-2">
            <GradientText>{v('blog_hero_title')}</GradientText>
          </motion.h1>
          <p className="text-white/60 text-sm">{v('blog_hero_desc')}</p>
          <nav className="text-sm text-white/60 mt-3">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </nav>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 1 && (
        <section className="bg-white border-b py-4 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 flex gap-2 flex-wrap justify-center">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${activeCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {loading && (
            <div className="text-center py-24 text-gray-400">Loading posts...</div>
          )}
          {!loading && !filtered.length && (
            <div className="text-center py-24 text-gray-400">{v('blog_empty_text')}</div>
          )}
          {!loading && featured && (
            <>
              {/* Featured */}
              <Link to={`/blog/${featured.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 mb-12 md:flex">
                {featured.featuredImage && (
                  <img src={featured.featuredImage} alt={featured.title}
                    className="md:w-1/2 h-72 md:h-auto object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                )}
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase text-accent tracking-wide">{featured.category} · Featured</span>
                  <h2 className="text-2xl font-bold text-primary font-display mt-3 mb-3 group-hover:text-accent transition-colors leading-snug">{featured.title}</h2>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{new Date(featured.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span>⏱ {featured.readTimeMinutes} min read</span>
                  </div>
                </div>
              </Link>

              {/* Grid */}
              {rest.length > 0 && (
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {rest.map(p => (
                    <motion.div key={p.slug} variants={fadeUp}>
                      <Link to={`/blog/${p.slug}`}
                        className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                        {p.featuredImage ? (
                          <img src={p.featuredImage} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl">🏨</div>
                        )}
                        <div className="p-5">
                          <span className="text-xs font-semibold uppercase text-accent tracking-wide">{p.category}</span>
                          <h3 className="font-bold text-primary mt-2 mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug font-display">{p.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-400">{new Date(p.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <span className="text-xs text-gray-400">⏱ {p.readTimeMinutes} min</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
