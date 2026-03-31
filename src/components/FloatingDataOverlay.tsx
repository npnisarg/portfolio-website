'use client'
// Minimalistic version — just the scrolling skills ticker
import { useScroll, useTransform, motion } from 'framer-motion'

const ITEMS = [
  'Python', 'PySpark', 'SQL', 'ETL', 'Power BI', 'Power Automate',
  'Copilot Studio', 'LLMs', 'RAG', 'Multi-Agent AI', 'CrewAI',
  'Databricks', 'Azure Synapse', 'Time Series', 'Deep Learning',
  'XGBoost', 'scikit-learn', 'NLP', 'A/B Testing', 'Data Warehousing',
].join('  ·  ')

export default function FloatingDataOverlay() {
  const { scrollYProgress } = useScroll()
  // ticker moves opposite to scroll for subtle parallax feel
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[6] pointer-events-none overflow-hidden"
      style={{
        background: 'linear-gradient(to right, rgba(244,240,232,0.95) 0%, rgba(244,240,232,0.75) 50%, rgba(244,240,232,0.95) 100%)',
        borderTop: '1px solid rgba(28,20,16,0.07)',
      }}
    >
      <motion.div
        style={{ x }}
        className="whitespace-nowrap py-2 font-mono text-[10px] tracking-[2px] text-[#7A6050]"
      >
        {`${ITEMS}  ·  ${ITEMS}  ·  ${ITEMS}`}
      </motion.div>
    </div>
  )
}
