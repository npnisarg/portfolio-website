'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

// ── Total scroll height for the pinned section ────────
const SCENE_VH = 360

// ── Ring definitions ──────────────────────────────────
interface RingData {
  showAt:  number
  radius:  number
  dur:     number
  color:   string
  label:   string
  items:   string[]
}

const RINGS: RingData[] = [
  {
    showAt: 0.08,
    radius: 110,
    dur:    28,
    color:  '#7C3AED',
    label:  'Languages & Foundations',
    items:  ['Python', 'SQL', 'R', 'NumPy', 'Pandas', 'scikit-learn', 'TensorFlow', 'PyTorch', 'NLP', 'Statistics'],
  },
  {
    showAt: 0.38,
    radius: 210,
    dur:    42,
    color:  '#0284C7',
    label:  'Data & Deployment',
    items:  ['Docker', 'Azure DevOps', 'Databricks', 'Git', 'Azure ML', 'PySpark', 'CI/CD', 'REST APIs', 'MLflow'],
  },
  {
    showAt: 0.68,
    radius: 315,
    dur:    58,
    color:  '#059669',
    label:  'UI & Business Intelligence',
    items:  ['Power BI', 'Power Automate', 'Power Apps', 'Copilot Studio', 'Streamlit', 'Plotly', 'Dash'],
  },
]

// ─── Orbital ring component ───────────────────────────
function OrbitalRing({
  ring,
  scrollYProgress,
}: {
  ring: RingData
  scrollYProgress: MotionValue<number>
}) {
  const opacity = useTransform(scrollYProgress, [ring.showAt, ring.showAt + 0.12, 1.0], [0, 1, 1])
  const scale   = useTransform(scrollYProgress, [ring.showAt, ring.showAt + 0.14, 1.0], [0.15, 1, 1])
  const size    = ring.radius * 2

  return (
    <div
      style={{
        position:   'absolute',
        width:       size,
        height:      size,
        top:        '50%',
        left:       '50%',
        marginTop:  -ring.radius,
        marginLeft: -ring.radius,
      }}
    >
      <motion.div style={{ opacity, scale }} className="w-full h-full">
        {/* Dashed orbit track */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1.5px dashed ${ring.color}40` }}
          animate={{ rotate: 360 }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
        >
          {ring.items.map((item, i) => {
            const angle = (i / ring.items.length) * Math.PI * 2 - Math.PI / 2
            const left  = ring.radius + Math.cos(angle) * ring.radius
            const top   = ring.radius + Math.sin(angle) * ring.radius
            return (
              <div
                key={item}
                style={{ position: 'absolute', left, top }}
              >
                <motion.div
                  style={{ x: '-50%', y: '-50%' }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
                >
                  <span
                    className="font-mono text-xs px-3 py-1 rounded-full border whitespace-nowrap block font-semibold"
                    style={{
                      color:           ring.color,
                      borderColor:     `${ring.color}60`,
                      background:      `${ring.color}14`,
                      boxShadow:       `0 1px 6px ${ring.color}25`,
                      letterSpacing:   '0.02em',
                    }}
                  >
                    {item}
                  </span>
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Ring reveal label (appears as each ring unlocks) ──
function RingLabel({
  ring,
  index,
  scrollYProgress,
}: {
  ring: RingData
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const opacity = useTransform(scrollYProgress, [ring.showAt, ring.showAt + 0.10, ring.showAt + 0.30], [0, 1, 0])
  const x       = useTransform(scrollYProgress, [ring.showAt, ring.showAt + 0.10], [-16, 0])

  // Stack labels in top-left corner — well clear of orbital rings
  const topPos = [24, 60, 96]

  return (
    <motion.div
      style={{ opacity, x, position: 'absolute', top: topPos[index], left: 24 }}
      className="z-20 pointer-events-none"
    >
      <div
        className="font-mono text-xs px-3 py-1.5 rounded-full border font-semibold tracking-wide"
        style={{
          color:       ring.color,
          borderColor: `${ring.color}55`,
          background:  `${ring.color}14`,
          boxShadow:   `0 2px 12px ${ring.color}22`,
        }}
      >
        <span style={{ opacity: 0.6, marginRight: 6 }}>●</span>{ring.label}
      </div>
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════
//  MAIN SCROLL SCENE
// ═════════════════════════════════════════════════════

export default function ScrollScene() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target:  ref,
    offset:  ['start start', 'end end'],
  })

  // ── Background shifts through warm light tints ──
  const bgColor = useTransform(
    scrollYProgress,
    [0,     0.08,  0.38,  0.68,  1.0],
    [
      'rgba(244,240,232,1)',   // warm cream — base
      'rgba(240,234,250,1)',   // lavender tint — languages/AI
      'rgba(232,242,252,1)',   // sky blue tint — DevOps/cloud
      'rgba(230,248,242,1)',   // teal tint — UI tools
      'rgba(244,240,232,1)',   // back to cream
    ]
  )

  // ── Progress bar ──
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  // ── Title fade out as rings begin to build ──
  const titleOpacity = useTransform(scrollYProgress, [0, 0.04, 0.25, 0.35], [1, 1, 0.35, 0])
  const titleY       = useTransform(scrollYProgress, [0, 0.35], [0, -40])

  return (
    <div ref={ref} style={{ height: `${SCENE_VH}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Shifting background ── */}
        <motion.div className="absolute inset-0" style={{ backgroundColor: bgColor }} />

        {/* ── Soft vignette (very light, just for depth) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(28,20,16,0.04) 100%)' }}
        />

        {/* ── Progress bar ── */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left z-20"
          style={{
            scaleX:     barScaleX,
            background: 'linear-gradient(90deg, #7C3AED 0%, #0284C7 50%, #059669 100%)',
          }}
        />

        {/* ── Title ── */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center h-full pointer-events-none z-10"
        >
          <div className="font-mono text-[10px] text-[#7A6050] tracking-[6px] mb-4 uppercase">// The Stack</div>
          <h2 className="font-display font-bold text-center px-6 text-[#1C1410]"
            style={{ fontSize: 'clamp(1.8rem,4.5vw,3.2rem)' }}
          >
            Built with the right tools.
          </h2>
          <p className="text-[#5C4A3A] text-sm mt-3 font-mono tracking-wide">Scroll to explore the full stack</p>
          <motion.div
            className="mt-8 flex flex-col items-center gap-1.5"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <div className="w-[1px] h-8 bg-gradient-to-b from-neon-purple/40 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-neon-purple/40" />
          </motion.div>
        </motion.div>

        {/* ── Orbital system ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: 'none' }}
        >
          <div
            className="relative scale-[0.37] sm:scale-[0.48] md:scale-[0.58] lg:scale-[0.72] xl:scale-[0.88] 2xl:scale-100"
            style={{ width: 700, height: 700 }}
          >
            {/* AI core — always visible */}
            <motion.div
              className="absolute z-10 flex flex-col items-center justify-center rounded-full"
              style={{
                width:      80,
                height:     80,
                top:        '50%',
                left:       '50%',
                marginTop:  -40,
                marginLeft: -40,
                background: 'rgba(124,58,237,0.1)',
                border:     '1.5px solid rgba(124,58,237,0.55)',
              }}
              animate={{
                boxShadow: [
                  '0 0 16px rgba(124,58,237,0.2)',
                  '0 0 45px rgba(124,58,237,0.5)',
                  '0 0 16px rgba(124,58,237,0.2)',
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity }}
            >
              <span className="font-mono text-sm font-bold text-neon-purple">AI</span>
              <span className="font-mono text-[8px] text-neon-purple/60 tracking-wider">CORE</span>
            </motion.div>

            {/* Three rings */}
            {RINGS.map((ring, i) => (
              <OrbitalRing key={i} ring={ring} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* ── Ring-reveal labels ── */}
        <div className="absolute inset-0 pointer-events-none">
          {RINGS.map((ring, i) => (
            <RingLabel key={i} ring={ring} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

      </div>
    </div>
  )
}
