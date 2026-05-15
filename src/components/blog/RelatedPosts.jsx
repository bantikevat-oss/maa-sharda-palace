import { Link } from 'react-router-dom'
export default function RelatedPosts({ posts }) {
  if (!posts.length) return null
  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-xl font-bold mb-6 text-primary">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(p => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="group block bg-white border rounded-2xl overflow-hidden hover:shadow-md transition">
            {p.featuredImage && <img src={p.featuredImage} alt={p.title} className="w-full h-40 object-cover" loading="lazy" />}
            <div className="p-4">
              <span className="text-xs text-accent font-semibold uppercase">{p.category}</span>
              <h3 className="font-bold text-primary mt-1 group-hover:text-accent transition line-clamp-2">{p.title}</h3>
              <p className="text-xs text-gray-500 mt-2">⏱ {p.readTimeMinutes} min read</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
