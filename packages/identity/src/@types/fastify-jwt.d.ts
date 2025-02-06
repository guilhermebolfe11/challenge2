import { UserRole } from '@entities'
import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: UserRole
      sub: string
    }
  }
}
