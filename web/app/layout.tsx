import type { Metadata } from 'next'
import '@fontsource/space-grotesk'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/jetbrains-mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'claude-cut',
  description: 'AI video editing pipeline for Instagram Reels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
