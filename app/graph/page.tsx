import { Nav } from '@/components/nav'
import { GraphExplorer } from '@/components/graph-explorer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Knowledge Graph | Hip-Hop KG',
  description: 'Interactive force-directed graph of hip-hop artists, albums, labels, and movements.',
}

export default function GraphPage() {
  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      <Nav />
      <main className="flex-1 overflow-hidden" aria-label="Interactive knowledge graph">
        <GraphExplorer />
      </main>
    </div>
  )
}
