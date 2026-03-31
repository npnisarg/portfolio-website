'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import ScrollReveal  from './ScrollReveal'
import TiltCard      from './TiltCard'
import { SKILLS } from '@/lib/data'

const colorStyle: Record<string, { bar: string; glow: string; accent: string; badge: string }> = {
  purple: { bar: 'linear-gradient(90deg,#6D28D9,#7C3AED)', glow: 'rgba(124,58,237,0.4)', accent: '#7C3AED', badge: 'rgba(124,58,237,0.08)' },
  blue:   { bar: 'linear-gradient(90deg,#1d4ed8,#2563EB)', glow: 'rgba(37,99,235,0.4)',  accent: '#2563EB', badge: 'rgba(37,99,235,0.08)'  },
  cyan:   { bar: 'linear-gradient(90deg,#0369A1,#0284C7)', glow: 'rgba(2,132,199,0.4)',  accent: '#0284C7', badge: 'rgba(2,132,199,0.08)'   },
  pink:   { bar: 'linear-gradient(90deg,#9D174D,#DB2777)', glow: 'rgba(219,39,119,0.4)', accent: '#DB2777', badge: 'rgba(219,39,119,0.08)'  },
}

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="absolute right-0 bottom-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.03) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto" ref={ref}>
        <SectionHeader
          tag="// NODE_03"
          title="Skills"
          subtitle="Full-stack data science — from agentic AI to production data pipelines."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map((cluster, i) => {
            const c = colorStyle[cluster.color]
            return (
              <ScrollReveal key={cluster.category} direction="up" delay={i * 0.1} className="h-full">
                <TiltCard intensity={5} className="h-full">
                  <div
                    className="card-glow h-full p-6"
                    style={{ borderColor: `${c.accent}20` }}
                  >
                    <div className="flex items-center gap-2.5 mb-6">
                      <span className="text-xl">{cluster.icon}</span>
                      <span
                        className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded border tracking-wider"
                        style={{ color: c.accent, background: c.badge, borderColor: `${c.accent}30` }}
                      >
                        {cluster.category}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {cluster.items.map((skill, si) => (
                        <div key={skill.name} className="group">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="font-mono text-[11px] text-[#5C4A3A] group-hover:text-[#1C1410] transition-colors">{skill.name}</span>
                            <span className="font-mono text-[11px]" style={{ color: c.accent }}>{skill.pct}%</span>
                          </div>
                          <div className="h-[4px] rounded-full bg-[#1C1410]/[0.06] overflow-hidden">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={inView ? { scaleX: 1 } : {}}
                              transition={{ duration: 1.1, delay: i * 0.1 + si * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                              style={{
                                originX: 0,
                                width: `${skill.pct}%`,
                                height: '100%',
                                borderRadius: '4px',
                                background: c.bar,
                                boxShadow: `0 0 8px ${c.glow}`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Skill chip cloud */}
        <ScrollReveal direction="up" delay={0.5} className="mt-10">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {[
              '🤖 Agentic AI', '🔗 RAG', '🧠 LLMs', '⚡ CrewAI',
              '📊 Power BI', '🔄 Power Automate', '🗣️ Copilot Studio',
              '🐍 Python', '⚡ PySpark', '🗄️ SQL', '☁️ Azure', '🧱 Databricks',
              '📈 Time Series', '🔍 NLP', '🎯 A/B Testing',
            ].map(chip => (
              <motion.span
                key={chip}
                whileHover={{ scale: 1.08, y: -2 }}
                className="font-mono text-xs px-4 py-2 rounded-full border border-[#1C1410]/[0.09] bg-[#1C1410]/[0.04] text-[#5C4A3A] hover:text-[#1C1410] hover:border-neon-purple/30 hover:bg-neon-purple/[0.06] transition-all duration-200 cursor-default"
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
