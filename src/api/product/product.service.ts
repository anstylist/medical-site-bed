import { PrismaClient } from '@prisma/client'

import { Product } from './product.types'

const prisma = new PrismaClient()

export const getAllProducts = async () => {
  const products = await prisma.product.findMany()
  return products
}

export const createProduct = async (data: Product) => {
  const product = await prisma.product.create({
    data
  })
  return product
}

export const updateProduct = async (data: Product) => {
  const product = await prisma.product.update({
    where: {
      id: data.id
    },
    data
  })
  return product
}


