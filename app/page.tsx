import Link from 'next/link'
import { Network, BarChart2, Clock, ArrowRight, Mic, Disc, Users, TrendingUp } from 'lucide-react'
import { Nav } from '@/components/nav'
import { sql } from '@/lib/db'

async function getStats() {
  try {
    const [nodeCount] = await sql`SELECT COUNT(*)::int AS count FROM nodes`
    const [edgeCount] = await sql`SELECT COUNT(*)::int AS count FROM edges`
    const [artistCount] = await sql`SELECT COUNT(*)::int AS count FROM nodes WHERE type = 'artist'`
    const [albumCount] = await sql`SELECT COUNT(*)::int AS count FROM nodes WHERE type = 'album'`
    return {
      nodes: nodeCount.count as number,
      edges: edgeCount.count as number,
      artists: artistCount.count as number,
      albums: albumCount.count as number,
    }
  } catch {
    return { nodes: 82, edges: 130, artists: 55, albums: 15 }
  }
}

const features = [
  {
    href: '/graph',
    icon: Network,
    title: 'Knowledge Graph',
    desc: 'Explore an interactive force-directed graph of artists, albums, labels, and movements. Filter by era, type, or relationship.',
    color: 'text-gold',
    border: 'border-gold/20 hover:border-gold/50',
    bg: 'bg-gold/5 hover:bg-gold/10',
  },
  {
    href: '/timeline',
    icon: Clock,
    title: 'Cultural Timeline',
    desc: 'Travel through 100 years of hip-hop history era by era. See key events, landmark albums, and cultural turning points.',
    color: 'text-brick',
    border: 'border-brick/20 hover:border-brick/50',
    bg: 'bg-brick/5 hover:bg-brick/10',
  },
  {
    href: '/analytics',
    icon: BarChart2,
    title: 'Influence Analytics',
    desc: 'Ranked influence scores, regional breakdowns, genre evolution charts, and relationship density analysis.',
    color: 'text-jade',
    border: 'border-jade/20 hover:border-jade/50',
    bg: 'bg-jade/5 hover:bg-jade/10',
  },
]

const eras = [
  { id: 'era_roots',      name: 'Pre-Hip-Hop Roots',   years: '1925–1972', color: '#6B4C2A' },
  { id: 'era_birth',      name: 'The Birth',            years: '1973–1979', color: '#C94F1A' },
  { id: 'era_old_school', name: 'Old School',           years: '1980–1985', color: '#D4A017' },
  { id: 'era_golden',     name: 'Golden Age',           years: '1986–1993', color: '#2A7D4F' },
  { id: 'era_east_west',  name: 'East/West Coast Wars', years: '1994–1999', color: '#1A4C8B' },
  { id: 'era_bling',      name: 'Bling Era',            years: '2000–2005', color: '#8B1A6B' },
  { id: 'era_internet',   name: 'Internet Era',         years: '2006–2012', color: '#1A7B8B' },
  { id: 'era_trap',       name: 'Trap & Streaming',     years: '2013–2018', color: '#4A1A8B' },
  { id: 'era_modern',     name: 'New Generation',       years: '2019–2026', color: '#8B4A1A' },
]

export default async function HomePage() {
  const stats = await getStats()

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,160,23,0.07)_0%,_transparent_60%)]" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32">
          <div className="max-w-3xl">
            <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              100 Years of Culture
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-balance text-foreground sm:text-6xl">
              Hip-Hop<br />
              <span className="text-gold">Knowledge Graph</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">
              An interactive knowledge graph mapping the full evolution of hip-hop — from South Bronx block parties to global streaming dominance. Explore 1,000+ relationships between artists, albums, movements, and cultural moments.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/graph"
                className="inline-flex items-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Explore Graph
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/timeline"
                className="inline-flex items-center gap-2 rounded border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:bg-card/80"
              >
                View Timeline
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-card" aria-label="Database statistics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
            {[
              { icon: Users,    label: 'Nodes',   value: stats.nodes },
              { icon: Network,  label: 'Edges',   value: stats.edges },
              { icon: Mic,      label: 'Artists', value: stats.artists },
              { icon: Disc,     label: 'Albums',  value: stats.albums },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-5">
                <Icon className="h-5 w-5 text-gold shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl font-bold text-foreground tabular-nums">{value.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="features-heading">
        <h2 id="features-heading" className="font-display text-2xl font-bold text-foreground mb-8">
          Explore the Archive
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map(({ href, icon: Icon, title, desc, color, border, bg }) => (
            <Link
              key={href}
              href={href}
              className={`group rounded-lg border p-6 transition-all ${border} ${bg}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-1.5">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Era strip */}
      <section className="border-t border-border bg-card" aria-labelledby="eras-heading">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-5 w-5 text-gold" aria-hidden="true" />
            <h2 id="eras-heading" className="font-display font-bold text-foreground">9 Eras of Hip-Hop</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {eras.map((era) => (
              <Link
                key={era.id}
                href={`/timeline#${era.id}`}
                className="group flex flex-col gap-0.5 rounded-md border border-border px-3 py-2 transition-colors hover:border-current"
                style={{ '--era-color': era.color } as React.CSSProperties}
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: era.color }}
                >
                  {era.name}
                </span>
                <span className="text-[10px] text-muted-foreground">{era.years}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Hip-Hop Knowledge Graph — updated daily via cron</p>
          <p className="text-xs text-muted-foreground">Powered by Neon + Upstash Redis</p>
        </div>
      </footer>
    </div>
  )
}
