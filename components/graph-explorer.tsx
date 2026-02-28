'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Search, X, Filter, Info, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import useSWR from 'swr'
import { EraBadge } from '@/components/era-badge'
import { NODE_COLORS, ERA_COLORS, RELATIONSHIP_LABELS, type GraphNode, type GraphEdge, type GraphData } from '@/lib/types'

// Dynamically import force graph (no SSR — needs window)
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-gold border-t-transparent animate-spin" aria-label="Loading graph" />
    </div>
  ),
})

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const ERA_OPTIONS = [
  { value: 'all',          label: 'All Eras' },
  { value: 'era_roots',    label: 'Pre-Hip-Hop Roots' },
  { value: 'era_birth',    label: 'The Birth' },
  { value: 'era_old_school', label: 'Old School' },
  { value: 'era_golden',   label: 'Golden Age' },
  { value: 'era_east_west', label: 'East/West Wars' },
  { value: 'era_bling',    label: 'Bling Era' },
  { value: 'era_internet', label: 'Internet Era' },
  { value: 'era_trap',     label: 'Trap & Streaming' },
  { value: 'era_modern',   label: 'New Generation' },
]

const TYPE_OPTIONS = [
  { value: 'all',      label: 'All Types' },
  { value: 'artist',   label: 'Artists' },
  { value: 'album',    label: 'Albums' },
  { value: 'movement', label: 'Labels / Movements' },
  { value: 'concept',  label: 'Concepts' },
]

function NodeDetail({ nodeId, onClose }: { nodeId: string; onClose: () => void }) {
  const { data, isLoading } = useSWR(`/api/node/${nodeId}`, fetcher)

  if (isLoading) return (
    <div className="flex h-32 items-center justify-center">
      <div className="h-5 w-5 rounded-full border-2 border-gold border-t-transparent animate-spin" />
    </div>
  )
  if (!data?.node) return null

  const { node, outgoing, incoming } = data
  const connections = [...(outgoing ?? []), ...(incoming ?? [])]

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-display font-bold text-foreground text-lg leading-tight">{node.name}</h2>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground capitalize">{node.type}</span>
            {node.era && <EraBadge eraId={node.era} />}
          </div>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded hover:bg-muted transition-colors"
          aria-label="Close detail panel"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Score */}
      <div className="rounded-md border border-border bg-gold/5 px-3 py-2 flex items-center justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Influence Score</span>
        <span className="font-display text-xl font-bold text-gold">{Math.round(node.influence_score)}</span>
      </div>

      {/* Description */}
      {node.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">{node.description}</p>
      )}

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {node.year_start && <span>Est. {node.year_start}</span>}
        {node.region && <span>{node.region}</span>}
      </div>

      {/* Connections */}
      {connections.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Connections ({connections.length})
          </p>
          <ul className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
            {outgoing?.slice(0, 8).map((e: { id: number; relationship: string; target_name: string; target_type: string; target_era: string; weight: number }) => (
              <li key={`out-${e.id}`} className="flex items-center justify-between gap-2 text-xs">
                <span className="font-medium text-foreground truncate">{e.target_name}</span>
                <span className="shrink-0 text-muted-foreground">{RELATIONSHIP_LABELS[e.relationship as keyof typeof RELATIONSHIP_LABELS] ?? e.relationship}</span>
              </li>
            ))}
            {incoming?.slice(0, 4).map((e: { id: number; relationship: string; source_name: string; source_type: string; source_era: string; weight: number }) => (
              <li key={`in-${e.id}`} className="flex items-center justify-between gap-2 text-xs">
                <span className="font-medium text-foreground truncate">{e.source_name}</span>
                <span className="shrink-0 text-muted-foreground/60">← {RELATIONSHIP_LABELS[e.relationship as keyof typeof RELATIONSHIP_LABELS] ?? e.relationship}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function GraphExplorer() {
  const [era, setEra] = useState('all')
  const [type, setType] = useState('all')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [searchQ, setSearchQ] = useState('')
  const [searchResults, setSearchResults] = useState<GraphNode[]>([])
  const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const canvasWrapRef = useRef<HTMLElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null)

  // Measure the canvas container so ForceGraph2D fills it exactly
  useEffect(() => {
    const el = canvasWrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setDimensions({ width, height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { data, isLoading } = useSWR<GraphData>(
    `/api/graph?era=${era}&type=${type}`,
    fetcher,
    { revalidateOnFocus: false }
  )

  // Search debounce
  useEffect(() => {
    if (searchQ.length < 2) { setSearchResults([]); return }
    const t = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQ)}`)
      const items = await res.json()
      setSearchResults(items)
    }, 250)
    return () => clearTimeout(t)
  }, [searchQ])

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node.id)
    setSearchQ('')
    setSearchResults([])
  }, [])

  const handleSearchSelect = useCallback((node: GraphNode) => {
    setSelectedNode(node.id)
    setSearchQ(node.name)
    setSearchResults([])
    setHighlightIds(new Set([node.id]))
  }, [])

  const nodeCanvasObject = useCallback((node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const isSelected = node.id === selectedNode
    const isHighlighted = highlightIds.size === 0 || highlightIds.has(node.id)
    const score = node.influence_score ?? 50
    const radius = Math.max(3, Math.min(10, score / 12))
    const color = node.era ? (ERA_COLORS[node.era] ?? NODE_COLORS[node.type] ?? '#888') : (NODE_COLORS[node.type] ?? '#888')

    ctx.globalAlpha = isHighlighted ? 1 : 0.25

    // Glow for selected
    if (isSelected) {
      ctx.shadowColor = color
      ctx.shadowBlur = 12
    }

    ctx.beginPath()
    ctx.arc(node.x ?? 0, node.y ?? 0, radius + (isSelected ? 2 : 0), 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()

    ctx.shadowBlur = 0
    ctx.globalAlpha = 1

    // Label when zoomed in or selected
    if (globalScale > 1.5 || isSelected) {
      const label = node.name.length > 18 ? node.name.slice(0, 16) + '…' : node.name
      ctx.font = `${isSelected ? 'bold ' : ''}${Math.max(8, 10 / globalScale)}px Inter, sans-serif`
      ctx.fillStyle = isSelected ? '#D4A017' : '#F0EDE8'
      ctx.textAlign = 'center'
      ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + radius + 6)
    }
  }, [selectedNode, highlightIds])

  const graphData = {
    nodes: (data?.nodes ?? []) as GraphNode[],
    links: (data?.edges ?? []).map((e: GraphEdge) => ({
      source: typeof e.source === 'string' ? e.source : (e.source as GraphNode).id,
      target: typeof e.target === 'string' ? e.target : (e.target as GraphNode).id,
      relationship: e.relationship,
      weight: e.weight,
    })),
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="flex w-72 shrink-0 flex-col border-r border-border bg-card overflow-y-auto" aria-label="Graph controls and node detail">
        {/* Search */}
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search artists, albums…"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              className="w-full rounded border border-border bg-background pl-8 pr-8 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none"
              aria-label="Search graph nodes"
            />
            {searchQ && (
              <button
                onClick={() => { setSearchQ(''); setSearchResults([]) }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          {searchResults.length > 0 && (
            <ul className="mt-1.5 rounded border border-border bg-background shadow-lg overflow-hidden" role="listbox" aria-label="Search results">
              {searchResults.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => handleSearchSelect(n)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                    role="option"
                    aria-selected={false}
                  >
                    <span className="font-medium text-foreground truncate">{n.name}</span>
                    <EraBadge eraId={n.era} className="ml-2 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filters toggle */}
        <div className="border-b border-border">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex w-full items-center justify-between px-3 py-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            aria-expanded={showFilters}
          >
            <span className="flex items-center gap-1.5"><Filter className="h-3 w-3" aria-hidden="true" /> Filters</span>
            <span>{showFilters ? '−' : '+'}</span>
          </button>
          {showFilters && (
            <div className="px-3 pb-3 flex flex-col gap-2.5">
              <div>
                <label htmlFor="era-filter" className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Era</label>
                <select
                  id="era-filter"
                  value={era}
                  onChange={(e) => setEra(e.target.value)}
                  className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:border-gold/50 focus:outline-none"
                >
                  {ERA_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="type-filter" className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Type</label>
                <select
                  id="type-filter"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:border-gold/50 focus:outline-none"
                >
                  {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Node detail or legend */}
        <div className="flex-1 overflow-y-auto">
          {selectedNode ? (
            <NodeDetail nodeId={selectedNode} onClose={() => setSelectedNode(null)} />
          ) : (
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                <Info className="h-3 w-3" aria-hidden="true" /> Legend
              </p>
              <ul className="flex flex-col gap-2">
                {Object.entries(NODE_COLORS).map(([t, c]) => (
                  <li key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: c }} aria-hidden="true" />
                    <span className="capitalize">{t.replace('_', ' ')}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                Node size reflects influence score. Click any node to explore its connections.
              </p>
              {data && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {data.total_nodes} nodes · {data.total_edges} edges
                </p>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Canvas area */}
      <main
        ref={canvasWrapRef}
        className="relative flex-1 bg-background overflow-hidden"
        aria-label="Force-directed graph canvas"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 rounded-full border-2 border-gold border-t-transparent animate-spin" aria-label="Loading graph data" />
              <p className="text-sm text-muted-foreground">Building graph…</p>
            </div>
          </div>
        )}

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1" role="group" aria-label="Zoom controls">
          {[
            { icon: ZoomIn,    label: 'Zoom in',    onClick: () => graphRef.current?.zoom(2, 400) },
            { icon: ZoomOut,   label: 'Zoom out',   onClick: () => graphRef.current?.zoom(0.5, 400) },
            { icon: Maximize2, label: 'Reset view',  onClick: () => graphRef.current?.zoomToFit(400) },
          ].map(({ icon: Icon, label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="flex h-8 w-8 items-center justify-center rounded border border-border bg-card/90 text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors backdrop-blur-sm"
              aria-label={label}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ))}
        </div>

        {dimensions.width > 0 && dimensions.height > 0 && (
          <ForceGraph2D
            ref={graphRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={graphData}
            nodeCanvasObject={nodeCanvasObject}
            nodeCanvasObjectMode={() => 'replace'}
            linkColor={(link: { relationship?: string }) => {
              const rel = link.relationship
              if (rel === 'rivals') return 'rgba(224,92,42,0.6)'
              if (rel === 'collaborated') return 'rgba(212,160,23,0.5)'
              if (rel === 'influenced') return 'rgba(240,237,232,0.15)'
              return 'rgba(240,237,232,0.1)'
            }}
            linkWidth={(link: { weight?: number }) => ((link.weight as number) ?? 0.5) * 1.5}
            onNodeClick={handleNodeClick}
            backgroundColor="#0A0A0A"
            nodeLabel={(node: GraphNode) => `${node.name} (${node.type})`}
            cooldownTicks={120}
            warmupTicks={80}
            enableZoomInteraction
            enablePanInteraction
          />
        )}
      </main>
    </div>
  )
}
