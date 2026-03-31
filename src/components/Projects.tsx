'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import TiltCard      from './TiltCard'
import { PROJECTS, FILTER_OPTIONS, FilterOption } from '@/lib/data'

const typeStyle: Record<string, { bg: string; border: string; text: string; shadow: string }> = {
  GenAI: { bg: 'rgba(124,58,237,0.08)',  border: 'rgba(124,58,237,0.22)',  text: '#7C3AED', shadow: 'rgba(124,58,237,0.1)' },
  ML:    { bg: 'rgba(2,132,199,0.08)',   border: 'rgba(2,132,199,0.22)',   text: '#0284C7', shadow: 'rgba(2,132,199,0.1)'  },
  DL:    { bg: 'rgba(109,40,217,0.08)',  border: 'rgba(109,40,217,0.22)',  text: '#6D28D9', shadow: 'rgba(109,40,217,0.1)' },
  Data:  { bg: 'rgba(37,99,235,0.08)',   border: 'rgba(37,99,235,0.22)',   text: '#2563EB', shadow: 'rgba(37,99,235,0.1)'  },
}

function ProjectCard({ project, i }: { project: typeof PROJECTS[0]; i: number }) {
  const tc = typeStyle[project.type] ?? typeStyle.ML

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard intensity={6} className="h-full">
        <div
          className="card-glow relative overflow-hidden h-full"
          style={{ borderColor: `${tc.border}` }}
        >
          {/* Top stripe */}
          <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${tc.text}, transparent)` }} />

          {/* Glow blob behind card */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-300"
            style={{ background: `radial-gradient(circle, ${tc.shadow} 0%, transparent 70%)`, opacity: 0.5 }}
          />

          <div className="p-6 relative z-10 flex flex-col h-full">
            {/* Badge + links */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="font-mono text-[11px] px-2.5 py-1 rounded border tracking-wider"
                style={{ background: tc.bg, borderColor: tc.border, color: tc.text }}
              >
                {project.type}
              </span>
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.12, rotate: -5 }}
                  className="w-7 h-7 rounded-lg border border-[#1C1410]/[0.12] bg-[#1C1410]/[0.04] flex items-center justify-center text-[#7A6050] hover:text-[#1C1410] hover:border-[#1C1410]/25 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </motion.a>
              )}
            </div>

            <h3 className="font-mono text-[15px] font-semibold text-[#1C1410] leading-snug mb-3">{project.title}</h3>
            <p className="text-[#5C4A3A] text-sm leading-relaxed mb-4 flex-1">{project.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 4).map(t => (
                <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1C1410]/[0.04] border border-[#1C1410]/[0.09] text-[#7A6050]">
                  {t}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1C1410]/[0.04] border border-[#1C1410]/[0.09] text-[#7A6050]/60">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>

            {/* Metrics */}
            {project.metrics.length > 0 && (
              <div className="flex gap-5 border-t border-[#1C1410]/[0.07] pt-4">
                {project.metrics.map(m => (
                  <div key={m.lab}>
                    <div className="font-mono text-sm font-bold" style={{ color: tc.text }}>{m.val}</div>
                    <div className="font-mono text-[10px] text-[#7A6050] mt-0.5">{m.lab}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [filter, setFilter] = useState<FilterOption>('All')

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter)

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <SectionHeader
          tag="// NODE_04"
          title="Projects"
          subtitle="Production systems and applied AI solutions — shipped and deployed."
        />

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTER_OPTIONS.map(opt => (
            <motion.button
              key={opt}
              onClick={() => setFilter(opt)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="font-mono text-xs px-4 py-2 rounded-xl border transition-all duration-200"
              style={filter === opt
                ? { background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.4)', color: '#7C3AED', boxShadow: '0 0 14px rgba(124,58,237,0.12)' }
                : { background: 'transparent', borderColor: 'rgba(28,20,16,0.12)', color: 'rgba(92,74,58,0.8)' }
              }
            >
              {opt}
            </motion.button>
          ))}
          <span className="font-mono text-xs text-[#7A6050] self-center ml-1">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} i={i} />)}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/npnisarg"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#7A6050] hover:text-neon-cyan transition-colors group"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View all on GitHub
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
