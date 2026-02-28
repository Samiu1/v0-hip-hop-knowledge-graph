import { Nav } from '@/components/nav'
import { TimelineView } from '@/components/timeline-view'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Timeline | Hip-Hop KG',
  description: 'Travel through 100 years of hip-hop history era by era.',
}

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <TimelineView />
      </main>
    </div>
  )
}
