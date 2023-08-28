import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export function getCountry() {
  return prisma.country.findMany({
    select: {
      id: true,
      name: true
    }
  }
  )
}