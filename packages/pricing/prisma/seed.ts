import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import * as csvParser from 'csv-parser'
import * as fs from 'fs'
import { parseArgs } from 'node:util'
import path from 'path'

const options = {
  e2e: { type: 'boolean' },
}
const prisma = new PrismaClient()

async function main() {
  const {
    values: { e2e },
  } = parseArgs({ options })

  console.info('Starting seed')

  if ((await prisma.occupation.count()) === 0) {
    const occupations = []
    fs.createReadStream(path.resolve(__dirname, './occupations.csv'))
      .pipe(csvParser.default())
      .on('data', (data) => occupations.push(data))
      .on('end', async () => {
        await prisma.occupation.createMany({
          data: occupations.map((o) => {
            return {
              id: randomUUID(),
              code: o.Code,
              active: Boolean(o.Active),
              factor: Number(o.Factor),
              name: o.Name,
              created_at: new Date(),
              updated_at: new Date(),
            }
          }),
        })
        console.log('Seed occupations completed.')
      })
  }

  if (e2e) {
    console.info('Starting seed E2E')
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
