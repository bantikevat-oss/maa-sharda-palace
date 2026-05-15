import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBlogList } from '../../hooks/useBlog'

export default function AdminBlog() {
  const { posts, loading, refresh } = useBlogList()
  const [deleting, setDeleting] = useState(null)

  const deletePost = async (slug) => {
    if (!confirm('Delete this post permanently?')) return
    setDeleting(slug)
    try {
      await fetch('/api/delete-post.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      refresh()
    } catch (e) {
      alert('Delete failed: ' + e.message)
    }
    setDeleting(null)
  }

  const togglePublish = async (post) => {
    try {
      const updated = { ...post, published: !post.published }
      await fetch('/api/save-post.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      refresh()
    } catch (e) {
      alert('Failed to toggle: ' + e.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Blog Posts</h1>
          <p className="text-gray-500 text-sm">{posts.length} posts</p>
        </div>
        <Link to="/admin/blog/new" className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition">
          + New Post
        </Link>
      </div>

      {loading && <div className="text-center py-16 text-gray-400">Loading posts...</div>}

      {!loading && !posts.length && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="font-bold text-gray-700 mb-2">No blog posts yet</h3>
          <p className="text-gray-400 text-sm mb-4">Create your first post to attract Google traffic</p>
          <Link to="/admin/blog/new" className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold text-sm">
            Write First Post
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.slug} className="bg-white rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
            {post.featuredImage && (
              <img src={post.featuredImage} alt={post.title}
                className="w-full md:w-24 h-20 object-cover rounded-xl shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-xs text-gray-400">{post.category}</span>
              </div>
              <h3 className="font-semibold text-gray-800 line-clamp-1">{post.title}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                {' · '}{post.readTimeMinutes} min read
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => togglePublish(post)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${post.published ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                {post.published ? 'Unpublish' : 'Publish'}
              </button>
              <Link to={`/admin/blog/edit/${post.slug}`}
                className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20 transition">
                Edit
              </Link>
              <button onClick={() => deletePost(post.slug)} disabled={deleting === post.slug}
                className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition disabled:opacity-50">
                {deleting === post.slug ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
