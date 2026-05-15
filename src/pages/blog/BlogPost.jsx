import { useParams, Link, Navigate } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'
import { useSEO } from '../../hooks/useSEO'
import { useBlogPost, useBlogList } from '../../hooks/useBlog'
import ShareButtons from '../../components/blog/ShareButtons'
import TableOfContents from '../../components/blog/TableOfContents'
import RelatedPosts from '../../components/blog/RelatedPosts'
import BlogBreadcrumb from '../../components/blog/BlogBreadcrumb'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations'

function renderMarkdown(content) {
  if (!content) return ''
  return content
    .replace(/^### (.+)$/gm, '<h3 id="$1" class="text-xl font-bold text-primary font-display mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, (_, t) => `<h2 id="${t.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}" class="text-2xl font-bold text-primary font-display mt-10 mb-4">${t}</h2>`)
    .replace(/^# (.+)$/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-accent underline hover:opacity-80">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc mb-1">$1</li>')
    .replace(/(<li.*<\/li>)/gs, '<ul class="my-4 space-y-1">$1</ul>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal mb-1">$2</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(?!<[h|u|o|l])/gm, '')
}

export default function BlogPost() {
  const { slug } = useParams()
  const { config } = useAdmin()
  const { post, loading } = useBlogPost(slug)
  const { posts } = useBlogList()

  useSEO({
    title: post ? `${post.title} | ${config.businessName}` : config.businessName,
    description: post?.excerpt || '',
    keywords: post?.tags?.join(', ') || '',
    image: post?.featuredImage || config.img_hero_bg,
  })

  if (loading) return (
    <main className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-gray-400">Loading article...</div>
    </main>
  )

  if (!post) return <Navigate to="/blog" replace />

  const related = posts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3)
  const url = typeof window !== 'undefined' ? window.location.href : `https://${config.businessName?.toLowerCase().replace(/\s+/g, '')}.com/blog/${slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: config.businessName },
    publisher: { '@type': 'Organization', name: config.businessName, logo: { '@type': 'ImageObject', url: config.img_logo } },
  }

  return (
    <main className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      {post.featuredImage && (
        <div className="w-full h-72 md:h-96 overflow-hidden">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <BlogBreadcrumb title={post.title} category={post.category} />

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-6">
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <Link to={`/blog/category/${post.category}`}
              className="text-xs font-semibold uppercase bg-accent/10 text-accent px-3 py-1 rounded-full tracking-wide">
              {post.category}
            </Link>
            <span className="text-sm text-gray-400">{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="text-sm text-gray-400">⏱ {post.readTimeMinutes} min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary font-display leading-tight mb-4">{post.title}</h1>
          {post.excerpt && <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-accent pl-4 italic mb-6">{post.excerpt}</p>}
        </motion.div>

        {/* Table of Contents */}
        <TableOfContents content={post.content} />

        {/* Content */}
        <article
          className="prose-hotel mt-6 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: `<p class="mb-4">${renderMarkdown(post.content)}</p>` }}
        />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">#{tag}</span>
            ))}
          </div>
        )}

        {/* Share */}
        <ShareButtons url={url} title={post.title} />

        {/* Related */}
        <RelatedPosts posts={related} />
      </div>
    </main>
  )
}
