import ParticleField       from '@/components/ParticleField'
import FloatingDataOverlay from '@/components/FloatingDataOverlay'
import Navigation          from '@/components/Navigation'
import Hero                from '@/components/Hero'
import ScrollScene         from '@/components/ScrollScene'
import Education           from '@/components/Education'
import Experience          from '@/components/Experience'
import Skills              from '@/components/Skills'
import Projects            from '@/components/Projects'
import Contact             from '@/components/Contact'

export default function Home() {
  return (
    <div className="scanline-overlay">
      {/* ── Layer 0: animated canvas ── */}
      <ParticleField />

      {/* ── Layer 1: floating AI data widgets ── */}
      <FloatingDataOverlay />

      {/* ── Layer 2: navigation ── */}
      <Navigation />

      {/* ── Layer 3: pipeline sidebar ── */}
      <PipelineSidebar />

      {/* ── Layer 4: content ── */}
      <main className="relative z-10">

        {/* Hero — full viewport, no glass (let canvas show fully) */}
        <Hero />

        {/* Apple-style scroll scene — pinned stat frames */}
        <ScrollScene />

        <PipelineDivider />

        {/* All other sections wrapped in glass so text stays legible */}
        <div className="section-glass">
          <Education />
        </div>

        <PipelineDivider />

        <div className="section-glass">
          <Experience />
        </div>

        <PipelineDivider />

        <div className="section-glass">
          <Skills />
        </div>

        <PipelineDivider />

        <div className="section-glass">
          <Projects />
        </div>

        <PipelineDivider />

        <div className="section-glass">
          <Contact />
        </div>

        <Footer />
      </main>
    </div>
  )
}

// ── Pipeline animated divider ──────────────────────────
function PipelineDivider() {
  return (
    <div className="relative flex justify-center py-0 z-10">
      <svg width="3" height="80" className="overflow-visible">
        <defs>
          <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"    stopColor="#7C3AED" stopOpacity="0.8" />
            <stop offset="100%"  stopColor="#0284C7" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <line x1="1.5" y1="0" x2="1.5" y2="80" stroke="url(#dg)" strokeWidth="2" strokeDasharray="6 5" />
        {/* animated dot travelling down */}
        <circle cx="1.5" cy="0" r="3.5" fill="#7C3AED" opacity="0.8"
          style={{ filter: 'drop-shadow(0 0 5px #7C3AED)' }}>
          <animate attributeName="cy" values="0;80" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

// ── Sidebar dot navigation ─────────────────────────────
const NAV_NODES = [
  { href: '#hero',       label: 'INIT',   color: '#059669' },
  { href: '#education',  label: 'EDU',    color: '#7C3AED' },
  { href: '#experience', label: 'EXP',    color: '#6D28D9' },
  { href: '#skills',     label: 'SKL',    color: '#0284C7' },
  { href: '#projects',   label: 'PRJ',    color: '#DB2777' },
  { href: '#contact',    label: 'OUT ✅', color: '#059669' },
]

function PipelineSidebar() {
  return (
    <aside className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center">
      {/* Connecting line */}
      <div className="absolute top-3 bottom-3 w-[1px] left-[5px] bg-gradient-to-b from-neon-green/20 via-neon-purple/20 to-neon-cyan/20" />

      {NAV_NODES.map(node => (
        <a
          key={node.href}
          href={node.href}
          className="group relative flex items-center my-[13px]"
          title={node.label}
        >
          <div
            className="w-[11px] h-[11px] rounded-full border z-10 transition-all duration-300 group-hover:scale-125"
            style={{
              borderColor: node.color + '60',
              background: 'rgba(244,240,232,0.9)',
            }}
          >
            {/* inner dot */}
            <div
              className="absolute inset-[2px] rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
              style={{ background: node.color, boxShadow: `0 0 6px ${node.color}` }}
            />
          </div>
          <span
            className="absolute left-5 font-mono text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap"
            style={{ color: node.color }}
          >
            {node.label}
          </span>
        </a>
      ))}
    </aside>
  )
}

// ── Footer ─────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="relative z-10 py-10 px-6"
      style={{
        borderTop: '1px solid rgba(28,20,16,0.08)',
        background: 'rgba(244,240,232,0.95)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-[#7A6050]">
          © {new Date().getFullYear()} Nisarg Patel — Data Scientist · Toronto
        </div>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          <span className="font-mono text-xs text-[#7A6050]">Built with Next.js + Framer Motion</span>
        </div>
        <a href="#hero" className="font-mono text-xs text-[#7A6050] hover:text-neon-purple transition-colors">
          ↑ Back to top
        </a>
      </div>
    </footer>
  )
}
