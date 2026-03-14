import { Redis } from '@upstash/redis'

// Lazily constructed so missing env vars don't crash at build time
let _redis: Redis | null = null
function getRedis(): Redis {
  if (!_redis) {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.warn('Upstash Redis environment variables are not set. Caching will be disabled.')
      // Return a dummy object that allows the app to proceed without caching
      return new Proxy({} as any, {
        get() {
          return () => Promise.resolve(null)
        }
      })
    }
    _redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  }
  return _redis
}

export const redis = new Proxy({} as Redis, {
  get(_target, prop) {
    return (getRedis() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

// Cache TTLs (seconds)
export const TTL = {
  GRAPH:     300,   // 5 min
  NODE:      600,   // 10 min
  ANALYTICS: 900,   // 15 min
  SEARCH:    120,   // 2 min
  ERAS:      3600,  // 1 hour
}

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    return await redis.get<T>(key)
  } catch {
    return null
  }
}

export async function setCached<T>(key: string, value: T, ttl: number): Promise<void> {
  try {
    await redis.set(key, value, { ex: ttl })
  } catch {
    // swallow — cache is best-effort
  }
}

export async function invalidatePrefix(prefix: string): Promise<void> {
  try {
    const keys = await redis.keys(`${prefix}*`)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  } catch {
    // swallow
  }
}
