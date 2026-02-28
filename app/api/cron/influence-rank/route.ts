import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { invalidatePrefix } from '@/lib/redis'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * Weekly PageRank-style influence recalculation.
 * Uses a simplified iterative approach over 10 iterations.
 */
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const start = Date.now()

  await sql`
    INSERT INTO cron_logs (job_name, status, message)
    VALUES ('influence-rank', 'running', 'Starting weekly PageRank recalculation')
  `

  try {
    const DAMPING = 0.85
    const ITERATIONS = 10

    // Fetch all nodes and edges
    const nodes = await sql`SELECT id FROM nodes`
    const edges = await sql`SELECT source_id, target_id, weight FROM edges`

    const N = nodes.length
    if (N === 0) throw new Error('No nodes found')

    // Initialize scores
    const scores: Record<string, number> = {}
    nodes.forEach((n) => { scores[n.id as string] = 1 / N })

    // Build adjacency maps
    const outLinks: Record<string, Array<{ target: string; weight: number }>> = {}
    const outWeightSum: Record<string, number> = {}
    nodes.forEach((n) => { outLinks[n.id as string] = []; outWeightSum[n.id as string] = 0 })

    edges.forEach((e) => {
      const src = e.source_id as string
      const tgt = e.target_id as string
      const w   = (e.weight as number) ?? 1
      if (outLinks[src]) {
        outLinks[src].push({ target: tgt, weight: w })
        outWeightSum[src] = (outWeightSum[src] ?? 0) + w
      }
    })

    // Iterate
    for (let i = 0; i < ITERATIONS; i++) {
      const newScores: Record<string, number> = {}
      nodes.forEach((n) => { newScores[n.id as string] = (1 - DAMPING) / N })

      edges.forEach((e) => {
        const src = e.source_id as string
        const tgt = e.target_id as string
        const w   = (e.weight as number) ?? 1
        const sum = outWeightSum[src] ?? 1
        newScores[tgt] = (newScores[tgt] ?? 0) + DAMPING * scores[src] * (w / sum)
      })

      Object.assign(scores, newScores)
    }

    // Normalise to 0–99 range
    const vals = Object.values(scores)
    const minV = Math.min(...vals)
    const maxV = Math.max(...vals)
    const range = maxV - minV || 1

    const updates = Object.entries(scores).map(([id, score]) => ({
      id,
      score: Math.round(((score - minV) / range) * 95 + 2),
    }))

    // Batch update (one-at-a-time to stay within serverless limits)
    for (const { id, score } of updates) {
      await sql`
        UPDATE nodes SET influence_score = ${score}, updated_at = NOW()
        WHERE id = ${id}
      `
    }

    await invalidatePrefix('graph:')
    await invalidatePrefix('analytics:')
    await invalidatePrefix('node:')

    const duration = Date.now() - start
    await sql`
      UPDATE cron_logs SET status = 'success',
             message = ${'PageRank done — ' + N + ' nodes, ' + ITERATIONS + ' iterations, ' + duration + 'ms'},
             duration_ms = ${duration}
      WHERE  id = (
        SELECT id FROM cron_logs
        WHERE  job_name = 'influence-rank' AND status = 'running'
        ORDER  BY ran_at DESC LIMIT 1
      )
    `

    return NextResponse.json({ ok: true, nodes: N, duration_ms: duration })
  } catch (err) {
    const duration = Date.now() - start
    const message = err instanceof Error ? err.message : 'Unknown error'
    await sql`
      UPDATE cron_logs SET status = 'error',
             message = ${message}, duration_ms = ${duration}
      WHERE  id = (
        SELECT id FROM cron_logs
        WHERE  job_name = 'influence-rank' AND status = 'running'
        ORDER  BY ran_at DESC LIMIT 1
      )
    `
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
