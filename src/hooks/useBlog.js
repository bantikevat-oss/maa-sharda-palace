import { useState, useEffect } from 'react'

const cache = {}

export function useBlogList() {
  const [data, setData] = useState(cache.index || null)
  const [loading, setLoading] = useState(!cache.index)
  const [error, setError] = useState(null)
  const [tick, setTick] = useState(0)

  const refresh = () => {
    delete cache.index
    setLoading(true)
    setTick(t => t + 1)
  }

  useEffect(() => {
    if (cache.index && tick === 0) return
    setLoading(true)
    fetch('/api/posts/index.json?t=' + Date.now())
      .then(r => r.json())
      .then(d => { cache.index = d; setData(d); setLoading(false) })
      .catch(e => { setError(e); setLoading(false) })
  }, [tick])

  return {
    posts: data?.posts?.filter(p => p.published) || [],
    allPosts: data?.posts || [],
    categories: data?.categories || [],
    loading,
    error,
    refresh,
  }
}

export function useBlogPost(slug) {
  const [post, setPost] = useState(cache[slug] || null)
  const [loading, setLoading] = useState(!cache[slug])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug || cache[slug]) return
    fetch(`/api/posts/${slug}.json`)
      .then(r => { if (!r.ok) throw new Error('Post not found'); return r.json() })
      .then(d => { cache[slug] = d; setPost(d); setLoading(false) })
      .catch(e => { setError(e); setLoading(false) })
  }, [slug])

  return { post, loading, error }
}

export function calcReadTime(content = '') {
  const words = content.replace(/[#*`\[\]()]/g, '').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
