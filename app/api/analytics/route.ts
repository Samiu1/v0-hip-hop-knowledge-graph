import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getCached, setCached, TTL } from '@/lib/redis'

export const runtime = 'nodejs'

export async function GET() {
  const cacheKey = 'analytics:full'
  const cached = await getCached(cacheKey)
  if (cached) return NextResponse.json(cached, { headers: { 'X-Cache': 'HIT' } })

  try {
    const [
      topInfluencers,
      regionDist,
      eraDist,
      typeDist,
      relationshipDist,
      recentSnapshot,
      cronLogs,
    ] = await Promise.all([
      sql`
        SELECT id, name, type, era, influence_score, region
        FROM   nodes
        ORDER  BY influence_score DESC
        LIMIT  20
      `,
      sql`
        SELECT region, COUNT(*)::int AS count
        FROM   nodes
        WHERE  region IS NOT NULL AND type = 'artist'
        GROUP  BY region
        ORDER  BY count DESC
        LIMIT  15
      `,
      sql`
        SELECT n.era, er.name AS era_name, er.color, COUNT(n.id)::int AS count,
               AVG(n.influence_score)::numeric(5,2) AS avg_influence
        FROM   nodes n
        LEFT   JOIN eras er ON er.id = n.era
        WHERE  n.era IS NOT NULL
        GROUP  BY n.era, er.name, er.color
        ORDER  BY er.year_start ASC NULLS LAST
      `,
      sql`
        SELECT type, COUNT(*)::int AS count
        FROM   nodes
        GROUP  BY type
        ORDER  BY count DESC
      `,
      sql`
        SELECT relationship, COUNT(*)::int AS count,
               AVG(weight)::numeric(4,2) AS avg_weight
        FROM   edges
        GROUP  BY relationship
        ORDER  BY count DESC
      `,
      sql`
        SELECT * FROM analytics_snapshots
        ORDER  BY snapshot_at DESC
        LIMIT  1
      `,
      sql`
        SELECT * FROM cron_logs
        ORDER  BY ran_at DESC
        LIMIT  10
      `,
    ])

    // Era timeline: nodes per year
    const yearDist = await sql`
      SELECT year_start AS year, COUNT(*)::int AS count, type
      FROM   nodes
      WHERE  year_start IS NOT NULL AND year_start BETWEEN 1925 AND 2026
      GROUP  BY year_start, type
      ORDER  BY year_start ASC
    `

    const data = {
      topInfluencers,
      regionDist,
      eraDist,
      typeDist,
      relationshipDist,
      yearDist,
      recentSnapshot: recentSnapshot[0] ?? null,
      cronLogs,
    }

    await setCached(cacheKey, data, TTL.ANALYTICS)
    return NextResponse.json(data, { headers: { 'X-Cache': 'MISS' } })
  } catch (error) {
    console.error('Database error in /api/analytics, falling back to mock data:', error)
    const { MOCK_NODES, MOCK_ERAS, MOCK_EDGES } = await import('@/lib/mock-data')

    const data = {
      topInfluencers: MOCK_NODES.sort((a,b) => b.influence_score - a.influence_score).slice(0, 20),
      regionDist: [],
      eraDist: MOCK_ERAS.map(e => ({
        era: e.id,
        era_name: e.name,
        color: e.color,
        count: MOCK_NODES.filter(n => n.era === e.id).length,
        avg_influence: 80 // Mock average
      })),
      typeDist: [
        { type: 'artist', count: MOCK_NODES.filter(n => n.type === 'artist').length },
        { type: 'group', count: MOCK_NODES.filter(n => n.type === 'group').length },
        { type: 'label', count: MOCK_NODES.filter(n => n.type === 'label').length }
      ],
      relationshipDist: [],
      yearDist: [],
      recentSnapshot: null,
      cronLogs: []
    }

    return NextResponse.json(data, { headers: { 'X-Cache': 'MOCK' } })
  }
}
