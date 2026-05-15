import { useRef, useState } from 'react'
import { cn } from '../../lib/utils'

export default function SpotlightCard({ children, className }) {
  const divRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn('relative overflow-hidden rounded-2xl', className)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-2xl z-10"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(201,168,76,0.12), transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}
