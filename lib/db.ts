import { neon } from '@neondatabase/serverless'

// Lazily initialised so the missing env var doesn't crash at build/import time.
// We use a getter function and re-export sql as a direct reference after first call.
let _sql: ReturnType<typeof neon> | null = null

export function getSQL(): ReturnType<typeof neon> {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
}

// Tagged-template proxy: forwards every template-literal call to the real neon client.
// Using a function (not an empty object) as the proxy target is required so the
// `apply` trap fires for tagged-template invocations.
export const sql = new Proxy(
  function () {} as unknown as ReturnType<typeof neon>,
  {
    apply(_target, _thisArg, argArray) {
      const fn = getSQL()
      // argArray is [TemplateStringsArray, ...values] — spread it directly
      return (fn as unknown as (...args: unknown[]) => unknown)(...argArray)
    },
    get(_target, prop) {
      return (getSQL() as unknown as Record<string | symbol, unknown>)[prop]
    },
  }
)
