'use client'

import useSWR from 'swr'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, Cell
} from 'recharts'
import { EraBadge } from '@/components/era-badge'
import { ERA_COLORS } from '@/lib/types'
import { cn } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface EraData {
  id: string
  name: string
  year_start: number
  year_end: number | null
  description: string | null
  color: string | null
  key_events: string[] | null
  node_count: number
}

interface GraphNode {
  id: string
  name: string
  type: string
  era: string | null
  influence_score: number
  region: string | null
  description: string | null
}

function EraCard({ era, nodes }: { era: EraData; nodes: GraphNode[] }) {
  const artists = nodes.filter((n) => n.type === 'artist').sort((a, b) => b.influence_score - a.influence_score)
  const albums  = nodes.filter((n) => n.type === 'album').sort((a, b) => b.influence_score - a.influence_score)
  const labels  = nodes.filter((n) => n.type === 'movement')
  const color   = era.color ?? ERA_COLORS[era.id] ?? '#888'

  const events: string[] = (() => {
    if (!era.key_events) return []
    if (Array.isArray(era.key_events)) return era.key_events as string[]
    try { return JSON.parse(era.key_events as unknown as string) } catch { return [] }
  })()

  return (
    <article
      id={era.id}
      className="scroll-mt-16 rounded-lg border border-border bg-card overflow-hidden"
    >
      {/* Header strip */}
      <div className="h-1.5 w-full" style={{ backgroundColor: color }} aria-hidden="true" />

      <div className="p-5 sm:p-6">
        {/* Title row */}
        <div className="flex flex-wrap items-start gap-3 justify-between mb-3">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">{era.name}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {era.year_start}–{era.year_end ?? 'Present'}
              <span className="ml-2 text-xs">· {era.node_count} entries</span>
            </p>
          </div>
          <EraBadge eraId={era.id} eraName={era.name} size="md" />
        </div>

        {/* Description */}
        {era.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{era.description}</p>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Key Artists */}
          {artists.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Key Artists</p>
              <ul className="flex flex-col gap-1.5">
                {artists.slice(0, 6).map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground truncate">{a.name}</span>
                    <span className="text-xs text-gold font-mono shrink-0">{Math.round(a.influence_score)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Albums */}
          {albums.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Essential Albums</p>
              <ul className="flex flex-col gap-1.5">
                {albums.slice(0, 5).map((a) => (
                  <li key={a.id} className="text-sm text-muted-foreground italic truncate">{a.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Events + Labels */}
          <div>
            {events.length > 0 && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Key Events</p>
                <ul className="flex flex-col gap-1.5 mb-3">
                  {events.map((ev, i) => (
                    <li key={i} className="text-xs text-muted-foreground leading-relaxed border-l-2 pl-2" style={{ borderColor: color }}>
                      {ev}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {labels.length > 0 && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Labels / Movements</p>
                <ul className="flex flex-wrap gap-1">
                  {labels.map((l) => (
                    <li key={l.id} className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">{l.name}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function TimelineView() {
  const { data: eras, isLoading: erasLoading } = useSWR<EraData[]>('/api/eras', fetcher)
  const { data: graphData, isLoading: graphLoading } = useSWR('/api/graph', fetcher)

  const isLoading = erasLoading || graphLoading

  // Build era → nodes lookup
  const eraNodes: Record<string, GraphNode[]> = {}
  if (graphData?.nodes) {
    for (const node of graphData.nodes as GraphNode[]) {
      if (node.era) {
        eraNodes[node.era] = eraNodes[node.era] ?? []
        eraNodes[node.era].push(node)
      }
    }
  }

  // Bar chart data: nodes per era
  const safeEras = Array.isArray(eras) ? eras : []
  const barData = safeEras.map((e) => ({
    name: e.name.split('/')[0].trim().replace('Pre-Hip-Hop ', ''),
    count: eraNodes[e.id]?.length ?? 0,
    color: e.color ?? '#888',
  }))

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-gold border-t-transparent animate-spin" aria-label="Loading timeline" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-1">Cultural History</p>
        <h1 className="font-display text-3xl font-bold text-foreground">Hip-Hop Timeline</h1>
        <p className="mt-2 text-muted-foreground">From South Bronx block parties to global streaming dominance.</p>
      </div>

      {/* Overview bar chart */}
      {barData.length > 0 && (
        <section className="mb-10 rounded-lg border border-border bg-card p-5" aria-label="Nodes per era chart">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Entries per era</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={barData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#888888' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#888888' }} axisLine={false} tickLine={false} />
              <RTooltip
                contentStyle={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '6px', fontSize: 12 }}
                labelStyle={{ color: '#F0EDE8', fontWeight: 600 }}
                itemStyle={{ color: '#888888' }}
              />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>
      )}

      {/* Era quick-nav */}
      <nav className="mb-8 flex flex-wrap gap-2" aria-label="Era navigation">
        {safeEras.map((e) => (
          <a
            key={e.id}
            href={`#${e.id}`}
            className={cn(
              'rounded px-2.5 py-1 text-xs font-medium transition-colors border border-transparent hover:border-border'
            )}
            style={{ backgroundColor: `${e.color ?? '#888'}25`, color: e.color ?? '#888' }}
          >
            {e.year_start}–{e.year_end ?? 'Now'}
          </a>
        ))}
      </nav>

      {/* Era cards */}
      <div className="flex flex-col gap-6">
        {safeEras.map((era) => (
          <EraCard key={era.id} era={era} nodes={eraNodes[era.id] ?? []} />
        ))}
      </div>
    </div>
  )
}
