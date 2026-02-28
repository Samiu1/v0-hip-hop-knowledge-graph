import { Nav } from '@/components/nav'
import { AnalyticsDashboard } from '@/components/analytics-dashboard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics | Hip-Hop KG',
  description: 'Influence rankings, regional breakdowns, genre evolution, and relationship density analysis.',
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <AnalyticsDashboard />
      </main>
    </div>
  )
}
