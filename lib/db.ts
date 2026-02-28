import { neon } from '@neondatabase/serverless'

// Call this in every API route / server action to get the real neon client.
// Lazily initialised so a missing DATABASE_URL doesn't crash at build time.
let _client: ReturnType<typeof neon> | null = null

export function getDB(): ReturnType<typeof neon> {
  if (!_client) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    _client = neon(process.env.DATABASE_URL)
  }
  return _client
}
