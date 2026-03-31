'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import ScrollReveal  from './ScrollReveal'
import { PERSONAL } from '@/lib/data'

export default function Contact() {
  const ref = useRef(null)
  useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const body = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })

    setLoading(false)
    if (res.ok) {
      setSent(true)
    } else {
      setError('Failed to send — please email me directly at 97nisargpatel@gmail.com')
    }
  }

  const socials = [
    { name: 'Email',    handle: PERSONAL.email,    href: `mailto:${PERSONAL.email}`,  icon: '@',  color: 'rgba(124,58,237,' },
    { name: 'LinkedIn', handle: '/in/npnisarg',     href: PERSONAL.linkedin,            icon: 'in', color: 'rgba(2,132,199,'  },
    { name: 'GitHub',   handle: '@npnisarg',        href: PERSONAL.github,              icon: 'GH', color: 'rgba(28,20,16,'  },
  ]

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.04) 0%, transparent 60%)' }} />

      <div className="max-w-5xl mx-auto" ref={ref}>
        <SectionHeader
          tag="// OUTPUT_LAYER"
          title="Contact"
          subtitle="Open to new opportunities in Data Science, ML Engineering, and Agentic AI."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-3">
            <div className="card-glow border border-[#1C1410]/[0.09] overflow-hidden">
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg,#7C3AED,#0284C7)' }} />
              <div className="p-7">
                <h3 className="font-mono text-neon-cyan text-xs tracking-widest mb-6">// SEND MESSAGE</h3>

                {!sent ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Name"  name="name"  type="text"  placeholder="Your name" />
                      <Field label="Email" name="email" type="email" placeholder="your@email.com" />
                    </div>
                    <Field label="Subject" name="subject" type="text" placeholder="What's this about?" />
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-[#7A6050] tracking-widest uppercase">Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="Tell me about your project or opportunity..."
                        className="w-full bg-[#1C1410]/[0.03] border border-[#1C1410]/[0.09] rounded-xl px-4 py-3 font-mono text-sm text-[#1C1410] placeholder:text-[#7A6050]/60 focus:outline-none focus:border-neon-purple/40 focus:bg-neon-purple/[0.04] transition-all resize-none"
                      />
                    </div>

                    {error && (
                      <p className="font-mono text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-xl font-mono text-sm font-semibold text-white disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg,#7c3aed,#0284c7)' }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⟳</motion.span>
                          Transmitting...
                        </span>
                      ) : '⚡ Transmit Message'}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                    <div className="text-5xl mb-4">✨</div>
                    <div className="font-mono text-neon-green text-lg font-semibold mb-2">Message Received!</div>
                    <p className="text-[#5C4A3A] text-sm">I'll get back to you within 24 hours.</p>
                  </motion.div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal direction="right" delay={0.15} className="lg:col-span-2 space-y-5">
            <div className="card-glow border border-[#1C1410]/[0.09] p-6">
              <h3 className="font-mono text-xs text-neon-cyan tracking-widest mb-5">// CONNECT</h3>
              <div className="space-y-3">
                {socials.map(s => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target={s.name !== 'Email' && s.name !== 'Phone' ? '_blank' : undefined}
                    rel="noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3.5 p-3 rounded-xl border border-[#1C1410]/[0.07] bg-[#1C1410]/[0.02] hover:border-[#1C1410]/20 hover:bg-[#1C1410]/[0.05] transition-all duration-200 group"
                  >
                    <div
                      className="w-9 h-9 rounded-lg border flex items-center justify-center font-mono text-xs flex-shrink-0"
                      style={{ background: `${s.color}0.08)`, borderColor: `${s.color}0.2)`, color: `${s.color}0.9)` }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[#1C1410]">{s.name}</div>
                      <div className="font-mono text-[11px] text-[#7A6050] mt-0.5">{s.handle}</div>
                    </div>
                    <span className="ml-auto text-[#7A6050]/60 group-hover:text-[#5C4A3A] transition-colors text-sm">→</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="card-glow border border-[#1C1410]/[0.09] p-5">
              <div className="font-mono text-xs text-[#7A6050] tracking-widest mb-3">// INTERESTS</div>
              <div className="flex flex-wrap gap-2">
                {PERSONAL.interests.map(i => (
                  <span key={i} className="font-mono text-xs px-3 py-1.5 rounded-full border border-[#1C1410]/[0.09] bg-[#1C1410]/[0.03] text-[#5C4A3A]">{i}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <label className="font-mono text-[11px] text-[#7A6050] tracking-widest uppercase">{label}</label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full bg-[#1C1410]/[0.03] border border-[#1C1410]/[0.09] rounded-xl px-4 py-3 font-mono text-sm text-[#1C1410] placeholder:text-[#7A6050]/60 focus:outline-none focus:border-neon-purple/40 focus:bg-neon-purple/[0.04] transition-all"
      />
    </div>
  )
}
