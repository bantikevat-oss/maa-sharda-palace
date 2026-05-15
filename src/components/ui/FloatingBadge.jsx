import { motion } from 'framer-motion'

export default function FloatingBadge({ text, subtext, icon = '⭐' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm text-white mb-6"
    >
      <span>{icon}</span>
      <span className="font-semibold">{text}</span>
      {subtext && <span className="text-white/60 text-xs border-l border-white/20 pl-2">{subtext}</span>}
    </motion.div>
  )
}
