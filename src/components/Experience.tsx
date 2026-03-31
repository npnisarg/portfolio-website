'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import ScrollReveal  from './ScrollReveal'
import TiltCard      from './TiltCard'
import { EXPERIENCE } from '@/lib/data'

const accentColor: Record<string, string> = {
  purple: '#7C3AED',
  cyan:   '#0284C7',
  green:  '#059669',
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="absolute left-0 top-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(2,132,199,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag="// NODE_02"
          title="Experience"
          subtitle="3+ years owning ML solutions end-to-end — from model dev to production impact."
        />

        <div className="space-y-10">
          {EXPERIENCE.map((exp, i) => {
            const color = accentColor[exp.color] ?? '#7C3AED'
            const dir   = i % 2 === 0 ? 'left' : 'right'
            return (
              <ScrollReveal key={i} direction={dir as any} delay={i * 0.08}>
                <TiltCard intensity={4}>
                  <div
                    className="card-glow relative overflow-hidden"
                    style={{ borderColor: `${color}20` }}
                  >
                    {/* Top accent line */}
                    <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

                    <div className="p-7 md:p-9">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                            style={{ background: `${color}12`, border: `1px solid ${color}30`, boxShadow: `0 0 16px ${color}15` }}
                          >
                            {exp.icon}
                          </div>
                          <div>
                            <h3 className="font-mono text-lg font-semibold text-[#1C1410] leading-tight">{exp.role}</h3>
                            <p className="font-mono text-sm mt-0.5" style={{ color }}>{exp.company}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span
                            className="font-mono text-xs px-3 py-1.5 rounded-full border"
                            style={{ color, background: `${color}10`, borderColor: `${color}30` }}
                          >
                            {exp.dates}
                          </span>
                          <div className="font-mono text-[11px] text-[#7A6050] mt-1.5">{exp.location}</div>
                        </div>
                      </div>

                      {/* Metrics chips */}
                      {exp.metrics && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {exp.metrics.map(m => (
                            <span
                              key={m}
                              className="font-mono text-[11px] px-3 py-1 rounded-full"
                              style={{ background: `${color}10`, border: `1px solid ${color}25`, color }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Bullets */}
                      <ul className="space-y-2.5 mb-6">
                        {exp.bullets.map((b, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: j * 0.06 + 0.2 }}
                            className="flex gap-3 text-[#5C4A3A] text-sm leading-relaxed"
                          >
                            <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: color }} />
                            {b}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map(t => (
                          <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[#1C1410]/[0.04] border border-[#1C1410]/[0.09] text-[#5C4A3A]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
