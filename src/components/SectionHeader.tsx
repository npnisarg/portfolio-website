'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  tag:      string
  title:    string
  subtitle?: string
}

export default function SectionHeader({ tag, title, subtitle }: Props) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="mb-14">
      {/* Tag line with animated dash */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-4"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-[1px] w-8 bg-neon-purple/60 origin-left"
        />
        <span className="font-mono text-xs text-neon-purple tracking-[3px] uppercase">{tag}</span>
      </motion.div>

      {/* Title — word by word stagger */}
      <div className="overflow-hidden mb-5">
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display font-bold text-[#1C1410] leading-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Animated separator */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="section-sep origin-left"
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-5 text-[#3D2B1F] text-base max-w-xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
