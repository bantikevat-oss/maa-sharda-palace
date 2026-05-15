import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBlogPost, useBlogList } from '../../hooks/useBlog'

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function calcReadTime(content) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default function AdminBlogEditor() {
  const { slug } = useParams()
  const isNew = slug === 'new' || !slug
  const { post: existingPost } = useBlogPost(isNew ? null : slug)
  const { refresh } = useBlogList()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Travel Tips',
    tags: '',
    featuredImage: '',
    published: false,
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (existingPost) {
      setForm({
        title: existingPost.title || '',
        slug: existingPost.slug || '',
        excerpt: existingPost.excerpt || '',
        content: existingPost.content || '',
        category: existingPost.category || 'Travel Tips',
        tags: (existingPost.tags || []).join(', '),
        featuredImage: existingPost.featuredImage || '',
        published: existingPost.published ?? false,
      })
    }
  }, [existingPost])

  const set = (key) => (e) => {
    const val = e.target ? e.target.value : e
    setForm(f => {
      const updated = { ...f, [key]: val }
      if (key === 'title' && isNew) updated.slug = slugify(val)
      return updated
    })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || !file.type.startsWith('image/')) return
    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        const base64 = ev.target.result.split(',')[1]
        const res = await fetch('/api/upload-image.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: 'blog-' + Date.now() + '.' + file.name.split('.').pop(), base64 }),
        })
        const data = await res.json()
        if (data.url) setForm(f => ({ ...f, featuredImage: data.url }))
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (e) { setUploading(false) }
  }

  const save = async (publish = null) => {
    if (!form.title.trim()) { alert('Title is required.'); return }
    setSaving(true)
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      published: publish !== null ? publish : form.published,
      readTimeMinutes: calcReadTime(form.content),
      publishedAt: existingPost?.publishedAt || new Date().toISOString().split('T')[0],
    }
    try {
      const res = await fetch('/api/save-post.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        refresh()
        navigate('/admin/blog')
      } else {
        alert('Save failed: ' + (data.error || 'Unknown'))
      }
    } catch (e) {
      alert('Save failed: ' + e.message)
    }
    setSaving(false)
  }

  const CATEGORIES = ['Travel Tips', 'Ujjain Guide', 'Hotel News', 'Temple Guide', 'Food & Culture', 'Events']

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-display">{isNew ? 'New Post' : 'Edit Post'}</h1>
        <div className="flex gap-2">
          <button onClick={() => setPreview(p => !p)}
            className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition">
            {preview ? '✏️ Editor' : '👁️ Preview'}
          </button>
          <button onClick={() => save(false)} disabled={saving}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition disabled:opacity-50">
            Save Draft
          </button>
          <button onClick={() => save(true)} disabled={saving}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition disabled:opacity-50">
            {saving ? 'Saving...' : 'Publish →'}
          </button>
        </div>
      </div>

      {preview ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm prose max-w-none">
          <h1 className="text-3xl font-bold text-primary font-display">{form.title}</h1>
          <p className="text-gray-500 italic">{form.excerpt}</p>
          <hr />
          <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">{form.content}</pre>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input type="text" value={form.title} onChange={set('title')}
                  placeholder="e.g. Best Places to Visit Near Ujjain"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt / Summary</label>
                <textarea rows={2} value={form.excerpt} onChange={set('excerpt')}
                  placeholder="One-line summary shown in blog list and Google snippets"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content (Markdown supported)</label>
              <p className="text-xs text-gray-400 mb-2">Use ## for headings, **bold**, *italic*, - for bullet points</p>
              <textarea rows={20} value={form.content} onChange={set('content')}
                placeholder="Write your blog post here..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary" />
              <p className="text-xs text-gray-400 mt-1">{calcReadTime(form.content)} min read · {form.content.trim().split(/\s+/).filter(Boolean).length} words</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                <input type="text" value={form.slug} onChange={set('slug')}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary" />
                <p className="text-xs text-gray-400 mt-1">/blog/{form.slug || 'auto-generated'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={form.category} onChange={set('category')}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input type="text" value={form.tags} onChange={set('tags')}
                  placeholder="ujjain, hotel, travel"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              {form.featuredImage && (
                <img src={form.featuredImage} alt="" className="w-full h-36 object-cover rounded-xl mb-3" />
              )}
              <label className="block">
                <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                <span className="block text-center w-full bg-gray-100 text-gray-700 text-sm py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                  {uploading ? 'Uploading...' : form.featuredImage ? 'Replace Image' : 'Upload Image'}
                </span>
              </label>
              <div className="mt-2">
                <input type="text" value={form.featuredImage} onChange={set('featuredImage')}
                  placeholder="Or paste image URL"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-3">
              <input type="checkbox" id="published" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                className="w-4 h-4 accent-primary" />
              <label htmlFor="published" className="text-sm font-medium text-gray-700 cursor-pointer">Published (visible on website)</label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
