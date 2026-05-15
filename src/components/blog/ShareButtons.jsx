export default function ShareButtons({ url, title }) {
  const encoded = encodeURIComponent(url)
  const text = encodeURIComponent(`${title} — ${url}`)
  const copyLink = () => navigator.clipboard.writeText(url).then(() => alert('Link copied!'))
  return (
    <div className="mt-8 flex flex-wrap gap-3 items-center border-t pt-6">
      <span className="text-sm font-semibold text-gray-600">Share:</span>
      <a href={`https://wa.me/?text=${text}`} target="_blank" rel="noopener" className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition">WhatsApp</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition">Facebook</a>
      <a href={`https://twitter.com/intent/tweet?text=${text}`} target="_blank" rel="noopener" className="bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-600 transition">Twitter</a>
      <button onClick={copyLink} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">Copy Link</button>
    </div>
  )
}
