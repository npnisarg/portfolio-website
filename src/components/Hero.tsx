'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { PERSONAL } from '@/lib/data'

const ROLES = [
  'AI Engineer',
  'Data Scientist',
  'ML Engineer',
  'Analytics Builder',
]

export default function Hero() {
  const [roleIdx, setRoleIdx]     = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping]       = useState(true)
  const [charIdx, setCharIdx]     = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIdx]
    if (typing) {
      if (charIdx < current.length) {
        const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1) }, 65)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000); return () => clearTimeout(t)
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1) }, 35)
        return () => clearTimeout(t)
      } else { setRoleIdx(i => (i + 1) % ROLES.length); setTyping(true) }
    }
  }, [charIdx, typing, roleIdx])

  // Scroll parallax on hero content
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 600], [0, -120])
  const yTextSpring = useSpring(yText, { stiffness: 80, damping: 20 })
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0])

  const stagger = {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
    },
    item: {
      hidden:  { opacity: 0, y: 35, filter: 'blur(8px)' },
      show:    { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
    },
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* ── Orb blobs ── */}
      <motion.div
        className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ background: 'radial-gradient(circle, rgba(2,132,199,0.15) 0%, transparent 70%)' }}
      />

      {/* ── Content with scroll parallax ── */}
      <motion.div
        style={{ y: yTextSpring, opacity: opacityHero }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.div variants={stagger.container} initial="hidden" animate="show">

          {/* Name */}
          <motion.div variants={stagger.item}>
            <h1 className="font-display font-bold leading-[1.05] mb-4" style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)' }}>
              <span className="text-[#1C1410]">Hi, I&apos;m </span>
              <span className="gradient-text">Nisarg Patel</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={stagger.item} className="flex items-center justify-center gap-3 mb-6 h-10">
            <span className="font-mono text-xs text-neon-purple/50 tracking-widest">{'>'}</span>
            <span className="font-mono text-xl sm:text-2xl text-neon-purple" style={{ textShadow: '0 0 20px rgba(124,58,237,0.4)' }}>
              {displayed}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-[2px] h-6 bg-neon-purple ml-0.5 align-middle"
              />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={stagger.item}
            className="text-[#5C4A3A] text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {PERSONAL.bio}
          </motion.p>

          {/* Meta badges */}
          <motion.div variants={stagger.item} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {[
              { icon: '📍', text: PERSONAL.location },
              { icon: '🏢', text: PERSONAL.company },
              { icon: '🎓', text: 'University of Toronto' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-2 font-mono text-sm text-[#5C4A3A] px-3 py-1.5 rounded-full border border-[#1C1410]/[0.09] bg-[#1C1410]/[0.04]">
                <span>{b.icon}</span> {b.text}
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={stagger.item} className="flex flex-wrap gap-4 justify-center mb-16">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-8 py-3.5 rounded-xl font-mono text-sm font-semibold text-white overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #0284c7)' }}
            >
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #6D28D9, #0369A1)' }}
              />
              <span className="relative z-10 flex items-center gap-2">Explore Pipeline ↓</span>
            </motion.a>

            <motion.a
              href={PERSONAL.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl border border-[#1C1410]/15 font-mono text-sm text-[#5C4A3A] hover:text-[#1C1410] hover:border-neon-purple/40 hover:bg-neon-purple/[0.06] transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl border border-[#1C1410]/15 font-mono text-sm text-[#5C4A3A] hover:text-[#1C1410] hover:border-neon-cyan/40 hover:bg-neon-cyan/[0.06] transition-all duration-200"
            >
              Contact Me →
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={stagger.item} className="grid grid-cols-3 gap-8 max-w-sm mx-auto">
            {[
              { val: '6+', lab: 'Projects' },
              { val: '3+', lab: 'Years Exp' },
              { val: 'M.Eng', lab: 'U of T' },
            ].map(s => (
              <motion.div
                key={s.lab}
                className="text-center"
                whileHover={{ scale: 1.08 }}
              >
                <div className="font-mono text-2xl font-bold gradient-text">{s.val}</div>
                <div className="font-mono text-[11px] text-[#7A6050] mt-1 tracking-widest">{s.lab}</div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: opacityHero as any }}
      >
        <span className="font-mono text-[10px] text-[#7A6050] tracking-[4px]">SCROLL</span>
        <div className="w-5 h-8 rounded-full border border-[#1C1410]/[0.12] flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-neon-purple/50"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
