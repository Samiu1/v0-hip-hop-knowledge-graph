import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getCached, setCached, TTL } from '@/lib/redis'

export const runtime = 'nodejs'

export async function GET() {
  const cacheKey = 'eras:all'
  const cached = await getCached(cacheKey)
  if (cached) return NextResponse.json(cached, { headers: { 'X-Cache': 'HIT' } })

  const eras = await sql`
    SELECT e.id, e.name, e.year_start, e.year_end, e.description, e.color, e.key_events,
           COUNT(n.id)::int AS node_count
    FROM   eras e
    LEFT   JOIN nodes n ON n.era = e.id
    GROUP  BY e.id, e.name, e.year_start, e.year_end, e.description, e.color, e.key_events
    ORDER  BY e.year_start ASC
  `

  await setCached(cacheKey, eras, TTL.ERAS)
  return NextResponse.json(eras, { headers: { 'X-Cache': 'MISS' } })
}
