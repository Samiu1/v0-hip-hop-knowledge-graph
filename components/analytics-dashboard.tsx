'use client'

import useSWR from 'swr'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend,
  AreaChart, Area, LineChart, Line
} from 'recharts'
import { StatCard } from '@/components/stat-card'
import { EraBadge } from '@/components/era-badge'
import { ERA_COLORS, NODE_COLORS } from '@/lib/types'
import { CheckCircle2, XCircle, Clock, Activity, RefreshCw, TrendingUp } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface AnalyticsData {
  topInfluencers: Array<{ id: string; name: string; type: string; era: string; influence_score: number; region: string }>
  regionDist: Array<{ region: string; count: number }>
  eraDist: Array<{ era: string; era_name: string; color: string; count: number; avg_influence: number }>
  typeDist: Array<{ type: string; count: number }>
  relationshipDist: Array<{ relationship: string; count: number; avg_weight: number }>
  yearDist: Array<{ year: number; count: number; type: string }>
  recentSnapshot: { snapshot_at: string; edge_density: number; new_nodes: number } | null
  cronLogs: Array<{ id: number; job_name: string; status: string; message: string; ran_at: string; duration_ms: number }>
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'success') return <CheckCircle2 className="h-4 w-4 text-jade" aria-label="Success" />
  if (status === 'error')   return <XCircle className="h-4 w-4 text-brick" aria-label="Error" />
  return <Clock className="h-4 w-4 text-gold" aria-label="Running" />
}

export function AnalyticsDashboard() {
  const { data, isLoading } = useSWR<AnalyticsData>('/api/analytics', fetcher, { revalidateOnFocus: false })

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-gold border-t-transparent animate-spin" aria-label="Loading analytics" />
      </div>
    )
  }

  if (!data) return null

  // Prep year area chart — aggregate across types
  const yearMap: Record<number, number> = {}
  for (const row of data.yearDist) {
    yearMap[row.year] = (yearMap[row.year] ?? 0) + row.count
  }
  const yearData = Object.entries(yearMap)
    .map(([y, c]) => ({ year: Number(y), count: c }))
    .sort((a, b) => a.year - b.year)

  // Type pie colors
  const typeColors = NODE_COLORS

  // Total nodes + edges from type dist
  const totalNodes = data.typeDist.reduce((s, t) => s + t.count, 0)
  const totalEdges  = data.relationshipDist.reduce((s, r) => s + r.count, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-1">Data Insights</p>
        <h1 className="font-display text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Real-time metrics on the hip-hop knowledge graph.</p>
      </div>

      {/* Summary stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-8" aria-label="Summary statistics">
        <StatCard label="Total Nodes" value={totalNodes} accent />
        <StatCard label="Total Edges" value={totalEdges} />
        <StatCard label="Graph Density" value={data.recentSnapshot?.edge_density?.toFixed(4) ?? '—'} sub="edges / possible" />
        <StatCard label="Last Updated" value={data.recentSnapshot ? new Date(data.recentSnapshot.snapshot_at).toLocaleDateString() : '—'} />
      </section>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Influencers */}
        <section className="rounded-lg border border-border bg-card p-5" aria-labelledby="influencers-heading">
          <h2 id="influencers-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <TrendingUp className="h-4 w-4 text-gold" aria-hidden="true" />
            Top 20 Influencers
          </h2>
          <ul className="flex flex-col gap-1.5 max-h-80 overflow-y-auto">
            {data.topInfluencers.map((n, i) => (
              <li key={n.id} className="flex items-center gap-3">
                <span className="w-5 text-xs text-muted-foreground tabular-nums text-right shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground truncate">{n.name}</span>
                    <EraBadge eraId={n.era} className="shrink-0" />
                  </div>
                  {/* Score bar */}
                  <div className="mt-0.5 h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${n.influence_score}%`,
                        backgroundColor: n.era ? ERA_COLORS[n.era] ?? '#D4A017' : '#D4A017'
                      }}
                      role="progressbar"
                      aria-valuenow={Math.round(n.influence_score)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${n.name} influence score`}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono text-gold shrink-0 w-8 text-right">{Math.round(n.influence_score)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Activity over time */}
        <section className="rounded-lg border border-border bg-card p-5" aria-labelledby="activity-heading">
          <h2 id="activity-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <Activity className="h-4 w-4 text-brick" aria-hidden="true" />
            Activity by Year
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={yearData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#D4A017" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D4A017" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} interval={9} />
              <YAxis tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
              <RTooltip
                contentStyle={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '6px', fontSize: 12 }}
                labelStyle={{ color: '#F0EDE8', fontWeight: 600 }}
                itemStyle={{ color: '#888888' }}
              />
              <Area type="monotone" dataKey="count" stroke="#D4A017" strokeWidth={2} fill="url(#areaGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        {/* Era distribution */}
        <section className="rounded-lg border border-border bg-card p-5" aria-labelledby="era-dist-heading">
          <h2 id="era-dist-heading" className="text-sm font-semibold text-foreground mb-4">Nodes per Era</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.eraDist} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="era_name" type="category" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} width={110} />
              <RTooltip
                contentStyle={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '6px', fontSize: 12 }}
                labelStyle={{ color: '#F0EDE8', fontWeight: 600 }}
                itemStyle={{ color: '#888888' }}
                formatter={(v: number, name: string) => [v, name === 'count' ? 'Nodes' : 'Avg Score']}
              />
              <Bar dataKey="count" radius={[0, 3, 3, 0]}>
                {data.eraDist.map((entry, i) => (
                  <Cell key={i} fill={entry.color ?? '#888'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Node type + relationship breakdown */}
        <div className="flex flex-col gap-4">
          {/* Node types pie */}
          <section className="rounded-lg border border-border bg-card p-5" aria-labelledby="type-dist-heading">
            <h2 id="type-dist-heading" className="text-sm font-semibold text-foreground mb-3">Node Type Distribution</h2>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={data.typeDist} dataKey="count" nameKey="type" cx="50%" cy="50%" innerRadius={30} outerRadius={55}>
                    {data.typeDist.map((entry, i) => (
                      <Cell key={i} fill={typeColors[entry.type as keyof typeof typeColors] ?? '#888'} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <ul className="flex flex-col gap-1.5 flex-1">
                {data.typeDist.map((t) => (
                  <li key={t.type} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground capitalize">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: typeColors[t.type as keyof typeof typeColors] ?? '#888' }} aria-hidden="true" />
                      {t.type}
                    </span>
                    <span className="text-foreground font-mono">{t.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Relationship types */}
          <section className="rounded-lg border border-border bg-card p-5" aria-labelledby="rel-dist-heading">
            <h2 id="rel-dist-heading" className="text-sm font-semibold text-foreground mb-3">Relationship Types</h2>
            <ul className="flex flex-col gap-2">
              {data.relationshipDist.map((r) => (
                <li key={r.relationship} className="flex items-center gap-2">
                  <span className="w-24 text-xs text-muted-foreground capitalize shrink-0">{r.relationship.replace('_', ' ')}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gold/70"
                      style={{ width: `${(r.count / (data.relationshipDist[0]?.count ?? 1)) * 100}%` }}
                      role="progressbar"
                      aria-valuenow={r.count}
                      aria-valuemin={0}
                      aria-valuemax={data.relationshipDist[0]?.count ?? 1}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-mono text-foreground shrink-0">{r.count}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Regional breakdown */}
        <section className="rounded-lg border border-border bg-card p-5" aria-labelledby="region-heading">
          <h2 id="region-heading" className="text-sm font-semibold text-foreground mb-4">Regional Distribution (Artists)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.regionDist.slice(0, 12)} margin={{ top: 0, right: 0, left: -20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
              <XAxis dataKey="region" tick={{ fontSize: 9, fill: '#888' }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" />
              <YAxis tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
              <RTooltip
                contentStyle={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '6px', fontSize: 12 }}
                labelStyle={{ color: '#F0EDE8', fontWeight: 600 }}
                itemStyle={{ color: '#888888' }}
              />
              <Bar dataKey="count" fill="#E05C2A" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Avg influence per era */}
        <section className="rounded-lg border border-border bg-card p-5" aria-labelledby="influence-era-heading">
          <h2 id="influence-era-heading" className="text-sm font-semibold text-foreground mb-4">Average Influence Score by Era</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.eraDist} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
              <XAxis dataKey="era_name" tick={{ fontSize: 9, fill: '#888' }} axisLine={false} tickLine={false}
                tickFormatter={(v: string) => v.split(' ')[0]} />
              <YAxis tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <RTooltip
                contentStyle={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '6px', fontSize: 12 }}
                labelStyle={{ color: '#F0EDE8', fontWeight: 600 }}
                itemStyle={{ color: '#888888' }}
              />
              <Line type="monotone" dataKey="avg_influence" stroke="#D4A017" strokeWidth={2} dot={{ r: 4, fill: '#D4A017', strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>

      {/* Cron job logs */}
      {data.cronLogs.length > 0 && (
        <section className="mt-6 rounded-lg border border-border bg-card p-5" aria-labelledby="cron-heading">
          <h2 id="cron-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <RefreshCw className="h-4 w-4 text-gold" aria-hidden="true" />
            Cron Job History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs" aria-label="Cron job execution history">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 text-muted-foreground font-medium pr-4">Job</th>
                  <th className="pb-2 text-muted-foreground font-medium pr-4">Status</th>
                  <th className="pb-2 text-muted-foreground font-medium pr-4">Ran At</th>
                  <th className="pb-2 text-muted-foreground font-medium pr-4">Duration</th>
                  <th className="pb-2 text-muted-foreground font-medium">Message</th>
                </tr>
              </thead>
              <tbody>
                {data.cronLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2 pr-4 font-mono text-foreground">{log.job_name}</td>
                    <td className="py-2 pr-4">
                      <span className="flex items-center gap-1">
                        <StatusIcon status={log.status} />
                        <span className={
                          log.status === 'success' ? 'text-jade' :
                          log.status === 'error'   ? 'text-brick' : 'text-gold'
                        }>{log.status}</span>
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">
                      {new Date(log.ran_at).toLocaleString()}
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground font-mono">
                      {log.duration_ms != null ? `${log.duration_ms}ms` : '—'}
                    </td>
                    <td className="py-2 text-muted-foreground max-w-xs truncate">{log.message ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
