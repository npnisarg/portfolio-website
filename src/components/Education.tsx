'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import ScrollReveal  from './ScrollReveal'
import TiltCard      from './TiltCard'
import { EDUCATION } from '@/lib/data'

const colorMap: Record<string, { border: string; accent: string; badge: string }> = {
  purple: { border: 'rgba(124,58,237,0.2)', accent: '#7C3AED', badge: 'rgba(124,58,237,0.08)' },
  cyan:   { border: 'rgba(2,132,199,0.2)',  accent: '#0284C7', badge: 'rgba(2,132,199,0.08)'  },
}

export default function Education() {
  return (
    <section id="education" className="relative py-28 px-6">
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag="// NODE_01"
          title="Education"
          subtitle="Academic foundation in Industrial Engineering with a Data Analytics emphasis."
        />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {EDUCATION.map((edu, i) => {
            const c = colorMap[edu.color]
            return (
              <ScrollReveal key={i} direction={i === 0 ? 'left' : 'right'} delay={i * 0.12} className="h-full">
                <TiltCard intensity={5} className="h-full">
                  <div className="card-glow h-full" style={{ borderColor: c.border }}>
                    <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />
                    <div className="p-7">
                      <div className="flex items-start gap-4 mb-5">
                        <div className="text-3xl">{edu.icon}</div>
                        <div className="flex-1">
                          <span
                            className="font-mono text-[11px] px-2.5 py-1 rounded border inline-block mb-2 tracking-wider"
                            style={{ color: c.accent, background: c.badge, borderColor: c.border }}
                          >
                            {edu.years}
                          </span>
                          <h3 className="font-mono text-base font-semibold text-[#1C1410] leading-snug">{edu.degree}</h3>
                          <p className="font-mono text-sm mt-0.5" style={{ color: c.accent }}>{edu.field}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.accent }} />
                        <span className="text-[#5C4A3A] text-sm">{edu.school}</span>
                        <span className="text-[#7A6050] text-xs ml-auto font-mono">{edu.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map(h => (
                          <span key={h} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[#1C1410]/[0.04] border border-[#1C1410]/[0.09] text-[#5C4A3A]">{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Extracurriculars */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="card-glow border border-[#1C1410]/[0.09] p-7">
            <h3 className="font-mono text-sm text-neon-cyan tracking-widest mb-4">// EXTRACURRICULAR</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: '🌿', text: 'Green Team — PepsiCo HQ sustainability & waste reduction initiatives' },
                { icon: '🏛️', text: 'Finance & Admin VP — AMIGAS Club, University of Toronto' },
                { icon: '👑', text: 'President — W.A.T.C.H Club, University of Toronto' },
                { icon: '🏆', text: 'Global Top-2 Finalist — PepsiCo Next Big Idea competition' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span className="text-[#5C4A3A] text-sm leading-relaxed">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
