import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBlogList } from '../../hooks/useBlog'
import GradientText from '../ui/GradientText'
import { staggerContainer, fadeUp } from '../../animations'

export default function BlogPreview() {
  const { posts, loading } = useBlogList()
  const latest = posts.slice(0, 3)
  if (loading || !latest.length) return null

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Our Blog</p>
            <h2 className="text-4xl font-bold text-primary">
              Travel <GradientText>Insights</GradientText>
            </h2>
          </div>
          <Link to="/blog" className="text-primary font-semibold border-b-2 border-accent pb-0.5 hover:text-accent transition-colors text-sm">
            View All Posts →
          </Link>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map(p => (
            <motion.div key={p.slug} variants={fadeUp}>
              <Link to={`/blog/${p.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                {p.featuredImage ? (
                  <img src={p.featuredImage} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl">🏨</div>
                )}
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase text-accent tracking-wide">{p.category}</span>
                  <h3 className="font-bold text-primary mt-2 mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{new Date(p.publishedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                    <span className="text-xs text-gray-400">⏱ {p.readTimeMinutes} min read</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
