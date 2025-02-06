import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['local', 'dev', 'test', 'production']).default('local'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z
    .string()
    .default(
      'postgresql://postgres:123456@localhost:5432/pricing?schema=public',
    ),
  JWT_SECRET: z
    .string()
    .default('MjA2ZjQzMzctYWI4NS00YmE4LTk5MzQtNzdiYmZhYWE4YTIy'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
