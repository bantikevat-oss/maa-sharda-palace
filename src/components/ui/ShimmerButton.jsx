import { cn } from '../../lib/utils'

export default function ShimmerButton({ children, className, onClick, href, target, rel }) {
  const classes = cn(
    'relative inline-flex items-center justify-center px-8 py-3.5 font-semibold text-primary rounded-full overflow-hidden',
    'bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:scale-105',
    'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer',
    'before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent',
    className
  )
  if (href) return <a href={href} target={target} rel={rel} className={classes}>{children}</a>
  return <button onClick={onClick} className={classes}>{children}</button>
}
