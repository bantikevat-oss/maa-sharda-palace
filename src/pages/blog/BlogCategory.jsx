import { useParams, Link } from 'react-router-dom'
import { useSite } from '../../hooks/useSite'
import { useSEO } from '../../hooks/useSEO'
import { useBlogList } from '../../hooks/useBlog'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations'

export default function BlogCategory() {
  const { cat } = useParams()
  const { v } = useSite()
  const { posts, loading } = useBlogList()

  const filtered = posts.filter(p => p.category?.toLowerCase() === cat?.toLowerCase())

  useSEO({
    title: `${cat} Articles | ${v('businessName')} Blog`,
    description: `Read our ${cat} blog posts — travel tips, hotel guides, and more from ${v('businessName')}.`,
    ogImage: v('blog_hero_img'),
  })

  return (
    <main className="pt-20">
      <section className="relative h-48 bg-primary overflow-hidden">
        <img src={v('blog_hero_img')} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl font-bold font-display capitalize">{cat}</h1>
          <nav className="text-sm text-white/60 mt-2">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-accent">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white capitalize">{cat}</span>
          </nav>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {loading && <div className="text-center py-24 text-gray-400">Loading...</div>}
          {!loading && !filtered.length && (
            <div className="text-center py-24 text-gray-400">
              No posts in this category yet.
              <div className="mt-4"><Link to="/blog" className="text-accent hover:underline">← Back to Blog</Link></div>
            </div>
          )}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map(p => (
              <motion.div key={p.slug} variants={fadeUp}>
                <Link to={`/blog/${p.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  {p.featuredImage ? (
                    <img src={p.featuredImage} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl">🏨</div>
                  )}
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase text-accent tracking-wide">{p.category}</span>
                    <h3 className="font-bold text-primary mt-2 mb-2 group-hover:text-accent transition-colors line-clamp-2 font-display">{p.title}</h3>
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
        </div>
      </section>
    </main>
  )
}
