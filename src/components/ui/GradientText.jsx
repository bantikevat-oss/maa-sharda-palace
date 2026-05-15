import { cn } from '../../lib/utils'

export default function GradientText({ children, className, from = '#C9A84C', to = '#f0d080' }) {
  return (
    <span
      className={cn('bg-clip-text text-transparent', className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to}, ${from})` }}
    >
      {children}
    </span>
  )
}
