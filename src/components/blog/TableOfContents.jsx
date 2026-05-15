import { useMemo } from 'react'
export default function TableOfContents({ content = '' }) {
  const headings = useMemo(() => {
    const matches = [...content.matchAll(/^#{2,3}\s+(.+)$/gm)]
    return matches.map(m => ({ text: m[1], level: m[0].startsWith('###') ? 3 : 2, id: m[1].toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]/g,'') }))
  }, [content])
  if (headings.length < 3) return null
  return (
    <nav className="bg-amber-50 border-l-4 border-accent rounded-r-xl p-4 my-6">
      <p className="font-bold text-gray-800 mb-2 text-sm">📋 In this article:</p>
      <ol className="space-y-1">
        {headings.map((h, i) => (
          <li key={i} className={`text-sm ${h.level === 3 ? 'pl-4' : ''}`}>
            <a href={`#${h.id}`} className="text-primary hover:text-accent hover:underline">{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
