import { Link } from 'react-router-dom'
import { CONTENT_MODEL } from '../../content/schema'

export default function AdminPages() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1.5 font-display">Website Content</h1>
      <p className="text-gray-500 text-sm mb-7">
        Pick a page to edit. Every heading, paragraph, photo and list on the website is editable here —
        nothing on this site is fixed.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONTENT_MODEL.map(page => {
          const fieldCount = page.sections.reduce((n, s) => n + s.fields.length, 0)
          return (
            <Link key={page.id} to={`/admin/pages/${page.id}`}
              className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-primary/25 transition flex flex-col">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-2xl leading-none">{page.icon}</span>
                <div className="min-w-0">
                  <div className="font-semibold text-gray-800 group-hover:text-primary transition">{page.label}</div>
                  <code className="text-[11px] text-gray-400">{page.path}</code>
                </div>
              </div>
              {page.desc && <p className="text-xs text-gray-500 leading-relaxed flex-1">{page.desc}</p>}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>{page.sections.length} sections · {fieldCount} fields</span>
                <span className="text-primary font-semibold opacity-0 group-hover:opacity-100 transition">Edit →</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3 className="font-bold text-amber-800 mb-2 text-sm">How this works</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Every section can be switched on or off — hide anything you do not need.</li>
          <li>• Lists (rooms, temples, reviews, photos…) can be reordered, duplicated and deleted.</li>
          <li>• Changes go live the moment you press Save — no rebuild, no developer.</li>
        </ul>
      </div>
    </div>
  )
}
