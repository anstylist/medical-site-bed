import { PrismaClient } from '@prisma/client'
import loadProducts from './products'

const prisma = new PrismaClient()

async function main() {
  return await Promise.all(loadProducts(prisma))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })