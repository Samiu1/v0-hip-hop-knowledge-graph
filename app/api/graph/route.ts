import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getCached, setCached, TTL } from '@/lib/redis'
import type { GraphData } from '@/lib/types'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const era = searchParams.get('era') ?? 'all'
  const type = searchParams.get('type') ?? 'all'

  const cacheKey = `graph:${era}:${type}`

  // Try cache first
  const cached = await getCached<GraphData>(cacheKey)
  if (cached) {
    return NextResponse.json(cached, {
      headers: { 'X-Cache': 'HIT', 'Cache-Control': 'public, s-maxage=300' },
    })
  }

  try {
    // Build queries using plain conditional branching (neon tagged templates
    // don't support composable SQL fragment interpolation)
    const nodes =
      era !== 'all' && type !== 'all'
        ? await sql`SELECT id, name, type, era, year_start, year_end, region, description, influence_score, metadata FROM nodes WHERE era = ${era} AND type = ${type} ORDER BY influence_score DESC`
        : era !== 'all'
          ? await sql`SELECT id, name, type, era, year_start, year_end, region, description, influence_score, metadata FROM nodes WHERE era = ${era} ORDER BY influence_score DESC`
          : type !== 'all'
            ? await sql`SELECT id, name, type, era, year_start, year_end, region, description, influence_score, metadata FROM nodes WHERE type = ${type} ORDER BY influence_score DESC`
            : await sql`SELECT id, name, type, era, year_start, year_end, region, description, influence_score, metadata FROM nodes ORDER BY influence_score DESC`

    const nodeIds = nodes.map((n) => n.id as string)

    const edges = nodeIds.length > 0
      ? await sql`
          SELECT id, source_id, target_id, relationship, weight, year
          FROM   edges
          WHERE  source_id = ANY(${nodeIds})
            AND  target_id = ANY(${nodeIds})
        `
      : []

    const data: GraphData = {
      nodes: nodes as GraphData['nodes'],
      edges: edges.map((e) => ({
        ...e,
        source: e.source_id as string,
        target: e.target_id as string,
      })) as GraphData['edges'],
      total_nodes: nodes.length,
      total_edges: edges.length,
    }

    await setCached(cacheKey, data, TTL.GRAPH)

    return NextResponse.json(data, {
      headers: { 'X-Cache': 'MISS', 'Cache-Control': 'public, s-maxage=300' },
    })
  } catch (error) {
    console.error('Database error in /api/graph, falling back to mock data:', error)
    const { MOCK_NODES, MOCK_EDGES } = await import('@/lib/mock-data')

    let nodes = MOCK_NODES
    if (era !== 'all') nodes = nodes.filter(n => n.era === era)
    if (type !== 'all') nodes = nodes.filter(n => n.type === type)

    const nodeIds = nodes.map(n => n.id)
    const edges = MOCK_EDGES.filter(e => nodeIds.includes(e.source) && nodeIds.includes(e.target))

    const data: GraphData = {
      nodes: nodes as any,
      edges: edges as any,
      total_nodes: nodes.length,
      total_edges: edges.length,
    }

    return NextResponse.json(data, {
      headers: { 'X-Cache': 'MOCK', 'Cache-Control': 'public, s-maxage=300' },
    })
  }
}
