'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PERSONAL } from '@/lib/data'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Education',  href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled]     = useState(false)
  const [progress, setProgress]     = useState(0)
  const [active, setActive]         = useState('')
  const [menuOpen, setMenuOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 40)
      setProgress(Math.min(100, Math.round((scrollTop / docH) * 100)))

      // active section
      const sections = LINKS.map(l => document.querySelector(l.href))
      const mid = scrollTop + window.innerHeight / 2
      let cur = ''
      sections.forEach((s, i) => {
        if (s && (s as HTMLElement).offsetTop <= mid) cur = LINKS[i].href
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── PROGRESS BAR ── */}
      <div
        className="fixed top-0 left-0 z-[200] h-[3px] transition-all duration-300"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #7C3AED, #0284C7)',
          boxShadow: '0 0 10px rgba(124,58,237,0.5)',
        }}
      />

      {/* ── HEADER ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-bg-deep/90 backdrop-blur-xl border-b border-[#1C1410]/[0.08] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-sm font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
              NP
            </div>
            <span className="font-mono text-sm text-[#5C4A3A] tracking-widest group-hover:text-neon-purple transition-colors">
              nisarg.dev
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs tracking-wider transition-all duration-200 ${
                  active === link.href
                    ? 'text-neon-cyan bg-neon-cyan/10 text-glow-cyan'
                    : 'text-[#5C4A3A] hover:text-[#1C1410] hover:bg-[#1C1410]/[0.05]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact button */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-neon-purple/35 text-neon-purple font-mono text-xs tracking-wider hover:bg-neon-purple/8 hover:border-neon-purple/60 transition-all duration-200"
          >
            Get in Touch
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden text-[#5C4A3A] hover:text-[#1C1410] transition-colors p-2"
          >
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-[#1C1410]/[0.06] bg-bg-deep/95 backdrop-blur-xl"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {LINKS.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-2 font-mono text-sm text-[#5C4A3A] hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
