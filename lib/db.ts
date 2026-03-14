import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

// Lazily initialised so missing env var doesn't crash at build time
let _sql: NeonQueryFunction<false, false> | null = null

function getSQL(): NeonQueryFunction<false, false> {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL environment variable is not set. Data will be served from mock-data.ts.')
      // Return a dummy object that throws on use, but allows the app to start
      return new Proxy({}, {
        get() {
          throw new Error('DATABASE_URL is not set')
        }
      }) as any
    }
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
}

export const sql: NeonQueryFunction<false, false> = new Proxy(
  // Must use a function as the proxy target so the `apply` trap actually works
  (function () {}) as unknown as NeonQueryFunction<false, false>,
  {
    apply(_t, _this, args) {
      // eslint-disable-next-line prefer-spread
      return (getSQL() as unknown as (...a: unknown[]) => unknown).apply(_this, args)
    },
    get(_t, prop) {
      return (getSQL() as unknown as Record<string | symbol, unknown>)[prop]
    },
  }
)
