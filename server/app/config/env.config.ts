import 'dotenv/config'

import * as z from 'zod'

const envSchema = z.object({
  PORT: z.preprocess(v => (v ? v : undefined), z.coerce.number().int()),
  API_PREFIX: z.string(),
  CONTENTFUL_SPACE_ID: z.string(),
  CONTENTFUL_ACCESS_TOKEN: z.string(),
  REDIS_REST_URL: z.string(),
  REDIS_REST_TOKEN: z.string(),
  REDIS_CACHE_KEY: z.string(),
  REDIS_CACHE_TTL_SECONDS: z.coerce.number(),
  ACCESS_JWT_EXPIRES_IN: z.string(),
  REFRESH_JWT_EXPIRES_IN: z.string(),
  REFRESH_JWT_SECRET: z.string().transform(v => new TextEncoder().encode(v)),
  ACCESS_JWT_SECRET: z.string().transform(v => new TextEncoder().encode(v)),
  ACCESS_JWT_ALGORITHM: z.string(),
  REFRESH_JWT_ALGORITHM: z.string()
})

export const env = envSchema.parse(process.env)
