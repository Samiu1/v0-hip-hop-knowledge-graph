import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { invalidatePrefix } from '@/lib/redis'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function GET(req: Request) {
  // Verify Vercel cron secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const start = Date.now()

  await sql`
    INSERT INTO cron_logs (job_name, status, message)
    VALUES ('graph-refresh', 'running', 'Starting daily graph refresh')
  `

  try {
    // Recalculate influence scores based on incoming edge count + weights
    await sql`
      UPDATE nodes n
      SET    influence_score = LEAST(99, sub.weighted_score),
             updated_at      = NOW()
      FROM (
        SELECT target_id,
               ROUND(
                 50 + LEAST(49, (COUNT(*) * 3 + SUM(weight) * 2))
               , 2) AS weighted_score
        FROM   edges
        GROUP  BY target_id
      ) sub
      WHERE n.id = sub.target_id
    `

    // Insert a fresh analytics snapshot
    const topNodes = await sql`
      SELECT id, influence_score AS score FROM nodes
      ORDER BY influence_score DESC LIMIT 10
    `
    const genreCounts = await sql`
      SELECT type, COUNT(*)::int AS c FROM nodes GROUP BY type
    `
    const regionDist = await sql`
      SELECT region, COUNT(*)::int AS c FROM nodes
      WHERE region IS NOT NULL AND type = 'artist'
      GROUP BY region ORDER BY c DESC LIMIT 10
    `
    const [densityRow] = await sql`
      SELECT
        ROUND(
          COUNT(e.id)::numeric /
          NULLIF((SELECT COUNT(*) FROM nodes) * ((SELECT COUNT(*) FROM nodes) - 1), 0),
          5
        ) AS density
      FROM edges e
    `

    const genreObj = Object.fromEntries(genreCounts.map((g) => [g.type as string, g.c as number]))
    const regionObj = Object.fromEntries(regionDist.map((r) => [r.region as string, r.c as number]))

    await sql`
      INSERT INTO analytics_snapshots
        (era, top_nodes, genre_counts, region_dist, edge_density, new_nodes)
      VALUES (
        'all',
        ${JSON.stringify(topNodes)},
        ${JSON.stringify(genreObj)},
        ${JSON.stringify(regionObj)},
        ${densityRow?.density ?? 0},
        0
      )
    `

    // Invalidate all graph/analytics caches
    await invalidatePrefix('graph:')
    await invalidatePrefix('analytics:')
    await invalidatePrefix('node:')

    const duration = Date.now() - start
    await sql`
      UPDATE cron_logs SET status = 'success',
             message = ${'Completed in ' + duration + 'ms'},
             duration_ms = ${duration}
      WHERE  job_name = 'graph-refresh'
        AND  status = 'running'
      ORDER  BY ran_at DESC LIMIT 1
    `

    return NextResponse.json({ ok: true, duration_ms: duration })
  } catch (err) {
    const duration = Date.now() - start
    const message = err instanceof Error ? err.message : 'Unknown error'
    await sql`
      UPDATE cron_logs SET status = 'error',
             message = ${message}, duration_ms = ${duration}
      WHERE  job_name = 'graph-refresh'
        AND  status = 'running'
      ORDER  BY ran_at DESC LIMIT 1
    `
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
