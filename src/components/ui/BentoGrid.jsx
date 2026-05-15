import { cn } from '../../lib/utils'
import { motion } from 'framer-motion'

export function BentoGrid({ children, className }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}>
      {children}
    </div>
  )
}

export function BentoCard({ title, description, icon, image, className, colSpan = 1, rowSpan = 1 }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm',
        colSpan === 2 && 'md:col-span-2',
        colSpan === 3 && 'md:col-span-3',
        rowSpan === 2 && 'row-span-2',
        className
      )}
    >
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt={title} className="w-full h-full object-cover opacity-15" />
        </div>
      )}
      <div className="relative z-10">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
