import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getCached, setCached, TTL } from '@/lib/redis'

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const cacheKey = `node:${id}`
  const cached = await getCached(cacheKey)
  if (cached) {
    return NextResponse.json(cached, { headers: { 'X-Cache': 'HIT' } })
  }

  const [node] = await sql`
    SELECT id, name, type, era, year_start, year_end, region,
           description, influence_score, metadata
    FROM   nodes
    WHERE  id = ${id}
  `

  if (!node) {
    return NextResponse.json({ error: 'Node not found' }, { status: 404 })
  }

  // Outgoing edges
  const outgoing = await sql`
    SELECT e.id, e.relationship, e.weight, e.year,
           n.id AS target_id, n.name AS target_name, n.type AS target_type, n.era AS target_era
    FROM   edges e
    JOIN   nodes n ON n.id = e.target_id
    WHERE  e.source_id = ${id}
    ORDER  BY e.weight DESC
    LIMIT  20
  `

  // Incoming edges
  const incoming = await sql`
    SELECT e.id, e.relationship, e.weight, e.year,
           n.id AS source_id, n.name AS source_name, n.type AS source_type, n.era AS source_era
    FROM   edges e
    JOIN   nodes n ON n.id = e.source_id
    WHERE  e.target_id = ${id}
    ORDER  BY e.weight DESC
    LIMIT  20
  `

  const data = { node, outgoing, incoming }
  await setCached(cacheKey, data, TTL.NODE)

  return NextResponse.json(data, { headers: { 'X-Cache': 'MISS' } })
}
