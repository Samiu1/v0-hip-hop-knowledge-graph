import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getCached, setCached, TTL } from '@/lib/redis'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? ''
  if (q.length < 2) return NextResponse.json([])

  const cacheKey = `search:${q.toLowerCase()}`
  const cached = await getCached(cacheKey)
  if (cached) return NextResponse.json(cached, { headers: { 'X-Cache': 'HIT' } })

  try {
    const results = await sql`
      SELECT id, name, type, era, influence_score,
             ts_rank(to_tsvector('english', name || ' ' || COALESCE(description, '')),
                     plainto_tsquery('english', ${q})) AS rank
      FROM   nodes
      WHERE  to_tsvector('english', name || ' ' || COALESCE(description, ''))
             @@ plainto_tsquery('english', ${q})
          OR name ILIKE ${'%' + q + '%'}
      ORDER  BY rank DESC, influence_score DESC
      LIMIT  10
    `

    await setCached(cacheKey, results, TTL.SEARCH)
    return NextResponse.json(results, { headers: { 'X-Cache': 'MISS' } })
  } catch (error) {
    console.error('Database error in /api/search, falling back to mock data:', error)
    const { MOCK_NODES } = await import('@/lib/mock-data')
    
    const results = MOCK_NODES.filter(n => 
      n.name.toLowerCase().includes(q.toLowerCase()) || 
      n.description.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 10)

    return NextResponse.json(results, { headers: { 'X-Cache': 'MOCK' } })
  }
}
