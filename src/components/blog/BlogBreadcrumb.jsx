import { Link } from 'react-router-dom'
export default function BlogBreadcrumb({ title, category }) {
  return (
    <nav className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
      <Link to="/" className="hover:text-accent">Home</Link>
      <span>/</span>
      <Link to="/blog" className="hover:text-accent">Blog</Link>
      {category && <><span>/</span><Link to={`/blog/category/${category}`} className="hover:text-accent capitalize">{category}</Link></>}
      <span>/</span>
      <span className="text-gray-700 font-medium line-clamp-1">{title}</span>
    </nav>
  )
}
