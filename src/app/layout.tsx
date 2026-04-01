import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nisarg Patel — Data Scientist',
  description: 'Data Scientist at PepsiCo Canada, Toronto. Expert in Machine Learning, Agentic AI, NLP, and Data Analytics. University of Toronto M.Eng graduate.',
  keywords: ['Data Scientist', 'Machine Learning', 'Deep Learning', 'NLP', 'Python', 'Toronto', 'Nisarg Patel'],
  icons: {
    icon: '/Logo.png',
  },
  openGraph: {
    title: 'Nisarg Patel — Data Scientist',
    description: 'Data Pipeline: Nisarg Patel\'s Journey through ML, AI, and Data Science.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise bg-bg-deep antialiased">
        {children}
      </body>
    </html>
  )
}
