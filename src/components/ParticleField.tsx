'use client'
import { useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────
interface Node {
  bx: number; by: number
  vx: number; vy: number
  x:  number;  y: number
  r:  number
  depth: number
  isHub: boolean
  ringR: number
  ringA: number
  alpha: number
  color: string
}

interface Ripple {
  x: number; y: number
  age: number
  maxAge: number
}

// ─── Warm light palette ───────────────────────────────
const WARM   = 'rgba(92,74,58,'    // warm brown
const MUTED  = 'rgba(28,20,16,'    // near-black
const PURPLE = 'rgba(124,58,237,'  // deep violet
const CYAN   = 'rgba(2,132,199,'   // sky blue

const NODE_COUNT      = 70
const HUB_FRACTION    = 0.1
const CONNECTION_DIST = 165
const MOUSE_RADIUS    = 220
const MOUSE_STRENGTH  = 60
const LERP_SPEED      = 0.08

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999, active: false })
  const scrollRef = useRef(0)
  const ripplesRef = useRef<Ripple[]>([])

  useEffect(() => {
    if (!canvasRef.current) return
    const el: HTMLCanvasElement = canvasRef.current
    const ctx = el.getContext('2d')!

    let W = 0, H = 0
    let nodes: Node[] = []
    let raf: number

    function resize() {
      W = el.width  = window.innerWidth
      H = el.height = window.innerHeight
    }

    function build() {
      nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
        const isHub = i < NODE_COUNT * HUB_FRACTION
        const bx = Math.random() * W
        const by = Math.random() * H
        const roll = Math.random()
        const color = isHub
          ? (Math.random() > 0.5 ? PURPLE : CYAN)
          : roll < 0.55 ? WARM
          : roll < 0.80 ? MUTED
          : roll < 0.92 ? PURPLE
          : CYAN
        return {
          bx, by, x: bx, y: by,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r:  isHub ? 3.5 + Math.random() * 1.5 : 1.2 + Math.random() * 1.6,
          depth: 0.2 + Math.random() * 0.8,
          isHub,
          ringR: isHub ? 10 + Math.random() * 10 : 0,
          ringA: isHub ? 0.4 : 0,
          alpha: isHub ? 0.7 : 0.25 + Math.random() * 0.3,
          color,
        }
      })
    }

    function drawBg() {
      const bg = ctx.createLinearGradient(0, 0, W, H)
      bg.addColorStop(0,   '#F4F0E8')
      bg.addColorStop(0.5, '#F0EBE1')
      bg.addColorStop(1,   '#F4F0E8')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)
    }

    function drawMouseSpotlight() {
      const { x: mx, y: my, active } = mouseRef.current
      if (!active) return
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, 180)
      g.addColorStop(0,   'rgba(124,58,237,0.06)')
      g.addColorStop(0.5, 'rgba(2,132,199,0.03)')
      g.addColorStop(1,   'rgba(124,58,237,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(mx, my, 180, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawRipples() {
      const next: Ripple[] = []
      for (const r of ripplesRef.current) {
        r.age++
        if (r.age >= r.maxAge) continue
        next.push(r)
        const progress = r.age / r.maxAge
        const radius   = progress * 280
        const alpha    = (1 - progress) * 0.35

        // Outer ring
        ctx.beginPath()
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(124,58,237,${alpha * 0.7})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Inner echo ring (offset)
        if (progress > 0.1) {
          const r2 = (progress - 0.1) * 280
          ctx.beginPath()
          ctx.arc(r.x, r.y, r2, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(2,132,199,${alpha * 0.4})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
      ripplesRef.current = next
    }

    function drawConnections() {
      const { x: mx, y: my, active } = mouseRef.current
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d >= CONNECTION_DIST) continue
          const t = 1 - d / CONNECTION_DIST

          // Boost brightness when connection midpoint is near mouse
          let mouseBoost = 0
          if (active) {
            const midX = (a.x + b.x) / 2
            const midY = (a.y + b.y) / 2
            const md   = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2)
            mouseBoost  = Math.max(0, 1 - md / 180) * 0.12
          }

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(28,20,16,${t * t * 0.18 + mouseBoost})`
          ctx.lineWidth = t * 1.1
          ctx.stroke()
        }
      }
    }

    function drawNode(n: Node) {
      if (n.isHub) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.ringR, 0, Math.PI * 2)
        ctx.strokeStyle = `${n.color}${n.ringA.toFixed(2)})`
        ctx.lineWidth = 1
        ctx.stroke()

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5)
        g.addColorStop(0, `${n.color}0.12)`)
        g.addColorStop(1, `${n.color}0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2)
        ctx.fill()
      }

      const g2 = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.5)
      g2.addColorStop(0, `${n.color}${n.alpha.toFixed(2)})`)
      g2.addColorStop(1, `${n.color}0)`)
      ctx.fillStyle = g2
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = `${n.color}${Math.min(1, n.alpha + 0.2).toFixed(2)})`
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r * 0.7, 0, Math.PI * 2)
      ctx.fill()
    }

    function update() {
      const mx     = mouseRef.current.x
      const my     = mouseRef.current.y
      const active = mouseRef.current.active
      const sy     = scrollRef.current

      nodes.forEach(n => {
        n.bx += n.vx
        n.by += n.vy
        if (n.bx < -80) n.bx = W + 80
        if (n.bx > W + 80) n.bx = -80
        if (n.by < -80) n.by = H + 80
        if (n.by > H + 80) n.by = -80

        const parallax = sy * n.depth * 0.04
        let tx = n.bx
        let ty = n.by - parallax

        if (active) {
          const dx   = n.bx - mx
          const dy   = (n.by - parallax) - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force  = Math.pow(1 - dist / MOUSE_RADIUS, 1.8)
            const pushX  = (dx / dist) * force * MOUSE_STRENGTH
            const pushY  = (dy / dist) * force * MOUSE_STRENGTH
            const factor = n.isHub ? 0.3 : 1.0
            tx += pushX * factor
            ty += pushY * factor
          }
        }

        n.x += (tx - n.x) * LERP_SPEED
        n.y += (ty - n.y) * LERP_SPEED

        if (n.isHub) {
          n.ringR += 0.35
          n.ringA  = Math.max(0, 0.45 - (n.ringR - n.r) / 60)
          if (n.ringR > n.r + 55) { n.ringR = n.r + 4; n.ringA = 0.45 }
        }
      })
    }

    function loop() {
      ctx.clearRect(0, 0, W, H)
      drawBg()
      drawMouseSpotlight()
      drawRipples()
      drawConnections()
      nodes.forEach(drawNode)
      update()
      raf = requestAnimationFrame(loop)
    }

    const onMove  = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY, active: true } }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999, active: false } }
    const onScroll = () => { scrollRef.current = window.scrollY }
    const onResize = () => { resize(); build() }
    const onClick  = (e: MouseEvent) => {
      ripplesRef.current.push({ x: e.clientX, y: e.clientY, age: 0, maxAge: 55 })
      // burst nearby nodes
      const bx = e.clientX, by = e.clientY
      nodes.forEach(n => {
        const dx = n.bx - bx, dy = n.by - by
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < 200 && d > 0) {
          const f = Math.pow(1 - d / 200, 2) * 2.2
          n.vx += (dx / d) * f
          n.vy += (dy / d) * f
        }
      })
    }

    resize()
    build()
    loop()

    window.addEventListener('mousemove',  onMove,   { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('scroll',     onScroll, { passive: true })
    window.addEventListener('resize',     onResize)
    window.addEventListener('click',      onClick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('scroll',     onScroll)
      window.removeEventListener('resize',     onResize)
      window.removeEventListener('click',      onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
