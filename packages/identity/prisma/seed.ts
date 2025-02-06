import { UserRole } from '@entities'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { parseArgs } from 'node:util'
import credentials from './credentials.json'
import seedE2E from './seed.e2e.json'

const options = {
  e2e: { type: 'boolean' },
}
const prisma = new PrismaClient()

async function main() {
  const {
    values: { e2e },
  } = parseArgs({ options })

  console.info('Starting seed')
  await prisma.user.upsert({
    where: {
      username: credentials.admin.username,
    },
    update: {
      password_hash: await hash(credentials.admin.password, 6),
      username: credentials.admin.username,
    },
    create: {
      id: randomUUID(),
      password_hash: await hash(credentials.admin.password, 6),
      username: credentials.admin.username,
      role: UserRole.ADMIN,
      created_at: new Date(),
      updated_at: new Date(),
    },
  })

  await prisma.user.upsert({
    where: {
      username: credentials.user.username,
    },
    update: {
      password_hash: await hash(credentials.user.password, 6),
      username: credentials.user.username,
    },
    create: {
      id: randomUUID(),
      password_hash: await hash(credentials.user.password, 6),
      username: credentials.user.username,
      role: UserRole.USER,
      created_at: new Date(),
      updated_at: new Date(),
    },
  })

  if (e2e) {
    console.info('Starting seed E2E')
    await prisma.user.upsert({
      where: {
        username: seedE2E.admin.username,
      },
      update: {
        id: seedE2E.admin.id,
        password_hash: await hash(seedE2E.admin.password, 6),
        username: seedE2E.admin.username,
      },
      create: {
        id: seedE2E.admin.id,
        password_hash: await hash(seedE2E.admin.password, 6),
        username: seedE2E.admin.username,
        role: UserRole.ADMIN,
        created_at: new Date(),
        updated_at: new Date(),
      },
    })

    await prisma.user.upsert({
      where: {
        username: seedE2E.user.username,
      },
      update: {
        id: seedE2E.user.id,
        password_hash: await hash(seedE2E.user.password, 6),
        username: seedE2E.user.username,
      },
      create: {
        id: seedE2E.user.id,
        password_hash: await hash(seedE2E.user.password, 6),
        username: seedE2E.user.username,
        role: UserRole.USER,
        created_at: new Date(),
        updated_at: new Date(),
      },
    })
    console.info('Finished seed E2E')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.info('Finished seed')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
